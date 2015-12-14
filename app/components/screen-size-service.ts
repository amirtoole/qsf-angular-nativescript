import {Injectable} from 'angular2/angular2';
import { screen } from "platform";

@Injectable()
export class ScreenSizeService {
  public get width(): number {
    return screen.mainScreen.widthDIPs;
  }

  public get height(): number {
    return screen.mainScreen.heightDIPs;
  }
}
