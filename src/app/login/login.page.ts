import { Component, OnInit } from "@angular/core";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { ServiceService } from "../service.service";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  habilitar: boolean;
  constructor(
    public fb: Facebook,
    public service: ServiceService,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    console.log("LoginPage");
    this.service.habilitar().subscribe(x => {
      this.habilitar = (x == true);
    });
  }

  //----FACEBOOK------
  fblogin() {
    let existe = false;
    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        if (res.status == "connected") {
          console.log("res", res);
          var fb_id = res.authResponse.userID;

          this.service.validarFBUser(fb_id).subscribe(x => {
            console.log("data", x);
            let data = x["data"];
            console.log("uid", data);
            if (data != "0") {
              let dataUser = x["data"];

              console.log("DATA: ", dataUser);

              if (dataUser.usuarioid > 0) {
                if (dataUser.rol == "cliente") {
                  console.log("STORAGE", dataUser);
                  this.storage.set("dataUser", dataUser);
                  this.router.navigateByUrl("/tabs/home");
                } else {
                  console.log("ADMIN", dataUser);
                  this.storage.set("dataUser", dataUser);
                  this.router.navigateByUrl("/admin");
                }
              } else {
                this.presentToast();
              }
            } else {
              this.fb.api("/me?fields=name,email", []).then(user => {
                console.log("user", user);
                var email = user.email;
                if (email != "") {
                  this.service.fbid = fb_id;
                  this.router.navigate(["/crear-usuario/"]);
                }
              });
            }
          });
        } else {
          console.log("Error ocurred");
        }
      })
      .catch(error => {
        console.log("Error logging into Facebook", error);
      });
  }

  goToTerminos() {
    window.open("https://ctrlztest.com.ar/birrah/terminos-y-condiciones/");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Este usuario no se encuentra registrado",
      position: "top",
      duration: 2000
    });
    toast.present();
  }
}
