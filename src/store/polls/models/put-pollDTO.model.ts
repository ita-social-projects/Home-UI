import { HouseDTOModel } from '@/houses/models/houseDTO.model';
import { HouseInterface } from '@/houses/store/types';
import { PollModel } from './poll.model';
import { HouseModel } from './../../../houses/models/house.model';

export class PostPollDTOModel {
  public header: string;
  public description: string;
  public creation_date: Date | string;
  public completion_date: Date | string;
  public status: string;
  public polled_houses: HouseDTOModel[];

  constructor(poll: PollModel) {
    this.header = poll.header;
    this.description = poll.description;
    this.status = poll.status;
    this.creation_date = poll.creationDate;
    this.completion_date = poll.completionDate;
    this.polled_houses = poll.polledHouses.map((el) => new HouseDTOModel(el));
  }
}
