import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos internos importados
import {HttpClientModule} from '@angular/common/http';
//import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Animaciones (Angular / Material)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Listas de módulos por librería - en carpeta /app/modules
import { MaterialModule } from './modules/material.module'
import { FormulariosModule } from './modules/formularios.module';
import { FullcalendarModule } from './modules/fullcalendar.module';

  // => Librerias 3rd party
import { DatepickerModule } from './modules/datepicker.module';

// Componentes internos
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AfiliadosComponent } from './components/afiliados/afiliados.component';
import { Cu03SolicitudesAfiliacionesComponent } from './components/afiliados/cu03-solicitudes-afiliaciones/cu03-solicitudes-afiliaciones.component';

//Traducciones
import { CustomDatePipe } from './core/pipes/customDate';

import localeEs from '@angular/common/locales/es-CO'
import { registerLocaleData } from '@angular/common';
import { Cu05FormularioSolicitudComponent } from './components/afiliados/cu05-formulario-solicitud/cu05-formulario-solicitud.component';
import { C5AccionesComponent } from './components/afiliados/cu05-formulario-solicitud/c5-acciones/c5-acciones.component';
import { C5DatosPrincipalesComponent } from './components/afiliados/cu05-formulario-solicitud/c5-datos-principales/c5-datos-principales.component';
import { C5FormulariosDialogComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-dialog/c5-formularios-dialog.component';
import { C5FormulariosPestanasComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/c5-formularios-pestanas.component';
import { FormPestanasNavbarComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/form-pestanas-navbar/form-pestanas-navbar.component';
import { DatosEmergenciaComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/datos-emergencia/datos-emergencia.component';
import { DatosDocumentacionComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/datos-documentacion/datos-documentacion.component';
import { DatosContactoComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/datos-contacto/datos-contacto.component';
import { DatosComplementariosComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/datos-complementarios/datos-complementarios.component';
import { C6DeclaratoriaSaludComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/datos-documentacion/c6-declaratoria-salud/c6-declaratoria-salud.component';
import { C6DeclaratoriaSaludQuemadoComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-pestanas/datos-documentacion/c6-declaratoria-salud-quemado/c6-declaratoria-salud-quemado.component';
import { BeneficiariosComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-dialog/beneficiarios/beneficiarios.component';
import { EmpleadorComponent } from './components/afiliados/cu05-formulario-solicitud/c5-formularios-dialog/empleador/empleador.component';
import { C4ConsentimientoDatosComponent } from './components/afiliados/dialogs/c4-consentimiento-datos/c4-consentimiento-datos.component';
import { C7DeclaracionJuramentoComponent } from './components/afiliados/dialogs/c7-declaracion-juramento/c7-declaracion-juramento.component';
import { C8AutorizacionesComponent } from './components/afiliados/dialogs/c8-autorizaciones/c8-autorizaciones.component';
import { FormBeneficiariosComponent } from './components/afiliados/dialogs/form-beneficiarios/form-beneficiarios.component';
registerLocaleData(localeEs, 'es')

@NgModule({
  declarations: [
    AppComponent,
    CustomDatePipe,


    SidebarComponent,

    AfiliadosComponent,
    Cu03SolicitudesAfiliacionesComponent,
    Cu05FormularioSolicitudComponent,
    C5AccionesComponent,
    C5DatosPrincipalesComponent,
    C5FormulariosDialogComponent,
    C5FormulariosPestanasComponent,
    FormPestanasNavbarComponent,
    DatosEmergenciaComponent,
    DatosDocumentacionComponent,
    DatosContactoComponent,
    DatosComplementariosComponent,
    C6DeclaratoriaSaludComponent,
    C6DeclaratoriaSaludQuemadoComponent,
    BeneficiariosComponent,
    EmpleadorComponent,
    C4ConsentimientoDatosComponent,
    C7DeclaracionJuramentoComponent,
    C8AutorizacionesComponent,
    FormBeneficiariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //Formularios y efectos
    BrowserAnimationsModule,
    FormulariosModule,

    //Fullcalendar con plugins
    FullcalendarModule,

    //Date(time) picker
    DatepickerModule,

    //Angular Material
    MaterialModule,

    //Internos
    HttpClientModule,
    ScrollingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
