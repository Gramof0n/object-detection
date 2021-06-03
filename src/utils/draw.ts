import * as cocossd from "@tensorflow-models/coco-ssd";

export const draw = (
  ctx: CanvasRenderingContext2D | null,
  detections: cocossd.DetectedObject[]
) => {
  ctx!.clearRect(0, 0, 1000, 1000);
  for (let d of detections) {
    const [x, y, w, h] = d.bbox;
    const text = d.class;
    const score = (d.score * 100).toString().substr(0, 5) + "%";

    console.log(`height: ${h} width: ${w} x: ${x} y: ${y}`);
    ctx!.strokeStyle = "green";
    ctx!.lineWidth = 3;
    ctx!.fillStyle = "purple";
    ctx!.beginPath();
    ctx!.font = "18px Arial";
    ctx!.strokeRect(x, y, w, h);
    ctx!.fillText(text, x, y);
    ctx!.fillText(score, x + text.length + 55, y);
    ctx!.stroke();
  }
};
