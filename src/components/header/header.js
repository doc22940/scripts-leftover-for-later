const eventBus = require('../../helpers/eventbus.js');
module.exports = class Header {
    constructor(el) {
        this.el = el;

        this.subscription = eventBus.subscribe(
            "onHeaderReady",
            message => console.log(`printing:`, message)
        )

        eventBus.publish("onHeaderReady", this.el);
    }
}