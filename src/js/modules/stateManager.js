class StateManager {
  constructor (initialState, reducer) {
    let _state = initialState;
    this.observers = [];

    Object.defineProperty(this, 'state', {
      get () {
        return {..._state};
      },
      set: state => {
        _state = state;
      },
    });

    this.dispatch = action => {
      const nextState = reducer(_state, action);
      if (nextState === _state) return;
      const prevState = this.state;
      this.state = nextState;
      this.observers.forEach(observer => observer(prevState, this.state));
    };

    this.observe = observer => {
      this.observers.push(observer);
      return () => {
        const idx = this.observers.indexOf(observer);
        this.observers.splice(idx, 1);
      };
    };

    this.getState = () => this.state;
  }
}

export const createStore = (initialState, reducer) => new StateManager(initialState, reducer);
