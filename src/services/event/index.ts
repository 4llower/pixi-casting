import { IEventBus, Topic } from "./types";

export * from "./types";

type Callbacks = {
  [key: string]: {
    callback: (data?: any) => void;
    event: Topic;
  };
};

export class EventBus implements IEventBus {
  private callbacks: Callbacks;
  private currentId;

  constructor() {
    this.callbacks = {};
    this.currentId = 0;
  }

  subscribe(event: Topic, callback: (data?: any) => void): () => void {
    this.currentId++;
    const id = this.currentId.toString();

    this.callbacks[id] = { event, callback };

    return () => {
      delete this.callbacks[id.toString()];
    };
  }

  publish(newEvent: Topic, data?: any): void {
    const keys = Object.keys(this.callbacks);
    for (const key of keys) {
      const { event, callback } = this.callbacks[key];
      if (event === newEvent) {
        callback(data);
      }
    }
  }
}
