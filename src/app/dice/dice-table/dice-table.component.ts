import { Component, OnInit } from '@angular/core';
import {Dice} from '../dice.model';
import {DiceService} from '../../core/dice.service';
import {FieldsService} from '../../core/fields.service';

@Component({
  selector: 'app-dice-table',
  templateUrl: './dice-table.component.html',
  styleUrls: ['./dice-table.component.css']
})
export class DiceTableComponent implements OnInit {
  dices: Dice[];
  diceTurn = '';
  diceVisibilty = 'hidden';

  constructor(private diceService: DiceService,
              private fieldsService: FieldsService) { }

  ngOnInit() {
    this.diceService.init();
    this.getDices();
  }

  diceStatus(event){
    this.dices.filter((d) => d.diceId === event.diceId)[0].diceKeeped = event.diceKeeped;
    this.diceService.setDices(this.dices);
  }

  diceAll(){
    this.diceService.diceNotKeeped();
    this.diceVisibilty = 'visible';
    this.diceTurn = String(this.diceService.diceTurn);
    this.fieldsService.enableField = true;
  }

  getDices(){
    this.diceService.getDices()
      .subscribe(
        (dices: Dice[]) => {
          this.dices = dices;
        }
      );
  }

}
