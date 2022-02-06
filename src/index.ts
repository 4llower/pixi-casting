import { colorByBrightness } from "./services/geometry";
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
  getCollisionCF,
  selectSubjects,
  generateRaysFromCameraPosition,
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

const subjects = [
  { position: { x: 5, y: 5, z: 0 }, width: 100, height: 100, length: 100 },
];

createContext<EventBus>(new EventBus(), "Events");
createContext<State>(new State({ camera, subjects }), "State");

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
  const [subject] = selectSubjects(state.getState());

  const rays = generateRaysFromCameraPosition(camera, 1707);

  rect
    .beginFill(0x1231fa, 0.5)
    .drawRect(
      subject.position.x / 10,
      subject.position.y / 10,
      subject.width / 10,
      subject.height / 10
    )
    .endFill();

  for (let i = 0; i < rays.length; ++i) {
    const ray = rays[i];

    const percent = getCollisionCF(ray, subject) * 100;

    rect
      .lineStyle({
        color: colorByBrightness("#FFFFFF", percent),
        alpha: getCollisionCF(ray, subject),
        width: 1,
      })
      .drawRect(windowWidth - i, 0, 1, windowHeight);

    const points: PIXI.Point[] = [
      { x: ray.start.x / 10, y: ray.start.y / 10 } as PIXI.Point,
      { x: ray.end.x / 10, y: ray.end.y / 10 } as PIXI.Point,
    ];

    if (i % 20 == 0)
      rect
        .lineStyle({ color: 0xfffff, width: 1, alpha: 0.5 })
        .beginFill(0xfffff, 0.5)
        .drawPolygon(points)
        .endFill();
  }
});
