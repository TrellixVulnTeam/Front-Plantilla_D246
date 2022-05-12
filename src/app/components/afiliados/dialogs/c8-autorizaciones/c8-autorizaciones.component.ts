import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-c8-autorizaciones',
  templateUrl: './c8-autorizaciones.component.html',
  styleUrls: ['./c8-autorizaciones.component.css']
})
export class C8AutorizacionesComponent implements OnInit {

  public formAutorizaciones: FormGroup;

  constructor(private formBuilder: FormBuilder)  {


    this.formAutorizaciones = this.formBuilder.group({
      pregunta1: [false, [
        Validators.requiredTrue
      ]],
      pregunta2: [false, [
        Validators.requiredTrue
      ]],
      pregunta3: [false, [
        Validators.requiredTrue
      ]],
      pregunta4: [false, [
        Validators.requiredTrue
      ]],
      pregunta5: [false, [
        Validators.requiredTrue
      ]]
    });

    console.log(this.formAutorizaciones.valid)
  }

  ngOnInit(): void {
  }

  selectedPregunta1(event: MatCheckboxChange){

    // if(event.checked == true){
    //   this.formPregunta1Compuesta.get('nombre')!.addValidators(Validators.required);
    //   this.formPregunta1Compuesta.get('tipoIdentificacion')!.addValidators(Validators.required);
    //   this.formPregunta1Compuesta.get('numeroIdentificacion')!.addValidators(Validators.required);
    //   this.formPregunta1Compuesta.get('desde')!.addValidators(Validators.required);
    // }else{
    //   this.formPregunta1Compuesta.get('nombre')!.clearValidators();
    //   this.formPregunta1Compuesta.get('tipoIdentificacion')!.clearValidators();
    //   this.formPregunta1Compuesta.get('numeroIdentificacion')!.clearValidators();
    //   this.formPregunta1Compuesta.get('desde')!.clearValidators();
    // }
    // this.formPregunta1Compuesta.controls['nombre'].updateValueAndValidity();
    // this.formPregunta1Compuesta.controls['tipoIdentificacion'].updateValueAndValidity();
    // this.formPregunta1Compuesta.controls['numeroIdentificacion'].updateValueAndValidity();
    // this.formPregunta1Compuesta.controls['desde'].updateValueAndValidity();

  }

}
