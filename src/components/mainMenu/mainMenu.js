import Component from '../../helpers/component';

export default class MainMenu extends Component {
    prepare() {
        this.StateMachine = new StateMachine(this, {
            toggle: {
                closed: {
                    event: 'onMenuClose',
                    initial: true,
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
        this.boundOnMenuClose = () => { EventBus.publish('onMenuClose', this.el); };
        EventBus.subscribe('onOverlayClose', this.boundOnMenuClose);

        this.boundOnMenuOpen = () => { EventBus.publish('onMenuOpen', this.el); };
        EventBus.subscribe('onMenuToggle', this.boundOnMenuOpen);

        this.boundHandleViewportChanges = viewport => { this.handleViewportChanges(viewport); };
        EventBus.subscribe('onViewportChange', this.boundHandleViewportChanges);
    }

    handleViewportChanges(viewport) {
        if (viewport === 'lg') {
            EventBus.publish('onMenuViewportLg', this.el);
        } else {
            EventBus.publish('onMenuClose', this.el);
        }
    }

    openMenu() {
        if (this.StateMachine.currentState !== 'fullscreen') {
            this.el.setAttribute('aria-expanded', true);
        }
    }

    closeMenu() {
        if (!this.StateMachine || this.StateMachine.currentState !== 'fullscreen') {
            this.el.setAttribute('aria-expanded', false);
        }
    }

    disable() {
        this.el.removeAttribute('aria-expanded');
    }
}
