chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const { url } = details;
        chrome.storage.sync.get(['baseURL', 'redirectURL'], function (result) {
            const { baseURL, redirectURL } = result;
            if (baseURL && redirectURL && url.includes(baseURL)) {
                return { redirectUrl: url.replace(baseURL, redirectURL) };
            }
        });
    },
    { urls: ['<all_urls>'] },
    ['blocking']
);
