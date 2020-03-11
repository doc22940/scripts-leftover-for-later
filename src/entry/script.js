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
     * these imports are deferred and bundled into the main chunk
     * code that's supposed to run on every page load goes here
     */
    colorSchemeToggle: () => import(/* webpackMode: 'eager' */ '../components/colorSchemeToggle/colorSchemeToggle'),
    header: () => import(/* webpackMode: 'eager' */ '../components/header/header'),
    index: () => import(/* webpackMode: 'eager' */ '../components/index/index'),
    mainMenu: () => import(/* webpackMode: 'eager' */ '../components/mainMenu/mainMenu'),
    overlay: () => import(/* webpackMode: 'eager' */ '../components/overlay/overlay'),
    viewportManager: () => import(/* webpackMode: 'eager' */ '../components/viewportManager/viewportManager'),

    /**
     * add module functionality:
     * these imports are lazy loaded and bundled into separate chunks
     * code that's supposed to run only when it's needed goes here
     */
    devPostTeaser: () => import(/* webpackChunkName: 'devPostTeaser' */ '../components/devPostTeaser/devPostTeaser'),
    heavyCalculation: () => import(/* webpackChunkName: 'heavyCalculation' */ '../components/heavyCalculation/heavyCalculation'),
    carousel: () => import(/* webpackChunkName: 'carousel' */ '../components/carousel/carousel'),
    modal: () => import(/* webpackChunkName: 'modal' */ '../components/modal/modal'),
    modalTrigger: () => import(/* webpackChunkName: 'modal' */ '../components/modalTrigger/modalTrigger'),
};

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.ComponentLoader = new ComponentLoader();
window.ComponentLoader.updateDom();
