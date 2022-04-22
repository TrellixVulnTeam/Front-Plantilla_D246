import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import { getSpanishPaginatorIntl } from '../intl/paginador-esp.intl';

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

    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    //Importo la traducción
    { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
})
export class MaterialModule { }
