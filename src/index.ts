import "./styles";

import * as PIXI from "pixi.js";

import {
  EventBus,
  State,
  registerKeyboardEvents,
  selectCamera,
  registerCameraEvents,
} from "./services";

const height = document.body.offsetHeight;
const width = document.body.offsetWidth;

const camera = {
  position: { x: 0, y: 0, z: 0 },
  view: {
    xAngle: 0,
    yAngle: 0,
  },
};

const eventBus = new EventBus();
const state = new State({ camera, subjects: [] });

const app = new PIXI.Application({ width, height });
document.body.appendChild(app.view);

const frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.endFill();
app.stage.addChild(frame);

registerKeyboardEvents(eventBus);
registerCameraEvents(state, eventBus);

const rect = new PIXI.Graphics();

rect.beginFill(0x666666);
rect.drawRect(0, 0, 50, 50);
rect.endFill();

frame.addChild(rect);

app.ticker.add(() => {
  const {
    position: { x, y },
  } = selectCamera(state.getState());
  rect.position.x = x;
  rect.position.y = y;
  // console.log(x, y);
});
