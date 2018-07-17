import { Injectable } from '@angular/core';
import {Dice} from '../dice/dice.model';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class DiceService {
  dices: Dice[] = [];
  diceTurn = 0;
  noKeeped = true;
  enableDice: true;

  constructor() { }

  init() {
    for (let i = 1; i < 6; i++) {
      this.dices.push(new Dice(i));
    }
  }

  getDices() {
    return Observable.create(
      (observer) => observer.next(this.dices)
    );
  }

  setDices(dices) {
    this.dices = dices;
  }

  diceNotKeeped() {
    if(this.diceTurn === 3 && !this.enableDice){
      return;
    } else if (this.diceTurn === 3 && this.enableDice) {
      this.diceTurn = -1;
    }

    let isNewDice = false;
    if(this.diceTurn === -1){
      this.dices.forEach((d) => {
        d.diceValue = 1 + Math.floor(Math.random() * 5);
        d.diceKeeped = false;
      });
      this.diceTurn = 0;
      this.noKeeped = true;
      isNewDice = true;
    } else {
      this.noKeeped = true;
      this.dices.forEach((d) => {
        if(!d.diceKeeped){
          d.diceValue = 1 + Math.floor(Math.random() * 6);
          isNewDice = true;
        } else {
          this.noKeeped = false;
        }
      });
    }
    if (isNewDice) {
      this.diceTurn += 1;
    }
  }
}
