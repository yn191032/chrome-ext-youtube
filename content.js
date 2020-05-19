const ytElements = [
    'ytd-rich-item-renderer',
    'ytd-compact-video-renderer', 
    'ytd-video-renderer',
    'ytd-grid-video-renderer',
    'ytd-channel-renderer',
    'ytd-comment-thread-renderer',
    'ytd-grid-channel-renderer',
    'ytd-search-refinement-card-renderer',
    'ytd-playlist-renderer',
];

const regexes = [
    /key word 1/gi,
    /key word 2/gi,
];

const log = console.log;

const isYoutubeElement = node => ytElements.some(yte => yte === node.localName);

const isRestricted = node => regexes.some(r => node.innerHTML.match(r));

const blurElement = node => {
    if (node.style) {
        node.style.filter = 'blur(6px) grayscale(0.8) opacity(0.2)';
    }
};

const changeElement = node => {
    if (isYoutubeElement(node)) {
        if (isRestricted(node)) {
            node.childNodes.forEach(blurElement);
            log(node);
        }
    }
};

const observer = new MutationObserver((mutations) => {
    mutations.forEach(m => {
        m.addedNodes.forEach(changeElement);
    });
});

observer.observe(document.body, { childList: true, subtree: true });

document.querySelectorAll(ytElements).forEach(changeElement);