import { PollStatusType, PollsResults } from '@/poll/store/types';
import { HouseModel } from '@/houses/models/house.model';
import { PollDTOModel, PollDTOModelWithResults } from '@/poll/models/pollDTO.model';

export class PollModel {
  public id: number;
  public header: string;
  public description: string;
  public creationDate: Date | string;
  public completionDate: Date | string;
  public polledHouses: HouseModel[];
  public status: PollStatusType;
  public type: string;
  public acceptanceCriteria: string;

  constructor(poll: PollDTOModel) {
    this.id = poll.id;
    this.header = poll.header;
    this.description = poll.description;
    this.creationDate = new Date(poll.creation_date);
    this.completionDate = new Date(poll.completion_date);
    this.status = poll.status;
    this.type = poll.type;
    this.polledHouses = poll.polled_houses.map((el) => new HouseModel(el));
    this.acceptanceCriteria = poll.acceptanceCriteria;
  }
}
export class PollModelWithResults extends PollModel {
  public results: PollsResults;

  constructor(poll: PollDTOModelWithResults) {
    super(poll);
    this.results = { yes: 50, no: 50 };
  }
}
