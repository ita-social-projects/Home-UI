import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollModel } from '@/store/polls/models/poll.model';
import { HouseModel } from '@/houses/models/house.model';

export enum PollsMutationEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  ADD_COOPERATION_POLL = 'ADD_COOPERATION_POLL',
  DELETE_POLL = 'DELETE_POLL',
  UPDATE_POLL = 'UPDATE_POLL',
  SET_POll_BY_ID = 'SET_POll_BY_ID',
}

export enum PollsActionEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_POll_BY_ID = 'SET_POll_BY_ID',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  ADD_COOPERATION_POLL = 'ADD_COOPERATION_POLL',
  GET_POll_BY_ID = 'GET_POll_BY_ID',
  DELETE_POLL = 'DELETE_POLL',
  UPDATE_POLL = 'UPDATE_POLL',
}

export enum PollsGettersEnum {
  getPolls = 'getPolls',
  getSelectedPoll = 'getSelectedPoll',
  getPollByID = 'getPollByID',
}

export interface PollsStateInterface {
  cooperationPolls: Array<PollModel>;
  selectedPoll: PollModel;
  displayModal: boolean;
}

export interface PollInterface {
  id: number;
  header: string;
  description: string;
  creationDate: string;
  completionDate: string;
  status: PollStatusType;
  type: string;
  polledHouses: Array<HouseModel>;
}
export interface PutPollInterface {
  header: string;
  description: string;
  creationDate: string;
  completionDate: string;
  status: PollStatusType;
  polledHouses: Array<HouseModel>;
}

export interface EditPollPayloadInterface {
  poll: PutPollInterface | PollModel;
  ids: { [key: string]: number };
}

export interface DeletePollPayloadInterface {
  cooperationId: number;
  pollId: number;
}

export type Mutations<S = PollsStateInterface> = {
  [PollsMutationEnum.SET_COOPERATION_POLLS](state: S, payload: Array<PollModel>): void;
  [PollsMutationEnum.SET_SELECTED_POLL](state: S, payload: number): void;
  [PollsMutationEnum.ADD_COOPERATION_POLL](state: S, payload: PollModel): void;
  [PollsMutationEnum.DELETE_POLL](state: S, payload: number): void;
  [PollsMutationEnum.UPDATE_POLL](state: S, payload: EditPollPayloadInterface): void;
  [PollsMutationEnum.SET_POll_BY_ID](state: S, payload: PollModel): void;
};

export interface Actions {
  [PollsActionEnum.SET_COOPERATION_POLLS]({ commit }: AugmentedActionContext, payload: number): void;
  [PollsActionEnum.SET_SELECTED_POLL]({ commit }: AugmentedActionContext, payload: number): void;
  [PollsActionEnum.ADD_COOPERATION_POLL]({ commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = PollsStateInterface> = {
  [PollsGettersEnum.getPolls](state: S): Array<PollModel>;
  [PollsGettersEnum.getSelectedPoll](state: S): PollModel;
};

export enum PollStatusEnum {
  draft = 'Чернетка',
  active = 'Активне',
  completed = 'Завершене',
  suspended = 'sus pen ded',
}

export type PollStatusType = 'draft' | 'active' | 'completed' | 'suspended';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PollsStateInterface, RootStateInterface>, 'commit'>;

export enum PollAcceptanceCriteria {
  twoThirdsVoteOfOwnersQuestions = 'Рішення про визначення переліку та розмірів внесків і платежів співвласників, порядок управління та користування спільним майном, передачу у користування фізичним та юридичним особам спільного майна, а також про реконструкцію та капітальний ремонт багатоквартирного будинку або зведення господарських споруд вважається прийнятим, якщо за нього проголосувало не менш як дві третини загальної кількості усіх співвласників',
  notProvidedStatusQuestions = 'Ті самі питання, але не передбачені Статутом ОСББ',
  otherQuestions = 'Інші питання',
}
