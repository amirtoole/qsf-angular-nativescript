import {bootstrap, Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {groups, ExampleGroup} from "../model/examples-model";
import {ListSettingsService} from "../components/list-settings-service";
import {ListSettingsComponent} from "../components/list-settings";
import {ScreenSizeService} from "../components/screen-size-service";

import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'groups-list',
    templateUrl: 'groups-list/groups-list.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ListSettingsComponent]
})
export class GroupsListComponenet {
    private allGroups = groups;
    private settings: ListSettingsService;

    constructor(settings: ListSettingsService, public screen: ScreenSizeService) {
        this.settings = settings;
    }

    public get isListLayout(): boolean {
        return this.settings.isListLayout;
    }

    public get groups(): Array<ExampleGroup> {
        if (this.settings.showOnlyNew) {
            return this.allGroups.filter((g) => g.isNew)
        }
        else {
            return this.allGroups;
        }
    }
}