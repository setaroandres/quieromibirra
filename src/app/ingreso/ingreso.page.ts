import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ServiceService } from "../service.service";
import { ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-ingreso",
  templateUrl: "./ingreso.page.html",
  styleUrls: ["./ingreso.page.scss"]
})
export class IngresoPage implements OnInit {
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private service: ServiceService,
    public toastController: ToastController,
    private storage: Storage
  ) {}

  slideOneForm: FormGroup;
  public submitAttempt: boolean = false;

  ngOnInit() {
    console.log("IngresoPage");
    this.form();
  }

  save() {
    this.submitAttempt = true;

    if (!this.slideOneForm.valid) {
      console.log("nooo!");
      console.log(this.slideOneForm.value);
    } else {
      console.log("success!");
      this.submitAttempt = false;
      console.log(this.slideOneForm.value);

      this.service.validarUsuario(this.slideOneForm.value).subscribe(x => {
        let dataUser = x["data"];

        console.log("DATA: ", dataUser);

        if (dataUser.usuarioid > 0) {
          console.log("STORAGE", dataUser);
          this.storage.set("dataUser", dataUser);
          this.router.navigateByUrl("/tabs/home");
        } else {
          this.presentToast();
        }
      });
    }
  }

  goToCrearCuenta() {
    this.router.navigateByUrl("/crear-usuario");
  }

  form() {
    this.slideOneForm = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ]
    });
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
