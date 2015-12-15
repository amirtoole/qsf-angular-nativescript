import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component, CORE_DIRECTIVES} from 'angular2/angular2';

import {groups, featuredExamples, Example, ExampleGroup} from "./model/examples-model";
import {ExamplesListComponenet} from "./examples-list/examples-list";
import {GroupsListComponenet} from "./groups-list/groups-list";
import {ListSettingsComponent} from './components/list-settings';
import {ListSettingsService} from "./components/list-settings-service";
import {ScreenSizeService} from "./components/screen-size-service";


@Component({
  selector: 'main',
  providers: [ListSettingsService, ScreenSizeService],
  directives: [CORE_DIRECTIVES, ListSettingsComponent, ExamplesListComponenet, GroupsListComponenet],
  templateUrl: "main-page.html"
})
class MainPage {
  public featuredExamples = featuredExamples;
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
