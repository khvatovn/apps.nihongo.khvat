import React from "react";

import { DrawingSnapshot } from "../draw/draw";

import StrokesCanvas from "./strokes-canvas";

interface DrawingPreviewProps {
  drawing: DrawingSnapshot;

  size?: number;
}

const DrawingPreview: React.FC<DrawingPreviewProps> = ({ drawing, size = 100 }) => (
  <StrokesCanvas strokes={drawing.strokes} viewBoxSize={drawing.canvasSize} size={size} />
);

export default DrawingPreview;
