import './style.scss';
import ComponentLoader from '../helpers/componentLoader';
import StateMachine from '../helpers/stateMachine';
import EventBus from '../helpers/eventBus';

window.Modules = {
    colorSchemeToggle: () => import('../components/colorSchemeToggle/colorSchemeToggle.js'),
    devPostTeaser: () => import('../components/devPostTeaser/devPostTeaser.js'),
    header: () => import('../components/header/header.js'),
    heavyCalculation: () => import('../components/heavyCalculation/heavyCalculation.js'),
    index: () => import('../components/index/index.js'),
    mainMenu: () => import('../components/mainMenu/mainMenu.js'),
    overlay: () => import('../components/overlay/overlay.js'),
    viewportManager: () => import('../components/viewportManager/viewportManager.js'),
}

window.EventBus = new EventBus();
window.StateMachine = StateMachine;
window.ComponentLoader = new ComponentLoader();
window.ComponentLoader.updateDom();