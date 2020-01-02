import './style.scss';
import ComponentLoader from '../helpers/componentLoader';
import StateMachine from '../helpers/stateMachine';
import EventBus from '../helpers/eventBus';

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.ComponentLoader = new ComponentLoader();