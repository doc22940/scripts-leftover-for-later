import Component from '../../helpers/component';

export default class index extends Component {
    init() {
        this.StateMachine = new StateMachine(this, {
            disableScroll: {
                event: 'onDisableScroll',
            },
            enableScroll: {
                event: 'onEnableScroll',
            },
        });
    }
}