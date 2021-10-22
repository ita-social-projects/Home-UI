import { PollStatusType } from '@/store/polls/types';
import { PolledHouseDTOModel } from '@/store/polls/models/polled-houseDTO.model';
import { PollModel } from '@/store/polls/models/poll.model';

export class PollDTOModel {
  public id: number;
  public header: string;
  public creation_date: string;
  public completion_date: string;
  public polled_houses: PolledHouseDTOModel[];
  public status: PollStatusType;
  public type: string;

  constructor(poll: PollModel) {
    this.id = poll.id;
    this.header = poll.header;
    this.creation_date = poll.creationDate;
    this.completion_date = poll.completionDate;
    this.status = poll.status;
    this.type = poll.type;
    this.polled_houses = poll.polledHouses.map((el) => new PolledHouseDTOModel(el));
  }
}