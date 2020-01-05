import Component from '../../helpers/component';
import ColorSchemeToggle from './colorSchemeToggle';

const { matchMedia } = window;

jest.mock('../../helpers/component');
document.body.innerHTML = require('../../components/colorSchemeToggle/colorSchemeToggle.html');

window.EventBus = {
    publish: jest.fn(),
    subscribe: jest.fn()
}

beforeAll(() => {
    delete window.matchMedia;
    window.matchMedia = jest.fn().mockImplementation(query => {
        return {
            matches: true,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };
    });
});

afterAll(() => {
    window.matchMedia = matchMedia;
})

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    Component.mockClear();

    delete window.localStorage;
    window.localStorage = {};
});
it('Component is called', () => {
    const colorSchemeToggle = new ColorSchemeToggle();
    expect(Component).toHaveBeenCalledTimes(1);
});

it('Applies initial state for dark mode', () => {
    const colorSchemeToggle = new ColorSchemeToggle();
    colorSchemeToggle.colorSchemeToggle = {
        checked: false
    };
    colorSchemeToggle.onToggle = jest.fn();

    colorSchemeToggle.applyInitialState();
    expect(colorSchemeToggle.colorSchemeToggle.checked).toBe(true);
    expect(colorSchemeToggle.onToggle).toHaveBeenCalledTimes(1);
});

it('toggles dark mode', () => {
    const colorSchemeToggle = new ColorSchemeToggle();
    colorSchemeToggle.colorSchemeToggle = {
        checked: true
    };
    
    colorSchemeToggle.onToggle();
    expect(EventBus.publish).toHaveBeenCalledWith('onColorSchemeDark');
});