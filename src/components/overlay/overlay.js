import Component from '../../helpers/component';

export default class Overlay extends Component {
    beforeInit() {
        this.assignedEl = undefined;

        this.StateMachine = new StateMachine(this, {
            toggle: {
                closed: {
                    event: 'onOverlayClose',
                    on: 'publishCloseEvents',
                },
                open: {
                    event: 'onOverlayOpen',
                    on: 'publishOpenEvents',
                },
            },
        });
    }

    init() {
        EventBus.subscribe('onMenuOpen', (menu) => {
            this.assignElement(menu);
            EventBus.publish('onOverlayOpen', this.el);
        });

        EventBus.subscribe('onMenuViewportLg', (menu) => {
            if (this.assignedEl === menu) {
                this.unassignElement();
                EventBus.publish('onOverlayClose', this.el);
            }
        });

        this.el.addEventListener('click', () => {
            this.unassignElement();
            EventBus.publish('onOverlayClose', this.el);
        });
    }

    publishOpenEvents() {
        EventBus.publish('onDisableScroll', this.el);
    }

    publishCloseEvents() {
        EventBus.publish('onEnableScroll', this.el);
    }

    assignElement(el) {
        this.assignedEl = el;
    }

    unassignElement() {
        this.assignedEl = undefined;
    }
}
