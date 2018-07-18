export class Field{
  fieldId: number;
  fieldRow: string;
  fieldColumn: string;
  fieldValue: number;
  fieldEmpty: boolean;
  fieldEnable: boolean;
  fieldReserved: boolean;

  constructor (
    fieldId: number,
    fieldRow: string,
    fieldColumn: string,
    fieldValue: number,
    fieldEmpty: boolean,
    fieldEnable: boolean,
  ) {
    this.fieldId = fieldId;
    this.fieldRow = fieldRow;
    this.fieldColumn = fieldColumn;
    this.fieldValue = fieldValue;
    this.fieldEmpty = fieldEmpty;
    this.fieldEnable = fieldEnable;
    this.fieldReserved = false;
  }
}
