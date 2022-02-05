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
  x: number;
  y: number;
}

export interface IState {
  camera: ICamera;
  subjects: ISubject[];
}
