import {Injectable} from 'angular2/core';

@Injectable()
export class ListSettingsService {
    public showOnlyNew = false;
    public isListLayout = false;
    constructor() {
    }
}
