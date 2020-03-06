export default class State {
    constructor(name, component, state) {
        this.name = name;
        this.states = state;
        this.component = component;
        this.currentState = null;

        this.addEventMethods();
        this.initStates();
    }

    addEventMethods() {
        Object.keys(this.states).forEach((index) => {
            const state = this.states[index];
            if (typeof state !== 'object') return;

            EventBus.subscribe(state.event, (eventEl) => {
                this.changeState(index, eventEl);
            });
        });
    }

    changeState(newState, eventEl) {
        if (newState === this.currentState) {
            return;
        }

        if (!eventEl || this.isThisInstance(eventEl)) {
            this.triggerStateTransitionMethods(this.states[newState]);
            this.updateState(newState);
        }
    }

    isThisInstance(eventEl) {
        return eventEl === this.component.el;
    }

    triggerStateTransitionMethods(state) {
        if (state.on) this.component[state.on]();
        if (this.currentState && this.currentState.off) { this.component[this.currentState.off](); }
    }

    updateState(newState) {
        const dataName = this.name.charAt(0).toUpperCase() + this.name.slice(1);
        this.component.el.dataset[`state${dataName}`] = newState;
        this.currentState = newState;
    }

    initStates() {
        // wait for all StateMachines to be registered, then initialize everything
        window.setTimeout(() => {
            Object.keys(this.states).forEach((index) => {
                if (this.states[index] === this.states.value) {
                    if (!this.states[this.states.value]) {
                        console.error('default method invalid for', this.component);
                        return;
                    }
                    this.changeState(this.states.value, this.component.el);
                }
            });
        }, 0);
    }
}
