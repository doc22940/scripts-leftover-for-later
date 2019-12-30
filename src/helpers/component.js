export default class Component {
    constructor(el) {
        this.el = el;
        this.componentName = this.constructor.name;
        this.assignComponentElements();

        if (this.beforeInit) { this.beforeInit(); }
        if (this.init) { this.init(); }
    }

    assignComponentElements() {
        const componentDataName = this.componentName
            .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join('-'); // convert to kebap-case to select data attribute in DOM

        const componentSelector = 
            this.componentName.charAt(0).toLowerCase() 
            + this.componentName.slice(1); // convert to camelCase to select within dataset

        Array.from(this.el.querySelectorAll(`[data-${componentDataName}-el]`)).forEach((componentEl) => {            
            const elementName = componentEl.dataset[`${componentSelector}El`];
            this[elementName] = componentEl;
        })
    }
}