import "./styles";

import * as PIXI from "pixi.js";

import { EventBus, State, registerKeyboard } from "./services";

import { Topic } from "./services/event/types";
import { selectCamera } from "./services/state/selectors";

const height = document.body.offsetHeight;
const width = document.body.offsetWidth;

const eventBus = new EventBus();
const state = new State({ camera: { x: 0, y: 0 }, objects: [] });

const app = new PIXI.Application({ width, height });
document.body.appendChild(app.view);

const frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.endFill();
app.stage.addChild(frame);

registerKeyboard(eventBus);

eventBus.subscribe(Topic.Up, () => {
  state.newState((state) => {
    const camera = selectCamera(state);

    const newCamera = { ...camera, y: camera.y - 10 };

    return { ...state, camera: newCamera };
  });
});

eventBus.subscribe(Topic.Down, () => {
  state.newState((state) => {
    const camera = selectCamera(state);

    const newCamera = { ...camera, y: camera.y + 10 };

    return { ...state, camera: newCamera };
  });
});

eventBus.subscribe(Topic.Left, () => {
  state.newState((state) => {
    const camera = selectCamera(state);

    const newCamera = { ...camera, x: camera.x - 10 };

    return { ...state, camera: newCamera };
  });
});

eventBus.subscribe(Topic.Right, () => {
  state.newState((state) => {
    const camera = selectCamera(state);

    const newCamera = { ...camera, x: camera.x + 10 };

    return { ...state, camera: newCamera };
  });
});

const rect = new PIXI.Graphics();

rect.beginFill(0x666666);
rect.drawRect(0, 0, 50, 50);
rect.endFill();

frame.addChild(rect);

app.ticker.add(() => {
  const { x, y } = selectCamera(state.getState());
  rect.position.x = x;
  rect.position.y = y;
  // console.log(x, y);
});
