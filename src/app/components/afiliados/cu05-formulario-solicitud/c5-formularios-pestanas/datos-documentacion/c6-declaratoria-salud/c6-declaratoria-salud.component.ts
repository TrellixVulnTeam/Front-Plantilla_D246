import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { WebApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-c6-declaratoria-salud',
  templateUrl: './c6-declaratoria-salud.component.html',
  styleUrls: ['./c6-declaratoria-salud.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class C6DeclaratoriaSaludComponent implements OnInit {

  public formDeclaratoria: FormGroup;
  public preguntas: Pregunta[] = [];
  private medicamentos: Medicamentos[] = [];
  public listaMedicamentosProcesada: proc[] = [];

  test = true;
  items = ['hola', 'mundo', 'test']
  mostrarMedicamentos = false;
  limiteMedicamentos:number = 3;


  constructor(private formBuilder: FormBuilder,
    private servicioApi: WebApiService)  {


    this.formDeclaratoria = this.formBuilder.group({

    });

    this.formDeclaratoria.valueChanges.subscribe(() =>
        console.log(this.formDeclaratoria.value)
     )

    this.servicioApi.getPreguntasDeclaratorias().subscribe(data =>{
      this.preguntas = data as Pregunta[];
      console.log('data preguntas')
      console.log(data)
      console.log(this.preguntas.length)
      this.crearControles();
    })

    this.cargarMedicamentos();
  }

  test2(){
    console.log(this.formDeclaratoria.value)

  }

  cargarMedicamentos(){
    this.servicioApi.getMedicamentos().subscribe(data =>{
      console.log(data);
      this.medicamentos = data as Medicamentos[];

      this.listaMedicamentosProcesada = [];
      for (let index = 0; index < this.medicamentos.length; index++) {
        console.log(this.medicamentos[index].codigo)
        this.listaMedicamentosProcesada.push({
          display: this.medicamentos[index].nombreMedicamento,
          value: this.medicamentos[index].codigo
        })
      }
    });
  }



  radioTest(event: MatRadioChange, index: any){
    console.log('Pregunta: '+ index + ' valor: '  + event.value)
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

      this.formDeclaratoria.addControl(nombre.toString(),
        this.formBuilder.group({
          idPregunta : [_idPregunta, Validators.required],
          respuesta : [null, Validators.required]
        })
      );

    }

  }

  getFb(nm: number): FormGroup{
    // return nm.toString();
    return this.formDeclaratoria.get(''+nm) as FormGroup
  }

//#region medicamentos

  // @ViewChild(SelectAutocompleteComponent) multiSelect!: SelectAutocompleteComponent;

  selected = [''];
  showError = false;
  errorMessage = '';

  getSelectedOptions(selected: string[]) {
    if(this.selected.length > this.limiteMedicamentos) return;
    else{
      console.log(this.selected.length)
    this.selected = selected;
    }

  }
  onResetSelection() {
    this.selected = [];
  }

  // onToggleDropdown() {
  //   this.multiSelect.toggleDropdown();
  // }

//#endregion


  imprimir(){

    console.log(this.formDeclaratoria.value)
    //console.log(this.formDeclaratoria['controls'].'0'['controls'])
    //console.log(this.formDeclaratoria.controls.get?('2'))

    console.log(this.selected)

  }

  ngOnInit(): void {
  }

}

export interface Medicamentos {
  codigo: string;
  nombreMedicamento: string;
}

export interface proc {
  display: string;
  value: string;
}



export interface Pregunta {
  nU_IDPREGDECLA_DECLAFIL: number;
  tX_PREGUNTA_PREGDECL: string;
  tX_TIPOCAMPO_PREGDECL: string;
}


