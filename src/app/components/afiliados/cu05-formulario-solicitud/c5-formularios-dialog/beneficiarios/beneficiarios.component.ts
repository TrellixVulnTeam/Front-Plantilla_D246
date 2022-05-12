import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DatoExpandido, DmProcesado } from 'src/app/models/datos-maestros/dm-procesado.model';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { DatosMaestrosService } from 'src/app/services/datos-maestros.service';

@Component({
  selector: 'app-beneficiarios',
  templateUrl: './beneficiarios.component.html',
  styleUrls: ['./beneficiarios.component.css']
})
export class BeneficiariosComponent implements OnInit {

  //Formularios
  _formularioAfiliados: FormGroup;
  formArchivos: FormGroup;
  TMP_DIRECCION: FormGroup;
  tmpEmergenciaDatosCompuestos!: FormGroup;

  //Logica condicional
  limiteBeneficiarios = 10; //10
  permitirLetrasNumIdentificacion = false;
  zonaUrbanaActivado: boolean | null = null;
  mostrarDiscapacidades = false;

  //Valores locales
  beneficiarioLocal!: FormGroup;
  BeneficiariosArray: FormArray;

  //Valores de concatenación manual
  NuTelefonoAfil_Indicativo = null;
  NuTelefonoAfil_Numero = null;

  //Limites
  minDate: Date;
  maxDate: Date = new Date();
  otraDireccion = false

  // Datos tabla
  displayedColumns: string[] = ['IDENTIFICACION', 'NOMBRE', 'PARENTESCO', 'ACCIONES'];



  //Datos maestros
  tipoIdentificacion? = new DmProcesado();
  nacionalidades? = new DmProcesado();
  sexoLista? = new DmProcesado();
  grupoEtnico? = new DmProcesado();
  grupoPoblacional? = new DmProcesado();

  adminEAPB? = new DmProcesado();
  nombreConveniosLst: DmProcesado[] = [];
  //
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

  //Datos Maestros
  orientacionSexualLst = new DmProcesado();
  estadoCivilLst = new DmProcesado();
  tipoSangreLst = new DmProcesado();
  rhLst = new DmProcesado();
  escolaridadesLst = new DmProcesado();
  epsAnteriorLst = new DmProcesado();
  regimenLst = new DmProcesado();
  ocupacionesLst = new DmProcesado();
  fondoPensionesLst = new DmProcesado();

  sedesLst = new DmProcesado();
  dependenciasLst: DmProcesado[] = [];
  tipoSolicitudesLst = new DmProcesado();

  discapacidadLst = new DmProcesado();
  discapacidadLstFiltrado = new DmProcesado();

  tiposAfiliacion = new DmProcesado();
  upcAdicional = new DmProcesado();

  fruitCtrl = new FormControl();
  constructor( public sharedFb: AfiliadosFormCompartidoService,
    private formBuilder: FormBuilder,
    private datosMaestros: DatosMaestrosService, ) {
    this._formularioAfiliados = this.sharedFb.getAfiliadosForm();

    //Recibo el array de beneficiarios POR REFERENCIA
    this.BeneficiariosArray = this.sharedFb.getBeneficiariosArrayForm;

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 120, 0, 1);
    this.crearBeneficiario();

    this.fruitCtrl.disable();

    this.formArchivos = this.formBuilder.group({
      archivos: this.formBuilder.array([])
    })

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

    this.crearArchivos();

    this.tmpEmergenciaDatosCompuestos = this.formBuilder.group({
      emergTelIndicativo: null,
      emergTelNumero: [null, this.sharedFb.validatorSoloNumeros],
    });

    this.tmpEmergenciaDatosCompuestos.valueChanges.subscribe(() => this.datosCompuestos())

  }

  datosCompuestos(){
    let indicativo = this.tmpEmergenciaDatosCompuestos.get('emergTelIndicativo')?.value
    let numero = this.tmpEmergenciaDatosCompuestos.get('emergTelNumero')?.value

    if(indicativo && numero){
      // console.log(indicativo + '' + numero)
      this.beneficiarioLocal.get('NU_TELEFONO_AFIL')?.setValue(indicativo + '' + numero)
    }
    else{
      // console.log('nel')
      this.beneficiarioLocal.get('NU_TELEFONO_AFIL')?.setValue(null)
    }
    console.log(this.beneficiarioLocal.get('NU_TELEFONO_AFIL')?.value)
  }


  getIndicativos(): DmProcesado{
    // return this.indicativosLst.data.filter(data => data.idRelacion == id)

    //NU_DEPAREMERGEN_AFIL

    // setTimeout(()=>{
      let idDepa = 0;
      if(this.otraDireccion){
        idDepa = this.beneficiarioLocal.get('NU_IDDEPARTAMENTO_DEPAR')?.value
      }
      else{
        idDepa = this._formularioAfiliados.get('NU_IDDEPARTAMENTO_DEPAR')?.value
      }
      let tempRelacion = Object.assign({},this.indicativosLst)
      tempRelacion.data = tempRelacion.data.filter(data => data.idRelacion == idDepa)
      return tempRelacion
    // }, 50);
  }

  ngOnInit(): void {
    //#region part 1
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

    this.datosMaestros.getOrientacionSexual().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.orientacionSexualLst = datosSincronizados;
      }
    });
    //#endregion

    //#region 2
    this.datosMaestros.getOrientacionSexual().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.orientacionSexualLst = datosSincronizados;
      }
    });

    this.datosMaestros.getEstadoCivil().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.estadoCivilLst = datosSincronizados;
      }
    });

    this.datosMaestros.getTipoSangre().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.tipoSangreLst = datosSincronizados;
      }
    });

    this.datosMaestros.getRhsLst().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.rhLst = datosSincronizados;
      }
    });

    this.datosMaestros.getEscolaridades().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.escolaridadesLst = datosSincronizados;
      }
    });

    this.datosMaestros.getEpsAnterior().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.epsAnteriorLst = datosSincronizados;
      }
    });

    this.datosMaestros.getRegimen().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.regimenLst = datosSincronizados;
      }
    });

    this.datosMaestros.getOcupaciones().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.ocupacionesLst = datosSincronizados;
      }
    });

    this.datosMaestros.getFondoPensiones().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.fondoPensionesLst = datosSincronizados;
      }
    });

    this.datosMaestros.getSedes().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.sedesLst = datosSincronizados;
      }
    });

    this.datosMaestros.getDependencias().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.dependenciasLst = datosSincronizados;
      }
    });

    //Tipo Solicitud ************************

    this.datosMaestros.getTipoSolicitud().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.tipoSolicitudesLst = datosSincronizados;
      }
    });

    this.datosMaestros.getDiscapacidad().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.discapacidadLst = datosSincronizados;
        this.discapacidadLstFiltrado = datosSincronizados;
      }
    });

//      tiposAfiliacion
//      upcAdicional

    this.datosMaestros.getTiposAfiliacion().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.tiposAfiliacion = datosSincronizados;
      }
    });

    this.datosMaestros.getUpcAdicional().subscribe(datosSincronizados =>{
      if(datosSincronizados){
        this.upcAdicional = datosSincronizados;
      }
    });



    //#endregion

    this.filteredDiscapacidades = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      // map((fruit: string | null) =>
      //   fruit ? this._filter(fruit) : this.allFruits.slice()
      // )
      map(value => this._filter(value))
    );


  }

  crearBeneficiario(){
    this.beneficiarioLocal = this.formBuilder.group({
      TMP_DIRECCION_COMPUESTA: this.formBuilder.group({
        tipoViaPrincipal: null,
        numeroViaPrincipal: null,
        letraInicialViaPrincipal: null,
        Bis: null,
        letraComplementariaViaPrinc: null,
        surViaPrincipal: null,
        surViaPrincipalCbox: this.formBuilder.group({
          cboxE: false,
          cboxS: false
        }),
        numeroViaSecundaria: null,
        letraTipoViaSecundaria: null,
        numeroComplemento: null,
        esteViaSecundaria:null,
        esteViaSecundariaCbox: this.formBuilder.group({
          cboxE: false,
          cboxS: false
        })
      }),
      TMP_zonaUrbanaActivado: false,
      TMP_IdentPasaporte: null,
      TMP_OtraDireccion: false,

      NU_IDAFILIADO_AFIL: 0,
      NU_IDCOTIZANTE_AFIL:0,
      NU_BENEFIDENPENDI_AFIL: [null,[
        Validators.required
      ]],
      NU_IDTIPOIDEN_TIPOIDEN: [null,[
        Validators.required
      ]],
      NU_BENEFIUPC_AFIL: [null,[
        Validators.required
      ]],
      TX_NOMIDENTI_AFIL: [null,[
        //this.validatorSoloLetras
        this.sharedFb.validatorSoloLetras
      ]],
      TX_PRIMAPELLI_AFIL:[null, [
        //this.validatorSoloLetras,
        this.sharedFb.validatorSoloLetras,
        Validators.required
      ]],
      TX_SEGAPELLI_AFIL:[null, [
        //this.validatorSoloLetras
        this.sharedFb.validatorSoloLetras
      ]],
      TX_PRIMNOMBRE_AFIL:[null, [
        //this.validatorSoloLetras,
        this.sharedFb.validatorSoloLetras,
        Validators.required
      ]],
      TX_SEGNOMBRE_AFIL:[null, [
        //this.validatorSoloLetras
        this.sharedFb.validatorSoloLetras
      ]],
      TX_IDENTIFICACION_AFIL: [null,[
        Validators.required
      ]],
      FE_FECHAEXPEDICION_AFIL: [null,[
        Validators.required
      ]],
      FE_FECHAVENCIMIENTO_AFIL: [null,[
        Validators.required
      ]],
      NU_IDPARENTESCO_PARENTESCO: [null],
      NU_IDGENERO_GENEROS: [null, [
        Validators.required
      ]],
      FE_FECHANACIMIENTO_AFIL: [null, [
        Validators.required
      ]],
      NU_IDNACIONALI_NACIONALI: [null, [
        Validators.required
      ]],
      NU_IDGRUPOPOBLA_GRUPOPOBL: [null],      // -----> Pendiente
      NU_IDGRUPOET_GRUPOET: [null, [
        Validators.required
      ]],
      NU_IDESTACIV_ESTADOCIV: [null, [
        Validators.required
      ]],
      NU_IDTIPOSANGRE_TIPOSANGRE: [null, [
        Validators.required
      ]],
      NU_IDRH_RHS: [null, [
        Validators.required
      ]],
      NU_IDESCOLARI_ESCOLARIDAD: [null, [
        Validators.required
      ]],
      // NU_EXTENSION_AFIL: [null, [     // -----> Pendiente
      //   Validators.required,
      //   //this.validadorSoloNumeros
      //   this.sharedFb.getValidatorSoloNumeros()
      // ]],
      NU_IDDEPARTAMENTO_DEPAR: [null, [
        Validators.required
      ]],
      NU_CIUDAD_CIUDAD: [null, [
        Validators.required
      ]],
      NU_IDZONA_ZONA: [null, [
        Validators.required
      ]],
      NU_IDLOCALIDAD_LOCALIDAD: null,
      NU_IDBARRIO_BARRIO: null,
      NU_IDESTRATO: null,
      TX_COMPLDIRE_AFIL: null,
      TX_VEREDA_AFIL: null,
      TX_DIRECCION_AFIL: null,
      NU_CELULAR_AFIL: [null, [
        Validators.maxLength(10),
        Validators.minLength(10),
        this.sharedFb.validatorNumeroCelular
      ]],
      NU_CELULARDOS_AFIL: [null, [
        Validators.maxLength(10),
        Validators.minLength(10),
        this.sharedFb.validatorNumeroCelular
      ]],
      NU_TELEFONO_AFIL: [null, [
        //Validators.required,
        //Validators.minLength(6)
      ]],
      TX_CORREOALTER_AFIL: [null,[
        this.sharedFb.validatorCorreoNormal
      ]],

      /// =====================
      TX_NOMCONEAPB_AFIL: [null],
      TX_ADMINEAPB_AFIL: [null],
      NU_PENSIONADO_AFIL: [null],

      TMP_DISCAPACIDADES: [null],
      NU_IDTIPODISCAPA_DISCA: [null],


      Beneficiarios: this.formBuilder.array([]),
    });






    console.log('isEnabled?')
    console.log(this.beneficiarioLocal.controls['TMP_DISCAPACIDADES'].enabled)
    // this.beneficiarioLocal.controls['TX_NOMCONEAPB_AFIL'].disable();
    // this.beneficiarioLocal.controls['TX_ADMINEAPB_AFIL'].disable();

    this.beneficiarioLocal.controls['NU_IDTIPODISCAPA_DISCA'].disable();
    this.beneficiarioLocal.controls['TMP_DISCAPACIDADES'].disable();
    // this.beneficiarioLocal.controls['NU_IDDEPENDENC_DEPENDENC'].disable();

    this.beneficiarioLocal.controls['NU_CIUDAD_CIUDAD'].disable();
    this.beneficiarioLocal.controls['NU_IDZONA_ZONA'].disable();

    this.beneficiarioLocal.controls['TX_VEREDA_AFIL'].disable();
    this.beneficiarioLocal.controls['TX_COMPLDIRE_AFIL'].disable();

    this.beneficiarioLocal.controls['NU_IDLOCALIDAD_LOCALIDAD'].disable();
    this.beneficiarioLocal.controls['NU_IDBARRIO_BARRIO'].disable();
    this.beneficiarioLocal.controls['NU_IDESTRATO'].disable();


    // this.beneficiarioLocal.controls['NU_CIUDAD_CIUDAD'].disable();
    // this.beneficiarioLocal.controls['NU_ZONAEMERGEN_AFIL'].disable();

    // this.beneficiarioLocal.controls['TX_VEREDA_AFIL'].disable();
    // this.beneficiarioLocal.controls['TX_COMPLDIRE_AFIL'].disable();

    // this.beneficiarioLocal.controls['NU_IDLOCALIDAD_LOCALIDAD'].disable();
    // this.beneficiarioLocal.controls['NU_IDBARRIO_BARRIO'].disable();
    // this.beneficiarioLocal.controls['NU_ESTRATEMERGEN_AFIL'].disable();


    console.log(this.beneficiarioLocal.controls['TMP_DISCAPACIDADES'].enabled)
  }


  get getArchivos(): FormArray{
    return this.formArchivos.get('archivos') as FormArray
  }


  crearArchivos(){
    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['DOCUMENTO DE IDENTIDAD REVERSO'],
      NU_IDTIPOARCHIVO_ARCH: [1],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['DOCUMENTO DE IDENTIDAD REVERSO'],
      NU_IDTIPOARCHIVO_ARCH: [2],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['REGISTRO CIVIL NACIMIENTO HIJO'],
      NU_IDTIPOARCHIVO_ARCH: [3],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['ACTA DE MATRIMONIO - DECLARACION JURAMENTADA'],
      NU_IDTIPOARCHIVO_ARCH: [4],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['CERTIFICADO DE ESTUDIOS'],
      NU_IDTIPOARCHIVO_ARCH: [5],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['ACTA DE ENTREGA ICBF'],
      NU_IDTIPOARCHIVO_ARCH: [6],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['DECLARACION DE DEPENDENCIA ECONOMICA'],
      NU_IDTIPOARCHIVO_ARCH: [7],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['REGISTRO CIVIL DE NACIMIENTO AFILIADO'],
      NU_IDTIPOARCHIVO_ARCH: [8],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['CERTIFICADO DE NACIDO VIVO'],
      NU_IDTIPOARCHIVO_ARCH: [9],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['CONSTANCIA DE DISCAPACIDAD'],
      NU_IDTIPOARCHIVO_ARCH: [10],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['RESOLUCION DE PENSIÓN'],
      NU_IDTIPOARCHIVO_ARCH: [11],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['SOPORTE DE LA DIVISION SALARIAL Y PRESTACIONAL'],
      NU_IDTIPOARCHIVO_ARCH: [12],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['DOCUMENTO DE IDENTIDAD ADVERSO CONTACTO EMERGENCIA'],
      NU_IDTIPOARCHIVO_ARCH: [13],
    }))

    this.getArchivos.push(this.formBuilder.group({
      TX_NOMBREARCHIVO: [null],
      TX_BASE64_ARCH: [null],
      TX_TIPOARCHIVO: ['DOCUMENTO DE IDENTIDAD REVERSO CONTACTO EMERGENCIA'],
      NU_IDTIPOARCHIVO_ARCH: [14],
    }))

    console.log(this.getArchivos.value)

    this.getArchivos.controls.forEach((element, index) => {
      let idTipoArchivo = ((element) as FormGroup).get('NU_IDTIPOARCHIVO_ARCH')?.value
      if(idTipoArchivo != 1 && idTipoArchivo != 2) {
        element.disable()
      }
    });

    //this.habilitarArchivo([2,3],true)

  }

  habilitarArchivo(idArchivo:number[], habilitar: boolean){
    this.getArchivos.controls.forEach((element, index) => {
      let idTipoArchivo = ((element) as FormGroup).get('NU_IDTIPOARCHIVO_ARCH')?.value
      let buscarFormGroup = idArchivo.includes(idTipoArchivo)
      if(buscarFormGroup){
        if(habilitar) element.enable()
        else element.disable()
        // console.log('encuentra')
        // console.log(idTipoArchivo)
        // console.log(element.value)
      }
    });
  }

  archivosParentesco(parentescoId: number){
    console.log(parentescoId)
    this.habilitarArchivo([3,4,5,6,7,9,10],false)

    //Parentesco 0, habilita 3,6,9
    //parentesco 3,4, habilita 4
    //parentesco 0 y edad entre 18 y 25 ,habilita 5
    //parentesco 2, habilita 3,7
    //paretesco 1, habilita 10
    if(parentescoId == 0) return this.habilitarArchivo([3,6,9],true)
    if(parentescoId == 3 || parentescoId == 4) return this.habilitarArchivo([4],true)
    // if(parentescoId == 0) return this.habilitarArchivo([xxxxx],true)
    if(parentescoId == 2) return this.habilitarArchivo([3,7],true)
    if(parentescoId == 1) return this.habilitarArchivo([10],true)
  }

  archivoCertiEstudios(){

  }


  test3(){
    console.log(this.getArchivos.value)
    this.getArchivos.controls.forEach((element, index) => {
      let idEl = ((element) as FormGroup).get('NU_IDTIPOARCHIVO_ARCH')?.value
      if(idEl != 2) {
        element.disable()
      }
      //console.log()
    });
    console.log(this.getArchivos.value)

    this.getArchivos.controls.forEach((element, index) => {
      //let idEl = ((element) as FormGroup).get('NU_IDTIPOARCHIVO_ARCH')?.value
      element.disable()
      //console.log()
    });
    console.log(this.getArchivos.value)
  }

  getFormGroup(contrl: AbstractControl): FormGroup{
    // console.log(contrl)
    return contrl as FormGroup
  }


  test: archivoCargado = {
    ImageBaseData: '',
    nombreArchivo: ''
  }

  cargarArchivo(files: any,  idArchivo:number) {
    this.test = {
      ImageBaseData: '',
      nombreArchivo: ''
    }

    //Leo el archivo
    let fileList = files.target.files as FileList

    if (fileList.length <= 0) return console.log('cancelado')

    if (fileList[0].type != 'application/pdf') return console.log('tipo invalido')

    //convierto tamanio a MB
    let fileSizeMb = +((fileList[0].size / 1024) / 1024).toFixed(2);

    if (fileSizeMb > 10) return console.log('Tamaño fuera de limite')

    let reader = new FileReader();

    let tempData = this.test;

    reader.readAsDataURL(fileList[0]);
    reader.onload = function () {
      tempData.ImageBaseData = reader.result;
    };
    reader.onerror = function (error) {
      return console.log('Error: ', error);
    };

    this.test.ImageBaseData = tempData;
    this.test.nombreArchivo = fileList[0].name;
    console.log(this.test)

    this.getArchivos.controls.forEach((element, index) => {

      let idEl = ((element) as FormGroup).get('NU_IDTIPOARCHIVO_ARCH')?.value
      if(idEl == idArchivo) {

        console.log(element.value)
        element.get('TX_NOMBREARCHIVO')?.setValue(fileList[0].name)
        element.get('TX_BASE64_ARCH')?.setValue(tempData.ImageBaseData)
        console.log(element.value)
      }
    });
  }




  mostrarDireccion(event: boolean){
    console.log(event)
    this.otraDireccion = event;
    if(this.otraDireccion){
      this.beneficiarioLocal.get('NU_IDDEPARTAMENTO_DEPAR')?.enable()
      return
    }
    this.beneficiarioLocal.get('NU_IDDEPARTAMENTO_DEPAR')?.disable()
  }

  activarCiudad(){
    if(this.beneficiarioLocal.get('NU_CIUDAD_CIUDAD')?.enabled){
      this.beneficiarioLocal.controls['NU_CIUDAD_CIUDAD'].setValue(null);
      return;
    }
    this.beneficiarioLocal.controls['NU_CIUDAD_CIUDAD'].enable();
  }


  filtrarLocalidad(){
    this.beneficiarioLocal.controls['NU_IDZONA_ZONA'].enable();

    if(this.zonaUrbanaActivado ==true){
      setTimeout(()=>{

        const departamento = this.beneficiarioLocal.get('NU_IDDEPARTAMENTO_DEPAR')?.value
        const idRelacion = this.beneficiarioLocal.get('NU_CIUDAD_CIUDAD')?.value
        if(idRelacion >= 0){
          this.beneficiarioLocal.get('NU_IDLOCALIDAD_LOCALIDAD')?.setValue(null)
          this.beneficiarioLocal.get('NU_IDLOCALIDAD_LOCALIDAD')?.enable();

          console.log(departamento)
          console.log(idRelacion)
          console.log(this.localidadesLst)
          console.log(this.departamentosLst.data)
          console.log(this.departamentosLst.data.filter(dt => dt.idPosition == departamento))
          console.log(this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idRelacion))

          let ciudad = this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idRelacion);

          this.localidadesLstFiltrado = this.localidadesLst.filter(dt =>
            dt.Titulo?.includes(ciudad[0].txValor))[0]

          console.log(
            (this.localidadesLst.filter(dt => dt.Titulo?.includes(ciudad[0].txValor)) as DmProcesado[])[0].data)
        }
      }, 20);
    }
  }

  filtrarBarrios(){
    this.beneficiarioLocal.controls['NU_IDBARRIO_BARRIO'].enable();

    if(this.zonaUrbanaActivado ==true){
      setTimeout(()=>{

        const departamento = this.beneficiarioLocal.get('NU_IDDEPARTAMENTO_DEPAR')?.value
        const idCiudad = this.beneficiarioLocal.get('NU_CIUDAD_CIUDAD')?.value
        const idLocalidad = this.beneficiarioLocal.get('NU_IDLOCALIDAD_LOCALIDAD')?.value
        const idBarrio = this.beneficiarioLocal.get('NU_IDBARRIO_BARRIO')?.value

        if(idLocalidad >= 0){

          this.beneficiarioLocal.get('NU_IDBARRIO_BARRIO')?.setValue(null)
          this.beneficiarioLocal.get('NU_IDBARRIO_BARRIO')?.enable();
          let dpt = this.departamentosLst.data.filter(dt => dt.idPosition == departamento)
          let ciudad = this.ciudadLst[departamento].data.filter(dt => dt.idPosition == idCiudad);
          let coms = this.localidadesLst[ciudad[0].idPosition].data.filter(dt => dt.idPosition == idLocalidad);
          let brr = this.localidadesLst[coms[0].idPosition].data.filter(dt => dt.idPosition == idBarrio);

          let dptTxt = dpt[0].txValor.replace(/ /g,'')
          let ciudadTxt = ciudad[0].txValor.replace(/ /g,'')
          let comuTxt = coms[0].txValor.replace(/ /g,'')
          // let barrioTxt = brr[0].txValor.replace(/ /g,'')

          this.barriosLstFiltrado = this.barriosLst.filter(dt =>
            dt.Titulo?.includes(comuTxt) && dt.Titulo?.includes(ciudadTxt))[0]

        }
      }, 50);
    }

  }




  ///

  cambiarZona(event: number){
    console.log(event)

    if(event == 0){
      Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
        this.TMP_DIRECCION.controls[key].enable();
      })
      this.beneficiarioLocal.controls['TX_VEREDA_AFIL'].disable();
      this.beneficiarioLocal.controls['TX_COMPLDIRE_AFIL'].disable();

      this.beneficiarioLocal.controls['NU_IDLOCALIDAD_LOCALIDAD'].enable();
      this.beneficiarioLocal.controls['NU_IDBARRIO_BARRIO'].enable();

      this.beneficiarioLocal.controls['TX_COMPLDIRE_AFIL'].enable();
      this.beneficiarioLocal.controls['NU_IDESTRATO'].enable();

      this.zonaUrbanaActivado = true
      this.filtrarLocalidad();
      // this.filtrarBarrios();
      return;
    }

    this.zonaUrbanaActivado = false
    Object.keys(this.TMP_DIRECCION.controls).forEach(key => {
      this.TMP_DIRECCION.controls[key].disable();
    })
    this.beneficiarioLocal.controls['TX_VEREDA_AFIL'].enable();
    this.beneficiarioLocal.controls['TX_COMPLDIRE_AFIL'].enable();

    this.beneficiarioLocal.controls['TX_COMPLDIRE_AFIL'].disable();
    this.beneficiarioLocal.controls['NU_IDESTRATO'].disable();

    this.beneficiarioLocal.controls['NU_IDLOCALIDAD_LOCALIDAD'].disable();
    this.beneficiarioLocal.controls['NU_IDBARRIO_BARRIO'].disable();
    this.filtrarLocalidad();
    // this.filtrarBarrios();
    this.beneficiarioLocal.get('TX_DIRECCION_AFIL')?.setValue(null)
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

    this.beneficiarioLocal.get('TX_DIREMERGEN_AFIL')?.setValue(`[${dirCompuesta.toString()}]`)

  }

  getControlValue(controlName: string){
    let value  = this.TMP_DIRECCION.get(controlName)?.value;
    if(value) return  value
    return -1
  }







  ////
  filteredDiscapacidades!: Observable<DatoExpandido[]>;

  allFruits: any[] = [];
  discapacidadesSeleccionadas: DatoExpandido[] =[];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;


  add(event: MatChipInputEvent): void {
    // const input = event.input;
    // const value = event.value;

    // console.log('add')
    // console.log(event)
    // console.log(input)
    // console.log(value)
    // // Add our fruit

    // // console.log(this.discapacidadesSeleccionadas)

    // // Reset the input value
    // if (input) {
    //   input.value = '';
    // }

    // this.fruitCtrl.setValue(null);
    this.autocomplete.closePanel();
    this.restaurarDiscapacidades();
    //this.removerDiscapacidades(event.option.value.idPosition);

    this.filteredDiscapacidades.pipe(
      map(value => this.getLista())
    )
  }

  remove(discapacidad: any): void {

    this.discapacidadesSeleccionadas = this.discapacidadesSeleccionadas.filter( current => {
      // console.log(current.idPosition)
      // console.log(discapacidad.idPosition)
      return current.idPosition != discapacidad.idPosition
    })

    this.restaurarDiscapacidades();
    this.autocomplete.closePanel();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected')
    this.discapacidadesSeleccionadas.push(event.option.value);

    this.restaurarDiscapacidades();
    this.removerDiscapacidades(event.option.value.idPosition);
    this.autocomplete.closePanel();

    this.filteredDiscapacidades.pipe(
      map(value => this.getLista())
    )

    this.setDiscapacidades();


  }

  getLista(): DatoExpandido[]{
    return  this.discapacidadLstFiltrado.data
  }

  setDiscapacidades(){
    console.log('set disca')
    console.log(this.discapacidadesSeleccionadas)
    let arrayDis: number[] = []
    this.discapacidadesSeleccionadas.forEach(element => {
      arrayDis.push(element.idPosition)
    });
    console.log(arrayDis.join(','))
    console.log(arrayDis.toString())

    this.beneficiarioLocal.get('NU_IDTIPODISCAPA_DISCA')?.setValue(`[${arrayDis.toString()}]`)
  }

  getDiscapacidadesTx(event: any){
    if(!event) return '';
    return event.txValor
  }

  removerDiscapacidades(position: number):void{
    for (let index = 0; index < this.discapacidadLstFiltrado.data.length; index++) {
      if(this.discapacidadLstFiltrado.data[index].idPosition == position){
        this.discapacidadLstFiltrado.data.splice(index,1)
      }
    }
  }

  restaurarDiscapacidades(): void{
    let arr: number[] = []
    this.discapacidadesSeleccionadas.forEach(element => {
      arr.push(element.idPosition)
    });

    this.discapacidadLstFiltrado = Object.assign({},this.discapacidadLst)
    this.discapacidadLstFiltrado.data = this.discapacidadLstFiltrado.data.filter(data =>
      !arr.includes(data.idPosition));
  }


  private _filter(value: any): DatoExpandido[] {

    if (!value) return this.discapacidadLstFiltrado.data

    if(value && typeof(value) == 'string'){
      let tempLista = Object.assign({},this.discapacidadLstFiltrado.data)
      tempLista = this.discapacidadLstFiltrado.data.filter( opcion =>
        opcion.txValor.toLowerCase().includes(value.toLowerCase())
        //opcion.name.toString().toLowerCase().includes(value.toLowerCase())
      )
      return tempLista
    }

    else{
      let tempLista = Object.assign({},this.discapacidadLstFiltrado.data)
      tempLista = this.discapacidadLstFiltrado.data.filter( opcion =>
        opcion.txValor.toLowerCase().includes(value.txValor.toLowerCase())
        //opcion.name.toString().toLowerCase().includes(value.toLowerCase())
      )
      return tempLista
    }
    //return this.discapacidadLstFiltrado.data
  }

  agregarGrupoPoblacional(event: any){
    console.log(event)

    let gruposPoblacionales = `[${event.toString()}]`
    console.log(gruposPoblacionales)
    this.beneficiarioLocal.get('NU_IDGRUPOPOBLA_GRUPOPOBL')?.setValue(gruposPoblacionales);

    //nU_IDGRUPOPOBLA_GRUPOPOBL
  }


  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
        const control = form.get(key);
        const errors = (control instanceof FormGroup || control instanceof FormArray)
            ? this.getAllErrors(control)
            : control?.errors;
        if (errors) {
            acc[key] = errors;
            hasError = true;
        }
        return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;

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
      this.beneficiarioLocal.get('NU_TELEFONO_AFIL')?.setValue(parseInt(numeroConcatenado));
    }else{
      this.beneficiarioLocal.get('NU_TELEFONO_AFIL')?.setValue(null);
    }
   }

  guardarBeneficiario(){
    const bene = this.beneficiarioLocal as FormGroup;

    this.BeneficiariosArray.push(bene)
    //this.sharedFb.guardarBeneficiario(this.beneficiarioLocal)
    this.crearBeneficiario();
  }

  eliminarBeneficiario(i: number){
    this.BeneficiariosArray.removeAt(i);
  }

  get cantidadBeneficiarios(){
    return this.BeneficiariosArray.length;
  }

  checkboxDiscapacidades(event: MatCheckboxChange){
    console.log(event)
    console.log(event.checked)
    this.mostrarDiscapacidades = event.checked;

    if(this.mostrarDiscapacidades){
      this.beneficiarioLocal.controls['TMP_DISCAPACIDADES'].enable()
      this.beneficiarioLocal.controls['NU_IDTIPODISCAPA_DISCA'].enable()
      this.fruitCtrl.enable()
      return;
    }

    this.beneficiarioLocal.controls['TMP_DISCAPACIDADES'].disable()
    this.beneficiarioLocal.controls['NU_IDTIPODISCAPA_DISCA'].disable()
    this.fruitCtrl.disable()
  }


  // test(){
  //   console.log(this.sharedFb.getBeneficiariosArrayForm)
  // }

  habilitarCamposDireccion(event: MatCheckboxChange){
    this.otraDireccion= event.checked
    console.log(this.otraDireccion)
  }

  habilitarArchivoExclusion(event: MatCheckboxChange){
    this.otraDireccion= event.checked
    console.log(this.otraDireccion)
  }



  habilitarCamposZona(){
    //TX_COMPLDIRE_AFIL NO TIENE VALIDACIONES
    console.log(this.beneficiarioLocal.get("NU_IDZONA_ZONA"));
    setTimeout(()=>{

      //Limpio valores ingresados cuando se cambia la zona
      this.beneficiarioLocal.get("NU_IDLOCALIDAD_LOCALIDAD")?.setValue(null);
      this.beneficiarioLocal.get("NU_IDBARRIO_BARRIO")?.setValue(null);
      this.beneficiarioLocal.get("NU_IDESTRATO")?.setValue(null);
      this.beneficiarioLocal.get("TX_COMPLDIRE_AFIL")?.setValue(null);
      this.beneficiarioLocal.get("TX_VEREDA_AFIL")?.setValue(null);
      this.beneficiarioLocal.get("TX_DIRECCION_AFIL")?.setValue(null);

      //Limpiar campos estructura compuesta
      this.beneficiarioLocal.controls.TMP_DIRECCION_COMPUESTA.reset();
      this.beneficiarioLocal.controls.TMP_DIRECCION_COMPUESTA.addValidators(
        Validators.required
      );
      //Limpio validadores

      this.beneficiarioLocal.get('NU_IDLOCALIDAD_LOCALIDAD')?.clearValidators();
      this.beneficiarioLocal.get('NU_IDBARRIO_BARRIO')?.clearValidators();
      this.beneficiarioLocal.get('NU_IDESTRATO')?.clearValidators();
      this.beneficiarioLocal.get('TX_COMPLDIRE_AFIL')?.clearValidators();

      this.beneficiarioLocal.get('TX_VEREDA_AFIL')?.clearValidators();
      this.beneficiarioLocal.get('TX_DIRECCION_AFIL')?.clearValidators();

      if(this.beneficiarioLocal.get("NU_IDZONA_ZONA")?.value == 1){
        this.beneficiarioLocal.get('NU_IDLOCALIDAD_LOCALIDAD')?.addValidators([
          Validators.required
        ]);
        this.beneficiarioLocal.get('NU_IDBARRIO_BARRIO')?.addValidators([
          Validators.required
        ]);
        this.beneficiarioLocal.get('NU_IDESTRATO')?.addValidators([
          Validators.required
        ]);
        this.beneficiarioLocal.get('TX_COMPLDIRE_AFIL')?.addValidators([
          Validators.required
        ]);

        this.zonaUrbanaActivado = true;
      }else{
        this.beneficiarioLocal.get('TX_VEREDA_AFIL')?.addValidators([
          Validators.required,
          //this.validatorSoloLetras
          this.sharedFb.validatorSoloLetras
        ]);
        this.beneficiarioLocal.get('TX_DIRECCION_AFIL')?.addValidators([
          Validators.required
        ]);
        this.zonaUrbanaActivado = false;
      }
    }, 5);
  }

  habilitarNumeroIdentificacion(){
    //Limpio valores
  this.beneficiarioLocal.get("TX_IDENTIFICACION_AFIL")?.setValue([null]);

  //Proceso en 5 ms
  setTimeout(()=>{
    console.log(this.beneficiarioLocal.get('NU_IDTIPOIDEN_TIPOIDEN')?.value);
    if(this.beneficiarioLocal.get('NU_IDTIPOIDEN_TIPOIDEN')?.value == 2){
      this.permitirLetrasNumIdentificacion = true;
    }
    else{
      this.permitirLetrasNumIdentificacion = false;
    }
    console.log(this.permitirLetrasNumIdentificacion)
  }, 5);

   }


   concatDireccionCompuesta(){
    //    console.log(this.formularioAfiliados.get('TX_NOMIDENTI_AFIL')?.value)
    setTimeout(()=>{
      let value2 = this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value;
      console.log("value2")
      console.log(value2)

      let direccionCompuesta = '';

      if(
        this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["tipoViaPrincipal"]    &&
        this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaPrincipal"]  &&
        this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"] &&
        this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"]
      ){
        direccionCompuesta = this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["tipoViaPrincipal"];
        direccionCompuesta += ' #' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaPrincipal"];

        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["letraInicialViaPrincipal"]){
          direccionCompuesta += ' ' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["letraInicialViaPrincipal"];
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["Bis"] == true){
          direccionCompuesta += ' Bis';
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["letraComplementariaViaPrinc"]){
          direccionCompuesta += ' ' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["letraComplementariaViaPrinc"];
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["surViaPrincipal"]){
          direccionCompuesta += ' ' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["surViaPrincipal"];
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"]){
          direccionCompuesta += ' #' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroViaSecundaria"];
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["letraTipoViaSecundaria"]){
          direccionCompuesta += ' ' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["letraTipoViaSecundaria"];
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"]){
          direccionCompuesta += '-' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["numeroComplemento"];
        }
        if(this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["esteViaSecundaria"]){
          direccionCompuesta += ' ' + this.beneficiarioLocal.get('TMP_DIRECCION_COMPUESTA')?.value["esteViaSecundaria"];
        }

        this.beneficiarioLocal.patchValue({
          "TX_DIRECCION_AFIL": direccionCompuesta
        });
      }
      else{
        this.beneficiarioLocal.patchValue({
          "TX_DIRECCION_AFIL": null
        });
      }
      console.log(this.beneficiarioLocal.get('TX_DIRECCION_AFIL')?.value);
    }, 5);


  }


  //Recibo estado del checkbox, nombre del FormControl (campo en formulario) y valor (E/S)
  checkboxGroup(event: MatCheckboxChange, controlName: string, value: any){

    //this.TMP_DIRECCION

    //surViaPrincipalCbox: this.formBuilder.group({
    //esteViaSecundariaCbox

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


}

export interface archivoCargado {
  ImageBaseData: ArrayBuffer | any;
  nombreArchivo: string;
}
