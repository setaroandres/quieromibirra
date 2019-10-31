import { ServiceService } from "./../service.service";
import { Component, OnInit } from "@angular/core";
import { ScrollDetail } from "@ionic/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: "app-crear-usuario",
  templateUrl: "./crear-usuario.page.html",
  styleUrls: ["./crear-usuario.page.scss"]
})
export class CrearUsuarioPage implements OnInit {
  constructor(
    private service: ServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

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
    } else {
      console.log("success!");
      this.submitAttempt = false;

      this.service.crearUsuario(this.registro.value).subscribe(data => {
        console.log("data", data);
        if (data) {
          this.service.dataUser = data;
          this.router.navigateByUrl("/tutorial");
        }
      });
    }
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
}
