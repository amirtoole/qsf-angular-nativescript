import {bootstrap, Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {groups, ExampleGroup} from "../model/examples-model";
import {ListSettingsService} from "../components/list-settings-service";
import {ListSettingsComponent} from "../components/list-settings";
import {ScreenSizeService} from "../components/screen-size-service";
import {NSRouterLink} from "../components/ns-router-link";

import {Router} from 'angular2/router';

@Component({
    selector: 'groups-list',
    templateUrl: 'groups-list/groups-list.html',
    directives: [CORE_DIRECTIVES, ListSettingsComponent, NSRouterLink]
})
export class GroupsListComponenet {
    private allGroups = groups;
    private settings: ListSettingsService;

    constructor(settings: ListSettingsService, public screen: ScreenSizeService, private router: Router) {
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

    // public navigateToExampleGroup(group: ExampleGroup) {
    //     console.log("------ navigateToExampleGroup group: " + group.id);

    //     this.router.navigate(['/Group', { id: group.id }]);
    // }
}