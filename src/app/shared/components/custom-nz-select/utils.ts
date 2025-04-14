export function removeProperties<T>(array: T[], properties: (keyof T)[]): Omit<T, keyof T>[] {
  return array.map(item => {
    const newItem = { ...item };
    properties.forEach(prop => delete newItem[prop]);
    return newItem;
  });
}

export function setPropertiesToNull<T>(array: T[], properties: (keyof T)[]): void {
  array.forEach(item => {
    properties.forEach(prop => {
      // @ts-ignore
      item[prop] = null;
    });
  });
}

export function multiplyItems<T>(arr: T[], times: number): T[] {
  const result: T[] = [];

  for (let item of arr) {
    for (let i = 0; i < times; i++) {
      result.push(item);
    }
  }

  return result;
}
