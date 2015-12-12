import { Component, CORE_DIRECTIVES, Input, Output } from 'angular2/angular2';
import {ListSettingsService} from "./list-settings-service";

@Component({
    selector: 'list-settings',
    templateUrl: 'components/list-settings.html',
    directives: [CORE_DIRECTIVES]
})
export class ListSettingsComponent {
    public settings: ListSettingsService;

    constructor(settings: ListSettingsService) {
        console.log("------------- ListSettingsComponent constructor");
        this.settings = settings;
    }
}