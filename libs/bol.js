! function() {
    "use strict";
    var i, u = window.art = function(e) {
        var t;
        t = e instanceof Node ? e : "function" == typeof e ? e.call(u) : document.createElement(e);
        for (var n = arguments.length, r = 0; ++r < n;) {
            var a = arguments[r];
            if (a instanceof Node) t.appendChild(a);
            else if (null != a) {
                var o = typeof a;
                "object" === o ? c(t, a) : "function" === o ? a.call(u, t) : t.appendChild(document.createTextNode(a))
            }
        }
        return t
    };

    function c(r, a) {
        Object.keys(a).forEach(function(e) {
            var t = Object.getOwnPropertyDescriptor(a, e);
            if ("value" in t) {
                var n = t.value;
                e in r && "object" == typeof n ? c(r[e], n) : r[e] = n
            } else Object.defineProperty(r, e, t)
        })
    }

    function r(n, r, a, o) {
        return function(t) {
            function e(e) {
                t[o](e, r, a)
            }
            Array.isArray(n) ? n.forEach(e) : e(n)
        }
    }
    u.off = function(e, t, n) {
        return r(e, t, n, "removeEventListener")
    }, u.on = function(e, t, n) {
        return r(e, t, n, "addEventListener")
    }, u.css = function(e, t) {
        var n, r, a, o;
        ! function(e) {
            if (!i) {
                var t = u("STYLE");
                u(document.head, t), i = t.sheet
            }
            i.insertRule(e, i.cssRules.length)
        }((n = e, a = t, o = function(e, t) {
            var n = e + ":" + t;
            return n
        }, r = Object.keys(a).map(function(e) {
            var t = a[e],
                n = o(e, t);
            return n
        }), n + "{" + r.join(";") + "}"))
    }
}(),
function(e) {
    "use strict";

    function n(e) {
        var t, n = typeof e;
        try {
            t = "string" === n ? '"' + e + '"' : 0 === e && 1 / e < 0 ? "-0" : Array.isArray(e) ? e.length ? "[…]" : "[]" : "bigint" === n ? e + "n" : "symbol" !== n ? String(e) : e.toString()
        } catch (e) {}
        return t
    }
    e.formatValue = function(e) {
        var t;
        if (Array.isArray(e)) try {
            t = "[" + e.map(n).join(", ") + "]"
        } catch (e) {} else t = n(e);
        return t
    }, e.formatValueType = function(e) {
        var t;
        if (null !== e) {
            var n = typeof e;
            if ("function" === n || "object" === n || "undefined" === n) {
                var r = Object.getPrototypeOf(e);
                if (r === Array.prototype) switch (e.length) {
                    case 0:
                        t = "an empty array";
                        break;
                    case 1:
                        t = "a one element array";
                        break;
                    default:
                        t = "an array"
                } else t = r === Date.prototype ? "a date" : r === RegExp.prototype ? "a regular expression" : "function" === n ? "a function" : "an object"
            }
        }
        return t
    }
}(this),
function() {
    "use strict";

    function M(e) {
        function t() {
            u.className = "button focusable", i("off")
        }

        function n(e) {
            e.target !== u && a() && t()
        }

        function r(e) {
            !e.relatedTarget && a() && t()
        }

        function a() {
            return /\bactive\b/.test(u.className)
        }

        function o() {
            return !u.hasAttribute("tabindex")
        }

        function i(e) {
            var t = art[e];
            art(document, t("mousemove", n), t("mouseout", r))
        }
        var u = art("SPAN", {
            className: "button focusable",
            get disabled() {
                return o()
            },
            set disabled(e) {
                (e = !!e) !== o() && (e ? (art(u, c), a() && (document.releaseCapture(), i("off")), u.blur()) : art(u, A), u.className = "", u.className = "button focusable")
            }
        }, A, art.on("click", function(e) {
            o() && e.stopImmediatePropagation(), e.preventDefault()
        }), art.on("keydown", function(e) {
            13 === e.keyCode && (u.click(), e.preventDefault())
        }), art.on("keyup", function(e) {
            32 === e.keyCode && (u.click(), e.preventDefault())
        }), art.on("mouseup", function(e) {
            0 === e.button && a() && (document.releaseCapture(), t())
        }), art("SPAN", e), art("SPAN"));
        return u.setCapture && (u.firstChild.setAttribute("unselectable", "on"), art(u, art.on("mousedown", function(e) {
            0 !== e.button || o() || a() || (u.setCapture(), u.className = "active button focusable", i("on"))
        }))), u
    }

    function L() {
        var r, t, a, o, i, u, e, l, n, c, s = [{
                name: "Chrome",
                versions: [{
                    featureName: "CHROME_69",
                    number: "69+"
                }]
            }, {
                name: "Edge",
                versions: [{
                    featureName: "EDGE_40",
                    number: "40+"
                }]
            }, {
                name: "Firefox",
                versions: [{
                    featureName: "FF_54",
                    number: "54–61"
                }, {
                    featureName: "FF_62",
                    number: "62+"
                }]
            }, {
                name: "Internet Explorer",
                versions: [{
                    featureName: "IE_9",
                    number: "9"
                }, {
                    featureName: "IE_10",
                    number: "10"
                }, {
                    featureName: "IE_11",
                    number: "11"
                }, {
                    featureName: "IE_11_WIN_10",
                    number: "11 (W10)"
                }]
            }, {
                name: "Safari",
                versions: [{
                    featureName: "SAFARI_7_0",
                    number: "7.0"
                }, {
                    featureName: "SAFARI_7_1",
                    number: "7.1–8"
                }, {
                    featureName: "SAFARI_9",
                    number: "9"
                }, {
                    featureName: "SAFARI_10",
                    number: "10–11"
                }, {
                    featureName: "SAFARI_12",
                    number: "12+"
                }]
            }, {
                name: "Opera",
                versions: [{
                    featureName: "CHROME_69",
                    number: "56+"
                }]
            }, {
                name: "Android Browser",
                versions: [{
                    featureName: "ANDRO_4_0",
                    number: "4.0"
                }, {
                    featureName: "ANDRO_4_1",
                    number: "4.1–4.3"
                }, {
                    featureName: "ANDRO_4_4",
                    number: "4.4"
                }]
            }, {
                name: "Node.js",
                versions: [{
                    featureName: "NODE_0_10",
                    number: "0.10"
                }, {
                    featureName: "NODE_0_12",
                    number: "0.12"
                }, {
                    featureName: "NODE_4",
                    number: "4"
                }, {
                    featureName: "NODE_5",
                    number: "5"
                }, {
                    featureName: "NODE_10",
                    number: "10"
                }, {
                    featureName: "NODE_11",
                    number: "11+"
                }]
            }],
            d = "Generate strict mode code",
            f = "Support web workers",
            p = "10.5pt";

        function m(e, t) {
            return art("LABEL", {
                style: {
                    display: "inline-table"
                }
            }, art("SPAN", {
                style: {
                    display: "table-cell",
                    verticalAlign: "middle"
                }
            }, art("INPUT", {
                style: {
                    margin: "0 .25em 0 0"
                },
                type: "checkbox"
            }, t)), art("SPAN", {
                style: {
                    display: "table-cell"
                }
            }, e))
        }

        function b(e) {
            var t = art("DIV", {
                className: "help-text"
            });
            return t.innerHTML = e, art("SPAN", {
                className: "focusable",
                style: {
                    background: "black",
                    borderRadius: "1em",
                    color: "white",
                    cursor: "pointer",
                    display: "inline-table",
                    fontSize: "8pt",
                    fontWeight: "bold",
                    lineHeight: p,
                    position: "relative",
                    textAlign: "center",
                    top: "-1.5pt",
                    width: p
                },
                title: "Learn more…"
            }, "?", A, art.on("click", function() {
                C(t)
            }))
        }

        function v() {
            var t = r.checked;
            Array.prototype.forEach.call(o, function(e) {
                e.checked = t
            })
        }

        function y() {
            setTimeout(function() {
                r.indeterminate || v()
            })
        }

        function h() {
            var t = JSDekrakenFuck.Feature,
                e = Array.prototype.filter.call(o, function(e) {
                    return e.checked
                }).map(function(e) {
                    return ++n, t[e.featureName]
                }),
                n = e.length;
            r.checked = n, r.indeterminate = n && n < o.length, a = t.commonOf.apply(null, e) || t.DEFAULT, u.checked && (a = a.restrict("web-worker", e)), i.checked && (a = a.restrict("forced-strict-mode", e))
        }

        function g() {
            var e;
            h(), (e = document.createEvent("Event")).initEvent("input", !0, !1), t.dispatchEvent(e)
        }
        return e = art(m("Select/deselect all"), {
            style: {
                margin: "0 0 .5em"
            }
        }, art.on("change", v), art.on(["keyup", "mouseup"], y)), l = art("TABLE", {
            style: {
                borderSpacing: "0",
                width: "100%"
            }
        }), n = m(d), c = m(f), t = art("FIELDSET", {
            className: "engine-selection-box",
            get feature() {
                return a
            }
        }, art("DIV", art("P", {
            style: {
                margin: ".25em 0 .75em"
            }
        }, "Select the engines you want your code to support."), e, l, art("HR"), art("DIV", c, " ", b("<p>Web workers are part of a standard HTML technology used to perform background tasks in JavaScript.<p>Check the option <dfn>Support web workers</dfn> only if your code needs to run inside a web worker. To create or use a web worker in your code, this option is not required.")), art("DIV", n, " ", b("<p>The option <dfn>Generate strict mode code</dfn> instructs JSDekrakenFuck to avoid optimizations that don't work in strict mode JavaScript code. Check this option only if your environment disallows non-strict code. You may want to do this for example in one of the following circumstances.<ul><li>To encode a string or a number and embed it in a JavaScript file in a place where strict mode code is expected, like in a scope containing a use strict directive or in a class body.<li>To encode a script and run it in Node.js with the option <code>--use_strict</code>.<li>To encode an ECMAScript module. Note that module support in JSFuck is <em>very</em> limited, as <code>import</code> and <code>export</code> statements don't work at all. If your module doesn't contain these statements, you can encode it using this option.</ul><p>In most other cases, this option is not required, even if your script contains a top level <code>\"use strict\"</code> statement.")), art.on("change", g))), s.forEach(function(e, t) {
            for (var n, r = e.versions, a = 1 & t ? {
                    className: "even-field"
                } : null, o = (r.length + 2) / 3 ^ 0, i = 3 * o, u = 0; u < i; ++u) {
                var c = r[u];
                u % 3 || (n = art("TR", a), u || art(n, art("TD", {
                    rowSpan: o,
                    style: {
                        padding: "0 .5em 0 0"
                    }
                }, e.name)), art(l, n));
                var s = c ? m(c.number, {
                    checked: !0,
                    featureName: c.featureName
                }) : null;
                art(n, art("TD", {
                    style: {
                        padding: "0 0 0 .5em",
                        width: "6em"
                    }
                }, s))
            }
        }), r = e.querySelector("INPUT"), o = l.querySelectorAll("INPUT"), i = n.querySelector("INPUT"), u = c.querySelector("INPUT"), h(), t
    }

    function C(e, t) {
        function r() {
            var e = document.body;
            e.removeChild(u), art(e, art.off("keydown", o), art.off("focus", a, !0)), void 0 !== t && t()
        }

        function n() {
            i.focus()
        }

        function a(e) {
            i.contains(e.target) || n()
        }

        function o(e) {
            var t = e.keyCode;
            if (13 === t || 27 === t) {
                var n = document.activeElement;
                !n.contains(i) && n.contains(e.target) || (r(), e.preventDefault())
            }
        }
        var i = art("DIV", {
                style: {
                    borderRadius: "25px",
                    display: "inline-block",
                    maxWidth: "500px",
                    width: "100%"
                }
            }, A, art("DIV", {
                className: "focusable",
                id: "modalBox",
                style: {
                    background: "whitesmoke",
                    border: "10px solid blue",
                    borderRadius: "23px",
                    margin: "2px"
                }
            }, art("DIV", {
                style: {
                    margin: "1.5em 1.5em .25em",
                    overflow: "hidden"
                }
            }, e, art("DIV", {
                style: {
                    margin: "1.25em 0"
                }
            }, art(M("OK"), {
                style: {
                    maxWidth: "5em",
                    width: "100%"
                }
            }, art.on("click", r)))))),
            u = art("DIV", {
                style: {
                    background: "rgba(0, 0, 0, .25)",
                    overflow: "auto",
                    position: "fixed",
                    textAlign: "center",
                    left: "0",
                    top: "0",
                    bottom: "0",
                    width: "100%"
                }
            }, art("DIV", {
                style: {
                    display: "table",
                    tableLayout: "fixed",
                    width: "100%",
                    height: "100%"
                }
            }, art("DIV", {
                style: {
                    display: "table-cell",
                    verticalAlign: "middle"
                }
            }, i)));
        art(document.body, u, art.on("focus", a, !0), art.on("keydown", o)), setTimeout(n)
    }

    function c(e) {
        e.removeAttribute("tabindex")
    }

    function A(e) {
        e.setAttribute("tabindex", 0)
    }
    art.css(".button", {
            background: "#e0e0e0",
            color: "#212121",
            cursor: "default",
            display: "inline-block",
            position: "relative"
        }), art.css(".button, .button>:last-child", {
            "border-radius": ".1em"
        }), art.css(".button.active, .button[tabindex]:active", {
            background: "#29b3e5"
        }), art.css(".button.active>:first-child, .button[tabindex]:active>:first-child", {
            left: ".1em",
            top: ".1em"
        }), art.css(".button.active>:last-child, .button[tabindex]:active>:last-child", {
            "border-color": "#0088b6"
        }), art.css(".button:not([tabindex])", {
            background: "#e9e9e9",
            color: "#707070"
        }), art.css(".button:not([tabindex])>:last-child", {
            "border-color": "#bababa"
        }), art.css(".button>:first-child", {
            display: "inline-block",
            margin: ".15em .5em",
            position: "relative",
            "user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "-webkit-user-select": "none"
        }), art.css(".button>:last-child", {
            "border-color": "#707070",
            "border-style": "solid",
            "border-width": "1px",
            display: "inline-block",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0"
        }), art.css(".button[tabindex]:hover:not(.active):not(:active)", {
            background: "#a3f4ff"
        }), art.css(".button[tabindex]:hover:not(.active):not(:active)>:last-child", {
            "border-color": "#189fdd"
        }), art.css(".engine-selection-box", {
            background: "#f0f0f0"
        }), art.css(".engine-selection-box .even-field", {
            background: "#fff"
        }), art.css(".help-text", {
            "font-size": "11pt",
            "text-align": "justify"
        }), art.css(".help-text code", {
            "white-space": "pre"
        }), art.css(".help-text dfn", {
            "font-style": "normal",
            "font-weight": "bold"
        }), art.css(".help-text li", {
            margin: ".5em 0"
        }), art.css("#modalBox p:first-child", {
            "margin-top": "0"
        }), art.css("#modalBox p:last-child", {
            "margin-bottom": "0"
        }),
        function() {
            var e = "application/javascript";

            function n() {
                (T = new Worker(_)).onmessage = i
            }

            function t() {
                URL.revokeObjectURL(_), _ = void 0
            }

            function c() {
                var e, t = r();
                try {
                    e = JSDekrakenFuck.encode(inputArea.value, t)
                } catch (e) {
                    return v(), void h(String(e))
                }
                g(e)
            }

            function s() {
                var e = r(),
                    t = {
                        input: inputArea.value,
                        options: e
                    };
                D && (T.terminate(), n(), t.url = w), T.postMessage(t), v(), y(!0), inputArea.onkeyup = null
            }

            function r() {
                return {
                    features: N.canonicalNames
                }
            }

            function a(e) {
                9 !== e.keyCode && s()
            }

            function l(e) {
                if (f(e)) {
                    var t = outputArea.value.length;
                    if ((0 !== outputArea.selectionStart || outputArea.selectionEnd !== t) && (outputArea.selectionStart = 0, outputArea.selectionEnd = t, "scrollTopMax" in outputArea)) {
                        var n = outputArea.scrollTop;
                        art(outputArea, art.on("scroll", function() {
                            outputArea.scrollTop = n
                        }, {
                            once: !0
                        }))
                    }
                }
            }

            function o() {
                S.disabled = !1;
                var e = this.result;
                null != e && (inputArea.value = e), inputArea.oninput(), inputArea.disabled = !1
            }

            function d() {
                var t, e;
                try {
                    e = (0, eval)(outputArea.value)
                } catch (e) {
                    t = art("P", String(e))
                }
                if (void 0 !== e) {
                    var n = formatValue(e),
                        r = formatValueType(e);
                    if (n) t = art("DIV", art("P", r ? "Evaluation result is " + r + ":" : "Evaluation result is"), art("P", {
                        style: {
                            overflowX: "auto"
                        }
                    }, art("DIV", {
                        style: {
                            display: "inline-block",
                            textAlign: "left",
                            whiteSpace: "pre"
                        }
                    }, n)));
                    else t = art("DIV", art("P", "Evaluation result is " + r + "."))
                }
                if (null != t) {
                    var a = this;
                    C(t, function() {
                        a.focus()
                    })
                }
            }

            function i(e) {
                var t = e.data,
                    n = t.error;
                n ? h(n) : g(t.output), y(!1)
            }

            function f(e) {
                var t, n = e.target;
                if ("runtimeStyle" in n) {
                    var r = n.lastMainMouseButtonEventTimeStamp,
                        a = 0 === e.button ? e.timeStamp : void 0;
                    t = (n.lastMainMouseButtonEventTimeStamp = a) - r <= 500
                } else t = 2 <= e.detail && 0 === e.button;
                return t && e.preventDefault(), t
            }

            function u() {
                document.querySelector("main>div").style.display = "block", inputArea.value = inputArea.defaultValue;
                var e, t, n, r = (e = self.chrome) && e.csi ? {
                    rows: 1,
                    style: {
                        overflowY: "scroll"
                    }
                } : {
                    rows: 10
                };
				
                if (art(outputArea, r, art.on("mousedown", l), art.on("mouseup", f), art.on("input", A)), art(stats.parentNode, art(M("Copy to Clipboard"), {
                        style: {
                            bottom: "0",
                            fontSize: "10pt",
                            position: "absolute",
                            right: "0"
                        }
                    }, art.on("click", function copy_to_clipboard(id)
{
    document.getElementById('outputArea').select();
    document.execCommand('copy');

}))),
																							
				

																			
																							
																							
																							
			t = O.COMPACT, N = O.AUTO.includes(t) ? t : O.BROWSER, compMenu.value = N.name, compMenu.previousIndex = compMenu.selectedIndex, T)(n = s)();
                else {
                    var a = art(M("Encode"), art.on("click", c));
                    art(controls, a), n = b, outputArea.value = ""
                }
                if ("undefined" != typeof File) {
                    var o = art("INPUT", {
                            accept: ".js",
                            style: {
                                display: "none"
                            },
                            type: "file"
                        }, art.on("change", m)),
                        i = HTMLInputElement.prototype.click.bind(o);
                    S = art(M("Load file…"), art.on("click", i)), art(controls, S, o)
                }
				$("span[class='button focusable']:contains(Load file…)").attr("style","margin:0");
				
				
                inputArea.oninput = n;
                var u = function() {
                    var e = compMenu.selectedIndex,
                        t = compMenu.options[e].value,
                        n = t ? O[t] : k.feature;
                    !x && O.areEqual(n, N) || (N = n, this()), e !== compMenu.previousIndex && (compMenu.previousIndex = e, E.rollTo(+!t))
                }.bind(n);
                art(compMenu, art.on("change", u)), k = art(L(), art.on("input", u)), E = function() {
                    function n() {
                        var e = +new Date;
                        0 <= ((f = c + (e - s) * d / 250) - i) * d && (f = i, r()), a.height = 1 === f ? "" : t.scrollHeight * f + "px", o.display = 0 === f ? "none" : ""
                    }

                    function e(e) {
                        if (e === f) r();
                        else {
                            var t = f < e ? 1 : -1;
                            t !== d && (c = f, s = +new Date, d = t), i = e, u || (u = setInterval(n, 0))
                        }
                    }

                    function r() {
                        clearInterval(u), u = null, d = 0
                    }
                    var t, a, o, i, u, c, s, l, d = 0,
                        f = 0;
                    return l = art("DIV"), (o = l.style).display = "none", t = art("DIV", l, {
                        container: l,
                        rollTo: e
                    }), (a = t.style).height = "0", a.overflowY = "hidden", t
                }(), art(E.container, art("DIV", {
                    className: "frame"
                }, art("SPAN", "Custom Compatibility Selection"), k)), art(controls.parentNode, E), inputArea.selectionStart = 2147483647, inputArea.focus()
            }

            function p() {
                document.addEventListener("DOMContentLoaded", u)
            }

            function m() {
                var e = this.files[0];
                if (e) {
                    inputArea.disabled = !0, inputArea.value = "", S.disabled = !0;
                    var t = new FileReader;
                    t.addEventListener("loadend", o), t.readAsText(e)
                }
            }

            function b() {
                I && A(!0)
            }

            function v() {
                I = !1, outputArea.value = "", stats.textContent = "…"
            }

            function y(e) {
                D = e, outputArea.disabled = e
            }

            function h(e) {
                C(art("P", e))
            }

            function g(e) {
                outputArea.value = e, A()
            }

            function A(e) {
                var t = outputArea.value.length,
                    n = 1 === t ? "1 char" : t + " chars";
                x = !!e, e && (T && (inputArea.onkeyup = a), n += " – <i>out of sync</i>"), I = !0, stats.innerHTML = n
            }
            var N, k, w, S, x, I, E, D, T, _, R, O = JSDekrakenFuck.Feature;
            if ("undefined" != typeof Worker) {
                _ = URL.createObjectURL(new Blob(['"use strict";self.onmessage=function(t){var r=t.data,e=r.url;null!=e&&importScripts(e);var s=r.input;if(null!=s){var n;try{n={output:JSDekrakenFuck.encode(s,r.options)}}catch(t){n={error:String(t)}}postMessage(n)}};'], {
                    type: e
                }));
                try {
                    n()
                } catch (e) {
                    t()
                }
            }
            T ? ((R = new XMLHttpRequest).onerror = function() {
                T.terminate(), T = void 0, t()
            }, R.onload = function() {
                w = URL.createObjectURL(R.response), T.postMessage({
                    url: w
                })
            }, R.onloadend = function() {
                "loading" === document.readyState ? p() : u()
            }, R.open("GET", "https://rawcdn.githack.com/DekrakenID/tools/01e667bb10974d48e469df4dbb130a79b7cfd235/libs/fukc.js", !0), R.overrideMimeType(e), R.responseType = "blob", R.send()) : p()
        }()
}();
