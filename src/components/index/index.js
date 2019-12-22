import './index.scss';
import ComponentLoader from '../../helpers/componentLoader';
import StateMachine from '../../helpers/stateMachine';

const EventBus = require('../../helpers/eventBus.js');

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.ComponentLoader = new ComponentLoader();
