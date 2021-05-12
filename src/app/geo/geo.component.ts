import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {


  ngOnInit() {
    const arrow = <HTMLCanvasElement>document.querySelector('.arrow');
    const speed = document.querySelector('.speed-value');

    navigator.geolocation.watchPosition((data) => {
      console.log(data);
      if (data.coords.speed) {
        speed.textContent = data.coords.speed.toString();
        arrow.style.transform = `rotate(${data.coords.heading}deg)`;
      }

    }, (err) => {
      console.error(err);
    });
  }

}
