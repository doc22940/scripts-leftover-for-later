const Global = require('../../helpers/globals.js');

module.exports = class Overlay {
    constructor(el) {
        this.el = el;
        this.assignedEl = el;
        this.openClass = 'overlay-open';
        this.state = 'closed';
        this.init();
    }

    init() {
        Global.EventBus.subscribe('onMenuOpen', (menu) => { this.openOverlay(menu); });
        Global.EventBus.subscribe('onMenuClose', (menu) => { this.closeOverlay(menu); });

        this.el.addEventListener('click', () => {
            this.closeOverlay(true, false);
        });
    }

    openOverlay(assignedEl) {
        if (this.state === 'opened') { return; }

        this.assignedEl = assignedEl;
        this.el.classList.add(this.openClass);
        this.state = 'open';
        Global.EventBus.publish('onOverlayOpen', this.el);
    }

    closeOverlay(force, assignedEl) {
        if (
            this.state === 'closed'
            || (!force && this.assignedEl && this.assignedEl !== assignedEl)
        ) { return; }

        this.el.classList.remove(this.openClass);
        this.state = 'closed';
        Global.EventBus.publish('onOverlayClose', this.el);
        this.assignedEl = undefined;
    }
};
