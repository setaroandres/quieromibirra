import { Component } from "@angular/core";

import { Platform, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/tabs/home",
      icon: "home"
    },
    {
      title: "Mis Vouchers y Promociones",
      url: "/tabs/mispromos",
      icon: "list"
    },
    {
      title: "Happy Hours",
      url: "/tabs/lista-hhour",
      icon: "list"
    },
    {
      title: "Detalle de mis puntos",
      url: "/tabs/detalle-puntos",
      icon: "list"
    },
    {
      title: "Soporte",
      url: "/soporte",
      icon: "list"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private navController: NavController,
    private navCtrl: NavController
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

      this.inicio();
    });
  }

  inicio() {
    this.storage.get("dataUser").then(storageData => {
      if (storageData) {
        if (storageData.usuarioid) {
          this.navController.navigateRoot(["tabs/home"]);
          this.splashScreen.hide();
        } else {
          this.navController.navigateRoot("");
          this.splashScreen.hide();
        }
      }
    });
  }

  logOut() {
    this.storage.set("dataUser", null);
    this.navCtrl.setDirection("root");
    this.router.navigateByUrl("/login");
  }
}
