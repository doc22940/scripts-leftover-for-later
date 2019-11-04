const Global = require('../../helpers/globals.js');

module.exports = class Header {
    constructor(el) {
        this.el = el;
        this.menuButton = this.el.querySelector('[data-header-el="menu-button"]');
        this.init();
    }

    init() {
        this.menuButton.addEventListener('click', () => {
            this.toggleMenuButton();
        });
    }

    toggleMenuButton() {
        Global.EventBus.publish('onMenuToggle', this.el);
    }
};
