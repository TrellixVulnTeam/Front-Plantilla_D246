import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ejemplo-dialog',
  templateUrl: './ejemplo-dialog.component.html',
  styleUrls: ['./ejemplo-dialog.component.css']
})
export class EjemploDialogComponent implements OnInit {

  datos: string;
  constructor(@Inject(MAT_DIALOG_DATA) public datosRecibidos: any) {
    this.datos = this.datosRecibidos;
  }

  ngOnInit(): void {
  }

}
