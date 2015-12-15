import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteParams } from 'angular2/router';
import {groups, ExampleGroup} from "../model/examples-model";
import {ExamplesListComponenet} from "../examples-list/examples-list";
import {ListSettingsService} from "../components/list-settings-service";

@Component({
    selector: 'example-group',
    templateUrl: 'group/group.html',
    directives: [CORE_DIRECTIVES, ExamplesListComponenet],
    providers: [ListSettingsService]
})
export class GroupComponenet {
    public group: ExampleGroup;
    constructor(params: RouteParams) {
        //var id = params.get("id");
        var id = "coreui";

        console.log("GROUP id: " + id);
        for (var group of groups) {
            if (group.id === id) {
                this.group = group;
                break;
            }
        }
    }
}