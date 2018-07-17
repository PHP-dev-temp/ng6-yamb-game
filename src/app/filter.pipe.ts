import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterColumn: string, filterRows: string): any {
    let output = []; let test = 0;
    if ( value === null || filterColumn === '' || filterRows === '' ) {
      return value;
    }
    if ( value.length === 0 || filterColumn === '' || filterRows === '' ) {
      return value;
    }
    for ( const item of value) {
        if (item.fieldColumn === filterColumn) {
          if (filterRows === 'top') {
            if (['1', '2', '3', '4', '5', '6', 'sum1'].indexOf(item.fieldRow) !== -1){
              output.push(item);
            }
          } else if (filterRows === 'bottom') {
            if (['S', 'F', 'C', 'Y', 'sum3'].indexOf(item.fieldRow) !== -1){
              output.push(item);
            }
          } else if (filterRows === 'middle') {
            if (['min', 'max', 'sum2'].indexOf(item.fieldRow) !== -1){
              output.push(item);
            }
          }
        }
    }
    return output;
  }

}
