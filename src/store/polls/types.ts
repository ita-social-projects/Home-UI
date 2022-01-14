import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollModel } from '@/store/polls/models/poll.model';

export enum PollsMutationEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
}

export enum PollsActionEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_SELECTED_POLL = 'SET_SELECTED_POLL',
}

export enum PollsGettersEnum {
  getPolls = 'getPolls',
}

export interface PollsStateInterface {
  cooperationPolls: Array<PollModel>;
  selectedPoll: null | PollModel;
  displayModal: boolean;
}

export type Mutations<S = PollsStateInterface> = {
  [PollsMutationEnum.SET_COOPERATION_POLLS](state: S, payload: Array<PollModel>): void;
  [PollsMutationEnum.SET_SELECTED_POLL](state: S, payload: number): void;
};

export interface Actions {
  [PollsActionEnum.SET_COOPERATION_POLLS]({ commit }: AugmentedActionContext, payload: number): void;
  [PollsActionEnum.SET_SELECTED_POLL]({ commit }: AugmentedActionContext, payload: number): void;
}

export type Getters<S = PollsStateInterface> = {
  [PollsGettersEnum.getPolls](state: S): Array<PollModel>;
};

export type PollStatusType = 'draft' | 'active' | 'completed' | 'suspended';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>;
} & Omit<ActionContext<PollsStateInterface, RootStateInterface>, 'commit'>;
