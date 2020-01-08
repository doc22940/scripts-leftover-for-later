import ComponentLoader from '../componentLoader';

document.body.innerHTML = `
    <div data-component="index"></div>
    <div data-component="index"></div>
`.trim();

window.EventBus = {
    publish: jest.fn(),
    subscribe: jest.fn()
}
window.StateMachine = jest.fn();

const loremElement = document.querySelector('[data-component="index"]'); 
const ipsumElement = document.querySelector('[data-component="index"]'); 

it('ComponentLoader is constructed', () => {
    const loader = new ComponentLoader();

    expect(loader.els).toMatchObject({
        0: loremElement,
        1: ipsumElement
    });
});

it('promises', () => {
    const loader = new ComponentLoader();
    const mockModule = jest.mock('../../components/index/index.js', () => {
        return class index {
            constructor() {};
        }
    })

    return loader.fetchComponent("index").then(Module => expect(Module).toMatchObject(mockModule));
});