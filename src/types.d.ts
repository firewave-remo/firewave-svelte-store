type Update<T> = (value: T) => T;
type Updater<T> = (update: Update<T>) => void;
type Getter<T> = () => T;
type Setter<T> = (value: T) => void;
type Subscription<T> = (value: T) => void;
type Subscriber<T> = (subscription: Subscription<T>) => void;

interface Writable<T> {
  subscribe: Subscriber<T>;
  set: Setter<T>;
  update: Updater<T>;
  get: Getter<T>;
}

type WritableStore<T> = Writable<T> & T;
