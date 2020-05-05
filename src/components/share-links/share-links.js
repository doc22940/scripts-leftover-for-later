import Component from '../../helpers/component';

export default class shareLinks extends Component {
    prepare() {
        this.title = this.el.dataset.shareLinksTitle || '';
        this.text = this.el.dataset.shareLinksText || '';
        this.url = this.el.dataset.shareLinksUrl;
    }

    init() {
        if (!this.url) { return; }

        this.boundOnClick = (event) => { this.onClick(event); };
        this.el.addEventListener('click', this.boundOnClick);
    }

    onClick(event) {
        event.preventDefault();

        if (navigator.share) {
            this.el.removeAttribute('hidden');

            navigator.share({
                title: this.title,
                text: this.text,
                url: this.url,
            });
        }
    }
}
