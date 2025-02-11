interface TouchedObj {
  [key: string]: boolean | TouchedObj | undefined;
}

export function getIsFormTouched(touchedObj: TouchedObj) {
  let hasTouched = false;
  const getIsTouch = (o: TouchedObj) => {
    for (const key in o) {
      const val = o[key];
      if (typeof val === 'object') {
        getIsTouch(val);
      } else if (val) {
        hasTouched = true;
        return;
      }
    }
  };
  getIsTouch(touchedObj);
  return hasTouched;
}
