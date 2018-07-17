import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dice} from '../dice.model';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {

  @Input() dice: Dice;
  @Output() statusChanged = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleKeeped(){
    this.dice.diceKeeped = !this.dice.diceKeeped;
    this.statusChanged.emit(this.dice);
  }

}
