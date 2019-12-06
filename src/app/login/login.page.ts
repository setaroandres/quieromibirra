import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {
    console.log("LoginPage");
  }

  //----FACEBOOK------
  // loginWithFB() {
  //   // Login with permissions
  //   this.fb
  //     .login(["email", "public_profile", "user_friends"])
  //     .then((res: FacebookLoginResponse) => {
  //       console.log("1 RESPONSE, ", res);

  //       this.fb.api("/me?fields=name,email, picture", []).then(profile => {
  //         console.log("2 PROFILE, ", profile);

  //         let nombre = profile["name"].split(" ")[0];
  //         let apellido = profile["name"].split(" ")[1];

  //         let userData = {
  //           id: profile["id"],
  //           name: nombre,
  //           apellido: apellido,
  //           email: profile["email"],
  //           picture: profile["picture"]["data"]["url"],
  //           accessToken: res.authResponse.accessToken
  //         };

  //         console.log("3 USER DATA, ", userData);

  //         this.apiProvider
  //           .validarUserFb(
  //             userData.id,
  //             userData.name,
  //             userData.apellido,
  //             userData.email,
  //             userData.picture
  //           )
  //           .subscribe(x => {
  //             let data = JSON.parse(x["_body"])["data"];
  //             // console.log("DATA 1, ", data[0]);

  //             if (+data[0].usuarioid > 0) {
  //               this.signInPass(data[0]);
  //             }
  //           });
  //       });
  //     })
  //     .catch(e => {
  //       console.log("Error logging into Facebook", e);
  //     });
  // }
}
