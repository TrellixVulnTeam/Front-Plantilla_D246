import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AfiliadosFormCompartidoService } from 'src/app/services/afiliados-form-compartido.service';
import { BeneficiariosComponent } from '../c5-formularios-dialog/beneficiarios/beneficiarios.component';

@Component({
  selector: 'app-c5-acciones',
  templateUrl: './c5-acciones.component.html',
  styleUrls: ['./c5-acciones.component.css']
})
export class C5AccionesComponent implements OnInit {

  private dialogConfig = new MatDialogConfig();
  mostrarTest = false;
  constructor(private dialog: MatDialog,
    private sharedAliados: AfiliadosFormCompartidoService) {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "100%";
  }

  ngOnInit(): void {
  }

  enviar(){
    this.sharedAliados.enviarForm()
  }

  @HostListener('window:keydown.Alt.m', ['$event'])
  onKeyDownAltM(e: Event) {
    e.preventDefault();
    this.mostrarTest = !this.mostrarTest;
    // console.log(e);
    // console.log('ALT + M');
    //this.formEjemplo();
  }

  test(){
    console.log(this.sharedAliados.getAfiliadosForm().valid)
    console.log(this.sharedAliados.getAfiliadosForm().value)
  }

  guardar(){
    //this.sharedAliados.guardarDatos();
    this.sharedAliados.enviarForm()
  }

  menuBeneficiario(){
    const newDialog = this.dialog.open(BeneficiariosComponent, {
      hasBackdrop: true,
      autoFocus: true,
      disableClose: true,
      panelClass: 'icon-outside',
      width: '80%'
    })

    newDialog.afterClosed().subscribe(result =>{
      console.log('closed')
      console.log(result)
    })
  }

  menuEmpleador(){
    // const dialogBeneficiario = this.dialog.open(EmpleadorComponent, this.dialogConfig)

    // dialogBeneficiario.afterClosed().subscribe(result =>{
    //   console.log('closed')
    //   console.log(result)
    // })
  }
}
