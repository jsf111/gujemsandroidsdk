window._smartclip_amp = {};
window.context = {
	initialIntersection: {
		rootBounds: {x: 0, y: 0, width: parseInt(%1$d, 10), height: parseInt(%2$d, 10)}
	},
	requestResize: function() {},
	renderStart: function() {},
	observeIntersection: function(callback) {
		window.observeIntersectionCallback = callback;
	},
	onResizeDenied: function() {}
};
