import 'reflect-metadata';
import {TextView} from 'ui/text-view';
import {topmost} from 'ui/frame';
import {nativeScriptBootstrap} from 'nativescript-angular/application';
import {Component} from 'angular2/core';

import {groups, featuredExamples, Example, ExampleGroup} from "../model/examples-model";
import {ExamplesListComponenet} from "../examples-list/examples-list";
import {GroupsListComponenet} from "../groups-list/groups-list";
import {ListSettingsComponent} from '../components/list-settings';
import {ListSettingsService} from "../components/list-settings-service";
import {ScreenSizeService} from "../components/screen-size-service";
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, LocationStrategy, HashLocationStrategy } from 'angular2/router';

@Component({
  selector: 'main-screen',
  providers: [ListSettingsService, ScreenSizeService],
  directives: [ListSettingsComponent, ExamplesListComponenet, GroupsListComponenet],
  templateUrl: "main-screen/main-screen.html"
})
export class MainScreenComponent {
  public featuredExamples = featuredExamples;
}

