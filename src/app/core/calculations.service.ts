import { Injectable } from '@angular/core';
import {Dice} from '../dice/dice.model';
import {Field} from '../table/field/fieald.model';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  dice: Dice[];
  diceNum = 0;

  constructor() { }

  getValue(field: Field, dice: Dice[], diceNum) {
    this.dice = dice;
    this.diceNum = diceNum;
    let newValue = 0;
    switch (field.fieldRow) {
      case '1':
        newValue = this.sumCalculate(1);
        break;
      case '2':
        newValue = this.sumCalculate(2);
        break;
      case '3':
        newValue = this.sumCalculate(3);
        break;
      case '4':
        newValue = this.sumCalculate(4);
        break;
      case '5':
        newValue = this.sumCalculate(5);
        break;
      case '6':
        newValue = this.sumCalculate(6);
        break;
      case 'max':
        newValue = this.maxminCalculate();
        break;
      case 'min':
        newValue = this.maxminCalculate();
        break;
      case 'S':
        newValue = this.sCalculate();
        break;
      case 'F':
        newValue = this.fpyCalculate('full');
        break;
      case 'C':
        newValue = this.fpyCalculate('poker');
        break;
      case 'Y':
        newValue = this.fpyCalculate('yumb');
        break;
      default:
        newValue = null;
        break;
    }
    return newValue;
  }


  sumCalculate(num: number) {
    return this.dice.reduce((sum, d) => sum += d.diceValue === num ? num : 0, 0);
  }

  maxminCalculate() {
    return this.dice.reduce((sum, d) => sum += d.diceValue, 0);
  }

  fpyCalculate(caseType) {
    let num1 = 0;
    let num1Count = 0;
    let num2 = 0;
    let num2Count = 0;
    this.dice.forEach((d) => {
      if (num1 === 0) {
        num1 = d.diceValue;
        num1Count += 1;
      } else {
        if (num1 !== d.diceValue) {
          if (num2 === 0) {
            num2 = d.diceValue;
            num2Count += 1;
          } else {
            if (num2 === d.diceValue) {
              num2Count += 1;
            }
          }
        } else {
          num1Count += 1;
        }
      }
    });
    if (caseType === 'full') {
      if ((num1Count === 3 && num2Count === 2) || (num1Count === 2 && num2Count === 3)) {
        return this.maxminCalculate() + 30;
      } else {
        return 0;
      }
    }
    if (caseType === 'poker') {
      if (num1Count > 3) {
        return 40 + (num1 * 4);
      } else if (num2Count > 3) {
        return 40 + (num2 * 4);
      } else {
        return 0;
      }
    }
    if (caseType === 'yumb') {
      if (num1Count === 5) {
        return 50 + (num1 * 5);
      } else {
        return 0;
      }
    }
    return 0;
  }

  sCalculate() {
    let res = 1;
    let prev = 0;
    const tempDice = this.dice.slice();
    tempDice.sort((a, b) => a.diceValue - b.diceValue);
    tempDice.forEach((d, i) => {
      if (i === 0) {
        prev = d.diceValue;
      } else {
        res *= (prev - d.diceValue);
        prev = d.diceValue;
      }
    });
    if (res === 0) {
      return 0;
    }
    return 76 - this.diceNum * 10;
  }

}
