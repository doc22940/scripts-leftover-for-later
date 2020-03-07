import Component from '../../helpers/component';

export default class Modal extends Component {
    prepare() {
        this.StateMachine = new StateMachine(this, {
            toggle: {
                value: 'closed',
                closed: {
                    event: 'onModalClose',
                    on: 'closeModal',
                },
                open: {
                    event: 'onModalOpen',
                    on: 'openModal',
                },
            },
        });
    }

    init() {
        this.boundOnModalClose = () => { EventBus.publish('onModalClose', this.el); };
        EventBus.subscribe('onOverlayClose', this.boundOnModalClose);

        this.boundOnModalOpen = () => { EventBus.publish('onModalOpen', this.el); };
        EventBus.subscribe('onModalToggle', this.boundOnModalOpen);
    }

    openModal() {
        this.el.setAttribute('aria-expanded', true);
    }

    closeModal() {
        this.el.setAttribute('aria-expanded', false);
    }
}
