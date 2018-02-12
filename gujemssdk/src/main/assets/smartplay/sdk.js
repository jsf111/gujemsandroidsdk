(function() {
	var Y = {
		scope: {},
		getGlobal: function(b) {
			return "undefined" != typeof window && window === b ? b : "undefined" != typeof global ? global : b
		}
	};
	Y.global = Y.getGlobal(this);
	Y.initSymbol = function() {
		Y.global.Symbol || (Y.global.Symbol = Y.Symbol);
		Y.initSymbol = function() {}
	};
	Y.symbolCounter_ = 0;
	Y.Symbol = function(b) {
		return "jscomp_symbol_" + b + Y.symbolCounter_++
	};
	Y.initSymbolIterator = function() {
		Y.initSymbol();
		Y.global.Symbol.iterator || (Y.global.Symbol.iterator = Y.global.Symbol("iterator"));
		Y.initSymbolIterator = function() {}
	};
	Y.makeIterator = function(b) {
		Y.initSymbolIterator();
		if (b[Y.global.Symbol.iterator]) return b[Y.global.Symbol.iterator]();
		if (!(b instanceof Array || "string" == typeof b || b instanceof String)) throw new TypeError(b + " is not iterable");
		var e = 0;
		return {
			next: function() {
				return e == b.length ? {
					done: !0
				} : {
					done: !1,
					value: b[e++]
				}
			}
		}
	};
	Y.arrayFromIterator = function(b) {
		for (var e, f = []; !(e = b.next()).done;) f.push(e.value);
		return f
	};
	Y.arrayFromIterable = function(b) {
		return b instanceof Array ? b : Y.arrayFromIterator(Y.makeIterator(b))
	};
	Y.arrayFromArguments = function(b) {
		for (var e = [], f = 0; f < b.length; f++) e.push(b[f]);
		return e
	};
	Y.inherits = function(b, e) {
		function f() {}
		f.prototype = e.prototype;
		b.prototype = new f;
		b.prototype.constructor = b;
		for (var g in e) if (Y.global.Object.defineProperties) {
			var r = Y.global.Object.getOwnPropertyDescriptor(e, g);
			void 0 !== r && Y.global.Object.defineProperty(b, g, r)
		} else b[g] = e[g]
	};
	var la = {};

	function ra(b) {
		for (var e = window.frameElement, f = window; e;) e = e.ownerDocument, f = e.defaultView, (b || function() {})(e), e = f.frameElement;
		return f
	}
	function xa(b, e) {
		var f = e || document,
			g = b.split("/").join("\\/");
		return Array.prototype.map.call(f.querySelectorAll(g), function(b) {
			return b
		})
	}
	la.eachDocument = ra;
	la.find = xa;
	la.findRecursiveUp = function(b) {
		var e = xa(b);
		ra(function(f) {
			e = e.concat(xa(b, f))
		});
		return e
	};
	(function() {
		function b() {}
		function e() {}
		function f() {
			function a() {
				for (var c = window.frameElement, b = window; c;) b = c.ownerDocument.defaultView, c = b.frameElement;
				return b
			}
			function b(a) {
				return new RegExp("[\\[%]+" + a + "[\\]%]+", "gi")
			}
			function d(a) {
				return encodeURIComponent(a).replace(/[!'()*]/g, function(a) {
					return "%" + a.charCodeAt(0).toString(16)
				})
			}
			function k(a, c, b) {
				if (-1 === a.indexOf(c)) return a;
				var p = a.substr(a.indexOf(c), a.indexOf("]", a.indexOf(c)) - a.indexOf(c) + 1),
					h = 0 <= p.indexOf("|") ? parseInt(p.split("|")[1].slice(0, -1), 10) : 0;
				a = 0 === h ? a.replace(p, d(b)) : a.replace(p, d(b.substr(0, h)));
				0 <= a.indexOf(c) && (a = k(a, c, b));
				return a
			}
			var aa = {}, h = {
				timeOffset: 0,
				assetUri: "",
				pageUri: "",
				pageTitle: "",
				techVersion: "",
				videoData: {}
			}, W = {};
			aa.errorCode = function(a, c) {
				return c ? a.replace(b("(errorcode)"), d(c)) : a
			};
			aa.H = function(a) {
				if (!a) return a;
				var c;
				if (c = h.timeOffset) {
					var t = new Date(null);
					t.setSeconds(c);
					c = t.toISOString().substr(11, 8) + ".000"
				} else c = !1;
				W.contentplayhead = d(c || "00:00:00.000");
				a = a.replace(b("(contentplayhead)"), d(c || "00:00:00.000"));
				if (c = h.assetUri) a = a.replace(b("(asseturi)"), d(c)), a = k(a, "[ASSETURI", c), W.asseturi = d(c);
				if (c = h.pageUri) a = a.replace(b("(pageuri)"), d(c)), a = k(a, "[pageuri", c), W.pageuri = d(c);
				if (c = h.pageTitle) a = a.replace(b("(pagetitle)"), d(c)), W.pagetitle = d(c);
				if (c = h.techVersion) a = a.replace(b("(techversion)"), d(c)), W.techversion = d(c);
				c = b("(cachebusting|cache_?buster|rand(om|num))");
				t = d(Math.round(1E8 * Math.random()));
				W.cachebusting = t;
				W.cachebuster = t;
				W.random = t;
				W.randnum = t;
				a = a.replace(c, t);
				t = new Date;
				c = t.toISOString();
				t = t.getTimezoneOffset() / 60;
				t = t.toString().split("");
				2 === t.length && t.splice(1, 0, "0");
				t = t.join("");
				c = c.replace("Z", t);
				W.timestamp = d(c);
				a = a.replace(b("(timestamp)"), d(c));
				if (c = h.videoData) a = a.replace(b("(dimension)"), d(c.width + "x" + c.height)), a = a.replace(b("(player_width)"), d(c.width)), a = a.replace(b("(player_height)"), d(c.height)), W.dimension = d(c.width + "x" + c.height), W.player_width = d(c.width), W.player_height = d(c.height);
				return a
			};
			aa.getCurrentModel = function() {
				var a = {};
				Object.keys(W).forEach(function(c) {
					a["[" + c + "]"] = W[c]
				});
				return a
			};
			aa.setValueFor = function(a, c) {
				h[a] = c
			};
			(function() {
				var b = a().location.href,
					d = a().document.title;
				window.Kc && (b = window.context.location.href, d = window.context.Wc);
				aa.setValueFor("pageUri", b);
				aa.setValueFor("pageTitle", d);
				aa.setValueFor("techVersion", [A.IDENTIFIER, A.API_VERSION, A.API_BUILD].join("|"))
			})();
			return aa
		}
		function g(c, b, d) {
			function k(c, b) {
				var d = {};
				e.prototype.apply(this);
				var p = function(a, c) {
					var b = -1 !== String(a).indexOf("onTrack") ? c : null,
						b = null === b ? a : "AdVideo" + (b[0].toUpperCase() + b.slice(1));
					"AdVideoResume" === b && (b = "AdVideoPlay");
					this.dispatchEvent(b, c)
				}.bind(this);
				d.adManager = c;
				d.handshakeVersion = function() {
					return "2.0"
				};
				d.initAd = function(b, d, h, k, t, Z) {
					if (Z && Z.rules) for (b = Z.rules.length - 1; 0 <= b; b--) a.kb(Z.rules[b]) && c.ua(Z.rules[b]);
					c.registerGlobalEventDispatcher(p)
				};
				d.startAd = function() {
					c.start()
				};
				d.stopAd = function() {
					c.destroy()
				};
				d.skipAd = function() {
					this.dispatchEvent("AdSkipped");
					c.skipAd()
				}.bind(this);
				d.resizeAd = function(a, d) {
					b.style.width = parseInt(a, 10) + "px";
					b.style.height = parseInt(d, 10) + "px";
					c.resize()
				};
				d.pauseAd = function() {
					c.pauseAd()
				};
				d.resumeAd = function() {
					c.resumeAd()
				};
				d.expandAd = function() {};
				d.collapseAd = function() {};
				d.setAdVolume = function(a) {
					c.setAdVolume(a)
				};
				d.subscribe = function(a, c, b) {
					this.addEventListener(c, a, b)
				}.bind(this);
				d.unsubscribe = function(a, c) {
					this.removeEventListener(c, a)
				}.bind(this);
				return d
			}
			if (!c.getAttribute("data-ois-instance-id")) {
				c.setAttribute("data-ois-instance-id", ga.length);
				var aa = null;
				b.displaySlot && b.displaySlot.nodeType && (aa = b.displaySlot);
				"string" === typeof b.displaySlot && (aa = a.find(b.displaySlot)[0] || null);
				var h = new Q(c, aa),
					aa = new q(b),
					h = new C(h, aa),
					W = new k(h, c),
					z = {
						adManager: h,
						config: aa
					};
				ua.forEach(function(a) {
					a(W, c, b, z)
				});
				ga.push({
					ea: W,
					element: c,
					jc: b,
					adManager: h,
					w: aa
				});
				(d || Function)()
			}
			return ga[c.getAttribute("data-ois-instance-id")].ea
		}
		function r(c) {
			function b(a) {
				var c = 0,
					d = 0;
				try {
					if (a.offsetParent) for (c = a.offsetLeft, d = a.offsetTop;
					(a = a.offsetParent) && "BODY" !== a.tagName.toUpperCase();) c += a.offsetLeft, d += a.offsetTop
				} catch (p) {}
				return {
					left: c,
					top: d
				}
			}
			var d = {
				m: {
					width: 0,
					height: 0,
					left: 0,
					top: 0
				},
				j: {
					width: 0,
					height: 0,
					left: 0,
					top: 0
				},
				U: !1,
				N: 0,
				Oa: 0,
				Pa: 0,
				Na: 0
			}, k = [],
				aa = "ois_" + a.Wa().split("-").join(""),
				h, W;
			this.ha = function() {
				"undefined" == typeof W && (W = window.self === window.top ? window.self : window.top);
				if ("undefined" == typeof h) try {
					h = W.document
				} catch (a) {
					h = window.document
				}
				d.m = {
					width: h.documentElement.clientWidth || W.innerWidth || h.body.clientWidth,
					height: h.documentElement.clientHeight || W.innerHeight || h.body.clientHeight,
					left: W.scrollX || h.documentElement.scrollLeft || h.body.scrollLeft,
					top: W.scrollY || h.documentElement.scrollTop || h.body.scrollTop
				};
				var z = b(c);
				if (window.self !== window.top) try {
					var l;
					a: {
						var t = top.document.getElementsByTagName("iframe"),
							e;
						for (e in t) try {
							if (t[e].contentWindow[aa]) {
								l = t[e];
								break a
							}
						} catch (a) {}
						l = void 0
					}
					var n = b(l);
					z.left += n.left;
					z.top += n.top
				} catch (a) {}
				d.j = {
					width: c.offsetWidth,
					height: c.offsetHeight,
					left: z.left,
					top: z.top
				};
				d.m.left >= d.j.left + d.j.width || d.m.top >= d.j.top + d.j.height || d.j.left >= d.m.left + d.m.width || d.j.top >= d.m.top + d.m.height ? (d.N = 0, d.U = !1) : 0 >= d.j.width || 0 >= d.j.height ? (d.N = 0, d.U = !1) : d.j.left >= d.m.left && d.j.top >= d.m.top && d.j.left + d.j.width <= d.m.left + d.m.width && d.j.top + d.j.height <= d.m.top + d.m.height ? (d.N = 100, d.U = !0) : (z = d.j.width, l = d.j.height, d.j.left < d.m.left ? z = d.j.width - (d.m.left - d.j.left) : d.j.left + d.j.width > d.m.width + d.m.left && (z = d.m.width - (d.j.left - d.m.left)), d.j.top < d.m.top ? l = d.j.height - (d.m.top - d.j.top) : d.j.top + d.j.height > d.m.height + d.m.top && (l = d.m.height - (d.j.top - d.m.top)), d.N = Math.floor(z * l / (d.j.width * d.j.height) * 100), 0 < d.N && (d.U = !0));
				1 == d.U ? (d.Oa += .25, d.Pa = .25) : d.Pa = 0;
				d.Na += .25;
				k.push(d.U);
				return d
			};
			window[aa] = aa
		}
		function C(c, b) {
			function d() {
				D.f(1010);
				D.f(1020);
				D.f(1030);
				D.f(1040);
				D.f("AdLoaded");
				D.f("START_LINEAR", V);
				D.f("START_NONLINEAR", V);
				D.f("AdStopped", V);
				c.f("CONTROLS_ON", V);
				c.f("CONTROLS_OFF", V);
				c.off("play,pause,ended,timeupdate,volumechange,error,durationchange", e)
			}
			function k() {
				K = c.l("currentSrc");
				Z = c.l("currentSrcType");
				a.g(c.l("currentSrc")) && (b.Yc = a.Ac(c.l("currentSrc")));
				y.log(101, K)
			}
			function aa() {
				return K ? c.l("currentSrc") == K : !0
			}
			function h(a) {
				a = "object" === typeof a ? a.info : a;
				!1 !== a && (a = !0);
				y.log(100, a);
				c.setControls(a)
			}
			function e(d) {
				"timeupdate" != d.type && y.log(101, d.type);
				if (!0 === l()) switch (d.type) {
					case "play":
					case "error":
						var n = v.O(0);
						n && (a.C || c.M(), k(), D.startAd(n));
						!0 === eb && (eb = !1, k(), l(!1))
				}
				switch (d.type) {
					case "error":
						y.log(102, d.type, c.l("src"));
						!D || aa() && !D.ja() || D.ja() || D.ub();
						break;
					case "timeupdate":
						d = c.l("duration");
						n = c.l("currentTime");
						!l() && n > b.overlayDelay && n < d - 5 && aa() && (v.Bc(d), d = v.O(n)) && ("fixedroll" == d.type && (k(), D.startAd(d)), "overlay" != d.type || a.ta && null === c.ca().getAttribute("webkit-playsinline") || D.startAd(d));
						d = c.l("duration");
						n = c.l("currentTime");
						n < d && n > d - 1 && aa() && a.C && (v.Wb(d) ? (f = 1, (d = v.O(d)) ? (k(), D.startAd(d)) : (D.ja() && D.pa(), t())) : g = !0);
						break;
					case "ended":
						!a.C && aa() && (fa = !0, (d = v.O(c.l("duration"))) ? (k(), D.startAd(d)) : (D.ja() && D.pa(), t()), c.M());
						if (aa() && a.C && 1 == f) f = 2;
						else if (aa() && a.C && 2 == f || g) t(), f = 3;
						break;
					case 1030:
						c.sb(!0);
						d = c.l("currentTime");
						0 != d && aa() && (ha = Number(Number(d).toFixed(1)));
						z(!1);
						h(!1);
						l(!0);
						break;
					case 1020:
						c.sb(!1), z() ? fa && t() : (c.ka({
							url: K,
							type: Z
						}, null == ha || 0 == ha || fa ? !1 : ha, fa), fa && !a.C && t(), z(!0), h(!0), l(!1))
				}
			}
			function z(a) {
				if (void 0 != a) x = a;
				else return x
			}
			function l(a) {
				if (void 0 != a) n = a;
				else return n
			}
			function t() {
				y.log(104);
				c.M();
				if (b.onFinish) b.onFinish();
				d()
			}
			function V(a) {
				if (u[a.type]) u[a.type](a);
				"AdStopped" === a.type && v.fc() && V({
					type: "BLOCK_DONE"
				})
			}
			var n = !0,
				x = !1,
				u = {}, D, v, K, Z, ha = null,
				fa = !1,
				f = !1,
				g = !1,
				eb = !0,
				m = new a.events.s;
			this.registerGlobalEventDispatcher = m.registerGlobalEventDispatcher;
			this.destroy = function() {
				D && (y.log(105), D.Eb() && D.pa(), d())
			};
			this.start = function() {
				var a = c.l("currentSrc");
				/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && l() && !a ? e({
					type: "play"
				}) : c.S()
			};
			this.onAdLoadCompleteCallback = function(c) {
				D && D.a("AdLoaded", a.isFunction(c) ? c : function() {})
			};
			this.setControllerEvents = function(a) {
				u = a
			};
			this.Rb = function() {
				return c.Rb()
			};
			this.pauseAd = function() {
				D.pauseAd()
			};
			this.resumeAd = function() {
				D.resumeAd()
			};
			this.resize = function() {
				var a = document.createEvent("HTMLEvents");
				a.initEvent("resize", !0, !1);
				c.ca().dispatchEvent(a)
			};
			this.ua = function(a) {
				D.ua(a)
			};
			this.setAutoplay = function(a) {
				D.setAutoplay(a)
			};
			this.startLinear = function() {
				D.startLinear()
			};
			this.setVpaidAd = function(a) {
				D.setVpaidAd(a)
			};
			this.triggerEvent = function(a, c) {
				m.triggerEvent(a, c)
			};
			this.clickThrough = function() {
				D.clickThrough()
			};
			this.trackingController = function() {
				return D.trackingController()
			};
			this.skipAd = function() {
				D.skipAd()
			};
			this.setAdVolume = function(a) {
				D.setAdVolume(a)
			};
			this.startAd = function(a) {
				D.startAd(a)
			};
			this.getAdConfig = function() {
				return D.getAdConfig()
			};
			y.log(109, A.API_VERSION);
			v = new J(b);
			D = new w(c, b);
			D.registerGlobalEventDispatcher(m.G);
			c.registerGlobalEventDispatcher(m.G);
			D.a(1010, h);
			D.a(1020, e);
			D.a(1030, e);
			D.a(1040, function(a) {
				y.log(103);
				if (b.onCompanion) b.onCompanion(a.info.Fb, a.info.zc);
				b.companionCallback && b.companionCallback(a.info.Fb, a.info.zc)
			});
			D.a("START_LINEAR", V);
			D.a("START_NONLINEAR", V);
			D.a("AdStopped", V);
			c.a("CONTROLS_ON", V);
			c.a("CONTROLS_OFF", V);
			c.on("play,pause,ended,timeupdate,volumechange,error,durationchange", e)
		}
		function q(c) {
			function b() {
				for (var a in z) "undefined" !== typeof l[a] && (l[a] = d(z[a], l.fa[a]))
			}
			function d(a, c) {
				switch (typeof c) {
					case "number":
						return !a || isNaN(parseInt(a, 10)) ? c : parseInt(a, 10);
					case "object":
						for (var b in c) a[b] = a[b] ? d(a[b], c[b]) : c[b];
						break;
					default:
						if (void 0 === a || null === a) return c
				}
				return a
			}
			function k() {
				4 == t.readyState && (200 == t.status ? aa() : l.K && l.K(l))
			}
			function aa() {
				var a = V.parse(t.responseText.toString());
				l.ma(a);
				if (l.onConfigLoaded) l.onConfigLoaded(l)
			}
			function h() {
				l.K && l.K(l)
			}
			var e = {
				key: "",
				preroll: "",
				midroll: "",
				postroll: "",
				overlay: "",
				fixedroll: "",
				fixedrolls: [],
				overlayDelay: 5,
				overlayDuration: 15,
				minDurationForMidrolls: 100,
				customControls: !1,
				urlhandler: "",
				adCountdownText: "",
				adCountdownPosition: "top",
				skipButtonPosition: "top",
				skipButtonText: "Skip this Ad",
				clickThroughDialogText: {
					query: "Open Advertiser Website?",
					reject: "Cancel",
					accept: "Open"
				},
				clickThroughDialogEnabled: !0,
				styles: {
					colorScheme: {
						backgroundColor: "rgba(0,0,0,.8)",
						color: "#ffffff"
					},
					fontStyle: {
						textAlign: "left",
						fontFamily: "Arial,sans,Verdana",
						fontSize: "12px",
						lineHeight: "20px"
					},
					dialogBox: {
						width: "200px",
						padding: "7px",
						border: "1px solid #ffffff",
						borderRadius: "3px"
					},
					buttonStyle: {
						width: "80px",
						height: "25px",
						margin: "2px",
						marginTop: "9px",
						border: "1px solid #ffffff",
						borderRadius: "3px",
						lineHeight: "0px",
						textAlign: "center"
					}
				},
				onCompanion: null,
				companionCallback: null,
				onTrack: function() {},
				onFinish: null,
				vpaidSingleVideoSlotMode: !0,
				Gc: "",
				vastExtensions: {},
				qb: !0
			}, z = c,
				l = this;
			l.fa = e;
			var t, V = new N;
			this.Ob = function() {
				return l
			};
			this.ma = function(c) {
				z = c;
				b();
				a.jb(c) && (l.onConfigLoaded = c.onConfigLoaded, l.K = c.K, l.ob(c.externalConfigXml))
			};
			this.ob = function(c) {
				c = a.urlEnrichment.H(c);
				t = window.XDomainRequest ? new window.XDomainRequest : new XMLHttpRequest;
				window.XDomainRequest ? (t.onload = aa, t.onerror = h, t.open("GET", c)) : (t.open("GET", c, !0), t.onreadystatechange = k);
				t.send()
			};
			this.K = this.onConfigLoaded = null;
			this.id = "test";
			(function() {
				l.fa = e;
				for (var a in l.fa) l[a] = l.fa[a]
			})();
			b();
			a.jb(c) && (l.onConfigLoaded = c.onConfigLoaded, l.K = c.K, l.ob(c.externalConfigXml))
		}
		function L() {
			function c(a) {
				var c = d.filter(function(c) {
					return c.hasOwnProperty(a)
				});
				if (!(1 >= c.length)) {
					var b = d.filter(function(c) {
						return !c.hasOwnProperty(a)
					}),
						c = c.map(function(c) {
							return c[a]
						}).join("|");
					if (-1 === c.indexOf("true") || -1 === c.indexOf("false")) {
						var p = {};
						p[a] = c;
						b.push(p)
					}
					d = b
				}
			}
			var b = new a.events.s;
			a.Tb();
			var d = [],
				k = a.Nb();
			this.a = b.a;
			this.f = b.f;
			this.registerGlobalEventDispatcher = b.registerGlobalEventDispatcher;
			this.addRule = function(a) {
				if ("type" === Object.keys(a).shift()) d.push(a);
				else return c("type"), c("scalable"), c("maintainaspectratio"), d = d.concat([a]).reduce(function(a, c, b) {
					var d = Object.keys(c).shift();
					d in a.keys ? a.result[a.keys[d]] = c : (a.keys[d] = b, a.result.push(c));
					return a
				}, {
					result: [],
					keys: {}
				}).result, this
			};
			this.removeRule = function(a) {
				d = d.filter(function(c) {
					return Object.keys(c).shift() !== a
				})
			};
			this.eb = function() {
				c("type");
				c("scalable");
				c("maintainaspectratio");
				return d
			};
			this.gc = function() {
				d.push({
					delivery: "progressive"
				});
				for (var c in k) k.hasOwnProperty(c) && d.push({
					type: k[c].Ha
				});
				d.push({
					type: a.la
				});
				d.push({
					width: 5E3
				});
				d.push({
					bitrate: a.$a() || 5E3
				});
				d.push({
					apiFramework: "VPAID"
				})
			};
			this.gc()
		}
		function Q(c, b) {
			function d(a) {
				"play" !== a.type || c.commercial || (ha = !1);
				"pause" !== a.type || c.commercial || (ha = !0)
			}
			function k() {
				f.on(c, "timeupdate,ended", e);
				K = setTimeout(function() {
					!1 === D && (y.log(805), f.off(c, "timeupdate,ended", e), W(x), c.load(), v(), c.play(), u = !1)
				}, 15E3)
			}
			function e(a) {
				"timeupdate" === a.type && (D = !0, clearTimeout(K), c.seekable.end(0) >= c.duration && 6E3 !== c.duration && 100 !== c.duration && (y.log(803, c.duration), c.currentTime = c.duration, f.off(c, "timeupdate", e)));
				"ended" === a.type && (y.log(804, a.type), W(x), c.load(), v(), c.play(), f.off(c, "ended", e), u = !1)
			}
			function h() {
				try {
					c.seekable.end(0) >= n && 0 < c.currentTime && (c.currentTime = n, f.off(c, "timeupdate", h), y.log(801, n))
				} catch (a) {
					y.log(802, a)
				}
			}
			function W(b) {
				if (a.zb) for (var d = c.getElementsByTagName("source"), p = b.split("."), h, p = p[p.length - 1], D = 0; D < d.length; D++) if (h = d[D].src.split("."), h = h[h.length - 1], h === p) {
					d[D].src = b;
					return
				}
				c.src = b
			}
			function z(a, c) {
				var b = null;
				window.getComputedStyle ? b = parseFloat(window.getComputedStyle(a, "").getPropertyValue(c)) : a.currentStyle && (b = parseFloat(a.currentStyle[c]));
				return b ? b.toFixed(2) + "px" : null
			}
			function l(a) {
				g.triggerEvent(5010, a.type || void 0)
			}
			function t() {
				c.muted && !1 === fa ? (fa = !0, g.triggerEvent(5020, !0)) : c.muted || !0 !== fa || (fa = !1, g.triggerEvent(5020, !1))
			}
			var V, n, x, u = !1,
				D = !1,
				v, K, Z, ha, fa = !1,
				f, g = new a.events.s;
			this.l = function(a) {
				if (a) switch (a) {
					case "currentTime":
						return c.currentTime;
					case "duration":
						return c.duration;
					case "currentSrc":
						return c.currentSrc;
					case "currentSrcType":
						return "-unused-";
					case "src":
						return c.src;
					case "controls":
						return c.controls;
					case "paused":
						return c.paused;
					case "volume":
						return c.volume;
					default:
						return null
				}
				return {
					currentTime: c.currentTime,
					duration: c.duration,
					currentSrc: c.currentSrc,
					src: c.src,
					controls: c.controls,
					paused: c.paused,
					volume: c.volume
				}
			};
			this.sb = function(a) {
				c && (c.commercial = a)
			};
			this.o = function(a) {
				if (a) switch (a) {
					case "width":
						return Math.round(c.getBoundingClientRect().width);
					case "height":
						return Math.round(c.getBoundingClientRect().height);
					case "top":
						return Math.round(c.getBoundingClientRect().top - document.body.getBoundingClientRect().top);
					case "left":
						return Math.round(c.getBoundingClientRect().left - document.body.getBoundingClientRect().left);
					default:
						return null
				}
				return {
					width: Math.round(c.getBoundingClientRect().width),
					height: Math.round(c.getBoundingClientRect().height),
					top: Math.round(c.getBoundingClientRect().top - document.body.getBoundingClientRect().top),
					left: Math.round(c.getBoundingClientRect().left - document.body.getBoundingClientRect().left)
				}
			};
			this.M = function() {
				c.pause()
			};
			this.S = function() {
				ha || c.play()
			};
			this.ka = function(b, d, p) {
				y.log(806, b, d, p);
				x = a.kb(b) ? b.url : b;
				Z || (c.width || c.style.width || (c.style.width = z(c, "width") || "100%"), c.height || c.style.height || (c.style.height = z(c, "height") || "100%"), Z = !0);
				a.C && u ? k() : (W(x), c.load(), d && (n = d, f.on(c, "timeupdate", h)), p || c.play())
			};
			this.tc = function(a, c) {
				y.log(807, a);
				u = a;
				v = c
			};
			this.setControls = function(a) {
				c.controls = a
			};
			this.getParent = function() {
				return b || c.parentNode
			};
			this.rc = function(a) {
				V = a;
				f.on(c, "click", V)
			};
			this.Fa = function() {
				f.off(c, "click", V)
			};
			this.on = function(a, b) {
				f.on(c, a, b)
			};
			this.off = function(a, b) {
				f.off(c, a, b)
			};
			this.ca = function() {
				return c
			};
			this.a = g.a;
			this.f = g.f;
			this.registerGlobalEventDispatcher = g.registerGlobalEventDispatcher;
			this.destroy = function() {
				f.off(c, "mousedown", V);
				f.off(c, "timeupdate", h);
				f.off(c, "volumechange", t);
				f.off(c, "timeupdate,ended", e);
				f.off(window, "resize,orientationchange", l);
				f.off(document, "mozfullscreenchange,webkitfullscreenchange", l);
				f.off(c, "pause play", d)
			};
			f = new a.events.Event;
			f.on(window, "resize,orientationchange", l);
			f.on(document, "mozfullscreenchange,webkitfullscreenchange", l);
			c.muted && (fa = !0);
			f.on(c, "volumechange", t);
			f.on(c, "pause play", d)
		}
		function P(c) {
			function b() {
				W.triggerEvent("AdStopped", void 0)
			}
			function d(a, c, b) {
				t || (t = a);
				f || (f = c);
				n || (n = b)
			}
			function k(c) {
				v = c ? new window[ha](t, f, u, n, l) : new A.extensions[D](t, f, u, n, l);
				a.isFunction(v.a) && (v.a("PAUSEAD", x), v.a("RESUMEAD", x));
				h.push(v)
			}
			var e, h = [],
				W = new a.events.s,
				z, l = this,
				t, f, n, x, u, D, v, K, Z, ha, fa;
			this.a = W.a;
			this.f = W.f;
			this.R = function(c, b, p) {
				d(c, b, p);
				if (e && !(1 > e.length)) for (c = 0; c < e.length; c++) u = e[c], D = u.attributes[0].value, A.extensions[D] ? k(!1) : (K = f.w.vastExtensions, Z = Object.getOwnPropertyNames(K), Z.forEach(function(c) {
					ha = K[c].className || c;
					fa = K[c].src;
					ha === D && (window[ha] && "function" === typeof window[ha] ? k(!0) : fa && (c = a.createElement("script", {
						type: "text/javascript"
					}), document.head.appendChild(c), c.addEventListener("load", function() {
						k(!0)
					}, !1), c.src = fa))
				}))
			};
			this.destroy = function() {
				if (0 < h.length) for (var a = 0; a < h.length; a++) h[a].destroy && h[a].destroy();
				z && z.f("AdStopped", b);
				x = n = f = t = !1
			};
			this.onResize = function() {
				if (0 < h.length) for (var a = 0; a < h.length; a++) h[a].setViewport({
					width: c.o("width"),
					height: c.o("height")
				})
			};
			this.setup = function(a, c, d) {
				e = a;
				x = c;
				z = d;
				z.a("AdStopped", b);
				return l
			}
		}
		function w(c, b) {
			function d(c) {
				c = "fixedroll" === c ? I.ab() : I.cb();
				if (c.StaticResource) {
					var b = c.attributes.apiFramework ? c.attributes.apiFramework : "UNKNOWN";
					if (-1 != a.la.indexOf(c.resourceAttributes.creativeType.toLowerCase()) && "VPAID" == b.toUpperCase()) return y.log(R), !0
				} else if (c.apiFramework && "VPAID" == c.apiFramework.toUpperCase()) return !0;
				return !1
			}
			function k() {
				clearInterval(va);
				na = !1;
				va = setInterval(function() {
					r.Xb();
					var a = (new Date).getTime();
					void 0 == ta && (ta = a);
					a = parseInt(a - ta, 10) / 1E3;
					I.tb(a);
					a > parseInt(b.overlayDuration, 10) && fa()
				}, 250);
				na = !0;
				E.Ta()
			}
			function e(a) {
				E && (a.info ? E.Ua() : E.Va())
			}
			function h(a) {
				a.info && "fullscreen" === a.info && E.callTracker("fullscreen");
				a.info && "exitFullscreen" === a.info && E.callTracker("exitFullscreen");
				w && w.resizeAd(c.o("width"), c.o("height"), void 0);
				Da.onResize()
			}
			function W(a) {
				a = a.type;
				"play" === a && (a = "resume");
				E && E.callTracker(a)
			}
			function z(a) {
				function d(a, c) {
					switch (a) {
						case 4200:
							y.log(5E3);
							(Q = c) && Q.vc(oa.limit);
							break;
						case 4210:
							y.log(5001), Q = null
					}
				}
				I = new M(b, c);
				I.Cc(Wa);
				r = new S(c, I);
				r.a("AdClickThru", n);
				r.a(2020, n);
				r.registerGlobalEventDispatcher(q.G);
				I.a(3010, n);
				I.a(3020, n);
				I.a(3030, n);
				I.a(3035, n);
				I.a(3050, n);
				I.a(3040, n);
				I.a(7E3, n);
				I.registerGlobalEventDispatcher(function(a) {
					"AdTagSkipDetected" === a && (G = !0, y.log(5100))
				});
				I.registerGlobalEventDispatcher(q.G);
				I.registerGlobalEventDispatcher(d);
				I.a(4200, d);
				c.on("play", W);
				c.on("pause", W);
				c.a(5020, e);
				c.a(5010, h);
				"fixedroll" === F ? I.nb(oa.urls.shift()) : "overlay" === F && a && (null !== B ? (B.nonLinearsTracker.impression = [], B.gotLinear = !1, B.companion = [], B.companionsAsString = null, I.hc(B), B = null) : I.nb(a))
			}
			function l() {
				n({
					type: "RESUMEAD"
				})
			}
			function t() {
				c.off("ended", Z);
				E.Hb();
				"fixedroll" === F && oa.limit--;
				fa()
			}
			function f() {
				d("fixedroll") ? H ? w.resumeAd() : (r.$b(), D("fixedroll"), w.rb(O), v(), c.off("ended", Z), w.a(6050, Z), H = !0) : (g(1030), c.tc(J, v), c.ka(I.Aa(), !1), c.on("loadeddata", function Ca() {
					c.off("loadeddata", Ca);
					g("AdStarted")
				}), J = !1, a.C || v());
				g("START_LINEAR")
			}
			function n(h) {
				y.log(201, h.type);
				E || (E = new m(c, b, I, F), E.registerGlobalEventDispatcher(q.G), E.a("AdCapped"));
				E.Ia(I);
				switch (h.type) {
					case "PAUSEAD":
						if (!na && !ea) break;
						C = !0;
						g("AdPaused", !0);
						w ? w.pauseAd() : (c.M(), c.on("play", l));
						g(1010, !0);
						r.ya();
						break;
					case "RESUMEAD":
						if (!na && !ea) break;
						C = !1;
						g("AdPlaying", !0);
						w && (w.resumeAd(), g("onTrack", "play"));
						if (C || c.l("paused")) c.off("play", l), c.S();
						r.Xa();
						g(1010, !1);
						break;
					case 3010:
						E.Ia(I);
						g("AdLoaded", I.u());
						"overlay" === F && I.u().gotNonLinear ? (r.ac(), (h = I.Qb()) && h.attributes && h.attributes.minSuggestedDuration && 15 < a.L(h.attributes.minSuggestedDuration) && a.L(h.attributes.minSuggestedDuration) > b.overlayDuration && (b.va = b.overlayDuration, b.overlayDuration = a.L(h.attributes.minSuggestedDuration)), r.sc(h), d("overlay") && D("overlay"), k(), g("START_NONLINEAR")) : "fixedroll" == F && I.Aa() ? (r.R(), r.na(), G && r.bc(), r.a("SKIP", t), N && f()) : "fixedroll" !== F && "overlay" !== F || x(200);
						Da.R(r, I, E);
						break;
					case "AdClickThru":
						ha();
						break;
					case 3020:
						y.log(202, h.info);
						Q && Q.za();
						null != E && E.Z(h.info);
						fa();
						break;
					case 2020:
						y.log(203);
						E.Gb();
						"fixedroll" === F && oa.limit--;
						fa();
						break;
					case 3030:
						B = h.info;
						break;
					case 3035:
						Da.setup(h.info, n, U);
						break;
					case 3050:
						E.Sa(h.info, "cappedImpression");
						break;
					case 3040:
						E.Z(302);
						break;
					case 7E3:
						x(303)
				}
			}
			function x(a) {
				y.log(202, a);
				null !== E && E.Z(a);
				fa()
			}
			function u(a) {
				y.log(950, a.type);
				switch (a.type) {
					case 6010:
						Q && Q.za();
						null !== E && E.Z(901);
						w.f(6010, u);
						w = null;
						fa();
						break;
					case 6020:
						g(1030);
						break;
					case 6030:
						g(1020);
						break;
					case 6040:
					case 6050:
						Z();
						break;
					case 6060:
						ha(a.info)
				}
			}
			function D(a) {
				w = new X;
				w.a(6010, u);
				w.a(6020, u);
				w.a(6030, u);
				w.a(6040, u);
				w.a(6050, u);
				w.a(6060, u);
				w.a(6070, e);
				w.registerGlobalEventDispatcher(q.G);
				"overlay" === a ? w.R(I.cb(), r, c, E, I) : w.Zb(I.ab(), r, c, E, I)
			}
			function v() {
				clearInterval(da);
				ea = !1;
				c.on("ended", Z);
				da = setInterval(function() {
					var a = (new Date).getTime();
					void 0 == pa && (pa = a);
					var a = c.l("currentTime"),
						b = c.l("duration");
					E.handleTracking();
					Number.isFinite(b) && I && (I.tb(b - a), I.totalTime !== b && I.pc(b))
				}, 250);
				ea = !0
			}
			function K() {
				if (Q && Q.fb().proceed()) {
					var a = Q.fb();
					y.log(5004, a.podsLeft, a.podsFailed, a.buffetLeft, a.proceed());
					y.log(5003);
					r && r.destroy();
					r = new S(c, I);
					r.a("AdClickThru", n);
					r.a(2020, n);
					r.registerGlobalEventDispatcher(q.G);
					Da.destroy();
					if (w) {
						w.stopAd();
						setTimeout(function() {
							w = null;
							I.Ca(Q)
						}, 500);
						return
					}
					I.Ca(Q);
					oa.limit--;
					return !0
				}
				return !1
			}
			function Z() {
				c.off("ended", Z);
				w && (w.f(6050, Z), w = null);
				E.handleTracking();
				g("AdStopped");
				K() || (oa.limit--, clearInterval(da), ea = !1, pa = void 0, r.destroy(), I.destroy(), r = A.Ka = null, I = A.Ja = null, Da.destroy(), "fixedroll" === F && 0 < oa.limit && 0 < oa.urls.length ? z() : (g(1020), g("AdSlotComplete")))
			}
			function ha(a) {
				var c = I.u().creatives[0].videoClickThroughURLTemplate;
				"fixedroll" === F && (c || a) ? (E.Ra(), a = window.open(a ? a : c, "_blank"), null !== a && "undefined" !== typeof a && (g(1010, !0), r.ya())) : "overlay" === F && (I.u().nonLinearsVideoclicks.url || a) && (a = a ? a : I.u().nonLinearsVideoclicks.url, window.open(a, "_blank"))
			}
			function fa() {
				function d() {
					!1 === E.Ib() ? setTimeout(d, 10) : (g("AdStopped"), E = null)
				}
				y.log(204, F);
				y.log(5005);
				r.f("AdClickThru");
				r.f(2020);
				I.f(3010);
				I.f(3020);
				I.f(3030);
				I.f(3035);
				I.f(3050);
				I.f(3040);
				I.f(7E3);
				I.B();
				c.off("play", W);
				c.off("pause", W);
				c.f(5020, e);
				c.f(5010, h);
				if (w) w.stopAd();
				else {
					if ("overlay" == F || na) y.log(205, F), b.va && (b.overlayDuration = b.va, delete b.va), clearInterval(va), na = !1, ta = void 0, r.nc(), I.destroy(), r = A.Ka = null, I = A.Ja = null, a.sa && g(1010, !0);
					else if ("fixedroll" === F) {
						clearInterval(da);
						ea = !1;
						pa = void 0;
						r.destroy();
						I.destroy();
						r = A.Ka = null;
						I = A.Ja = null;
						Da.destroy();
						if (0 < oa.limit && 0 < oa.urls.length) {
							z();
							return
						}
						g(1020)
					}
					d()
				}
			}
			function g(a, c) {
				q.triggerEvent(a, c)
			}
			var q = new a.events.s,
				E, r, I, w, da, pa, ea = !1,
				va, ta, na = !1,
				oa, F, B = null,
				G = !1,
				C, J = !1,
				Wa = new L,
				Da = new P(c),
				U = this,
				N = !0,
				Q = null,
				O = null,
				H = !1;
			this.startLinear = function() {
				f()
			};
			this.startAd = function(a) {
				F = (oa = a) && a.type ? a.type : !1;
				return oa ? ("fixedroll" === F ? (!0 === na && fa(), J = !0, z()) : "overlay" === F && oa.urls[0] && z(oa.urls[0]), !0) : !1
			};
			this.a = q.a;
			this.f = q.f;
			this.registerGlobalEventDispatcher = q.registerGlobalEventDispatcher;
			this.B = q.B;
			this.ub = function() {
				Q && Q.za();
				try {
					y.log(202, 400), E.Z(400), fa()
				} catch (a) {}
			};
			this.pa = function() {
				c.destroy();
				fa()
			};
			this.ja = function() {
				return na
			};
			this.Eb = function() {
				return na || ea
			};
			this.pauseAd = function() {
				n({
					type: "PAUSEAD"
				})
			};
			this.resumeAd = function() {
				n({
					type: "RESUMEAD"
				})
			};
			this.setAutoplay = function(a) {
				N = a
			};
			this.ua = function(a) {
				Wa && Wa.addRule(a)
			};
			this.setVpaidAd = function(a) {
				O = a
			};
			this.setAdVolume = function(a) {
				w && w.setAdVolume(a)
			};
			this.clickThrough = function() {
				ha()
			};
			this.trackingController = function() {
				E || (E = new m(c, b, I, "fixedroll"), E.registerGlobalEventDispatcher(q.G), E.a("AdCapped"));
				E.Ia(I);
				return E
			};
			this.skipAd = function() {
				w ? w.skipAd() : t()
			};
			this.getAdConfig = function() {
				return oa
			}
		}
		function M(c, b) {
			function d(c) {
				y.log(301, c.type);
				l && l.u() && (n = l.u());
				switch (c.type) {
					case 4200:
						k(4200, c.info);
						break;
					case 7E3:
						t.triggerEvent(7E3);
						break;
					case "AdTagParsed":
						k("AdTagParsed", c.info);
						z();
						K.fileURL && k(3010);
						break;
					case 4030:
						x = !0;
						u++;
						c = n.oa;
						var d;
						window.XDomainRequest ? (y.log(303), d = new window.XDomainRequest) : (y.log(304), d = new XMLHttpRequest);
						V = d;
						a.urlEnrichment.setValueFor("videoData", b.o());
						c = a.urlEnrichment.H(c);
						window.XDomainRequest ? (V.onload = h, V.onerror = f, V.open("GET", c)) : (V.open("GET", c, !0), a.wc(c) && (V.withCredentials = !0), V.onreadystatechange = e);
						V.send();
						break;
					case 4020:
						k(3020, c.info);
						break;
					case 4040:
						k(3030, a.clone(n));
						break;
					case 4050:
						k(3035, n.extensions);
						break;
					case 4100:
						k(3050, c.info)
				}
			}
			function k(a, c) {
				t.triggerEvent(a, c)
			}
			function e() {
				4 == V.readyState && (200 == V.status ? h() : f())
			}
			function h() {
				var a = V.responseText;
				!1 === x ? (l = new G, l.registerGlobalEventDispatcher(t.G), l.a("AdTagParsed", d), l.a(4020, d), l.a(4030, d), l.a(4040, d), l.a(4050, d), l.a(4100, d), l.a(7E3, d)) : !0 === x && (x = !1);
				l.da(a)
			}
			function f() {
				k(3020, [310, String(V.status)])
			}
			function z() {
				v = new A.MediaSelector(ha, D);
				v.Kb().yc();
				if (0 < v.bb().length) {
					var c = a.$a() || 5E3,
						b = v.bb().reduce(function(a, b) {
							return Math.abs(b.bitrate - c) < Math.abs(a.bitrate - c) ? b : a
						});
					K.url = b.fileURL;
					K.type = b.mimeType;
					K.index = 0;
					a.extend(K, b);
					"string" === typeof K.fileURL && (a.urlEnrichment.setValueFor("assetUri", K.fileURL), K.fileURL = a.urlEnrichment.H(K.fileURL))
				} else a.urlEnrichment.setValueFor("assetUri", null), K.url = null
			}
			var l = null,
				t = new a.events.s,
				V, n = {
					ads: [],
					videoClicks: {},
					tracker: [],
					linear: [],
					nonLinearsVideoclicks: {},
					nonLinearsTracker: [],
					nonLinears: [],
					extensions: [],
					companion: [],
					companionsAsString: null,
					asString: null,
					duration: null,
					gotLinear: !1,
					gotNonLinear: !1,
					isCombi: !1,
					J: []
				}, x = !1,
				u = 0,
				D = new L,
				v = null,
				K = {
					url: null,
					index: null,
					type: null
				}, Z = 0,
				ha = this;
			this.Cc = function(a) {
				D = a
			};
			this.Jb = function() {
				return !!n.ads[Z].creatives[0].videoClickThroughURLTemplate
			};
			this.w = c;
			this.Ea = void 0;
			this.totalTime = n.duration;
			this.nb = function(h) {
				l = new G(c);
				l.a("AdTagParsed", d);
				l.a(4200, d);
				l.a(4020, d);
				a.urlEnrichment.setValueFor("videoData", b.o());
				window.macroModel = a.urlEnrichment.getCurrentModel;
				l.kc(h)
			};
			this.cb = function() {
				return n.nonLinears[0]
			};
			this.Qb = function() {
				return n.nonLinears[0]
			};
			this.ab = function() {
				return K
			};
			this.Aa = function() {
				return K.fileURL
			};
			this.tb = function(a) {
				this.totalTime = n.duration;
				this.Ea = n.duration - a;
				k("AdRemainingTimeChange")
			};
			this.pc = function(a) {
				this.totalTime = a;
				k("AdDurationChange")
			};
			this.hc = function(c) {
				n = a.clone(c);
				k(3010)
			};
			this.destroy = function() {
				y.log(5006);
				null !== l && (l.f(4020), l.f("AdTagParsed"), l.f(4030), l.f(4040), l.f(4100), l.f(7E3), l.B(), l = null);
				t = null
			};
			this.a = t.a;
			this.f = t.f;
			this.registerGlobalEventDispatcher = t.registerGlobalEventDispatcher;
			this.B = t.B;
			this.u = function() {
				return n.ads[Z]
			};
			this.Ca = function(a) {
				a.O();
				Z++;
				d({
					type: "AdTagParsed"
				})
			}
		}
		function S(c, b) {
			function d() {
				var a = c.o();
				w = "display:block;position:absolute;overflow:hidden;text-align:center;font-family:Arial,sans,Verdana;opacity:1;";
				m = "display:block;position:absolute;overflow:hidden;width:15px;height:15px;top:0px;left:" + a.width + "px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAALUlEQVQY02P4TyRgABMEAIpCbBpQ5JAV4GWjmwR3Ey6rSVJIlNUkeYZg8BADADDRv0FliZd9AAAAAElFTkSuQmCC) 50% 50% no-repeat;"
			}
			function k(a) {
				var b = c.o("width"),
					d = c.o("height");
				if (E.width === b && E.height === d) return a;
				y.log(401);
				a.T = parseInt(a.width, 10);
				a.P = parseInt(a.height, 10);
				a.ratio = a.T / a.P;
				E.width = b;
				E.height = d;
				"true" === a.scalable && "true" === a.maintainAspectRatio ? a.T / b >= a.P / (d / 5) ? (a.T = b, a.P = a.T / a.ratio) : (a.P = d / 5, a.T = a.P * a.ratio) : "true" === a.scalable && "false" === a.maintainAspectRatio && (a.P = d / 5, a.T = b);
				a.width = Math.floor(a.T);
				a.height = Math.floor(a.P);
				return a
			}
			function e(a, b) {
				var d = c.o();
				a.style.width = b.width + "px";
				a.style.height = b.height + "px";
				a.style.top = d.top + (d.height - b.height) + "px";
				a.style.left = d.left + (d.width / 2 - b.width / 2) + "px"
			}
			function h() {
				return a.createElement("div", {
					id: "closeButton" + 1E6 * Math.random(),
					style: m
				})
			}
			function f() {
				R && (B = c.l("duration"), na = c.l("currentTime"), 1 >= B && (B = b.u().duration), R.update(na, B))
			}
			function z() {
				q && (B = c.l("duration"), na = c.l("currentTime"), 1 >= B && (B = b.u().duration), q.update(na, B))
			}
			function l() {
				b.Jb() && c.rc(function(a) {
					!(1 >= a.button || "touchstart" === a.type) || .5 > c.l("currentTime") || (c.on("play", n), c.Fa(), b.w.clickThroughDialogEnabled ? (c.M(), ea.show(), ea.a("accept", V), ea.a("reject", n)) : V())
				})
			}
			function t() {
				y.log(402);
				u("AdClickThru")
			}
			function V() {
				y.log(402);
				Q.ya();
				ea.hide();
				ea.f("accept", V);
				ea.f("reject", n);
				c.setControls(!0);
				u("AdClickThru")
			}
			function n() {
				Q.Xa();
				ea.hide();
				ea.f("accept", V);
				ea.f("reject", n);
				c.off("play", n);
				c.S();
				c.setControls(!1);
				l()
			}
			function x() {
				pa.onmousedown = function() {
					y.log(403);
					u(2020)
				}
			}
			function u(a) {
				A.triggerEvent(a, void 0)
			}
			function D() {
				pa.style.left = parseInt(da.style.width, 10) - 15 + "px"
			}
			function v() {
				if (da) {
					var a = k(va);
					va = a;
					if (G) {
						var a = da,
							b = c.o();
						a.style.width = b.width + "px";
						a.style.height = b.height + "px";
						a.style.top = b.top;
						a.style.left = b.left
					} else e(da, a);
					D()
				}
			}
			function K() {
				b.w.styles.closeButtonStyle && a.A(pa, b.w.styles.closeButtonStyle)
			}
			function Z() {
				setTimeout(function() {
					q && q.setViewport(c.o());
					ea && ea.setViewport(c.o());
					J && J.setViewport(c.o());
					R && R.setViewport(c.o());
					v()
				}, 50)
			}
			function ha() {
				u("SKIP")
			}
			var g = c.getParent(),
				A = new a.events.s,
				E = {}, m, w, R, q, da, pa, ea, va, ta = {}, na, B, C, J, G = !1,
				Q = this,
				U = new r(c.getParent());
			this.R = function() {
				y.log(404);
				d();
				q = new H(g, b);
				q.setViewport(c.o());
				q.show();
				pa = h();
				ea = new ba(g, b);
				ea.setViewport(c.o());
				K();
				l();
				c.a(5010, Z)
			};
			this.$b = function() {
				C = a.createElement("div", {
					id: "vpaidSlot" + 1E6 * Math.random(),
					style: "pointer-events:none;position:absolute;width:100%;height:100%;display:none"
				});
				g.appendChild(C);
				var b = c.o();
				["left", "top", "width", "height"].forEach(function(a) {
					var c = b[a];
					if ("left" === a || "top" === a) c = 0;
					C.style[a] = "" + c + "px"
				})
			};
			this.ac = function() {
				y.log(405);
				E = {
					width: 0,
					height: 0
				};
				d();
				c.a(5010, Z)
			};
			this.bc = function() {
				R = new F(g, b);
				R.setViewport(c.o());
				R.hide();
				R.a("SKIP", ha)
			};
			this.Xb = function() {
				v()
			};
			this.na = function() {
				b.a("AdRemainingTimeChange", z);
				b.a("AdRemainingTimeChange", f)
			};
			this.sc = function(d) {
				a.sa && !b.w.customControls && c.setControls(!1);
				var l = k(d.attributes),
					n = a.createElement("div", {
						id: "overlay" + 1E6 * Math.random(),
						style: w
					}),
					v = null,
					Z;
				Z = c.o();
				va = l;
				e(n, l);
				if (d.StaticResource) {
					var l = d.resourceAttributes.creativeType.toLowerCase(),
						z = d.attributes.apiFramework ? d.attributes.apiFramework : "UNKNOWN"; - 1 != a.la.indexOf(l) && "VPAID" == z.toUpperCase() ? (G = !0, C = a.createElement("div", {
						id: "vpaidSlot" + 1E6 * Math.random(),
						style: "pointer-events:none;width:100%;height:100%"
					}), n.style.top = 0, n.style.left = 0, n.style.width = Z.width + "px", n.style.height = Z.height + "px", n.style.pointerEvents = "none", n.style.display = "none", n.appendChild(C)) : (-1 != a.la.indexOf(l) ? v = a.createElement("script", {
						src: d.StaticResource
					}) : 0 <= l.search(/^image|jpeg|gif|png/i) && (v = a.createElement("img", {
						src: d.StaticResource,
						style: "width:100%;height:100%"
					})), null != v && n.appendChild(v))
				} else d.IFrameResource ? (Z = a.createElement("div", {
					style: "position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0)"
				}), v = a.createElement("iframe", {
					id: "nonLinearIFrame",
					src: d.IFrameResource,
					style: "width:100%;height:100%"
				}), n.appendChild(Z), n.appendChild(v)) : d.HTMLResource && (v = a.createElement("div", {
					style: "width:100%;height:100%"
				}), v.innerHTML = d.HTMLResource, n.appendChild(v));
				da = n;
				pa = h();
				K();
				D();
				da.appendChild(pa);
				g.appendChild(da);
				da.firstChild.addEventListener("mousedown", t, !1);
				x()
			};
			this.nc = function() {
				a.sa && !b.w.customControls && c.setControls(!0);
				try {
					g.removeChild(da)
				} catch (d) {
					y.log(406)
				}
				c.f(5010)
			};
			this.destroy = function() {
				c.f(5010);
				b.f("AdRemainingTimeChange");
				ea && ea.destroy();
				q && q.destroy();
				R && R.destroy();
				C && g.removeChild(C);
				J && J.destroy();
				A = null;
				c.Fa()
			};
			this.gb = function() {
				return C
			};
			this.Vb = function() {
				c.o()
			};
			this.xc = function() {
				da ? (da.removeChild(pa), da.firstChild.removeEventListener("mousedown", t, !1), da.style.display = "block") : (c.Fa(), C.style.display = "block")
			};
			this.ic = function(a) {
				var b = ["left", "top", "width", "height"],
					d = c.o();
				da && (G ? b.forEach(function(a) {
					da.style[a] = "" + d[a] + "px"
				}) : a ? (Object.getOwnPropertyNames(ta).length || b.forEach(function(a) {
					ta[a] = da.style[a]
				}), b.forEach(function(a) {
					da.style[a] = "" + d[a] + "px"
				})) : b.forEach(function(a) {
					da.style[a] = ta[a]
				}))
			};
			this.hb = function() {
				c.getParent()
			};
			this.ha = function() {
				return U.ha()
			};
			this.ya = function() {
				q && q.hide();
				R && R.hide()
			};
			this.Xa = function() {
				q && q.show();
				R && R.show()
			};
			this.a = A.a;
			this.f = A.f;
			this.registerGlobalEventDispatcher = A.registerGlobalEventDispatcher
		}
		function ba(c, b) {
			function d(a) {
				if (l.parent) {
					var c = window.getComputedStyle(l, null).getPropertyValue("height");
					l.style.top = .5 * (a.height - parseInt(c, 10)) + "px";
					l.style.left = .5 * (a.width - parseInt(l.style.width, 10)) + "px"
				}
			}
			var k = b.w,
				e = new a.events.s,
				h = {}, f = k.clickThroughDialogText,
				z = k.styles,
				l;
			this.show = function() {
				l.style.display = "block";
				d(h)
			};
			this.hide = function() {
				l.style.display = "none"
			};
			this.destroy = function() {
				c.removeChild(l)
			};
			this.setViewport = function(a) {
				h = a;
				d(h)
			};
			this.a = e.a;
			this.f = e.f;
			l = function() {
				var b = a.createElement("div", {
					id: "clickThroughDialogBox" + 1E6 * Math.random(),
					style: "position:absolute;display:none"
				});
				b.innerHTML = f.query + "<br/>";
				var d = a.createElement("button", {});
				d.innerHTML = f.reject;
				var h = a.lb ? "ontouchstart" : "onmousedown";
				d[h] = function(a) {
					"none" !== l.style.display && (a.stopImmediatePropagation(), e.triggerEvent("reject"))
				};
				b.appendChild(d);
				var p = a.createElement("button", {});
				p.innerHTML = f.accept;
				p[h] = function(a) {
					"none" !== l.style.display && (a.stopImmediatePropagation(), e.triggerEvent("accept"))
				};
				b.appendChild(p);
				a.A(b, z.colorScheme);
				a.A(b, z.fontStyle);
				a.A(b, z.dialogBox);
				a.A(d, z.colorScheme);
				a.A(d, z.fontStyle);
				a.A(d, z.buttonStyle);
				a.A(p, z.colorScheme);
				a.A(p, z.fontStyle);
				a.A(p, z.buttonStyle);
				b.style.cssText += "text-align:center;";
				c && c.appendChild(b);
				return b
			}()
		}
		function H(c, b) {
			function d(a) {
				if (z.parent) {
					var c = parseInt(window.getComputedStyle(z, null).getPropertyValue("height"), 10),
						b = "top" === k.adCountdownPosition ? 0 : a.top + a.height - c;
					z.style.width = a.width + "px";
					z.style.height = c + "px";
					z.style.top = b + "px";
					z.style.left = a.left + "px"
				}
			}
			var k = b.w,
				e = new a.events.s,
				h = {}, f = k.styles,
				z;
			this.show = function() {
				"" !== k.adCountdownText && (z.style.display = "block", d(h))
			};
			this.hide = function() {
				z.style.display = "none"
			};
			this.update = function(a, c) {
				var b;
				try {
					if (b !== (b = Math.floor(c - a))) {
						var d = k.adCountdownText,
							d = d.replace(/\[time\]/i, b);
						isNaN(b) || (z.innerHTML = "&nbsp;" + d + "&nbsp;")
					}
				} catch (h) {}
			};
			this.destroy = function() {
				c.removeChild(z)
			};
			this.setViewport = function(a) {
				h = a;
				d(h)
			};
			this.a = e.a;
			this.f = e.f;
			z = function() {
				var b = a.createElement("div", {
					id: "adCountdown" + 1E6 * Math.random(),
					style: "position:absolute;overflow:hidden;pointer-events:none;display:none;"
				});
				b.innerHTML = "&nbsp;Loading...&nbsp;";
				a.A(b, f.colorScheme);
				a.A(b, f.fontStyle);
				c && c.appendChild(b);
				return b
			}()
		}
		function F(c, b) {
			function d() {
				h.triggerEvent("SKIP")
			}
			function k(a) {
				if (z.parent) {
					var c = parseInt(window.getComputedStyle(z, null).getPropertyValue("height"), 10),
						b = "top" === e.skipButtonPosition ? 0 : a.top + a.height - c,
						d = parseInt(window.getComputedStyle(z, null).getPropertyValue("width"), 10);
					a = "left" === t ? 0 : a.width - d;
					z.style.width = d + "px";
					z.style.height = c + "px";
					z.style.top = b + "px";
					z.style.left = a + "px"
				}
			}
			var e = b.w,
				h = new a.events.s,
				f = {}, z, l = e.styles,
				t, g = !1;
			this.update = function(c, d) {
				if (!g) {
					var h = a.pb(b.Aa().skipoffset, d);
					c >= h && (this.show(), g = !0)
				}
			};
			this.show = function() {
				z.style.display = "block";
				k(f)
			};
			this.hide = function() {
				z.style.display = "none"
			};
			this.destroy = function() {
				c.removeChild(z)
			};
			this.setViewport = function(a) {
				f = a;
				k(f)
			};
			this.a = h.a;
			this.f = h.f;
			z = function() {
				var b = a.createElement("div", {
					id: "adSkipButton" + 1E6 * Math.random(),
					style: "position:absolute;overflow:hidden;display:none;cursor:pointer;white-space: nowrap"
				});
				b.innerHTML = "&nbsp;" + e.skipButtonText + "&nbsp;";
				a.A(b, l.colorScheme);
				a.A(b, l.fontStyle);
				t = b.style.textAlign = "right" === l.fontStyle.textAlign ? "left" : "right";
				b.addEventListener(a.lb ? "touchstart" : "mousedown", d, !1);
				c && c.appendChild(b);
				return b
			}()
		}
		function J(c) {
			function b(a, c) {
				var d = "";
				"string" == typeof a && (a = {
					urls: [a]
				});
				if ("string" == typeof a.urls || "string" == typeof a.tag) d = a.urls || a.tag, a.urls = [d];
				a.offset = c;
				return a
			}
			function d(a) {
				if (c.overlay) {
					for (var b = [], d = 0; d < c.fixedrolls.length; d++) {
						var p = {
							urls: [c.overlay],
							offset: c.fixedrolls[d].offset + c.overlayDelay,
							limit: 1,
							count: 1,
							interval: -1,
							type: "overlay",
							requested: !1
						};
						p.offset < a && b.push(p)
					}
					for (d = 0; d < b.length; d++) c.fixedrolls.push(b[d]);
					c.fixedrolls.some(function(a) {
						return 0 == a.offset
					}) || c.fixedrolls.push({
						urls: [c.overlay],
						offset: c.overlayDelay,
						limit: 1,
						count: 1,
						interval: -1,
						type: "overlay",
						requested: !1
					})
				}
			}
			function k() {
				c.fixedrolls.sort(function(a, c) {
					return a.offset > c.offset ? 1 : a.offset < c.offset ? -1 : 0
				})
			}
			var e = !1;
			this.Bc = function(b) {
				if (!e) {
					for (var p = 0; p < c.fixedrolls.length; p++) {
						var f = c.fixedrolls[p];
						"string" == typeof f.offset && (f.offset = parseInt(f.offset, 10) / 100 * b)
					}
					p = [];
					for (f = 0; f < c.fixedrolls.length; f++) {
						var l = c.fixedrolls[f];
						if (5 <= l.interval) for (var t = l.offset + l.interval; t < b - 5;) {
							var g = a.clone(l);
							g.offset = t;
							p.push(g);
							t += l.interval
						}
					}
					c.fixedrolls = c.fixedrolls.concat(p);
					if (b < c.minDurationForMidrolls) {
						for (p = 0; p < c.fixedrolls.length; p++) f = c.fixedrolls[p], 0 < f.offset && f.offset < b && c.fixedrolls.splice(p, 1);
						y.log(602)
					}
					d(b);
					k();
					e = !0
				}
			};
			this.O = function(a) {
				a: {
					for (var b = 0; b < c.fixedrolls.length; b++) {
						var d = c.fixedrolls[b],
							p = a - d.offset;
						if (d.offset <= a && 2 >= p && !d.requested) {
							d.requested = !0;
							a = d;
							break a
						}
					}
					a = !1
				}
				return a
			};
			this.reset = function() {
				for (var a = 0; a < c.fixedrolls.length; a++) c.fixedrolls[a].requested = !1
			};
			this.fc = function() {
				return !0 === c.fixedrolls[c.fixedrolls.length - 1].requested
			};
			this.Wb = function(a) {
				return c.fixedrolls[c.fixedrolls.length - 1].offset == a && !1 === c.fixedrolls[c.fixedrolls.length - 1].requested
			};
			(function() {
				c.fixedrolls || (c.fixedrolls = []);
				c.preroll && (c.preroll = b(c.preroll, 0), c.fixedrolls.push(c.preroll));
				c.midroll && (c.midroll = b(c.midroll, "50%"), c.fixedrolls.push(c.midroll));
				c.postroll && (c.postroll = b(c.postroll, "100%"), c.fixedrolls.push(c.postroll));
				c.overlay && a.clone(c.overlay);
				for (var d = 0; d < c.fixedrolls.length; d++) {
					var k = c.fixedrolls[d];
					if ("string" == typeof k || 0 > parseInt(k.offset, 10)) y.log(601, k.offset);
					else {
						"object" == typeof k.tag && (k.urls = k.tag);
						var e = "";
						if ("string" == typeof k.tag || "string" == typeof k.urls) e = k.tag || k.urls, k.urls = [e];
						if (k.count) {
							e = k.urls[0];
							k.urls = [];
							for (var l = 0; l < k.count; l++) k.urls.push(e.replace("[count]", l + 1))
						} else k.count = 1;
						"object" != typeof k || "object" != typeof k.urls || k.limit || (k.limit = k.urls.length);
						k.interval || (k.interval = -1);
						k.requested = !1;
						k.type = "fixedroll"
					}
				}
				for (d = 0; d < c.fixedrolls.length; d++)(k = c.fixedrolls[d], k.urls) ? 0 == k.urls.length && (c.fixedrolls.splice(d, 1), d--) : (c.fixedrolls.splice(d, 1), d--)
			})()
		}
		function m(c, b, d, k) {
			function e(c, d, k) {
				c && d && b.onTrack && a.isFunction(b.onTrack) && (b.onTrack(c, d, k ? k : ""), h(k) && (b.onTrack("capped", d), g.triggerEvent("AdCapped", void 0)));
				g.triggerEvent("onTrack", c)
			}
			function h(c) {
				var b = a.isArray(c) ? Number(c[0]) : Number(c);
				c = "1010 1020 1030 1040 1050 1060 1070 2030".split(" ").some(function(a) {
					return a == b
				});
				var d = ["100", "101", "300", "303", "310"].some(function(a) {
					return a == b
				});
				return c || d
			}
			function f(c) {
				d && a.urlEnrichment.setValueFor("timeOffset", d.totalTime - d.Ea);
				var b = a.urlEnrichment.H(c.url);
				c.trackEvent && "error" === c.trackEvent && c.info && (b = a.urlEnrichment.errorCode(b, c.info));
				c = new Image;
				c.onload = function() {
					K--
				};
				c.onerror = function() {
					K--
				};
				K++;
				c.src = b
			}
			function z(c, d, h) {
				var f = v.some(function(a) {
					return a === d
				});
				if (!f || !n[d]) if ("progress" !== d && (e(d, k, h), f && (n[d] = b.qb ? !0 : !1)), c) {
					"progress" !== d && y.log(701, d);
					for (var t = 0; t < c.length; t++) if ("string" === typeof c[t]) l.createTracker({
						url: c[t],
						trackEvent: d,
						info: h
					});
					else if (c[t].nodeValue && "progress" === d && !n[d]) {
						f && (n[d] = b.qb ? !0 : !1);
						if (c[t].offset) {
							var K = a.pb(c[t].offset, D);
							if (K && K > u) continue
						}
						e(d, k, h);
						l.createTracker({
							url: c[t].nodeValue,
							trackEvent: d,
							info: h
						});
						c[t].nodeValue = void 0
					}
				}
			}
			var l = this,
				t = d && d.u() ? d.u().creatives[0].trackingEvents : [],
				g = new a.events.s,
				n = {}, x = 0,
				u = 0,
				D, v = "close closeLinear skip impression creativeView start firstQuartile midpoint thirdQuartile complete".split(" "),
				K = 0;
			l.Ua = function() {
				z(t.mute, "mute")
			};
			l.Va = function() {
				z(t.unmute, "unmute")
			};
			l.Z = function(a) {
				z(t.error, "error", a)
			};
			l.Hb = function() {
				z(t.skip, "skip")
			};
			l.Gb = function() {
				z(t.close, "close")
			};
			l.Ra = function() {
				z(t.clickTracking, "clickTracking")
			};
			l.Ta = function() {
				y.log(701, "Impression, CreativeView");
				z(t.impression, "impression");
				z(t.Oc, "creativeView")
			};
			l.callTracker = function(a) {
				z(t[a.toLowerCase()], a)
			};
			l.Mc = function(a) {
				a.split("|").forEach(function(a) {
					z(t[a.toLowerCase()], a)
				})
			};
			l.Sa = function(c, b) {
				var d = [];
				a.isArray(c) ? d = c : d.push(c);
				z(d, b)
			};
			l.Ib = function() {
				return 0 >= K
			};
			l.createTracker = function(a) {
				f(a)
			};
			this.Ia = function(a) {
				k = "fixedroll";
				t = (d = a) && a.u() ? a.u().creatives[0].trackingEvents : []
			};
			l.handleTracking = function(a) {
				var h;
				a = "fixedroll" === k ? c.l("currentTime") : a;
				var e = "fixedroll" === k ? c.l("duration") : parseInt(b.overlayDuration, 10);
				a = +(Math.round(a + "e+1") + "e-1");
				e = +(Math.round(e + "e+1") + "e-1");
				u = a;
				D = e;
				"fixedroll" === k && (x + .3 < u && (x = u, z(t.timeupdate, "timeupdate")), z(t.progress, "progress"));
				if (!(isNaN(e) || !isNaN(e) && 0 > e)) {
					if (a >= e) h = "complete";
					else if (a >= e / (4 / 3)) h = "thirdQuartile";
					else if (a >= e / 2) h = "midpoint";
					else if (a >= e / 4) h = "firstQuartile";
					else if (a) z(d.u().impressionURLTemplates, "impression"), z(t.creativeView, "creativeView"), z(t.start, "start");
					else return;
					h && z(t[h], h)
				}
			};
			l.a = g.a;
			l.f = g.f;
			l.registerGlobalEventDispatcher = g.registerGlobalEventDispatcher;
			return l
		}
		function O() {
			function c() {
				function c() {
					for (var b = a.i(u.Creatives, "Creative"), d = 0; d < b.length; d++) if (u.NonLinearAds = a.b(b[d], "NonLinearAds"), u.NonLinearAds) {
						n.gotNonLinear = !0;
						break
					}
				}
				if (a.g(u.D)) {
					try {
						if (!(u.VAST = a.b(u.D, "VAST"))) throw 1010;
						k(u.VAST);
						if (!(u.Ad = a.i(u.VAST, "Ad")[0])) throw 1020;
						if (!(u.InLine = a.b(u.Ad, "InLine")) && !(u.Wrapper = a.b(u.Ad, "Wrapper"))) throw 1030;
						if (u.InLine) {
							k(u.InLine);
							if (!(u.Creatives = a.b(u.InLine, "Creatives"))) throw 1040;
							if (!(u.Creative = a.i(u.Creatives, "Creative")[0])) throw 1050;
							if (!(u.Linear = a.b(u.Creative, "Linear")) && !(u.NonLinearAds = a.b(u.Creative, "NonLinearAds"))) throw 1060;
							u.Linear && (n.gotLinear = !0);
							u.NonLinearAds ? n.gotNonLinear = !0 : c()
						} else {
							if (!(u.VASTAdTagURI = a.b(u.Wrapper, "VASTAdTagURI"))) throw 1070;
							u.Wrapper && (k(u.Wrapper), u.Creatives = a.b(u.Wrapper, "Creatives"), u.Creative = a.i(u.Creatives, "Creative")[0], u.Linear = a.b(u.Creative, "Linear"), u.NonLinearAds = a.b(u.Creative, "NonLinearAds"), c(), n.gotNonLinear = !1)
						}
					} catch (d) {
						return t.triggerEvent(4020, d), !1
					}
					b() && t.triggerEvent(4200);
					return !0
				}
				return !1
			}
			function b() {
				var c = a.i(u.VAST, "Ad");
				return c && 1 < c.length
			}
			function d(c, b) {
				a.isArray(c[b]) || (c[b] = [])
			}
			function k(c) {
				c = a.i(c, "Error");
				if (a.g(c)) {
					d(n.tracker, g.ERROR);
					d(n.nonLinearsTracker, g.ERROR);
					for (var b = 0; b < c.length; b++) a.c(c[b]) && (n.tracker.error.push(a.c(c[b])), n.nonLinearsTracker.error.push(a.c(c[b])));
					n.tracker.error = a.unique(n.tracker.error);
					n.nonLinearsTracker.error = a.unique(n.nonLinearsTracker.error)
				}
			}
			function e(c, b) {
				if (a.g(c)) for (var p = a.i(c, "Tracking"), h = 0; h < p.length; h++) {
					var k = a.h(p[h]).event.toLowerCase();
					a.c(p[h]) && (d(n.tracker, k), "progress" === k ? n.tracker[k].push({
						nodeValue: a.c(p[h]),
						offset: a.h(p[h]).offset
					}) : n.tracker[k].push(a.c(p[h])))
				}
				if (a.g(b)) for (p = a.i(b, "Tracking"), h = 0; h < p.length; h++) k = a.h(p[h]).event.toLowerCase(), a.c(p[h]) && (d(n.nonLinearsTracker, k), n.nonLinearsTracker[k].push(a.c(p[h])))
			}
			function h(c) {
				c = a.i(c, "Impression");
				var b = [];
				if (a.g(c)) {
					d(n.tracker, g.X);
					d(n.nonLinearsTracker, g.X);
					for (var p = 0; p < c.length; p++) {
						var h = a.c(c[p]);
						h && (n.tracker.impression.push(h), n.nonLinearsTracker.impression.push(h), b.push(h))
					}
					n.J.push(b)
				}
			}
			function f(c) {
				if (a.g(c)) {
					var b = a.b(c, "ClickThrough");
					a.g(b) && (n.videoClicks.url = a.c(b));
					b = a.b(c, "NonLinearClickThrough");
					a.g(b) && (n.nonLinearsVideoclicks.url = a.c(b));
					c = a.i(c, "ClickTracking");
					if (a.g(c)) for (d(n.tracker, g.qa), b = 0; b < c.length; b++) a.c(c[b]) && n.tracker.clickTracking.push(a.c(c[b]))
				}
			}
			function z(c) {
				if (c && (c = a.i(c, "Extension"), a.g(c))) for (var b = 0; b < c.length; b++) n.extensions.push(c[b])
			}
			function l(c) {
				if (a.g(c)) {
					c = a.i(c, "Companion");
					for (var b = 0; b < c.length; b++) {
						var d = c[b],
							p = a.c(a.b(d, "Tracking")),
							h = a.c(a.b(d, "CompanionClickThrough")),
							k = a.b(d, "StaticResource"),
							e = a.b(d, "IFrameResource"),
							f = a.b(d, "HTMLResource");
						a.g(k) && n.companion.push({
							StaticResource: a.c(k),
							resourceAttributes: a.h(k),
							attributes: a.h(k.parentNode),
							adParameters: a.c(a.b(d, "AdParameters")),
							ba: p,
							aa: h
						});
						a.g(e) && n.companion.push({
							IFrameResource: a.c(e),
							resourceAttributes: a.h(e),
							attributes: a.h(e.parentNode),
							adParameters: a.c(a.b(d, "AdParameters")),
							ba: p,
							aa: h
						});
						a.g(f) && n.companion.push({
							HTMLResource: a.c(f),
							resourceAttributes: a.h(f),
							attributes: a.h(f.parentNode),
							adParameters: a.c(a.b(d, "AdParameters")),
							ba: p,
							aa: h
						})
					}
				}
				c = n.asString.indexOf("<CompanionAds");
				var b = n.asString.indexOf("</CompanionAds>"),
					t; - 1 != c && -1 != b && (t = n.asString.substr(c, b - c + 15));
				a.g(t) && (n.companionsAsString = t)
			}
			var t = new a.events.s,
				g = {
					ERROR: "error",
					X: "impression",
					qa: "clickTracking"
				}, n = {
					videoClicks: {},
					tracker: {},
					linear: [],
					nonLinearsVideoclicks: {},
					nonLinearsTracker: {},
					nonLinears: [],
					extensions: [],
					companion: [],
					companionsAsString: null,
					asString: null,
					duration: null,
					gotLinear: !1,
					gotNonLinear: !1,
					Ba: !1,
					isCombi: !1,
					J: []
				}, x = null,
				u = {
					D: !1,
					VAST: !1,
					Ad: !1,
					InLine: !1,
					Wrapper: !1,
					Creatives: !1,
					Creative: !1,
					Linear: !1,
					NonLinearAds: !1,
					VASTAdTagURI: !1,
					clear: function() {
						for (var a in this) this.hasOwnProperty(a) && "clear" !== a && (this[a] = !1)
					}
				};
			this.u = function() {
				return n
			};
			this.R = function() {};
			this.da = function(b) {
				var p;
				a: {
					try {
						window.DOMParser ? u.D = (new DOMParser).parseFromString(b, "application/xml") : (p = new ActiveXObject("Microsoft.XMLDOM"), p.async = !1, p.loadXML(b), u.D = p)
					} catch (k) {
						p = !1;
						break a
					}
					p = !0
				}
				p || (u.D = !1);
				x = b.toString();
				if (!0 === c()) if (n.asString = x, u.Wrapper && u.VASTAdTagURI) h(u.Wrapper), f(a.b(u.Linear, "VideoClicks")), f(a.b(u.NonLinearAds, "NonLinear")), e(u.Linear, u.NonLinearAds), l(a.b(u.Creatives, "CompanionAds")), z(a.b(u.Ad, "Extensions")), n.oa = a.c(u.VASTAdTagURI), u.clear(), t.triggerEvent(4030);
				else {
					h(u.InLine);
					f(a.b(u.Linear, "VideoClicks"));
					f(a.b(u.NonLinearAds, "NonLinear"));
					e(u.Linear, u.NonLinearAds);
					b = a.b(u.NonLinearAds, "NonLinear");
					if (a.g(b)) {
						d(n, "nonLinears");
						p = a.b(b, "StaticResource");
						var K = a.b(b, "IFrameResource"),
							g = a.b(b, "HTMLResource");
						a.g(p) && -1 == a.Za.indexOf(a.h(p).creativeType) && n.nonLinears.push({
							StaticResource: a.c(p),
							resourceAttributes: a.h(p),
							attributes: a.h(p.parentNode),
							adParameters: a.c(a.b(b, "AdParameters"))
						});
						a.g(K) && n.nonLinears.push({
							IFrameResource: a.c(K),
							resourceAttributes: a.h(K),
							attributes: a.h(K.parentNode),
							adParameters: a.c(a.b(b, "AdParameters"))
						});
						a.g(g) && n.nonLinears.push({
							HTMLResource: a.c(g),
							resourceAttributes: a.h(g),
							attributes: a.h(g.parentNode),
							adParameters: a.c(a.b(b, "AdParameters"))
						})
					}
					n.nonLinears.length || (n.gotNonLinear = !1);
					p = a.b(u.Linear, "MediaFiles");
					b = u.Linear && a.h(u.Linear).skipoffset || void 0;
					if (a.g(p)) {
						p = a.i(p, "MediaFile");
						n.linear = [];
						if (a.g(p)) for (K = 0; K < p.length; K++) a.c(p[K]) && n.linear.push({
							skipoffset: b,
							nodeValue: a.c(p[K]),
							attributes: a.h(p[K]),
							adParameters: a.c(a.b(u.Linear, "AdParameters"))
						});
						b && t.triggerEvent("AdTagSkipDetected", b)
					}
					l(a.b(u.Creatives, "CompanionAds"));
					z(a.b(u.Ad, "Extensions"));
					a.c(a.b(u.Linear, "Duration")) && (n.duration = a.L(a.c(a.b(u.Linear, "Duration"))));
					n.isCombi = !0 === n.gotLinear && !0 === n.gotNonLinear;
					if (0 < n.extensions.length) {
						n.Ba = !0;
						b = n.extensions;
						p = !1;
						for (K = 0; K < b.length; K++) for (var g = a.i(b[K], "Fallback"), V = 0; V < g.length; V++) "true" === a.c(g[V]) && (p = !0);
						p && (n.gotLinear = !1, n.isCombi = !1, n.gotNonLinear = !1, n.oa = !1, n.linear = [], n.nonLinears = [], t.triggerEvent(4100, n.J[n.J.length - 1]));
						t.triggerEvent(4050)
					}
					n.isCombi && t.triggerEvent(4040);
					if (b = !0 === n.gotLinear) {
						b = null;
						for (var A in n.tracker) b = A;
						b = !(0 == n.linear.length ? 0 : null != n.linear[0].attributes.width && null != n.linear[0].attributes.height && null != a.mb(n.linear[0].nodeValue) && null != b)
					}
					b && (u.clear(), t.triggerEvent(4020, 2010));
					n.gotLinear || n.gotNonLinear || t.triggerEvent(4020, 2010);
					n.asString = x;
					u.clear();
					t.triggerEvent("AdTagParsed")
				}
			};
			this.a = t.a;
			this.f = t.f;
			this.registerGlobalEventDispatcher = t.registerGlobalEventDispatcher;
			this.B = t.B
		}
		function N() {
			function c(a) {
				for (var c in a) a.hasOwnProperty(c) && (isNaN(parseFloat(a[c])) || (a[c] = parseFloat(a[c])))
			}
			function b() {
				var c = f.filter(function(a) {
					return a !== l.ra && a !== l.OIS
				});
				if (!g.OIS) return !1;
				c.forEach(function(c) {
					g[c] = a.b(g.OIS, c)
				});
				g.fixedroll = a.i(g.OIS, l.ra);
				return !0
			}
			function d() {
				var b;
				l.xb.split(",").forEach(function(d) {
					h[d] = {};
					h[d].attributes = a.h(g[d]) || {};
					c(h[d].attributes);
					var p = a.i(g[d], l.URL);
					b = [];
					if (!p.length) {
						var k = a.c(g[d]);
						a.g(k) && b.push(k)
					}
					for (k = 0; k < p.length; k++) b.push(a.c(p[k]));
					h[d].urls = b;
					h[d] = a.extend(h[d], h[d].attributes);
					h[d].urls.length || delete h[d]
				});
				var d = a.i(g.OIS, l.ra);
				h.fixedrolls = [];
				for (var p = 0; p < d.length; p++) {
					var k = d[p],
						e = a.h(k) || {}, f = a.i(k, l.URL);
					b = [];
					c(e);
					f.length || (k = a.c(k), a.g(k) && b.push(k));
					for (k = 0; k < f.length; k++) b.push(a.c(f[k]));
					b.length && h.fixedrolls.push(a.extend({
						attributes: e,
						urls: b
					}, e || {}))
				}
				h.fixedrolls.length || delete h.fixedrolls
			}
			function k() {
				if (g.styles) {
					var c = l.yb.split(",");
					h.styles = {};
					c.forEach(function(c) {
						h.styles[c] = {};
						for (var b = a.i(a.b(g.styles, c), l.vb), d = 0; d < b.length; d++) a.g(b[d].tagName) && (h.styles[c][b[d].tagName] = a.c(b[d]))
					})
				}
			}
			function e() {
				f.forEach(function(a) {
					!1 === h[a] && delete h[a];
					"true" === h[a] && (h[a] = !0);
					"false" === h[a] && (h[a] = !1)
				})
			}
			var h = {}, f = "OIS key vpaidSingleVideoSlotMode skipButtonPosition skipButtonText preroll midroll postroll fixedroll overlay overlayDelay overlayDuration minDurationForMidrolls customControls adCountdownText adCountdownPosition clickThroughDialogText clickThroughDialogEnabled styles".split(" "),
				g = {}, l = {
					URL: "URL",
					ra: "fixedroll",
					OIS: "OIS",
					vb: "*",
					yb: "colorScheme,fontStyle,dialogBox,buttonStyle",
					xb: "preroll,midroll,postroll"
				};
			this.parse = function(c) {
				var f;
				a: {
					try {
						window.DOMParser ? g.OIS = (new DOMParser).parseFromString(c, "application/xml") : (f = new ActiveXObject("Microsoft.XMLDOM"), f.async = !1, f.loadXML(c), g.OIS = f)
					} catch (l) {
						f = !1;
						break a
					}
					f = !0
				}
				f || (g.OIS = !1);
				if (!b()) return {};
				d();
				h.overlay = a.c(g.overlay);
				h.overlayDelay = a.c(g.overlayDelay);
				h.overlayDuration = a.c(g.overlayDuration);
				h.minDurationForMidrolls = a.c(g.minDurationForMidrolls);
				h.customControls = a.c(g.customControls);
				h.adCountdownText = a.c(g.adCountdownText);
				h.adCountdownPosition = a.c(g.adCountdownPosition);
				h.clickThroughDialogEnabled = a.c(g.clickThroughDialogEnabled);
				h.skipButtonPosition = a.c(g.skipButtonPosition);
				h.skipButtonText = a.c(g.skipButtonText);
				h.vpaidSingleVideoSlotMode = a.c(g.vpaidSingleVideoSlotMode);
				h.key = a.c(g.key);
				var n = a.b(g.OIS, "clickThroughDialogText");
				f = a.c(a.b(n, "query"));
				var x = a.c(a.b(n, "reject")),
					n = a.c(a.b(n, "accept"));
				h.clickThroughDialogText = {};
				h.clickThroughDialogText.query = f;
				h.clickThroughDialogText.reject = x;
				h.clickThroughDialogText.accept = n;
				k();
				h.Nc = c.toString();
				e();
				return h
			}
		}
		function G(c) {
			function b(a) {
				l = h.u();
				switch (a.type) {
					case "AdTagParsed":
						(l = h.u()) && l.ia && l.ia.length && (y.log(5050), e.triggerEvent(4300, l.ia));
						e.triggerEvent("AdTagParsed", l);
						break;
					case 4030:
						e.triggerEvent(4030);
						break;
					case 4020:
						1020 === a.info && e.triggerEvent(7E3);
						e.triggerEvent(4020);
						break;
					case 4040:
						e.triggerEvent(4040);
						break;
					case 4100:
						e.triggerEvent(4100);
						break;
					case 4200:
						d(a.info);
						y.log(5052);
						e.triggerEvent(4200, a.info);
						break;
					case "AdTagSkipDetected":
						e.triggerEvent("AdTagSkipDetected", a.info)
				}
			}
			function d(a) {
				h.f("AdTagParsed", b);
				h.f(4020, b);
				h.f(4030, b);
				h.f(4040, b);
				h.f(4050, b);
				h.f(4100, b);
				h.f(4200, b);
				h.f("AdTagSkipDetected", b);
				h = null;
				A = a;
				A.Pb().pods.length && (k(), h.f(4200, b), a = A.O(), null !== a ? (h.qc(a.id), h.da(f)) : e.triggerEvent(4210))
			}
			function k() {
				var a = null;
				switch (g) {
					case "2":
						a = O;
						break;
					case "3":
						a = E;
						break;
					default:
						e.triggerEvent(4020, 102)
				}
				a && (h = null, h = new a, h.a("AdTagParsed", b), h.a(4020, b), h.a(4030, b), h.a(4040, b), h.a(4050, b), h.a(4100, b), h.a(4200, b), h.a("AdTagSkipDetected", b))
			}
			var e = new a.events.s,
				h = new window.VASTParser,
				f = null,
				g = null,
				l = null,
				t = null,
				A = null,
				n = null;
			h.addURLTemplateFilter(a.urlEnrichment.H);
			this.a = e.a;
			this.f = e.f;
			this.registerGlobalEventDispatcher = e.registerGlobalEventDispatcher;
			this.B = e.B;
			this.Ca = function(a) {
				d(a)
			};
			this.u = function() {
				return n
			};
			this.kc = function(a) {
				var b = {
					withCredentials: !0
				};
				c.urlhandler && (b.urlhandler = window[c.urlhandler]);
				h.parse(a, b, function(a, c) {
					if (a) e.triggerEvent(4020);
					else if (n = c, e.triggerEvent("AdTagParsed", n), 1 < n.ads.length) {
						var b = new B(n);
						e.triggerEvent(4200, b)
					}
				}, [])
			};
			this.da = function(a) {
				f = a;
				var c;
				a: {
					c = f;
					try {
						if (window.DOMParser) t = (new DOMParser).parseFromString(c, "application/xml");
						else {
							var b = new ActiveXObject("Microsoft.XMLDOM");
							b.async = !1;
							b.loadXML(c);
							t = b
						}
					} catch (d) {
						c = !1;
						break a
					}
					c = !0
				}
				c ? (g = t.getElementsByTagName("VAST")[0].getAttribute("version"), g = null !== g && "" !== g && g.length ? g.charAt(0) : "") : e.triggerEvent(4020);
				h || k();
				h.da(a)
			}
		}
		function B(c) {
			function b(a) {
				var c = null;
				h[a].length && h[a].length - 1 && (c = h[a].shift(), f = {
					subset: a,
					id: c && c.hasOwnProperty("id") ? c.id : null
				});
				return c
			}
			function d() {
				return h.pods.filter(function(a) {
					return !0 === a.error && !1 === a.errorReplaced
				}).length
			}
			function k() {
				var a = !1;
				h.pods.forEach(function(c) {
					!0 === c.error && !1 === c.errorReplaced && !1 === a && (a = c.errorReplaced = !0)
				})
			}
			var e = new a.events.s;
			this.a = e.a;
			this.f = e.f;
			this.registerGlobalEventDispatcher = e.registerGlobalEventDispatcher;
			this.B = e.B;
			var h = {}, f = null,
				g = 10,
				l = !1;
			this.vc = function(a) {
				y.log(5002, g, a);
				g = a
			};
			this.O = function() {
				y.log(5008);
				if (!0 === l) return null;
				if (h && h.pods && h.pods.length > g && h && h.buffet && h.buffet.length && !1 === l) {
					var a = b("buffet");
					l = !0;
					h.pods = [];
					y.log(5007);
					return a
				}
				a = b("pods");
				return null !== a ? a : d() && (a = b("buffet"), null !== a) ? (k(), a) : null
			};
			this.Pb = function() {
				return h
			};
			this.fb = function() {
				return {
					podsLeft: h.pods.length - 1,
					podsFailed: d(),
					buffetLeft: h.buffet.length - 1,
					proceed: function() {
						return 0 < this.podsLeft || 0 < this.podsFailed && 0 < this.buffetLeft
					}
				}
			};
			this.za = function() {
				y.log(5009);
				f && f.hasOwnProperty("id") && f.hasOwnProperty("subset") && null !== f.subset && h[f.subset].forEach(function(a) {
					a.id === f.id && (a.error = !0)
				})
			};
			(function() {
				h = {
					ads: c.ads,
					length: c.ads.length,
					pods: c.ads.filter(function(a) {
						return !isNaN(parseInt(a.sequence, 10))
					}),
					buffet: c.ads.filter(function(a) {
						return !a.sequence || isNaN(parseInt(a.sequence, 10))
					})
				}
			})();
			(function() {
				h.pods.length && h.pods.sort(function(a, c) {
					return a.sequence > c.sequence ? 1 : a.sequence < c.sequence ? -1 : 0
				})
			})()
		}
		function E() {
			function c() {
				function c() {
					for (var b = a.i(v.Creatives, "Creative"), d = 0; d < b.length; d++) if (v.NonLinearAds = a.b(b[d], "NonLinearAds"), v.NonLinearAds) {
						x.gotNonLinear = !0;
						break
					}
				}
				if (a.g(v.D)) {
					try {
						if (!(v.VAST = a.b(v.D, "VAST"))) throw 1010;
						d(v.VAST);
						if (!(v.Ad = a.i(v.VAST, "Ad")[u])) throw 1020;
						if (!(v.InLine = a.b(v.Ad, "InLine")) && !(v.Wrapper = a.b(v.Ad, "Wrapper"))) throw 1030;
						if (v.InLine) {
							d(v.InLine);
							if (!(v.Creatives = a.b(v.InLine, "Creatives"))) throw 1040;
							if (!(v.Creative = a.i(v.Creatives, "Creative")[0])) throw 1050;
							if (!(v.Linear = a.b(v.Creative, "Linear")) && !(v.NonLinearAds = a.b(v.Creative, "NonLinearAds"))) throw 1060;
							v.Linear && (x.gotLinear = !0);
							v.NonLinearAds ? x.gotNonLinear = !0 : c()
						} else {
							if (!(v.VASTAdTagURI = a.b(v.Wrapper, "VASTAdTagURI"))) throw 1070;
							v.Wrapper && (d(v.Wrapper), v.Creatives = a.b(v.Wrapper, "Creatives"), v.Creative = a.i(v.Creatives, "Creative")[0], v.Linear = a.b(v.Creative, "Linear"), v.NonLinearAds = a.b(v.Creative, "NonLinearAds"), c(), x.gotNonLinear = !1)
						}
					} catch (b) {
						return A.triggerEvent(4020, b), !1
					}
					1 < a.i(v.VAST, "Ad").length && A.triggerEvent(4200, new B(v));
					return !0
				}
				return !1
			}
			function b(c, d) {
				a.isArray(c[d]) || (c[d] = [])
			}
			function d(c) {
				c = a.i(c, "Error");
				if (a.g(c)) {
					b(x.tracker, n.ERROR);
					b(x.nonLinearsTracker, n.ERROR);
					for (var d = 0; d < c.length; d++) a.c(c[d]) && (x.tracker.error.push(a.c(c[d])), x.nonLinearsTracker.error.push(a.c(c[d])));
					x.tracker.error = a.unique(x.tracker.error);
					x.nonLinearsTracker.error = a.unique(x.nonLinearsTracker.error)
				}
			}
			function k(c, d) {
				if (a.g(c)) for (var h = a.i(c, "Tracking"), k = 0; k < h.length; k++) {
					var e = a.h(h[k]).event.toLowerCase();
					a.c(h[k]) && (b(x.tracker, e), "progress" === e ? x.tracker[e].push({
						nodeValue: a.c(h[k]),
						offset: a.h(h[k]).offset
					}) : x.tracker[e].push(a.c(h[k])))
				}
				if (a.g(d)) for (h = a.i(d, "Tracking"), k = 0; k < h.length; k++) e = a.h(h[k]).event.toLowerCase(), a.c(h[k]) && (b(x.nonLinearsTracker, e), x.nonLinearsTracker[e].push(a.c(h[k])))
			}
			function e(c) {
				c = a.i(c, "Impression");
				var d = [];
				if (a.g(c)) {
					b(x.tracker, n.X);
					b(x.nonLinearsTracker, n.X);
					for (var h = 0; h < c.length; h++) {
						var k = a.c(c[h]);
						k && (x.tracker.impression.push(k), x.nonLinearsTracker.impression.push(k), d.push(k))
					}
					x.J.push(d)
				}
			}
			function h(c) {
				if (a.g(c)) {
					var d = a.b(c, "ClickThrough");
					a.g(d) && (x.videoClicks.url = a.c(d));
					d = a.b(c, "NonLinearClickThrough");
					a.g(d) && (x.nonLinearsVideoclicks.url = a.c(d));
					c = a.i(c, "ClickTracking");
					if (a.g(c)) for (b(x.tracker, n.qa), d = 0; d < c.length; d++) a.c(c[d]) && x.tracker.clickTracking.push(a.c(c[d]))
				}
			}
			function f(c) {
				if (c && (c = a.i(c, "Extension"), a.g(c))) for (var b = 0; b < c.length; b++) x.extensions.push(c[b])
			}
			function g(c) {
				var b = {
					attributes: {}
				}, d = a.b(c, "IconClicks"),
					k = a.b(c, "StaticResource"),
					h = a.b(c, "IFrameResource"),
					p = a.b(c, "HTMLResource");
				"program width height xPosition yPosition apiFramework offset duration".split(" ").forEach(function(a) {
					b.attributes[a] = c.getAttribute(a) || null
				});
				b.IconViewTracking = a.c(a.b(c, "IconViewTracking"));
				b.IconClickThrough = a.c(a.b(d, "IconClickThrough"));
				b.IconClickTracking = a.c(a.b(d, "IconClickTracking"));
				b.StaticResource = {
					nodeValue: a.c(k) || null,
					attributes: k ? a.h(k) : null
				};
				b.IFrameResource = {
					nodeValue: a.c(h) || null,
					attributes: h ? a.h(h) : null
				};
				b.HTMLResource = {
					nodeValue: a.c(p) || null,
					attributes: p ? a.h(p) : null
				};
				return b
			}
			function l(c) {
				if (c && (c = a.i(c, "Icon"), a.g(c))) for (var b = 0; b < c.length; b++) x.ia.push(g(c[b]))
			}
			function t(c) {
				if (a.g(c)) {
					c = a.i(c, "Companion");
					for (var b = 0; b < c.length; b++) {
						var d = c[b],
							k = a.c(a.b(d, "Tracking")),
							h = a.c(a.b(d, "CompanionClickThrough")),
							p = a.b(d, "StaticResource"),
							e = a.b(d, "IFrameResource"),
							f = a.b(d, "HTMLResource");
						a.g(p) && x.companion.push({
							StaticResource: a.c(p),
							resourceAttributes: a.h(p),
							attributes: a.h(p.parentNode),
							adParameters: a.c(a.b(d, "AdParameters")),
							ba: k,
							aa: h
						});
						a.g(e) && x.companion.push({
							IFrameResource: a.c(e),
							resourceAttributes: a.h(e),
							attributes: a.h(e.parentNode),
							adParameters: a.c(a.b(d, "AdParameters")),
							ba: k,
							aa: h
						});
						a.g(f) && x.companion.push({
							HTMLResource: a.c(f),
							resourceAttributes: a.h(f),
							attributes: a.h(f.parentNode),
							adParameters: a.c(a.b(d, "AdParameters")),
							ba: k,
							aa: h
						})
					}
				}
				c = x.asString.indexOf("<CompanionAds");
				var b = x.asString.indexOf("</CompanionAds>"),
					l; - 1 != c && -1 != b && (l = x.asString.substr(c, b - c + 15));
				a.g(l) && (x.companionsAsString = l)
			}
			var A = new a.events.s,
				n = {
					ERROR: "error",
					X: "impression",
					qa: "clickTracking"
				}, x = {
					videoClicks: {},
					tracker: {},
					linear: [],
					nonLinearsVideoclicks: {},
					nonLinearsTracker: {},
					nonLinears: [],
					extensions: [],
					ia: [],
					companion: [],
					companionsAsString: null,
					asString: null,
					duration: null,
					gotLinear: !1,
					gotNonLinear: !1,
					Ba: !1,
					isCombi: !1,
					J: []
				}, u = 0,
				D = null,
				v = {
					D: !1,
					VAST: !1,
					Ad: !1,
					InLine: !1,
					Wrapper: !1,
					Creatives: !1,
					Creative: !1,
					Linear: !1,
					NonLinearAds: !1,
					VASTAdTagURI: !1,
					clear: function() {
						for (var a in this) this.hasOwnProperty(a) && "clear" !== a && (this[a] = !1)
					}
				};
			this.qc = function(a) {
				u = a
			};
			this.u = function() {
				return x
			};
			this.R = function() {};
			this.da = function(d) {
				var g;
				a: {
					try {
						window.DOMParser ? v.D = (new DOMParser).parseFromString(d, "application/xml") : (g = new ActiveXObject("Microsoft.XMLDOM"), g.async = !1, g.loadXML(d), v.D = g)
					} catch (n) {
						g = !1;
						break a
					}
					g = !0
				}
				g || (v.D = !1);
				D = d.toString();
				if (!0 === c()) if (x.asString = D, v.Wrapper && v.VASTAdTagURI) e(v.Wrapper), h(a.b(v.Linear, "VideoClicks")), h(a.b(v.NonLinearAds, "NonLinear")), k(v.Linear, v.NonLinearAds), t(a.b(v.Creatives, "CompanionAds")), f(a.b(v.Ad, "Extensions")), l(a.b(v.Ad, "Icons")), x.oa = a.c(v.VASTAdTagURI), v.clear(), A.triggerEvent(4030);
				else {
					e(v.InLine);
					h(a.b(v.Linear, "VideoClicks"));
					h(a.b(v.NonLinearAds, "NonLinear"));
					k(v.Linear, v.NonLinearAds);
					d = a.b(v.NonLinearAds, "NonLinear");
					if (a.g(d)) {
						b(x, "nonLinears");
						g = a.b(d, "StaticResource");
						var u = a.b(d, "IFrameResource"),
							z = a.b(d, "HTMLResource");
						a.g(g) && -1 == a.Za.indexOf(a.h(g).creativeType) && x.nonLinears.push({
							StaticResource: a.c(g),
							resourceAttributes: a.h(g),
							attributes: a.h(g.parentNode),
							adParameters: a.c(a.b(d, "AdParameters"))
						});
						a.g(u) && x.nonLinears.push({
							IFrameResource: a.c(u),
							resourceAttributes: a.h(u),
							attributes: a.h(u.parentNode),
							adParameters: a.c(a.b(d, "AdParameters"))
						});
						a.g(z) && x.nonLinears.push({
							HTMLResource: a.c(z),
							resourceAttributes: a.h(z),
							attributes: a.h(z.parentNode),
							adParameters: a.c(a.b(d, "AdParameters"))
						})
					}
					x.nonLinears.length || (x.gotNonLinear = !1);
					g = a.b(v.Linear, "MediaFiles");
					d = v.Linear && a.h(v.Linear).skipoffset || void 0;
					if (a.g(g)) {
						g = a.i(g, "MediaFile");
						x.linear = [];
						if (a.g(g)) for (u = 0; u < g.length; u++) a.c(g[u]) && x.linear.push({
							skipoffset: d,
							nodeValue: a.c(g[u]),
							attributes: a.h(g[u]),
							adParameters: a.c(a.b(v.Linear, "AdParameters"))
						});
						d && A.triggerEvent("AdTagSkipDetected", d)
					}
					t(a.b(v.Creatives, "CompanionAds"));
					f(a.b(v.Ad, "Extensions"));
					l(a.b(v.Ad, "Icons"));
					a.c(a.b(v.Linear, "Duration")) && (x.duration = a.L(a.c(a.b(v.Linear, "Duration"))));
					x.isCombi = !0 === x.gotLinear && !0 === x.gotNonLinear;
					if (0 < x.extensions.length) {
						x.Ba = !0;
						d = x.extensions;
						g = !1;
						for (u = 0; u < d.length; u++) for (var z = a.i(d[u], "Fallback"), E = 0; E < z.length; E++) "true" === a.c(z[E]) && (g = !0);
						g && (x.gotLinear = !1, x.isCombi = !1, x.gotNonLinear = !1, x.oa = !1, x.linear = [], x.nonLinears = [], A.triggerEvent(4100, x.J[x.J.length - 1]));
						A.triggerEvent(4050)
					}
					x.isCombi && A.triggerEvent(4040);
					if (d = !0 === x.gotLinear) {
						d = null;
						for (var R in x.tracker) d = R;
						d = !(0 == x.linear.length ? 0 : null != x.linear[0].attributes.width && null != x.linear[0].attributes.height && null != a.mb(x.linear[0].nodeValue) && null != d)
					}
					d && (v.clear(), A.triggerEvent(4020, 2010));
					x.gotLinear || x.gotNonLinear || A.triggerEvent(4020, 2010);
					x.asString = D;
					v.clear();
					A.triggerEvent("AdTagParsed")
				}
			};
			this.a = A.a;
			this.f = A.f;
			this.registerGlobalEventDispatcher = A.registerGlobalEventDispatcher;
			this.B = A.B
		}
		function X() {
			function c() {
				H = a.createElement("iframe", {
					style: "width:0;height:0;top:0;left:0;position:absolute;overflow:hidden;border:none; visibility:hidden"
				});
				H.onload = b;
				S.insertBefore(H, S.firstChild)
			}
			function b() {
				H.wa = (H.contentDocument || H.contentWindow.document).getElementsByTagName("body")[0];
				H.Pc = H.wa.parentNode.parentNode;
				var c = a.createElement("script", {
					type: "text/javascript"
				});
				c.innerHTML = "var inDapIF = true;";
				H.wa.appendChild(c);
				Ca = a.createElement("div", {
					id: ua,
					style: "position:absolute;width:100%;height:100%;top:0;left:0; background:rgba(0,0,0,1); display:none"
				});
				S.appendChild(Ca);
				Ca = document.getElementById(ua) || S.ownerDocument.getElementById(ua);
				ba = a.createElement("video", {
					id: wa,
					style: "position:absolute;width:100%;height:100%;top:0;left:0;display:none"
				});
				S.appendChild(ba);
				ba = document.getElementById(wa) || S.ownerDocument.getElementById(wa);
				ga = a.createElement("div", {
					id: Va,
					style: "position:absolute;width:100%;height:100%;top:0;left:0;overflow:hidden;"
				});
				S.appendChild(ga);
				ga = document.getElementById(Va) || S.ownerDocument.getElementById(Va);
				ma = new ja(ba, Xa, Ca, qa, La.w.vpaidSingleVideoSlotMode); - 1 < M.indexOf(".swf") || (ga.style.pointerEvents = "auto", c = a.createElement("script", {
					src: a.urlEnrichment.H(M)
				}), c.onload = function() {
					d()
				}, c.onerror = function() {
					X(6010)
				}, H.wa.appendChild(c))
			}
			function d() {
				if (a.C || a.ta) X(6010);
				else {
					if (!T) {
						var c = H.contentWindow.getVPAIDAd;
						if (a.isFunction(c)) T = c();
						else return
					}
					if (k(T)) {
						y.log(961, T.handshakeVersion("2.0")); - 1 === "1.1,2.0".indexOf(T.handshakeVersion("2.0")) && X(6010);
						var c = {
							AdParameters: ca
						}, b = {
							slot: ga,
							videoSlot: ma.Sb(),
							videoSlotCanAutoPlay: !0,
							source: M
						};
						e();
						L = new U;
						L.uc(function() {
							y.log(1E3);
							X(6010)
						});
						var d = function(a) {
							if (!a) return !1;
							var c = a.style.width;
							a = /scale|transform/gi.test(a.style.cssText);
							return !!parseInt(c, 10) && -1 === c.indexOf("%") && !a
						}, h, p;
						d(ga) ? (h = parseInt(ga.style.width, 10), p = parseInt(ga.style.height, 10)) : d(S) ? (h = parseInt(S.style.width, 10), p = parseInt(S.style.height, 10)) : d(S.parentNode) && (h = parseInt(S.parentNode.style.width, 10), p = parseInt(S.parentNode.style.height, 10));
						var f = qa.ca();
						d(f) ? (h = parseInt(f.style.width, 10), p = parseInt(f.style.height, 10)) : d(f.parentNode) && (h = parseInt(f.parentNode.style.width, 10), p = parseInt(f.parentNode.style.height, 10));
						Ma.initAd(h, p, "normal", 300, c, b)
					} else y.log(962)
				}
			}
			function k(c) {
				for (var b = "handshakeVersion initAd startAd stopAd skipAd resizeAd pauseAd resumeAd expandAd collapseAd subscribe unsubscribe getAdLinear".split(" "), d = 0; d < b.length; d++) if (!a.isFunction(c[b[d]])) return !1;
				return !0
			}
			function e() {
				var a = {
					AdStarted: h,
					AdStopped: f,
					AdSkipped: g,
					AdLoaded: l,
					AdLinearChange: t,
					AdSizeChange: A,
					AdExpandedChange: n,
					AdSkippableStateChange: x,
					AdDurationChange: u,
					AdRemainingTimeChange: D,
					AdVolumeChange: v,
					AdImpression: E,
					AdClickThru: R,
					AdInteraction: m,
					AdVideoStart: q,
					AdVideoFirstQuartile: w,
					AdVideoMidpoint: r,
					AdVideoThirdQuartile: F,
					AdVideoComplete: B,
					AdUserAcceptInvitation: C,
					AdUserMinimize: J,
					AdUserClose: da,
					AdPaused: pa,
					AdPlaying: ea,
					AdError: va,
					AdLog: ta
				}, c;
				for (c in a) T.subscribe(a[c], c, Ma)
			}
			function h() {
				y.log(967);
				ia.callTracker("creativeView");
				T.getAdLinear() && (ma.show(), ba.volume = qa.l("volume"), P = ba.volume);
				Ya = new ka(na);
				X("AdStarted")
			}
			function f() {
				if (T) {
					var a = {
						AdStarted: h,
						AdStopped: f,
						AdSkipped: g,
						AdLoaded: l,
						AdLinearChange: t,
						AdSizeChange: A,
						AdExpandedChange: n,
						AdSkippableStateChange: x,
						AdDurationChange: u,
						AdRemainingTimeChange: D,
						AdVolumeChange: v,
						AdImpression: E,
						AdClickThru: R,
						AdInteraction: m,
						AdVideoStart: q,
						AdVideoFirstQuartile: w,
						AdVideoMidpoint: r,
						AdVideoThirdQuartile: F,
						AdVideoComplete: B,
						AdUserAcceptInvitation: C,
						AdUserMinimize: J,
						AdUserClose: da,
						AdPaused: pa,
						AdPlaying: ea,
						AdError: va,
						AdLog: ta
					}, c;
					for (c in a) T.unsubscribe(a[c], c)
				}
				y.log(966);
				ma.hide();
				Ya && Ya.destroy();
				"nonLinear" === Na && qa.l("paused") && qa.S();
				X(6050)
			}
			function g() {
				y.log(965);
				ia.callTracker("skip");
				Ma.stopAd()
			}
			function l() {
				y.log(964);
				Ma.startAd();
				L.log("onadloaded");
				Oa.xc()
			}
			function t() {
				y.log(951, T.getAdLinear());
				T.getAdLinear() ? (qa.M(), ma.show()) : (ma.hide(), qa.S())
			}
			function A() {
				y.log(952, T.getAdWidth(), T.getAdHeight())
			}
			function n() {
				y.log(953, T.getAdExpanded());
				Oa.ic(T.getAdExpanded());
				T.getAdExpanded() ? (qa.M(), ia.callTracker("expand")) : (qa.S(), ia.callTracker("collapse"))
			}
			function x() {
				y.log(954, T.getAdSkippableState());
				X("AdSkippableStateChange", T.getAdSkippableState())
			}
			function u() {
				y.log(955, T.getAdDuration());
				G()
			}
			function D() {
				y.log(956, T.getAdRemainingTime());
				G()
			}
			function v() {
				y.log(957, T.getAdVolume());
				0 < T.getAdVolume() && 0 === P ? (ia.Va(), P = T.getAdVolume()) : 0 === T.getAdVolume() && 0 < P && (P = 0, ia.Ua())
			}
			function E() {
				y.log(963);
				ia.Ta()
			}
			function R(c, b, d) {
				y.log(968, c, b, d);
				d || !d && !c ? (fb = a.dc(c) ? c : void 0, ga.addEventListener("mousedown", N, !1), ma.on("play", N), ma.pause(), La.w.clickThroughDialogEnabled && sa ? (sa.show(), sa.a("accept", Q), sa.a("reject", N)) : Q()) : ia.Ra()
			}
			function m(a) {
				y.log(972, a);
				ia.callTracker("interaction")
			}
			function q() {
				y.log(973);
				ia.callTracker("start")
			}
			function w() {
				y.log(974);
				ia.callTracker("firstQuartile")
			}
			function r() {
				y.log(975);
				ia.callTracker("midpoint")
			}
			function F() {
				y.log(976);
				ia.callTracker("thirdQuartile")
			}
			function B() {
				y.log(977);
				X("AdVideoComplete");
				ia.callTracker("complete")
			}
			function C() {
				y.log(978);
				ia.callTracker("acceptInvitation")
			}
			function J() {
				y.log(979);
				ia.callTracker("collapse")
			}
			function da() {
				y.log(981);
				ia.callTracker("close");
				X(6040)
			}
			function pa() {
				y.log(980);
				L.log("onadpaused");
				ia.callTracker("pause")
			}
			function ea() {
				y.log(982);
				L.log("onadplaying");
				ia.callTracker("resume")
			}
			function va(a) {
				y.log(958, a);
				X(6010, a)
			}
			function ta(a) {
				y.log(959, a)
			}
			function na() {
				G()
			}
			function G() {
				Ea && Ea.update(T.getAdDuration() - T.getAdRemainingTime(), T.getAdDuration())
			}
			function Q() {
				y.log(402);
				Ea && Ea.hide();
				sa && (sa.hide(), sa.f("accept", Q), sa.f("reject", N));
				ma && ma.setControls(!0);
				X(6060, fb)
			}
			function N() {
				Ea && Ea.show();
				sa && (sa.hide(), sa.f("accept", Q), sa.f("reject", N));
				ma && (ma.off("play", N), ma.play());
				ga.removeEventListener("mousedown", N, !1)
			}
			function X(a, c) {
				O.triggerEvent(a, c)
			}
			var P, O = new a.events.s,
				L;
			P = void 0;
			var H, M, ca, ga, S, ba, ma, Ca, ua = "videoSlotBackground" + Math.random(),
				Va = "vpaidSlot" + Math.random(),
				wa = "videoSlot" + Math.random(),
				Xa, Oa, qa, ia, Na, Ea, sa, La, fb, Ya, Ma = this,
				T;
			this.R = function(a, b, d, h, k) {
				M = a.StaticResource;
				ca = a.adParameters;
				Oa = b;
				qa = d;
				ia = h;
				S = b.gb();
				Xa = qa.ca();
				La = k;
				b.hb();
				c();
				Na = "nonLinear"
			};
			this.Zb = function(a, b, d, h, k) {
				y.log(1001, k.w.vpaidSingleVideoSlotMode);
				M = a.fileURL;
				ca = a.adParameters;
				Oa = b;
				qa = d;
				ia = h;
				S = b.gb();
				Xa = qa.ca();
				La = k;
				b.hb();
				c();
				Na = "linear"
			};
			this.initAd = function(a, c, b, d, h, k) {
				y.log(1002, a, c, b);
				T.initAd(a, c, b, d, h, k)
			};
			this.startAd = function() {
				y.log(1003);
				T.startAd()
			};
			this.pauseAd = function() {
				y.log(1004);
				T.pauseAd()
			};
			this.resumeAd = function() {
				y.log(1006);
				T.resumeAd()
			};
			this.stopAd = function() {
				y.log(1008);
				T && T.stopAd()
			};
			this.setAdVolume = function(a) {
				y.log(1009, a);
				T && T.setAdVolume && T.setAdVolume(a)
			};
			this.resizeAd = function(a, c, b) {
				y.log(1010, a, c, b);
				ma && "linear" === Na ? (T.resizeAd(a, c, b), S.style.cssText += "width:" + parseInt(a, 10) + "px;height:" + parseInt(c, 10) + "px;") : T.resizeAd(a, c, b)
			};
			this.expandAd = function() {
				y.log(1011);
				T.expandAd()
			};
			this.collapseAd = function() {
				y.log(1012);
				T.collapseAd()
			};
			this.skipAd = function() {
				y.log(1013);
				T.getAdSkippableState() && T.skipAd()
			};
			this.na = function() {
				y.log(1014);
				ma.na(G)
			};
			this.rb = function(a) {
				T = a;
				ma ? d() : setTimeout(this.rb.bind(this, a), 50)
			};
			this.a = O.a;
			this.f = O.f;
			this.registerGlobalEventDispatcher = O.registerGlobalEventDispatcher
		}
		function ka(a) {
			function b() {}
			function d() {
				k = setInterval(function() {
					h()
				}, e)
			}
			var k, e = 1E3,
				h;
			this.setInterval = function(a) {
				a && (e = a);
				clearInterval(k);
				d()
			};
			this.destroy = function() {
				clearInterval(k);
				h = b
			};
			this.start = function() {
				clearInterval(k);
				d()
			};
			h = "function" === typeof a ? a : b;
			d()
		}
		function U() {
			function a(c, e) {
				b.forEach(function(a) {
					"INITAD" === a.event && (a.active = !0, a.V = e, a.Y = c, a.F = window.setTimeout(function() {
						b.forEach(function(a) {
							"INITAD" === a.event && a.active && (a.active = !1, window.clearTimeout(a.F), d.map(function(c) {
								if (c.time >= a.V && c.time <= a.V + a.timeout) return c
							}).some(function(c) {
								return c.event === a.ga ? !0 : !1
							}) || a.Y())
						})
					}, a.timeout))
				})
			}
			var b = [{
				active: !1,
				event: "INITAD",
				ga: "ONADLOADED",
				timeout: 4E3,
				F: null,
				V: null,
				Y: null
			}, {
				active: !1,
				event: "RESIZEAD",
				ga: "ONADSIZECHANGED",
				timeout: 1E3,
				F: null,
				V: null,
				Y: null
			}, {
				active: !1,
				event: "PAUSEAD",
				ga: "ONADPAUSED",
				timeout: 100,
				F: null,
				V: null,
				Y: null
			}, {
				active: !1,
				event: "RESUMEAD",
				ga: "ONADPLAYING",
				timeout: 100,
				F: null,
				V: null,
				Y: null
			}],
				d = [];
			this.log = function(a) {
				d.push({
					time: (new Date).getTime(),
					event: a.toUpperCase()
				})
			};
			this.uc = function(b) {
				var p = (new Date).getTime();
				a(b, p);
				d.push({
					time: p,
					event: "INITAD"
				})
			}
		}
		function ja(c, b, d, k, e) {
			var h = new a.events.s,
				f, g, l;
			this.o = function(c) {
				if (e) return k.o(c);
				if (c) switch (c) {
					case "width":
						return a.getWidth(l);
					case "height":
						return a.getHeight(l);
					case "top":
						return l.offsetTop;
					case "left":
						return l.offsetLeft;
					default:
						return null
				}
				return {
					width: a.getWidth(l),
					height: a.getHeight(l),
					top: l.offsetTop,
					left: l.offsetLeft
				}
			};
			this.show = function() {
				e || (l.style.display = "block", d.style.display = "block", b.style.visibility = "hidden")
			};
			this.hide = function() {
				e || (b.style.visibility = "visible", l.style.display = "none", d.style.display = "none")
			};
			this.na = function() {};
			this.pause = function() {
				l.pause()
			};
			this.play = function() {
				l.play()
			};
			this.setControls = function(a) {
				e ? k.setControls(a) : l.controls = a
			};
			this.on = function(a, c) {
				g.on(l, a, c)
			};
			this.off = function(a, c) {
				g.off(l, a, c)
			};
			this.a = h.a;
			this.f = h.f;
			this.Sb = function() {
				return f
			};
			(function() {
				g = new a.events.Event;
				e ? (l = b, d.parentNode.removeChild(d), c.parentNode.removeChild(c), f = new ca(l), f = a.extend(f, {
					setSrc: function(a) {
						k.ka({
							url: a
						})
					},
					setControls: function(a) {
						k.setControls(a)
					},
					setCurrentTime: function(a) {
						k.ka({
							url: k.l.currentSrc
						}, a)
					},
					load: function() {},
					play: function() {
						k.S()
					},
					pause: function() {
						k.M()
					}
				})) : (l = c, f = new ca(l))
			})()
		}
		function ca(c) {
			function b(a, c, d, h) {
				var k = Object.getOwnPropertyDescriptor(a, c);
				if (k && k.configurable) {
					var e;
					if (k.get || k.set) e = k;
					else {
						var p = k.value;
						e = {
							get: function() {
								return p
							},
							set: function(a) {
								p = a
							}
						}
					}
					var f = d ? function() {
							return d.call(this, c, e)
						} : e.get,
						g = h ? function(a) {
							h.call(this, c, a, e)
						} : e.set;
					Object.defineProperty(a, c, {
						get: e.get ? f : void 0,
						set: e.set ? g : void 0,
						enumerable: k.enumerable,
						configurable: !0
					})
				}
			}
			function d(a) {
				l[a] = u[a];
				return l[a]
			}
			function k(a, c) {
				for (var b = t, d = b.length, k = !1; 0 <= --d;) if (b[d] === a) {
					k = !0;
					break
				}
				if (!k && "style" !== a) {
					l[a] = c;
					switch (a) {
						case "src":
							x.setSrc(c);
							return;
						case "controls":
							x.setControls(c);
							return;
						case "currentTime":
							x.setCurrentTime(c);
							return
					}
					u[a] = l[a]
				}
			}
			function e() {
				for (var a = g, c = a.length; 0 <= --c;) l[a[c]] = u[a[c]]
			}
			function h(a) {
				n.lc(a.type, a);
				e()
			}
			var f = "loadstart emptied canplaythrough ended ratechange progress stalled playing durationchange volumechange suspend loadedmetadata waiting timeupdate abort loadeddata seeking play error canplay seeked pause".split(" "),
				g = "error crossOrigin buffered currentTime paused played autoplay controller muted videoTracks height poster src networkState readyState duration defaultPlaybackrate seekable loop controls defaultMuted textTracks videoWidth currentSrc preload seeking startDate playbackRate ended mediaGroup volume audioTracks width videoHeight".split(" "),
				l = {}, t = "error crossOrigin buffered paused played autoplay controller videoTracks height networkState readyState duration defaultPlaybackrate seekable loop defaultMuted textTracks videoWidth currentSrc preload seeking startDate playbackRate ended mediaGroup audioTracks width videoHeight".split(" "),
				A, n, x = this,
				u;
			this.setAttribute = function(a, c) {
				"type" !== a && "src" !== a && -1 === a.indexOf("data-") || u.setAttribute(a, c)
			};
			this.getAttribute = function(a) {
				return u.getAttribute(a)
			};
			this.removeAttribute = function(a) {
				return u.removeAttribute(a)
			};
			this.setSrc = function(a) {
				u.src = a
			};
			this.setControls = function(a) {
				u.controls = !! a
			};
			this.setCurrentTime = function(a) {
				u.currentTime = a
			};
			this.play = function() {
				u.play()
			};
			this.pause = function() {
				u.pause()
			};
			this.load = function() {
				u.load()
			};
			this.canPlayType = function(a) {
				return u.canPlayType(a)
			};
			this.destroy = function() {
				A.off(u, f.join(","), h)
			};
			this.addEventListener = function(a, c) {
				n.a(a, c)
			};
			this.removeEventListener = function(a, c) {
				n.mc(a, c)
			};
			this.dispatchEvent = function(a) {
				u.dispatchEvent(a)
			};
			this.getComputedStyle = function(a) {
				return window.getComputedStyle(u, a || null)
			};
			this.appendChild = function() {};
			this.removeChild = function() {};
			this.cc = "goog_596272282";
			(function() {
				u = c;
				n = new a.events.s;
				A = new a.events.Event;
				A.on(u, f.join(","), h);
				e();
				for (var t = g, v = t.length; 0 <= --v;) x[t[v]] = l[t[v]];
				x.style = {};
				t = g;
				for (v = t.length; 0 <= --v;) b(x, t[v], d, k);
				b(x, "style", d, k);
				u.setAttribute("data-proxyTag", this.cc)
			})()
		}(function() {
			function a() {
				this.attributes = {};
				this.children = []
			}
			function b() {
				this.trackingEvents = {}
			}
			function d() {
				this.trackingEvents = {};
				this.type = "linear";
				this.duration = 0;
				this.skipDelay = null;
				this.mediaFiles = [];
				this.videoClickThroughURLTemplate = null;
				this.videoClickTrackingURLTemplates = [];
				this.videoCustomClickURLTemplates = [];
				this.adParameters = null;
				this.icons = []
			}
			function k() {
				this.trackingEvents = {};
				this.type = "nonlinear";
				this.variations = [];
				this.videoClickTrackingURLTemplates = []
			}
			function e() {
				this.trackingEvents = {};
				this.type = "companion";
				this.variations = [];
				this.videoClickTrackingURLTemplates = []
			}
			function h() {
				this.id = null;
				this.height = this.width = 0;
				this.companionClickThroughURLTemplate = this.iframeResource = this.htmlResource = this.staticResource = this.type = null;
				this.trackingEvents = {}
			}
			function f() {
				this.program = null;
				this.yPosition = this.xPosition = this.width = this.height = 0;
				this.offset = this.apiFramework = null;
				this.duration = 0;
				this.iconClickThroughURLTemplate = this.iframeResource = this.htmlResource = this.staticResource = this.type = null;
				this.iconClickTrackingURLTemplates = [];
				this.iconViewTrackingURLTemplate = null
			}
			function g() {
				this.fileURL = this.id = null;
				this.deliveryType = "progressive";
				this.codec = this.mimeType = null;
				this.height = this.width = this.maxBitrate = this.minBitrate = this.bitrate = 0;
				this.adParameters = this.maintainAspectRatio = this.scalable = this.apiFramework = null
			}
			function l() {
				this.sequence = this.id = null;
				this.errorURLTemplates = [];
				this.impressionURLTemplates = [];
				this.creatives = [];
				this.extensions = []
			}
			function t() {
				this.id = null;
				this.expandedHeight = this.expandedWidth = this.height = this.width = 0;
				this.maintainAspectRatio = this.scalable = !0;
				this.minSuggestedDuration = 0;
				this.apiFramework = "static";
				this.adParameters = this.nonlinearClickThroughURLTemplate = this.iframeResource = this.htmlResource = this.staticResource = this.type = null
			}
			function A() {
				this.value = this.name = null;
				this.attributes = {}
			}
			function n(a) {
				var c = [];
				c.forEach.call(c.slice.call(arguments, 1), function(c) {
					if (c) for (var b in c)({}).hasOwnProperty.call(c, b) && (a[b] = "object" === typeof a[b] && "object" === typeof c[b] && null !== c[b] ? n(a[b], c[b]) : c[b])
				});
				return a
			}
			function x(a, c) {
				c = void 0 === c ? {} : c;
				for (var b = [], d = q.makeIterator(["ASSETURI", "CONTENTPLAYHEAD"]), k = d.next(); !k.done; k = d.next()) k = k.value, c[k] = F.encodeURIComponentRFC3986(c[k]);
				null === c.ERRORCODE || /^[0-9]{3}$/.test(c.ERRORCODE) || (c.ERRORCODE = 900);
				c.CACHEBUSTING = r.pad(Math.round(1E8 * Math.random()), 8).toString();
				c.TIMESTAMP = F.encodeURIComponentRFC3986((new Date).toISOString());
				c.RANDOM = c.random = c.CACHEBUSTING;
				for (d = 0; d < a.length; d++) if (k = a[d]) {
					for (var h = q.makeIterator(Object.entries(c)), e = h.next(); !e.done; e = h.next()) var p = q.makeIterator(e.value),
						e = p.next().value,
						p = p.next().value,
						f = "%%" + e + "%%",
						k = k.replace("[" + e + "]", p),
						k = k.replace(f, p);
					b.push(k)
				}
				return b
			}
			function u() {
				this.ads = [];
				this.errorURLTemplates = []
			}
			function D() {}
			function v() {}
			function E() {}
			function R() {}
			function m() {
				this.maxWrapperDepth = null;
				this.currentWrapperDepth = 0;
				this.URLTemplateFilters = [];
				C.EventDispatcher.prototype.apply(this)
			}
			var q = {
				scope: {},
				getGlobal: function(a) {
					return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
				}
			};
			q.global = q.getGlobal(this);
			q.initSymbol = function() {
				q.global.Symbol || (q.global.Symbol = q.Symbol);
				q.initSymbol = function() {}
			};
			q.symbolCounter_ = 0;
			q.Symbol = function(a) {
				return "jscomp_symbol_" + a + q.symbolCounter_++
			};
			q.initSymbolIterator = function() {
				q.initSymbol();
				q.global.Symbol.iterator || (q.global.Symbol.iterator = q.global.Symbol("iterator"));
				q.initSymbolIterator = function() {}
			};
			q.makeIterator = function(a) {
				q.initSymbolIterator();
				if (a[q.global.Symbol.iterator]) return a[q.global.Symbol.iterator]();
				if (!(a instanceof Array || "string" == typeof a || a instanceof String)) throw new TypeError(a + " is not iterable");
				var c = 0;
				return {
					next: function() {
						return c == a.length ? {
							done: !0
						} : {
							done: !1,
							value: a[c++]
						}
					}
				}
			};
			q.arrayFromIterator = function(a) {
				for (var c, b = []; !(c = a.next()).done;) b.push(c.value);
				return b
			};
			q.arrayFromIterable = function(a) {
				return a instanceof Array ? a : q.arrayFromIterator(q.makeIterator(a))
			};
			q.arrayFromArguments = function(a) {
				for (var c = [], b = 0; b < a.length; b++) c.push(a[b]);
				return c
			};
			q.inherits = function(a, c) {
				function b() {}
				b.prototype = c.prototype;
				a.prototype = new b;
				a.prototype.constructor = a;
				for (var d in c) if (q.global.Object.defineProperties) {
					var k = q.global.Object.getOwnPropertyDescriptor(c, d);
					void 0 !== k && q.global.Object.defineProperty(a, d, k)
				} else a[d] = c[d]
			};
			var y = {};
			q.inherits(d, b);
			q.inherits(k, b);
			q.inherits(e, b);
			y["default"] = b;
			y.VASTCreativeLinear = d;
			y.VASTCreativeNonLinear = k;
			y.VASTCreativeCompanion = e;
			var w = {};
			w.extend = n;
			var r = {
				pad: function(a, c) {
					return Array(Math.max((void 0 === c ? 2 : c) - String(a).length + 1, 0)).join(0) + a
				}
			}, F = {
				encodeURIComponentRFC3986: function(a) {
					return encodeURIComponent(a).replace(/[!'()*]/g, function(a) {
						return "%" + a.charCodeAt(0).toString(16)
					})
				}
			}, B = {};
			B.resolveURLTemplates = x;
			B.track = function(a, c) {
				for (var b = x(a, c), d = 0; d < b.length; d++) {
					var k = b[d];
					window && ((new Image).src = k)
				}
			};
			D.prototype.xdr = function() {
				return window.XDomainRequest ? new window.XDomainRequest : null
			};
			D.supported = function() {
				return !!(new D).xdr()
			};
			D.prototype.get = function(a, c, b) {
				if ("function" !== typeof window.ActiveXObject) b();
				else {
					var d = new window.ActiveXObject("b");
					d.async = !1;
					xdr = this.xdr();
					xdr.open("GET", a);
					xdr.timeout = c.timeout || 0;
					xdr.withCredentials = !1 !== c.withCredentials;
					xdr.onprogress = function() {};
					xdr.onload = function() {
						d.loadXML(xdr.responseText);
						b(null, d)
					};
					xdr.send()
				}
			};
			v.prototype.xhr = function() {
				var a = new window.XMLHttpRequest;
				return "withCredentials" in a ? a : null
			};
			v.supported = function() {
				return !!(new v).xhr()
			};
			v.prototype.get = function(a, c, b) {
				if ("https:" === window.location.protocol && 0 === a.indexOf("http://")) b(Error("Cannot go from HTTPS to HTTP."));
				else try {
					var d = this,
						k = this.xhr();
					k.open("GET", a);
					k.timeout = c.timeout || 0;
					k.withCredentials = !1 !== c.withCredentials;
					k.overrideMimeType && k.overrideMimeType("text/xml");
					k.onreadystatechange = function() {
						if (4 === k.readyState) if (200 === k.status) b(null, k.responseXML);
						else if (0 === k.status && k.withCredentials) {
							var e = [].concat(c);
							e.withCredentials = !1;
							d.get(a, e, b)
						} else b(Error("XHRURLHandler: " + k.statusText))
					};
					k.send()
				} catch (e) {
					b(e)
				}
			};
			E.prototype.get = function(a, c, b) {
				var d = b,
					k = c;
				b || ("function" === typeof c && (d = c), k = {});
				if (!d) return null;
				c = k.urlhandler;
				if (k.response) d(null, k.response);
				else return c && c.supported() ? (new c).get(a, k, d) : v.supported() ? (new v).get(a, k, d) : D.supported() ? (new D).get(a, k, d) : d();
				return null
			};
			var C = {};
			Object.assign(R.prototype = {
				constructor: R,
				apply: function(a) {
					a.addEventListener = R.prototype.addEventListener;
					a.hasEventListener = R.prototype.hasEventListener;
					a.removeEventListener = R.prototype.removeEventListener;
					a.dispatchEvent = R.prototype.dispatchEvent
				},
				addEventListener: function(a, c) {
					this._listeners || (this._listeners = {});
					var b = this._listeners;
					b[a] || (b[a] = []); - 1 === b[a].indexOf(c) && b[a].push(c)
				},
				hasEventListener: function(a, c) {
					if (!this._listeners) return !1;
					var b = this._listeners;
					return b[a] && -1 !== b[a].indexOf(c) ? !0 : !1
				},
				removeEventListener: function(a, c) {
					if (this._listeners) {
						var b = this._listeners[a];
						if (b) {
							var d = b.indexOf(c); - 1 !== d && b.splice(d, 1)
						}
					}
				},
				dispatchEvent: function(a) {
					if (this._listeners) {
						var c = this._listeners[a];
						if (c) {
							for (var b = c.length, d = [], k = 0, k = 0; k < b; k++) d[k] = c[k];
							for (c = 0; c < b; c++)(d[c] || function() {}).apply(this, [].slice.call(arguments, 1))
						}
					}
				}
			});
			C.EventDispatcher = R;
			m.prototype.trackError = function(a, c) {
				this.dispatchEvent("VAST-error", c);
				a && 0 < a.length && B.track(a, {
					ERRORCODE: c
				})
			};
			m.prototype.addURLTemplateFilter = function(a) {
				"function" === typeof a && this.URLTemplateFilters.push(a)
			};
			m.prototype.removeURLTemplateFilter = function() {
				return this.URLTemplateFilters.pop()
			};
			m.prototype.countURLTemplateFilters = function() {
				return this.URLTemplateFilters.length
			};
			m.prototype.clearUrlTemplateFilters = function() {
				this.URLTemplateFilters = []
			};
			m.prototype.parseXPosition = function(a) {
				return -1 !== ["left", "right"].indexOf(a) ? a : parseInt(a, 10) || 0
			};
			m.prototype.parseYPosition = function(a) {
				return -1 !== ["top", "bottom"].indexOf(a) ? a : parseInt(a, 10) || 0
			};
			m.prototype.parseNodeText = function(a) {
				return a && (a.textContent || a.text || "").trim()
			};
			m.prototype.copyNodeAttribute = function(a, c, b) {
				(c = c.getAttribute(a)) && b.setAttribute(a, c)
			};
			m.prototype.parseDuration = function(a) {
				if (!a) return -1;
				var c = a.split(":");
				if (3 !== c.length) return -1;
				var b = c[2].split(".");
				a = parseInt(b[0], 10);
				2 === b.length && (a += parseFloat("0." + b[1]));
				b = parseInt(60 * c[1], 10);
				c = parseInt(3600 * c[0], 10);
				return isNaN(c) || isNaN(b) || isNaN(a) || 3600 < b || 60 < a ? -1 : c + b + a
			};
			m.prototype.parseBoolean = function(a) {
				return -1 !== ["true", "TRUE", "1"].indexOf(a)
			};
			m.prototype.childByName = function(a, c) {
				for (var b = 0; b < a.childNodes.length; b++) {
					var d = a.childNodes[b];
					if (d.nodeName === c) return d
				}
				return null
			};
			m.prototype.childsByName = function(a, c) {
				for (var b = [], d = 0; d < a.childNodes.length; d++) {
					var k = a.childNodes[d];
					k.nodeName === c && b.push(k)
				}
				return b
			};
			m.prototype.parseNextWrapperURL = function(a) {
				var c = null,
					b = this.childByName(a, "VASTAdTagURI");
				console.log(a.attributes);
				var d = this.parseBoolean(a.getAttribute("fallbackOnNoAd")) || !1;
				console.log(d);
				b ? c = this.parseNodeText(b) : (b = this.childByName(a, "VASTAdTagURL")) && (c = this.parseNodeText(this.childByName(b, "URL")));
				return c
			};
			m.prototype.parseWrapperElement = function(a) {
				var c = this.parseInLineElement(a);
				c.nextWrapperURL = this.parseNextWrapperURL(a);
				a = c.creatives;
				for (var b = 0; b < a.length; b++) {
					var d = a[b],
						k = null;
					if ("linear" === d.type || "nonlinear" === d.type) if (k = d) k.trackingEvents && (c.trackingEvents || (c.trackingEvents = {}), c.trackingEvents[k.type] = k.trackingEvents), k.videoClickTrackingURLTemplates && (c.videoClickTrackingURLTemplates = k.videoClickTrackingURLTemplates), k.videoClickThroughURLTemplate && (c.videoClickThroughURLTemplate = k.videoClickThroughURLTemplate), k.videoCustomClickURLTemplates && (c.videoCustomClickURLTemplates = k.videoCustomClickURLTemplates)
				}
				return c.nextWrapperURL ? c : null
			};
			m.prototype.parseSkipOffset = function(a, c) {
				var b = null;
				(b = c.getAttribute("skipoffset")) ? "%" === b.charAt(b.length - 1) && -1 !== a.duration ? (percent = parseInt(b, 10), b = percent / 100 * a.duration) : b = this.parseDuration(b) : b = null;
				return b
			};
			m.prototype.parseVideoClicks = function(a) {
				var c = {
					videoClickTrackingURLTemplates: [],
					videoCustomClickURLTemplates: []
				};
				if (a = this.childByName(a, "VideoClicks")) {
					c.videoClickThroughURLTemplate = this.parseNodeText(this.childByName(a, "ClickThrough"));
					for (var b = this.childsByName(a, "ClickTracking"), d = 0; d < b.length; d++) c.videoClickTrackingURLTemplates.push(this.parseNodeText(b[d]));
					a = this.childsByName(a, "CustomClick");
					for (b = 0; b < a.length; b++) c.videoCustomClickURLTemplates.push(this.parseNodeText(a[b]))
				}
				return c
			};
			m.prototype.parseTrackingEvents = function(a) {
				var c = {};
				a = this.childsByName(a, "TrackingEvents");
				for (var b = 0; b < a.length; b++) for (var d = this.childsByName(a[b], "Tracking"), k = 0; k < d.length; k++) {
					var e = d[k],
						h = e.getAttribute("event"),
						p = this.parseNodeText(e);
					if (h && p) {
						if ("progress" === h) {
							e = e.getAttribute("offset");
							if (!e) continue;
							h = "%" === e.charAt(e.length - 1) ? "progress-" + e : "progress-" + Math.round(this.parseDuration(e))
						}
						c[h] || (c[h] = []);
						c[h].push(p)
					}
				}
				return c
			};
			m.prototype.parseMediaFileScalable = function(a) {
				return (a = a.getAttribute("scalable")) && "string" === typeof a && (a = a.toLowerCase(), "false" === a) ? !1 : !0
			};
			m.prototype.parseMediaFileMaintainAspectRatio = function(a) {
				return (a = a.getAttribute("maintainAspectRatio")) && "string" === typeof a && (a = a.toLowerCase(), "false" === a) ? !1 : !0
			};
			m.prototype.parseMediaFiles = function(a) {
				var c = [];
				a = this.childsByName(a, "MediaFiles");
				for (var b = 0; b < a.length; b++) for (var d = this.childsByName(a[b], "MediaFile"), k = 0; k < d.length; k++) {
					var e = d[k],
						h = new g;
					h.id = e.getAttribute("id");
					h.fileURL = this.parseNodeText(e);
					h.deliveryType = e.getAttribute("delivery");
					h.codec = e.getAttribute("codec");
					h.mimeType = e.getAttribute("type");
					h.apiFramework = e.getAttribute("apiFramework");
					h.bitrate = parseInt(e.getAttribute("bitrate") || 0, 10);
					h.minBitrate = parseInt(e.getAttribute("minBitrate") || 0, 10);
					h.maxBitrate = parseInt(e.getAttribute("maxBitrate") || 0, 10);
					h.width = parseInt(e.getAttribute("width") || 0, 10);
					h.height = parseInt(e.getAttribute("height") || 0, 10);
					h.scalable = this.parseMediaFileScalable(e);
					h.maintainAspectRatio = this.parseMediaFileMaintainAspectRatio(e);
					c.push(h)
				}
				return c
			};
			m.prototype.parseIcons = function(a) {
				var c = [];
				if (a = this.childByName(a, "Icons")) {
					a = this.childsByName(a, "Icon");
					for (var b = 0; b < a.length; b++) {
						var d = a[b],
							k = new f;
						k.program = d.getAttribute("program");
						k.height = parseInt(d.getAttribute("height"), 10) || 0;
						k.width = parseInt(d.getAttribute("width"), 10) || 0;
						k.xPosition = this.parseXPosition(d.getAttribute("xPosition"));
						k.yPosition = this.parseYPosition(d.getAttribute("yPosition"));
						k.apiFramework = d.getAttribute("apiFramework");
						k.offset = this.parseDuration(d.getAttribute("offset"));
						k.duration = this.parseDuration(d.getAttribute("duration"));
						var k = w.extend(k, this.parseResourceAdType(d)),
							e = this.childByName(d, "IconClicks");
						if (e) {
							k.iconClickThroughURLTemplate = this.parseNodeText(this.childByName(e, "IconClickThrough"));
							for (var e = this.childsByName(e, "IconClickTracking"), h = 0; h < e.length; h++) k.iconClickTrackingURLTemplates.push(this.parseNodeText(e[h]))
						}
						k.iconViewTrackingURLTemplate = this.parseNodeText(this.childByName(d, "IconViewTracking"));
						c.push(k)
					}
				}
				return c
			};
			m.prototype.parseCreativeLinearElement = function(a) {
				var c = new y.VASTCreativeLinear;
				c.duration = this.parseDuration(this.parseNodeText(this.childByName(a, "Duration")));
				c.skipDelay = this.parseSkipOffset(c, a);
				var b = this.parseVideoClicks(a);
				c.videoClickThroughURLTemplate = b.videoClickThroughURLTemplate;
				c.videoClickTrackingURLTemplates = c.videoClickTrackingURLTemplates.concat(b.videoClickTrackingURLTemplates);
				c.videoCustomClickURLTemplates = c.videoCustomClickURLTemplates.concat(b.videoCustomClickURLTemplates);
				if (b = this.childByName(a, "AdParameters")) c.adParameters = this.parseNodeText(b);
				c.trackingEvents = this.parseTrackingEvents(a);
				c.mediaFiles = c.mediaFiles.concat(this.parseMediaFiles(a));
				c.icons = c.icons.concat(this.parseIcons(a));
				for (a = c.mediaFiles.length - 1; 0 <= a; a--) c.mediaFiles[a].adParameters = c.adParameters;
				return c
			};
			m.prototype.parseResourceAdType = function(a) {
				for (var c = {}, b = this.childsByName(a, "HTMLResource"), d = 0; d < b.length; d++) {
					var k = b[d];
					c.type = k.getAttribute("creativeType") || "text/html";
					c.htmlResource = this.parseNodeText(k)
				}
				b = this.childsByName(a, "IFrameResource");
				for (d = 0; d < b.length; d++) k = b[d], c.type = k.getAttribute("creativeType") || 0, c.iframeResource = this.parseNodeText(k);
				a = this.childsByName(a, "StaticResource");
				for (b = 0; b < a.length; b++) d = a[b], c.type = d.getAttribute("creativeType") || 0, c.staticResource = this.parseNodeText(d);
				return c
			};
			m.prototype.parseNonLinear = function(a) {
				var c = new y.VASTCreativeNonLinear;
				c.trackingEvents = this.parseTrackingEvents(a);
				a = this.childsByName(a, "NonLinear");
				for (var b = 0; b < a.length; b++) {
					var d = a[b],
						k = new t;
					k.id = d.getAttribute("id") || null;
					k.width = d.getAttribute("width");
					k.height = d.getAttribute("height");
					k.expandedWidth = d.getAttribute("expandedWidth");
					k.expandedHeight = d.getAttribute("expandedHeight");
					k.scalable = this.parseBoolean(d.getAttribute("scalable"));
					k.maintainAspectRatio = this.parseBoolean(d.getAttribute("maintainAspectRatio"));
					k.minSuggestedDuration = d.getAttribute("minSuggestedDuration");
					k.apiFramework = d.getAttribute("apiFramework");
					var k = w.extend(k, this.parseResourceAdType(d)),
						e = this.childByName(d, "AdParameters");
					e && (k.adParameters = this.parseNodeText(e));
					k.nonlinearClickThroughURLTemplate = this.parseNodeText(this.childByName(d, "NonLinearClickThrough"));
					c.variations.push(k)
				}
				return c
			};
			m.prototype.parseCompanionAd = function(a) {
				var c = new y.VASTCreativeCompanion;
				a = this.childsByName(a, "Companion");
				for (var b = 0; b < a.length; b++) {
					var d = a[b],
						k = new h;
					k.id = d.getAttribute("id") || null;
					k.width = d.getAttribute("width");
					k.height = d.getAttribute("height");
					k.companionClickTrackingURLTemplates = [];
					for (var k = w.extend(k, this.parseResourceAdType(d)), e = this.childsByName(d, "TrackingEvents"), p = 0; p < e.length; p++) for (var f = this.childsByName(e[p], "Tracking"), g = 0; g < f.length; g++) {
						var l = f[g],
							n = l.getAttribute("event"),
							l = this.parseNodeText(l);
						n && l && (k.trackingEvents[n] || (k.trackingEvents[n] = []), k.trackingEvents[n].push(l))
					}
					e = q.makeIterator(this.childsByName(d, "CompanionClickTracking"));
					for (p = e.next(); !p.done; p = e.next()) k.companionClickTrackingURLTemplates.push(this.parseNodeText(p.value));
					k.companionClickThroughURLTemplate = this.parseNodeText(this.childByName(d, "CompanionClickThrough"));
					k.companionClickTrackingURLTemplate = this.parseNodeText(this.childByName(d, "CompanionClickTracking"));
					c.variations.push(k)
				}
				return c
			};
			m.prototype.parseCreativeElement = function(a, c) {
				for (var b = this.childsByName(c, "Creative"), d = 0; d < b.length; d++) for (var k = b[d].childNodes, e = 0; e < k.length; e++) {
					var h = k[e],
						p = null;
					switch (h.nodeName) {
						case "Linear":
							p = this.parseCreativeLinearElement(h);
							break;
						case "NonLinearAds":
							p = this.parseNonLinear(h);
							break;
						case "CompanionAds":
							p = this.parseCompanionAd(h)
					}
					p && a.creatives.push(p)
				}
			};
			m.prototype.parseExtension = function(b, d) {
				for (var k = 0; k < d.length; k++) {
					var e = d[k],
						h = new a;
					if (e.attributes) for (var p = e.attributes, f = 0; f < p.length; f++) {
						var g = p[f];
						h.attributes[g.nodeName] = g.nodeValue
					}
					e = e.childNodes;
					for (p = 0; p < e.length; p++) {
						var g = e[p],
							l = this.parseNodeText(g);
						if ("#comment" !== g.nodeName && "" !== l || g.attributes) {
							f = new A;
							f.name = g.nodeName;
							f.value = l;
							if (g.attributes) for (g = g.attributes, l = 0; l < g.length; l++) {
								var n = g[l];
								f.attributes[n.nodeName] = n.nodeValue
							}
							h.children.push(f)
						}
					}
					b.push(h)
				}
			};
			m.prototype.parseInLineElement = function(a) {
				var c = new l;
				c.id = a.getAttribute("id") || null;
				c.sequence = a.getAttribute("sequence") || null;
				a = a.childNodes;
				for (var b = 0; b < a.length; b++) {
					var d = a[b];
					switch (d.nodeName) {
						case "Error":
							c.errorURLTemplates.push(this.parseNodeText(d));
							break;
						case "Impression":
							c.impressionURLTemplates.push(this.parseNodeText(d));
							break;
						case "Creatives":
							this.parseCreativeElement(c, d);
							break;
						case "Extensions":
							this.parseExtension(c.extensions, this.childsByName(d, "Extension"))
					}
				}
				return c
			};
			m.prototype.parseAdElement = function(a) {
				for (var c = a.childNodes, b = 0; b < c.length; b++) {
					var d = c[b];
					if ("Wrapper" === d.nodeName || "InLine" === d.nodeName) {
						this.copyNodeAttribute("id", a, d);
						this.copyNodeAttribute("sequence", a, d);
						if ("Wrapper" === d.nodeName) return this.parseWrapperElement(d);
						if ("InLine" === d.nodeName) return this.parseInLineElement(d)
					}
				}
				return null
			};
			m.prototype.urlResponseHandler = function(a, c, b, d, k, e) {
				function h() {
					for (var a = g.ads.length - 1; 0 <= a; a--) if (g.ads[a].nextWrapperURL) return;
					if (0 === f) if (0 === g.ads.length) p.trackError(g.errorURLTemplates, 303);
					else for (a = g.ads.length - 1; 0 <= a; a--) {
						var c = g.ads[a];
						if (c.errorCode || 0 === c.creatives.length) p.trackError(c.errorURLTemplates.concat(g.errorURLTemplates), c.errorCode || 303), g.ads.splice(a, 1)
					}
					d(k, g)
				}
				var p = this,
					f = this.currentWrapperDepth++;
				if (k) return d(k);
				var g = new u;
				if (!e || !e.documentElement || "VAST" !== e.documentElement.nodeName) return d();
				for (var l = 0; l < e.documentElement.childNodes.length; l++) {
					var n = e.documentElement.childNodes[l];
					"Error" === n.nodeName && g.errorURLTemplates.push(this.parseNodeText(n))
				}
				for (l = 0; l < e.documentElement.childNodes.length; l++) n = e.documentElement.childNodes[l], "Ad" === n.nodeName && ((n = this.parseAdElement(n)) ? g.ads.push(n) : this.trackError(g.errorURLTemplates, 101));
				e = g.ads.length;
				for (l = {
					$jscomp$this$10: void 0
				}; e--;) l.$jscomp$this$10 = this, n = g.ads[e], n.nextWrapperURL && (function(d) {
					return function(k) {
						if (c.length >= d.$jscomp$this$10.maxWrapperDepth || k.nextWrapperURL in c) k.errorCode = 302, delete k.nextWrapperURL;
						else {
							if (0 === k.nextWrapperURL.indexOf("//")) k.nextWrapperURL = location.protocol + k.nextWrapperURL;
							else if (-1 === k.nextWrapperURL.indexOf("://")) {
								var e = a.slice(0, a.lastIndexOf("/"));
								k.nextWrapperURL = e + "/" + k.nextWrapperURL
							}
							d.$jscomp$this$10.parse(k.nextWrapperURL, b, function(a, c) {
								delete k.nextWrapperURL;
								if (a) return k.errorCode = 301, h();
								c && c.errorURLTemplates && (g.errorURLTemplates = g.errorURLTemplates.concat(c.errorURLTemplates));
								if (0 === c.ads.length) k.creatives = [];
								else {
									var b = g.ads.indexOf(k);
									g.ads.splice(b, 1);
									for (var d = c.ads, e = 0; e < d.length; e++) {
										var p = d[e];
										p.errorURLTemplates = k.errorURLTemplates.concat(p.errorURLTemplates);
										p.impressionURLTemplates = k.impressionURLTemplates.concat(p.impressionURLTemplates);
										p.extensions = k.extensions.concat(p.extensions);
										p.sequence = k.sequence || p.sequence;
										if (k.trackingEvents) for (var f = 0; f < p.creatives.length; f++) {
											var l = p.creatives[f];
											if (k.trackingEvents[l.type]) for (var n = Object.keys(k.trackingEvents[l.type]), u = 0; u < n.length; u++) {
												var t = n[u];
												l.trackingEvents[t] || (l.trackingEvents[t] = []);
												l.trackingEvents[t] = l.trackingEvents[t].concat(k.trackingEvents[l.type][t])
											}
										}
										if (k.videoClickTrackingURLTemplates) for (f = 0; f < p.creatives.length; f++) l = p.creatives[f], "linear" === l.type && (l.videoClickTrackingURLTemplates = l.videoClickTrackingURLTemplates.concat(k.videoClickTrackingURLTemplates));
										if (k.videoClickThroughURLTemplate) for (creative in p.creatives) "linear" !== creative.type || creative.videoClickThroughURLTemplate || (creative.videoClickThroughURLTemplate = k.videoClickThroughURLTemplate);
										g.ads.splice(b, 0, p)
									}
								}
								return h()
							}, c)
						}
					}
				}(l)(n), l = {
					$jscomp$this$10: l.$jscomp$this$10
				});
				return h()
			};
			m.prototype.parse = function(a, c, b, d) {
				c = void 0 === c ? {} : c;
				d = void 0 === d ? [] : d;
				var k = a;
				b = void 0 === b ? function() {} : b;
				var e = c;
				"function" === typeof c && (b = c, e = {});
				this.maxWrapperDepth = e.maxWrapperDepth || 10;
				for (c = this.URLTemplateFilters.length - 1; 0 <= c; c--) k = (0, this.URLTemplateFilters[c])(a);
				d.push(k);
				(new E).get(k, e, this.urlResponseHandler.bind(this, a, d, e, b))
			};
			window.VASTParser = m
		})();
		b.prototype.debug = !1;
		b.prototype.log = function() {
			return null
		};
		window.InstreamapiDebug = b;
		var R = {
			level: 0,
			method: "AdControl",
			Uc: "NonLinear VPAID detected."
		}, A = {
			extensions: {},
			view: {}
		};
		e.prototype = {
			constructor: e,
			apply: function(a) {
				a.addEventListener = e.prototype.addEventListener;
				a.ib = e.prototype.ib;
				a.removeEventListener = e.prototype.removeEventListener;
				a.dispatchEvent = e.prototype.dispatchEvent
			},
			addEventListener: function(a, b) {
				this.I || (this.I = {});
				var d = this.I;
				d[a] || (d[a] = []); - 1 === d[a].indexOf(b) && d[a].push(b)
			},
			ib: function(a, b) {
				if (!this.I) return !1;
				var d = this.I;
				return d[a] || -1 === d[a].indexOf(b) ? !1 : !0
			},
			removeEventListener: function(a, b) {
				if (this.I) {
					var d = this.I[a];
					if (d) {
						var k = d.indexOf(b); - 1 !== k && d.splice(k, 1)
					}
				}
			},
			dispatchEvent: function(a) {
				if (this.I) {
					var b = this.I[a];
					if (b) {
						for (var d = b.length, k = [], e = 0, e = 0; e < d; e++) k[e] = b[e];
						for (b = 0; b < d; b++)(k[b] || function() {}).apply(this, [].slice.call(arguments))
					}
				}
			}
		};
		var a = function(a) {
			a.Xc = function(a) {
				var b = {};
				a.split("?")[1].split("&").forEach(function(a) {
					a = a.split("=");
					b[decodeURIComponent(a[0])] = decodeURIComponent(a[1]) || null
				});
				return b
			};
			a.Dc = {
				mp4: {
					typeExtension: "mp4",
					typeString: "video/mp4",
					Ha: "video/mp4|video/x-mp4"
				},
				ogv: {
					typeExtension: "ogv",
					typeString: "video/ogg",
					Ha: "video/ogg"
				},
				webm: {
					typeExtension: "webm",
					typeString: "video/webm",
					Ha: "video/webm"
				}
			};
			a.la = "application/javascript|application/x-javascript|text/javascript";
			a.Za = "application/x-shockwave-flash";
			a.Nb = function() {
				var b = document.createElement("video"),
					d = [],
					k = a.Dc,
					e = {}, h;
				for (h in k) k.hasOwnProperty(h) && (k[h].result = b.canPlayType(k[h].typeString), d.push(k[h].typeExtension + ":" + k[h].result), "" !== k[h].result && (e[h] = k[h]));
				y.log(901, d.join(", "));
				return e
			};
			a.Ac = function(a) {
				var b = "";
				/\?/.test(a) && (a = a.split("?"), a = a[0]);
				var c = a.split("."),
					c = c[c.length - 1];
				["mp4", "ogv", "webm"].forEach(function(a) {
					c === a && (b = a)
				});
				return b
			};
			a.Ma = !1;
			a.v = navigator.userAgent;
			a.zb = /MSIE/.test(a.v);
			a.Jc = /Opera/.test(a.v);
			a.Ab = /mobile/i.test(a.v);
			a.La = /android/i.test(a.v);
			a.$c = function() {
				["HTC Sensation", "HTC Sense"].forEach(function(b) {
					(new RegExp(b, "i")).test(a.v) && (a.Ma = !0)
				})
			}();
			a.C = a.La && /mobile/i.test(a.v) && !(/chrome/i.test(a.v) && /Mobile Safari/.test(a.v)) && !a.Ma;
			a.Db = a.C || /iPad/i.test(a.v);
			a.Cb = /TV/.test(a.v);
			a.sa = /iP(hone|ad|od)/i.test(a.v);
			a.ta = a.C || /iP(hone|od)/i.test(a.v);
			a.Hc = a.La && /chrome/i.test(a.v);
			a.Bb = /Mobile Safari/.test(a.v);
			a.Ic = !/chrome/i.test(a.v) && /android/i.test(a.v) && /safari/i.test(a.v) && (!a.Ab || a.Bb);
			a.$a = function() {
				return a.ta ? 300 : a.Db ? 670 : a.Cb ? 1100 : 0
			};
			a.Tc = function(a, b, c) {
				return Number(a) >= b && Number(a) <= c
			};
			a.kb = function(a) {
				return "[object Object]" === Object.prototype.toString.call(a)
			};
			a.isArray = function(a) {
				return "[object Array]" === Object.prototype.toString.call(a)
			};
			a.dc = function(a) {
				return "[object String]" === Object.prototype.toString.call(a)
			};
			a.isFunction = function(a) {
				return "[object Function]" === Object.prototype.toString.call(a)
			};
			a.g = function(a) {
				return "" != a && null != a && void 0 != a
			};
			a.A = function(a, b) {
				if (a) for (var c in b) a.style[c] = b[c]
			};
			a.urlEnrichment = new f;
			a.events = function() {};
			a.events.s = function() {
				var a = [],
					b = null;
				this.G = function(a, c) {
					if (null !== b) for (var e = 0; e < b.length; e++) b[e](a, c)
				};
				this.registerGlobalEventDispatcher = function(a) {
					null === b && (b = []);
					b.push(a)
				};
				this.B = function() {
					b = null
				};
				this.a = function(b, c) {
					a.push({
						event: b,
						listener: c
					})
				};
				this.f = function(b) {
					for (var c = 0; c < a.length; c++) a[c].event === b && a.splice(c, 1)
				};
				this.mc = function(b, c) {
					for (var d = 0; d < a.length; d++) {
						var e = c ? a[d].listener === c : !0;
						a[d].event === b && e && a.splice(d, 1)
					}
				};
				this.triggerEvent = function(b, c) {
					this.G(b, c);
					for (var d = 0; d < a.length; d++) {
						var e = a[d];
						e.event === b && "function" === typeof e.listener && e.listener({
							type: b,
							info: c
						})
					}
				};
				this.lc = function(b, c) {
					for (var d = 0; d < a.length; d++) {
						var e = a[d];
						e.event === b && "function" === typeof e.listener && e.listener(c)
					}
				}
			};
			a.events.Event = function() {
				var a = [];
				this.on = function(b, c, e) {
					if (b) {
						c = c.split(",");
						for (var h = 0; h < c.length; h++) "function" === typeof b.addEventListener ? b.addEventListener(c[h], e, !1) : "function" === typeof b.attachEvent && b.attachEvent("on" + c[h], e), a.push({
							target: b,
							Ya: c[h],
							Yb: e
						})
					}
				};
				this.off = function(b, c, e) {
					if (e) if (c = c.split(","), "all" === c[0]) for (c = 0; c < a.length; c++) a[c].target === b && a[c].Yb === e && ("function" === typeof b.removeEventListener ? b.removeEventListener(a[c].Ya, e) : "function" === typeof b.detachEvent && b.detachEvent("on" + a[c].Ya, e), a.splice(c, 1));
					else {
						for (var h = 0; h < c.length; h++) "function" === typeof b.removeEventListener ? b.removeEventListener(c[h], e) : "function" === typeof b.detachEvent && b.detachEvent("on" + c[h], e);
						a = []
					}
				}
			};
			a.wb = function() {
				function b() {
					h.triggerEvent("timeupdate", {
						id: d,
						data: f
					})
				}
				var d, e, f = null,
					h = new a.events.s;
				this.start = function() {
					d = setInterval(b, e)
				};
				this.stop = function() {
					clearInterval(d)
				};
				this.__defineSetter__("data", function(a) {
					f = a
				});
				this.a = h.a;
				this.f = h.f;
				e = 250
			};
			a.Tb = function() {
				var a = window,
					b = document,
					a = {
						innerWidth: [a.innerWidth, b.body.clientWidth, b.documentElement.clientWidth],
						innerHeight: [a.innerHeight, b.body.clientHeight, b.documentElement.clientHeight],
						scrollX: [a.scrollX, b.documentElement.scrollLeft, b.body.scrollLeft],
						scrollY: [a.scrollY, b.documentElement.scrollTop, b.body.scrollTop]
					}, c;
				for (c in a) if (a.hasOwnProperty(c)) {
					for (b = 0; b < a[c].length; b++) "number" !== typeof a[c][b] && (a[c].splice(b, 1), b--);
					a[c] = a[c][0]
				}
			};
			a.lb = "ontouchstart" in window || "ontouchstart" in document.documentElement;
			a.createElement = function(b, d) {
				var e = null;
				try {
					e = document.createElement(b)
				} catch (h) {
					e = document.createElement("<" + b + ">")
				}
				if (d) {
					"id" in d || e.setAttribute("id", a.Wa());
					for (var f in d) d.hasOwnProperty(f) && e.setAttribute(f, d[f])
				}
				return e
			};
			a.trim = function(a) {
				return a.replace(/^\s+|\s+$/g, "")
			};
			a.Wa = function() {
				return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
					var b = 16 * Math.random() | 0;
					return ("x" == a ? b : b & 3 | 8).toString(16)
				}).toUpperCase()
			};
			a.L = function(a) {
				var b = 0,
					c = a.split(".")[0],
					c = a.split(":").reverse();
				for (a = 0; a < c.length; a++) b += parseInt(c[a] * Math.pow(60, a), 10);
				return b
			};
			a.pb = function(b, d) {
				if (!b) return b;
				var e = !(!b || -1 === b.indexOf("%")),
					f = parseInt(b, 10),
					h;
				return d && e ? ("string" === typeof d ? h = a.L(d.split(".")[0]) : isNaN(d) || (h = parseInt(d, 10)), h && !isNaN(f) ? f / 100 * h : "IGNORE") : isNaN(b) ? a.L(b.split(".")[0]) : b
			};
			a.clone = function(b) {
				if (!b || "object" != typeof b) return b;
				var d = new b.constructor,
					e;
				for (e in b) b.hasOwnProperty(e) && (d[e] = a.clone(b[e]));
				return d
			};
			a.mb = function(a) {
				a && a.trim && (a = a.trim());
				return !!a && -1 === ["http://", "https://"].indexOf(a)
			};
			a.Fc = ["doubleclick", "smartclip.net", "adtech", "userreport.com"];
			a.wc = function(b) {
				var d = !1;
				if (!b) return d;
				a.Fc.forEach(function(a) {
					-1 < b.indexOf(a) && (d = !0)
				});
				return d
			};
			a.extend = function(a, b) {
				for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
				return a
			};
			a.jb = function(a) {
				return !!a.externalConfigXml
			};
			a.getHeight = function(a) {
				return !a || a && !a.getBoundingClientRect ? -1 : a.getBoundingClientRect().height
			};
			a.getWidth = function(a) {
				return !a || a && !a.getBoundingClientRect ? -1 : a.getBoundingClientRect().width
			};
			a.oc = function(b, d) {
				var e = b,
					f;
				for (f in d) d.hasOwnProperty(f) && a.g(d[f]) && (e = e.replace(String(f), String(d[f])));
				return e
			};
			a.i = function(b, d) {
				return a.g(b) ? b.getElementsByTagName(d) : []
			};
			a.b = function(b, d) {
				if (a.g(b)) return b.getElementsByTagName(d)[0]
			};
			a.c = function(b) {
				if (!b || !b.childNodes[0]) return !1;
				for (var d = b.childNodes.length, e = "", f = "", h = !1; d--;) if (4 === b.childNodes[d].nodeType) {
					f = a.trim(b.childNodes[d].nodeValue);
					break
				} else 3 === b.childNodes[d].nodeType && (e = a.trim(b.childNodes[d].nodeValue));
				1 < b.childNodes.length && (f = b.textContent);
				"" !== f ? h = f : "" !== e && (h = e);
				return h
			};
			a.h = function(a) {
				if (!a) return !1;
				for (var b = {}, c = 0; c < a.attributes.length; c++) b[a.attributes[c].name] = a.attributes[c].value;
				return b
			};
			a.isDocumentInFullScreenMode = function() {
				return document.Lb && null !== document.Lb || document.mozFullScreen || document.webkitIsFullScreen
			};
			a.Sc = function(a) {
				return "string" === typeof a && a.length ? Number(a) : !1
			};
			a.bd = function(a) {
				for (var b = window.frameElement, c = window; b;)(a || function() {})(b), c = b.ownerDocument.defaultView, b = c.frameElement;
				return c
			};
			a.Rc = function() {
				return [A.IDENTIFIER, A.API_VERSION, A.API_BUILD].join("|")
			};
			a.unique = function(a) {
				return a.reduce(function(a, b) {
					0 > a.indexOf(b) && a.push(b);
					return a
				}, [])
			};
			return a
		}(a || {}),
			y = new b,
			ga = [],
			ua = [];
		a.find = function(a, b) {
			return Array.prototype.map.call((b || document).querySelectorAll(a), function(a) {
				return a
			})
		};
		a.isFunction = function(a) {
			var b = Object.prototype.toString.call(a);
			return "[object Function]" === b || "function" === typeof a && "[object RegExp]" !== b || "undefined" !== typeof window && (a === window.setTimeout || a === window.alert || a === window.confirm || a === window.prompt)
		};
		a.ec = function(b) {
			return a.isFunction(b.canPlayType) && a.isFunction(b.play)
		};
		var wa = window.ois = function p(b, e, f) {
			if (a.isFunction(b)) return ga.forEach(function(a) {
				b(a.ea, a.element, a.jc, {
					adManager: a.adManager,
					config: a.Vc
				})
			}), ua.push(b);
			if ("number" === typeof b || "undefined" === typeof b) return ga[b || 0].ea;
			if (b.nodeType) return null !== b.getAttribute("data-ois-instance-id") ? (f = ga[b.getAttribute("data-ois-instance-id")], e && f.w.ma(e), f.ea) : e ? g(b, e, f) : null;
			if (a.ec(b)) return b.nodeType = "ois", p(b, e, f);
			if ("string" === typeof b) {
				var h = a.find(b)[0];
				return h && p(h, e, f)
			}
			return null
		};
		wa(function(b, d, e, f) {
			var h = f.w;
			b.load = function() {};
			b.shutdown = function() {
				delete ga[d.getAttribute("data-ois-instance-id")];
				d.removeAttribute("data-ois-instance-id")
			};
			b.registerVASTExtension = function(a, b) {
				window[a] = b;
				var d = h.Ob();
				d.vastExtensions[a] = !0;
				h.ma(d)
			};
			b.utils = a;
			return b
		});
		wa(function(a) {
			function b(e, k) {
				a.unsubscribe(b, "AdTagParsed");
				if ((!k || 0 !== k.ads.length) && k) {
					for (var h = g = 0; h < k.ads.length; h++) {
						var f = k.ads[h].creatives.filter(function(a) {
							return "linear" === a.type && a.duration
						});
						g += f[0].duration
					}
					0 === g && (g = -1)
				}
			}
			var e = null,
				f = -1,
				h = -1,
				g = -1,
				A = -1;
			a.subscribe(function() {
				a.subscribe(b, "AdTagParsed")
			}, "AdSlotComplete");
			a.subscribe(function(a, b) {
				e = new Date;
				h = b.creatives[0].duration;
				this.dispatchEvent("AdDurationChange")
			}, "AdLoaded");
			a.subscribe(function() {
				var b = (new Date - e) / 1E3;
				f = h - b;
				var d = a.Ub(); - 1 < d && (A = d - b);
				this.dispatchEvent("AdDurationChange");
				this.dispatchEvent("AdRemainingTimeChange")
			}, "AdVideoTimeupdate");
			a.subscribe(b, "AdTagParsed");
			a.getAdRemainingTime = function() {
				return f
			};
			a.getAdDuration = function() {
				return h
			};
			a.Qc = function() {
				return A
			};
			a.Ub = function() {
				return g
			}
		});
		wa(function(a, b, e, f) {
			function h(a, b, d) {
				var e = "undefined" != typeof XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
				e.open("GET", a, !0);
				e.onreadystatechange = function() {
					4 === e.readyState && (200 === e.status ? (b || Function)(e.responseXML) : (d || Function)(e.status))
				};
				e.send(null)
			}
			function g(b) {
				var d = {};
				if ((b = b.getElementsByTagName("OIS")) && b[0]) {
					for (var e = b[0].children.length - 1; 0 <= e; e--) {
						var k = b[0].children[e];
						d[k.tagName] = k.textContent
					}
					l.ma(d);
					t = !0;
					m && a.startAd()
				}
			}
			function A() {
				t = !0;
				m && a.startAd()
			}
			var l = f.w,
				t = !1,
				m = !1,
				n = a.startAd;
			a.startAd = function() {
				m = !0;
				t && n.apply(a, [].slice.call(arguments))
			};
			(function() {
				var a = e.configXML;
				a ? h(a, g, A) : t = !0
			})();
			return a
		});
		A.API_VERSION = "3.0.1";
		A.API_BUILD = "002ef1";
		A.IDENTIFIER = "OISHTML5VE";
		A.MediaSelector = function(b, d) {
			function e(a) {
				return "boolean" === typeof a ? a : "string" === typeof a && "true" === a ? !0 : !1
			}
			function f(a) {
				return "string" === typeof a ? a.toLowerCase() : a
			}
			function h(b) {
				var d = !0;
				l.forEach(function(h) {
					var g;
					a: {
						for (g in h) break a;
						g = void 0
					}
					g = f(g);
					h = f(h[g]);
					if (a.g(g) && a.g(h)) switch (g) {
						case "delivery":
						case "type":
						case "mimeType":
						case "apiframework":
							"type" === g && (g = "mimeType");
							"mimeType" === g && (h = h.split("|"));
							b.hasOwnProperty(g) && -1 === h.indexOf(b[g].toLowerCase()) && (d = !1);
							break;
						case "bitrate":
						case "width":
							b.hasOwnProperty(g) && parseInt(b[g], 10) > parseInt(h, 10) && (d = !1);
							break;
						case "scalable":
						case "maintainaspectratio":
							b.hasOwnProperty(g) && e(b[g]) !== e(h) && (d = !1)
					}
				});
				return d
			}
			function g() {
				m && (q = m.filter(function(a) {
					return h(a)
				}))
			}
			var A = new a.events.s,
				l = d.eb(),
				m = b.u() && b.u().creatives[0].mediaFiles,
				q = [];
			this.a = A.a;
			this.f = A.f;
			this.registerGlobalEventDispatcher = A.registerGlobalEventDispatcher;
			this.yc = function() {
				q.sort(function(a, b) {
					return parseInt(a.bitrate, 10) > parseInt(b.bitrate, 10) ? 1 : parseInt(a.bitrate, 10) < parseInt(b.bitrate, 10) ? -1 : 0
				})
			};
			this.Kb = function() {
				g();
				1 > q.length && (d.removeRule("bitrate"), l = d.eb(), g());
				return this
			};
			this.bb = function() {
				return q
			}
		};
		A.extensions.CustomTrackingEvents = function(b, d, e, f, h) {
			function g(a) {
				switch (a.info) {
					case "creativeView":
						E.start()
				}
			}
			var m, l, q = this,
				R = [],
				n = new a.events.s,
				E;
			this.Mb = function() {
				var a = Math.round(100 * (l.totalTime - l.Ea)) / 100,
					d = b.ha().N || void 0;
				return {
					"[sc_systemDomain]": "undefined",
					"[sc_viewtime]": a,
					"[sc_percentvisible]": d,
					"[uif_adslot]": "linear"
				}
			};
			this.setViewport = function() {};
			this.destroy = function() {};
			this.a = n.a;
			this.f = n.f;
			(function() {
				b.Vb();
				l = d;
				m = f;
				m.a("onTrack", g);
				var a = new A.extensions.CustomTrackingEvents.Parser;
				e && (R = a.parse(e));
				E = new A.extensions.CustomTrackingEvents.CustomTrackingEventHandler(b.ha, R, q, m);
				h.a("AdStopped", E.destroy)
			})()
		};
		A.extensions.CustomTrackingEvents.Parser = function() {
			this.parse = function(b) {
				var d, e = [];
				b = a.i(b, "Tracking");
				for (var f = 0; f < b.length; f++) {
					var h = b[f];
					d = a.h(h);
					h = a.c(h);
					d = a.extend({}, d);
					"viewableImpression" === d.event && (d.offset = d.offset ? 1E3 * a.L(d.offset) : 2E3, d.visibility = d.visibility ? parseInt(d.visibility, 10) : 50);
					d.url = h;
					e.push(d)
				}
				return e
			}
		};
		A.extensions.CustomTrackingEvents.CustomTrackingEventHandler = function(b, d, e, f) {
			function h(d) {
				d = d.info.data;
				b().N > d.visibility ? d.Da++ : d.Da = 0;
				if (250 * d.Da / 1E3 >= d.offset / 1E3) {
					if (a.g(d.url)) {
						var g = a.urlEnrichment.H(a.oc(d.url, e.Mb()));
						f.Sa(g, "viewableImpression")
					}
					d.F.f("timeupdate", h);
					d.F.stop()
				}
			}
			function g() {
				try {
					d.forEach(function(a) {
						a.F.f("timeupdate", h);
						a.F.stop()
					})
				} catch (a) {}
			}
			var A;
			this.start = function() {
				d = d.filter(function(a) {
					return "viewableImpression" === a.event
				});
				b && d.length && d.forEach(function(b) {
					A = new a.wb;
					A.data = b;
					b.F = A;
					b.Da = 0;
					A.a("timeupdate", h);
					A.start()
				})
			};
			this.destroy = function() {
				g()
			}
		};
		window.ois(function(b, d) {
			function e(a, d) {
				function h() {
					a.apply(this, arguments);
					b.unsubscribe(h, d)
				}
				b.subscribe(h, d)
			}
			function f(b) {
				b = b.target.getAttribute("data-program");
				b = m[b];
				(new Image).src = a.urlEnrichment.H(b.clickTracking);
				window.open(b.clickThrough, "_blank")
			}
			function h() {
				if (A) {
					for (var b in m) {
						var d = m[b],
							e = document.createElement("img"),
							h;
						for (h in d.attributes) d.attributes[h] && e.setAttribute(h, d.attributes[h]);
						e.setAttribute("data-program", b);
						e.style.pointerEvents = "auto";
						e.style.cursor = "pointer";
						e.addEventListener("click", f);
						A.appendChild(e);
						(new Image).src = a.urlEnrichment.H(d.Ec)
					}
					A.style.display = "block"
				}
			}
			function g() {
				A && A.parentNode.removeChild(A)
			}
			Number.isFinite = Number.isFinite || function(a) {
				return "number" === typeof a && isFinite(a)
			};
			var A = null,
				l = [],
				m = {}, q = {
					Ga: 0,
					W: 0,
					xa: 0,
					Lc: 0
				};
			(function() {
				e(function(a, b) {
					l = b;
					A = document.createElement("div");
					A.setAttribute("style", "position:absolute;width:100%;height:100%;top:0;left:0;display:none;");
					d.parentNode.appendChild(A);
					for (var e = l.length - 1; 0 <= e; e--) {
						var h = l[e],
							k = h.attributes.Zc || "unknown-" + e;
						if (!m[k]) {
							var f = {
								attributes: {},
								style: {}
							};
							f.style.width = parseInt(h.attributes.width, 10) + "px";
							f.style.height = parseInt(h.attributes.height, 10) + "px";
							f.style.position = "absolute";
							var g = parseInt(h.attributes.yPosition, 10);
							Number.isFinite(g) ? 0 < g ? f.style.top = g + "px" : f.style.bottom = Math.abs(g) + "px" : (f.style.top = "top" === h.attributes.yPosition ? 0 : "initial", f.style.bottom = "bottom" === h.attributes.yPosition ? 0 : "initial");
							g = parseInt(h.attributes.xPosition, 10);
							Number.isFinite(g) ? 0 < g ? f.style.left = g + "px" : f.style.right = Math.abs(g) + "px" : "left" === h.attributes.xPosition ? "top" === h.attributes.yPosition ? (f.style.left = q.Ga + "px", q.Ga += parseInt(h.attributes.width, 10)) : "bottom" === h.attributes.yPosition ? (f.style.left = q.xa + "px", q.xa += parseInt(h.attributes.width, 10)) : f.style.left = 0 : "right" === h.attributes.xPosition ? "top" === h.attributes.yPosition ? (f.style.right = q.W + "px", q.W += parseInt(h.attributes.width, 10)) : "bottom" === h.attributes.yPosition ? (f.style.right = q.Qa + "px", q.Qa += parseInt(h.attributes.width, 10)) : f.style.right = 0 : (f.style.top = 0, f.style.right = q.W + "px", q.W += parseInt(h.attributes.width, 10));
							f.attributes.style = JSON.stringify(f.style);
							f.attributes.style = f.attributes.style.substring(1, JSON.stringify(f.style).length - 1);
							f.attributes.style = f.attributes.style.replace(/\"/ig, "").replace(/\,/ig, ";") + ";";
							f.attributes.src = h.StaticResource.nodeValue;
							f.clickThrough = h.IconClickThrough;
							f.clickTracking = h.IconClickTracking;
							f.Ec = h.IconViewTracking;
							f.offset = (new Date("01/01/1970 " + h.attributes.offset)).getSeconds() || 0;
							f.duration = (new Date("01/01/1970 " + h.attributes.duration)).getSeconds() || -1;
							m[k] = f
						}
					}
				}, 4300);
				e(h, "AdStarted");
				e(g, "AdStopped")
			})()
		})
	})();
	var ya = {
		listVersions: function(b, e) {
			for (var f = [b.getVersion()], g = e.length - 1; 0 <= g; g--) {
				var r = e[g];
				r.getVersion && f.push(r.getVersion())
			}
			console.log(f)
		}
	};
	var za = {}, Aa, Ba = window.getComputedStyle(document.documentElement, ""),
		Fa = (Array.prototype.slice.call(Ba).join("").match(/-(moz|webkit|ms)-/) || "" === Ba.OLink && ["", "o"])[1],
		Ga = "WebKit|Moz|MS|O".match(new RegExp("(" + Fa + ")", "i"))[1];
	Aa = {
		js: Fa[0].toUpperCase() + Fa.substr(1),
		dom: Ga,
		css: "-" + Fa + "-",
		lowercase: Fa
	};
	za.prefix = Aa;
	var Ha = {};

	function Ia(b) {
		var e = [];
		e.forEach.call(e.slice.call(arguments, 1), function(e) {
			if (e) for (var g in e)({}).hasOwnProperty.call(e, g) && (b[g] = "object" === typeof b[g] && "object" === typeof e[g] && null !== e[g] ? Ia(b[g], e[g]) : e[g])
		});
		return b
	}
	Ha.extend = Ia;
	var Ja = {
		PublisherConfig: function(b) {
			var e = {
				adRequest: "",
				adResponse: "",
				timeText: "",
				headerText: "Advertisement",
				skipText: "",
				skipOffset: -1,
				uiLayout: "minimal",
				volume: .75,
				minFlashVersion: 10,
				visibilityThreshold: 50,
				behaviourMatrix: {},
				featureMatrix: {},
				prefetching: !1,
				onCappedCallback: function() {},
				onStartCallback: function() {},
				onEndCallback: function() {},
				onPrefetchCompleteCallback: function() {},
				minElementHeight: 30,
				forceCollapseOnShutdown: !0,
				parentProspectorValue: null
			}, f = {
				flash: {
					enabled: !0,
					source: "//cdn.smartclip.net/multiplayer/4.4.0/player.swf"
				},
				layout: {
					enabled: !0,
					source: "//cdn.smartclip.net/multiplayer/4.4.0/style.css"
				},
				endingScreen: {
					enabled: !0,
					source: ""
				},
				bestFit: {
					enabled: !0
				},
				formats: {
					wide: !0,
					square: !0,
					vertical: !0
				},
				formatChange: {
					inline: ["wide", "vertical", "square"],
					fullscreen: ["wide", "vertical"]
				}
			}, g = {
				init: {
					collapsed: !0,
					paused: !0,
					muted: !0
				},
				onScreen: {
					collapsed: !1,
					paused: !1,
					muted: !0
				},
				offScreen: {
					collapsed: !1,
					paused: !0,
					muted: !0
				},
				complete: {
					collapsed: !0,
					paused: !1,
					muted: !0
				},
				onClick: {
					collapsed: !1,
					paused: !0,
					muted: !0
				},
				mouseOver: {
					collapsed: !1,
					paused: !1,
					muted: !1
				},
				mouseOut: {
					collapsed: !1,
					paused: !1,
					muted: !0
				}
			}, r = {};
			return function(b) {
				b.behaviourMatrix = Ha.extend(g, b.behaviourMatrix);
				b.featureMatrix = Ha.extend(f, b.featureMatrix);
				return r = Ha.extend(e, b)
			}(b)
		}
	};
	var Ka = {
		BaseAPI: function(b, e, f) {
			function g() {}
			var r = e.debug || !1,
				C = {
					utils: {},
					model: {},
					controller: {},
					view: {}
				};
			C.publisherConfig = new Ja.PublisherConfig(e);
			C.elements = null;
			C.debug = (r ? console.log : g || g).bind(console, "[SmartPlay (4.4.0-gf028866)]");
			C.info = (2 <= r ? console.log : g || g).bind(console, "[SmartPlay Info (4.4.0-gf028866)]");
			C.getVersion = function() {
				return "4.4.0-gf028866"
			};
			C.shutdown = function() {
				(e.onShutdown || g)(b);
				C.elements.iframe.parentNode && b.removeChild(C.elements.iframe);
				C.elements.backdrop.parentNode && b.removeChild(C.elements.backdrop);
				delete f[b.getAttribute("data-smartPlay-instance-id")];
				b.removeAttribute("data-smartPlay-instance-id");
				C.elements.nodes && 0 < C.elements.nodes.length && C.elements.nodes[0].style.removeProperty("transition");
				b.id && -1 !== b.id.indexOf("sc-") && b.parentNode && b.parentNode.removeChild(b)
			};
			(function() {
				b.style.transition = b.style[za.prefix.js + "Transition"] = "height 0.5s";
				b.style.position = "relative";
				b.style.overflow = "hidden";
				var e = b.id.replace(/\W+/g, "-");
				b.insertAdjacentHTML("beforeend", '<div id="' + e + '-backdrop" style="width: 100%; height: inherit; position: absolute; border: 0; margin: 0; top: 0; left: 0;"></div>');
				b.insertAdjacentHTML("beforeend", '<iframe id="' + e + '-frame" frameborder="0" scrolling="no" style="width: 100%; height: inherit; position: absolute; border: 0; margin: 0; top: 0; left: 0;"></iframe>');
				C.elements = {
					iframe: b.querySelector("#" + e + "-frame"),
					backdrop: b.querySelector("#" + e + "-backdrop")
				};
				C.elements.iframeDocument = C.elements.iframe.contentDocument;
				C.elements.iframeDocument.open().write("<!doctype html><html><head></head><body></body></html>");
				C.elements.iframeDocument.close()
			})();
			return C
		}
	};
	(window.ElementLocator = function Pa(e, f) {
		function g(e, f) {
			return "undefined" === typeof e ? f : e
		}
		function r() {}
		function C(e) {
			for (var f = []; e.parentNode;) if (null !== e.getAttribute("id")) {
				f.unshift("#" + e.getAttribute("id"));
				break
			} else {
				if (e === e.ownerDocument.documentElement) f.unshift(e.tagName.toLowerCase());
				else {
					for (var g = e, m = 1, m = 1; g.previousElementSibling; m++) g = g.previousElementSibling;
					f.unshift(e.tagName.toLowerCase() + ":nth-child(" + m + ")")
				}
				e = e.parentNode
			}
			return f.join(">")
		}
		function q() {
			if (!O) return null;
			var e = Array.prototype.slice.call(G.querySelectorAll("img")),
				f = {};
			Array.prototype.slice.call(G.querySelectorAll("p")).forEach(function(e) {
				var g = C(e.parentNode);
				f[g] = f[g] || {
					a: 0,
					height: 0
				};
				f[g].a += 1;
				f[g].height += e.getBoundingClientRect().height;
				f[g].node = e.parentNode
			});
			e.forEach(function(e) {
				for (var g = e; g.parentNode;) {
					var m = C(g.parentNode);
					if (f[m]) {
						f[m].a += 1;
						f[m].height += e.getBoundingClientRect().height;
						break
					}
					g = g.parentNode
				}
			});
			return (e = Object.keys(f).sort(function(e, g) {
				return f[g].height - f[e].height
			})) && 0 < e.length ? f[e[0]] : null
		}
		function L(e, f) {
			var g = e.getBoundingClientRect(),
				m = f.getBoundingClientRect();
			return g.top < m.top ? -1 : g.top > m.top ? 1 : 0
		}
		function Q() {
			var e = q();
			B("located content block", e);
			var f = 0,
				g = null,
				m = ["div", "p", "section"].map(function(a) {
					return 0 < J.length ? a + J.split("/").join("\\/") : a
				}),
				w = G.body.getBoundingClientRect(),
				r = G;
			e && (r = e.node);
			e = Array.prototype.slice.call(r.querySelectorAll(m.join(",")));
			[].sort.call(e, L);
			if (0 < J.length && 1 === e.length) return B("only located one element based on", J, "stopping further checks"), e[0];
			F && (S = N + S, N = 0);
			m = [];
			B("elements found in the content block", e);
			for (r = 0; r < e.length; r++) {
				var R = e[r].getBoundingClientRect(),
					R = e[r].offsetTop || R.top - w.top,
					A = e[r].offsetWidth;
				A <= ba ? B("skipping element", e[r], "because it does not match height or is smaller than", ba) : R > N && R < N + S && (B(e[r], "in close inspection"), A >= f && (f = A, m.push(e[r]), B("selected", e[r], f, A)))
			}
			0 < m.length && (g = m[Math.floor(m.length / 2)], B("suitableElements collected", m, "and in the end", g, "selected"));
			return g
		}
		var P = {}, w = g(f, {}),
			M = g(e, Pa.b),
			S = g(w.scanPixelsBelowViewport, 600),
			ba = g(w.minimumElementWidth, 320),
			H = g(w.elementFloat, "none"),
			F = g(w.allowInViewport, !1),
			J = g(w.elementSelector, ""),
			m = g(w.insertPosition, "afterend"),
			O = g(w.locateContent, !0),
			N = 0,
			G = document,
			B = (g(w.debug, !1) ? console.log : r || r).bind(console, "[ElementLocator (1.3.4-g17fe717)]");
		P.c = function() {
			return "1.3.4-g17fe717"
		};
		(function() {
			for (var e = window.frameElement, g = window; e;) g = e.ownerDocument.defaultView, e = g.frameElement;
			G = g.document;
			N = G.documentElement.clientHeight;
			(e = Q()) ? (g = G.createElement("div"), g.setAttribute("id", M), g.style.cssFloat = H, e.insertAdjacentHTML ? e.insertAdjacentHTML(m, g.outerHTML) : e.appendChild(g), P.element = e, P.container = G.querySelector("#" + g.getAttribute("id")), P.containerId = g.getAttribute("id")) : (B("could not locate a suitable element, bailing"), B("innerHeight", N, "options", f))
		})();
		return P
	}).b = window.ElementLocator.generateRandomID = function() {
		return "sc-" + Math.random().toString(36).substring(7)
	};
	var Qa = {
		onDocumentReady: function(b, e) {
			var f = e || document;
			if ("interactive" === f.readyState || "complete" === f.readyState) b.call();
			else {
				var g = setTimeout(function() {
					g = 0;
					b.call()
				}, 2E3);
				f.onreadystatechange = function() {
					"interactive" === f.readyState && g && (clearTimeout(g), b.call())
				}
			}
		}
	};
	var Ra = {}, Sa = [],
		Ta = [],
		Za = window.SmartPlay = function Ua(e, f, g) {
			function r(e, f, g) {
				if (!e.getAttribute("data-smartPlay-instance-id")) {
					e.setAttribute("data-smartPlay-instance-id", Sa.length);
					var r = new Ka.BaseAPI(e, f, Sa);
					Sa.push({
						api: r,
						element: e,
						config: f
					});
					Qa.onDocumentReady(function() {
						Ta.forEach(function(g) {
							g(r, e, f)
						});
						r.listVersions = ya.listVersions.bind(this, r, Ta);
						(g || function() {})(r, e)
					}, e.ownerDocument)
				}
				return Sa[parseInt(e.getAttribute("data-smartPlay-instance-id"), 10)].api
			}
			function C(e) {
				var f = Object.prototype.toString.call(e);
				return "[object Function]" === f || "function" === typeof e && "[object RegExp]" !== f
			}
			return function() {
				if (C(e)) return Qa.onDocumentReady(function() {
					-1 === Ta.indexOf(e) && Sa.forEach(function(f) {
						e(f.api, f.element, f.config)
					})
				}), Ta.push(e);
				if ("number" === typeof e || "undefined" === typeof e) return Sa[e || 0] ? Sa[e || 0].api : null;
				if (e.nodeType) return null !== e.getAttribute("data-smartPlay-instance-id") ? (Sa[e.getAttribute("data-smartPlay-instance-id")] || {
					api: null
				}).api : f ? r(e, f, g) : null;
				if ("string" === typeof e && 0 < e.length) {
					var q = e; - 1 === q.lastIndexOf("#", 0) && -1 === q.lastIndexOf(".", 0) && (q += ", #" + q + ", ." + q);
					return (q = la.findRecursiveUp(q)[0]) && Ua(q, f, g)
				}
				if (C(ElementLocator)) {
					(q = f) || (q = {
						elementLocator: {}
					});
					q.elementLocator ? q.elementLocator.debug = q.debug : q.elementLocator = {
						debug: q.debug
					};
					var L = new ElementLocator(ElementLocator.generateRandomID(), q.elementLocator);
					if (L.element) return q.locatedElement = L.element, Ua(L.container, q, g)
				}
				return null
			}()
		};
	Ra.smartPlay = Za;

	function $a() {
		this.states = []
	}
	$a.prototype.addState = function(b) {
		b.valid && (b.initialize(), this.states.push(b))
	};
	$a.prototype.removeState = function(b) {
		this.states = this.states.filter(function(e) {
			return e.id === b ? (e.destroy(), !1) : !0
		})
	};
	$a.prototype.removeAllStates = function() {
		for (var b = this.states.length - 1; 0 <= b; b--) this.states[b].destroy();
		this.states = []
	};
	$a.prototype.getState = function(b) {
		return this.states.filter(function(e) {
			return e.id === b ? !0 : !1
		}).shift()
	};
	$a.prototype.isActive = function(b) {
		return (this.getState(b) || {}).active || !1
	};
	var ab = {};

	function bb(b) {
		var e = [];
		for (b = b.parentNode; b;) {
			var f = b.ownerDocument,
				g = null;
			f && (g = f.defaultView);
			g && g.frameElement && (e.unshift(g.frameElement), e = bb(g.frameElement).concat(e));
			e.unshift(b);
			b = b.parentNode
		}
		return e.splice(2)
	}
	ab.elementParentNodes = bb;
	ab.parentNodes = function(b, e) {
		var f = bb(b),
			g = f.length - 1;
		for (k(e) ? g = e : isString(e) && la.findRecursiveUp(e); 0 <= g; g--) if (f[g].getBoundingClientRect().height > minHeight) return f.splice(g + 1);
		return []
	};
	var cb = {};

	function db(b, e, f, g) {
		(function(r) {
			var C = this,
				q = arguments;
			b[e] = function() {
				var b;
				g && (b = r.apply(C, q));
				f.apply(C, q);
				g || (b = r.apply(C, q));
				return b
			}
		})(b[e])
	}
	cb.hookBefore = function(b, e, f) {
		db(b, e, f, !0)
	};
	cb.hookAfter = function(b, e, f) {
		db(b, e, f, !1)
	};

	function gb(b) {
		this.id = b.id || Math.random().toString(36).substring(7);
		this.options = b;
		for (var e in this.options) this.options.hasOwnProperty(e) && "function" === typeof this.options[e] && (this.options[e] = [this.options[e]]);
		this.valid = !0;
		this.active = !1
	}
	gb.prototype.callMethods = function(b) {
		if (b) for (var e = b.length, f = [].slice.call(arguments), g = 0; g < e; g++) if (!b[g].apply(this, f)) return !1;
		return !0
	};
	gb.prototype.destroy = function() {};
	gb.prototype.initialize = function() {};
	gb.prototype.enter = function() {
		this.callMethods(this.options.canEnter) && (this.callMethods(this.options.onFirstRun), this.callMethods(this.options.onEnter), this.options.onFirstRun = [], this.active = !0)
	};
	gb.prototype.exit = function() {
		this.callMethods(this.options.canLeave) && (this.callMethods(this.options.onLeave), this.active = !1)
	};
	var hb = {}, ib = null;

	function jb() {
		return window !== top
	}
	hb.topLevelWindow = function(b) {
		var e = window.frameElement,
			f = window;
		if (!b && ib) return ib;
		for (; e;)(b || function() {})(e), f = e.ownerDocument.defaultView, e = f.frameElement;
		return ib = f
	};
	hb.isIF = jb;
	hb.isFIF = function() {
		return jb() && null !== window.frameElement
	};
	var kb = {};

	function lb() {
		return !!window._smartclip_amp
	}
	kb.isAmp = lb;
	kb.isAmpObserveIntersection = function() {
		return lb() && !(!window.context || !window.context.observeIntersection)
	};
	Ra.smartPlay(function(b) {
		b.utils = b.utils || {};
		b.utils.topLevelWindow = hb.topLevelWindow.bind(b);
		b.utils.getTopBoundingClientRect = function(b) {
			var f = b.getBoundingClientRect(),
				f = {
					bottom: f.bottom,
					height: f.height,
					left: f.left,
					right: f.right,
					top: f.top,
					width: f.width
				};
			b = b.ownerDocument.defaultView;
			for (b = b.frameElement; null !== b;) {
				var g = b.getBoundingClientRect();
				f.left += g.left;
				f.top += g.top;
				f.right = f.left + f.width;
				f.bottom = f.top + f.height;
				b = b.ownerDocument.defaultView;
				b = b.frameElement
			}
			return f
		};
		b.utils.isIF = hb.isIF.bind(b);
		b.utils.isFIF = hb.isFIF.bind(b);
		b.utils.browserInfo = function() {
			var b = navigator.userAgent,
				f, g = b.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [],
				r = {
					browser: null,
					version: 0
				};
			if (/trident/i.test(g[1])) return f = /\brv[ :]+(\d+)/g.exec(b) || [], r.browser = "MSIE", r.version = parseInt(f[1] || 0, 10), r;
			if ("Chrome" === g[1] && (f = b.match(/\b(OPR|Edge)\/(\d+)/), null !== f)) return r.browser = f.slice(1).join(" ").replace("OPR", "Opera"), r;
			g = g[2] ? [g[1], g[2]] : [navigator.appName, navigator.appVersion, "-?"];
			f = b.match(/version\/(\d+)/i);
			null !== f && g.splice(1, 1, f[1]);
			r.browser = g[0];
			r.version = parseInt(g[1], 10);
			return r
		}();
		b.utils.getFlashVersion = function() {
			var b = -1 !== navigator.appVersion.indexOf("MSIE") ? !0 : !1;
			b || (b = parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1], 10));
			var f = -1 !== navigator.appVersion.toLowerCase().indexOf("win") ? !0 : !1,
				g = -1 !== navigator.userAgent.indexOf("Opera") ? !0 : !1,
				r = null,
				r = null;
			if (null !== navigator.plugins && 0 < navigator.plugins.length && (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"])) return r = navigator.plugins["Shockwave Flash" + (navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "")].description.split(" "), r = r[2].split("."), parseInt(r[0], 10);
			if (b && f && !g) try {
				return r = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")).GetVariable("$version").split(","), parseInt(r[0].substr(4), 10)
			} catch (C) {}
			return 7
		};
		b.utils.isAmp = kb.isAmp.bind(b);
		b.utils.isAmpObserveIntersection = kb.isAmpObserveIntersection.bind(b)
	});
	var mb = {
		Visibility: function(b, e, f) {
			function g(f) {
				f || (f = e.utils.getTopBoundingClientRect(b));
				q.top = f.top;
				q.left = f.left;
				q.bottom = f.top + q.height;
				q.right = f.left + q.width;
				var g = q;
				f = 0;
				var r = g.width * g.height,
					g = ((g.right < L.right ? g.right : L.right) - (g.left > L.left ? g.left : L.left)) * ((g.bottom < L.bottom ? g.bottom : L.bottom) - (g.top > L.top ? g.top : L.top));
				0 < g && (f = g / r);
				C.visibility = 100 * f
			}
			function r() {
				e.utils.isAmpObserveIntersection() && window.context.observeIntersection(function(b) {
					b.forEach(function(b) {
						g(b.boundingClientRect)
					})
				})
			}
			var C = {
				visibility: 0,
				distance: Infinity
			}, q = {
				width: f.width,
				height: f.height
			}, L;
			C.update = function(b) {
				b && (q = {
					width: b.width,
					height: b.height
				});
				e.utils.isAmp() || g()
			};
			(function() {
				var b = e.utils.topLevelWindow();
				e.utils.isAmp() && (b = window.context.initialIntersection.rootBounds, b = {
					innerHeight: b.height,
					innerWidth: b.width
				}, r());
				L = {
					top: 0,
					left: 0,
					bottom: b.innerHeight,
					right: b.innerWidth,
					height: b.innerHeight,
					width: b.innerWidth
				}
			})();
			return C
		}
	};

	function nb(b, e, f) {
		gb.call(this, f);
		this.visibilityModel = new mb.Visibility(b, e, e.size);
		this.topLevelWindow = e.utils.topLevelWindow();
		this.api = e;
		this.topLevelWindow === top || e.utils.isAmp() || (this.valid = !1)
	}
	Y.inherits(nb, gb);
	nb.prototype.initialize = function() {
		var b = this;
		gb.prototype.initialize.call(this);
		this.valid && (this.visibilityModel.update(this.api.size), this.updateTimeout = setInterval(function() {
			b.visibilityModel.update(b.api.size);
			b.visibilityModel.visibility >= (b.options.requiredVisibility || 50) ? b.enter() : b.exit()
		}, this.options.reportInterval || 50))
	};
	nb.prototype.destroy = function() {
		this.updateTimeout && (clearInterval(this.updateTimeout), this.updateTimeout = null)
	};
	Ra.smartPlay(function(b, e, f) {
		function g() {
			if (b.elements.nodes && 0 < b.elements.nodes.length) {
				var e = b.elements.nodes[0].style.overflow;
				b.elements.nodes[0].style.overflow = "hidden";
				b.elements.nodes[0].style.height = "0px";
				setTimeout(function() {
					b.elements.nodes[0].style.overflow = e
				}, 500)
			}
		}
		function r(b) {
			var e = window.getComputedStyle(b);
			b = parseFloat(e.marginTop) + parseFloat(e.marginBottom);
			e = parseFloat(e.paddingTop) + parseFloat(e.paddingBottom);
			return b + e
		}
		function C() {
			var f = 0;
			if (b.elements.nodes && !(b.elements.nodes && 1 > b.elements.nodes.length)) for (var g = b.elements.nodes.length - 1; 0 <= g; g--) {
				var m = b.elements.nodes[g],
					q = m.childNodes,
					w = m.getAttribute("sc-size");
				if (!w || parseInt(w, 10) !== b.size.height) {
					for (var w = window.getComputedStyle(m, ":before"), C = r(m), f = f + C, C = q.length - 1; 0 <= C; C--) {
						var B = q[C];
						if (B.nodeType === Node.ELEMENT_NODE && -1 === b.elements.nodes.indexOf(B) && B !== e) var E = r(B),
							f = f + Math.ceil(B.getBoundingClientRect().height + E)
					}
					w.content && (f += parseInt(w.lineHeight, 10));
					m.style.height = b.size.height + f + "px";
					m.setAttribute("sc-size", b.size.height)
				}
			}
		}
		function q(g) {
			g = (g || e).getBoundingClientRect();
			var q = window.msMatchMedia || window.MozMatchMedia || window.WebkitMatchMedia || window.matchMedia,
				m = 16 / 9;
			"undefined" !== typeof q && b.environmentVars && (q("(orientation: portrait)").matches && b.environmentVars.hasVerticalAds ? m = .5625 : q("(orientation: portrait)").matches && b.environmentVars.hasSquareAds && (m = 1));
			var r = q = g.width;
			r >= f.minAdWidth && r <= f.maxAdWidth || (g.width > f.maxAdWidth ? q = f.maxAdWidth : g.width < f.minAdWidth && (q = 0));
			return {
				width: Math.round(q),
				height: Math.round(q / m)
			}
		}
		function L() {
			ba = context.onResizeDenied(function(e, f) {
				5 <= H ? (b.debug("recieved 5 or more onResizeDenied, shutting down."), b.shutdown()) : (H++, context.requestResize(f, e))
			})
		}
		function Q() {
			S = setInterval(function() {
				b.canExpand() && b.resize()
			}, 1E3 / 15)
		}
		var P = {};
		b.controller = b.controller || {};
		b.controller.sizeManager = P;
		var w = new $a;
		b.size = {
			width: 0,
			height: 0
		};
		var M = !1,
			S = null;
		P.collapseContainer = function(f) {
			if (M || f) e.style.height = "0px", b.utils.isAmp() && context.requestResize(b.size.width, 0), g(), M = !1
		};
		P.expandContainer = function(f) {
			if (!M || f) {
				e.style.height = b.size.height + "px";
				b.utils.isAmp() && context.requestResize(b.size.width, b.size.height);
				if (b.elements.nodes && 1 < b.elements.nodes.length) {
					var g = b.elements.nodes[0].style.overflow;
					b.elements.nodes[0].style.overflow = "hidden";
					setTimeout(function() {
						b.elements.nodes[0].style.overflow = g
					}, 500)
				}
				C();
				M = !0
			}
		};
		b.resize = function() {
			var f = q();
			if (b.size.width !== f.width || b.size.height !== f.height) b.size = f, b.environmentVars.size = b.size, b.elements.iframe.style.width = f.width + "px", b.elements.iframe.style.height = f.height + "px", b.elements.backdrop.style.width = f.width + "px", b.elements.backdrop.style.height = f.height + "px", e.style.height = f.height + "px", b.utils.isAmp() && context.requestResize(b.size.width, b.size.height)
		};
		var ba = null,
			H = 0;
		cb.hookBefore(b, "shutdown", function() {
			w.removeAllStates();
			if (b.elements.nodes && b.elements.nodes.length) for (var e = b.elements.nodes.length - 1; 0 <= e; e--) {
				var f = b.elements.nodes[e];
				f.style.cssText = f.getAttribute("data-smartplay-cssText")
			}
			clearInterval(S);
			S = null;
			b.utils.isAmp() && ba && ba()
		});
		(function() {
			var g = b.publisherConfig,
				r = e.getBoundingClientRect(),
				m = e;
			1 >= r.width && (r = ab.parentNodes(e, g.minElementHeight)) && 0 < r.length && (b.debug("found", r, "using", r[0], "as size reference"), m = r[0]);
			m = b.size = q(m);
			1 > m.width ? (f.prefetching = g.prefetching = !1, setTimeout(function() {
				b.shutdown()
			}, 100), b.debug("could not fit into", f.minAdWidth, "calling shutdown")) : (b.elements.iframe.style.width = m.width + "px", b.elements.iframe.style.height = m.height + "px", b.elements.backdrop.style.width = m.width + "px", b.elements.backdrop.style.height = m.height + "px", w.addState(new nb(e, b, {
				requiredVisibility: 1,
				canEnter: b.isReady,
				onFirstRun: function() {}
			})), b.utils.isAmp() && L(), Q())
		})()
	});

	function ob(b, e, f) {
		gb.call(this, f);
		this.element = e.utils.topLevelWindow()
	}
	Y.inherits(ob, gb);
	ob.prototype.initialize = function() {
		var b = this;
		gb.prototype.initialize.call(this);
		this.element.addEventListener("touchmove", function() {
			b.enter()
		}, !1);
		this.element.addEventListener("touchend", function() {
			b.exit()
		}, !1);
		this.element.addEventListener("touchcancel", function() {
			b.exit()
		}, !1)
	};

	function pb(b, e) {
		gb.call(this, e);
		this.element = b
	}
	Y.inherits(pb, gb);
	pb.prototype.initialize = function() {
		var b = this;
		gb.prototype.initialize.call(this);
		this.element.addEventListener("mouseover", function() {
			b.enter()
		}, !1);
		this.element.addEventListener("mouseout", function() {
			b.exit()
		}, !1)
	};
	Y.initSymbol();
	Symbol();

	function qb(b, e, f) {
		gb.call(this, f);
		this.api = e;
		"undefined" !== typeof document.hidden ? (this.hidden = "hidden", this.visibilityChange = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (this.hidden = "mozHidden", this.visibilityChange = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (this.hidden = "msHidden", this.visibilityChange = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (this.hidden = "webkitHidden", this.visibilityChange = "webkitvisibilitychange");
		if ("undefined" === typeof document.addEventListener || "undefined" === typeof this.hidden) e.debug("Page Visibility API unsupported."), this.valid = !1;
		this.visibilityChangeHandler = this.handleVisibilityChange.bind(this)
	}
	Y.inherits(qb, gb);
	qb.prototype.handleVisibilityChange = function() {
		document[this.hidden] ? this.enter() : this.exit()
	};
	qb.prototype.initialize = function() {
		gb.prototype.initialize.call(this);
		this.valid && document.addEventListener(this.visibilityChange, this.visibilityChangeHandler, !1)
	};
	qb.prototype.destroy = function() {
		document.removeEventListener(this.visibilityChange, this.visibilityChangeHandler, !1)
	};
	var rb = {};
	Ra.smartPlay(function(b) {
		b.model = b.model || {};
		b.model.EnvironmentVars = function() {
			var b = {}, f = this;
			f.observe = function(g, r) {
				b.hasOwnProperty(g) ? (b[g].observers.push(r), null !== b[g].value && r(b[g].value)) : (b[g] = {
					value: null,
					observers: [r]
				}, Object.defineProperty(f, g, {
					set: function(f) {
						b[g].value = f;
						b[g].observers.forEach(function(f) {
							f(b[g].value)
						})
					},
					get: function() {
						return b[g].value
					},
					enumerable: !0,
					configurable: !0
				}))
			};
			f.disconnect = function(g, r) {
				f.hasOwnProperty(g) && (b[g].observers = [], Object.defineProperty(f, g, {
					set: void 0
				}), !0 === r && (delete b[g], delete f[g]))
			};
			return f
		}
	});
	rb.ENGINE_HTML5 = "HTML5";
	rb.ENGINE_FLASH = "FLASH";
	var sb = {
		CampaignOverrideConfig: function(b, e) {
			e.subscribe(function(e, g) {
				if (g && g.extensions && 0 < g.extensions.length) for (var r = 0; r < g.extensions.length; r++) {
					var C = g.extensions[r];
					if ("SmartPlayConfig" === C.getAttribute("name")) for (var C = C.childNodes, q = 0; q < C.length; q++) {
						var L = C[q],
							Q = L && (L.textContent || L.text || "").trim();
						if (b.publisherConfig.hasOwnProperty(L.nodeName) && Q) b.publisherConfig[L.nodeName] = Q;
						else if (L.childNodes) for (var Q = L.nodeName, P = 0; P < L.childNodes.length; P++) {
							var w = L.childNodes[P];
							if (b.publisherConfig[Q].hasOwnProperty(w.nodeName) && w.attributes) for (var M = 0; M < w.attributes.length; M++) {
								var S = w.attributes[M];
								b.publisherConfig[Q][w.nodeName][S.nodeName] = "true" === S.nodeValue
							}
						}
					}
				}
			}, "AdTagParsed")
		}
	};
	Ra.smartPlay(function(b) {
		function e(b, e) {
			function f() {
				b.apply(this, arguments);
				C.unsubscribe(f, e)
			}
			C.subscribe(f, e)
		}
		function f(e, f) {
			var g = f.linear || [],
				P = g.filter(function(b) {
					return b.attributes.format === ois.MediaFileFormat.VERTICAL
				}),
				g = g.filter(function(b) {
					return b.attributes.format === ois.MediaFileFormat.SQUARE
				});
			C.adManager.removeRules("format");
			C.adManager.addRuleToRuleSet({
				format: ois.MediaFileFormat.WIDE
			});
			P.length && r.featureMatrix.formats.vertical && (b.environmentVars.hasVerticalAds = !0, C.adManager.addRuleToRuleSet({
				format: ois.MediaFileFormat.VERTICAL
			}));
			g.length && r.featureMatrix.formats.square && (b.environmentVars.hasSquareAds = !0, C.adManager.addRuleToRuleSet({
				format: ois.MediaFileFormat.SQUARE
			}))
		}
		var g = {};
		b.controller = b.controller || {};
		b.controller.sizeBasedFormat = g;
		var r = {}, C = null;
		g.setVPAIDAd = function(b) {
			C = b;
			r.featureMatrix.bestFit.enabled && e(f, "AdTagParsed")
		};
		r = b.publisherConfig
	});

	function tb(b, e, f) {
		f.onEnter = this.onVisible;
		nb.call(this, b, e, f);
		this.originalCreateTracker = null;
		this.collectedTrackers = [];
		this.shudownCalled = !1;
		this.api = e;
		this.options = f;
		e.publisherConfig.prefetching || (this.valid = !1)
	}
	Y.inherits(tb, nb);
	tb.prototype.oisTrackerCollector = function(b, e, f, g) {
		var r = g.adManager;
		(function() {
			var e = this;
			this.originalCreateTracker = r.trackingController().createTracker;
			r.trackingController().createTracker = function(b) {
				b.trackEvent && "error" === b.trackEvent && e.collectedTrackers.push(b)
			};
			b.subscribe(function() {
				r.trackingController().createTracker = e.originalCreateTracker
			}, "AdStarted")
		}).apply(this)
	};
	tb.prototype.fireCollectedTrackers = function() {
		for (var b = 0; b < this.collectedTrackers.length; b++) this.originalCreateTracker(this.collectedTrackers[b]);
		this.collectedTrackers = []
	};
	tb.prototype.shudownOverride = function() {
		this.shudownCalled = !0;
		this.visibilityModel.visibility >= (this.options.requiredVisibility || 50) && (this.fireCollectedTrackers(), this.originalShutdown())
	};
	tb.prototype.destroy = function() {
		nb.prototype.destroy.call(this)
	};
	tb.prototype.onVisible = function() {
		this.fireCollectedTrackers();
		this.shudownCalled && this.originalShutdown()
	};
	tb.prototype.initialize = function() {
		nb.prototype.initialize.call(this);
		this.valid && (this.api.publisherConfig.prefetching && (this.originalShutdown = this.api.shutdown, this.api.shutdown = this.shudownOverride.bind(this)), ois(this.oisTrackerCollector.bind(this)))
	};
	Ra.smartPlay(function(b) {
		b.model = b.model || {};
		b.model.PlayerInterface = function() {
			return {
				dom: {
					nodes: [{
						tag: "div",
						attributes: {
							id: "slots-wrapper"
						},
						nodes: [{
							tag: "video",
							attributes: {
								id: "video-slot",
								"class": "back-color",
								preload: "auto",
								"data-bind": "volume: volume",
								src: null
							}
						}, {
							tag: "div",
							attributes: {
								id: "display-slot"
							}
						}]
					}, {
						tag: "div",
						attributes: {
							id: "replay-ui",
							"class": "minimal paused",
							style: "display: none;",
							"data-bind": "class: playState"
						},
						nodes: [{
							tag: "div",
							attributes: {
								id: "buttonbar",
								"class": "front-hl-color"
							},
							nodes: [{
								tag: "div",
								attributes: {
									style: "display: table-row"
								},
								nodes: [{
									tag: "div",
									attributes: {
										"class": "button click-through back-color left",
										"data-bind": "click: triggerClickThrough"
									},
									nodes: [{
										tag: "div",
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-web"
											}
										}]
									}]
								}, {
									tag: "div",
									attributes: {
										"class": "button click-through back-color",
										"data-bind": "click: togglePlay"
									},
									nodes: [{
										tag: "div",
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-play"
											}
										}]
									}]
								}]
							}]
						}, {
							tag: "div",
							attributes: {
								id: "controlbar",
								"class": "front-hl-color"
							},
							nodes: [{
								tag: "div",
								attributes: {
									style: "display: table-row"
								},
								nodes: [{
									tag: "div",
									attributes: {
										id: "progress"
									},
									nodes: [{
										tag: "div",
										attributes: {
											id: "progress-bg",
											"class": "back-std-color light"
										}
									}, {
										tag: "div",
										attributes: {
											id: "progress-bar",
											"class": "back-hl-color",
											"data-bind": "style: percentCloseTimeout"
										}
									}]
								}]
							}]
						}]
					}, {
						tag: "div",
						attributes: {
							id: "player-ui",
							"class": "paused",
							style: "display: none;",
							"data-bind": "class: playState"
						},
						nodes: [{
							tag: "div",
							attributes: {
								id: "header",
								"class": "front-std-color text-shadow"
							},
							nodes: [{
								tag: "div",
								attributes: {
									id: "countdown",
									"data-bind": "innerHTML: headerText, style: validDuration"
								}
							}]
						}, {
							tag: "div",
							attributes: {
								id: "big-play",
								"class": "button front-hl-color text-shadow",
								"data-bind": "click: togglePlay"
							},
							nodes: [{
								tag: "span",
								attributes: {
									"class": "scmp-big-play"
								}
							}]
						}, {
							tag: "div",
							attributes: {
								id: "skipbar",
								"class": "front-hl-color"
							},
							nodes: [{
								tag: "div",
								attributes: {
									style: "display: table-row"
								},
								nodes: [{
									tag: "div",
									attributes: {
										id: "skip",
										"class": "button back-color front-hl-color",
										"data-bind": "click: skip"
									},
									nodes: [{
										tag: "div",
										attributes: {
											"data-bind": "innerHTML: skipText"
										}
									}, {
										tag: "div",
										attributes: {
											"class": "wrapper"
										},
										nodes: [{
											tag: "span",
											attributes: {
												"class": "skip-close scmp-plus rotate-45"
											}
										}, {
											tag: "canvas",
											attributes: {
												width: "28",
												height: "28",
												"class": "skip-countdown enabled"
											}
										}]
									}]
								}, {
									tag: "div",
									attributes: {
										id: "play-ios",
										"class": "button back-color",
										"data-bind": "click: togglePlay"
									},
									nodes: [{
										tag: "div",
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-play"
											}
										}]
									}]
								}, {
									tag: "div",
									attributes: {
										"class": "button click-through back-color",
										"data-bind": "click: triggerClickThrough"
									},
									nodes: [{
										tag: "div",
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-web"
											}
										}]
									}]
								}]
							}]
						}, {
							tag: "div",
							attributes: {
								id: "controlbar",
								"class": "back-color front-hl-color"
							},
							nodes: [{
								tag: "div",
								attributes: {
									style: "display: table-row"
								},
								nodes: [{
									tag: "div",
									attributes: {
										id: "play",
										"class": "button",
										"data-bind": "click: togglePlay"
									},
									nodes: [{
										tag: "div",
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-play"
											}
										}]
									}]
								}, {
									tag: "div",
									attributes: {
										id: "progress"
									},
									nodes: [{
										tag: "div",
										attributes: {
											id: "progress-bg",
											"class": "back-std-color light"
										}
									}, {
										tag: "div",
										attributes: {
											id: "progress-loaded",
											"class": "back-std-color",
											"data-bind": "style: percentLoaded"
										}
									}, {
										tag: "div",
										attributes: {
											id: "progress-bar",
											"class": "button back-hl-color",
											"data-bind": "click: seek, style: percentPlayed"
										}
									}]
								}, {
									tag: "div",
									attributes: {
										id: "progress-text",
										"data-bind": "style: validTimeText"
									},
									nodes: [{
										tag: "span",
										attributes: {
											"class": "front-hl-color",
											"data-bind": "innerHTML: timeText, style: validDuration"
										}
									}]
								}, {
									tag: "div",
									attributes: {
										id: "sound"
									},
									nodes: [{
										tag: "div",
										attributes: {
											id: "volume-increase",
											"class": "button",
											"data-bind": "click: volumeChange"
										},
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-plus"
											}
										}]
									}, {
										tag: "div",
										attributes: {
											id: "volume-level",
											"class": "button",
											"data-bind": "click: toggleMute"
										},
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-volume-0-mute scmp-volume-25 scmp-volume-50 scmp-volume-75 scmp-volume-100",
												"data-bind": "class: volumeLevel"
											}
										}]
									}, {
										tag: "div",
										attributes: {
											id: "volume-decrease",
											"class": "button",
											"data-bind": "click: volumeChange"
										},
										nodes: [{
											tag: "span",
											attributes: {
												"class": "scmp-minus"
											}
										}]
									}]
								}]
							}]
						}]
					}],
					attributes: {
						"class": "back-color",
						style: "margin: 0; padding: 0; width: 100%; height: 100%;",
						"data-bind": "class: uiLayout"
					}
				}
			}
		}
	});
	Number.isFinite = Number.isFinite || function(b) {
		return "number" === typeof b && isFinite(b)
	};

	function ub(b, e) {
		this.view = b;
		this.color = e;
		this.skipUI = this.view.querySelector("#skip");
		this.canvas = this.view.querySelector("#skip canvas");
		this.outerRadius = this.canvas.width / 2;
		this.innerRadius = this.outerRadius - 5;
		this.ctx = this.canvas.getContext("2d")
	}
	ub.prototype.countdown = function(b) {
		var e = -1 * Math.PI / 2,
			f = this.innerRadius - 2;
		b = Math.min(Math.max(0, 1 - b || 1), 1);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);
		this.ctx.beginPath();
		this.ctx.arc(this.outerRadius, this.outerRadius, f, e, 2 * Math.PI * b + e, !1);
		this.ctx.strokeStyle = this.color;
		this.ctx.lineCap = "butt";
		this.ctx.lineWidth = 2;
		this.ctx.stroke();
		this.ctx.closePath()
	};
	ub.prototype.activate = function() {
		this.skipUI.classList.add("active")
	};
	ub.prototype.deactivate = function() {
		this.skipUI.classList.remove("active")
	};
	ub.prototype.enable = function() {
		this.skipUI.classList.add("enabled")
	};
	ub.prototype.getSeconds = function(b) {
		b = Number.isFinite(b) ? [b] : b.split(":");
		for (var e = 0, f = 1; 0 < b.length;) e += f * parseInt(b.pop(), 10), f *= 60;
		return e
	};
	Ra.smartPlay(function(b) {
		b.controller = b.controller || {};
		b.controller.Player = function() {
			function e(b, f) {
				var a = f || document.body;
				b.nodes.forEach(function(b) {
					var f = document.createElement(b.tag),
						g;
					for (g in b.attributes) b.attributes[g] && f.setAttribute(g, b.attributes[g]);
					b.content && f.insertAdjacentHTML("beforeend", b.content);
					b.nodes && 0 < b.nodes.length && e(b, f);
					a.appendChild(f)
				});
				for (var g in b.attributes) b.attributes[g] && a.setAttribute(g, b.attributes[g])
			}
			function f() {
				var b = F.querySelector(".overlay #player-ui #controlbar");
				b && b.classList.remove("active")
			}
			function g() {
				var b = F.querySelector(".overlay #player-ui #controlbar");
				b && b.classList.add("active");
				clearTimeout(ja);
				ja = setTimeout(f, 5E3)
			}
			function r() {
				F.querySelector("#volume-level > span").setAttribute("class", "scmp-volume-0-mute")
			}
			function C() {
				if (!(m.paused || (B && B.ready ? (m.currentTime = parseInt(B.getAdDuration() - B.getAdRemainingTime(), 10), m.duration = parseInt(B.getAdDuration(), 10)) : m.currentTime = N.currentTime || G.getAdDuration() - G.getAdRemainingTime(), m.currentTime > m.duration))) {
					Number.isFinite(m.duration) && 0 < m.duration && Number.isFinite(m.currentTime) && (m.validDuration = "visibility: visible");
					"" !== O.timeText && (m.validTimeText = "display: table-cell");
					if (Number.isFinite(O.skipOffset) && -1 < O.skipOffset) {
						var b = m.currentTime / O.skipOffset;
						if (!Number.isFinite(b)) return;
						E.activate();
						1 > b ? E.countdown(b) : E.enable()
					}
					m.timeText = O.timeText.replace("[currentTime]", parseInt(m.currentTime, 10)).replace("[remainingTime]", parseInt(m.duration - m.currentTime, 10)).replace("[duration]", parseInt(m.duration, 10));
					m.headerText = O.headerText.replace("[currentTime]", parseInt(m.currentTime, 10)).replace("[remainingTime]", parseInt(m.duration, 10) - parseInt(m.currentTime, 10)).replace("[duration]", parseInt(m.duration, 10));
					m.percentPlayed = "width: " + 100 * m.currentTime / m.duration + "%"
				}
			}
			function q() {
				r();
				for (var b = 25; b <= 100 * m.volume;) F.querySelector("#volume-level > span").classList.add("scmp-volume-" + b), b += 25
			}
			function L() {
				var e = b.utils.getTopBoundingClientRect(b.elements.iframe);
				m.size && m.size.width === parseInt(e.width, 10) && m.size.height === parseInt(e.height, 10) || (m.size = {
					width: parseInt(e.width, 10),
					height: parseInt(e.height, 10)
				}, B && B.ready && B.resizeAd(m.size.width, m.size.height, "normal"))
			}
			function Q(b, e, a) {
				e.addEventListener(b, a);
				ka.push({
					event: b,
					element: e,
					listener: a
				})
			}
			function P(b, e, a) {
				m.observe(a, function(a) {
					b ? (b.setAttribute && b.setAttribute(e, a), b[e] = a) : ca("Couldn't deliver update for " + e + " set " + a + ". Target not present.")
				});
				U.push({
					element: b,
					attribute: e,
					property: a
				})
			}
			function w(b, e) {
				for (var a = e.split(" ").join("").split(","), f = 0; f < a.length; f++) {
					var g = a[f].split(":"),
						m = g[0],
						g = g[1];
					"function" === typeof H[g] ? Q(m, b, H[g]) : P(b, m, g)
				}
			}
			function M() {
				U.forEach(function(b) {
					m.disconnect(b.property, !0)
				});
				ka.forEach(function(b) {
					b.element.removeEventListener(b.event, b.listener)
				});
				U = ka = []
			}
			function S() {
				m.videoSlot = N = F.querySelector("#video-slot");
				m.slot = F.querySelector("#display-slot");
				N.addEventListener("timeupdate", function() {
					m.currentTime = this.currentTime
				});
				N.addEventListener("loadedmetadata", function() {
					m.duration = this.duration
				});
				N.addEventListener("durationchange", function() {
					m.duration = this.duration
				});
				N.addEventListener("progress", function() {
					4 === this.readyState && (m.percentLoaded = "width: " + 100 * this.buffered.end(0) / m.duration + "%")
				});
				N.addEventListener("volumechange", function() {
					m.muted || q()
				});
				"overlay" === O.uiLayout && Q("mousemove", N, g);
				Q("resize", F.defaultView, L);
				for (var b = F.querySelectorAll("[data-bind]"), e = 0; e < b.length; e++) b[e].getAttribute("data-bind") && 0 < b[e].getAttribute("data-bind").length && w(b[e], b[e].getAttribute("data-bind"))
			}
			function ba() {
				P(G, "adVolume", "volume");
				G.subscribe(function(b, e) {
					ca("[VPAID Event] AdLoaded", e);
					m.paused = !1;
					m.playState = "playing";
					e && e.linear && e.linear[0] && e.linear[0].skipoffset && (O.skipOffset = E.getSeconds(e.linear[0].skipoffset));
					null !== e.creatives[0].skipDelay && (O.skipOffset = E.getSeconds(e.creatives[0].skipDelay))
				}, "AdLoaded");
				G.subscribe(function() {
					m.pausedByUser || (ca("[VPAID Event] AdStarted", arguments, N.currentTime), E.deactivate(), clearInterval(X), X = setInterval(C, 250), m.pausedByUser = !1, G && m.muted && G.setAdVolume(0))
				}, "AdStarted");
				G.subscribe(function() {
					ca("[VPAID Event] AdVideoComplete", arguments);
					O.behaviourMatrix.complete.collapsed || (b.iOSExitFullscreen(), H.pausePlayback(), N.currentTime = 0, m.pausedByUser = !0);
					O.behaviourMatrix.complete.collapsed && M()
				}, "AdSlotComplete");
				G.subscribe(function() {
					ca("[VPAID Event] AdStopped", arguments)
				}, "AdStopped");
				G.subscribe(function() {
					m.duration = N.duration || G.getAdDuration()
				}, "AdDurationChange");
				G.subscribe(function() {
					ca("[VPAID Event] AdVideoPause", arguments);
					m.paused = !0;
					m.playState = "paused"
				}, "AdVideoPause");
				G.subscribe(function() {
					ca("[VPAID Event] AdVideoPlay", arguments);
					m.paused = !1;
					m.playState = "playing";
					B && B.ready && !B.initialized && O.prefetching && b.canInteract() && (B.initAd(b.size.width, b.size.height, "normal", 300, m.adData.linear[0], {}), G.adManager.startLinear(), G.adManager.triggerEvent("AdStarted"));
					!m.HTML5VPAIDStarted && m.isVPAID && !B && O.prefetching && b.canInteract() && (m.HTML5VPAIDStarted = !0, G.adManager.startLinear(), G.adManager.triggerEvent("AdStarted"))
				}, "AdVideoPlay");
				G.subscribe(function() {
					ca("[VPAID Event] AdVideoResume", arguments);
					m.paused = !1;
					m.playState = "playing"
				}, "AdVideoResume");
				G.subscribe(function() {
					ca("[VPAID Event] AdVolumeChange", arguments);
					m.volume = G.adVolume;
					H.volumeChange()
				}, "AdVolumeChange");
				G.subscribe(function() {
					ca("[VPAID Event] AdSkippableStateChange", arguments);
					E.activate();
					E.enable()
				}, "AdSkippableStateChange");
				G.subscribe(function() {
					function b() {
						document[e] || (document.removeEventListener(a, b, !1), setTimeout(function() {
							G.resumeAd()
						}, 300))
					}
					ca("[VPAID Event] AdClickThru", arguments);
					var e, a;
					"undefined" !== typeof document.hidden ? (e = "hidden", a = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (e = "mozHidden", a = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (e = "msHidden", a = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (e = "webkitHidden", a = "webkitvisibilitychange");
					a && document.addEventListener(a, b, !1)
				}, "AdClickThru")
			}
			var H = this,
				F = null,
				J = {}, m = {}, O = {}, N = null,
				G = null,
				B = null,
				E = null,
				X = 0,
				ka = [],
				U = [],
				ja = 0,
				ca = b.debug;
			H.skip = H.skip = function() {
				ca("[VPAIDInterface] In skipAd()");
				G.skipAd();
				B && B.ready && B.skipAd();
				E.deactivate()
			};
			H.pausePlayback = function() {
				m.paused || (ca("[VPAIDInterface] In pauseAd()"), G.pauseAd(), B && B.ready && B.pauseAd(), N.removeAttribute("controls"))
			};
			H.resumePlayback = function() {
				m.paused && (ca("[VPAIDInterface] In resumeAd()"), G.resumeAd(), B && B.ready && B.resumeAd())
			};
			H.togglePlay = H.togglePlay = function() {
				m.paused ? (m.pausedByUser = !1, H.resumePlayback()) : (m.pausedByUser = !0, H.pausePlayback())
			};
			H.triggerClickThrough = H.triggerClickThrough = function() {
				G.adManager.clickThrough()
			};
			H.seek = H.seek = function() {};
			H.volumeChange = H.volumeChange = function(b) {
				var e = m.volume;
				m.volume = .25 * Math.round(e / .25);
				null === b ? q() : ("volume-increase" === b.target.id ? (e += .25, 1 < e && (e = 1)) : "volume-decrease" === b.target.id && (e -= .25, 0 > e && (e = 0)), m.volume = e, N.muted && "volume-increase" === b.target.id ? (H.unmute(), B && B.ready && B.setAdVolume(e)) : N.muted ? (q(), setTimeout(function() {
					r()
				}, 1E3)) : (B && B.ready && B.setAdVolume(e), q()))
			};
			H.mute = function() {
				r();
				m.muted = !0;
				N.muted = !0;
				B && B.ready && B.muteAd();
				G && G.setAdVolume(0)
			};
			H.unmute = function() {
				q();
				m.muted = !1;
				N.muted = !1;
				B && B.ready && B.setAdVolume(m.volume);
				G && G.setAdVolume(m.volume)
			};
			H.toggleMute = H.toggleMute = function() {
				m.toggleMuteByUser = !0;
				N.muted ? H.unmute() : H.mute()
			};
			H.initView = function(b, f) {
				J = b;
				F = f;
				var a = O.featureMatrix.layout.source,
					g = f.head || document.head,
					r = document.createElement("link");
				r.setAttribute("href", a);
				r.setAttribute("type", "text/css");
				r.setAttribute("rel", "stylesheet");
				g.appendChild(r);
				a = O.borderStyle;
				f.defaultView.frameElement.style.boxSizing = "border-box";
				f.defaultView.frameElement.style.border = a;
				e(J.dom, f.body);
				S();
				/Android.+Firefox\//.test(navigator.userAgent) && m.videoSlot.setAttribute("src", ("file" === location.protocol ? "https" : location.protocol) + "//cdn.smartclip.net/assets/9999999/test/black.mp4");
				/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && "overlay" === O.uiLayout && (O.uiLayout = "minimal");
				a = Array.prototype.slice.call(F.body.classList).join(" ");
				m.uiLayout = a + " " + O.uiLayout;
				m.skipText = O.skipText;
				m.pausedByUser = !1;
				m.volume = .25 * Math.round(O.volume / .25);
				q();
				E = new ub(F, "#F5F5F5");
				L();
				m.playerReady = !0
			};
			H.setVPAIDAd = function(b) {
				ca("setVPAIDAd", b);
				G = b;
				ba()
			};
			m = b.environmentVars;
			O = b.publisherConfig;
			return H
		}
	});

	function vb(b) {
		this.behaviourMatrix = b;
		this.handlers = {}
	}
	vb.prototype.registerBehaviourHandler = function(b, e) {
		this.handlers[b] || (this.handlers[b] = []);
		this.handlers[b].push(e)
	};
	vb.prototype.callMethods = function(b) {
		if (b) for (var e = b.length, f = 0; f < e; f++) if (!b[f].apply(this, [].slice.call(arguments).slice(1))) return !1;
		return !0
	};
	vb.prototype.executeBehavioursForState = function(b) {
		var e = this.behaviourMatrix[b],
			f;
		for (f in e) e.hasOwnProperty(f) && this.callMethods(this.handlers[f], b, e[f])
	};
	vb.prototype.removeAllHandlers = function() {
		this.handlers = []
	};
	Ra.smartPlay(function(b, e, f) {
		function g(b, e) {
			function a() {
				b.apply(this, arguments);
				J.unsubscribe(a, e)
			}
			J.subscribe(a, e)
		}
		function r() {
			b.iOSExitFullscreen();
			M.forceCollapseOnShutdown && S.collapseContainer();
			J.shutdown();
			b.shutdown()
		}
		function C() {
			var f = 0;
			g(function() {
				G = !0;
				0 < f && !B && (M.featureMatrix.endingScreen.enabled = !1);
				X.executeBehavioursForState("complete")
			}, "AdSlotComplete");
			g(function() {
				try {
					M.onEndCallback(b, e)
				} catch (f) {
					b.debug("onEndCallback failure", f)
				}
			}, "AdSkipped");
			g(function() {
				if (0 < f && !B) try {
					M.onCappedCallback(b, e)
				} catch (g) {
					b.debug("onCappedCallback failure", g)
				}
				try {
					M.onEndCallback(b, e)
				} catch (g) {
					b.debug("onEndCallback failure", g)
				}
				setTimeout(function() {}, 500)
			}, "AdSlotComplete");
			g(function() {
				b.info(M.behaviourMatrix);
				B = !0;
				b.elements.iframeDocument.body.classList.add("started");
				N && S.expandContainer();
				try {
					M.onStartCallback(b, e)
				} catch (f) {
					b.debug("onStartCallback failure", f)
				}
				b.resize()
			}, "AdStarted");
			J.subscribe(function() {
				f++
			}, "AdCapped")
		}
		function q() {
			M.prefetching ? (g(function() {
				X.executeBehavioursForState("init");
				N || F.pausePlayback();
				try {
					M.onPrefetchCompleteCallback(b, e)
				} catch (f) {
					b.debug("onPrefetchCompleteCallback failure", f)
				}
			}, "AdVideoPlay"), J.startAd()) : X.executeBehavioursForState("init")
		}
		function L() {
			J.resizeAd(w.size.width, w.size.height, "normal")
		}
		function Q() {
			function f() {
				g.play();
				this.removeEventListener("touchmove", f)
			}
			var g = document.createElement("video"),
				a = document.createElement("source");
			Object.defineProperty(w.videoSlot, "src", {
				get: function() {
					return w.videoSource
				},
				set: function(a) {
					a && 0 !== a.length && (w.videoSource = a, w.videoSlot.setAttribute("src", a))
				},
				enumerable: !0,
				configurable: !0
			});
			a.type = "video/mp4";
			a.src = ("file" === location.protocol ? "https" : location.protocol) + "//cdn.smartclip.net/assets/9999999/test/black.mp4";
			g.appendChild(a);
			b.utils.topLevelWindow().addEventListener("touchmove", f, !1);
			e.addEventListener("touchmove", f, !1)
		}
		function P() {
			function e() {
				function a() {
					w.videoSlot.removeEventListener("play", a);
					w.videoSlot.removeEventListener("error", a);
					clearTimeout(f);
					b.debug("something happened, cancelTimeout")
				}
				var f = setTimeout(function() {
					b.debug("ad did not load, shutting down");
					r()
				}, 1500);
				w.videoSlot.addEventListener("play", a);
				w.videoSlot.addEventListener("error", a)
			}
			if (!ka && !U) {
				var f = J.startAd;
				J.startAd = function() {
					e();
					J.startAd = f;
					f()
				}
			}
		}
		var w = b.environmentVars = new b.model.EnvironmentVars,
			M = b.publisherConfig,
			S = b.controller.sizeManager,
			ba = b.controller.sizeBasedFormat,
			H = new b.model.PlayerInterface,
			F = new b.controller.Player(b),
			J = null,
			m = new $a,
			O = !1,
			N = !1,
			G = !1,
			B = !1,
			E = !1,
			X = null,
			ka = /iPhone|iPad|iPod/i.test(navigator.userAgent),
			U = /(Android)/i.test(navigator.userAgent),
			ja = ka && !/Safari/.test(navigator.userAgent),
			ca = ka || U;
		w.engine = rb.ENGINE_HTML5;
		b.getEngine = function() {
			return w.engine
		};
		b.canInteract = function() {
			return O && N && !G
		};
		b.canExpand = function() {
			return b.canInteract && B
		};
		b.isReady = function() {
			return O && !G && ("complete" === e.ownerDocument.readyState || "interactive" === e.ownerDocument.readyState)
		};
		b.iOSExitFullscreen = function() {
			ka && w.videoSlot && w.videoSlot.webkitDisplayingFullscreen && w.videoSlot.webkitExitFullScreen()
		};
		cb.hookBefore(b, "shutdown", function() {
			m.removeAllStates()
		});
		(function() {
			m.addState(new pb(b.elements.iframe, {
				canEnter: function() {
					return b.canInteract()
				},
				canLeave: function() {
					return b.canInteract()
				},
				onEnter: function() {
					E = !0;
					X.executeBehavioursForState("mouseOver")
				},
				onLeave: function() {
					E = !1;
					X.executeBehavioursForState("mouseOut")
				}
			}))
		})();
		(function() {
			m.addState(new tb(e, b, {
				get requiredVisibility() {
					return parseInt(M.visibilityThreshold, 10) || 50
				}, canEnter: function() {
					return O && !N
				},
				canLeave: function() {
					return O && N
				},
				reportInterval: 50
			}));
			m.addState(new nb(e, b, {
				get requiredVisibility() {
					return parseInt(M.visibilityThreshold, 10) || 50
				}, reportInterval: 50,
				canEnter: function() {
					return O && !N && !G
				},
				canLeave: function() {
					return O && N && !G
				},
				onEnter: function() {
					N = !0;
					X.executeBehavioursForState("onScreen");
					B || J.startAd()
				},
				onLeave: function() {
					N = !1;
					X.executeBehavioursForState("offScreen")
				}
			}))
		})();
		(function() {
			m.addState(new ob(e, b, {
				canEnter: function() {
					return !ka && b.canInteract() && !w.videoSlot.playing
				},
				onEnter: function() {
					B ? J.resumeAd() : J.startAd()
				}
			}))
		})();
		(function() {
			m.addState(new qb(e, b, {
				canEnter: function() {
					return b.canInteract()
				},
				canLeave: function() {
					return b.canInteract() && !w.pausedByUser
				},
				onEnter: function() {
					F.pausePlayback()
				},
				onLeave: function() {
					F.resumePlayback()
				}
			}))
		})();
		(function() {
			X = new vb(M.behaviourMatrix);
			X.registerBehaviourHandler("muted", function(b, e) {
				w.toggleMuteByUser || w.videoSlot.webkitDisplayingFullscreen || (!e && w.muted && F.unmute(), e && !w.muted && F.mute())
			});
			X.registerBehaviourHandler("collapsed", function(b, e) {
				function a() {
					S.collapseContainer("init" === b);
					J.stopAd();
					setTimeout(r, 500)
				}
				if (e && "complete" !== b) S.collapseContainer("init" === b);
				else if ("complete" !== b) {
					if (("onScreen" === b || "offScreen" === b || "init" === b) && !B) return;
					S.expandContainer("init" === b)
				}
				if ("complete" === b && w.isVPAID) setTimeout(function() {
					w.percentCloseTimeout = "width: 0";
					a()
				}, 10);
				else if ("complete" === b && e) if (M.featureMatrix.endingScreen.enabled) {
					var f = function() {
						var b = setTimeout(a, 3E3);
						g(function() {
							clearTimeout(b);
							G = !1;
							E && X.executeBehavioursForState("mouseOver")
						}, "AdVideoPlay")
					};
					setTimeout(function() {
						w.percentCloseTimeout = "width: 0";
						f()
					}, 10)
				} else setTimeout(r, 500);
				else "complete" !== b || e || (w.percentCloseTimeout = "width: 0", g(function() {
					G = !1;
					E && X.executeBehavioursForState("mouseOver")
				}, "AdVideoPlay"))
			});
			X.registerBehaviourHandler("paused", function(b, e) {
				!B || G || w.pausedByUser || w.videoSlot.webkitDisplayingFullscreen || (e ? F.pausePlayback() : F.resumePlayback())
			})
		})();
		w.observe("playerReady", function() {
			var e = [],
				g = M.adRequest.html || M.adRequest,
				a = b.utils.browserInfo;
			a && "MSIE" === a.browser && (M.featureMatrix.flash.enabled = !1);
			b.utils.getFlashVersion() >= M.minFlashVersion && M.featureMatrix.flash.enabled && (e.push({
				type: "application/x-shockwave-flash"
			}), M.adRequest && M.adRequest.flash && (g = M.adRequest.flash, w.engine = rb.ENGINE_FLASH));
			"object" === typeof g && (g.urls || g.tag) && (b.debug("disabling endingScreen because mutliad"), M.featureMatrix.endingScreen.enabled = !1);
			g = {
				preroll: g,
				playerConfig: f,
				clickThroughDialogEnabled: !1,
				skipButtonText: ""
			};
			ka && (g.displaySlot = w.slot, b.elements.iframeDocument.body.classList.add("ios"), ja && b.elements.iframeDocument.body.classList.add("ios-native"));
			U && b.elements.iframeDocument.body.classList.add("android");
			M.featureMatrix.endingScreen.enabled && w.videoSlot.addEventListener("ended", function(a) {
				a.stopImmediatePropagation();
				J.adManager.trackingController().callTracker("complete");
				G = !0;
				X.executeBehavioursForState("complete");
				b.iOSExitFullscreen();
				F.pausePlayback();
				w.paused = !0;
				w.pausedByUser = !1;
				w.playState = "ended"
			});
			J = ois(w.videoSlot, g);
			w.videoSlot.removeAttribute("data-ois-instance-id");
			"2.0" === J.handshakeVersion() && (J.initAd(b.size.width, b.size.height, "normal", "300", {}, {
				rules: e
			}), O = !0, F.setVPAIDAd(J), new sb.CampaignOverrideConfig(b, J), ca && M.featureMatrix.bestFit.enabled ? ba.setVPAIDAd(J) : M.featureMatrix.bestFit.enabled = !1, C(), J.resizeAd(b.size.width, b.size.height), q());
			w.observe("size", L)
		});
		(function() {
			F.initView(H, b.elements.iframeDocument);
			Object.defineProperty(w.videoSlot, "playing", {
				get: function() {
					return !!(0 < this.currentTime && !this.paused && !this.ended && 2 < this.readyState)
				}
			});
			ka && (w.videoSlot.addEventListener("webkitendfullscreen", function() {
				w.pausedByUser = !0
			}, !1), w.videoSlot.addEventListener("webkitbeginfullscreen", function() {
				w.pausedByUser = !1
			}, !1), ja && (w.videoSlot.setAttribute("playsinline", "true"), w.videoSlot.setAttribute("webkit-playsinline", "true"), Object.defineProperty(w.videoSlot, "controls", {
				get: function() {
					return !1
				},
				set: function() {},
				enumerable: !0,
				configurable: !0
			})));
			U && w.videoSlot.setAttribute("autoplay", "true");
			P();
			b.utils.isAmp() && context.renderStart(b.size);
			U && Q()
		})();
		return b
	});
	Ra.smartPlay(function(b) {
		function e(b, e) {
			function g() {
				b.apply(this, arguments);
				f.unsubscribe(g, e)
			}
			f.subscribe(g, e)
		}
		var f = null,
			g = !1;
		b.playAd = function() {
			f && (g ? f.resumeAd() : f.startAd())
		};
		b.pauseAd = function() {
			f && f.pauseAd()
		};
		b.environmentVars.observe("playerReady", function() {
			var r = parseInt(b.environmentVars.videoSlot.getAttribute("data-ois-instance-id"), 10);
			(f = ois(r)) && e(function() {
				g = !0
			}, "AdStarted")
		});
		return b
	});
	window.ois(function(b, e, f, g) {
		function r(b, e) {
			var f = e.extensions.filter(function(f) {
				if ("Videoplaza" === f.attributes.name) return 1 <= f.children.filter(function(f) {
					return "AdInfo" === f.name && (e.variant = S[f.attributes.variant.toUpperCase()], e.variant.toUpperCase() === b.toUpperCase()) ? !0 : !1
				}).length
			});
			e.variant && e.variant !== P.NORMAL ? f = 1 <= f.length : (e.variant = P.NORMAL, f = e.variant.toUpperCase() === b.toUpperCase() ? !0 : !1);
			return f
		}
		function C(e, f) {
			b.unsubscribe(C, "AdTagParsed");
			var g = f.ads.filter(r.bind(this, P.NORMAL));
			H = F = null;
			for (var m = J = 0; m < g.length; m++) {
				var q = g[m].creatives.filter(function(b) {
					return "linear" === b.type && b.duration
				});
				J += q[0].duration
			}
			0 === J && (J = -1)
		}
		function q(e, f) {
			function m(b, e) {
				switch (b.toLowerCase()) {
					case P.OPENER:
						f.ads.unshift(e);
						break;
					case P.CLOSER:
						f.ads.push(e);
						break;
					case P.PREBUMPER:
						var a = f.ads.findIndex(r.bind(this, P.BUMPER));
						if (-1 !== a) {
							if (0 === a && (a = f.ads.findIndex(r.bind(this, P.NORMAL)), -1 === a)) break;
							f.ads.splice(a, 0, e)
						}
				}
			}
			b.unsubscribe(q, "AdTagParsed");
			if (0 !== f.ads.length) {
				var B = g.adManager.getAdConfig(),
					E = {
						hls: "application/x-mpegURL",
						progressive: "video/mp4",
						dash: "application/dash+xml",
						webm: "video/webm",
						ogg: "video/ogg"
					}, C;
				for (C in P) {
					var F = P[C];
					if (B[F]) {
						var H = JSON.parse(JSON.stringify(M));
						H.variant = F;
						for (var J in B[F]) if (E.hasOwnProperty(J)) {
							var L = JSON.parse(JSON.stringify(w));
							L.fileURL = B[F][J];
							L.mimeType = E[J];
							H.creatives[0].mediaFiles.push(L);
							m(F, H)
						}
					}
				}
				f.ads.forEach(function(b, e) {
					b.sequence = "" + (e + 1)
				})
			}
		}
		function L() {
			H = new Date
		}
		function Q() {
			ba.variant === P.NORMAL && (F = F || new Date, H && (F = new Date(F.getTime() + Math.ceil(new Date - H)), H = null))
		}
		var P = b.VARIANTS = {
			OPENER: "opener",
			CLOSER: "closer",
			PREBUMPER: "bumper",
			NORMAL: "commercial",
			BUMPER: "sponsored"
		}, w = {
			apiFramework: null,
			bitrate: 731,
			codec: null,
			deliveryType: "progressive",
			fileURL: "",
			height: 360,
			id: null,
			maintainAspectRatio: !0,
			maxBitrate: 0,
			mimeType: "video/mp4",
			minBitrate: 0,
			scalable: !0,
			width: 640
		}, M = {
			creatives: [{
				adParameters: null,
				duration: 15,
				icons: [],
				mediaFiles: [],
				skipDelay: null,
				trackingEvents: {},
				type: "linear",
				videoClickThroughURLTemplate: "",
				videoClickTrackingURLTemplates: [],
				videoCustomClickURLTemplates: []
			}],
			errorURLTemplates: [],
			extensions: [],
			id: "xxx",
			impressionURLTemplates: [],
			sequence: "0"
		}, S = {
			NORMAL: P.NORMAL,
			BUMPER: P.BUMPER
		}, ba = null,
			H = null,
			F = null,
			J = -1,
			m = -1;
		b.subscribe(q, "AdTagParsed");
		b.subscribe(C, "AdTagParsed");
		b.subscribe(function(b, e) {
			ba = e
		}, "AdLoaded");
		b.subscribe(function() {
			Q()
		}, "AdStarted");
		b.subscribe(L, "AdStopped");
		b.subscribe(L, "AdPaused");
		b.subscribe(Q, "AdPlaying");
		b.subscribe(function() {
			b.subscribe(q, "AdTagParsed");
			b.subscribe(C, "AdTagParsed")
		}, "AdSlotComplete");
		b.getVariant = function() {
			return ba && ba.variant ? ba.variant : P.NORMAL
		};
		b.getSlotRemainingTime = function() {
			if (H) return m;
			var b = (new Date - F) / 1E3;
			return m = -1 < J ? J - b : -1
		};
		b.getSlotDuration = function() {
			return J
		};
		Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
			value: function(b, e) {
				if (null == this) throw new TypeError('"this" is null or not defined');
				var f = Object(this),
					g = f.length >>> 0;
				if ("function" !== typeof b) throw new TypeError("predicate must be a function");
				for (var m = 0; m < g;) {
					if (b.call(e, f[m], m, f)) return m;
					m++
				}
				return -1
			}
		})
	});
	var wb = null;
	window.SmartPlay(function(b) {
		wb = b
	});
	window.ois(function(b, e, f, g) {
		function r(a, b) {
			U.currentTime >= U.duration && !b ? A || (A = !0, p(R)) : (a !== U.currentTime && (U.currentTime = a), ca.drawImage(U, 0, 0, U.videoWidth, U.videoHeight))
		}
		function C() {
			var a = Date.now(),
				b = (a - ua) / 1E3;.04 <= b && (r(U.currentTime + b), ua = a);
			Math.round(1E4 * parseFloat(U.currentTime)) / 1E4 < Math.round(1E4 * parseFloat(U.duration)) / 1E4 ? R = c(C.bind(this)) : A = !0
		}
		function q() {
			!a || isNaN(U.duration) || U.currentTime >= U.duration || (a = !1, ua = Date.now(), R = c(C.bind(this)))
		}
		function L(a, c) {
			function e() {
				a.apply(this, arguments);
				b.unsubscribe(e, c)
			}
			b.subscribe(e, c)
		}
		function Q() {
			ja && ja.parentNode && ja.parentNode.removeChild(ja);
			U && (U.removeEventListener("loadedmetadata", ba), U.removeEventListener("loadeddata", H), U.removeEventListener("loadedmetadata", q));
			document.removeEventListener("visibilitychange", M, !1)
		}
		function P(a) {
			a.stopImmediatePropagation();
			a.stopPropagation();
			a.preventDefault();
			Q();
			w();
			F.startLinear();
			F.trackingController().callUnmuteTracker()
		}
		function w() {
			b.pauseAd = y;
			b.resumeAd = ga;
			B && B.removeEventListener("click", P);
			X && X.removeEventListener("click", P);
			O && (O.classList.remove("inline-video"), -1 === N.indexOf("minimal") && O.classList.remove("minimal"))
		}
		function M() {
			wb.debug("[InlineVideoAddon]", "onVisibilityChange. doc hidden?", document.hidden);
			document.hidden || (document.removeEventListener("visibilitychange", M, !1), setTimeout(function() {
				wb.canInteract() && (wb.debug("[InlineVideoAddon]", "onVisibilityChange. resuming with currentTime", U.currentTime), q())
			}, 100))
		}
		function S() {
			O = ka.ownerDocument.body;
			N = O.className.split(" ");
			G = O.querySelector("#player-ui");
			B = G.querySelector("#play-ios");
			E = O.querySelector("#replay-ui");
			X = E.querySelector('.button[data-bind*="togglePlay"]');
			ja = document.createElement("canvas");
			ca = ja.getContext("2d");
			ja.width = ja.height = 0;
			ka.appendChild(ja);
			ja.addEventListener("click", function() {
				F.clickThrough();
				a || (a = !0, p(R));
				document.addEventListener("visibilitychange", M, !1);
				wb.debug("[InlineVideoAddon]", "clickThrough handled, pausing with currentTime", U.currentTime, "and watching for returning to the view")
			});
			B.addEventListener("click", P);
			X.addEventListener("click", P); - 1 === N.indexOf("minimal") && O.classList.add("minimal");
			O.classList.add("inline-video")
		}
		function ba() {
			r(0)
		}
		function H() {
			wb && wb.canInteract() && !U.webkitDisplayingFullscreen && (a = !0, q())
		}
		var F = g.adManager,
			J = /iPhone|iPad|iPod/i.test(navigator.userAgent),
			m = J && !/Safari/.test(navigator.userAgent),
			O = null,
			N = null,
			G = null,
			B = null,
			E = null,
			X = null,
			ka = f.displaySlot,
			U = null,
			ja = null,
			ca = null,
			R = -1,
			A = !1,
			a = !0,
			y = b.pauseAd,
			ga = b.resumeAd,
			ua = 0,
			wa = f.playerConfig && f.playerConfig.prefetching;
		e = function() {
			for (var a = window.frameElement, b = window; a;) b = a.ownerDocument.defaultView, a = b.frameElement;
			return b
		}();
		var c = e.requestAnimationFrame.bind(e),
			p = e.cancelAnimationFrame.bind(e);
		(function() {
			!ka && !J || m || (b.pauseAd = function() {
				F.triggerEvent("AdVideoPause");
				a || (a = !0, p(R))
			}, b.resumeAd = function() {
				F.triggerEvent("AdVideoPlay");
				q()
			}, L(function() {
				S();
				U = ka.parentNode.querySelector("#video-slot")
			}, "AdLoaded"), b.subscribe(function() {
				U.addEventListener("loadedmetadata", ba);
				U.addEventListener("loadeddata", H);
				!wa || wb && wb.canInteract() ? 0 < U.readyState ? q() : U.addEventListener("loadedmetadata", q) : b.pauseAd();
				G.classList.remove("playing")
			}, "AdStarted"), L(function() {
				A || (A = !0, p(R));
				U.removeEventListener("loadedmetadata", ba);
				if (wb && !wb.publisherConfig.featureMatrix.endingScreen.enabled) {
					b.pauseAd = y;
					b.resumeAd = ga;
					var a = document.createEvent("Event");
					a.initEvent("ended", !0, !0);
					setTimeout(function() {
						U.dispatchEvent(a);
						b.stopAd()
					}, 150)
				} else r(0, !0)
			}, "AdVideoComplete"), L(function() {
				wb && !wb.publisherConfig.featureMatrix.endingScreen.enabled && (b.pauseAd = y, b.resumeAd = ga, Q(), w())
			}, "AdStopped"))
		})()
	});
})();