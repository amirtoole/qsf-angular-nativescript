import {Component, CORE_DIRECTIVES, Input} from 'angular2/angular2';
import {Example} from "../model/examples-model";
import {ListSettingsService} from "../components/list-settings-service";
import {ListSettingsComponent} from "../components/list-settings";
import {ScreenSizeService} from "../components/screen-size-service";
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'examples-list',
    templateUrl: 'examples-list/examples-list.html',
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, ListSettingsComponent]
})
export class ExamplesListComponenet {
    @Input() examples: Array<Example>;


    constructor(public settings: ListSettingsService, public screen: ScreenSizeService) {
        console.log("------------- ExamplesListComponenet constructor");
    }

    public get isListLayout(): boolean {
        return this.settings.isListLayout;
    }

    public get filteredExamples(): Array<Example> {
        if (this.settings.showOnlyNew) {
            return this.examples.filter((e) => e.isNew)
        }
        else {
            return this.examples;
        }
    }
}