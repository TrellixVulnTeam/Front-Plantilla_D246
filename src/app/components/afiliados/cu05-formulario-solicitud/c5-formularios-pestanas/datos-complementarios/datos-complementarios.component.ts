import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DatoExpandido, DmProcesado } from 'src/app/models/datos-maestros/dm-procesado.model';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { DatosMaestrosService } from 'src/app/services/datos-maestros.service';



import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import {  MatAutocompleteSelectedEvent,  MatAutocomplete,  MatAutocompleteTrigger,} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-datos-complementarios',
  templateUrl: './datos-complementarios.component.html',
  styleUrls: ['./datos-complementarios.component.css']
})
export class DatosComplementariosComponent implements OnInit {

  //Formularios
  formularioAfiliados: FormGroup;

  mostrarDiscapacidades = false;

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

  //Datos locales con relaciones
  sedeSeleccionada = -1;


  constructor(
    public sharedFb: AfiliadosFormCompartidoService,
    private formBuilder: FormBuilder,
    private datosMaestros: DatosMaestrosService
    ) {
    this.formularioAfiliados = this.sharedFb.getAfiliadosForm();
    this.fruitCtrl.disable()


  }

  dependenciaUn(event: number){
    //console.log(event)
    //console.log(typeof(event))
    this.sedeSeleccionada = event ;
    console.log(this.sedeSeleccionada)
    this.formularioAfiliados.get('NU_IDDEPENDENC_DEPENDENC')?.setValue(null);
    this.formularioAfiliados.get('NU_IDDEPENDENC_DEPENDENC')?.enable();
  }

  ngOnInit(): void {

    // this.filteredOptions = this.fruitCtrl2.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter2(value))
    // )

    this.filteredDiscapacidades = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      // map((fruit: string | null) =>
      //   fruit ? this._filter(fruit) : this.allFruits.slice()
      // )
      map(value => this._filter(value))
    );

    this.filteredOptions = this.fruitCtrl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
      // ((item) => {
      //   return this.objectOptions.filter( (opt) =>
      //     opt.name.toLowerCase().includes(item.toLowerCase())
      //   )
      // })
    )



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


  }

  test(){
    console.log(this.selected)
  }










  // visible = true;
  // selectable = true;
  // removable = true;
  fruitCtrl = new FormControl();
  filteredDiscapacidades!: Observable<DatoExpandido[]>;
  //allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  allFruits: any[] = [];
  discapacidadesSeleccionadas: DatoExpandido[] =[];
  //discapacidadLstFiltrado



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

    //filteredDiscapacidades!: Observable<DatoExpandido[]>;


    // this.filteredDiscapacidades = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   // map((fruit: string | null) =>
    //   //   fruit ? this._filter(fruit) : this.allFruits.slice()
    //   // )
    //   map(value => this._filter(value))
    // );
    //Observable<DatoExpandido[]>;     = this.discapacidadLstFiltrado.data


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

    this.formularioAfiliados.get('NU_IDTIPODISCAPA_DISCA')?.setValue(`[${arrayDis.toString()}]`)
  }

  getDiscapacidadesTx(event: any){
    // console.log('event')
    // console.log(event)
    // return event.txValor
    if(!event) return '';
    return event.txValor
  }


  filteredOptions!: Observable<any[]>;
  discapacidadLstFiltrado2!: Observable<DmProcesado>;



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

  fruitCtrl2 = new FormControl();

  options = ['angular', 'react', 'vue']
  objectOptions = [
    {name: 'angular'},
    {name: 'react'},
    {name: 'vue'},
  ]

  private _filter2(value: string): {name: string}[]{
    console.log('value')
    console.log(value)
    if(!value) return this.objectOptions

    // ((item) => {
    //     return this.objectOptions.filter( (opt) =>
    //       opt.name.toLowerCase().includes(item.toLowerCase())
    //     )
    //   })

    // const filterValue = value.toLowerCase();
    // return this.options.filter(option =>
    //   option.toLowerCase().includes(filterValue)
    // )
    // return []
    console.log(this.objectOptions.filter( opcion =>
      opcion.name.toString().toLowerCase().includes(value.toLowerCase())
    ))
    console.log(this.objectOptions)
    return this.objectOptions.filter( opcion =>
      opcion.name.toString().toLowerCase().includes(value.toLowerCase())
    )
    // return this.objectOptions
  }
















  // NU_EXTENSION_AFIL

  soloNumero(inputValue?: any){
    // console.log(inputValue)
    // console.log(this.formularioAfiliados.get('NU_EXTENSION_AFIL')?.value)

    // let value = (this.formularioAfiliados.get('NU_EXTENSION_AFIL')?.value)
    // var numsStr = value.replace(/[^0-9]/g, '');
    // console.log(numsStr)
    // this.formularioAfiliados.get('NU_EXTENSION_AFIL')?.setValue(numsStr)
  }

  forzarNumero(inputValue: KeyboardEvent): boolean{
    //return
    let res = ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(inputValue.code) ? true : !isNaN(Number(inputValue.key)) && inputValue.code!=='Space'

    console.log(res)
    console.log(inputValue)
    console.log(inputValue.key)
    console.log(inputValue.code)
    if (res) return true
    inputValue.preventDefault();
    return false;
  }

  checkboxDiscapacidades(event: MatCheckboxChange){
    console.log(event)
    console.log(event.checked)
    this.mostrarDiscapacidades = event.checked;

    if(this.mostrarDiscapacidades){
      this.formularioAfiliados.controls['TMP_DISCAPACIDADES'].enable()
      this.formularioAfiliados.controls['NU_IDTIPODISCAPA_DISCA'].enable()
      this.fruitCtrl.enable()
      return;
    }

    this.formularioAfiliados.controls['TMP_DISCAPACIDADES'].disable()
    this.formularioAfiliados.controls['NU_IDTIPODISCAPA_DISCA'].disable()
    this.fruitCtrl.disable()
  }




}
