import { ServiceService } from "./../service.service";
import { Component, OnInit } from "@angular/core";
import { ScrollDetail } from "@ionic/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { DatePipe } from "@angular/common";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.page.html",
  styleUrls: ["./crear-usuario.page.scss"]
})
export class CrearUsuarioPage implements OnInit {
  constructor(
    private service: ServiceService,
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private datePipe: DatePipe,
    private storage: Storage
  ) {}

  date: any = new Date();
  registro: FormGroup;
  showToolbar = false;
  public submitAttempt: boolean = false;

  ngOnInit() {
    console.log("CrearUsuarioPage");
    this.form();
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  crearUser() {
    this.submitAttempt = true;

    console.log(this.registro);

    if (!this.registro.valid) {
      console.log("nooo!");
      console.log(this.registro.value);
      this.errorValid();
    } else {
      console.log("success!");

      let a = this.getAge(this.registro.value.nacimiento);
      let fechadecreacion = this.datePipe.transform(this.date, "yyyy-MM-dd");

      if (a >= 18) {
        this.submitAttempt = false;

        this.service
          .crearUsuario(this.registro.value, fechadecreacion)
          .subscribe(data => {
            let dataUser = JSON.parse(data["_body"])["data"];
            console.log("data", dataUser[0]);
            if (dataUser[0]) {
              this.storage.set("dataUser", dataUser[0]);
              this.router.navigateByUrl("/tutorial");
            }
          });
      } else {
        this.errorEdad();
      }
    }
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  form() {
    this.registro = this.formBuilder.group({
      nombre: [
        "",
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ], //Contener letras y espacios, y tener menos de 30 caracteres.
      apellido: [
        "",
        Validators.compose([
          Validators.maxLength(20),
          Validators.pattern("[a-zA-Z ]*"),
          Validators.required
        ])
      ], //Contener letras y espacios, y tener menos de 30 caracteres.
      nacimiento: ["", Validators.required],
      email: [
        "",
        Validators.compose([
          Validators.maxLength(30),
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
      ],
      password: ["", Validators.required]
    });
  }

  async errorEdad() {
    const toast = await this.toastController.create({
      message: "Debés ser mayor de 18 años para crear un usuario",
      position: "top",
      duration: 2000
    });
    toast.present();
  }

  async errorValid() {
    const toast = await this.toastController.create({
      message: "Revisá los campos y volvé a intentarlo",
      position: "top",
      duration: 2000
    });
    toast.present();
  }
}
