import './carousel.scss';
import Component from '../../helpers/component';
import SwipeDetection from '../../helpers/swipeDetection';

export default class Carousel extends Component {
    prepare() {
        this.items = this.grid.children;
        this.itemcount = this.items.length - 1;
        this.currentPosition = 0; // px
        this.leftBoundaryItemIndex = 0;
    }

    init() {
        new SwipeDetection(this.el).init();

        this.el.setAttribute('data-slider-ready', true);
        Object.keys(this.items).forEach((index) => {
            this.items[index].setAttribute('data-carousel-index', index);
        });

        this.boundOnSwipe = (event) => { this.onSwipe(event); };
        this.el.addEventListener('swipe', (event) => { this.boundOnSwipe(event); });

        this.boundOnSwipeStop = (event) => { this.onSwipeStop(event); };
        this.el.addEventListener('swipestop', (event) => { this.boundOnSwipeStop(event); });

        this.observeItems();
        this.determineLeftBoundary();
    }

    observeItems() {
        const callback = (entries) => {
            Object.keys(entries).forEach((index) => {
                entries[index].target.setAttribute('data-carousel-visible', entries[index].isIntersecting);
            });
        };

        const observer = new IntersectionObserver(callback, {
            root: this.el,
            threshold: 0.5,
        });

        Object.keys(this.items).forEach((index) => {
            observer.observe(this.items[index]);
        });
    }

    onSwipe(swipeEvent) {
        this.grid.setAttribute('data-autoplay', false);
        const xDistance = swipeEvent.detail.end.x - swipeEvent.detail.start.x;
        this.moveGridBy(xDistance);
    }

    onSwipeStop() {
        this.moveGridBy(0);

        const endPosition = window
            .getComputedStyle(this.grid)
            .getPropertyValue('transform').split(',')[4];

        this.currentPosition = endPosition * -1;

        this.determineLeftBoundary();
        this.moveGridToIndex(this.leftBoundaryItemIndex);
    }

    moveGridBy(distance) {
        window.requestAnimationFrame(() => {
            this.grid.style.transform = `translateX(${distance - this.currentPosition}px)`;
        });
    }

    moveGridToIndex(position = 0) {
        // determine position of index

        // prime transition
        this.grid.setAttribute('data-autoplay', true);

        // execute transition
        window.setTimeout(() => {
            this.moveGridBy(this.currentPosition); // currentPosition + index.scrollLeft
        }, 0);

        // reset transition
        this.grid.addEventListener('transitionend', () => {
            window.requestAnimationFrame(() => {
                this.currentPosition = 0; // index.scrollLeft
            });
            this.grid.setAttribute('data-autoplay', false);
        });
    }

    determineLeftBoundary() {
        const fallbackItem = this.currentPosition <= 0 ? 0 : this.items.length - 1; // if no items are visible
        const firstVisibleItem = Array.from(this.items).filter((item) => item.dataset.carouselVisible === 'true')[0];
        this.leftBoundaryItemIndex = firstVisibleItem ? firstVisibleItem.dataset.carouselIndex : fallbackItem;
    }
}
