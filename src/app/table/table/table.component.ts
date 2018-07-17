import { Component, OnInit } from '@angular/core';
import {FieldsService} from '../../core/fields.service';
import {Field} from '../field/fieald.model';

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

  constructor(private fieldsService: FieldsService) { }

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

}
