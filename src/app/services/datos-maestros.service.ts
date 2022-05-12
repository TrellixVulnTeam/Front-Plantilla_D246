import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

//imported libraries
import { DatosMaestros } from '../models/datos-maestros/dato-maestro.model';
import { DmProcesado } from '../models/datos-maestros/dm-procesado.model';


@Injectable({
  providedIn: 'root'
})

export class DatosMaestrosService {

  // ********************* falta: Convenio Nombre convenio
  //#region => Panel: Datos principales
  private  tipoIdLst = new BehaviorSubject(new DmProcesado());
  private  nacionalidadesLst = new BehaviorSubject(new DmProcesado());
  private  sexoLst= new BehaviorSubject(new DmProcesado());
  private  grupoPoblacionalLst = new BehaviorSubject(new DmProcesado());
  private  grupoEtnicoLst = new BehaviorSubject(new DmProcesado());

  private  adminEabpLst = new BehaviorSubject(new DmProcesado());
  private  nombreConveniosLst = new BehaviorSubject<DmProcesado[]>([]);

  //#endregion

  // ********************* falta:  Fondo pensiones, sede UN, DependenciaUN, Tipo Solicitud
  //#region => Panel: Datos Complementarios
  private  orientacionSexualLst = new BehaviorSubject(new DmProcesado());
  private  estadoCivilLst = new BehaviorSubject(new DmProcesado());
  private  tipoSangreLst = new BehaviorSubject(new DmProcesado());
  private  rhLst = new BehaviorSubject(new DmProcesado());

  private  escolaridadLst = new BehaviorSubject(new DmProcesado());
  private  ocupacionLst = new BehaviorSubject(new DmProcesado());
  private  fondoPensionesLst = new BehaviorSubject(new DmProcesado());
  private  sedeUnLst = new BehaviorSubject(new DmProcesado());
  private  dependenciaUnLst = new BehaviorSubject(new DmProcesado());
  private  tipoSolicitudLst = new BehaviorSubject(new DmProcesado());


  private  epsAnteriorLst = new BehaviorSubject(new DmProcesado());
  private  regimenLst = new BehaviorSubject(new DmProcesado());

  //Ocupacion, Fondo pensiones

  private  sedesLst = new BehaviorSubject(new DmProcesado());
  private  dependenciasLst = new BehaviorSubject<DmProcesado[]>([]);

  //Tipo Solicitud

  private  discapacidadLst =  new BehaviorSubject(new DmProcesado());

  //#endregion


  //#region => Panel: Datos de contacto

  //Indicativos
  private  departamentosLst = new BehaviorSubject(new DmProcesado());
  private  ciudadesLst = new BehaviorSubject<DmProcesado[]>([]);
  private  zonaLst = new BehaviorSubject(new DmProcesado());

  private  localidadesLst =new BehaviorSubject<DmProcesado[]>([]);
  private  barriosLst =new BehaviorSubject<DmProcesado[]>([]);

  private  indicativosLst = new BehaviorSubject(new DmProcesado());

  private  estratosLst = new BehaviorSubject(new DmProcesado());

  private  tipoViaLst = new BehaviorSubject(new DmProcesado());
  private  letraViaLst = new BehaviorSubject(new DmProcesado());

  //#endregion


  //#region => Panel: Datos de emergencia
  private  parentescoLst = new BehaviorSubject(new DmProcesado());


  //#endregion


  //#region => Panel: Datos maestros

  private tiposAfiliacionLst = new BehaviorSubject(new DmProcesado());
  private upcAdicionalLst = new BehaviorSubject(new DmProcesado());

  //#endregion


  // private  comunasLst: DmProcesado[] = []
  // private  barriosLst: DmProcesado[] = []

  ///Sedes

  getArray(){
    var test:  DmProcesado[] = []
    return test
  }



  //private  ciudadesLst = new BehaviorSubject ([])

  constructor() {}

  procesarDatos(datosRecividos: DatosMaestros[]){

    //Filtro los datos maestros principales, asumiendo que los datos sin posición (null) no tienen padres
    let maestrosPadresFiltrados = datosRecividos.filter(function(value){
      return value.nU_POSITION_DM == null
    })

    //#region => Panel: Datos principales
    const tipoIdFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'TIPO-DE-IDENTIFICACION')
    const nacionalidadesFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'NACIONALIDADES')
    const sexoFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'SEXO')
    const grupoPoblacionalFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'GRUPO-POBLACIONAL')
    const grupoEtnicoFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'GRUPO ETNICO')

    const adminEabpFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'ADMINISTRADORA-EAPB')
    const nombreConveniosFiltro = datosRecividos.filter(function(valor) {
      return parseInt(valor.nU_IDRELACION_DM) == adminEabpFiltro?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
    });

    //ADMINISTRADORA-EAPB


    this.tipoIdLst.next(this.generarObjetoDm(tipoIdFiltro))
    this.nacionalidadesLst.next(this.generarObjetoDm(nacionalidadesFiltro));
    this.sexoLst.next(this.generarObjetoDm(sexoFiltro));
    this.grupoPoblacionalLst.next(this.generarObjetoDm(grupoPoblacionalFiltro));
    this.grupoEtnicoLst.next(this.generarObjetoDm(grupoEtnicoFiltro));
    this.adminEabpLst.next(this.generarObjetoDm(adminEabpFiltro));

    this.nombreConveniosLst.next(this.generarListaDm(nombreConveniosFiltro));


    //#endregion


    const indicativosFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'INDICATIVOS')
    this.indicativosLst.next(this.generarObjetoDm(indicativosFiltro))

    console.log(this.indicativosLst.value)


    //#region => Panel: Datos Contacto

    const depasFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'COL-DPTO')
    const ciudadesFiltro2 = datosRecividos.filter(function(valor) {
      return parseInt(valor.nU_IDRELACION_DM) == depasFiltro?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
    });
    const zonasFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'ZONA')

    const estratoFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'ESTRATO')
    const tipoViaFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'TIPO-DE-VIA-PRINCIPAL')
    const letraViaFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'LETRA-DE-VIA')

    this.departamentosLst.next(this.generarObjetoDm(depasFiltro));

    this.estratosLst.next(this.generarObjetoDm(estratoFiltro));

    this.tipoViaLst.next(this.generarObjetoDm(tipoViaFiltro));
    this.letraViaLst.next(this.generarObjetoDm(letraViaFiltro));





    //#endregion


    //const sedesFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'SEDEUNAL')

    this.ciudadesLst.next(this.generarListaDm(ciudadesFiltro2));

    this.zonaLst.next(this.generarObjetoDm(zonasFiltro));

    let locsFiltro: DatosMaestros[] = []

    for (let index = 0; index < ciudadesFiltro2.length; index++) {
      let tmp = datosRecividos.filter(function(valor) {
          return parseInt(valor.nU_IDRELACION_DM) == ciudadesFiltro2[index]?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
        })

        tmp.forEach(element => {
          locsFiltro.push(element)
        });

    }
    this.localidadesLst.next(this.generarListaDm(locsFiltro));


    let barriosFiltro: DatosMaestros[] = []

    for (let index = 0; index < locsFiltro.length; index++) {
      let tmp = datosRecividos.filter(function(valor) {
          return parseInt(valor.nU_IDRELACION_DM) == locsFiltro[index]?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
        })
        tmp.forEach(element => {
          barriosFiltro.push(element)
        });

    }
    this.barriosLst.next(this.generarListaDm(barriosFiltro));



    // const barriosFiltro = datosRecividos.filter(function(valor) {
    //   return parseInt(valor.nU_IDRELACION_DM) == depasFiltro?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
    // });

  //   private  localidadesLst =new BehaviorSubject<DmProcesado[]>([]);
  // private  barriosLst =new BehaviorSubject<DmProcesado[]>([]);



    //#region => Panel: Datos Complementarios

    const orientacionSexualFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'ORIENTACIONSEXUAL');
    const estadoCivilFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'ESTADO CIVIL');
    const tiposSangreFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'TIPOS-DE-SANGRE');
    const rhFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'RH');

    //Escolaridad
    const escolaridadFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'ESCOLARIDAD');

    const epsAnteriorFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'EPSANTERIOR');
    const regimenFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'REGIMEN');

    //Ocupacion, Fondo pensiones
    const ocupacionFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'OCUPACION');
    const fondoPensionesFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'FONDOS-DE-PENSION');

    const sedesFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'SEDEUNAL')
    const dependenciasFiltro = datosRecividos.filter(function(valor) {
      return parseInt(valor.nU_IDRELACION_DM) == sedesFiltro?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
    });

    //Tipo Solicitud
    const tipoSolicitudFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'TIPO-DE-SOLICITUD');

    const discapacidadFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'DISCAPACIDAD');


    this.orientacionSexualLst.next(this.generarObjetoDm(orientacionSexualFiltro));
    this.estadoCivilLst.next(this.generarObjetoDm(estadoCivilFiltro));
    this.tipoSangreLst.next(this.generarObjetoDm(tiposSangreFiltro));
    this.rhLst.next(this.generarObjetoDm(rhFiltro));


    //Escolaridad
    this.escolaridadLst.next(this.generarObjetoDm(escolaridadFiltro));

    this.epsAnteriorLst.next(this.generarObjetoDm(epsAnteriorFiltro));
    this.regimenLst.next(this.generarObjetoDm(regimenFiltro));

    //Ocupacion, Fondo pensiones
    this.ocupacionLst.next(this.generarObjetoDm(ocupacionFiltro));
    this.fondoPensionesLst.next(this.generarObjetoDm(fondoPensionesFiltro));


    this.sedesLst.next(this.generarObjetoDm(sedesFiltro));
    this.dependenciasLst.next(this.generarListaDm(dependenciasFiltro));

    //Tipo Solicitud
    this.tipoSolicitudLst.next(this.generarObjetoDm(tipoSolicitudFiltro));

    this.discapacidadLst.next(this.generarObjetoDm(discapacidadFiltro));

    //#endregion

  //   private  escolaridadLst = new BehaviorSubject(new DmProcesado());
  // private  ocupacionLst = new BehaviorSubject(new DmProcesado());
  // private  fondoPensionesLst = new BehaviorSubject(new DmProcesado());
  // private  sedeUnLst = new BehaviorSubject(new DmProcesado());
  // private  dependenciaUnLst = new BehaviorSubject(new DmProcesado());
  // private  tipoSolicitudLst = new BehaviorSubject(new DmProcesado());



    //#region Datos direcciones

    var dptsFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'COL-DPTO')

    var ciudadesFiltro = datosRecividos.filter(function(valor) {
        return parseInt(valor.nU_IDRELACION_DM) == dptsFiltro?.nU_IDDATOMAESTRO_DM && valor.nU_POSITION_DM != null
    });

    var comunasFiltro = datosRecividos.filter(function(value){
      return parseInt(value.nU_IDRELACION_DM) == ciudadesFiltro[0]?.nU_IDDATOMAESTRO_DM && value.nU_POSITION_DM != null
    })

    // var barriosFiltro = datosRecividos.filter(function(value){
    //   return parseInt(value.nU_IDRELACION_DM) == comunasFiltro[0]?.nU_IDDATOMAESTRO_DM && value.nU_POSITION_DM != null
    // })


    // var comunas = this.buscarRelacion(datosRecividos, comunasFiltro, ciudadesFiltro);
    // var barrios = this.buscarRelacion(datosRecividos, barriosFiltro, comunasFiltro);

    // this.departamentos = this.generarObjetoDm(dptsFiltro);
    // this.ciudadesLst = this.generarListaDm(ciudadesFiltro);
    // this.barriosLst = this.generarListaDm(barrios)
    // this.comunasLst = this.generarListaDm(comunas);


    //#endregion

    //#region

    // parentescoLst
    const parentescoFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'PARENTESCO')
    this.parentescoLst.next(this.generarObjetoDm(parentescoFiltro))
    //#endregion

    const tiposAfiliacionFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'TIPO-DE-AFILIACION')
    const upcAdicionaFiltro = maestrosPadresFiltrados.find(data => data.tX_TITULODATOMAESTRO_DM.toUpperCase() == 'UPC-ADICIONAL')
    this.tiposAfiliacionLst.next(this.generarObjetoDm(tiposAfiliacionFiltro))
    this.upcAdicionalLst.next(this.generarObjetoDm(upcAdicionaFiltro))

//     tiposAfiliacionLst
// upcAdicionalLst



    //asignacion

//#region log
    // console.log(this.orientacionSexualLst)
    // console.log(this.nacionalidadesLst)
    // console.log(this.sexoLst)
    // console.log(this.grupoPoblacionalLst)
    // console.log(this.grupoEtnicoLst)
    // console.log(this.estadoCivilLst)
    // console.log(this.epsAnteriorLst)
    // console.log(this.regimenLst)
//#endregion
    //#endregion


    console.log('finish dms')

  }

  private buscarRelacion(
    datosRecividos: DatosMaestros[],
    datosFiltrados: DatosMaestros[],
    filtroRelacion: DatosMaestros[]
    ){

    var listaTemp: DatosMaestros[] = []

    for (let index = 0; index < datosFiltrados.length; index++) {
      datosRecividos.filter(function(value){
        if(parseInt(value.nU_IDRELACION_DM) == filtroRelacion[index]?.nU_IDDATOMAESTRO_DM
        && value.nU_POSITION_DM != null){
          listaTemp.push(value)
        }
        return value
      })
    }
    return listaTemp;
  }

  count = 0;
  private generarObjetoDm(data: DatosMaestros | undefined){

    var dmProcesadoObjeto = new DmProcesado(
      data!.aR_DATO_DM,
      data?.nU_IDDATOMAESTRO_DM,
      parseInt(data!.nU_IDRELACION_DM),
      parseInt(data!.nU_POSITION_DM),
      data?.tX_TITULODATOMAESTRO_DM
    )
    // console.log(dmProcesadoObjeto)
    // console.log('dmProcesadoObjeto')
    // console.log(++this.count)

    return dmProcesadoObjeto;
  }

  private generarListaDm(data: DatosMaestros[]){
    let listaTmp: DmProcesado[] = []

    for (let index = 0; index < data.length; index++) {
      const tmp = new DmProcesado(
        data[index]!.aR_DATO_DM,
        data[index]?.nU_IDDATOMAESTRO_DM,
        parseInt(data[index]!.nU_IDRELACION_DM),
        parseInt(data[index]!.nU_POSITION_DM),
        data[index]?.tX_TITULODATOMAESTRO_DM
      )
      listaTmp.push(tmp);
    }
    return listaTmp;
  }


  //#region => Panel: Datos principales
  getTipoId(): Observable<DmProcesado>{
    return this.tipoIdLst;
  }

  getNacionalidadesList(): Observable<DmProcesado>{
    return this.nacionalidadesLst;
  }

  getSexoList(): Observable<DmProcesado>{
    return this.sexoLst;
  }

  getGrupoEtnicoList(): Observable<DmProcesado>{
    return this.grupoEtnicoLst;
  }

  getGrupoPoblacional(): Observable<DmProcesado>{
    return this.grupoPoblacionalLst;
  }

  getAdminEabp(): Observable<DmProcesado>{
    return this.adminEabpLst;
  }

  getConvenios(): Observable<DmProcesado[]>{
    return this.nombreConveniosLst;
  }

  getIndicativos(): Observable<DmProcesado>{
    return this.indicativosLst;
  }

  getOcupaciones(): Observable<DmProcesado>{
    return this.ocupacionLst;
  }

  getFondoPensiones(): Observable<DmProcesado>{
    return this.fondoPensionesLst;
  }

  getEscolaridades(): Observable<DmProcesado>{
    return this.escolaridadLst;
  }

  getTipoSolicitud(): Observable<DmProcesado>{
    return this.tipoSolicitudLst;
  }
  //#endregion


  //#region => Panel: Datos Complementarios

  getOrientacionSexual(): Observable<DmProcesado>{
    return this.orientacionSexualLst;
  }

  getEstadoCivil(): Observable<DmProcesado>{
    return this.estadoCivilLst;
  }

  getTipoSangre(): Observable<DmProcesado>{
    return this.tipoSangreLst;
  }

  getRhsLst(): Observable<DmProcesado>{
    return this.rhLst;
  }

  //Escolaridad

  getEpsAnterior(): Observable<DmProcesado>{
    return this.epsAnteriorLst;
  }

  getRegimen(): Observable<DmProcesado>{
    return this.regimenLst;
  }

  //Ocupacion, Fondo pensiones

  getSedes(): Observable<DmProcesado>{
    return this.sedesLst;
  }

  getDependencias(): Observable<DmProcesado[]>{
    return this.dependenciasLst;
  }

  //Tipo Solicitud

  getDiscapacidad(): Observable<DmProcesado>{
    return this.discapacidadLst;
  }

  //#endregion

  //#region => Panel: Datos Contacto
  getDepartamentosLst(): Observable<DmProcesado>{
    return this.departamentosLst;
  }

  getCiudadesLst(): Observable<DmProcesado[]>{
    return this.ciudadesLst;
  }


  getZonasLst(): Observable<DmProcesado>{
    return this.zonaLst;
  }

  getLocalidadesLst(): Observable<DmProcesado[]>{
    return this.localidadesLst;
  }

  getBarriosLst(): Observable<DmProcesado[]>{
    return this.barriosLst;
  }

  getEstratos(): Observable<DmProcesado>{
    return this.estratosLst;
  }

  getTipoVia(): Observable<DmProcesado>{
    return this.tipoViaLst;
  }

  getLetraVia(): Observable<DmProcesado>{
    return this.letraViaLst;
  }


  //#endregion

  //#region => Panel: Datos emergencia
  getParentescos(): Observable<DmProcesado>{
    return this.parentescoLst;
  }

  getTiposAfiliacion(): Observable<DmProcesado>{
    return this.tiposAfiliacionLst;
  }
  getUpcAdicional(): Observable<DmProcesado>{
    return this.upcAdicionalLst;
  }

  //#endregion

}
