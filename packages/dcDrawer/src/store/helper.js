import Store from './index';

function createStore() {

  const store = new Store();

  return function(drawer, initialState = {}) {
    if (!drawer) {
      throw new Error('drawer is required.');
    }
    store.drawer = drawer;
    Object.keys(initialState).forEach(key => {
      store.states[key] = initialState[key];
    });
    return store;
  };
}

// 使用闭包返回单例，使所有drawer实例使用同一个new Store()组件
const store = createStore();
export function compuState() {
  return store;
};

export function mapStates(mapper) {
  const res = {};
  Object.keys(mapper).forEach(key => {
    const value = mapper[key];
    let fn;
    if (typeof value === 'string') {
      fn = function() {
        return this.store.states[value];
      };
    } else if (typeof value === 'function') {
      fn = function() {
        return value.call(this, this.store.states);
      };
    } else {
      console.error('invalid value type');
    }
    if (fn) {
      res[key] = fn;
    }
  });
  return res;
};
