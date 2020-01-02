import Component from '../../helpers/component';

export default class DevPostTeaser extends Component {
    beforeInit() {
        this.StateMachine = new StateMachine(this, {
            colorScheme: {
                dark: {
                    event: 'onColorSchemeDark',
                    on: 'enableDarkMode',
                },
                light: {
                    event: 'onColorSchemeLight',
                    on: 'enableLightMode',
                },
            },
        });
    }

    init() {
        this.colorSchemeToggle.addEventListener('input', () => this.onToggle())
        this.applyInitialState();
    }

    onToggle() {
        EventBus.publish(
            this.colorSchemeToggle.checked ? 'onColorSchemeDark' : 'onColorSchemeLight', 
            this.el
        );
    }

    applyInitialState() {
        if (window.localStorage.colorScheme) {
            this.colorSchemeToggle.checked = window.localStorage.colorScheme === 'dark';
        } else {
            this.colorSchemeToggle.checked = window.matchMedia('(prefers-color-scheme:dark)').matches;
        }
        this.onToggle();
    }

    enableDarkMode() {
        document.body.setAttribute('data-color-scheme', 'dark');
        window.localStorage.colorScheme = 'dark';
    }

    enableLightMode() {
        document.body.setAttribute('data-color-scheme', 'light');
        window.localStorage.colorScheme = 'light';
    }
}