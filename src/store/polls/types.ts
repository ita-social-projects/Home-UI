import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollModel } from '@/store/polls/models/poll.model';
import { HouseModel } from '@/shared/models/house.model';

export enum PollsMutationEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  GET_POll_BY_ID = 'GET_POll_BY_ID',
  DELETE_POLL = 'DELETE_POLL',
  UPDATE_POLL = 'UPDATE_POLL',
}

export enum PollsActionEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
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
  selectedPoll: null | PollModel;
  getPollById: PollModel;
  displayModal: boolean;
}

export interface PutPollInterface {
  header: string;
  description: string;
  creationDate: string;
  completionDate: string;
  status: string;
  polledHouses: Array<HouseModel>;
}

export type Mutations<S = PollsStateInterface> = {
  [PollsMutationEnum.SET_COOPERATION_POLLS](state: S, payload: Array<PollModel>): void;
  [PollsMutationEnum.SET_SELECTED_POLL](state: S, payload: number): void;
  [PollsMutationEnum.DELETE_POLL](state: S, payload: any): void;
  [PollsMutationEnum.UPDATE_POLL](state: S, payload: any): void;
};

export interface Actions {
  [PollsActionEnum.SET_COOPERATION_POLLS]({ commit }: AugmentedActionContext): void;
  [PollsActionEnum.SET_SELECTED_POLL]({ commit }: AugmentedActionContext, payload: number): void;
  [PollsActionEnum.DELETE_POLL]({ commit }: AugmentedActionContext, payload: any): void;
  [PollsActionEnum.UPDATE_POLL]({ commit }: AugmentedActionContext, payload: any): void;
}

export type Getters<S = PollsStateInterface> = {
  getPolls(state: S): Array<PollModel>;
  getSelectedPoll(state: S): null | PollModel;
  getPollByID(state: S): PollModel;
};

export type PollStatusType = 'draft' | 'active' | 'completed' | 'suspended' | 'noStatus';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PollsStateInterface, RootStateInterface>, 'commit'>;
