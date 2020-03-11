import Component from '../../helpers/component';

export default class ModalTrigger extends Component {
    init() {
        this.boundOnClick = () => {
            EventBus.publish('onModalTrigger', this.el);
        };
        this.el.addEventListener('click', this.boundOnClick);
    }
}
