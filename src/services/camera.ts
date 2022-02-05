import { useContext } from "./context/context";
import { IEventBus, Topic } from "@/services/event";
import { IState, selectCamera, State } from "@/services/state";

const speed = 10;

const getUpdateCameraWorker =
  (globalKey: string) => (state: IState, key: string, delta: number) => {
    const camera = selectCamera(state);

    const newValue = (camera as any)[globalKey][key] + delta;
    const prevValue = (camera as any)[globalKey];

    const newCamera = {
      ...camera,
      [globalKey]: {
        ...prevValue,
        [key]: newValue,
      },
    };

    return { ...state, camera: newCamera };
  };

export const registerCameraEvents = () => {
  const state = useContext<State>("State");
  const eventBus = useContext<IEventBus>("Events");

  const updateCameraPosition = getUpdateCameraWorker("position");
  const updateCameraView = getUpdateCameraWorker("view");

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
};
