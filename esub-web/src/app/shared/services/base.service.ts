import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable ()
export class BaseService {
    headers = new Headers();

    constructor (private http: Http) {
        this.addHeaders(this.headers);
    }

    //TODO: Add mechanism to load Token from sessionStorage
    addHeaders(headers: Headers) {
        headers.append('Authorization', 'Bearer' + 'Token');
        headers.append('X-Esub-Tenant', '1');
    }

    get(url: string) {
        return this.http.get(url, {headers: this.headers});
    }

    post(url: string, payload: any) {
        return this.http.post(url, payload, {headers: this.headers});
    }

    put(url: string, payload: any) {
        return this.http.put(url, payload, {headers: this.headers});
    }

    delete(url: string) {
        return this.http.delete(url, {headers: this.headers});
    }
}