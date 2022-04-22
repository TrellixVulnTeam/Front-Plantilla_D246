import { NgModule } from '@angular/core';

//Fullcalendar

// El módulo debe ir antes de los plugins!
import { FullCalendarModule } from '@fullcalendar/angular';

// se importan los plugins instalados
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// registro los plugins de FullCalendar
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  exports: [
    FullCalendarModule,
  ]
})
export class FullcalendarModule { }
