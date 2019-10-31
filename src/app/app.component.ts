import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "Mis Promociones",
      url: "/mispromos",
      icon: "list"
    },
    {
      title: "Happy Hours",
      url: "/lista-hhour",
      icon: "list"
    },
    {
      title: "Soporte",
      url: "/soporte",
      icon: "list"
    },
    {
      title: "Detalle de mis puntos",
      url: "/detalle-puntos",
      icon: "list"
    },
    {
      title: "LogOut",
      url: "/login",
      icon: "login"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      // ************************** STATUS BAR

      // let status bar overlay webview
      this.statusBar.overlaysWebView(false);
      // set status bar to white
      if (this.platform.is("android")) {
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString("#ffffff");
      } else {
        this.statusBar.styleDefault();
        this.statusBar.backgroundColorByHexString("#ffffff");
      }
    });
  }
}
