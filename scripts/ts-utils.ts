type PickInput = {
  [key: string]: any;
};

export function pick(
  object: PickInput,
  keys: string[]
): Pick<PickInput, keyof PickInput> {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<PickInput, keyof PickInput>);
}
