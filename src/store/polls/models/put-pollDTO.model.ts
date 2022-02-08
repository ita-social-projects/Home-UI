import { HouseDTOModel } from '@/houses/models/houseDTO.model';
import { HouseModel } from '../../../houses/models/house.model';

export class PostPollDTOModel {
  public header: string;
  public description: string;
  public creation_date: string;
  public completion_date: string;
  public status: string;
  public polled_houses: HouseDTOModel[];

  constructor(poll: any) {
    this.header = poll.header;
    this.description = poll.description;
    this.status = poll.status;
    this.creation_date = poll.creationDate;
    this.completion_date = poll.completionDate;
    this.polled_houses = poll.polledHouses.map((el: HouseModel) => new HouseDTOModel(el));
  }
}
