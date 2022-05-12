import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DmProcesado } from 'src/app/models/datos-maestros/dm-procesado.model';
import { DatosMaestrosService } from 'src/app/services/datos-maestros.service';

@Component({
  selector: 'app-c7-declaracion-juramento',
  templateUrl: './c7-declaracion-juramento.component.html',
  styleUrls: ['./c7-declaracion-juramento.component.css']
})
export class C7DeclaracionJuramentoComponent implements OnInit {

  // public formPregunta1Compuesta: FormGroup;
  public formDeclaracionJuramento: FormGroup;

  //Datos maestros
  tipoIdentificacion? = new DmProcesado();

  constructor(private formBuilder: FormBuilder, private datosMaestros: DatosMaestrosService)  {
    // this.formPregunta1Compuesta = this.formBuilder.group({
    //   selected: [null],
    //   nombre: [null],
    //   tipoIdentificacion:[null],
    //   numeroIdentificacion:[null],
    //   desde:[null]
    // });

    this.formDeclaracionJuramento = this.formBuilder.group({
      // pregunta1: [null, [
      //   //Validators.required
      // ]],
      selected: [null],
      nombre: [null, [Validators.required]],
      tipoIdentificacion:[null, [Validators.required]],
      numeroIdentificacion:[null, [Validators.required]],
      desde:[null, [Validators.required]],

      pregunta2: [null, [Validators.requiredTrue ]],
      pregunta3: [null, [ Validators.requiredTrue ]],
      pregunta4: [null, [ Validators.requiredTrue ]],
      pregunta5: [null, [ Validators.requiredTrue ]],
      pregunta6: [null, [ Validators.requiredTrue ]],
      pregunta7: [null, [  Validators.requiredTrue ]],
      pregunta8: [null, [ Validators.requiredTrue ]],
      pregunta9: [null, [ Validators.requiredTrue  ]]
    });
    // this.formPregunta1Compuesta.disable();

    this.formDeclaracionJuramento.get('nombre')?.disable();
    this.formDeclaracionJuramento.get('tipoIdentificacion')?.disable();
    this.formDeclaracionJuramento.get('numeroIdentificacion')?.disable();
    this.formDeclaracionJuramento.get('desde')?.disable();

  }

  ngOnInit(): void {
    this.datosMaestros.getTipoId().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.tipoIdentificacion = datosSincronizados;
      }
    });
  }

  permitirLetrasNumIdentificacion = false;
  habilitarNumeroIdentificacion(){
    //Limpio valores
    this.formDeclaracionJuramento.get("numeroIdentificacion")?.setValue([null]);

    //Proceso en 5 ms
    setTimeout(()=>{
      console.log(this.formDeclaracionJuramento.get('tipoIdentificacion')?.value);
      if(this.formDeclaracionJuramento.get('tipoIdentificacion')?.value == 2){
        this.permitirLetrasNumIdentificacion = true;
      }
      else{
        this.permitirLetrasNumIdentificacion = false;
      }
      console.log(this.permitirLetrasNumIdentificacion)
    }, 10);
  }

  selectedPregunta1(event: MatCheckboxChange){

    if(event.checked == true){
      // this.formPregunta1Compuesta.enable();
      this.formDeclaracionJuramento.get('nombre')?.enable();
      this.formDeclaracionJuramento.get('tipoIdentificacion')?.enable();
      this.formDeclaracionJuramento.get('numeroIdentificacion')?.enable();
      this.formDeclaracionJuramento.get('desde')?.enable();
    }else{
      // this.formPregunta1Compuesta.disable();
      this.formDeclaracionJuramento.get('nombre')?.disable();
      this.formDeclaracionJuramento.get('tipoIdentificacion')?.disable();
      this.formDeclaracionJuramento.get('numeroIdentificacion')?.disable();
      this.formDeclaracionJuramento.get('desde')?.disable();

    }
    this.formDeclaracionJuramento.updateValueAndValidity()



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
