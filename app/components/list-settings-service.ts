import {Injectable} from 'angular2/angular2';

@Injectable()
export class ListSettingsService {
    public showOnlyNew = false;
    public isListLayout = false;
    constructor() {
    }
}
