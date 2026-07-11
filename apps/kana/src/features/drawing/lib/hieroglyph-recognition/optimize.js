const kanaTemplates = {};

const convert = (array) => array.map((line) => line.map((item) => [item.x, item.y]));

for (const key in kanaTemplates) {
  if (Object.prototype.hasOwnProperty.call(kanaTemplates, key)) {
    const element = kanaTemplates[key];

    console.log(`${key}: ${JSON.stringify(convert(element))},`);
  }
}
