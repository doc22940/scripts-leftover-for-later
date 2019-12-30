import Component from '../../helpers/component';

export default class Header extends Component {
    init() {
        this.menuButton.addEventListener('click', () => {
            this.toggleMenuButton();
        });
    }

    toggleMenuButton() {
        EventBus.publish('onMenuToggle', this.el);
    }
}
