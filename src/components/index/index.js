import './index.scss';
import Components from '../../helpers/component';


const eventBus = require('../../helpers/eventbus.js');

eventBus.subscribe(
    'onViewportChange',
    (message) => console.log('viewport changed:', message) // eslint-disable-line no-console
);

new Components();
