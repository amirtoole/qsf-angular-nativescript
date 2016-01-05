import {Component} from 'angular2/core';
import {groups, ExampleGroup} from "../model/examples-model";
import {ListSettingsService} from "../components/list-settings-service";
import {ListSettingsComponent} from "../components/list-settings";
import {ScreenSizeService} from "../components/screen-size-service";
import {NSRouterLink} from "../components/ns-router-link";

import {Router} from 'angular2/router';

@Component({
    selector: 'groups-list',
    templateUrl: 'groups-list/groups-list.html',
    directives: [ListSettingsComponent, NSRouterLink]
})
export class GroupsListComponenet {
    private allGroups = groups;
    private settings: ListSettingsService;

    private _filteredGroups: Array<ExampleGroup> = [];
    private _filterCache: Boolean = undefined;

    constructor(settings: ListSettingsService, public screen: ScreenSizeService, private router: Router) {
        this.settings = settings;
    }

    public get isListLayout(): boolean {
        return this.settings.isListLayout;
    }

    public get groups(): Array<ExampleGroup> {
        if (this._filterCache !== this.settings.showOnlyNew) {
            this._filterCache = this.settings.showOnlyNew;
            this._filteredGroups.length = 0;

            if (this.settings.showOnlyNew) {
                this._filteredGroups.push.apply(this._filteredGroups, this.allGroups.filter((e) => e.isNew));
            }
            else {
                this._filteredGroups.push.apply(this._filteredGroups, this.allGroups);
            }
        }

        return this._filteredGroups;
    }
}