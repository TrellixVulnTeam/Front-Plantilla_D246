import { Component, OnInit } from '@angular/core';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';

//Traduccion español
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-fullcalendar-example',
  templateUrl: './fullcalendar-example.component.html',
  styleUrls: ['./fullcalendar-example.component.css']
})
export class FullcalendarExampleComponent implements OnInit {

  constructor() { }

  //permite llamar parte del calendario

  //Opciones
  calendarOptions: CalendarOptions = {

    //Permite agregar botones / acciones personalizadas
    customButtons:{
      botonPersonalizado: {
        text: 'Custom button',
        click: function(){
          alert('Accion de boton propio')
        }
      }
    },

    //Configuro el header
    headerToolbar: {
      //Botones (en orden izq, centro, derecha) que se muestran en el header
      //El orden de cada uno IMPORTA, la coma (,) indica que van juntos
      left: 'prev,next today botonPersonalizado',
      center: 'title',
      //Modos de vistas (dia, semana, mes)
      right: 'timeGridDay,timeGridWeek,dayGridMonth',
    },

    //Vista por defecto (mes)
    initialView: 'dayGridMonth',

    //eventos de inicio (se puede cargar luego)
    initialEvents: INITIAL_EVENTS, //constante al final del doc

    //Internacionalización  del calendario (esLocale = español)
    locale: esLocale,

    // Eventos en el calendario (los agrego abajo)
    events: [],

    //Propiedades e interacciones
    weekends: true,
    selectable: true,
    dayMaxEvents: true,
    // editable: true, // permite arrastrar (drag)
    // selectMirror: true, //dibuja un evento placeholder mientras se arrastra

    // Acciones al dar click en un 'evento'
    select: this.handleDateSelect.bind(this),     //crear nuevo evento
    eventClick: this.handleEventClick.bind(this), //eliminar evento
    eventsSet: this.handleEvents.bind(this),      //

    // asigno clase al evento, útil si tiene estilos específicos
    eventClassNames: 'event-container',

    //propiedad css
    eventDisplay: 'block',

    //Declaro los valores internos de las vistas, NO es obligatorio (puede quedar default), solo si se va a modificar algo específico
    views: {
      dayGridMonth: {
        //Formato en el que muestro el titulo,
        titleFormat: { year: 'numeric', month: 'long' },
        //leer https://fullcalendar.io/docs/titleFormat
      }
    },

    //Muestra horario del evento (si aplica)
    displayEventTime: true

    //Otra forma de llamar eventos, lease: https://fullcalendar.io/docs/eventAdd
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  ngOnInit(): void {
  }



  // Calendario eventos

  //Metodo: Mostrar u ocultar fin de semana
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  //Método para crear nuevo evento
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  //metodo delete evento
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  //Asigno eventos (en masa) al calendario
  handleEvents(events: EventApi[]) {
      this.currentEvents = events;
  }

  //Lista de eventos, inicia vacía
  currentEvents: EventApi[] = [];

}

//  Funciones externas - fuera de fullcalendar-example.ts ***************

const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');
let eventGuid = 0

function createEventId() {
  return String(eventGuid++);
}


//Datos de eventos principales:
  // id: id de evento
  // title: titulo de evento
  // start: Fecha inicio
  // end: Fecha fin
  // allDay: booleano: todo el dia?
  // borderColor: bordercolor (no necesario)
  // extendedProps: Cualquier otro valor extra, pueden ser objetos enteros

const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00'
  },
  {
    id: '77603',
    title: "TODOS",
    start: "2022-04-26T08:00:00",
    end: "2022-04-26T10:00:00",
    extendedProps: {
      nombreConsultorio: "CASE CONSULTORIO 104-(UNAL SED -(AREA SALUD-AREA SALUD-SEDE BOGOTA)",
      numTurno: 77603,
    },
    allDay: false
  }
];
