import {Component, Input, OnInit} from '@angular/core';
import {MapsService} from '../services/maps.service';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'esub-map',
    template: `<div id="map"></div>`
})
export class MapComponent implements OnInit {

    _location;
    _val = google.maps.MapTypeId.ROADMAP;

    constructor (private _maps: MapsService) {}

    ngOnInit () {

        this._maps.address$

            .subscribe(

                (address) => {

                    this.getLocation(<string> address);
                },
                (error) => {

                    console.log(error);
                }
            );
    }

    protected getLocation (address: string) {

        this._maps.getLocation(address)

            .subscribe(

                (location) => {

                    this._location = location.results[0].geometry.location;
                    this._maps.setLocation(this._location);
                    const mapProperty = {
                        center: new google.maps.LatLng(this._location),
                        zoom: 16,
                        mapTypeId: this._val
                    };

                    const map = new google.maps.Map(document.getElementById('map'), mapProperty);

                    const marker = new google.maps.Marker({
                        position: new google.maps.LatLng(this._location),
                        map: map
                    });
                },
                (error) => {

                    console.log(error);
                }
            );
    }
}
