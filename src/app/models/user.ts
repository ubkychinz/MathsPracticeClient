export class AdditionSubtractionResult {
  timeSubmitted: Date;
  timeTakenSec: number;
  numAdditionCorrect: number;
  numSubtractionCorrect: number;
  numTotal: number;

}

export class User {
  id: string;
  username: string;
  additionSubtractionResults: AdditionSubtractionResult[];
}


