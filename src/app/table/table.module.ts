import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { FieldComponent } from './field/field.component';
import {FilterPipe} from '../filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableComponent,
    FieldComponent,
    FilterPipe
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
