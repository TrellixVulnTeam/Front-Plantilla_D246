import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EjemploDialogComponent } from './ejemplo-dialog/ejemplo-dialog.component';

@Component({
  selector: 'app-prueba-inicial',
  templateUrl: './prueba-inicial.component.html',
  styleUrls: ['./prueba-inicial.component.css']
})
export class PruebaInicialComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'fruit'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  especialidadesLista  = data;
  dialogOptions = new MatDialogConfig();

  //Declaro objetos de tipo: -->
  constructor(
    private dialog: MatDialog) {

      // crear 100 users random para llenar la tabla
      const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

      // Asignar los datos al table
      this.dataSource = new MatTableDataSource(users);


      //Opciones para el dialog, se pasan como parametro
      this.dialogOptions = {
        width: '500px',
        //height: '400px',
        //Solo se puede cerrar si el evento del botón lo permite
        disableClose: false,
        autoFocus: true,
        //Clase que permite tener el boton por fuera del dialog
        panelClass: 'icon-outside',
      }
   }

  ngOnInit(): void {
  }

  //Asigna valores DESPUES de iniciar el projecto (ciclo de vida)
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  //Filtro de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    //Agrego datos al objeto de opciones
    this.dialogOptions.data = 'Hola mundo';

    //Guardo el dialogo en una variable para poder recibir un valor al cerrar, no es necesario
    //Argumentos: Componente y opciones si las hay
    const newDialog = this.dialog.open(EjemploDialogComponent, this.dialogOptions);

    newDialog.afterClosed().subscribe(respuesta => {
      alert('Respuesta: ' + respuesta);
    })
  }

}


  /** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}


//Modelo del objeto usado en la tabla
export interface UserData {
  id: string;
  name: string;
  fruit: string;
}


// Datos para llenar la tabla

const FRUITS: string[] = ['blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth',];


//Datos para llenar la lista
const data = [' ALERGOLOGÍA', ' ANATOMÍA PATOLÓGICA', ' ANESTESIOLOGÍA', ' ANGIOLOGÍA', ' ANTICONCEPCION', ' APERTURA DE HISTORIA CLINICA', ' ASESORIA VIH', ' ATENCION EN SALUD', ' ATENCION PRIORITARIA', ' ATENCION PSICOSOCIAL', ' AUDITORIA', ' AUXILIAR ENFERMERIA', ' CARDIOLOGÍA', ' CIRUGÍA GENERAL', ' CIRUGIA ORAL Y MAXILOFACIAL', ' CIRUGIA PLASTICA Y ESTETICA', ' CIRUGÍA VASCULAR Y ANGIOLÓGICA', ' CITOLOGIA CERVICOUTERINA', ' DERMATOLOGÍA', ' ENDOCRINOLOGIA', ' ENDODONCIA', ' ENFERMERÍA - GENERAL', ' ENFERMERIA- ASESORIA', ' FISIATRIA', ' FISIOTERAPIA', ' FONOAUDIOLOGÍA', ' GASTROENTEROLOGÍA', ' GENETICA HUMANA', ' GERIATRIA', ' GESTANTES', ' GESTION EN SALUD', ' HEMATOLOGIA', ' HEMATOLOGÍA', ' HIGIENE ORAL', ' IMAGENOLOGIA', ' INFECTOLOGÍA', ' LABORATORIO CLINICO', ' LABORATORIO DENTAL', ' MEDICINA ALTERNATIVA', ' MEDICINA APLICADA A LA PRÁCTICA ACADÉMICA', ' MEDICINA DEL DEPORTE', ' MEDICINA ESPECIALIZADA', ' MEDICINA GENERAL', ' MEDICINA INTERNA', ' NEFROLOGÍA', ' NEUMOLOGÍA', ' NEUROCIRUGÍA', ' NEUROLOGÍA', ' NUTRICIÓN', ' ODONTOGERIATRIA..', ' ODONTOLOGIA GENERAL', ' ODONTOPEDIATRIA', ' OFTALMOLOGÍA', ' ONCOLOGÍA', ' OPERATORIA DENTAL', ' OPERATORIA DENTAL Y ESTETICA', ' OPTOMETRÍA', ' ORTODONCIA', ' ORTOPEDIA Y TRAUMA', ' OTORRINOLARINGOLOGÍA', ' PATOLOGIA', ' PEDIATRÍA', ' PERIODONCIA', ' PREVENCION CONSUMO SPA', ' PROMOCIÓN Y PREVENCIÓN', ' PSICOLOGÍA', ' PSIQUIATRÍA', ' REHABILITACION ORAL', ' REUMATOLOGÍA', ' TOXICOLOGIA', ' TRABAJO SOCIAL', ' TRANSPORTE ASISTENCIAL', ' UROLOGÍA']
