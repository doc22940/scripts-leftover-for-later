const eventBus = require('../../helpers/eventbus.js');

module.exports = class ViewportManager {
    constructor(el) {
        this.el = el;
        this.init();
    }

    init() {
        if (!window.getComputedStyle(this.el, ':before').getPropertyValue('content')) {
            console.error('breakpoint check failed');
            return;
        }

        this.breakpoint = this.getBreakpoint();
        this.oldBreakpoint = this.breakpoint;

        this.publishEvent();
        window.addEventListener('resize', () => { this.onViewportResize(); }, false);
    }

    getBreakpoint() {
        return window.getComputedStyle(this.el, ':before').getPropertyValue('content').split('"').filter(Boolean)
            .join('"');
    }

    onViewportResize() {
        this.oldBreakpoint = this.breakpoint;
        this.breakpoint = this.getBreakpoint();

        if (this.oldBreakpoint !== this.breakpoint) {
            this.publishEvent();
        }
    }

    publishEvent() {
        this.el.setAttribute('data-breakpoint', this.breakpoint);
        eventBus.publish('onViewportChange', this.breakpoint);
    }
};
