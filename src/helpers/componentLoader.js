/**
 * Usage:
 * Create a new HTML and JS file with the same name in ../components/fooBar/fooBar.[html|js]
 * Use following pattern:
 *  
 * html:
 *    <div data-component="fooBar">
 *        <span data-foo-bar-el="loremIpsum">
 *            <!-- content here -->
 *        </span>
 *    </div>
 *  
 * js:
 *    import Component from '../../helpers/component';
 *    export default class FooBar extends Component {
 *        beforeInit() {
 *            // prepare component
 *        }
 *        init() {
 *            // the component wrapper is this.el
 *            // registered DOM elements are assigned like this.loremIpsum
 *            // business logic here
 *        }
 *    }
 *  
 */

export default class ComponentLoader {
    constructor() {
        this.components = [];
        this.els = document.querySelectorAll('[data-component]');
        this.lastId = 0;

        this.updateDom();
    }

    updateDom() {
        // if el isnt in ComponentLoader.components[$].component.el
        this.els.forEach((el) => {
            this.registerComponent(el);
        });
    }

    registerComponent(el) {
        const id = this.lastId;
        this.lastId = this.lastId + 1;

        // if webworker available
        // register webworker
        // send message with comp name
        // attach event bus

        try {
            const componentName = el.dataset.component;
            import(`../components/${componentName}/${componentName}.js`).then(Module => {
                this.components.push({
                    id,
                    component: new Module.default(el),
                });
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
