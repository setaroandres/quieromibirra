import { Component, OnInit } from "@angular/core";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { ServiceService } from "../service.service";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Storage } from '@ionic/storage';



@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor(public fb: Facebook, public service: ServiceService,private router: Router,private storage: Storage,public toastController: ToastController) {}

  ngOnInit() {
    console.log("LoginPage");
  }

  //----FACEBOOK------
  fblogin() {
    let existe = false;
    //permissions
    this.fb
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {

        if (res.status == "connected") {

          //Get user ID an Token
          console.log("res",res);
          var fb_id = res.authResponse.userID;
          // this.service.fbIdUser = fb_id;
          // this.service.fbIdUser = fb_id;
          //voy a la base con el id
          //si existe, voy al home
          //si no existe, hago esto de aca abajo
          this.service.validarFBUser(fb_id).subscribe(x => {
            console.log('data', x);
            let data = x["data"];
            console.log('uid', data);
            if (data != '0') {
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
              //Get user infos from the API
              this.fb.api("/me?fields=name,email", []).then(user => {
                console.log("user",user);
                var email = user.email;
                if (email != "") {
                  //this.navCtrl.push(SignupPage, { fbid: fb_id });
                  //redirect to create user con fbid
                  this.service.fbid = fb_id;
                  this.router.navigate(["/crear-usuario/"]);
                 
                }
              });
            }
          });
        } else {
          //error ocurred while loging-in
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
