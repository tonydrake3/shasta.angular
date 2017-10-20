import { Punch } from './../../../models/domain/Punch';
import { ProjectSummaryService } from '../../projects/project-summary/project-summary.service';
import { BaseStore } from './../../../shared/services/base-store.service';
import { Component, Input, OnInit } from '@angular/core';
import { MapsService } from '../../shared/services/maps.service';
import { BaseComponent } from '../../shared/components/base.component';
import { DbGeography } from './../../../models/domain/DbGeography';
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'esub-timecardmap',
  template: `<div id="map" style="z-index: 1;" style="height:100%"></div>`
})
export class TimecardMapComponent implements OnInit {
  _location;
  _val = google.maps.MapTypeId.ROADMAP;
  private _summaryService: ProjectSummaryService;

  @Input() projectId: string;
  @Input() punch: Punch;

  constructor(
    private _maps: MapsService,
    private _projectSummaryService: ProjectSummaryService
  ) {}

  ngOnInit(): void {
    // this._projectSummaryService.config(this.projectId);
    //  this._projectSummaryService.getLatest().then(result => {

    //     const location = result.Value[0].Address;

    //     this._maps.setAddress(location.Address1 + ', ' + location.City + ', '
    //     + location.State);

    this._maps.address$.subscribe(
      address => {
        this.getLocation(<string>address, this.punch);
      },
      error => {
        console.log(error);
      }
    );
    // });
  }

  protected getLocation(address: string, punch: Punch) {
    this._maps.getLocation(address.trim()).subscribe(
      location => {
        this._location = location.results[0].geometry.location;
        this._maps.setLocation(location.results[0].geometry.location);
        const mapProperty = {
          center: new google.maps.LatLng(location.results[0].geometry.location),
          zoom: 13,
          mapTypeId: this._val
        };

        // punch = punch || new Punch();
        // punch.punchInLocation = new DbGeography();
        // punch.punchInLocation.Longitude = -80.12802429999998;
        // punch.punchInLocation.Latitude = 26.619;

        const map = new google.maps.Map(
          document.getElementById('map'),
          mapProperty
        );
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            location.results[0].geometry.location
          ),
          map: map
        });

        if (punch && punch.punchInLocation) {
          const iloc = {
            lat: punch.punchInLocation.Latitude,
            lng: punch.punchInLocation.Longitude
          };
          const markerIn = new google.maps.Marker({
            position: new google.maps.LatLng(iloc),
            map: map
          });
        }

        if (punch && punch.punchInLocation) {
          const oloc = {
            lat: punch.punchOutLocation.Latitude,
            lng: punch.punchOutLocation.Longitude
          };
          const markerOut = new google.maps.Marker({
            position: new google.maps.LatLng(oloc),
            map: map
          });
        }

      },
      error => {
        console.log(error);
      }
    );
  }
}
