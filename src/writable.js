/**
 * @template T
 * @param {T} value
 * @returns {{subscribe: (subscription: T => void) => () => void; set: (value: T) => void; update: (fn: (value: T) => T) => void; get: T;} & T}
 */
export const writable = value => {
  /**
   * @type {Set<(T) => void>}
   */
  const subscriptions = new Set();
  let internalValue = value;

  // accept a function which needs to be called on value change
  /**
   * Subscribe for changes to this store value
   *
   * Returns function to unsubscribe
   *
   * @param {(T) => void} subscription
   * @returns
   */
  const subscribe = subscription => {
    subscriptions.add(subscription);

    // immediatly call the function on subscription
    subscription(internalValue);

    // We need to return an unsubscribe function
    return () => {
      subscriptions.delete(subscription);
    };
  };

  /**
   * Set a new value for the store
   *
   * @param {T} value
   */
  const set = value => {
    internalValue = value;
    subscriptions.forEach(sub => sub(internalValue));
  };

  /**
   * Update store value.
   *
   * @param {(value: T) => T} fn
   * @returns
   */
  const update = fn => set(fn(internalValue));

  /**
   * Get the internal value of the store
   *
   * @returns {T}
   */
  const get = () => internalValue;

  const store = { subscribe, set, update, get };

  if (typeof value === 'object') {
    for (const prop in value) {
      if (
        prop === 'subscribe' ||
        prop === 'set' ||
        prop === 'get' ||
        prop === 'update'
      ) {
        throw new Error(
          'Cannot create a store with the properties <subscribe, set, get or update>',
        );
      }
      Object.defineProperty(store, prop, {
        get: () => internalValue[prop],
        set: propVal => store.set({ ...internalValue, [prop]: propVal }),
      });
    }
  }

  return store;
};
