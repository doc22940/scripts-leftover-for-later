import Component from '../../helpers/component';

export default class ColorSchemeToggle extends Component {
    prepare() {
        this.StateMachine = new StateMachine(this, {
            colorScheme: {
                dark: {
                    event: 'onColorSchemeDark',
                },
                light: {
                    event: 'onColorSchemeLight',
                },
            },
        });
    }

    init() {
        this.boundOnToggle = () => { this.onToggle(); };
        this.colorSchemeToggle.addEventListener('change', this.boundOnToggle);
        this.applyInitialState();
    }

    onToggle() {
        const colorScheme = this.colorSchemeToggle.checked ? 'Dark' : 'Light';
        window.localStorage.colorScheme = colorScheme.toLowerCase();
        EventBus.publish(`onColorScheme${colorScheme}`);
    }

    applyInitialState() {
        if (window.localStorage.colorScheme) {
            this.colorSchemeToggle.checked = window.localStorage.colorScheme === 'dark';
        } else {
            this.colorSchemeToggle.checked = window.matchMedia('(prefers-color-scheme:dark)').matches;
        }
        this.onToggle();
    }
}