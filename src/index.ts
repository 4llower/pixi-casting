import { generateRaysFromCameraPosition } from "./services/rays/cast";
import "./styles";

import * as PIXI from "pixi.js";

import {
  EventBus,
  State,
  registerKeyboardEvents,
  selectCamera,
  registerCameraEvents,
  createContext,
  useContext,
  registerMouseEvents,
} from "@/services";

const windowHeight = document.body.offsetHeight;
const windowWidth = document.body.offsetWidth;

const camera = {
  position: { x: 0, y: 0, z: 0 },
  view: {
    xAngle: 90,
    yAngle: 180,
  },
};

createContext<EventBus>(new EventBus(), "Events");
createContext<State>(new State({ camera, subjects: [] }), "State");

const app = new PIXI.Application({ width: windowWidth, height: windowHeight });
document.body.appendChild(app.view);

const frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.endFill();
app.stage.addChild(frame);

registerKeyboardEvents();
registerCameraEvents();
registerMouseEvents(windowHeight, windowWidth);

const rect = new PIXI.Graphics();

frame.addChild(rect);

app.ticker.add(() => {
  rect.clear();
  const state = useContext<State>("State");

  const camera = selectCamera(state.getState());

  const rays = generateRaysFromCameraPosition(camera);

  for (let i = 0; i < rays.length; ++i) {
    const ray = rays[i];

    const points: PIXI.Point[] = [
      { x: ray.start.x, y: ray.start.y } as PIXI.Point,
      { x: ray.end.x, y: ray.end.y } as PIXI.Point,
    ];

    rect
      .lineStyle({ color: 0xfffff, width: 5 })
      .beginFill(0xffffff)
      .drawPolygon(points)
      .endFill();
  }
});
