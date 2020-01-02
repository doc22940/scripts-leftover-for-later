import Component from '../../helpers/component';

export default class index extends Component {
    init() {
        this.StateMachine = new StateMachine(this, {
            scrolling: {
                disabled: {
                    event: 'onDisableScroll',
                },
                enabled: {
                    event: 'onEnabledScroll',
                    initial: true,
                },
            },
        });
    }
}