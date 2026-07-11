export const normalizeCoordinates = (
  data: Array<Array<{ x: number; y: number }>>,
): number[][][] => {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity;

  data.forEach((path) => {
    path.forEach((point) => {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    });
  });

  return data.map((path) =>
    path.map((point) => [(point.x - minX) / (maxX - minX), (point.y - minY) / (maxY - minY)]),
  );
};
