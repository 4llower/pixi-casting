type Unsubscribe = () => void;

export enum Topic {
  // keyboard
  Down = "keydown",
  Up = "keyup",
  Left = "keyleft",
  Right = "keyright",

  // mouse
  MouseChange = "mousechange",
}

export interface IEventBus {
  subscribe(event: Topic, callback: (data?: any) => void): Unsubscribe;
  publish(event: Topic, data?: any): void;
}
