import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
import { PruebaInicialComponent } from './components/prueba-inicial/prueba-inicial.component';
import { EjemploDialogComponent } from './components/prueba-inicial/ejemplo-dialog/ejemplo-dialog.component';
import { DisenoHeaderComponent } from './components/diseno-header/diseno-header.component';
import { FullcalendarExampleComponent } from './components/fullcalendar-example/fullcalendar-example.component';
import { HeaderComponent } from './components/diseno-header/header/header.component';
import { DatosBodyComponent } from './components/diseno-header/datos-body/datos-body.component';
import { PacienteComponent } from './components/diseno-header/datos-body/paciente/paciente.component';
import { ControlCalidadComponent } from './components/diseno-header/datos-body/control-calidad/control-calidad.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PruebaInicialComponent,
    EjemploDialogComponent,
    DisenoHeaderComponent,
    FullcalendarExampleComponent,
    HeaderComponent,
    DatosBodyComponent,
    PacienteComponent,
    ControlCalidadComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
