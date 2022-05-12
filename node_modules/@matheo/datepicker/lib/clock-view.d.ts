import { AfterContentInit, AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { DateAdapter, MatDateFormats } from '@matheo/datepicker/core';
import { MatCalendarCellClassFunction, MatCalendarUserEvent } from './calendar-body';
import { DateFilterFn } from './datepicker-input-base';
import * as i0 from "@angular/core";
export declare const CLOCK_RADIUS = 50;
export declare const CLOCK_INNER_RADIUS = 27.5;
export declare const CLOCK_OUTER_RADIUS = 41.25;
export declare const CLOCK_TICK_RADIUS = 7.0833;
export declare type ClockView = 'hour' | 'minute';
/**
 * A clock that is used as part of the datepicker.
 * @docs-private
 */
export declare class MatClockView<D> implements AfterViewInit, AfterContentInit {
    private _changeDetectorRef;
    private _element;
    _dateAdapter: DateAdapter<D>;
    private _dateFormats;
    /**
     * The time to display in this clock view. (the rest is ignored)
     */
    get activeDate(): D;
    set activeDate(value: D);
    private _activeDate;
    get selected(): D | null;
    set selected(value: D | null);
    private _selected;
    /** The minimum selectable date. */
    get minDate(): D | null;
    set minDate(value: D | null);
    private _minDate;
    /** The maximum selectable date. */
    get maxDate(): D | null;
    set maxDate(value: D | null);
    private _maxDate;
    dateFilter: DateFilterFn<D>;
    /** Function that can be used to add custom CSS classes to dates. */
    dateClass: MatCalendarCellClassFunction<D>;
    clockStep: number;
    twelveHour: Boolean;
    currentView: ClockView;
    currentViewChange: EventEmitter<ClockView>;
    /** Emits when a new date is selected. */
    readonly selectedChange: EventEmitter<D | null>;
    /** Emits when any date is selected. */
    readonly _userSelection: EventEmitter<MatCalendarUserEvent<D>>;
    updateSize(): void;
    _hours: any[];
    _minutes: any[];
    _draggingMouse: boolean;
    _selectedHour: number | null;
    _selectedMinute: number | null;
    _anteMeridian: boolean;
    _size: number;
    private mouseMoveListener;
    private mouseUpListener;
    get inHourView(): boolean;
    get _hand(): any;
    constructor(_changeDetectorRef: ChangeDetectorRef, _element: ElementRef, _dateAdapter: DateAdapter<D>, _dateFormats: MatDateFormats);
    ngAfterViewInit(): void;
    ngAfterContentInit(): void;
    _handleMousedown(event: any): void;
    _handleMousemove(event: any): void;
    _handleMouseup(): void;
    _init(): void;
    private setTime;
    _focusActiveCell(): void;
    /**
     * @param obj The object to check.
     * @returns The given object if it is both a date instance and valid, otherwise null.
     */
    private _getValidDateOrNull;
    static ɵfac: i0.ɵɵFactoryDeclaration<MatClockView<any>, [null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MatClockView<any>, "mat-clock-view", ["matClockView"], { "activeDate": "activeDate"; "selected": "selected"; "minDate": "minDate"; "maxDate": "maxDate"; "dateFilter": "dateFilter"; "dateClass": "dateClass"; "clockStep": "clockStep"; "twelveHour": "twelveHour"; "currentView": "currentView"; }, { "currentViewChange": "currentViewChange"; "selectedChange": "selectedChange"; "_userSelection": "_userSelection"; }, never, never>;
}
