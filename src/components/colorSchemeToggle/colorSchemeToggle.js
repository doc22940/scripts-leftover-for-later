import Component from '../../helpers/component';

export default class DevPostTeaser extends Component {
    beforeInit() {
        this.StateMachine = new StateMachine(this, {
            dark: {
                event: 'onColorSchemeDark',
                on: 'enableDarkMode',
            },
            light: {
                event: 'onColorSchemeLight',
                on: 'enableLightMode',
            },
        });
    }

    init() {
        this.colorSchemeToggle.addEventListener('input', () => this.onToggle())
        this.getSchemeFromViewportManager();
    }

    onToggle() {
        EventBus.publish(
            this.colorSchemeToggle.checked ? 'onColorSchemeDark' : 'onColorSchemeLight', 
            this.el
        );
    }

    getSchemeFromViewportManager() {
        const {colorScheme} = ComponentLoader
            .components
            .filter(
                comp => comp.component.componentName === 'viewportManager'
                )[0]
            .component;
        this.colorSchemeToggle.checked = (colorScheme === 'dark');
    }

    enableDarkMode() {
        document.body.setAttribute('data-color-scheme', 'dark');
    }

    enableLightMode() {
        document.body.setAttribute('data-color-scheme', 'light');
    }
}