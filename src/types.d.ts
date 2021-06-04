export type Update<T> = (value: T) => T;
export type Updater<T> = (update: Update<T>) => void;
export type Getter<T> = () => T;
export type Setter<T> = (value: T) => void;
export type Subscription<T> = (value: T) => void;
export type Subscriber<T> = (subscription: Subscription<T>) => void;

export interface Writable<T> {
  subscribe: Subscriber<T>;
  set: Setter<T>;
  update: Updater<T>;
  get: Getter<T>;
}

export type WritableStore<T> = Writable<T> & T;
