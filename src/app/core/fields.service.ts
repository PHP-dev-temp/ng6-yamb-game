import { Injectable } from '@angular/core';
import {Field} from '../table/field/fieald.model';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  fields: Field[] = [];
  sumFields: Field[] = [];
  fieldRow = ['1', '2', '3', '4', '5', '6', 'max', 'min', 'S', 'F', 'C', 'Y'];
  enableField = true;

  constructor() { }

  init() {
    let i = 1;
    for (const f of this.fieldRow) {
      this.fields.push(new Field(i, f, 'down', 0, true, i === 1));
      i++;
    }
    for (const f of this.fieldRow) {
      this.fields.push(new Field(i, f, 'free', 0, true, true));
      i++;
    }
    for (const f of this.fieldRow) {
      this.fields.push(new Field(i, f, 'up', 0, true, i === 36));
      i++;
    }
    for (const f of this.fieldRow) {
      this.fields.push(new Field(i, f, 'announce', 0, true, false));
      i++;
    }
    this.sumFields.push(new Field(i++, 'sum1', 'down', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum2', 'down', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum3', 'down', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum1', 'free', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum2', 'free', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum3', 'free', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum1', 'up', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum2', 'up', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum3', 'up', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum1', 'announce', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum2', 'announce', 0, false, false));
    this.sumFields.push(new Field(i++, 'sum3', 'announce', 0, false, false));
}

  getFields() {
    return Observable.create(
      (observer) => observer.next(this.fields)
    );
  }

  getSumFields(){
    return Observable.create(
      (observer) => observer.next(this.sumFields)
    );
  }

}
