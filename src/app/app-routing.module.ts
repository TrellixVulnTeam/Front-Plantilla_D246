import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cu03SolicitudesAfiliacionesComponent } from './components/afiliados/cu03-solicitudes-afiliaciones/cu03-solicitudes-afiliaciones.component';
import { Cu05FormularioSolicitudComponent } from './components/afiliados/cu05-formulario-solicitud/cu05-formulario-solicitud.component';

const routes: Routes = [

  {path: 'SolicitudesAfiliacion', component: Cu03SolicitudesAfiliacionesComponent},
  {path: 'SolicitarAfiliacion', component: Cu05FormularioSolicitudComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
