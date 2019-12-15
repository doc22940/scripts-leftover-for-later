module.exports = class MainMenu {
    constructor(el) {
        this.el = el;

        this.StateMachine = new StateMachine(this, {
            closed: {
                event: 'onMenuClose',
                on: 'closeMenu',
            },
            open: {
                event: 'onMenuOpen',
                on: 'openMenu',
            },
            full: {
                event: 'onMenuViewportLg',
                on: 'disable',
                off: 'closeMenu',
            },
        });

        this.init();
    }

    init() {
        EventBus.subscribe('onOverlayClose', () => { EventBus.publish('onMenuClose', this.el); });
        EventBus.subscribe('onMenuToggle', () => { EventBus.publish('onMenuOpen', this.el); });
        EventBus.subscribe('onViewportChange', (viewport) => {
            if (viewport === 'lg') {
                EventBus.publish('onMenuViewportLg', this.el);
            } else {
                EventBus.publish('onMenuClose', this.el);
            }
        });
    }

    openMenu() {
        if (this.StateMachine.currentState !== 'full') {
            this.el.setAttribute('aria-expanded', true);
        }
    }

    closeMenu() {
        if (this.StateMachine.currentState !== 'full') {
            this.el.setAttribute('aria-expanded', false);
        }
    }

    disable() {
        this.el.removeAttribute('aria-expanded');
    }
};
