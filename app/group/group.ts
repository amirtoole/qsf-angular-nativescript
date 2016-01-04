import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteParams, Router } from 'angular2/router';
import {groups, ExampleGroup} from "../model/examples-model";
import {ExamplesListComponenet} from "../examples-list/examples-list";
import {ListSettingsService} from "../components/list-settings-service";

@Component({
    selector: 'example-group',
    templateUrl: 'group/group.html',
    directives: [ExamplesListComponenet],
    providers: [ListSettingsService]
})
export class GroupComponenet {
    public group: ExampleGroup;
    constructor(params: RouteParams, private router: Router) {
        console.log('ROUTER: ' + (<any>this.router.constructor).name);
        var id = params.get("id");
        console.log("GROUP id: " + id);
        for (var group of groups) {
            if (group.id === id) {
                this.group = group;
                break;
            }
        }
    }

    public routerNavigate() {
        console.log("Navigating to main...");
        this.router.navigate(["Main"]);
    }
}
