export class Dice{
  diceId: number;
  diceValue: number;
  diceKeeped: boolean;

  constructor (diceId: number) {
    this.diceId = diceId;
    this.diceValue = 1 + Math.floor(Math.random() * 6);
    this.diceKeeped = false;
  }
}
