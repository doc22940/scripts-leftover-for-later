export default class StateMachine {
    constructor(component, states) {
        if (!component || !states) {
            console.error('State Machine called incorrectly');
            return;
        }

        this.component = component;
        this.states = states;
        this.currentState = String();

        this.addEventMethods();
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
        if (this.currentState.off) this.component[this.currentState.off]();
    }

    updateState(newState) {
        this.component.el.dataset.state = newState;
        this.currentState = newState;
    }
}
