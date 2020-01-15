import ComponentClass from '../../helpers/component';
import Component from './mainMenu';

document.body.innerHTML = require('../../components/mainMenu/mainMenu.html');
jest.mock('../../helpers/component');

window.EventBus = {
    publish: jest.fn(),
    subscribe: jest.fn()
}
const StateMachine = jest.fn().mockImplementation(() => {
    return {currentState: 'closed'};
});

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ComponentClass.mockClear();
});

it('Component is called', () => {
    new Component();
    expect(Component).toHaveBeenCalledTimes(1);
});

it('Component is initialized', () => {
    const component = new Component();
    component.boundOnMenuOpen = jest.fn();
    component.boundOnMenuClose = jest.fn();
    component.boundHandleViewportChanges = jest.fn();

    component.init();

    expect(EventBus.subscribe).toHaveBeenCalledWith('onMenuToggle', component.boundOnMenuOpen);
    expect(EventBus.subscribe).toHaveBeenCalledWith('onOverlayClose', component.boundOnMenuClose);
    expect(EventBus.subscribe).toHaveBeenCalledWith('onViewportChange', component.boundHandleViewportChanges);
});

it('closes menu and and publishes event on lg viewport change', () =>{
    const viewports = ['sm', 'md', 'lg'];
    const component = new Component();
    component.el = document.querySelector('[data-component="mainMenu"]');

    viewports.forEach(viewport => {
        component.handleViewportChanges(viewport);
        
        if (viewport === "lg") {
            expect(EventBus.publish).toHaveBeenCalledWith('onMenuViewportLg', component.el);
            expect(EventBus.publish).toHaveBeenCalledWith('onMenuClose', component.el);
        } else {
            expect(EventBus.publish).not.toHaveBeenCalled();
        }
    });
});

it('can open the menu drawer', () => {
    const states = ['open', 'closed'];
    const component = new Component();
    component.el = document.querySelector('[data-component="mainMenu"]');
    component.StateMachine = StateMachine;

    states.forEach(state => {
        component.StateMachine.currentState = state;
        component.openMenu();
        expect(component.el.attributes['aria-expanded'].value).toBe('true');
    });
})

it('can close the menu drawer', () => {
    const states = ['open', 'closed'];
    const component = new Component();
    component.el = document.querySelector('[data-component="mainMenu"]');
    component.StateMachine = StateMachine;

    states.forEach(state => {
        component.StateMachine.currentState = state;
        component.closeMenu();
        expect(component.el.attributes['aria-expanded'].value).toBe('false');
    });
})

it('can disable the menu', () => {
    const component = new Component();
    component.el = document.querySelector('[data-component="mainMenu"]');
    component.el.setAttribute('aria-expanded', true);

    component.disable();
    expect(component.el.attributes['aria-expanded']).toBeUndefined();
});