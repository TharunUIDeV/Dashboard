import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {isNullOrUndefined} from 'util';

declare const window: any;

@Injectable()
export class ConfigService {
    public env: string;
    public apiKey: string;
    public mfaToken: string;
    public apiBaseUrl: string;
    public dsc: string;
    public sp: string;
    public vp: string;
    public ap: string;
    public digitalFingerPrint: string;
    public participantID: string;
    public participantFirstName: string;

    ready = new BehaviorSubject(false);
    public additionalQuery = 'appName=CMK_WEB&channelName=WEB&deviceID=device12345&deviceToken=device12345&deviceType=AND_MOBILE&lineOfBusiness=PBM&serviceCORS=TRUE&version=1.0';


    constructor() {
            if (isNullOrUndefined(this.env)) {
                this.env = 'prod';
            }
            if (this.env) {
                if (this.env.includes('sit')) {
                    this.apiBaseUrl = `https://${this.env}pbmservices.caremark.com/`;
                } else if (this.env.includes('dev')) {
                    this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
                } else if (this.env.includes('stp')) {
                    this.apiBaseUrl = `https://stpservices.caremark.com:11101/`;
                } else if (this.env.includes('prod')) {
                    this.apiBaseUrl = `https://pbmservices.caremark.com/`;
                }
            }
            this.init();
    }


    getRouteFor(serviceRoute: string, noQuery?: boolean) {
        let route;
        if (noQuery) {
            route = `${this.apiBaseUrl}${serviceRoute}`;
        } else {
            route = `${this.apiBaseUrl}${serviceRoute}?apiKey=${this.apiKey}&mfaToken=${this.mfaToken}&serviceName=${serviceRoute.split('/')[1]}&${this.additionalQuery}`;
        }
        return route;
    }


    init: Function = _.debounce(() => {
      console.log('Inside config service init');
        try {
            const data = <any>window.parent.portalDataJson;
            if (data) {
                this.env = data.apiData.env;
                this.apiKey = data.apiData.apiKey;
                this.apiBaseUrl = data.apiData.apiBaseUrl;
                if (this.apiBaseUrl.includes('devservices-west.caremark.com')) {
                    this.apiBaseUrl = `https://devservices-west.caremark.com:11101/`;
                }
                this.participantID = data.appData.ParticipantID;
                this.participantFirstName = data.appData.ParticipantFirstName;
            }
            console.log('Env => ' + this.env + ' Participant Id => ' + this.participantID + ' Participant Name => ' + this.participantFirstName)
        } catch (e) {
            console.log('config service --> init() :' + e);
        } finally {
            //this.ready.next(this.validate());
        }
    }, 200);


    private validate(): boolean {
        console.log(`env: ${this.env}\napiKey: ${this.apiKey}\nmfaToken: ${this.mfaToken}\napiBaseUrl: ${this.apiBaseUrl}`);
        return !(isNullOrUndefined(this.env) || isNullOrUndefined(this.apiKey)
            || isNullOrUndefined(this.apiBaseUrl) || isNullOrUndefined(this.mfaToken)) || (!isNullOrUndefined(this.env) && this.env.includes('demo'));
    }

}
