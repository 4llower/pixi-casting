import { useContext } from "./context";
import { IEventBus, Topic } from "./event";

export const registerMouseEvents = (
  windowHeight: number,
  windowWidth: number
) => {
  const bus = useContext<IEventBus>("Events");
  document.addEventListener("mousemove", (event) => {
    const perX = event.clientX / windowWidth;
    const perY = event.clientY / windowHeight;

    bus.publish(Topic.MouseChange, { xAngle: perX * 360, yAngle: perY * 180 });
  });
};
