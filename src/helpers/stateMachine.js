/**
 * Usage:
 *      this.StateMachine = new StateMachine(this, {
 *          stateName: {
 *              stateValue: {
 *                  event: 'onEvent',
 *                  initial: true,
 *                  on: 'enterCallbackFn',
 *                  off: 'exitCallbackFn',
 *              }
 *          }
 *      });
 */

class State {
    constructor(name, component, state) {
        this.name = name;
        this.states = state;
        this.component = component;
        this.currentState = undefined;

        this.addEventMethods();
        this.initStates();
    }

    addEventMethods() {
        Object.keys(this.states).forEach((index) => {
            const state = this.states[index];
            EventBus.subscribe(state.event, (eventEl) => {
                this.changeState(index, eventEl);
            });
        });
    }

    changeState(newState, eventEl) {
        if (newState === this.currentState) {
            return;
        }

        if (this.isThisInstance(eventEl)) {
            this.triggerStateTransitionMethods(this.states[newState]);
            this.updateState(newState);
        }
    }

    isThisInstance(eventEl) {
        return eventEl === this.component.el;
    }

    triggerStateTransitionMethods(state) {
        if (state.on) this.component[state.on]();
        if (this.currentState && this.currentState.off) this.component[this.currentState.off]();
    }

    updateState(newState) {
        const dataName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.component.el.dataset[`state${dataName}`] = newState;
        this.currentState = newState;
    }

    initStates() {
        this.changeState()

        Object.keys(this.states).forEach((index) => {
            if (this.states[index].initial) {
                this.changeState(index, this.component.el);
            }        
        });
    }
}

export default class StateMachine {
    constructor(component, states) {
        if (!component || !states) {
            console.error('State Machine called incorrectly');
            return;
        }

        this.component = component;
        this.statesObj = states;
        this.states = {};

        this.registerStates();
    }

    registerStates() {
        for (const name in this.statesObj) {
            this.states[name] = new State(name, this.component, this.statesObj[name]);
        }
    }
}