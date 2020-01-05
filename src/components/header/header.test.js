import ComponentClass from '../../helpers/component';
import Component from './header';

document.body.innerHTML = require('../../components/header/header.html');
jest.mock('../../helpers/component');

window.EventBus = {
    publish: jest.fn(),
    subscribe: jest.fn()
}

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    ComponentClass.mockClear();
});

it('Component is called', () => {
    const header = new Component();
    expect(Component).toHaveBeenCalledTimes(1);
});

it('Component is initialized', () => {
    const component = new Component();
    component.boundToggleMenuButton = jest.fn();
    component.menuButton = {
        addEventListener: jest.fn()
    };

    component.init();
    expect(component.menuButton.addEventListener).toHaveBeenCalledWith('click', component.boundToggleMenuButton);
});

it('toggles menu', () => {
    const component = new Component();
    component.el = 'mockEl';
    
    component.toggleMenuButton();
    expect(EventBus.publish).toHaveBeenCalledWith('onMenuToggle', component.el);
});