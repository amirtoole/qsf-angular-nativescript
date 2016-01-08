import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {Page} from 'ui/page';
import {nativeScriptBootstrap} from './nativescript-angular/application';
import {NativeScriptRenderer} from './nativescript-angular/renderer';
import {Component, bind, DynamicComponentLoader, Type, ElementRef, AfterViewInit, ViewChild} from 'angular2/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, Router, Location, AsyncRoute, RouteDefinition, CanReuse, OnActivate, OnDeactivate, ComponentInstruction } from 'angular2/router';

import {groups, featuredExamples, Example, ExampleGroup} from "./model/examples-model";
import {ExamplesListComponenet} from "./examples-list/examples-list";
import {ExamplePreviewComponenet} from "./example-preview/example-preview";
import {GroupsListComponenet} from "./groups-list/groups-list";
import {ListSettingsComponent} from './components/list-settings';
import {ListSettingsService} from "./components/list-settings-service";
import {ScreenSizeService} from "./components/screen-size-service";
import {MainScreenComponent} from "./main-screen/main-screen";
//import {GroupComponenet} from "./group/group";
import {NSLocationStrategy} from "./ns-location-strategy";

interface PageRouteParams {
    componentType: string,
    path: string,
    name?: string,
    data?: {[key: string]: any},
    useAsDefault?: boolean
}

class PageRoute implements RouteDefinition {
  data: {[key: string]: any};
  path: string;
  loader: Function;
  name: string;
  useAsDefault: boolean;
  aux: string = null;
  constructor({componentType, path, name, data, useAsDefault}: PageRouteParams) {
    this.path = path;
    this.loader = () => {
        const match = /(['"])(.+?)\1\.(\w+)/.exec(componentType)
        if (!match) {
            throw new Error('Illegal type name. Use: "module/path".ComponentClass');
        }
        const modulePath = match[2];
        const className = match[3];
        console.log('importing: ' + modulePath + ' - ' + className);
        var m = require(modulePath);
        //return Promise.resolve(m[className]);
        return Promise.resolve(pageComponentFactory(m[className]));
    };
    this.name = name;
    this.data = data;
    this.useAsDefault = useAsDefault;
  }
}

export function pageComponentFactory(componentType: Type): Type {
    //
    // Return an intermediate component that will:
    // 1) load the target component
    // 2) create a new page and navigate to it
    // 3) move the target to the new page.
    //
    // The target is loaded in a collapsed container to avoid layout updates.
    //
    @Component({
        selector: 'nativescript-page-shim',
        template: `
        <StackLayout #container visibility="collapse" style="background-color: hotpink">
            <Placeholder #content></Placeholder>
        <StackLayout>
        `
    })
    class PageShim implements CanReuse, OnActivate, OnDeactivate, AfterViewInit {
        private ownerPage: Page;
        @ViewChild('container') private container: ElementRef

        constructor(
                private element: ElementRef,
                private loader:DynamicComponentLoader,
                private renderer: NativeScriptRenderer
            ) {
            console.log('PageShim constructor');
        }

        routerCanReuse(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any {
            return false;
        }

        ngAfterViewInit() {
            console.log('Container: ' + this.container);
            this.ownerPage = <Page>this.container.nativeElement.page;
        }

        routerOnActivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any {
            console.log('PageShim.OnActivate');

            return new Promise((resolve, reject) => {
                this.loader.loadIntoLocation(componentType, this.element, 'content').then((componentRef) => {
                    //Component loaded. Find its root native view.
                    const contentNode = this.renderer.getViewNode(componentRef.location)
                    const viewContainer = contentNode.children[0];
                    const nativeView = viewContainer.nativeView;
                    //Remove from original native parent.
                    //TODO: assuming it's a Layout.
                    (<any>nativeView.parent).removeChild(nativeView);

                    this.ownerPage.frame.navigate({
                        animated: true,
                        create: () => {
                            const page = new Page();
                            page.on('loaded', () => {
                                //Finish activation when page is fully loaded.
                                resolve();
                            });
                            //Add to new page.
                            page.content = viewContainer.nativeView;
                            return page;
                        }
                    });
                });
            });
        }

        routerOnDeactivate(nextInstruction: ComponentInstruction, prevInstruction: ComponentInstruction): any {
            console.log('PageShim.OnDeactivate');

            //Start navigation. We need to finish deactivation after navigation
            //finishes completely, or the old page will not be updated.
            //
            //To do that, we use the original page 'loaded' event.
            topmost().goBack();

            return new Promise((resolve, reject) => {
                const loadedHandler = () => {
                    this.ownerPage.off('loaded', loadedHandler);
                    resolve();
                }
                this.ownerPage.on('loaded', loadedHandler);
            });
        }
    }

    return PageShim;
}

@Component({
    selector: 'main',
    providers: [ListSettingsService, ScreenSizeService],
    directives: [ROUTER_DIRECTIVES, ListSettingsComponent, ExamplesListComponenet, GroupsListComponenet, MainScreenComponent],
    template: "<router-outlet></router-outlet>"
})
@RouteConfig([
    { path: '/', component: MainScreenComponent, as: 'Main' },
    //{ path: '/group/:id', component: GroupComponenet, as: 'Group' },
    new PageRoute({
        componentType: '"./group/group".GroupComponenet"',
        path: '/group/:id',
        name: 'Group'
    }),
    { path: '/example/:id', component: ExamplePreviewComponenet, as: 'Example' },
])
class MainPage {
    public featuredExamples = featuredExamples;
}

var initialized = false;
export function pageLoaded(args) {
    if (!initialized) {
        var page = args.object;
        page.bindingContext = "";

        console.log('BOOTSTRAPPING...');
        nativeScriptBootstrap(MainPage, [ROUTER_PROVIDERS,
            bind(LocationStrategy).toClass(NSLocationStrategy)]).then((appRef) => {
                console.log('ANGULAR BOOTSTRAP DONE.');
            }, (err) => {
                console.log('ERROR BOOTSTRAPPING ANGULAR');
                let errorMessage = err.message + "\n\n" + err.stack;
                console.log(errorMessage);

                let view = new TextView();
                view.text = errorMessage;
                topmost().currentPage.content = view;
            });
            
        initialized = true;
    }
}
