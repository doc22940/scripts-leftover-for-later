const Global = require('../../helpers/globals.js');

module.exports = class devPostTeaser {
    constructor(el) {
        this.el = el;
        this.titleEl = el.querySelector('[data-dev-post-teaser-el="title"]');
        this.linkEl = el.querySelector('[data-dev-post-teaser-el="link"]');
        this.bodyEl = el.querySelector('[data-dev-post-teaser-el="body"]');
        this.api = 'https://dev.to/api/articles';
        this.id = this.el.dataset.devPostTeaserId ? this.el.dataset.devPostTeaserId : null;
        this.postTitle = String();

        this.StateMachine = new Global.StateMachine(this, {
            loading: {
                event: 'devPostTeaserLoading',
                on: 'loadPost',
            },
            loaded: {
                event: 'devPostTeaserLoaded',
                on: 'displayPost',
            },
            finished: {
                event: 'devPostTeaserFinished',
            },
            error: {
                event: 'devPostTeaserError',
                on: 'throwError',
            },
        });

        this.init();
    }

    init() {
        if (!this.id) {
            Global.EventBus.publish('devPostTeaserError', this.el);
            return;
        }
        Global.EventBus.publish('devPostTeaserLoading', this.el);
    }

    loadPost() {
        fetch(`${this.api}/${this.id}`, {
            credentials: 'omit',
        })
            .then((response) => response.text())
            .then((responseText) => this.parsePost(responseText))
            .catch(() => {
                Global.EventBus.publish('devPostTeaserError', this.el);
            });
    }

    parsePost(postResponse) {
        if (!postResponse) {
            Global.EventBus.publish('devPostTeaserError', this.el);
            return;
        }

        try {
            const postObj = JSON.parse(postResponse);
            this.postLink = postObj.url ? postObj.url : this.postLink;
            this.postTitle = postObj.title ? postObj.title : this.postTitle;
        } catch (e) {
            Global.EventBus.publish('devPostTeaserError', this.el);
            return;
        }

        Global.EventBus.publish('devPostTeaserLoaded', this.el);
    }

    displayPost() {
        this.linkEl.setAttribute('href', this.postLink);
        this.titleEl.innerText = this.postTitle;
    }

    throwError() {
        console.error('post failed', this.id);
    }
};
