import Component from '../../helpers/component';

export default class MainMenu extends Component {
    beforeInit() {
        this.StateMachine = new StateMachine(this, {
            toggle: {
                closed: {
                    event: 'onMenuClose',
                    on: 'closeMenu',
                },
                open: {
                    event: 'onMenuOpen',
                    on: 'openMenu',
                },
                fullscreen: {
                    event: 'onMenuViewportLg',
                    on: 'disable',
                    off: 'closeMenu',
                },
            },
        });
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
}
