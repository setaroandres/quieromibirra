import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  slideOneForm: FormGroup;
  public submitAttempt: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder
  ) {
    this.slideOneForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    });
  }

  ngOnInit() {
  }

  save() {

    this.submitAttempt = true;

    if (!this.slideOneForm.valid) {
      console.log("nooo!")
      console.log(this.slideOneForm.value);
    } else {
      console.log("success!")
      this.submitAttempt = false;
      console.log(this.slideOneForm.value);
      this.router.navigateByUrl('/tutorial');
    }

  }

}
