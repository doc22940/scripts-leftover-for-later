import './style.scss';
import ComponentLoader from '../helpers/componentLoader';
// eslint-disable-next-line no-unused-vars
import Component from '../helpers/component';
import StateMachine from '../helpers/stateMachine';
import EventBus from '../helpers/eventBus';

window.Modules = {
    colorSchemeToggle: () => import(/* webpackChunkName: 'colorSchemeToggle.js' */ '../components/colorSchemeToggle/colorSchemeToggle.js'),
    devPostTeaser: () => import(/* webpackChunkName: 'devPostTeaser.js' */ '../components/devPostTeaser/devPostTeaser.js'),
    header: () => import(/* webpackChunkName: 'header.js' */ '../components/header/header.js'),
    heavyCalculation: () => import(/* webpackChunkName: 'heavyCalculation.js' */ '../components/heavyCalculation/heavyCalculation.js'),
    index: () => import(/* webpackChunkName: 'index.js' */ '../components/index/index.js'),
    mainMenu: () => import(/* webpackChunkName: 'mainMenu.js' */ '../components/mainMenu/mainMenu.js'),
    overlay: () => import(/* webpackChunkName: 'overlay.js' */ '../components/overlay/overlay.js'),
    viewportManager: () => import(/* webpackChunkName: 'viewportManager.js' */ '../components/viewportManager/viewportManager.js'),
}

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.ComponentLoader = new ComponentLoader();
window.ComponentLoader.updateDom();