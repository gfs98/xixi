// VERSION: 2.3 LAST UPDATE: 11.07.2013
/*
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://jqueryrotate.com
 */
(function(k) {
	for (var d, f, l = document.getElementsByTagName("head")[0].style, h = ["transformProperty", "WebkitTransform",
			"OTransform", "msTransform", "MozTransform"
		], g = 0; g < h.length; g++) void 0 !== l[h[g]] && (d = h[g]);
	d && (f = d.replace(/[tT]ransform/, "TransformOrigin"), "T" == f[0] && (f[0] = "t"));
	eval('IE = "v"=="\v"');
	jQuery.fn.extend({
		rotate: function(a) {
			if (0 !== this.length && "undefined" != typeof a) {
				"number" == typeof a && (a = {
					angle: a
				});
				for (var b = [], c = 0, d = this.length; c < d; c++) {
					var e = this.get(c);
					if (e.Wilq32 && e.Wilq32.PhotoEffect) e.Wilq32.PhotoEffect._handleRotation(a);
					else {
						var f = k.extend(!0, {}, a),
							e = (new Wilq32.PhotoEffect(e, f))._rootObj;
						b.push(k(e))
					}
				}
				return b
			}
		},
		getRotateAngle: function() {
			for (var a = [0], b = 0, c = this.length; b < c; b++) {
				var d = this.get(b);
				d.Wilq32 && d.Wilq32.PhotoEffect && (a[b] = d.Wilq32.PhotoEffect._angle)
			}
			return a
		},
		stopRotate: function() {
			for (var a = 0, b = this.length; a < b; a++) {
				var c = this.get(a);
				c.Wilq32 && c.Wilq32.PhotoEffect && clearTimeout(c.Wilq32.PhotoEffect._timer)
			}
		}
	});
	Wilq32 = window.Wilq32 || {};
	Wilq32.PhotoEffect = function() {
		return d ? function(a, b) {
			a.Wilq32 = {
				PhotoEffect: this
			};
			this._img = this._rootObj = this._eventObj = a;
			this._handleRotation(b)
		} : function(a, b) {
			this._img = a;
			this._onLoadDelegate = [b];
			this._rootObj = document.createElement("span");
			this._rootObj.style.display = "inline-block";
			this._rootObj.Wilq32 = {
				PhotoEffect: this
			};
			a.parentNode.insertBefore(this._rootObj, a);
			if (a.complete) this._Loader();
			else {
				var c = this;
				jQuery(this._img).bind("load", function() {
					c._Loader()
				})
			}
		}
	}();
	Wilq32.PhotoEffect.prototype = {
		_setupParameters: function(a) {
			this._parameters = this._parameters || {};
			"number" !==
			typeof this._angle && (this._angle = 0);
			"number" === typeof a.angle && (this._angle = a.angle);
			this._parameters.animateTo = "number" === typeof a.animateTo ? a.animateTo : this._angle;
			this._parameters.step = a.step || this._parameters.step || null;
			this._parameters.easing = a.easing || this._parameters.easing || this._defaultEasing;
			this._parameters.duration = a.duration || this._parameters.duration || 1E3;
			this._parameters.callback = a.callback || this._parameters.callback || this._emptyFunction;
			this._parameters.center = a.center || this._parameters.center || ["50%", "50%"];
			this._rotationCenterX = "string" == typeof this._parameters.center[0] ? parseInt(this
					._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._parameters
				.center[0];
			this._rotationCenterY = "string" == typeof this._parameters.center[1] ? parseInt(this
					._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._parameters
				.center[1];
			a.bind && a.bind != this._parameters.bind && this._BindEvents(a.bind)
		},
		_emptyFunction: function() {},
		_defaultEasing: function(a, b, c, d, e) {
			return -d * ((b = b / e - 1) * b * b * b -
				1) + c
		},
		_handleRotation: function(a, b) {
			d || this._img.complete || b ? (this._setupParameters(a), this._angle == this._parameters
					.animateTo ? this._rotate(this._angle) : this._animateStart()) : this._onLoadDelegate
				.push(a)
		},
		_BindEvents: function(a) {
			if (a && this._eventObj) {
				if (this._parameters.bind) {
					var b = this._parameters.bind,
						c;
					for (c in b) b.hasOwnProperty(c) && jQuery(this._eventObj).unbind(c, b[c])
				}
				this._parameters.bind = a;
				for (c in a) a.hasOwnProperty(c) && jQuery(this._eventObj).bind(c, a[c])
			}
		},
		_Loader: function() {
			return IE ? function() {
				var a =
					this._img.width,
					b = this._img.height;
				this._imgWidth = a;
				this._imgHeight = b;
				this._img.parentNode.removeChild(this._img);
				this._vimage = this.createVMLNode("image");
				this._vimage.src = this._img.src;
				this._vimage.style.height = b + "px";
				this._vimage.style.width = a + "px";
				this._vimage.style.position = "absolute";
				this._vimage.style.top = "0px";
				this._vimage.style.left = "0px";
				this._aspectW = this._aspectH = 1;
				this._container = this.createVMLNode("group");
				this._container.style.width = a;
				this._container.style.height = b;
				this._container.style.position =
					"absolute";
				this._container.style.top = "0px";
				this._container.style.left = "0px";
				this._container.setAttribute("coordsize", a - 1 + "," + (b - 1));
				this._container.appendChild(this._vimage);
				this._rootObj.appendChild(this._container);
				this._rootObj.style.position = "relative";
				this._rootObj.style.width = a + "px";
				this._rootObj.style.height = b + "px";
				this._rootObj.setAttribute("id", this._img.getAttribute("id"));
				this._rootObj.className = this._img.className;
				for (this._eventObj = this._rootObj; a = this._onLoadDelegate.shift();) this
					._handleRotation(a,
						!0)
			} : function() {
				this._rootObj.setAttribute("id", this._img.getAttribute("id"));
				this._rootObj.className = this._img.className;
				this._imgWidth = this._img.naturalWidth;
				this._imgHeight = this._img.naturalHeight;
				var a = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth);
				this._width = 3 * a;
				this._height = 3 * a;
				this._aspectW = this._img.offsetWidth / this._img.naturalWidth;
				this._aspectH = this._img.offsetHeight / this._img.naturalHeight;
				this._img.parentNode.removeChild(this._img);
				this._canvas = document.createElement("canvas");
				this._canvas.setAttribute("width", this._width);
				this._canvas.style.position = "relative";
				this._canvas.style.left = -this._img.height * this._aspectW + "px";
				this._canvas.style.top = -this._img.width * this._aspectH + "px";
				this._canvas.Wilq32 = this._rootObj.Wilq32;
				this._rootObj.appendChild(this._canvas);
				this._rootObj.style.width = this._img.width * this._aspectW + "px";
				this._rootObj.style.height = this._img.height * this._aspectH + "px";
				this._eventObj = this._canvas;
				for (this._cnv = this._canvas.getContext("2d"); a = this._onLoadDelegate.shift();) this
					._handleRotation(a,
						!0)
			}
		}(),
		_animateStart: function() {
			this._timer && clearTimeout(this._timer);
			this._animateStartTime = +new Date;
			this._animateStartAngle = this._angle;
			this._animate()
		},
		_animate: function() {
			var a = +new Date,
				b = a - this._animateStartTime > this._parameters.duration;
			if (b && !this._parameters.animatedGif) clearTimeout(this._timer);
			else {
				if (this._canvas || this._vimage || this._img) a = this._parameters.easing(0, a - this
						._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this
						._animateStartAngle, this._parameters.duration),
					this._rotate(~~(10 * a) / 10);
				this._parameters.step && this._parameters.step(this._angle);
				var c = this;
				this._timer = setTimeout(function() {
					c._animate.call(c)
				}, 10)
			}
			this._parameters.callback && b && (this._angle = this._parameters.animateTo, this._rotate(this
				._angle), this._parameters.callback.call(this._rootObj))
		},
		_rotate: function() {
			var a = Math.PI / 180;
			return IE ? function(a) {
				this._angle = a;
				this._container.style.rotation = a % 360 + "deg";
				this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px";
				this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px";
				this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px";
				this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
			} : d ? function(a) {
				this._angle = a;
				this._img.style[d] = "rotate(" + a % 360 + "deg)";
				this._img.style[f] = this._parameters.center.join(" ")
			} : function(b) {
				this._angle = b;
				b = b % 360 * a;
				this._canvas.width = this._width;
				this._canvas.height = this._height;
				this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH);
				this._cnv.translate(this._rotationCenterX,
					this._rotationCenterY);
				this._cnv.rotate(b);
				this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY);
				this._cnv.scale(this._aspectW, this._aspectH);
				this._cnv.drawImage(this._img, 0, 0)
			}
		}()
	};
	IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function() {
		document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
		try {
			return !document.namespaces.rvml && document.namespaces.add("rvml",
					"urn:schemas-microsoft-com:vml"),
				function(a) {
					return document.createElement("<rvml:" + a + ' class="rvml">')
				}
		} catch (a) {
			return function(a) {
				return document.createElement("<" +
					a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
			}
		}
	}())
})(jQuery);
