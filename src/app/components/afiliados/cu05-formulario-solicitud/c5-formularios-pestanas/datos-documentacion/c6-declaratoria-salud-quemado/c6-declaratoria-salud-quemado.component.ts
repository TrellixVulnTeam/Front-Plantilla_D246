import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { WebApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-c6-declaratoria-salud-quemado',
  templateUrl: './c6-declaratoria-salud-quemado.component.html',
  styleUrls: ['./c6-declaratoria-salud-quemado.component.css']
})
export class C6DeclaratoriaSaludQuemadoComponent implements OnInit {

  //Formularios
  formularioAfiliados: FormGroup;
  public formDeclaratoria: FormGroup;

  // formDeclas: FormArray;
  public preguntas: Pregunta[] = [];
  private medicamentos: Medicamentos[] = [];
  public listaMedicamentosProcesada: proc[] = [];

  // formTest: FormGroup;

  test = true;
  items = ['hola', 'mundo', 'test']
  mostrarMedicamentos = false;
  limiteMedicamentos:number = 3;




  constructor(private formBuilder: FormBuilder,
    private servicioApi: WebApiService,
    public sharedFb: AfiliadosFormCompartidoService,
    private dialogRef: MatDialogRef<C6DeclaratoriaSaludQuemadoComponent>,
    )  {
      this.formularioAfiliados = this.sharedFb.getAfiliadosForm();

    this.formDeclaratoria = this.formBuilder.group({
      preguntasDeclaratorias:  this.formBuilder.array([])
    });


    this.servicioApi.getPreguntasDeclaratorias().subscribe(data =>{
      this.preguntas = data as Pregunta[];
      console.log('data preguntas')
      console.log(data)
      console.log(this.preguntas.length)
      this.crearControles();
    })

    this.cargarMedicamentos();
  }



  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;


  medicamentosSeleccionados: Medicamentos[] = []
  medicamentoFiltrado: Medicamentos [] = []
  fruitCtrl = new FormControl();
  filteredMeds!: Observable<Medicamentos[]>;

  filteredDiscapacidades!: Observable<Medicamentos[]>;


  remove(medicamento: any): void {

    this.medicamentosSeleccionados = this.medicamentosSeleccionados.filter( current => {
      return current.codigo != medicamento.codigo
      // return current.idPosition != discapacidad.idPosition
    })

    this.restaurarDiscapacidades();
    this.autocomplete.closePanel();
  }

  add(event: MatChipInputEvent): void {
    this.autocomplete.closePanel();
    this.restaurarDiscapacidades();

    this.filteredDiscapacidades.pipe(
      map(value => this.getLista())
    )
  }


  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected')
    this.medicamentosSeleccionados.push(event.option.value);
    this.restaurarDiscapacidades();
    this.removerMedicamento(event.option.value.idPosition);
    this.autocomplete.closePanel();

    this.filteredDiscapacidades.pipe(
      map(value => this.getLista())
    )

    // this.setDiscapacidades();

  }


  medicamentosLista: Medicamentos[] = []

  restaurarDiscapacidades(): void{
    let arr: any[] = []
    this.medicamentosSeleccionados.forEach(element => {
      //arr.push(element.idPosition)
      arr.push(element.codigo)
    });

    //this.medicamentoFiltrado = Object.assign({},this.medicamentos)
    this.medicamentosLista = Object.assign({},this.medicamentos)

    Object.values(this.medicamentosLista).filter(data => !arr.includes(data.codigo))
    // this.medicamentoFiltrado = this.medicamentosLista.filter(
    //   data => !arr.includes(data.codigo)
    //   );
  }




  getLista(): Medicamentos[]{
    return  this.medicamentoFiltrado
  }

  removerMedicamento(position: number):void{
    for (let index = 0; index < this.medicamentoFiltrado.length; index++) {
      if(this.medicamentoFiltrado[index].codigo == position){
        this.medicamentoFiltrado.splice(index,1)
      }
    }
  }

















  get getPreguntas(): FormArray{
    return this.formDeclaratoria.get('preguntasDeclaratorias') as FormArray
    // if(this.formDeclaratoria.controls['preguntasDeclaratorias'] as FormArray){
    // }
    // return this.formBuilder.array([])
  }

  getFormGroup(contrl: AbstractControl): FormGroup{
    // console.log(contrl)
    return contrl as FormGroup
  }


  // get respuestas(){
  //   return this.formTest.controls['respuestas'] as FormArray
  // }

  test2(){

    let tmpForm: FormGroup = this.formBuilder.group({
      arrayForm: this.formBuilder.array([])
    });

    for (let index = 0; index < this.getPreguntas.controls.length; index++) {
      let oneForm = this.getPreguntas.controls[index] as FormGroup

      if(oneForm.get('tx_pregunta')?.value.includes('medicamento') && oneForm.get('NU_RESPUESTAPREGUNTA')?.value == 0){
        let tempArray: number[] = []

        this.medicamentosSeleccionados.forEach(element => {
          tempArray.push(element.codigo!)
        });

        console.log(`[${tempArray.toString()}]`)
        oneForm.get('NU_RESPUESTAPREGUNTA')?.setValue(`[${tempArray.toString()}]`);
      }

      (tmpForm.get('arrayForm') as FormArray).push(oneForm)

    }
    console.log((tmpForm.get('arrayForm') as FormArray).value)

    this.formularioAfiliados.get('DeclaratoriasPorAfiliados')?.setValue((tmpForm.get('arrayForm') as FormArray).value);
    this.dialogRef.close();
  }

  cargarMedicamentos(){
    this.servicioApi.getMedicamentos().subscribe(data =>{
      console.log(data);
      this.medicamentos = data as Medicamentos[];
      this.medicamentoFiltrado = data as Medicamentos[];

      this.listaMedicamentosProcesada = [];
      for (let index = 0; index < this.medicamentos.length; index++) {
        console.log(this.medicamentos[index].codigo)
        this.listaMedicamentosProcesada.push({
          display: this.medicamentos[index].nombreMedicamento!,
          value: this.medicamentos[index].codigo!
        })
      }
      console.log(this.listaMedicamentosProcesada)
      console.log(this.medicamentos)
    });
  }



  radioTest(event: MatRadioChange, index: any){
    console.log('Pregunta: '+ index + ' valor: '  + event.value)
    console.log(this.getPreguntas.valid)
    console.log(this.getPreguntas.value)
  }

  muestraMedicamentos(event: MatRadioChange, index: any){
    console.log('Pregunta: '+ index + ' valor: '  + event.value)
    if(event.value == 0){
      return this.mostrarMedicamentos = true;
    }
    return this.mostrarMedicamentos = false;
  }

  crearControles() {
    var test = this.preguntas;

    console.log('preguntas')
    console.log(test)
    for (let index = 0; index < this.preguntas.length; index++) {

      var nombre = test[index].nU_IDPREGDECLA_DECLAFIL;
      var _idPregunta = test[index].nU_IDPREGDECLA_DECLAFIL;

      this.getPreguntas.push(this.formBuilder.group({
        NU_IDDECAFIL_DECLAFIL: [nombre],
        NU_RESPUESTAPREGUNTA: [null, [Validators.required]],
        tx_pregunta: test[index].tX_PREGUNTA_PREGDECL,
        tx_tipocampo: test[index].tX_TIPOCAMPO_PREGDECL
      }))

      // this.formDeclaratoria.addControl(nombre.toString(),
      //   this.formBuilder.group({
      //     idPregunta : [_idPregunta, Validators.required],
      //     respuesta : [null, Validators.required]
      //   })
      // );

    }

    console.log(this.getPreguntas.value)
    // console.log(this.getPreguntas.valid)

  }

  // getFb(nm: number): FormGroup{
  //   // return nm.toString();
  //   // return this.formDeclaratoria.get(''+nm) as FormGroup
  // }

//#region medicamentos

  // @ViewChild(SelectAutocompleteComponent) multiSelect!: SelectAutocompleteComponent;

  // selected = [''];
  // showError = false;
  // errorMessage = '';

  // getSelectedOptions(selected: string[]) {
  //   if(this.selected.length > this.limiteMedicamentos) return;
  //   else{
  //     console.log(this.selected.length)
  //   this.selected = selected;
  //   }

  // }
  // onResetSelection() {
  //   this.selected = [];
  // }

  // onToggleDropdown() {
  //   this.multiSelect.toggleDropdown();
  // }

//#endregion


  imprimir(){

    let tmpForm: FormGroup = this.formBuilder.group({
      arrayForm: this.formBuilder.array([])
    });

    for (let index = 0; index < this.getPreguntas.controls.length; index++) {
      let oneForm = this.getPreguntas.controls[index] as FormGroup

      if(oneForm.get('tx_pregunta')?.value.includes('medicamento') && oneForm.get('NU_RESPUESTAPREGUNTA')?.value == 0){
        let tempArray: number[] = []

        this.medicamentosSeleccionados.forEach(element => {
          tempArray.push(element.codigo!)
        });

        console.log(`[${tempArray.toString()}]`)
        oneForm.get('NU_RESPUESTAPREGUNTA')?.setValue(`[${tempArray.toString()}]`);
      }

      (tmpForm.get('arrayForm') as FormArray).push(oneForm)

    }



    console.log((tmpForm.get('arrayForm') as FormArray).value)

  }

  ngOnInit(): void {
    this.filteredDiscapacidades = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      // map((fruit: string | null) =>
      //   fruit ? this._filter(fruit) : this.allFruits.slice()
      // )
      map(value => this._filter(value))
    );
  }

  private _filter(value: any): Medicamentos[] {

    console.log(value)
    console.log(this.medicamentoFiltrado)
    if (!value) return this.medicamentoFiltrado

    if(value && typeof(value) == 'string'){
      console.log('string')
      let tempLista = Object.assign({},this.medicamentoFiltrado)
      tempLista = this.medicamentoFiltrado.filter( opcion =>
        // opcion.nombreMedicamento == value
        opcion.nombreMedicamento!.toString().toLowerCase().includes(value.toLowerCase())
      )
      return tempLista
    }

    else{
      console.log('obj')
      let tempLista = Object.assign({},this.medicamentoFiltrado)
      tempLista = this.medicamentoFiltrado.filter( opcion =>
        opcion.nombreMedicamento == value.nombreMedicamento
        //opcion.name.toString().toLowerCase().includes(value.toLowerCase())
      )
      return tempLista
    }
    //return this.discapacidadLstFiltrado.data
  }

}

export interface Medicamentos {
  codigo?: number;
  nombreMedicamento?: string;
}

export interface proc {
  display: string;
  value: number;
}



export interface Pregunta {
  nU_IDPREGDECLA_DECLAFIL: number;
  tX_PREGUNTA_PREGDECL: string;
  tX_TIPOCAMPO_PREGDECL: string;
}


