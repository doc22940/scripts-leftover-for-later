const Global = require('./globals.js');

export default class StateMachine {
    constructor(component, states) {
        if (!component || !states) {
            console.error('State Machine called incorrectly');
            return;
        }

        this.component = component;
        this.states = states;

        this.addEventMethods();
    }

    addEventMethods() {
        Object.keys(this.states).forEach((index) => {
            const state = this.states[index];
            Global.EventBus.subscribe(state.event, (eventEl) => {
                if (this.isThisInstance(eventEl)) {
                    this.registerStateTransitionMethods(state);
                    this.component.el.dataset.state = index;
                }
            });
        });
    }

    isThisInstance(eventEl) {
        return eventEl === this.component.el;
    }

    registerStateTransitionMethods(state) {
        if (state.on) this.component[state.on]();
        if (state.off) this.component[state.off]();
    }
}
