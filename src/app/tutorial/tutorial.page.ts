import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-tutorial",
  templateUrl: "./tutorial.page.html",
  styleUrls: ["./tutorial.page.scss"]
})
export class TutorialPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.log("TutorialPage");
  }

  irAHome(){
    this.router.navigateByUrl("/tabs/home");
  }
}
