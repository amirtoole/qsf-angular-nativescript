import {Component, Input} from 'angular2/core';
import {Example} from "../model/examples-model";
import {ListSettingsService} from "../components/list-settings-service";
import {ListSettingsComponent} from "../components/list-settings";
import {ScreenSizeService} from "../components/screen-size-service";
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NSRouterLink} from "../components/ns-router-link";

@Component({
    selector: 'examples-list',
    templateUrl: 'examples-list/examples-list.html',
    directives: [ListSettingsComponent, NSRouterLink]
})
export class ExamplesListComponenet {
    @Input() examples: Array<Example>;

    private _filteredExamples: Array<Example> = [];
    private _filterCache: Boolean = undefined;

    constructor(public settings: ListSettingsService, public screen: ScreenSizeService) {
        console.log("------------- ExamplesListComponenet constructor");
    }

    public get isListLayout(): boolean {
        return this.settings.isListLayout;
    }

    public get filteredExamples(): Array<Example> {
        if (this._filterCache !== this.settings.showOnlyNew) {
            this._filterCache = this.settings.showOnlyNew;
            this._filteredExamples.length = 0;

            if (this.settings.showOnlyNew) {
                this._filteredExamples.push.apply(this.filteredExamples, this.examples.filter((e) => e.isNew));
            }
            else {
                this._filteredExamples.push.apply(this.filteredExamples, this.examples);
            }
        }
        return this._filteredExamples;
    }
}