/**
 * Based on Event bus by Pierfrancesco Soffritti
 * https://medium.com/@soffritti.pierfrancesco/create-a-simple-event-bus-in-javascript-8aa0370b3969
 *
 * subscriptions data format:
 * { eventType: { id: callback } }
 */

module.exports = class EventBus {
    constructor() {
        this.subscriptions = {};
        this.lastId = 0;
    }

    subscribe(eventType, callback) {
        const id = this.lastId + 1;
        this.lastId = id;

        if (!this.subscriptions[eventType]) {
            this.subscriptions[eventType] = {};
        }

        this.subscriptions[eventType][id] = callback;

        return {
            unsubscribe: () => {
                delete this.subscriptions[eventType][id];
                if (Object.keys(this.subscriptions[eventType]).length === 0) {
                    delete this.subscriptions[eventType];
                }
            },
        };
    }

    publish(eventType, arg) {
        if (!this.subscriptions[eventType]) {
            return;
        }

        Object.keys(this.subscriptions[eventType]).forEach(
            (key) => this.subscriptions[eventType][key](arg)
        );
    }
};
