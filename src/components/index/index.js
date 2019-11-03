import './index.scss';
import { Component } from '../../helpers/component.js';

const eventBus = require('../../helpers/eventbus.js');
eventBus.subscribe(
    "onViewportChange",
    message => console.log(`viewport changed:`, message)
)

new Component();