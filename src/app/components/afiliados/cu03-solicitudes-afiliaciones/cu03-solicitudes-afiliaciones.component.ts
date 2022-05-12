import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Afiliado, Cotizante } from 'src/app/models/afiliados-models/afiliado.model';
import { WebApiService } from 'src/app/services/api-service.service';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogConfig } from '@angular/material/dialog';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { MatSort } from '@angular/material/sort';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-cu03-solicitudes-afiliaciones',
  templateUrl: './cu03-solicitudes-afiliaciones.component.html',
  styleUrls: ['./cu03-solicitudes-afiliaciones.component.css']
})
export class Cu03SolicitudesAfiliacionesComponent implements AfterViewInit {

  //filtro por defecto: Nombre y apellido
  filtrarPor = 0;

  //Variables para el filtro
  filtroFechaValue?: Date | null;
  filtroNombreValue?: string | null;
  filtroSolicitudValue?: number | null;
  filtroEstadoValue?: number | null;

  //Datasource de la tabla Afiliado
  dataSource = new MatTableDataSource<any>();

  //config de la tabla
  displayedColumns: string[] = ['fechaCreacion', 'fechaSolicitud', 'fechaInicioServicio','nombres', 'formaSolicitud', 'estadoSolicitud' , 'opciones'];
  numeroPaginas = [10, 20, 30];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Lista de datos cargada desde la DB
  listaAfiliadosSinFiltro: Afiliado[] = [];
  listaAfiliadosFiltro: Afiliado[] = [];

  //Dialog
  //private dialogConfig = new MatDialogConfig();


  constructor(private servicioApi: WebApiService,
    private afiliadosForm: AfiliadosFormCompartidoService) {

    this.servicioApi.getListaAfiliado().subscribe((data: Afiliado[])  =>{

      console.log('lista afiliados')
      console.log(data)
      // data.forEach(element => {
      //   this.listaAfiliadosFiltro.push(element.cotizante)
      // });

      // console.log(this.listaAfiliadosFiltro)
      this.listaAfiliadosFiltro = data as Afiliado[]
      this.listaAfiliadosSinFiltro = this.listaAfiliadosFiltro
      // console.log(this.listaAfiliadosFiltro);
      this.dataSource = new MatTableDataSource(this.listaAfiliadosFiltro);
      // this.dataSource.paginator = this.paginator;
      // console.log('data afils')
      // console.log((data.afiliado[2].fE_FECHACREACION_AFIL))
      // console.log(new Date(data.afiliado[2].fE_FECHACREACION_AFIL ))
      // let fechaA = moment(data.afiliado[2].fE_FECHACREACION_AFIL, 'DD/MM/YYYY');
      // let fechaB = moment(data.afiliado[1].fE_FECHACREACION_AFIL, 'DD/MM/YYYY');
      // console.log(fechaA)
      // console.log(fechaB)
      // console.log(fechaA > fechaB)
      // console.log(fechaA < fechaB)
    })
  }
  ngAfterViewInit(): void {

    this.sort.sortChange.subscribe( res =>{

      if(res.active == 'fechaCreacion'){
        this.sortFechaCreacion(res.direction)
        return;
      }

      if(res.active == 'fechaSolicitud'){
        this.sortFechaSolicitud(res.direction)
        return;
      }

      if(res.active == 'fechaCreacion'){
        this.sortFechaCreacion(res.direction)
        return;
      }

      if(res.active == 'fechaInicioServicio'){
        this.sortFechaInicioServicio(res.direction)
        return;
      }

      if(res.active == 'nombres'){
        this.sortNombres(res.direction)
        return;
      }

      if(res.active == 'formaSolicitud'){
        this.sortFormaSolicitud(res.direction)
        return;
      }

      if(res.active == 'estadoSolicitud'){
        this.sortEstadoSolicitud(res.direction)
        return;
      }
    })

  }


  crearSolicitud(){
    this.afiliadosForm.crearSolicitud(0);
  }



  sortFechaCreacion(direction: string){
    if(direction == 'asc'){
      console.log('asc')
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        // let fechaA = moment(a.cotizante.fE_FECHACREACION_AFIL, 'DD/MM/YYYY').toDate().getTime();
        // let fechaB = moment(b.cotizante.fE_FECHACREACION_AFIL, 'DD/MM/YYYY').toDate().getTime();
        let fechaA = new Date(a.cotizante.fE_FECHACREACION_AFIL).getTime()
        let fechaB = new Date(b.cotizante.fE_FECHACREACION_AFIL).getTime()
        return fechaA > fechaB ? 1 : -1;
      })
    } else if(direction == 'desc'){
      console.log('desc')
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        // let fechaA = moment(a.cotizante.fE_FECHACREACION_AFIL, 'DD/MM/YYYY').toDate().getTime();
        // let fechaB = moment(b.cotizante.fE_FECHACREACION_AFIL, 'DD/MM/YYYY').toDate().getTime();
        let fechaA = new Date(a.cotizante.fE_FECHACREACION_AFIL).getTime()
        let fechaB = new Date(b.cotizante.fE_FECHACREACION_AFIL).getTime()
        return fechaA < fechaB ? 1 : -1;
      })
    }
    this.dataSource.data = this.listaAfiliadosFiltro
    // let cont = 0;
    // this.listaAfiliadosFiltro.forEach(element => {
    //   console.log(`cont: ${++cont}:  ${element.cotizante.fE_FECHACREACION_AFIL}`)
    // });
  }

  sortFechaSolicitud(direction: string){
    if(direction == 'asc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let fechaA = new Date(a.cotizante.fE_FECHASOLICITUD_AFIL).getTime()
        let fechaB = new Date(b.cotizante.fE_FECHASOLICITUD_AFIL).getTime()
        return fechaA > fechaB ? 1 : -1;
      });
    } else if(direction == 'desc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let fechaA = new Date(a.cotizante.fE_FECHASOLICITUD_AFIL).getTime()
        let fechaB = new Date(b.cotizante.fE_FECHASOLICITUD_AFIL).getTime()
        return fechaA < fechaB ? 1 : -1;
      });
    }
    this.dataSource.data = this.listaAfiliadosFiltro
  }

  sortFechaInicioServicio(direction: string){
    if(direction == 'asc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let fechaA = new Date(a.cotizante.fE_FECHAINICIOSER_AFIL).getTime()
        let fechaB = new Date(b.cotizante.fE_FECHAINICIOSER_AFIL).getTime()
        return fechaA > fechaB ? 1 : -1;
      });
    } else if(direction == 'desc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let fechaA = new Date(a.cotizante.fE_FECHAINICIOSER_AFIL).getTime()
        let fechaB = new Date(b.cotizante.fE_FECHAINICIOSER_AFIL).getTime()
        return fechaA < fechaB ? 1 : -1;
      });
    }
    this.dataSource.data = this.listaAfiliadosFiltro
  }

  sortNombres(direction: string){
    if(direction == 'asc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let nombreA = (a.cotizante.tX_PRIMNOMBRE_AFIL).toUpperCase();
        let nombreB = (b.cotizante.tX_PRIMNOMBRE_AFIL).toUpperCase();
        // return (nombreA < nombreB) ? -1 : (nombreA > nombreB) ? 1 : 0;
        return nombreA < nombreB ? 1 : -1;
      });
    } else if(direction == 'desc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let nombreA = (a.cotizante.tX_PRIMNOMBRE_AFIL).toUpperCase();
        let nombreB = (b.cotizante.tX_PRIMNOMBRE_AFIL).toUpperCase();
        // return (nombreA < nombreB) ? -1 : (nombreA > nombreB) ? 1 : 0;
        return nombreA > nombreB ? 1 : -1;
      });
    }
    this.dataSource.data = this.listaAfiliadosFiltro
  }

  sortFormaSolicitud(direction: string){
    if(direction == 'asc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let nombreA = (a.cotizante.tX_FORMASOLICITUD_AFIL);
        let nombreB = (b.cotizante.tX_FORMASOLICITUD_AFIL);
        return nombreA < nombreB ? 1 : -1;
      });
    } else if(direction == 'desc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let nombreA = (a.cotizante.tX_FORMASOLICITUD_AFIL);
        let nombreB = (b.cotizante.tX_FORMASOLICITUD_AFIL);
        return nombreA > nombreB ? 1 : -1;
      });
    }
    this.dataSource.data = this.listaAfiliadosFiltro
  }

  sortEstadoSolicitud(direction: string){
    if(direction == 'asc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let nombreA = (a.cotizante.nU_ESTADO_AFIL);
        let nombreB = (b.cotizante.nU_ESTADO_AFIL);
        return nombreA < nombreB ? 1 : -1;
      });
    } else if(direction == 'desc'){
      this.listaAfiliadosFiltro.sort(function(a: Afiliado, b: Afiliado) {
        let nombreA = (a.cotizante.nU_ESTADO_AFIL);
        let nombreB = (b.cotizante.nU_ESTADO_AFIL);
        return nombreA > nombreB ? 1 : -1;
      });
    }
    this.dataSource.data = this.listaAfiliadosFiltro
  }


  //#region --> Filtros

  resetFilters(): void {
    this.filtroFechaValue = null;
    this.filtroNombreValue = null;
    this.filtroSolicitudValue = null;
    this.filtroEstadoValue = null;
    this.dataSource.data = this.listaAfiliadosSinFiltro;
  }

  filtrarPorNombre(): void {
    if(this.filtroNombreValue && this.filtroNombreValue.length > 2){
      this.dataSource.data =  this.listaAfiliadosSinFiltro.filter((data: Afiliado) =>
        `${data.cotizante.tX_PRIMNOMBRE_AFIL} ${data.cotizante.tX_PRIMAPELLI_AFIL}`.toLowerCase().trim().includes(
          this.filtroNombreValue!.toLowerCase().trim() )
      )
      return;
    }
    this.dataSource.data = this.listaAfiliadosSinFiltro;
  }

  filtrarTipoSolicitud(indexValue: number): void {
    console.log(indexValue);
    this.filtroSolicitudValue = indexValue;
    if(this.filtroSolicitudValue == 1 || this.filtroSolicitudValue == 0){
      this.dataSource.data = this.listaAfiliadosSinFiltro.filter((data: Afiliado) =>
        data.cotizante.tX_FORMASOLICITUD_AFIL == indexValue.toString()
    );
      return;
    }

    // console.log(this.filtroSolicitudValue);
    this.dataSource.data = this.listaAfiliadosSinFiltro;
  }


  filtrarEstadoSolicitud(indexValue: number): void {
    console.log(indexValue);
    this.filtroEstadoValue = indexValue;
    console.log(this.filtroEstadoValue);

    if(this.filtroEstadoValue == 0 || this.filtroEstadoValue){
      this.dataSource.data =  this.listaAfiliadosSinFiltro.filter( (data: Afiliado) =>
      data.cotizante.nU_ESTADO_AFIL == this.filtroEstadoValue)
      return;
    }
    this.dataSource.data = this.listaAfiliadosSinFiltro;
  }

  //#endregion

  // TODO: Revisar funcionalidad
  //#region --> Botones tabla

  dialogEditarAfiliad(afiliado: Afiliado){
    //this.sharedFb.setAfiliadosForm(afiliado)
  }

  dialogValidarAfiliado(afiliado: any){
    // const newDialog = this.dialog.open(C11ValidarComponent,{
    //   data: afiliado,
    //   disableClose: this.dialogConfig.disableClose,
    //   autoFocus: this.dialogConfig.autoFocus,
    //   width:this.dialogConfig.width,
    //   minHeight: this.dialogConfig.minHeight
    // })
    // // console.log()
    // newDialog.afterClosed().subscribe(result =>{
    //   console.log('closed')
    //   console.log(`Dialog result: ${result}`);
    //   // this.servicioApi.setConsentimientoDatos(result).subscribe( respuesta =>{
    //   //   console.log(respuesta)
    //   //   alert('Autorizacion: ' + respuesta)
    //   // })
    // })
  }

  dialogAceptarDocsAfiliado(afiliado: any){
    // const newDialog = this.dialog.open(Cu128AceptarDocsAfilComponent,{
    //   data: afiliado,
    //   disableClose: this.dialogConfig.disableClose,
    //   autoFocus: this.dialogConfig.autoFocus,
    //   width:this.dialogConfig.width,
    //   minHeight: this.dialogConfig.minHeight
    // })
    // // console.log()
    // newDialog.afterClosed().subscribe(result =>{
    //   console.log('closed')
    //   console.log(`Dialog result: ${result}`);
    // })
  }

  dialogAprobarAfiliado(afiliado: any){
    // const newDialog = this.dialog.open(C13AprobarAfiliacionComponent,{
    //   data: afiliado,
    //   disableClose: this.dialogConfig.disableClose,
    //   autoFocus: this.dialogConfig.autoFocus,
    //   width:this.dialogConfig.width,
    //   minHeight: this.dialogConfig.minHeight
    // })
    // newDialog.afterClosed().subscribe(result =>{
    //   console.log('closed')
    //   console.log(`Dialog result: ${result}`);
    // })
  }

  dialogRechazarAfiliado(afiliado: any){
    // const newDialog = this.dialog.open(C14RechazarAfiliacionComponent,{
    //   data: afiliado,
    //   disableClose: this.dialogConfig.disableClose,
    //   autoFocus: this.dialogConfig.autoFocus,
    //   width:this.dialogConfig.width,
    //   minHeight: this.dialogConfig.minHeight
    // })
    // newDialog.afterClosed().subscribe(result =>{
    //   console.log('closed')
    //   console.log(`Dialog result: ${result}`);
    // })
  }

  dialogSoporteAfiliado(afiliado: any){
    // const newDialog = this.dialog.open(C12SoporteSolicitudAfilComponent,{
    //   data: afiliado,
    //   disableClose: this.dialogConfig.disableClose,
    //   autoFocus: this.dialogConfig.autoFocus,
    //   width:this.dialogConfig.width,
    //   minHeight: this.dialogConfig.minHeight
    // })
    // newDialog.afterClosed().subscribe(result =>{
    //   console.log('closed')
    //   console.log(`Dialog result: ${result}`);
    // })
  }


  //#endregion

}
