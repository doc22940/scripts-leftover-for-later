import './index.scss';
import Components from '../../helpers/component';
import StateMachine from '../../helpers/stateMachine';

const Global = require('../../helpers/globals.js');
const EventBus = require('../../helpers/eventbus.js');

Global.EventBus = new EventBus();
Global.StateMachine = StateMachine;

new Components();
