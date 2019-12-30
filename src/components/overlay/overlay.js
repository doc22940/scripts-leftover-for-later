import Component from '../../helpers/component';

export default class Overlay extends Component {
    beforeInit() {
        this.assignedEl = undefined;

        this.StateMachine = new StateMachine(this, {
            closed: {
                event: 'onOverlayClose',
            },
            open: {
                event: 'onOverlayOpen',
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

    assignElement(el) {
        this.assignedEl = el;
    }

    unassignElement() {
        this.assignedEl = undefined;
    }
}
