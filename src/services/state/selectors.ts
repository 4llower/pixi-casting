import { IState } from "./types";

export const selectCamera = (state: IState) => state.camera;
export const selectSubjects = (state: IState) => state.subjects;
