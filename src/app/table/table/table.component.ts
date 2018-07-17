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
    if (!field.fieldEmpty || this.diceService.diceTurn === 0 || !field.fieldEnable){
      return;
    }
    if(!this.fieldsService.enableField){
      return;
    }
    const newValue = this.calculationsService.getValue(field, this.diceService.dices, this.diceService.diceTurn);
    if (newValue === null) {
      return;
    }
    field.fieldValue = newValue;
    field.fieldEmpty = false;
    this.diceService.diceTurn = -1;
    if(field.fieldColumn === 'down'){
      const id = field.fieldId + 1;
      this.fields.filter((f) => f.fieldId === id)[0].fieldEnable = true;
    }
    if(field.fieldColumn === 'up'){
      const id = field.fieldId - 1;
      this.fields.filter((f) => f.fieldId === id)[0].fieldEnable = true;
    }
    this.fieldsService.enableField = false;
  }

}
