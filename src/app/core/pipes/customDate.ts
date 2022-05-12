import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe extends
            DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // console.log('custom Date')
    // console.log('value')
    // console.log(value)
    const momentDate = moment(new Date(value));
    let date = new Date()
    date.setDate(momentDate.toDate().getDate())
    date.setMonth(momentDate.toDate().getMonth())
    date.setFullYear(momentDate.toDate().getFullYear())
    // console.log(date)

    //return super.transform(value, "dd/MM/yyyy");
    return new DatePipe('es').transform(date, "dd/MM/yyyy");
  }
}
