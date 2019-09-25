import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  registro: FormGroup;
  showToolbar = false;
  public submitAttempt: boolean = false;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.registro = formBuilder.group({
      nomyAp:['',Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],//Contener letras y espacios, y tener menos de 30 caracteres.
      nacimiento:['',Validators.required],
      email:['',Validators.compose([Validators.maxLength(30),Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      pw:['',Validators.required]
    })
   }

  ngOnInit() {
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 225;
    }
  }

  crearUser(){
    this.submitAttempt = true;

    if (!this.registro.valid) {
      console.log("nooo!")
      console.log(this.registro.value);
    } else {
      console.log("success!")
      this.submitAttempt = false;
      console.log(this.registro.value);
      this.router.navigateByUrl('/tutorial');
    }
  }

  

}
