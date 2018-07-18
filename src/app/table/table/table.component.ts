import { Component, OnInit } from '@angular/core';
import {FieldsService} from '../../core/fields.service';
import {Field} from '../field/fieald.model';
import {CalculationsService} from '../../core/calculations.service';
import {DiceService} from '../../core/dice.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  infoTop = ['Y', '&#x02193;', '&#x021C5;', '&#x02191;', 'A'];
  infoLeft = ['1', '2', '3', '4', '5', '6', '&#8721;', 'max', 'min', '&#8721;', 'S', 'F', 'C', 'Y', '&#8721;'];
  fields: Field[];
  sumFields: Field[];
  reserved: Field = null;
  total = 0;

  constructor(private fieldsService: FieldsService,
              private calculationsService: CalculationsService,
              private diceService: DiceService) { }

  ngOnInit() {
    this.fieldsService.init();
    this.fieldsService.getFields()
      .subscribe(
        (fields: Field[]) => { this.fields = fields;
          console.log(this.fields); }
      );
    this.fieldsService.getSumFields()
      .subscribe(
        (fields: Field[]) => { this.sumFields = fields;
          console.log(this.sumFields); }
      );
  }

  onFieldClick(field) {
    if (this.diceService.diceTurn === 0 || !this.fieldsService.enableField) {
      return;
    }
    if (this.reserved !== null) {
      this.solveAnnounce(field);
      return;
    }
    if (field.fieldEmpty
      && field.fieldColumn === 'announce'
      && this.diceService.noKeeped) {
      this.solveAnnounce(field);
      return;
    }
    if (!field.fieldEmpty
      || !field.fieldEnable) {
      return;
    }
    this.setNewValue(field);
  }

  solveAnnounce(field) {
    if (this.reserved !== null) {
      const id = this.reserved.fieldId;
      this.setNewValue(this.reserved);
      this.reserved = null;
      this.fields.filter((f) => f.fieldId === id)[0].fieldReserved = false;
    } else {
      this.reserved = field;
      const id = this.reserved.fieldId;
      if (this.diceService.diceTurn === 3) {
        this.setNewValue(this.reserved);
        this.reserved = null;
      }
      this.fields.filter((f) => f.fieldId === id)[0].fieldReserved = true;
    }
  }

  setNewValue(field) {
    const newValue = this.calculationsService.getValue(field, this.diceService.dices, this.diceService.diceTurn);
    if (newValue === null) {
      return;
    }
    field.fieldValue = newValue;
    field.fieldEmpty = false;
    this.diceService.diceTurn = -1;
    if (field.fieldColumn === 'down') {
      const id = field.fieldId + 1;
      this.fields.filter((f) => f.fieldId === id)[0].fieldEnable = true;
    }
    if (field.fieldColumn === 'up') {
      const id = field.fieldId - 1;
      this.fields.filter((f) => f.fieldId === id)[0].fieldEnable = true;
    }
    this.fieldsService.enableField = false;
    this.calculateSum();
  }

  calculateSum () {
    console.log(this.fields);
    let sum: number;
    for (let column = 0; column < 4; column++) {
      sum = 0;
      for (let i = 0; i < 6; i++) {
        sum += this.fields[i + column * 12].fieldValue;
      }
      if (sum > 59) {
        sum += 30;
      }
      this.sumFields[column * 3].fieldValue = sum;

      this.sumFields[1 + column * 3].fieldValue =
        this.fields[column * 12].fieldValue *
        (this.fields[6 + column * 12].fieldValue - this.fields[7 + column * 12].fieldValue);

      sum = 0;
      for (let i = 0; i < 4; i++) {
        sum += this.fields[8 + i + column * 12].fieldValue;
      }
      this.sumFields[2 + column * 3].fieldValue = sum;
    }
    this.total = this.sumFields.reduce((sum, f) => sum += f.fieldValue, 0);
  }

}
