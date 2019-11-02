export class Component {
    constructor() {
        this.components = [];
        this.els = document.querySelectorAll('[data-component]');

        this.init();
    }

    init() {
        this.els.forEach((el) => {
            try {
                const componentName = el.dataset.component;
                const Component = require(`../components/${componentName}/${componentName}.js`);
                this.components.push(new Component(el));
            }
            catch(e) {
                console.error('Component couldn\'t be initialized', el, e);
            }
        });
    } 
}

