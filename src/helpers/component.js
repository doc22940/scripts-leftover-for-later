/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

export default class Component {
    constructor() {
        this.components = [];
        this.els = document.querySelectorAll('[data-component]');

        this.init();
    }

    init() {
        this.els.forEach((el) => {
            try {
                const componentName = el.dataset.component;
                const ThisComponent = require(`../components/${componentName}/${componentName}.js`);
                this.components.push(new ThisComponent(el));
            } catch (e) {
                console.error('Component couldn\'t be initialized', el, e);
            }
        });
    }
}
