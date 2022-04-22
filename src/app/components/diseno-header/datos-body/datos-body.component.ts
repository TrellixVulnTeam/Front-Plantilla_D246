import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


import { ChangeDetectionStrategy} from '@angular/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-datos-body',
  templateUrl: './datos-body.component.html',
  styleUrls: ['./datos-body.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatosBodyComponent<D = Date>  implements OnInit {

  form!: FormGroup;

  displayedColumns: string[] = ['PYP', 'FECHA', 'CONVENIO', 'PACIENTE', 'DOCUMENTO', 'SERVICIO', 'CANTIDAD'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private adapter: DateAdapter<D>) {
    this.dataSource = new MatTableDataSource(this.datos);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: new Date(),
      datetime: new Date(),
      time: new Date(),
      month: new Date(),
      year: new Date(),
      touchUI: null,
      start: null,
      filter: null,
      rangeStart: null,
      rangeEnd: null,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

datos: UserData[] = [
  { pyp:'No', fecha: '21/4/2022 - 10:36:14', convenio:'02', paciente:'prueba triage triage prueba', documento:0, servicio:'Antiestreptolisina "o" cuantitativa por nefelometria', cantidad: 1 },
  { pyp:'No', fecha: '10/9/2021 - 11:47:08', convenio:'02', paciente:'prueba triage triage prueba', documento:0, servicio:'Hepatitis b, anticuerpos central totales', cantidad: 1 },
  { pyp:'No', fecha: '6/7/2021 - 12:05:18', convenio:'OSE87', paciente:'prueba triage triage prueba', documento:0, servicio:'	Resonancia nuclear magnetica de pelvis', cantidad: 1 },
]


}


export interface UserData {
  pyp: string;
  fecha: string;
  convenio: string;
  paciente: string;
  documento: number;
  servicio: string;
  cantidad: number;
}
