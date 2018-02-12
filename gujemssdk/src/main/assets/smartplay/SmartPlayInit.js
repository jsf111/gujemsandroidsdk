SmartPlay('#container', {
	uiLayout: 'overlay',

	adRequest: %1$s,
	headerText: '%2$s',
    skipOffset: %3$d,
	
	debug: true,

	featureMatrix: {
		'layout': {
			source: 'https://cdn.smartclip.net/multiplayer/4.4.0/style.css'
		},
		'endingScreen': {
			enabled: false
		},
		'bestFit': {
			enabled: false
		}
	},

	behaviourMatrix: {
		'init': { muted: false, collapsed: false },
		'onScreen': { muted: false }
	},

	onStartCallback: function() {
		try {
			window.androidAppProxy.onStartCallback();
		} catch(err) {}
	},

	onEndCallback: function() {
		try {
			window.androidAppProxy.onEndCallback();
		} catch(err) {}
	},

	onCappedCallback: function() {
		try {
			window.androidAppProxy.onCappedCallback();
		} catch(err) {}
	},

	onPrefetchCompleteCallback: function() {
		try {
			window.androidAppProxy.onPrefetchCompleteCallback();
		} catch(err) {}
	},

	prefetching: true
});
