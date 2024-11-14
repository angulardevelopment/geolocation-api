import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css'],
})
export class GeoComponent implements OnInit {
  ngOnInit() {
    const arrow = <HTMLCanvasElement>document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition(
      (data) => {
        console.log(data);
        if (data.coords.speed) {
          speed.textContent = data.coords.speed.toString();
          arrow.style.transform = `rotate(${data.coords.heading}deg)`;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  loc() {
    // By this, you can get the current position and watch the current position.
    //callback function
    var displayLocationInfo = (position) => {
      console.log(position);
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log(`longitude: ${lng} | latitude: ${lat}`);
    };
    // navigator.geolocation.getCurrentPosition(success, error, options);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(displayLocationInfo);
    }

    const watcher = navigator.geolocation.watchPosition(displayLocationInfo);
    setTimeout(() => {
      navigator.geolocation.clearWatch(watcher);
    }, 15000);

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  }
}
