import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollModel } from '@/store/polls/models/poll.model';

export enum PollsMutationEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  GET_POll_BY_ID = 'GET_POll_BY_ID',
  CLEAR_POll_BY_ID = 'CLEAR_POll_BY_ID',
}

export enum PollsActionEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
  GET_POll_BY_ID = 'GET_POll_BY_ID',
}

export interface PollsStateInterface {
  cooperationPolls: Array<PollModel>;
  selectedPoll: null | PollModel;
  getPollById: PollModel;
  displayModal: boolean;
}

export type Mutations<S = PollsStateInterface> = {
  [PollsMutationEnum.SET_COOPERATION_POLLS](state: S, payload: Array<PollModel>): void;
  [PollsMutationEnum.SET_SELECTED_POLL](state: S, payload: number): void;
  [PollsMutationEnum.GET_POll_BY_ID](state: S, payload: PollModel): void;
  [PollsMutationEnum.CLEAR_POll_BY_ID](state: S): void;
};

export interface Actions {
  [PollsActionEnum.SET_COOPERATION_POLLS]({ commit }: AugmentedActionContext): void;
  [PollsActionEnum.SET_SELECTED_POLL]({ commit }: AugmentedActionContext, payload: number): void;
  [PollsActionEnum.GET_POll_BY_ID]({ commit }: AugmentedActionContext, payload: number): void;
}

export type Getters<S = PollsStateInterface> = {
  getPolls(state: S): Array<PollModel>;
  getSelectedPoll(state: S): null | PollModel;
  getPollByID(state: S): PollModel;
};

export type PollStatusType = 'draft' | 'active' | 'completed' | 'suspended';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PollsStateInterface, RootStateInterface>, 'commit'>;
