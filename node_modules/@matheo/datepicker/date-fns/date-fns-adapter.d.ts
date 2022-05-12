/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { Locale } from 'date-fns';
import * as i0 from "@angular/core";
/** Configurable options for {@see DateFnsAdapter}. */
export interface MatDateFnsAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * {@default false}
     */
    useUtc: boolean;
}
/** InjectionToken for DateFnsAdapter to configure options. */
export declare const MAT_DATE_FNS_ADAPTER_OPTIONS: InjectionToken<MatDateFnsAdapterOptions>;
/** @docs-private */
export declare function MAT_DATE_FNS_ADAPTER_OPTIONS_FACTORY(): MatDateFnsAdapterOptions;
/** Adapts date-fns Dates for use with Angular Material. */
export declare class DateFnsAdapter extends DateAdapter<Date> {
    private locales;
    private options?;
    private _dateFnsLocale;
    constructor(dateLocale: string, locales: Locale[], options?: MatDateFnsAdapterOptions);
    setLocale(locale: string | Locale): void;
    private getLocale;
    getYear(date: Date): number;
    getMonth(date: Date): number;
    getDate(date: Date): number;
    getHours(date: Date): number;
    setHours(date: Date, hours: number): Date;
    getMinutes(date: Date): number;
    setMinutes(date: Date, minutes: number): Date;
    getSeconds(date: Date): number;
    setSeconds(date: Date, seconds: number, ms?: number): Date;
    getMilliseconds(date: Date): number;
    getDayOfWeek(date: Date): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getHourNames(): string[];
    getMinuteNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: Date): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: Date): number;
    clone(date: Date): Date;
    createDate(year: number, month: number, date: number, hours?: number, minutes?: number, seconds?: number, ms?: number): Date;
    today(): Date;
    parse(value: any, parseFormat: any): Date | null;
    format(date: Date, displayFormat: string): string;
    addCalendarYears(date: Date, years: number): Date;
    addCalendarMonths(date: Date, months: number): Date;
    addCalendarDays(date: Date, days: number): Date;
    addCalendarHours(date: Date, hours: number): Date;
    addCalendarMinutes(date: Date, minutes: number): Date;
    addCalendarSeconds(date: Date, seconds: number, ms?: number): Date;
    toIso8601(date: Date): string;
    deserialize(value: any): Date | null;
    isDateInstance(obj: any): boolean;
    isValid(date: Date): boolean;
    invalid(): Date;
    /** Creates a date but allows the month and date to overflow. */
    private _createDateWithOverflow;
    private _createDateInternal;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFnsAdapter, [{ optional: true; }, null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DateFnsAdapter>;
}
