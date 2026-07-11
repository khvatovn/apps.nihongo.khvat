export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};

export const isCorrectPair = (leftPair: string, rightPair: string, pairs: string[][]) => {
  const cond = pairs.some((pair) => {
    const condLeft = pair[0] === leftPair || pair[1] === leftPair;
    const condRight = pair[0] === rightPair || pair[1] === rightPair;
    return condLeft && condRight;
  });
  return cond;
};
