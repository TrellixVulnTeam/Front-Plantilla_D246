import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { C4ConsentimientoDatosComponent } from '../components/afiliados/dialogs/c4-consentimiento-datos/c4-consentimiento-datos.component';
import { C7DeclaracionJuramentoComponent } from '../components/afiliados/dialogs/c7-declaracion-juramento/c7-declaracion-juramento.component';
import { C8AutorizacionesComponent } from '../components/afiliados/dialogs/c8-autorizaciones/c8-autorizaciones.component';

import { Afiliado } from '../models/afiliados-models/afiliado.model';
import { DatosMaestros } from '../models/datos-maestros/dato-maestro.model';
import { AfiliadosService } from './afiliados-service.service';
import { WebApiService } from './api-service.service';
import { DatosMaestrosService } from './datos-maestros.service';

// import { AfiliadosService } from './afiliados.service';
// import { ConectarApiService } from './conectar-api.service';
// import { DatosMaestrosService } from './datos-maestros.service';

@Injectable({
  providedIn: 'root'
})
export class AfiliadosFormCompartidoService {

  //Formularios
  formularioAfiliados!: FormGroup;
  tmpEmergenciaDatosCompuestos!: FormGroup;

  //Mensajes
  private mensajeErrorSoloLetras = "Ingrese solo letras";
  private mensajeErrorSoloNumeros = "Ingrese solo números";
  private mensajeErrorNumeroCelular = "Ingrese solo números, un total de 10 digitos iniciando por 3";
  private mensajeErrorCorreoUnal = "Debe ingresar un correo @unal.edu.co";
  private mensajeErrorCorreo = "Debe ingresar un correo valido";
  private mensajeErorLimiteBeneficiarios = "Se ha alcanzado el límite de beneficiarios";
  private mensajeErrorRequired = "Este campo es obligatorio";

  //Valores 'quemados'
  // private letrasVias = ['A', 'B', 'C', 'D', 'E', 'F'];
  // private listaNacionalidades = ['nac 1', 'nac2']

  //Validadores
  validatorSoloLetras = Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$');
  validatorSoloNumeros = Validators.pattern('^[0-9]*$');
  validatorLetrasNumeros = Validators.pattern('^[a-zA-Z0-9 \u00f1\u00d1]{1,100}$');
  validatorNumeroCelular = Validators.pattern('^[3][0-9]{9}');

  validatorCorreoUnal = Validators.pattern('^[a-zA-Z0-9._-]+@(u|U)(n|N)(a|A)(l|L)[.](e|E)(d|D)(u|U)[.](c|C)(o|O)+$');
  validatorCorreoNormal = Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.]+[.]+[a-zA-Z]{2,5}$');


  //0 = crear nuevo, 1 editar, 2 ver, 3 generar
  private modoFormulario = 0;

  constructor(
    private formBuilder: FormBuilder,
    private service: AfiliadosService,
    private http:HttpClient,
    private datoMaestroProcesado: DatosMaestrosService,
    private apiService: WebApiService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    // this.formularioAfiliados =  this.generarFormulario();
    this.generarFormulario();
    this.apiService.getDatosMaestros().subscribe(data =>{
      let datosMaestros: DatosMaestros[] = data;
      console.log('datosMaestros')
      console.log(datosMaestros)
      this.datoMaestroProcesado.procesarDatos(datosMaestros)
    })
    //console.log(this.formularioAfiliados.value)
   }

  //Genero form inicial
  generarFormulario(){
    //this.formularioAfiliados
    this.formularioAfiliados = this.formBuilder.group({
      NU_IDAFILIADO_AFIL: [null],
      NU_IDCOTIZANTE_AFIL: [null],
      NU_TIPOSOLICITUD_AFIL: [null],
      NU_IDDEPENDENCIA_DM: [null],
      NU_TIPOAFILIADO_AFIL: [null],
      NU_TELEFONO_AFIL: [null],
      NU_EXTENSION_AFIL: [null],
      NU_CELULAR_AFIL: [null, [this.validatorNumeroCelular]],
      NU_CELULARDOS_AFIL: [null, [this.validatorNumeroCelular]],
      NU_TELEMERGEN_AFIL: [null],
      NU_CELUEMERGEN_AFIL: [null, [this.validatorNumeroCelular]],
      NU_DEPAREMERGEN_AFIL: [null],
      NU_CIUDADEMERGEN_AFIL: [null],
      NU_ZONAEMERGEN_AFIL: [null],
      NU_LOCALIEMERGEN_AFIL: [null],
      NU_BARRIOEMERGEN_AFIL: [null],
      NU_ESTRATEMERGEN_AFIL: [null],
      NU_DOCUMEMERGEN_AFIL: [null],
      NU_DECLARASALUD_AFIL: [null],
      NU_PROVISIONAL_AFIL: [null],
      NU_IBC_AFIL: [null],
      NU_BENEFICIARIOUN_AFIL: [null],
      NU_BENEFIUNIFIC_AFIL: [null],
      NU_BENEFIUPC_AFIL: [null],
      NU_BENEFIDENPENDI_AFIL: [null],
      NU_BENEFIEXCLU_AFIL: [null],
      NU_BENEFIHIJO_AFIL: [null],
      NU_BENEFIMATRI_AFIL: [null],
      NU_ESTADO_AFIL: [null],
      TX_FORMASOLICITUD_AFIL: [null],
      TX_EMPLEADOR_AFIL: [null],
      TX_SEDEUNAL_DM: [null],
      TX_ORIENTACIONAFIL_AFIL: [null],
      TX_NOMIDENTI_AFIL: [null],
      TX_PRIMAPELLI_AFIL: [null, [this.validatorSoloLetras]],
      TX_SEGAPELLI_AFIL: [null],
      TX_PRIMNOMBRE_AFIL: [null],
      TX_SEGNOMBRE_AFIL: [null],
      TX_IDENTIFICACION_AFIL: [null],
      TX_DIRECCION_AFIL: [null],
      TX_COMPLDIRE_AFIL: [null],
      TX_VEREDA_AFIL: [null],
      TX_CORREOUNAL_AFIL: [null, [this.validatorCorreoUnal]],
      TX_CORREOALTER_AFIL: [null, [this.validatorCorreoNormal]],
      TX_NOMBREEMERGENCIA_AFIL: [null],
      TX_DIREMERGEN_AFIL: [null],
      TX_COMPLDIREMERGEN_AFIL: [null],
      TX_VEREDAEMERGEN_AFIL: [null],
      TX_ACTIVIECONOMICA_AFIL: [null],
      TX_CARGOACTUAL_AFIL: [null],
      TX_DEDICACION_AFIL: [null],
      TX_PASS_AFIL: [null],
      TX_OBSERVACIONESVALIDAR_AFIL: [null],
      TX_OBSERVACIONESACEPTAR_AFIL: [null],
      TX_OBSERVACIONESRECHAZAR_AFIL: [null],
      TX_OBSERVACIONESAPROBAR_AFIL: [null],
      TX_MOTIVORECHAZO_AFIL: [null],
      FE_FECHAEXPEDICION_AFIL: [null],
      FE_FECHAVENCIMIENTO_AFIL: [null],
      FE_FECHANACIMIENTO_AFIL: [null],
      FE_FECHACREACION_AFIL: [null],
      FE_FECHASOLICITUD_AFIL: [null],
      FE_FECHAINICIOSER_AFIL: [null],
      NU_IDTIPOIDEN_TIPOIDEN: [null],
      NU_IDGENERO_GENEROS: [null],
      NU_IDNACIONALI_NACIONALI: [null],
      NU_IDGRUPOET_GRUPOET: [null],
      NU_IDGRUPOPOBLA_GRUPOPOBL: [null],
      NU_IDESTACIV_ESTADOCIV: [null],
      NU_IDTIPOSANGRE_TIPOSANGRE: [null],
      NU_IDRH_RHS: [null],
      NU_IDEPS_EPSS: [null],
      NU_IDREGIMEN_REGIMEN: [null],
      NU_IDESCOLARI_ESCOLARIDAD: [null],
      NU_IDOCUPACION_OCUPACION: [null],
      NU_IDDEPENDENC_DEPENDENC: [null],
      NU_IDFONDPENSI_FONPENSI: [null],
      NU_IDTIPODISCAPA_DISCA: [null],
      NU_IDDEPARTAMENTO_DEPAR: [null],
      NU_CIUDAD_CIUDAD: [null],
      NU_IDZONA_ZONA: [null],
      NU_IDLOCALIDAD_LOCALIDAD: [null],
      NU_IDBARRIO_BARRIO: [null],
      NU_IDESTRATO: [null],
      NU_IDPARENTESCO_PARENTESCO: [null],
      NU_IDEMPLEADOR_EMPLEADOR: [null],
      NU_IDRELACIONBENE_RELACION: [null],
      TX_NITEMP_AFIL: [null],
      TX_NOMRAZSOCEMP_AFIL: [null],
      DeclaratoriasPorAfiliados: [null],
      archivos: [],
      // 'NU_IDAFILIADO_AFIL': 1,
      //     'TX_IDENTIFICACION_AFIL': 2,
      //     'DeclaratoriasPorAfiliados': [],
      //     archivos: [],

      TX_NOMCONEAPB_AFIL: [null],
      TX_ADMINEAPB_AFIL: [null],
      NU_PENSIONADO_AFIL: [null],

      TMP_DISCAPACIDADES: [null],

      Beneficiarios: this.formBuilder.array([]),
    })


    // testvalues
    this.formularioAfiliados.get('NU_IDAFILIADO_AFIL')?.setValue(0);
    // this.formularioAfiliados.get('TX_IDENTIFICACION_AFIL')?.setValue(2);
    // this.formularioAfiliados.get('DeclaratoriasPorAfiliados')?.setValue([
    //   {NU_IDDECAFIL_DECLAFIL: 2, NU_RESPUESTAPREGUNTA: 'hola'},
    //   {NU_IDDECAFIL_DECLAFIL: 3, NU_RESPUESTAPREGUNTA: 'pregunta 2'}
    // ]);
    this.formularioAfiliados.get('archivos')?.setValue([]);

    this.formularioAfiliados.controls['TX_NOMCONEAPB_AFIL'].disable();
    this.formularioAfiliados.controls['TX_ADMINEAPB_AFIL'].disable();
    this.formularioAfiliados.controls['NU_IDTIPODISCAPA_DISCA'].disable();
    this.formularioAfiliados.controls['TMP_DISCAPACIDADES'].disable();
    this.formularioAfiliados.controls['NU_IDDEPENDENC_DEPENDENC'].disable();

    this.formularioAfiliados.controls['NU_CIUDAD_CIUDAD'].disable();
    this.formularioAfiliados.controls['NU_IDZONA_ZONA'].disable();

    this.formularioAfiliados.controls['TX_VEREDA_AFIL'].disable();
    this.formularioAfiliados.controls['TX_COMPLDIRE_AFIL'].disable();
    // this.formularioAfiliados.controls['TX_DIRECCION_AFIL'].disable();

    this.formularioAfiliados.controls['NU_IDLOCALIDAD_LOCALIDAD'].disable();
    this.formularioAfiliados.controls['NU_IDBARRIO_BARRIO'].disable();
    this.formularioAfiliados.controls['NU_IDESTRATO'].disable();


    this.formularioAfiliados.controls['NU_CIUDADEMERGEN_AFIL'].disable();
    this.formularioAfiliados.controls['NU_ZONAEMERGEN_AFIL'].disable();

    this.formularioAfiliados.controls['TX_VEREDAEMERGEN_AFIL'].disable();
    this.formularioAfiliados.controls['TX_COMPLDIREMERGEN_AFIL'].disable();
    // this.formularioAfiliados.controls['TX_DIREMERGEN_AFIL'].disable();

    this.formularioAfiliados.controls['NU_LOCALIEMERGEN_AFIL'].disable();
    this.formularioAfiliados.controls['NU_BARRIOEMERGEN_AFIL'].disable();
    this.formularioAfiliados.controls['NU_ESTRATEMERGEN_AFIL'].disable();

    //newForm.controls['archivos'].disable();

    //return newForm;
  }


  consentimientoDatos = false;
  declaracionJuramento = false;
  autorizaciones = false;

  /**
   * Envio el modo de solicitud
   * @description 0 = crear, 1 = editar, 2 = ver, 3 = permite generar
   * @param  {number} modo
   */
  crearSolicitud(modo: number, afiliado?: Afiliado){
    this.modoSolicitud = modo;

    let newDialog = this.dialog.open(C4ConsentimientoDatosComponent)

    newDialog.afterClosed().subscribe(resultConsentimiento =>{
      if(resultConsentimiento == true){

        newDialog = this.dialog.open(C7DeclaracionJuramentoComponent, {width: '70%'})
        newDialog.afterClosed().subscribe(resultDeclaracion =>{
          if(resultDeclaracion == true){
            console.log('pasa resultDeclaracion')

            newDialog = this.dialog.open(C8AutorizacionesComponent, {width: '70%'})
            newDialog.afterClosed().subscribe(result =>{
              if(result == true) {
                this.formularioAfiliados.reset();
                this.router.navigate(['/SolicitarAfiliacion']);
                this.formularioAfiliados.get('NU_IDAFILIADO_AFIL')?.setValue(0);

                console.log('creando solicitud')
                console.log(this.modoSolicitud)

              }
              if(result == false) console.log('no pasa juramento')
            })

          }
          if(resultDeclaracion == false) console.log('no pasa juramento')
        })

      }
      if(resultConsentimiento == false) console.log('no pasa')
    })


  }

  get getBeneficiariosArrayForm(): FormArray{
    return <FormArray>this.formularioAfiliados.get('Beneficiarios');
  }


  async enviarForm(){
    console.log("Enviando");
    console.log("Values:");

    //c4 tratamiento




    //console.log(this.listaBeneficiarios.value);
    //TMP_DIRECCION_COMPUESTA


    //const tempBeneficiarios = this.listaBeneficiarios as FormArray;
    //console.log(tmpBene.value);
    //console.log(tmpBene.length)

    //const arr: FormArray = this.GSTNForm.get('gstandbankDetails') as FormArray;


    //const grp: FormGroup = tmpBene.get('0') as FormGroup;
    //console.log(grp);
    //grp.removeControl('TMP_DIRECCION_COMPUESTA');

    // let nuevaListaBeneficiarios = this.formBuilder.array([]);
    // if(tempBeneficiarios){

    //   for (let index = 0; index < tempBeneficiarios.length; index++) {
    //     const _beneficiario: FormGroup = tempBeneficiarios.get(index.toString()) as FormGroup;
    //     _beneficiario.removeControl('TMP_DIRECCION_COMPUESTA');
    //     _beneficiario.removeControl('tmpOtraDireccion');
    //     nuevaListaBeneficiarios.push(_beneficiario);
    //   }
    //   console.log("NUEVA LISTA");
    // }

    // console.log(nuevaListaBeneficiarios.value);



    setTimeout(()=>{

      // this.formularioAfiliados.removeControl('Beneficiarios');
      // this.formularioAfiliados.removeControl('TMP_DIRECCION_COMPUESTA');

      let tmpForm: FormGroup = this.formBuilder.group({});

      Object.keys(this.formularioAfiliados.controls).forEach(key => {
        if (this.formularioAfiliados.controls[key].value  && this.formularioAfiliados.controls[key].enabled) {

          if(key.substring(0,3) == "NU_" && key != 'NU_IDGRUPOPOBLA_GRUPOPOBL' && key != 'NU_IDTIPODISCAPA_DISCA'){
            //let dateValue =  this.transformarFecha(this.formularioAfiliados.controls[key].value )
            let value =  parseInt(this.formularioAfiliados.controls[key].value);
            tmpForm.addControl(key, new FormControl(value));
          }
          else{
            let value =  this.formularioAfiliados.controls[key].value;
            tmpForm.addControl(key, new FormControl(''+value));
          }
        }

      })


      let newForm = this.formBuilder.group({
        cotizante: tmpForm.value,
        //beneficiario: this.formBuilder.array(nuevaListaBeneficiarios.value),
        // archivo: this.formularioAfiliados.get('archivoTest')?.value,
        // archivo: [[]],
        beneficiario: [[]]
      })


      //newForm.get('cotizante').addControl('DeclaratoriasPorAfiliados', new FormControl([]))
      // newForm.patchValue({
      //   cotizante: ({
      //     'NU_IDAFILIADO_AFIL': 1,
      //     'TX_IDENTIFICACION_AFIL': 2,
      //     'DeclaratoriasPorAfiliados': [],
      //     archivos: [],
      //   })
      // })

      console.log(newForm.value);
      //console.log(newForm.value);
      //this.service.prueba(newForm.value);
    }, 200);




    console.log("done");
  }

  getAfiliadosForm(){
    return this.formularioAfiliados;
  }

  get modoSolicitud(): number{
    return this.modoFormulario;
  }

  set modoSolicitud(nuevoModo: number){
    this.modoFormulario = nuevoModo;
  }

  //#region MENSAJES DE ERROR

  get errorSoloLetras(): string{
    return this.mensajeErrorSoloLetras;
  }

  get errorSoloNumeros(): string{
    return this.mensajeErrorSoloNumeros;
  }

  get errorNumeroCelular(): string{
    return this.mensajeErrorNumeroCelular;
  }
   get errorCorreoUnal(): string{
    return this.mensajeErrorCorreoUnal;
  }

  get errorEmailNormal(): string{
    return this.mensajeErrorCorreo;
  }

   get erorLimiteBeneficiarios(): string{
    return this.mensajeErorLimiteBeneficiarios;
  }

   get errorRequired(): string{
    return this.mensajeErrorRequired;
  }



  //#endregion


}
