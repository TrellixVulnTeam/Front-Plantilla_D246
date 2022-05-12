import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DmProcesado } from 'src/app/models/datos-maestros/dm-procesado.model';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { DatosMaestrosService } from 'src/app/services/datos-maestros.service';

@Component({
  selector: 'app-c5-datos-principales',
  templateUrl: './c5-datos-principales.component.html',
  styleUrls: ['./c5-datos-principales.component.css']
})
export class C5DatosPrincipalesComponent implements OnInit {

//Formularios
formularioAfiliados: FormGroup
formularioLocal: FormGroup

 //Lógica  condicional para los campos
 mostrarConvenio = false;
 permitirLetrasNumIdentificacion = false;

//Limites
minDate: Date;
maxDate: Date = new Date();

//Variables locales
edad = '';

//Datos maestros
tipoIdentificacion? = new DmProcesado();
nacionalidades? = new DmProcesado();
sexoLista? = new DmProcesado();
grupoEtnico? = new DmProcesado();
grupoPoblacional? = new DmProcesado();

adminEAPB? = new DmProcesado();
nombreConveniosLst: DmProcesado[] = [];


constructor(
  public sharedFb: AfiliadosFormCompartidoService,
  private formBuilder: FormBuilder,
  private datosMaestros: DatosMaestrosService,  )
  {

    this.formularioAfiliados = this.sharedFb.getAfiliadosForm();


    console.log(this.formularioAfiliados.value)
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);

    this.formularioLocal = this.formBuilder.group({
      edadCalculada: ''
    })
}


ngOnInit(): void {

  this.datosMaestros.getTipoId().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.tipoIdentificacion = datosSincronizados;
    }
  });

  this.datosMaestros.getNacionalidadesList().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.nacionalidades = datosSincronizados;
    }
  });

  this.datosMaestros.getSexoList().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.sexoLista = datosSincronizados;
    }
  });

  this.datosMaestros.getGrupoEtnicoList().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.grupoEtnico = datosSincronizados;
    }
  });

  this.datosMaestros.getGrupoPoblacional().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.grupoPoblacional = datosSincronizados;
    }
  });

  this.datosMaestros.getAdminEabp().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.adminEAPB = datosSincronizados;
    }
  });

  this.datosMaestros.getConvenios().subscribe(datosSincronizados =>{
    if(datosSincronizados){
      this.nombreConveniosLst = datosSincronizados;
    }
  });
}

calcularEdad(event: any){
  console.log(this.tipoIdentificacion)

  console.log(event)
  console.log(event.target.value)
  if(event.target.value){
    let fechaNacimiento = new Date(event.target.value);
    let timeDiff = Math.abs(Date.now() - fechaNacimiento.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log(age)
    this.formularioLocal.get('edadCalculada')?.setValue(age + ' años');
  }else{
    this.formularioLocal.get('edadCalculada')?.setValue('');
  }

}

agregarGrupoPoblacional(event: any){
  console.log(event)

  let gruposPoblacionales = `[${event.toString()}]`
  console.log(gruposPoblacionales)
  this.formularioAfiliados.get('NU_IDGRUPOPOBLA_GRUPOPOBL')?.setValue(gruposPoblacionales);

  //nU_IDGRUPOPOBLA_GRUPOPOBL
}


mostrarListaConvenio(event: MatCheckboxChange){
  this.mostrarConvenio = event.checked;

  if(this.mostrarConvenio){

    this.formularioAfiliados.controls['TX_NOMCONEAPB_AFIL'].disable();
    this.formularioAfiliados.controls['TX_ADMINEAPB_AFIL'].enable();

    if(this.formularioAfiliados.get('TX_ADMINEAPB_AFIL')?.value){
      this.formularioAfiliados.controls['TX_NOMCONEAPB_AFIL'].enable();
    }
    return;
  }

  this.formularioAfiliados.controls['TX_NOMCONEAPB_AFIL'].disable();
  this.formularioAfiliados.controls['TX_ADMINEAPB_AFIL'].disable();



  // this.formularioAfiliados.get("EABP")?.setValue(null);
  // this.formularioAfiliados.get("NomConvenio")?.setValue(null);

  // if(this.mostrarConvenio){
  //   this.formularioAfiliados.get('EABP')?.addValidators([
  //     Validators.required
  //   ]);
  //   this.formularioAfiliados.get('NomConvenio')?.addValidators([
  //     Validators.required
  //   ]);
  // }else{
  //   this.formularioAfiliados.get('EABP')?.clearValidators();
  //   this.formularioAfiliados.get('NomConvenio')?.clearValidators();
  // }

  // setTimeout(()=>{
  //   this.formularioAfiliados.get('EABP')?.updateValueAndValidity();
  //   this.formularioAfiliados.get('NomConvenio')?.updateValueAndValidity();
  // }, 1);
}

activarEabp(){
  this.formularioAfiliados.controls['TX_NOMCONEAPB_AFIL'].setValue(null);
  this.formularioAfiliados.controls['TX_NOMCONEAPB_AFIL'].enable();
}

habilitarNumeroIdentificacion(){

  //Limpio valores
  this.formularioAfiliados.get("TX_IDENTIFICACION_AFIL")?.setValue([null]);

  //Limpio validadores
  // this.formularioAfiliados.get('TX_IDENTIFICACION_AFIL')?.clearValidators();

  //Proceso en 5 ms
  setTimeout(()=>{
    console.log(this.formularioAfiliados.get('NU_IDTIPOIDEN_TIPOIDEN')?.value);
    if(this.formularioAfiliados.get('NU_IDTIPOIDEN_TIPOIDEN')?.value == 2){
      // this.formularioAfiliados.get('TX_IDENTIFICACION_AFIL')?.addValidators([
      //   Validators.required,
      //   //this.validatorLetrasNumeros
      //   //this.sharedFb.getValidatorLetrasNumeros()
      // ]);
      this.permitirLetrasNumIdentificacion = true;
    }
    else{
      // this.formularioAfiliados.get('TX_IDENTIFICACION_AFIL')?.addValidators([
      //   Validators.required,
      //   //this.validadorSoloNumeros
      //   //this.sharedFb.getValidatorSoloNumeros()
      // ]);
      this.permitirLetrasNumIdentificacion = false;
    }
    console.log(this.permitirLetrasNumIdentificacion)
  }, 5);
 }


testArray(){
  console.log(this.formularioAfiliados.value);
}
}
