module.exports = class Overlay {
    constructor(el) {
        this.el = el;
        this.assignedEl = el;
        this.openClass = 'overlay-open';
        this.state = 'closed';
        this.init();
    }

    init() {
        EventBus.subscribe('onMenuOpen', (menu) => { this.openOverlay(menu); });
        EventBus.subscribe('onMenuClose', (menu) => { this.closeOverlay(menu); });

        this.el.addEventListener('click', () => {
            this.closeOverlay(true, false);
        });
    }

    openOverlay(assignedEl) {
        if (this.state === 'opened') { return; }

        this.assignedEl = assignedEl;
        this.el.classList.add(this.openClass);
        this.state = 'open';
        EventBus.publish('onOverlayOpen', this.el);
    }

    closeOverlay(force, assignedEl) {
        if (
            this.state === 'closed'
            || (!force && this.assignedEl && this.assignedEl !== assignedEl)
        ) { return; }

        this.el.classList.remove(this.openClass);
        this.state = 'closed';
        EventBus.publish('onOverlayClose', this.el);
        this.assignedEl = undefined;
    }
};
