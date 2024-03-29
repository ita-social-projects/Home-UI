import { PollModel } from './poll.model';

export class PostPollDTOModel {
  public header: string;
  public description: string;
  public creation_date: Date | string;
  public completion_date: Date | string;
  public status: string;
  public included_houses: number[];

  constructor(poll: PollModel) {
    this.header = poll.header;
    this.description = poll.description;
    this.status = poll.status;
    this.creation_date = poll.creationDate;
    this.completion_date = poll.completionDate;
    this.included_houses = poll.polledHouses.map((el) => el.id);
  }
}
