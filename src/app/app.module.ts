import { ServiceService } from "./service.service";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { IonicStorageModule } from "@ionic/storage";
import { MisPuntosComponent } from "./components/mis-puntos/mis-puntos.component";
import { ComponentsModule } from "./components/components.module";
import { DatePipe } from "@angular/common";
import { GoogleMapsService } from "./google-maps.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { Facebook } from "@ionic-native/facebook/ngx";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot( {backButtonText: 'Atras'}),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    NgxQRCodeModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ServiceService,
    GoogleMapsService,
    Geolocation,
    DatePipe,
    BarcodeScanner,
    Facebook,
    InAppBrowser
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
