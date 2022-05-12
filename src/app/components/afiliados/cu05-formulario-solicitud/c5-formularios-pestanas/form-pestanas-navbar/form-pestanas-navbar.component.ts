import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-pestanas-navbar',
  templateUrl: './form-pestanas-navbar.component.html',
  styleUrls: ['./form-pestanas-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormPestanasNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logChange(index: number){
    if(index != null) {
      console.log(index)
    }
  }

}
