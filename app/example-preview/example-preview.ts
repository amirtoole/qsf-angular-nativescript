import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {groups, Example, getExampleById} from "../model/examples-model";
import {OpenLink} from "../components/open-link";
import {RouteParams} from 'angular2/router';

@Component({
    selector: 'example-preview',
    templateUrl: 'example-preview/example-preview.html',
    directives: [CORE_DIRECTIVES, OpenLink]
})
export class ExamplePreviewComponenet {
    public example: Example;

    constructor(params: RouteParams) {
        var id = params.get("id");
        this.example = getExampleById(id);
    }
}