import Component from '../../helpers/component';

export default class Overlay extends Component {
    prepare() {
        this.assignedEl = undefined;

        this.StateMachine = new StateMachine(this, {
            toggle: {
                closed: {
                    event: 'onOverlayClose',
                    initial: true,
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
        this.boundOnMenuOpen = (menu) => {
            this.assignElement(menu);
            EventBus.publish('onOverlayOpen', this.el);
        }
        EventBus.subscribe('onMenuOpen', this.boundOnMenuOpen);

        this.boundOnMenuViewportLg = (menu) => {
            if (this.assignedEl === menu) {
                this.unassignElement();
                EventBus.publish('onOverlayClose', this.el);
            }
        }
        EventBus.subscribe('onMenuViewportLg', this.boundOnMenuViewportLg);

        this.boundOnClick = () => {
            this.unassignElement();
            EventBus.publish('onOverlayClose', this.el);
        }
        this.el.addEventListener('click', this.boundOnClick);
    }

    publishOpenEvents() {
        EventBus.publish('onDisableScroll');
    }

    publishCloseEvents() {
        EventBus.publish('onEnableScroll');
    }

    assignElement(el) {
        this.assignedEl = el;
    }

    unassignElement() {
        this.assignedEl = undefined;
    }
}
