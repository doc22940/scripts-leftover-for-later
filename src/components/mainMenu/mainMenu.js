module.exports = class MainMenu {
    constructor(el) {
        this.el = el;
        this.isExpanded = false;

        this.init();
    }

    init() {
        EventBus.subscribe('onMenuToggle', () => {
            this.toggleMenu(true);
        });

        EventBus.subscribe('onOverlayClose', () => {
            this.toggleMenu(false);
        });

        EventBus.subscribe('onViewportChange', (viewport) => {
            this.onViewportChange(viewport);
        });
    }

    toggleMenu(toggle) {
        this.isExpanded = toggle;
        this.el.setAttribute('aria-expanded', toggle);
        if (toggle) {
            EventBus.publish('onMenuOpen', this.el);
        } else {
            EventBus.publish('onMenuClose', this.el);
        }
    }

    onViewportChange(viewport) {
        if (viewport === 'lg') {
            this.toggleMenu(false);
            this.el.removeAttribute('aria-expanded');
        } else {
            this.el.setAttribute('aria-expanded', this.isExpanded);
        }
    }
};
