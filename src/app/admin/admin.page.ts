import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../service.service";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
})
export class AdminPage implements OnInit {
  constructor(
    private service: ServiceService,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    console.log("AdminPage");
  }

  scanCode() {
    this.barcodeScanner
      .scan({
        preferFrontCamera: false, // iOS and Android
        showFlipCameraButton: false, // iOS and Android
        showTorchButton: true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        prompt: "Coloque el código de QR dentro del área de escaneo", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations: true, // iOS
        disableSuccessBeep: false // iOS and Android
      })
      .then(barcodeData => {
        console.log("data", barcodeData);
        if (barcodeData.text != "") {
          // 0: promo/canje
          // 1: usuarioid
          // 2: promocionid
          // 3: compra_promoid
          // 4: puntos_promo

          var arr = barcodeData.text.split(/[.]/);

          if (arr[0] === "promo") {
            this.retirarCompraPromo(arr[1], arr[2], arr[3], arr[4]);
          } else {
            this.retirarCompraCanje(arr[1], arr[2], arr[3], arr[4]);
          }
        }
      })
      .catch(err => {
        // This seems to happen only when the "back" button is pressed
        //this.showCancelledAlert();
        console.log("erro", err);
      });
  }

  retirarCompraPromo(usuarioid, promocionid, compra_promoid, puntos_promo) {
    this.service
      .retirarCompraPromo(usuarioid, promocionid, compra_promoid, puntos_promo)
      .subscribe(x => {
        console.log("SUCCES...", JSON.parse(x["_body"]));

        let response = JSON.parse(x["_body"])["data"];

        if (response == "updated") {
          this.presentAlertConfirm("promo");
        } else {
          this.presentAlertConfirm("error");
        }
      });
  }

  retirarCompraCanje(usuarioid, canjeid, compra_canjeid, puntos_canje) {
    this.service
      .retirarCompraCanje(usuarioid, canjeid, compra_canjeid, puntos_canje)
      .subscribe(x => {
        console.log("SUCCES...", JSON.parse(x["_body"]));

        let response = JSON.parse(x["_body"])["data"];

        if (response == "updated") {
          this.presentAlertConfirm("canje");
        } else {
          this.presentAlertConfirm("error");
        }
      });
  }

  async presentAlertConfirm(value) {
    let msj;

    if (value == "error") {
      msj = "Este código QR ya fue utilizado";
    } else {
      msj = "El código fue escaneado correctamente";
    }

    const alert = await this.alertController.create({
      header: "¡Muchas gracias!",
      message: msj,
      buttons: [
        {
          text: "Ok!",
          handler: () => {
            // this.router.navigate(["tabs/home"]);
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    this.router.navigateByUrl("/login");
  }
}
