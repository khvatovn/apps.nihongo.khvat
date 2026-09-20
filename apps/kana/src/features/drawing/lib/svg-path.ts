export type DrawingPath = { x: number; y: number }[];

export const generatePathDAttribute = (points: DrawingPath) => {
  if (points.length < 2) return "";

  const moveToStart = (x: number, y: number) => `M ${x},${y}`;

  const quadraticCurveTo = (x1: number, y1: number, x2: number, y2: number) =>
    ` Q ${x1},${y1} ${x2},${y2}`;

  const smoothCurveTo = (x: number, y: number) => ` T ${x},${y}`;
  const getMidPoint = (point1: { x: number; y: number }, point2: { x: number; y: number }) => ({
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  });

  let d = moveToStart(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    const prevPoint = points[i - 1];
    const currPoint = points[i];
    const midPoint = i > 1 ? getMidPoint(prevPoint, currPoint) : prevPoint;

    d += quadraticCurveTo(prevPoint.x, prevPoint.y, midPoint.x, midPoint.y);
  }

  const lastPoint = points[points.length - 1];
  d += smoothCurveTo(lastPoint.x, lastPoint.y);

  return d;
};
