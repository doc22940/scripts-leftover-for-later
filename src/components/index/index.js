import './index.scss';
import Components from '../../helpers/component';
import StateMachine from '../../helpers/stateMachine';

const EventBus = require('../../helpers/eventBus.js');

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.Components = new Components();
