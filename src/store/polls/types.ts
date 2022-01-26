import { ActionContext } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { PollModel } from '@/store/polls/models/poll.model';

export enum PollsMutationEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_POll_BY_ID = 'SET_POll_BY_ID',
}

export enum PollsActionEnum {
  SET_COOPERATION_POLLS = 'SET_COOPERATION_POLLS',
  SET_POll_BY_ID = 'SET_POll_BY_ID',
}

export interface PollsStateInterface {
  cooperationPolls: Array<PollModel>;
  selectedPoll: PollModel;
  displayModal: boolean;
}

export type Mutations<S = PollsStateInterface> = {
  [PollsMutationEnum.SET_COOPERATION_POLLS](state: S, payload: Array<PollModel>): void;
  [PollsMutationEnum.SET_POll_BY_ID](state: S, payload: PollModel): void;
};

export interface Actions {
  [PollsActionEnum.SET_COOPERATION_POLLS]({ commit }: AugmentedActionContext): void;
  [PollsActionEnum.SET_POll_BY_ID]({ commit }: AugmentedActionContext, payload: number): void;
}

export type Getters<S = PollsStateInterface> = {
  getPolls(state: S): Array<PollModel>;
  getSelectedPoll(state: S): PollModel;
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
