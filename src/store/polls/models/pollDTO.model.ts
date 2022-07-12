import { PollStatusType } from '@/store/polls/types';
import { HouseDTOModel } from '@/houses/models/houseDTO.model';
import { PollModel } from '@/store/polls/models/poll.model';

export class PollDTOModel {
  public id: number;
  public header: string;
  public description: string;
  public creation_date: Date | string;
  public completion_date: Date | string;
  public polled_houses: HouseDTOModel[];
  public status: PollStatusType;
  public type: string;
  public acceptanceCriteria: string;

  constructor(poll: PollModel) {
    this.id = poll.id;
    this.header = poll.header;
    this.description = poll.description;
    this.creation_date = poll.creationDate;
    this.completion_date = poll.completionDate;
    this.status = poll.status;
    this.type = poll.type;
    this.polled_houses = poll.polledHouses.map((el) => new HouseDTOModel(el));
    this.acceptanceCriteria = poll.acceptanceCriteria;
  }
}
