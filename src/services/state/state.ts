import { IState } from "./types";

type Keys = "camera" | "subjects";

export class State {
  private state: IState;

  constructor(state: IState) {
    this.state = state;
  }

  update(key: Keys, data: any) {
    this.state = { ...this.state, [key]: data };
  }

  newState(cb: (state: IState) => IState) {
    this.state = cb(this.state);
  }

  getState(): IState {
    return this.state;
  }
}
