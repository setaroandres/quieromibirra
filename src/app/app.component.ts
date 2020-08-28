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
      icon: "assets/icon/home.png"
    },
    {
      title: "Mis Vouchers y Promociones",
      url: "/tabs/mispromos",
      icon: "assets/icon/promos.png"
    },
    {
      title: "Happy Hours",
      url: "/tabs/lista-hhour",
      icon: "assets/icon/vaso.png"
    },
    {
      title: "Detalle de mis puntos",
      url: "/tabs/detalle-puntos",
      icon: "assets/icon/pesos.png"
    },
    {
      title: "Soporte",
      url: "/soporte",
      icon: "assets/icon/headset.png"
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
      this.statusBar.overlaysWebView(true);
      // set status bar to white
      if (this.platform.is("android")) {
        this.statusBar.styleBlackOpaque();
        this.statusBar.backgroundColorByHexString("#FFF");
      } else {
        this.statusBar.styleBlackOpaque();
        this.statusBar.backgroundColorByHexString("#FFF");
      }

      this.inicio();
    });
  }

  inicio() {
    this.storage.get("dataUser").then(storageData => {
      if (storageData) {
        if (storageData.usuarioid) {
          //this.navController.navigateRoot(["tabs/home"]);
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
