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

import State from './state';

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
        Object.keys(this.statesObj).forEach((name) => {
            this.states[name] = new State(name, this.component, this.statesObj[name]);
        });
    }
}
