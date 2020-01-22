import './carousel.scss';
import Component from '../../helpers/component';
import SwipeDetection from '../../helpers/swipeDetection';

export default class Carousel extends Component {
    prepare() {
        this.items = this.grid.children;
        this.itemcount = this.items.length - 1;
        this.startItem = 0;
        this.currentPosition = 0;
    }

    init() {
        new SwipeDetection(this.el).init();

        this.el.setAttribute('data-slider-ready', true);

        this.boundOnSwipe = (event) => { this.onSwipe(event); };
        this.el.addEventListener('swipe', (event) => { this.boundOnSwipe(event); });

        this.boundOnSwipeStop = (event) => { this.onSwipeStop(event); };
        this.el.addEventListener('swipestop', (event) => { this.boundOnSwipeStop(event); });
    }

    onSwipe(swipeEvent) {
        const xDistance = swipeEvent.detail.end.x - swipeEvent.detail.start.x;

        this.moveGridBy(xDistance);
    }

    onSwipeStop() {
        this.moveGridBy(0);

        const endPosition = window
            .getComputedStyle(this.grid)
            .getPropertyValue('transform').split(',')[4];

        this.currentPosition = endPosition * -1;
    }

    moveGridBy(distance) {
        window.requestAnimationFrame(() => {
            this.grid.style.transform = `translateX(${distance - this.currentPosition}px)`;
        });
    }
}
