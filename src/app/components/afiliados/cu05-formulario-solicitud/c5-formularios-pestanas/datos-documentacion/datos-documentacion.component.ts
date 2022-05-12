import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { C6DeclaratoriaSaludComponent } from './c6-declaratoria-salud/c6-declaratoria-salud.component';

@Component({
  selector: 'app-datos-documentacion',
  templateUrl: './datos-documentacion.component.html',
  styleUrls: ['./datos-documentacion.component.css']
})
export class DatosDocumentacionComponent implements OnInit {

  //Formularios
  formularioAfiliados: FormGroup;

  //locales
  tmpEmergenciaDatosCompuestos!: FormGroup;
  zonaUrbanaActivado: any = null;

  formularioArchivos: FormGroup;
  formArchivos: FormGroup;

  constructor(
    public sharedFb: AfiliadosFormCompartidoService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {

    this.formularioAfiliados = this.sharedFb.getAfiliadosForm();

    // public string? TX_BASE64_ARCH { get; set; } //BASE64
    // public int NU_IDTIPOARCHIVO_ARCH { get; set; }

    this.formularioArchivos = this.formBuilder.group({
      identidadAnverso: this.formBuilder.group({
        NU_IDTIPOARCHIVO_ARCH: 0,
        nombreArchivo: '',
        TX_BASE64_ARCH: null
      }),
      identidadReverso: this.formBuilder.group({
        NU_IDTIPOARCHIVO_ARCH: 1,
        nombreArchivo: '',
        TX_BASE64_ARCH: null
      }),
      registroCivil: this.formBuilder.group({
        NU_IDTIPOARCHIVO_ARCH: 2,
        nombreArchivo: '',
        TX_BASE64_ARCH: null
      }),
    })

    this.formArchivos = this.formBuilder.group({
      archivos: this.formBuilder.array([])
    })

    this.crearArchivos();
  }


  get getArchivos(): FormArray{
    return this.formArchivos.get('archivos') as FormArray
  }

  getFormGroup(contrl: AbstractControl): FormGroup{
    // console.log(contrl)
    return contrl as FormGroup
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
  }

  ngOnInit(): void {}

  //
  //identidadAdverso

  test: archivoCargado = {
    ImageBaseData: '',
    nombreArchivo: ''
  }

  //fromGroup: string,
  cargarArchivo(files: any,  idArchivo:number) {
    this.test = {
      ImageBaseData: '',
      nombreArchivo: ''
    }

    // this.beneficiarioLocal.patchValue({
    //   "TX_DIRECCION_AFIL": direccionCompuesta
    // });

    //this.beneficiarioLocal.get('NU_TELEFONO_AFIL')?.setValue(parseInt(numeroConcatenado));

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

    // this.formularioArchivos.get(fromGroup+'.nombreArchivo')?.setValue(fileList[0].name)
    // this.formularioArchivos.get(fromGroup+'.TX_BASE64_ARCH')?.setValue(tempData)

    //this.getArchivos.patchValue([])

    this.getArchivos.controls.forEach((element, index) => {

      let idEl = ((element) as FormGroup).get('NU_IDTIPOARCHIVO_ARCH')?.value
      if(idEl == idArchivo) {

        console.log(element.value)
        element.get('TX_NOMBREARCHIVO')?.setValue(fileList[0].name)
        element.get('TX_BASE64_ARCH')?.setValue(tempData.ImageBaseData)
        console.log(element.value)
      }
      //console.log()
    });


    // (this.formBuilder.group({
    //   TX_NOMBREARCHIVO: [null],
    //   TX_BASE64_ARCH: [null],
    //   TX_TIPOARCHIVO: ['DOCUMENTO DE IDENTIDAD REVERSO'],
    //   NU_IDTIPOARCHIVO_ARCH: [1],
    // }))
  }




  testBtn() {
    console.log(this.test)
    console.log(this.formularioArchivos.value)
  }

}


export interface archivoCargado {
  ImageBaseData: ArrayBuffer | any;
  nombreArchivo: string;
}
