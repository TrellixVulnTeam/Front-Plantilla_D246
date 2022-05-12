import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { DmProcesado } from 'src/app/models/datos-maestros/dm-procesado.model';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { DatosMaestrosService } from 'src/app/services/datos-maestros.service';
import { C6DeclaratoriaSaludQuemadoComponent } from '../datos-documentacion/c6-declaratoria-salud-quemado/c6-declaratoria-salud-quemado.component';
import { C6DeclaratoriaSaludComponent } from '../datos-documentacion/c6-declaratoria-salud/c6-declaratoria-salud.component';

@Component({
  selector: 'app-datos-emergencia',
  templateUrl: './datos-emergencia.component.html',
  styleUrls: ['./datos-emergencia.component.css']
})
export class DatosEmergenciaComponent implements OnInit {


  //Formularios
  formularioAfiliados: FormGroup;
  TMP_DIRECCION: FormGroup;

  //locales
  tmpEmergenciaDatosCompuestos!: FormGroup;
  tmpEmergenciaArchivos!: FormGroup;

  zonaUrbanaActivado: any = null;
  direccionEmergencia = false;

  //Datos maestros
  parentescoLst = new DmProcesado();

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
    private datosMaestros: DatosMaestrosService,
    private dialog: MatDialog,) {
    this.formularioAfiliados = this.sharedFb.getAfiliadosForm();

    this.tmpEmergenciaDatosCompuestos = this.formBuilder.group({
      //Telefono
      emergTelIndicativo: null,
      emergTelNumero: [null, this.sharedFb.validatorSoloNumeros],
      //Dirección compuesta
      // tipoViaPrincipalEmergen: null,
      // numeroViaPrincipalEmergen: null,
      // letraInicialViaPrincipalEmergen: null,
      // BisEmergen: null,
      // letraComplementariaViaPrincEmergen: null,
      // surViaPrincipalEmergen: null,
      // surViaPrincipalCboxEmergen: this.formBuilder.group({
      //   cboxEmergenE: false,
      //   cboxEmergenS: false
      // }),
      // numeroViaSecundariaEmergen: null,
      // letraTipoViaSecundariaEmergen: null,
      // numeroComplementoEmergen: null,
      // esteViaSecundariaEmergen:null,
      // esteViaSecundariaCboxEmergen: this.formBuilder.group({
      //   cboxEmergenE: false,
      //   cboxEmergenS: false
      // })
    });

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

    Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
      this.TMP_DIRECCION.controls[key].disable();
  })

    this.TMP_DIRECCION.valueChanges.subscribe(() => this.concatDirCompuesta())

    this.tmpEmergenciaArchivos = this.formBuilder.group({
      idAnverso: [null, [Validators.required]],
      idAnversoB64: [null, [Validators.required]],
      idReverso: [null, [Validators.required]],
      idReversoB64: [null, [Validators.required]],
    })

    this.tmpEmergenciaDatosCompuestos.valueChanges.subscribe(() => this.datosCompuestos())
  }

  datosCompuestos(){
    let indicativo = this.tmpEmergenciaDatosCompuestos.get('emergTelIndicativo')?.value
    let numero = this.tmpEmergenciaDatosCompuestos.get('emergTelNumero')?.value

    if(indicativo && numero){
      // console.log(indicativo + '' + numero)
      this.formularioAfiliados.get('NU_TELEMERGEN_AFIL')?.setValue(indicativo + '' + numero)
    }
    else{
      // console.log('nel')
      this.formularioAfiliados.get('NU_TELEMERGEN_AFIL')?.setValue(null)
    }
  }

  ngOnInit(): void {
    this.datosMaestros.getParentescos().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.parentescoLst = datosSincronizados;
      }
    });
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


  getIndicativos(): DmProcesado{
    // return this.indicativosLst.data.filter(data => data.idRelacion == id)

    //NU_DEPAREMERGEN_AFIL

    // setTimeout(()=>{
      let idDepa = 0;
      if(this.direccionEmergencia){
        idDepa = this.formularioAfiliados.get('NU_DEPAREMERGEN_AFIL')?.value
      }
      else{
        idDepa = this.formularioAfiliados.get('NU_IDDEPARTAMENTO_DEPAR')?.value
      }
      let tempRelacion = Object.assign({},this.indicativosLst)
      tempRelacion.data = tempRelacion.data.filter(data => data.idRelacion == idDepa)
      return tempRelacion
    // }, 50);
  }

  mostrarDireccion(event: boolean){
    console.log(event)
    this.direccionEmergencia = event;
    if(this.direccionEmergencia){
      this.formularioAfiliados.get('NU_DEPAREMERGEN_AFIL')?.enable()
      return
    }
    this.formularioAfiliados.get('NU_DEPAREMERGEN_AFIL')?.disable()

  }

  //#region metodos direccion

  filtrarBarrios(){
    this.formularioAfiliados.controls['NU_BARRIOEMERGEN_AFIL'].enable();

    if(this.zonaUrbanaActivado ==true){
      setTimeout(()=>{

        const departamento = this.formularioAfiliados.get('NU_DEPAREMERGEN_AFIL')?.value
        const idCiudad = this.formularioAfiliados.get('NU_CIUDADEMERGEN_AFIL')?.value
        const idLocalidad = this.formularioAfiliados.get('NU_LOCALIEMERGEN_AFIL')?.value
        const idBarrio = this.formularioAfiliados.get('NU_BARRIOEMERGEN_AFIL')?.value

        if(idLocalidad >= 0){

          this.formularioAfiliados.get('NU_BARRIOEMERGEN_AFIL')?.setValue(null)
          this.formularioAfiliados.get('NU_BARRIOEMERGEN_AFIL')?.enable();

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

    this.formularioAfiliados.controls['NU_ZONAEMERGEN_AFIL'].enable();

    if(this.zonaUrbanaActivado ==true){
      setTimeout(()=>{

        const departamento = this.formularioAfiliados.get('NU_DEPAREMERGEN_AFIL')?.value
        const idRelacion = this.formularioAfiliados.get('NU_CIUDADEMERGEN_AFIL')?.value
        if(idRelacion >= 0){
          this.formularioAfiliados.get('NU_LOCALIEMERGEN_AFIL')?.setValue(null)
          this.formularioAfiliados.get('NU_LOCALIEMERGEN_AFIL')?.enable();

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

  activarCiudad(){
    if(this.formularioAfiliados.get('NU_CIUDADEMERGEN_AFIL')?.enabled){
      this.formularioAfiliados.controls['NU_CIUDADEMERGEN_AFIL'].setValue(null);
      return;
    }
    this.formularioAfiliados.controls['NU_CIUDADEMERGEN_AFIL'].enable();
  }

  cambiarZona(event: number){
    console.log(event)


    if(event == 0){
      Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
        this.TMP_DIRECCION.controls[key].enable();
      })
      this.formularioAfiliados.controls['TX_VEREDAEMERGEN_AFIL'].disable();
      this.formularioAfiliados.controls['TX_COMPLDIREMERGEN_AFIL'].disable();

      this.formularioAfiliados.controls['NU_LOCALIEMERGEN_AFIL'].enable();
      this.formularioAfiliados.controls['NU_BARRIOEMERGEN_AFIL'].enable();

      this.formularioAfiliados.controls['TX_COMPLDIREMERGEN_AFIL'].enable();
      this.formularioAfiliados.controls['NU_ESTRATEMERGEN_AFIL'].enable();

      this.zonaUrbanaActivado = true
      this.filtrarLocalidad();
      // this.filtrarBarrios();
      return;
    }

    this.zonaUrbanaActivado = false
    Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
      this.TMP_DIRECCION.controls[key].disable();
    })
    this.formularioAfiliados.controls['TX_VEREDAEMERGEN_AFIL'].enable();
    this.formularioAfiliados.controls['TX_COMPLDIREMERGEN_AFIL'].enable();

    this.formularioAfiliados.controls['TX_COMPLDIREMERGEN_AFIL'].disable();
    this.formularioAfiliados.controls['NU_ESTRATEMERGEN_AFIL'].disable();

    this.formularioAfiliados.controls['NU_LOCALIEMERGEN_AFIL'].disable();
    this.formularioAfiliados.controls['NU_BARRIOEMERGEN_AFIL'].disable();
    this.filtrarLocalidad();
    // this.filtrarBarrios();
    this.formularioAfiliados.get('TX_DIREMERGEN_AFIL')?.setValue(null)
    return;

  }

  concatDirCompuesta(): void{
    console.log('dir cambia')

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


    this.formularioAfiliados.get('TX_DIREMERGEN_AFIL')?.setValue(`[${dirCompuesta.toString()}]`)

  }

  getControlValue(controlName: string){
    let value  = this.TMP_DIRECCION.get(controlName)?.value;
    if(value) return  value
    return -1
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


  //#endregion

  habilitarCamposZona(){
    //TX_COMPLDIREMERGEN_AFIL NO TIENE VALIDACIONES

    console.log(this.formularioAfiliados.get("NU_ZONAEMERGEN_AFIL"));
    setTimeout(()=>{

      //Limpio valores ingresados cuando se cambia la zona
      this.formularioAfiliados.get("NU_LOCALIEMERGEN_AFIL")?.setValue(null);
      this.formularioAfiliados.get("NU_BARRIOEMERGEN_AFIL")?.setValue(null);
      this.formularioAfiliados.get("NU_ESTRATEMERGEN_AFIL")?.setValue(null);
      this.formularioAfiliados.get("TX_COMPLDIREMERGEN_AFIL")?.setValue(null);

      this.formularioAfiliados.get("TX_VEREDAEMERGEN_AFIL")?.setValue(null);
      this.formularioAfiliados.get("TX_DIREMERGEN_AFIL")?.setValue(null);

      //Limpiar campos estructura compuesta
      this.formularioAfiliados.controls.TMP_DIRECCION_COMPUESTA.reset();
      this.formularioAfiliados.controls.TMP_DIRECCION_COMPUESTA.addValidators(
        Validators.required
      );

      //Limpio validadores

      this.formularioAfiliados.get('NU_LOCALIEMERGEN_AFIL')?.clearValidators();
      this.formularioAfiliados.get('NU_BARRIOEMERGEN_AFIL')?.clearValidators();
      this.formularioAfiliados.get('NU_ESTRATEMERGEN_AFIL')?.clearValidators();
      this.formularioAfiliados.get('TX_COMPLDIREMERGEN_AFIL')?.clearValidators();

      this.formularioAfiliados.get('TX_VEREDAEMERGEN_AFIL')?.clearValidators();
      this.formularioAfiliados.get('TX_DIREMERGEN_AFIL')?.clearValidators();

      if(this.formularioAfiliados.get("NU_ZONAEMERGEN_AFIL")?.value == 1){
        this.formularioAfiliados.get('NU_LOCALIEMERGEN_AFIL')?.addValidators([
          Validators.required
        ]);
        this.formularioAfiliados.get('NU_BARRIOEMERGEN_AFIL')?.addValidators([
          Validators.required
        ]);
        this.formularioAfiliados.get('NU_ESTRATEMERGEN_AFIL')?.addValidators([
          Validators.required
        ]);
        this.formularioAfiliados.get('TX_COMPLDIREMERGEN_AFIL')?.addValidators([
          Validators.required
        ]);

        this.zonaUrbanaActivado = true;
      }else{
        this.formularioAfiliados.get('TX_VEREDAEMERGEN_AFIL')?.addValidators([
          Validators.required,
          //this.validatorSoloLetras
          //this.sharedFb.getValidatorSoloLetras()
        ]);
        this.formularioAfiliados.get('TX_DIREMERGEN_AFIL')?.addValidators([
          Validators.required
        ]);
        this.zonaUrbanaActivado = false;
      }
    }, 5);
  }


  // concatDireccionCompuesta(){
  //   setTimeout(()=>{
  //     let value2 = this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value;
  //     console.log("value2")
  //     console.log(value2)

  //     let direccionCompuesta = '';

  //     if(
  //       this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["tipoViaPrincipal"]    &&
  //       this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaPrincipal"]  &&
  //       this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"] &&
  //       this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"]
  //     ){
  //       direccionCompuesta = this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["tipoViaPrincipal"];
  //       direccionCompuesta += ' #' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaPrincipal"];

  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraInicialViaPrincipal"]){
  //         direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraInicialViaPrincipal"];
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["Bis"] == true){
  //         direccionCompuesta += ' Bis';
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraComplementariaViaPrinc"]){
  //         direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraComplementariaViaPrinc"];
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["surViaPrincipal"]){
  //         direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["surViaPrincipal"];
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"]){
  //         direccionCompuesta += ' #' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"];
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraTipoViaSecundaria"]){
  //         direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["letraTipoViaSecundaria"];
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"]){
  //         direccionCompuesta += '-' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"];
  //       }
  //       if(this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["esteViaSecundaria"]){
  //         direccionCompuesta += ' ' + this.formularioAfiliados.get('TMP_DIRECCION_COMPUESTA')?.value["esteViaSecundaria"];
  //       }

  //       this.formularioAfiliados.patchValue({
  //         "TX_DIREMERGEN_AFIL": direccionCompuesta
  //       });
  //     }
  //     else{
  //       this.formularioAfiliados.patchValue({
  //         "TX_DIREMERGEN_AFIL": null
  //       });
  //     }
  //     console.log(this.formularioAfiliados.get('TX_DIREMERGEN_AFIL')?.value);
  //   }, 5);


  // }

  @HostListener('window:keydown.Alt.m', ['$event'])
  onKeyDownAltM(e: Event) {
    e.preventDefault();
    // console.log(e);
    // console.log('ALT + M');
    //this.formEjemplo();
    //console.log(this.formularioAfiliados.get('')?.value)
  }

  // anverso= '';
  // reverso = '';

  // anversoFile = '';
  // reversoFile = '';

  cargarArchivo(files: any, control: string){

    let fileList = files.target.files as FileList

    if (fileList.length <= 0) return console.log('cancelado')

    if (fileList[0].type != 'application/pdf') return console.log('tipo invalido')

    //convierto tamanio a MB
    let fileSizeMb = +((fileList[0].size / 1024) / 1024).toFixed(2);

    if (fileSizeMb > 10) return console.log('Tamaño fuera de limite')

    let reader = new FileReader();

    let test: {
      ImageBaseData: string | ArrayBuffer | null,
      nombreArchivo: string
    } = {ImageBaseData: '', nombreArchivo: fileList[0].name}

    console.log(files)
    console.log(fileList)
    console.log(fileList[0].name)


    reader.readAsDataURL(fileList[0]);
    reader.onload = function () {
      test.ImageBaseData = reader.result;

      return reader.result;
    };

    console.log(test)

    setTimeout(()=>{
      console.log(control)
      if(control == 'idAnverso'){
        this.tmpEmergenciaArchivos.get('idAnverso')?.setValue(test.nombreArchivo);
        this.tmpEmergenciaArchivos.get('idAnversoB64')?.setValue(test.ImageBaseData);
        console.log('anverso')
      }

      if(control == 'idReverso'){
        console.log('reverso')
        this.tmpEmergenciaArchivos.get('idReverso')?.setValue(test.nombreArchivo);
        this.tmpEmergenciaArchivos.get('idReversoB64')?.setValue(test.ImageBaseData);
      }
      console.log(this.tmpEmergenciaArchivos.value)
    }, 50);
  }


  dialogDeclaratoriaAfil(){
    const newDialog = this.dialog.open(C6DeclaratoriaSaludQuemadoComponent)
    // const newDialog = this.dialog.open(C6DeclaratoriaSaludComponent)
    // console.log()
    newDialog.afterClosed().subscribe(result =>{
      console.log('closed')
      console.log(`Dialog result: ${result}`);
    })

  }

}
