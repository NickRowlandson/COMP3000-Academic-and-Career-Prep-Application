import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { AuthService } from './authentication.service';
import 'rxjs/add/operator/toPromise';
import { Client } from "../models/client";
import { SuitabilityForm } from "../models/suitabilityForm";
//import * as pdfFiller from 'pdffiller';

@Injectable()
export class ClientService {

    private clientUrl = 'api/clients';  // URL to web api

    constructor(private http: Http, private authService: AuthService) { }

    getClients(): Promise<Client[]> {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.clientUrl, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getClient(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.clientUrl + '/' + id, options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    populatePRF(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.clientUrl + '/' + id + '/prf', options)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(client: Client, suitabilityForm: SuitabilityForm): Promise<Client> {
        if (client.clientID) {
            return this.put(client, suitabilityForm);
        }
        return this.post(client, suitabilityForm);
    }

    private post(client: Client, suitabilityForm: SuitabilityForm): Promise<Client> {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });
        let objects = ({ client: client, suitabilityForm: suitabilityForm });
        return this.http
            .post(this.clientUrl, objects, options)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(client: Client, suitabilityForm: SuitabilityForm) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });
        let objects = ({ client: client, suitabilityForm: suitabilityForm });
        let url = `${this.clientUrl}/${client.clientID}`;
        return this.http
            .put(url, objects, options)
            .toPromise()
            .then(() => client)
            .catch(this.handleError);
    }

    delete(client: Client) {
        // add authorization header with jwt token
        let headers = new Headers({ authorization: this.authService.token });
        let options = new RequestOptions({ headers: headers });

        let url = `${this.clientUrl}/${client.userID}`;

        return this.http
            .delete(url, options)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
