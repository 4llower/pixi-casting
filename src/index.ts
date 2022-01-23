import * as PIXI from "pixi.js";

const app = new PIXI.Application({ width: 640, height: 360 });
document.body.appendChild(app.view);

const frame = new PIXI.Graphics();
frame.beginFill(0x666666);
frame.lineStyle({ color: 0xffffff, width: 4, alignment: 0 });
frame.drawRect(0, 0, 208, 208);
frame.position.set(320 - 100, 180 - 100);
app.stage.addChild(frame);

const mask = new PIXI.Graphics();
mask.beginFill(0xffffff);
mask.drawRect(0, 0, 200, 200);
mask.endFill();

const maskContainer = new PIXI.Container();
maskContainer.mask = mask;
maskContainer.addChild(mask);
maskContainer.position.set(4, 4);
frame.addChild(maskContainer);

const text = new PIXI.Text(
  "This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n" +
    "You can put anything in the container and it will be masked!",
  {
    fontSize: 24,
    fill: 0x1010ff,
    wordWrap: true,
    wordWrapWidth: 180,
  }
);
text.x = 10;
maskContainer.addChild(text);

let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;
  text.y = 10 + -100.0 + Math.cos(elapsed / 50.0) * 100.0;
});
