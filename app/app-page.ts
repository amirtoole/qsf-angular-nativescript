import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component, bind} from 'angular2/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, Router, Location } from 'angular2/router';

import {groups, featuredExamples, Example, ExampleGroup} from "./model/examples-model";
import {ExamplesListComponenet} from "./examples-list/examples-list";
import {ExamplePreviewComponenet} from "./example-preview/example-preview";
import {GroupsListComponenet} from "./groups-list/groups-list";
import {ListSettingsComponent} from './components/list-settings';
import {ListSettingsService} from "./components/list-settings-service";
import {ScreenSizeService} from "./components/screen-size-service";
import {MainScreenComponent} from "./main-screen/main-screen";
import {GroupComponenet} from "./group/group";
import {NSLocationStrategy} from "./ns-location-strategy";


@Component({
    selector: 'main',
    providers: [ListSettingsService, ScreenSizeService],
    directives: [ROUTER_DIRECTIVES, ListSettingsComponent, ExamplesListComponenet, GroupsListComponenet, MainScreenComponent],
    template: "<GridLayout><router-outlet></router-outlet></GridLayout>" //"<main-screen></main-screen>"
})
@RouteConfig([
    { path: '/', component: MainScreenComponent, as: 'Main' },
    { path: '/group/:id', component: GroupComponenet, as: 'Group' },
    { path: '/example/:id', component: ExamplePreviewComponenet, as: 'Example' },
])
class MainPage {
    public featuredExamples = featuredExamples;
}

export function pageLoaded(args) {
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
}