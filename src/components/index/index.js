import './index.scss';
import Components from '../../helpers/component';

const Global = require('../../helpers/globals.js');
const EventBus = require('../../helpers/eventbus.js');

Global.EventBus = new EventBus();

Global.EventBus.subscribe(
    'onViewportChange',
    (message) => console.log('viewport changed:', message) // eslint-disable-line no-console
);

new Components();
