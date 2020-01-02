import Component from '../../helpers/component';

export default class index extends Component {
    init() {
        this.StateMachine = new StateMachine(this, {
            scrolling: {
                disabled: {
                    event: 'onDisableScroll',
                },
                enabled: {
                    event: 'onEnableScroll',
                    initial: true,
                },
            },
            colorScheme: {
                light: {
                    event: 'onLightColorScheme',
                },
                dark: {
                    event: 'onDarkColorScheme',
                },
            },
        });
    }
}