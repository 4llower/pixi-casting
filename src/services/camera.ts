import { useContext } from "./context/context";
import { IEventBus, Topic } from "@/services/event";
import { IState, selectCamera, State } from "@/services/state";

const speed = 10;

const updateCameraPosition = (state: IState, key: string, delta: number) => {
  const camera = selectCamera(state);
  const newValue = (camera.position as any)[key] + delta;
  const newCamera = {
    ...camera,
    position: { ...camera.position, [key]: newValue },
  };
  return { ...state, camera: newCamera };
};

export const registerCameraEvents = () => {
  const state = useContext<State>("State");
  const eventBus = useContext<IEventBus>("Events");

  eventBus.subscribe(Topic.Up, () => {
    state.newState((state) => updateCameraPosition(state, "y", -speed));
  });

  eventBus.subscribe(Topic.Down, () => {
    state.newState((state) => updateCameraPosition(state, "y", speed));
  });

  eventBus.subscribe(Topic.Left, () => {
    state.newState((state) => updateCameraPosition(state, "x", -speed));
  });

  eventBus.subscribe(Topic.Right, () => {
    state.newState((state) => updateCameraPosition(state, "x", speed));
  });

  eventBus.subscribe(Topic.MouseChange, (value) => {
    state.newState((state) => {
      const camera = selectCamera(state);
      return { ...state, camera: { ...camera, view: value } };
    });
  });
};
