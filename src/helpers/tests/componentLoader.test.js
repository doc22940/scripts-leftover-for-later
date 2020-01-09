import ComponentLoader from '../componentLoader';
import Component from '../component';
import IndexComponent from '../../components/index/index';
jest.mock('../../components/index/index.js');

document.body.innerHTML = `
    <div data-component="index"></div>
    <div data-component="index">
        <div data-component="index"></div>
    </div>
`.trim();

window.EventBus = {
    publish: jest.fn(),
    subscribe: jest.fn()
}
window.StateMachine = jest.fn();

const loremElement = document.querySelectorAll('[data-component="index"]')[0]; 
const ipsumElement = document.querySelectorAll('[data-component="index"]')[1]; 
const dolorElement = document.querySelectorAll('[data-component="index"]')[2]; 

beforeEach(() => {
    IndexComponent.mockClear();
})

it('ComponentLoader is constructed', () => {
    const loader = new ComponentLoader();

    loader.updateDom = jest.fn();

    expect(loader.els).toMatchObject({
        0: loremElement,
        1: ipsumElement,
        2: dolorElement,
    });
});

it('finds and fetches components', () => {
    const loader = new ComponentLoader();
    loader.fetchComponent('index').then((fetchResult) => expect(fetchResult).toMatchObject(IndexComponent));
})

it('registers and boots components', () => {
    const loader = new ComponentLoader();
    loader.registerComponent(loremElement);
    return loader.fetchComponent("index").then(() => expect(IndexComponent).toHaveBeenCalledTimes(1));
});

it('removes (nested) components', () => {
    const loader = new ComponentLoader();

    expect(loader.els).toMatchObject({
        0: loremElement
    });
})