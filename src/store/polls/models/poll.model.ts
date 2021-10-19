import { PolledHouseInterface, PollInterface, PollStatusType } from '@/store/polls/types';
import { PolledHouseModel } from '@/store/polls/models/polled-house.model';

export class PollModel {
  public id: number;
  public header: string;
  public creation_date: string;
  public completion_date: string;
  // public polled_houses: Array<PolledHouseModel>;
  public status: PollStatusType;
  public type: string;

  constructor(poll: PollInterface) {
    this.id = poll.id;
    this.header = poll.header;
    this.creation_date = poll.creationDate;
    this.completion_date = poll.completionDate;
    this.status = poll.status;
    this.type = poll.type;
    // this.polled_houses = new PolledHouseModel(poll.polledHouses);
  }
}
