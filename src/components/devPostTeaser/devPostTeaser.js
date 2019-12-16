module.exports = class devPostTeaser {
    constructor(el) {
        this.el = el;
        this.titleEl = el.querySelector('[data-dev-post-teaser-el="title"]');
        this.linkEl = el.querySelector('[data-dev-post-teaser-el="link"]');
        this.reactionsEl = el.querySelector('[data-dev-post-teaser-el="reactions"]');
        this.commentsEl = el.querySelector('[data-dev-post-teaser-el="comments"]');
        this.postData = Object();
        this.api = 'https://dev.to/api/articles';
        this.id = this.el.dataset.devPostTeaserId ? this.el.dataset.devPostTeaserId : null;
        this.errorMessage = null;

        this.StateMachine = new StateMachine(this, {
            loading: {
                event: 'devPostTeaserLoading',
                on: 'loadPost',
            },
            loaded: {
                event: 'devPostTeaserLoaded',
                on: 'displayPost',
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
            this.errorMessage = 'No post id set';
            EventBus.publish('devPostTeaserError', this.el);
            return;
        }
        EventBus.publish('devPostTeaserLoading', this.el);
    }

    loadPost() {
        fetch(`${this.api}/${this.id}`, {
            credentials: 'omit',
        })
            .then((response) => (response.status === 200 ? response.text() : false))
            .then((responseText) => this.parsePost(responseText))
            .catch((error) => {
                this.errorMessage = error;
                EventBus.publish('devPostTeaserError', this.el);
            });
    }

    parsePost(postResponse) {
        if (!postResponse) {
            this.errorMessage = 'No post reponse';
            EventBus.publish('devPostTeaserError', this.el);
            return;
        }

        let postObj = Object();

        try {
            postObj = JSON.parse(postResponse);
        } catch (e) {
            this.errorMessage = 'Could\'t parse post object';
            EventBus.publish('devPostTeaserError', this.el);
            return;
        }

        this.postData.link = postObj.url ? postObj.url : String();
        this.postData.title = postObj.title ? postObj.title : String();
        this.postData.reactions = postObj.positive_reactions_count
            ? postObj.positive_reactions_count : 0;
        this.postData.comments = postObj.comments_count ? postObj.comments_count : 0;

        EventBus.publish('devPostTeaserLoaded', this.el);
    }

    displayPost() {
        this.linkEl.setAttribute('href', this.postData.link);
        this.titleEl.innerText = this.postData.title;
        this.reactionsEl.innerText = this.postData.reactions > 0 ? this.postData.reactions : 0;
        this.commentsEl.innerText = this.postData.comments > 0 ? this.postData.comments : 0;
    }

    throwError() {
        console.error('Post failed:', this.id, this.errorMessage);
    }
};
