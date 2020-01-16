import Component from '../../helpers/component';

export default class Header extends Component {
  init() {
    this.boundToggleMenuButton = () => { this.toggleMenuButton(); };
    this.menuButton.addEventListener('click', this.boundToggleMenuButton);
  }

  toggleMenuButton() {
    EventBus.publish('onMenuToggle', this.el);
  }
}
