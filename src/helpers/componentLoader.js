/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

export default class ComponentLoader {
    constructor() {
        this.components = [];
        this.els = document.querySelectorAll('[data-component]');
        this.lastId = 0;

        this.init();
    }

    init() {
        this.els.forEach((el) => {
            this.registerComponent(el);
        });
    }

    registerComponent(el) {
        const id = this.lastId;
        this.lastId = this.lastId + 1;

        try {
            const componentName = el.dataset.component;
            const ThisComponent = require(`../components/${componentName}/${componentName}.js`);
            this.components.push({
                id,
                component: new ThisComponent(el),
            });
        } catch (error) {
            console.error('Component couldn\'t be initialized', el, error);
        }
    }

    removeComponent(el) {
        const componentObj = Object
            .values(this.components)
            .filter((comp) => comp.component.el === el)[0];

        if (componentObj) {
            if (componentObj.component.destroy) {
                componentObj.component.destroy();
            }

            componentObj.component.el.querySelectorAll('[data-component]').forEach((subcomponent) => {
                this.removeComponent(subcomponent);
            });

            delete this.components[componentObj.id];
        }
    }
}
