/**
 * Based on Event bus by Pierfrancesco Soffritti
 * https://medium.com/@soffritti.pierfrancesco/create-a-simple-event-bus-in-javascript-8aa0370b3969
 *
 * subscriptions data format:
 * { eventType: { id: callback } }
 */

export default class EventBus {
    constructor() {
        this.subscriptions = {};
        this.lastId = 0;
    }

    subscribe(eventName, callback) {
        if (!eventName || !callback) {
            return;
        }

        const id = this.lastId + 1;
        this.lastId = id;

        if (!this.subscriptions[eventName]) {
            this.subscriptions[eventName] = {};
        }

        this.subscriptions[eventName][id] = callback;

        const boundUnsubscribe = () => {
            this.unsubscribe(eventName, id);
        }

        return {
            unsubscribe: boundUnsubscribe,
        };
    }

    unsubscribe(eventName, id) {
        if (!eventName || !id) {
            return;
        }

        delete this.subscriptions[eventName][id];
        if (Object.keys(this.subscriptions[eventName]).length === 0) {
            delete this.subscriptions[eventName];
        }
    }

    publish(eventName, arg) {
        if (!eventName) {
            return;
        }

        if (!this.subscriptions[eventName]) {
            return;
        }

        Object.keys(this.subscriptions[eventName]).forEach(
            (key) => this.subscriptions[eventName][key](arg)
        );
    }
}
