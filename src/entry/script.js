import './style.scss';
import ComponentLoader from '../helpers/componentLoader';
// eslint-disable-next-line no-unused-vars
import Component from '../helpers/component';
import StateMachine from '../helpers/stateMachine';
import EventBus from '../helpers/eventBus';

// register components here
window.Modules = {
    /**
     * add skeleton functionality:
     * these imports are deferred and bundles into the main chunk
     * code that's supposed to run on every page load goes here
     */
    colorSchemeToggle: () => import(/* webpackMode: 'eager' */ '../components/colorSchemeToggle/colorSchemeToggle.js'),
    header: () => import(/* webpackMode: 'eager' */ '../components/header/header.js'),
    index: () => import(/* webpackMode: 'eager' */ '../components/index/index.js'),
    mainMenu: () => import(/* webpackMode: 'eager' */ '../components/mainMenu/mainMenu.js'),
    overlay: () => import(/* webpackMode: 'eager' */ '../components/overlay/overlay.js'),
    viewportManager: () => import(/* webpackMode: 'eager' */ '../components/viewportManager/viewportManager.js'),

    /**
     * add module functionality:
     * these imports are lazy loaded and bundles into separate chunks
     * code that's supposed to run only when it's needed goes here
     */
    devPostTeaser: () => import(/* webpackChunkName: 'devPostTeaser.js' */ '../components/devPostTeaser/devPostTeaser.js'),
    heavyCalculation: () => import(/* webpackChunkName: 'heavyCalculation.js' */ '../components/heavyCalculation/heavyCalculation.js'),
};

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.ComponentLoader = new ComponentLoader();
window.ComponentLoader.updateDom();
