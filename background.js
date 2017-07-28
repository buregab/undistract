var blocked_urls = []

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var blocked = false;
		for (i = 0; i < blocked_urls.length; i++) {
			blocked = (details.url.indexOf(blocked_urls[i]) != -1) || blocked;
		}
		return {cancel: blocked};
	},
	{urls: ["<all_urls>"]},
	["blocking"]
);

function loadBlockedUrls() {
	chrome.storage.sync.get('blocked_urls', function(data) {
		blocked_urls = data;
	});
}

function updateBlockedUrls(new_url) {
	blocked_urls.push(new_url);
	chrome.storage.sync.set({'blocked_urls', blocked_urls}, function() {
		alert("Your blocked urls were updated!")
	});
}

loadBlockedUrls();

