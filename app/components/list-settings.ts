import { Component, Input, Output } from 'angular2/core';
import {ListSettingsService} from "./list-settings-service";

@Component({
    selector: 'list-settings',
    templateUrl: 'components/list-settings.html'
})
export class ListSettingsComponent {
    public settings: ListSettingsService;

    constructor(settings: ListSettingsService) {
        console.log("------------- ListSettingsComponent constructor");
        this.settings = settings;
    }
}