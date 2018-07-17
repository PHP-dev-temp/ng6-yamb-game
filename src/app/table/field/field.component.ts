import {Component, Input, OnInit} from '@angular/core';
import {Field} from './fieald.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  @Input() field: Field;
  bgColor: string = 'white';

  constructor() { }

  ngOnInit() {
    if (this.field.fieldRow.includes('sum')){
      this.bgColor = 'lightgray';
    }
  }

}
