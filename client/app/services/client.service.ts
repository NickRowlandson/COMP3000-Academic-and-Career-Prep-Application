import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Client } from "../models/client";

@Injectable()
export class ClientService {

    private clientUrl = 'api/clients';  // URL to web api

    constructor(private http: Http) { }

    getClients(): Promise<Client[]> {
        return this.http.get(this.clientUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getClient(id: string) {
        return this.http.get(this.clientUrl + '/' + id)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    save(client: Client): Promise<Client>  {
        if (client.clientID) {
            return this.put(client);
        }
        return this.post(client);
    }

    private post(client: Client): Promise<Client> {
        console.log(client);
        let headers = new Headers({
            'Content-Type': 'application/json'});
        return this.http
            .post(this.clientUrl, JSON.stringify(client), {headers:headers})
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    private put(client: Client) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.clientUrl}/${client.clientID}`;

        return this.http
            .put(url, JSON.stringify(client), {headers: headers})
            .toPromise()
            .then(() => client)
            .catch(this.handleError);
    }

    delete(client: Client) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.clientUrl}/${client.clientID}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
