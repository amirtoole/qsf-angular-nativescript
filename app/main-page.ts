import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component} from 'angular2/angular2';


@Component({
    selector: 'main',
    template: `
<StackLayout>
    <Label text="The demo goes here" />    
</StackLayout>
`,
})
class MainPage {
}

export function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = "";

    console.log('BOOTSTRAPPING...');
    nativeScriptBootstrap(MainPage, []).then((appRef) => {
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
