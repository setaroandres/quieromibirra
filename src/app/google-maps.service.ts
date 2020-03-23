import { Injectable } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { map } from "rxjs/operators";

// import "rxjs/add/operator/map";
declare var google: any;

@Injectable({
  providedIn: "root"
})
export class GoogleMapsService {
  constructor(private geolocation: Geolocation) {
    
  }

  map: any;
  markers: any = [];

  initMap(coords, mapElement: any) {
    let mapProduct = mapElement;

    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then(position => {
        let myPosition = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        let mapOptions = {
          center: coords,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          streetViewControl: false,
          disableDefaultUI: false,
          fullscreenControl: false,
          // zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          rotateControl: false,
          // disableDoubleClickZoom: true,
          draggable: false
        };

        var title = "titleHere";

        this.map = new google.maps.Map(mapProduct, mapOptions);
        resolve(true);
      });
    });
  }

  parseLocation(product) {
    return new Promise(resolve => {
      let geocoder = new google.maps.Geocoder();

      let directions = product.direccion;
      let title = product.nombre;

      geocoder.geocode({ address: directions }, (results, status) => {
        var coords = results[0].geometry.location;
        resolve(coords);
      });
    });
  }

  addMarker(coords) {
    this.markers = [];
    let dirs = {
      lat: coords.lat(),
      lng: coords.lng()
    };
    console.log("DIRS", dirs);

    let marker = new google.maps.Marker({
      position: dirs,
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: "../../assets/map/pin.png"
    });

    this.markers.push(marker);
  }
}
