import { IEventBus, Topic } from "./event";

export const registerKeyboardEvents = (bus: IEventBus) => {
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp": {
        bus.publish(Topic.Up);
        break;
      }

      case "s":
      case "ArrowDown": {
        bus.publish(Topic.Down);
        break;
      }

      case "d":
      case "ArrowRight": {
        bus.publish(Topic.Right);
        break;
      }

      case "a":
      case "ArrowLeft": {
        bus.publish(Topic.Left);
        break;
      }
    }
  });
};
