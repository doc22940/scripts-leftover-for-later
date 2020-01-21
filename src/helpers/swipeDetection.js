/**
 * adds a swipe event to a DOM element
 * event returns swipe start and end points, direction and distance
 * triggers on touch and mouse events
 *
 * usage:
 *      new SwipeDetection(el).init();
        el.addEventListener('swipe', (event) => {
            console.log(event.detail);
        });
 */

export default class SwipeDetection {
    constructor(el) {
        this.el = el;
    }

    init() {
        this.reset();
    }

    reset() {
        this.swipeData = {
            start: {
                x: undefined,
                y: undefined,
            },
            end: {
                x: undefined,
                y: undefined,
            },
            direction: undefined,
            distance: undefined,
        };

        this.removeDragListener();
        this.removeStopListener();

        this.boundStartTrackSwipe = (event) => this.startTrackSwipe(event);
        this.el.addEventListener('mousedown', this.boundStartTrackSwipe);
        this.el.addEventListener('touchstart', this.boundStartTrackSwipe);
    }

    removeStartListener() {
        if (this.boundStartTrackSwipe) {
            this.el.removeEventListener('mousedown', this.boundStartTrackSwipe);
            this.el.removeEventListener('touchstart', this.boundStartTrackSwipe);
        }
        this.boundStopTrackSwipe = undefined;
    }

    removeDragListener() {
        if (this.boundTrackSwipe) {
            document.body.removeEventListener('mousemove', this.boundTrackSwipe);
            document.body.removeEventListener('touchmove', this.boundTrackSwipe);
        }
        this.boundTrackSwipe = undefined;
    }

    removeStopListener() {
        if (this.boundStopTrackSwipe) {
            this.el.removeEventListener('mouseup', this.boundStopTrackSwipe);
            window.removeEventListener('mouseout', this.boundStopTrackSwipe);
            this.el.removeEventListener('touchend', this.boundStopTrackSwipe);
            this.el.removeEventListener('touchcancel', this.boundStopTrackSwipe);
        }
        this.boundStopTrackSwipe = undefined;
        this.pointerLocation = undefined;
    }

    startTrackSwipe(startEvent) {
        this.removeStartListener();

        const pointer = startEvent.type.indexOf('touch') >= 0
            ? startEvent.touches[0]
            : startEvent;

        this.swipeData.start = {
            x: !pointer.clientX ? 0 : pointer.clientX,
            y: !pointer.clientY ? 0 : pointer.clientY,
        };

        this.boundStopTrackSwipe = (event) => this.stopTrackSwipe(event);
        this.el.addEventListener('mouseup', this.boundStopTrackSwipe);
        window.addEventListener('mouseout', this.boundStopTrackSwipe);
        this.el.addEventListener('touchend', this.boundStopTrackSwipe);
        this.el.addEventListener('touchcancel', this.boundStopTrackSwipe);

        this.boundTrackSwipe = (event) => this.trackSwipe(event);
        document.body.addEventListener('mousemove', this.boundTrackSwipe);
        document.body.addEventListener('touchmove', this.boundTrackSwipe);
    }

    trackSwipe(swipeEvent) {
        const pointer = swipeEvent.type.indexOf('touch') >= 0
            ? swipeEvent.touches[0]
            : swipeEvent;

        this.swipeData.end = {
            x: !pointer.clientX ? 0 : pointer.clientX,
            y: !pointer.clientY ? 0 : pointer.clientY,
        };

        this.swipeData.distance = this.getSwipeDistance();
        this.swipeData.direction = this.getSwipeDirection();

        this.publishEvent();
    }

    stopTrackSwipe(stopEvent) {
        if (
            stopEvent.type !== 'mouseout'
            || (stopEvent.type === 'mouseout' && !document.contains(stopEvent.relatedTarget))
        ) {
            this.removeStopListener();
            this.reset();
        }
    }

    getSwipeDistance() {
        // calculate distance between start and end point
        return Math.sqrt(
            (this.swipeData.start.x - this.swipeData.end.x) ** 2
            + (this.swipeData.start.y - this.swipeData.end.y) ** 2
        );
    }

    getSwipeDirection() {
        let direction = '';
        const distanceX = this.swipeData.start.x - this.swipeData.end.x;
        const distanceY = this.swipeData.start.y - this.swipeData.end.y;

        if (Math.sqrt(distanceX ** 2) > Math.sqrt(distanceY ** 2)) {
            direction = distanceX > 0 ? 'left' : 'right';
        } else {
            direction = distanceY > 0 ? 'up' : 'down';
        }

        return direction;
    }

    publishEvent() {
        const swipeEvent = new CustomEvent('swipe', {
            bubbles: true,
            detail: this.swipeData,
        });
        this.el.dispatchEvent(swipeEvent);
    }
}
