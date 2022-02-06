import { IPoint } from "@/services/types";
export interface IView {
  xAngle: number;
  yAngle: number;
}

export interface ICamera {
  position: IPoint;
  view: IView;
}

export interface ISubject {
  position: IPoint;
  width: number;
  height: number;
  length: number;
}

export interface IState {
  camera: ICamera;
  subjects: ISubject[];
}
