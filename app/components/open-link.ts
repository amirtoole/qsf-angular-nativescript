import {Directive, Input} from "angular2/core";
import {isString} from "angular2/src/facade/lang";
import {topmost} from "ui/frame";
import platform = require("platform");

declare var NSURL: any;
declare var UIApplication: any;
declare var android: any;

var isIOS: boolean = platform.device.os === platform.platformNames.ios;
var isAndroid: boolean = platform.device.os === platform.platformNames.android;

@Directive({
  selector: '[openLink]',
  inputs: ['url: openLink'],
  host: {
    '(tap)': 'onTap()'
  }
})
export class OpenLink {
    public url: string;

    // the instruction passed to the router to navigate
    // // constructor(private _router: Router, private _location: Location) { }

    // get isRouteActive(): boolean { return this._router.isRouteActive(this._navigationInstruction); }

    // set url(changes: any[]) {
    //     console.log("NSRouterLink set routeParams: " + JSON.stringify(changes))

    //     this._routeParams = changes;
    //     this._navigationInstruction = this._router.generate(this._routeParams);
    // }

    onTap(): void {
        console.log("OpenLink onTap")
        
        var url = this.url;
        if (url) {
            if (isIOS) {
                var nsUrl = NSURL.URLWithString(url);
                var sharedApp = UIApplication.sharedApplication();
                if (sharedApp.canOpenURL(nsUrl)) {
                    sharedApp.openURL(nsUrl);
                }
            }
            else if (isAndroid) {
                var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
                var activity = topmost().android.activity;
                activity.startActivity(android.content.Intent.createChooser(intent, "share"));
            }
        }
    }
}