export interface ICamera {
  x: number;
  y: number;
}

export interface IObject {
  x: number;
  y: number;
}

export interface IState {
  camera: ICamera;
  objects: IObject[];
}
