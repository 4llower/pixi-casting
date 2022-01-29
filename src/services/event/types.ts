type Unsubscribe = () => void;

export enum Topic {
    KeyDown = 'keydown',
}

export interface IEventBus { 
    subscribe(event: Topic, callback: (data?: any) => void): Unsubscribe;
    publish(event: Topic, data: any): void
}
