import { NgModule } from '@angular/core';

//Esta librería permite usar un datetime picker, con rangos de tiempo y/o hora
//Datetime picker: http://matheo.co/demos/datepicker

import { MatDatepickerModule } from '@matheo/datepicker';
import { MatNativeDateModule } from '@matheo/datepicker/core';


@NgModule({
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DatepickerModule { }
