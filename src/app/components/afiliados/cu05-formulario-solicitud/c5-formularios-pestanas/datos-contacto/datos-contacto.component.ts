import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DmProcesado } from 'src/app/models/datos-maestros/dm-procesado.model';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { DatosMaestrosService } from 'src/app/services/datos-maestros.service';

@Component({
  selector: 'app-datos-contacto',
  templateUrl: './datos-contacto.component.html',
  styleUrls: ['./datos-contacto.component.css']
})
export class DatosContactoComponent implements OnInit {

  //Formularios
  formularioAfiliados: FormGroup;
  TMP_DIRECCION: FormGroup;

  //locales
  zonaUrbanaActivado: any = null;

  //Valores de concatenación manual
  NuTelefonoAfil_Indicativo = null;
  NuTelefonoAfil_Numero = null;

  //Datos Maestros
  departamentosLst = new DmProcesado();
  ciudadLst: DmProcesado[] = [];
  zonasLst = new DmProcesado();

  localidadesLst: DmProcesado[] = [];
  barriosLst: DmProcesado[] = [];

  localidadesLstFiltrado= new DmProcesado();
  barriosLstFiltrado= new DmProcesado();

  estratoLst = new DmProcesado();
  tipoViaLst = new DmProcesado();
  letraViaLst = new DmProcesado();
  indicativosLst = new DmProcesado();

  constructor( public sharedFb: AfiliadosFormCompartidoService,
    private formBuilder: FormBuilder,
    private datosMaestros: DatosMaestrosService) {
    this.formularioAfiliados = this.sharedFb.getAfiliadosForm();

    this.TMP_DIRECCION = this.formBuilder.group({
      tipoViaPrincipal: [null],
      numeroViaPrincipal: [null],
      letraInicialViaPrincipal: [null],
      Bis: [null],
      letraComplementariaViaPrinc: [null],
      surViaPrincipal: [null],
      surViaPrincipalCbox: this.formBuilder.group({
        cboxE: false,
        cboxS: false
      }),
      numeroViaSecundaria: [null],
      letraTipoViaSecundaria: [null],
      numeroComplemento: [null],
      esteViaSecundaria:[null],
      esteViaSecundariaCbox: this.formBuilder.group({
        cboxE: false,
        cboxS: false
      })
    })

    this.TMP_DIRECCION.valueChanges.subscribe(() => this.concatDirCompuesta())

    // console.log(this.TMP_DIRECCION.value)
    // this.TMP_DIRECCION.controls['Bis'].disable();
    //


    Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
        this.TMP_DIRECCION.controls[key].disable();
    })
    // this.TMP_DIRECCION.disable()
    // this.TMP_DIRECCION.controls['numeroViaSecundaria'].enable();

    // console.log(this.TMP_DIRECCION.value)
  }

  ngOnInit(): void {
    this.datosMaestros.getDepartamentosLst().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.departamentosLst = datosSincronizados;
      }
    });

    this.datosMaestros.getCiudadesLst().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.ciudadLst = datosSincronizados;
      }
    });

    this.datosMaestros.getZonasLst().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.zonasLst = datosSincronizados;
      }
    });
    this.datosMaestros.getLocalidadesLst().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.localidadesLst = datosSincronizados;
      }
    });

    this.datosMaestros.getBarriosLst().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.barriosLst = datosSincronizados;
      }
    });

    this.datosMaestros.getEstratos().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.estratoLst = datosSincronizados;
      }
    });

    this.datosMaestros.getTipoVia().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.tipoViaLst = datosSincronizados;
      }
    });

    this.datosMaestros.getLetraVia().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.letraViaLst = datosSincronizados;
      }
    });

    this.datosMaestros.getIndicativos().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.indicativosLst = datosSincronizados;
      }
    });


  }

  getIndicativos(id: number): DmProcesado{
    // return this.indicativosLst.data.filter(data => data.idRelacion == id)
    let tempRelacion = Object.assign({},this.indicativosLst)
    tempRelacion.data = tempRelacion.data.filter(data => data.idRelacion == id)
    return tempRelacion
  }

  filtrarBarrios(){
    this.formularioAfiliados.controls['NU_IDBARRIO_BARRIO'].enable();

    if(this.zonaUrbanaActivado ==true){
      setTimeout(()=>{

        const departamento = this.formularioAfiliados.get('NU_IDDEPARTAMENTO_DEPAR')?.value
        const idCiudad = this.formularioAfiliados.get('NU_CIUDAD_CIUDAD')?.value
        const idLocalidad = this.formularioAfiliados.get('NU_IDLOCALIDAD_LOCALIDAD')?.value
        const idBarrio = this.formularioAfiliados.get('NU_IDBARRIO_BARRIO')?.value

        if(idLocalidad >= 0){

          this.formularioAfiliados.get('NU_IDBARRIO_BARRIO')?.setValue(null)
          this.formularioAfiliados.get('NU_IDBARRIO_BARRIO')?.enable();

          // console.log(departamento)
          console.log(departamento)
          console.log(idCiudad)
          console.log(idLocalidad)
          // console.log(this.localidadesLst)
          // console.log(this.departamentosLst.data)
          console.log(this.departamentosLst.data.filter(dt => dt.idPosition == departamento))
          console.log(this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idCiudad))

          let dpt = this.departamentosLst.data.filter(dt => dt.idPosition == departamento)
          let ciudad = this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idCiudad);
          let coms = this.localidadesLst[ciudad[0].idPosition].data.filter(dt => dt.idPosition == idLocalidad);
          let brr = this.localidadesLst[coms[0].idPosition].data.filter(dt => dt.idPosition == idBarrio);

          console.log(coms)

          console.log('ciudad')
          // console.log(dpt[0].txValor)
          // console.log(ciudad[0].txValor)
          //console.log(this.localidadesLst)

          // let local =  this.localidadesLst.filter(dt =>
          //   dt.Titulo?.includes(ciudad[0].txValor))

          let dptTxt = dpt[0].txValor.replace(/ /g,'')
          let ciudadTxt = ciudad[0].txValor.replace(/ /g,'')
          let comuTxt = coms[0].txValor.replace(/ /g,'')
          // let barrioTxt = brr[0].txValor.replace(/ /g,'')

          console.log(dptTxt)
          console.log(ciudadTxt)
          console.log(comuTxt)
          console.log(brr)
          console.log(idLocalidad)

          this.barriosLstFiltrado = this.barriosLst.filter(dt =>
            dt.Titulo?.includes(comuTxt) && dt.Titulo?.includes(ciudadTxt))[0]

        }
      }, 50);
    }

  }

  filtrarLocalidad(){

    this.formularioAfiliados.controls['NU_IDZONA_ZONA'].enable();

    if(this.zonaUrbanaActivado ==true){
      setTimeout(()=>{

        const departamento = this.formularioAfiliados.get('NU_IDDEPARTAMENTO_DEPAR')?.value
        const idRelacion = this.formularioAfiliados.get('NU_CIUDAD_CIUDAD')?.value
        if(idRelacion >= 0){
          this.formularioAfiliados.get('NU_IDLOCALIDAD_LOCALIDAD')?.setValue(null)
          this.formularioAfiliados.get('NU_IDLOCALIDAD_LOCALIDAD')?.enable();

          console.log(departamento)
          console.log(idRelacion)
          console.log(this.localidadesLst)
          console.log(this.departamentosLst.data)
          console.log(this.departamentosLst.data.filter(dt => dt.idPosition == departamento))
          console.log(this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idRelacion))

          let ciudad = this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idRelacion);

          // this.localidadesLstFiltrado = this.localidadesLst.filter (dt =>
          //   dt.Titulo?.toString() == ''
          //   )

          this.localidadesLstFiltrado = this.localidadesLst.filter(dt =>
            dt.Titulo?.includes(ciudad[0].txValor))[0]

          console.log(
            (this.localidadesLst.filter(dt => dt.Titulo?.includes(ciudad[0].txValor)) as DmProcesado[])[0].data)
        }
      }, 20);
    }

  }

  get localidades(): DmProcesado{
    //localidadesLst: DmProcesado[]



    // console.log(this.localidadesLst)

    return this.localidadesLst[0]
  }


  activarCiudad(){
    if(this.formularioAfiliados.get('NU_CIUDAD_CIUDAD')?.enabled){
      this.formularioAfiliados.controls['NU_CIUDAD_CIUDAD'].setValue(null);
      return;
    }
    this.formularioAfiliados.controls['NU_CIUDAD_CIUDAD'].enable();
  }

  habilitarCamposZona(){
    //TX_COMPLDIRE_AFIL NO TIENE VALIDACIONES

    console.log(this.formularioAfiliados.get("NU_IDZONA_ZONA"));
    setTimeout(()=>{

      //Limpio valores ingresados cuando se cambia la zona
      this.formularioAfiliados.get("NU_IDLOCALIDAD_LOCALIDAD")?.setValue(null);
      this.formularioAfiliados.get("NU_IDBARRIO_BARRIO")?.setValue(null);
      this.formularioAfiliados.get("NU_IDESTRATO")?.setValue(null);
      this.formularioAfiliados.get("TX_COMPLDIRE_AFIL")?.setValue(null);
      this.formularioAfiliados.get("TX_VEREDA_AFIL")?.setValue(null);
      this.formularioAfiliados.get("TX_DIRECCION_AFIL")?.setValue(null);

      //Limpiar campos estructura compuesta
      this.formularioAfiliados.controls.TMP_DIRECCION_COMPUESTA.reset();
      this.formularioAfiliados.controls.TMP_DIRECCION_COMPUESTA.addValidators(
        Validators.required
      );
      //Limpio validadores

      this.formularioAfiliados.get('NU_IDLOCALIDAD_LOCALIDAD')?.clearValidators();
      this.formularioAfiliados.get('NU_IDBARRIO_BARRIO')?.clearValidators();
      this.formularioAfiliados.get('NU_IDESTRATO')?.clearValidators();
      this.formularioAfiliados.get('TX_COMPLDIRE_AFIL')?.clearValidators();

      this.formularioAfiliados.get('TX_VEREDA_AFIL')?.clearValidators();
      this.formularioAfiliados.get('TX_DIRECCION_AFIL')?.clearValidators();

      if(this.formularioAfiliados.get("NU_IDZONA_ZONA")?.value == 1){
        this.formularioAfiliados.get('NU_IDLOCALIDAD_LOCALIDAD')?.addValidators([
          Validators.required
        ]);
        this.formularioAfiliados.get('NU_IDBARRIO_BARRIO')?.addValidators([
          Validators.required
        ]);
        this.formularioAfiliados.get('NU_IDESTRATO')?.addValidators([
          Validators.required
        ]);
        this.formularioAfiliados.get('TX_COMPLDIRE_AFIL')?.addValidators([
          Validators.required
        ]);

        this.zonaUrbanaActivado = true;
      }else{
        this.formularioAfiliados.get('TX_VEREDA_AFIL')?.addValidators([
          Validators.required,
          //this.validatorSoloLetras
          //this.sharedFb.getValidatorSoloLetras()
        ]);
        this.formularioAfiliados.get('TX_DIRECCION_AFIL')?.addValidators([
          Validators.required
        ]);
        this.zonaUrbanaActivado = false;
      }
    }, 5);
  }

  cambiarZona(event: number){
    console.log(event)


    if(event == 0){
      Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
        this.TMP_DIRECCION.controls[key].enable();
      })
      this.formularioAfiliados.controls['TX_VEREDA_AFIL'].disable();
      this.formularioAfiliados.controls['TX_COMPLDIRE_AFIL'].disable();

      this.formularioAfiliados.controls['NU_IDLOCALIDAD_LOCALIDAD'].enable();
      this.formularioAfiliados.controls['NU_IDBARRIO_BARRIO'].enable();

      this.formularioAfiliados.controls['TX_COMPLDIRE_AFIL'].enable();
      this.formularioAfiliados.controls['NU_IDESTRATO'].enable();

      this.zonaUrbanaActivado = true
      this.filtrarLocalidad();
      // this.filtrarBarrios();
      return;
    }

    this.zonaUrbanaActivado = false
    Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
      this.TMP_DIRECCION.controls[key].disable();
    })
    this.formularioAfiliados.controls['TX_VEREDA_AFIL'].enable();
    this.formularioAfiliados.controls['TX_COMPLDIRE_AFIL'].enable();

    this.formularioAfiliados.controls['TX_COMPLDIRE_AFIL'].disable();
    this.formularioAfiliados.controls['NU_IDESTRATO'].disable();

    this.formularioAfiliados.controls['NU_IDLOCALIDAD_LOCALIDAD'].disable();
    this.formularioAfiliados.controls['NU_IDBARRIO_BARRIO'].disable();
    this.filtrarLocalidad();
    // this.filtrarBarrios();
    this.formularioAfiliados.get('TX_DIRECCION_AFIL')?.setValue(null)
    return;

  }

  getControlValue(controlName: string){
    let value  = this.TMP_DIRECCION.get(controlName)?.value;
    if(value) return  value
    return -1
  }

  concatDirCompuesta(): void{
    console.log('dir cambia contacto')

    let dirCompuesta: any[] = []

    dirCompuesta.push(this.getControlValue('tipoViaPrincipal'))
    dirCompuesta.push(this.getControlValue('numeroViaPrincipal'))
    dirCompuesta.push(this.getControlValue('letraInicialViaPrincipal'))
    dirCompuesta.push(this.getControlValue('Bis'))
    dirCompuesta.push(this.getControlValue('letraComplementariaViaPrinc'))
    dirCompuesta.push(this.getControlValue('surViaPrincipal'))
    dirCompuesta.push(this.getControlValue('numeroViaSecundaria'))
    dirCompuesta.push(this.getControlValue('letraTipoViaSecundaria'))
    dirCompuesta.push(this.getControlValue('numeroComplemento'))
    dirCompuesta.push(this.getControlValue('esteViaSecundaria'))

    // Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
    //     dirCompuesta.push(this.getControlValue(key))
    // })
    // console.log(this.TMP_DIRECCION.value)
    // console.log(dirCompuesta)
    // console.log(dirCompuesta.toString())
    // console.log(JSON.parse("[" +dirCompuesta.toString().split(",").toString()+ "]"))

    // this.formularioAfiliados.get('TX_DIRECCION_AFIL')?.setValue(dirCompuesta)
    this.formularioAfiliados.get('TX_DIRECCION_AFIL')?.setValue(`[${dirCompuesta.toString()}]`)

  }

  //Metodo viejo, no usado
  concatDireccionCompuesta(){
    //    console.log(this.formularioAfiliados.get('TX_NOMIDENTI_AFIL')?.value)


    setTimeout(()=>{


      // let value2 = this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value;
      // console.log("value2")
      // console.log(value2)

      // let direccionCompuesta = '';

      // if(
      //   this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["tipoViaPrincipal"]    &&
      //   this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaPrincipal"]  &&
      //   this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"] &&
      //   this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"]
      // ){
      //   direccionCompuesta = this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["tipoViaPrincipal"];
      //   direccionCompuesta += ' #' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaPrincipal"];

      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraInicialViaPrincipal"]){
      //     direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraInicialViaPrincipal"];
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["Bis"] == true){
      //     direccionCompuesta += ' Bis';
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraComplementariaViaPrinc"]){
      //     direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraComplementariaViaPrinc"];
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["surViaPrincipal"]){
      //     direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["surViaPrincipal"];
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"]){
      //     direccionCompuesta += ' #' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"];
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraTipoViaSecundaria"]){
      //     direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraTipoViaSecundaria"];
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"]){
      //     direccionCompuesta += '-' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"];
      //   }
      //   if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["esteViaSecundaria"]){
      //     direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["esteViaSecundaria"];
      //   }

      //   this.formularioAfiliados.patchValue({
      //     "TX_DIRECCION_AFIL": direccionCompuesta
      //   });
      // }
      // else{
      //   this.formularioAfiliados.patchValue({
      //     "TX_DIRECCION_AFIL": null
      //   });
      // }
      // console.log(this.formularioAfiliados.get('TX_DIRECCION_AFIL')?.value);
    }, 5);


  }

  //Recibo estado del checkbox, nombre del FormControl (campo en formulario) y valor (E/S)
  checkboxGroup(event: MatCheckboxChange, controlName: string, value: any){

    //this.TMP_DIRECCION

    //surViaPrincipalCbox: this.formBuilder.group({
    //esteViaSecundariaCbox

    console.log(event.checked)
    console.log(controlName)
    console.log(value)
    console.log('\\\\\\\\\\\\')

    //Si el campo es: esteViaSecundaria
    if(controlName.match('esteViaSecundaria')){
      //SI el valor es S y está chequeado, desactivo el contrario
      if(value.match('E') && event.checked){

        this.TMP_DIRECCION.patchValue({
            "esteViaSecundariaCbox": {
              "cboxS":false
            }
        })
      }else if(value.match('S') && event.checked){
        //SI el valor es S y está chequeado, desactivo el contrario
        this.TMP_DIRECCION.patchValue({
            "esteViaSecundariaCbox": {
              "cboxE":false
            }
        })
      }
      else{ //Reinicio los valores
        console.log("Reinicio");
        value = null;
        this.TMP_DIRECCION.patchValue({
            "esteViaSecundariaCbox": {
              "cboxE":null,
              "cboxS":null
            }
        })
      }
      this.TMP_DIRECCION.patchValue({
          'esteViaSecundaria': value
      });

    }else if(controlName.match('surViaPrincipal')){
      //SI el valor es S y está chequeado, desactivo el contrario
      if(value.match('E') && event.checked){
        this.TMP_DIRECCION.patchValue({
          "surViaPrincipalCbox": {
            "cboxS":false
          }
        })
      }else if(value.match('S') && event.checked){
        //SI el valor es S y está chequeado, desactivo el contrario
        this.TMP_DIRECCION.patchValue({
          "surViaPrincipalCbox": {
            "cboxE":false
          }
        })

      }
      else{ //Reinicio los valores
        console.log("Reinicio");
        value = null;
        this.TMP_DIRECCION.patchValue({
            "surViaPrincipalCbox": {
              "cboxE":null,
              "cboxS":null
            }
        })
      }
      this.TMP_DIRECCION.patchValue({
          'surViaPrincipal': value
      });
    }
  }

  concatNuTelefonoAfil(value: any, idOperacion: number){
    if(idOperacion == 0){
      this.NuTelefonoAfil_Indicativo = value;
    }else if(idOperacion == 1){
      this.NuTelefonoAfil_Numero = value
    }

    let numeroConcatenado = this.NuTelefonoAfil_Indicativo + '' + this.NuTelefonoAfil_Numero;
    //let numero = parseInt(numeroConcatenado);

    if(this.NuTelefonoAfil_Indicativo != null && this.NuTelefonoAfil_Numero != null ){
      //this.formularioAfiliados.get('NU_TELEFONO_AFIL')?.setValue(this.NuTelefonoAfil_Indicativo! + this.NuTelefonoAfil_Numero!);
      this.formularioAfiliados.get('NU_TELEFONO_AFIL')?.setValue(parseInt(numeroConcatenado));
    }else{
      this.formularioAfiliados.get('NU_TELEFONO_AFIL')?.setValue(null);
    }
   }


}
