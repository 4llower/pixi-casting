import { IEventBus, Topic } from "@services/event";
import { IState, selectCamera, State } from "@services/state";

const getUpdateCameraWorker =
  (globalKey: string) => (state: IState, key: string, delta: number) => {
    const camera = selectCamera(state);

    const newValue = (camera as any)[globalKey][key] + delta;

    const newCamera = {
      ...camera,
      [globalKey]: newValue,
    };

    return { ...state, camera: newCamera };
  };

export const registerCameraEvents = (state: State, eventBus: IEventBus) => {
  const updateCameraPosition = getUpdateCameraWorker("position");
  const updateCameraView = getUpdateCameraWorker("view");

  eventBus.subscribe(Topic.Up, () => {
    state.newState((state) => updateCameraPosition(state, "y", -1));
  });

  eventBus.subscribe(Topic.Down, () => {
    state.newState((state) => updateCameraPosition(state, "y", 1));
  });

  eventBus.subscribe(Topic.Left, () => {
    state.newState((state) => updateCameraPosition(state, "x", -1));
  });

  eventBus.subscribe(Topic.Right, () => {
    state.newState((state) => updateCameraPosition(state, "x", 1));
  });
};
