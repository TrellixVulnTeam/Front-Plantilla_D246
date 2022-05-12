import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

//Importo clases de Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';


import { getSpanishPaginatorIntl } from '../intl/paginador-esp.intl';

//Modificaciones por defecto
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

const dateFormat: MatDateFormats = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


//Sin implementar
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,

    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatListModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSortModule,
    MatExpansionModule,

    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    //Importo la traducción
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },

    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: dateFormat },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        autoFocus: true,
        disableClose: true,
        panelClass: 'icon-outside'
      }
    },
  ]
})
export class MaterialModule { }
