/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
import { DateAdapter } from '@matheo/datepicker/core';
import { DateTime } from 'luxon';
import * as i0 from "@angular/core";
/** Configurable options for {@see LuxonDateAdapter}. */
export interface MatLuxonDateAdapterOptions {
    /**
     * Turns the use of utc dates on or off.
     * Changing this will change how Angular Material components like DatePicker output dates.
     * {@default false}
     */
    useUtc: boolean;
    /**
     * Luxon does not have support for retrieving the first day of the week.
     * This allows supplying a custom function to override it.
     * Remember that you need to return 0 = Sunday, 1 = Monday
     */
    firstDayOfWeek?: (locale: string) => number;
}
/** InjectionToken for LuxonDateAdapter to configure options. */
export declare const MAT_LUXON_DATE_ADAPTER_OPTIONS: InjectionToken<MatLuxonDateAdapterOptions>;
/** @docs-private */
export declare function MAT_LUXON_DATE_ADAPTER_OPTIONS_FACTORY(): MatLuxonDateAdapterOptions;
/** Adapts Luxon Dates for use with Angular Material. */
export declare class LuxonDateAdapter extends DateAdapter<DateTime> {
    private _useUTC;
    private _getFirstDayOfWeek;
    constructor(dateLocale: string, options?: MatLuxonDateAdapterOptions);
    setLocale(locale: string): void;
    getYear(date: DateTime): number;
    getMonth(date: DateTime): number;
    getDate(date: DateTime): number;
    getHours(date: DateTime): number;
    setHours(date: DateTime, hour: number): DateTime;
    getMinutes(date: DateTime): number;
    setMinutes(date: DateTime, minute: number): DateTime;
    getSeconds(date: DateTime): number;
    setSeconds(date: DateTime, second: number, ms?: number): DateTime;
    getMilliseconds(date: DateTime): number;
    getDayOfWeek(date: DateTime): number;
    getMonthNames(style: 'long' | 'short' | 'narrow'): string[];
    getDateNames(): string[];
    getHourNames(): string[];
    getMinuteNames(): string[];
    getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];
    getYearName(date: DateTime): string;
    getFirstDayOfWeek(): number;
    getNumDaysInMonth(date: DateTime): number;
    clone(date: DateTime): DateTime;
    createDate(year: number, month: number, date: number, hours?: number, minutes?: number, seconds?: number, ms?: number): DateTime;
    today(): DateTime;
    parse(value: any, parseFormat: string | string[]): DateTime | null;
    format(date: DateTime, displayFormat: string): string;
    addCalendarYears(date: DateTime, years: number): DateTime;
    addCalendarMonths(date: DateTime, months: number): DateTime;
    addCalendarDays(date: DateTime, days: number): DateTime;
    addCalendarHours(date: DateTime, hours: number): DateTime;
    addCalendarMinutes(date: DateTime, minutes: number): DateTime;
    addCalendarSeconds(date: DateTime, seconds: number, ms?: number): DateTime;
    toIso8601(date: DateTime): string;
    /**
     * Returns the given value if given a valid Luxon or null. Deserializes valid ISO 8601 strings
     * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid DateTime and empty
     * string into null. Returns an invalid date for all other values.
     */
    deserialize(value: any): DateTime | null;
    isDateInstance(obj: any): boolean;
    isValid(date: DateTime): boolean;
    invalid(): DateTime;
    /** Gets the options that should be used when constructing a new `DateTime` object. */
    private _getOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<LuxonDateAdapter, [{ optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LuxonDateAdapter>;
}
