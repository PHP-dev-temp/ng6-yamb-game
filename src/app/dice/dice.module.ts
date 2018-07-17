import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceTableComponent } from './dice-table/dice-table.component';
import { DiceComponent } from './dice/dice.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DiceTableComponent,
    DiceComponent
  ],
  exports: [
    DiceTableComponent
  ]
})
export class DiceModule { }
