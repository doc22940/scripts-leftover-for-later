import Component from '../../helpers/component';
import HeavyCalculationWorker from './heavyCalculation.worker';

export default class HeavyCalculation extends Component {
    prepare() {
        const parsedCurrent = parseInt(this.calculatedNumber.innerText);
        this.current = !isNaN(parsedCurrent) ? parsedCurrent : 0;
        this.finish = 999999999;
        this.counter = new HeavyCalculationWorker();

        this.StateMachine = new StateMachine(this, {
            calculation: {
                progress: {
                    event: 'heavyCaluclationProgress',
                },
                finished: {
                    event: 'heavyCaluclationFinished',
                    on: 'updateNumber',
                },
            },
        });
    }

    init() {
        EventBus.publish('heavyCaluclationProgress', this.el);
        this.counter.postMessage({ 
            count: {
                from: this.current,
                to: this.finish,
            },
        });

        this.counter.addEventListener('message', (event) => {
            if (event.data.finished) {
                EventBus.publish('heavyCaluclationFinished', this.el);
            }
        });
    }

    updateNumber() {
        this.calculatedNumber.innerText = this.finish;
    }
}
