export function unproxify(value: Proxy<(Array<any> | object)>): (Array<any> | object) {
  if (value instanceof Array) {
    return value.map(unproxify);
  }
  if (value instanceof Object) {
    return Object.fromEntries(
      Object.entries({ ...value })
        .map(([k, v]) => [k, unproxify(v)]),
    );
  }
  return value;
}

export function isNumber(value: any): boolean {
  // eslint-disable-next-line no-restricted-globals
  return value !== null && value !== '' && isFinite(value);
}

export const ascending = (a: number, b: number) => a - b;

export const ascendingKeyAccessor = (
  keyAccessor: (d: any) => any,
) => (a: any, b: any) => ascending(keyAccessor(a), keyAccessor(b));

export const descending = (a: number, b: number) => b - a;

export const descendingKeyAccessor = (
  keyAccessor: (d: any) => any,
) => (a: any, b: any) => descending(keyAccessor(a), keyAccessor(b));

/**
 * Debounce a function. Returns a function, that, as long as it continues to be invoked,
 * will not be triggered.
 * The function will be called after it stops being called for 'delay' milliseconds.
 * @param func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay.
 * @param {boolean} [immediate] - Trigger the function immediately.
 */
export const debounce = (func: (...args: any[]) => any, delay: number, immediate?: boolean) => {
  let timerId;
  return (...args) => {
    const boundFunc = func.bind(this, ...args);
    clearTimeout(timerId);
    if (immediate && !timerId) {
      boundFunc();
    }
    const calleeFunc = immediate ? () => {
      timerId = null;
    } : boundFunc;
    timerId = setTimeout(calleeFunc, delay);
  };
};
