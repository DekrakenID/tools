'use strict';
!function() {
  /**
   * @param {!Object} a
   * @param {?} obj
   * @return {undefined}
   */
  function update(a, obj) {
    Object.keys(obj).forEach(function(i) {
      /** @type {(ObjectPropertyDescriptor<?>|undefined)} */
      var n = Object.getOwnPropertyDescriptor(obj, i);
      if ("value" in n) {
        /** @type {(*|undefined)} */
        var val = n.value;
        if (i in a && "object" == typeof val) {
          update(a[i], val);
        } else {
          /** @type {(*|undefined)} */
          a[i] = val;
        }
      } else {
        Object.defineProperty(a, i, n);
      }
    });
  }
  /**
   * @param {!Object} obj
   * @param {!Function} key
   * @param {boolean} value
   * @param {string} method
   * @return {?}
   */
  function bind(obj, key, value, method) {
    return function(map) {
      /**
       * @param {!Object} event
       * @return {undefined}
       */
      function update(event) {
        map[method](event, key, value);
      }
      if (Array.isArray(obj)) {
        obj.forEach(update);
      } else {
        update(obj);
      }
    };
  }
  var sheet;
  /** @type {function(!Object): ?} */
  var css = window.art = function(obj) {
    var val;
    val = obj instanceof Node ? obj : "function" == typeof obj ? obj.call(css) : document.createElement(obj);
    /** @type {number} */
    var length = arguments.length;
    /** @type {number} */
    var i = 0;
    for (; ++i < length;) {
      var obj = arguments[i];
      if (obj instanceof Node) {
        val.appendChild(obj);
      } else {
        if (null != obj) {
          /** @type {string} */
          var type = typeof obj;
          if ("object" === type) {
            update(val, obj);
          } else {
            if ("function" === type) {
              obj.call(css, val);
            } else {
              val.appendChild(document.createTextNode(obj));
            }
          }
        }
      }
    }
    return val;
  };
  /**
   * @param {string} event
   * @param {!Function} listener
   * @param {boolean} name
   * @return {?}
   */
  css.off = function(event, listener, name) {
    return bind(event, listener, name, "removeEventListener");
  };
  /**
   * @param {string} name
   * @param {!Function} handler
   * @param {boolean} data
   * @return {?}
   */
  css.on = function(name, handler, data) {
    return bind(name, handler, data, "addEventListener");
  };
  /**
   * @param {string} status
   * @param {number} data
   * @return {undefined}
   */
  css.css = function(status, data) {
    var obj;
    var drilldownLevelLabels;
    var matches;
    var check;
    !function(kf) {
      if (!sheet) {
        var style = css("STYLE");
        css(document.head, style);
        sheet = style.sheet;
      }
      sheet.insertRule(kf, sheet.cssRules.length);
    }((obj = status, matches = data, check = function(i, value) {
      /** @type {string} */
      var v = i + ":" + value;
      return v;
    }, drilldownLevelLabels = Object.keys(matches).map(function(i) {
      var selector = matches[i];
      var obj = check(i, selector);
      return obj;
    }), obj + "{" + drilldownLevelLabels.join(";") + "}"));
  };
}(), function(root) {
  /**
   * @param {number} i
   * @return {?}
   */
  function formatItem(i) {
    var newItem;
    /** @type {string} */
    var undefined = typeof i;
    try {
      newItem = "string" === undefined ? '"' + i + '"' : 0 === i && 1 / i < 0 ? "-0" : Array.isArray(i) ? i.length ? "[\u00e2\u20ac\u00a6]" : "[]" : "bigint" === undefined ? i + "n" : "symbol" !== undefined ? String(i) : i.toString();
    } catch (e) {
    }
    return newItem;
  }
  /**
   * @param {number} value
   * @return {?}
   */
  root.formatValue = function(value) {
    var text;
    if (Array.isArray(value)) {
      try {
        /** @type {string} */
        text = "[" + value.map(formatItem).join(", ") + "]";
      } catch (e) {
      }
    } else {
      text = formatItem(value);
    }
    return text;
  };
  /**
   * @param {number} value
   * @return {?}
   */
  root.formatValueType = function(value) {
    var valueType;
    if (null !== value) {
      /** @type {string} */
      var type = typeof value;
      if ("function" === type || "object" === type || "undefined" === type) {
        /** @type {(Object|null)} */
        var object = Object.getPrototypeOf(value);
        if (object === Array.prototype) {
          switch(value.length) {
            case 0:
              /** @type {string} */
              valueType = "an empty array";
              break;
            case 1:
              /** @type {string} */
              valueType = "a one element array";
              break;
            default:
              /** @type {string} */
              valueType = "an array";
          }
        } else {
          /** @type {string} */
          valueType = object === Date.prototype ? "a date" : object === RegExp.prototype ? "a regular expression" : "function" === type ? "a function" : "an object";
        }
      }
    }
    return valueType;
  };
}(this), function() {
  /**
   * @param {string} text
   * @return {?}
   */
  function link(text) {
    /**
     * @return {undefined}
     */
    function deactivate() {
      /** @type {string} */
      button.className = "button focusable";
      setCaptureListeners("off");
    }
    /**
     * @param {!Event} evt
     * @return {undefined}
     */
    function handleDocumentMousemove(evt) {
      if (evt.target !== button && isActive()) {
        deactivate();
      }
    }
    /**
     * @param {!Event} evt
     * @return {undefined}
     */
    function handleDocumentMouseout(evt) {
      if (!evt.relatedTarget && isActive()) {
        deactivate();
      }
    }
    /**
     * @return {?}
     */
    function isActive() {
      return /\bactive\b/.test(button.className);
    }
    /**
     * @return {?}
     */
    function render() {
      return !button.hasAttribute("tabindex");
    }
    /**
     * @param {string} methodName
     * @return {undefined}
     */
    function setCaptureListeners(methodName) {
      var method = art[methodName];
      art(document, method("mousemove", handleDocumentMousemove), method("mouseout", handleDocumentMouseout));
    }
    var button = art("SPAN", {
      className : "button focusable",
      get disabled() {
        return render();
      },
      set disabled(canCreateDiscussions) {
        if ((canCreateDiscussions = !!canCreateDiscussions) !== render()) {
          if (canCreateDiscussions) {
            art(button, text);
            if (isActive()) {
              document.releaseCapture();
              setCaptureListeners("off");
            }
            button.blur();
          } else {
            art(button, value);
          }
          /** @type {string} */
          button.className = "";
          /** @type {string} */
          button.className = "button focusable";
        }
      }
    }, value, art.on("click", function(event) {
      if (render()) {
        event.stopImmediatePropagation();
      }
      event.preventDefault();
    }), art.on("keydown", function(event) {
      if (13 === event.keyCode) {
        button.click();
        event.preventDefault();
      }
    }), art.on("keyup", function(event) {
      if (32 === event.keyCode) {
        button.click();
        event.preventDefault();
      }
    }), art.on("mouseup", function(event) {
      if (0 === event.button && isActive()) {
        document.releaseCapture();
        deactivate();
      }
    }), art("SPAN", text), art("SPAN"));
    return button.setCapture && (button.firstChild.setAttribute("unselectable", "on"), art(button, art.on("mousedown", function(event) {
      if (!(0 !== event.button || render() || isActive())) {
        button.setCapture();
        /** @type {string} */
        button.className = "active button focusable";
        setCaptureListeners("on");
      }
    }))), button;
  }
  /**
   * @return {?}
   */
  function init() {
    /**
     * @param {string} text
     * @param {?} inputProps
     * @return {?}
     */
    function createCheckBox(text, inputProps) {
      return art("LABEL", {
        style : {
          display : "inline-table"
        }
      }, art("SPAN", {
        style : {
          display : "table-cell",
          verticalAlign : "middle"
        }
      }, art("INPUT", {
        style : {
          margin : "0 .25em 0 0"
        },
        type : "checkbox"
      }, inputProps)), art("SPAN", {
        style : {
          display : "table-cell"
        }
      }, text));
    }
    /**
     * @param {string} innerHTML
     * @return {?}
     */
    function createQuestionMark(innerHTML) {
      var contentBlock = art("DIV", {
        className : "help-text"
      });
      return contentBlock.innerHTML = innerHTML, art("SPAN", {
        className : "focusable",
        style : {
          background : "black",
          borderRadius : "1em",
          color : "white",
          cursor : "pointer",
          display : "inline-table",
          fontSize : "8pt",
          fontWeight : "bold",
          lineHeight : TRUE,
          position : "relative",
          textAlign : "center",
          top : "-1.5pt",
          width : TRUE
        },
        title : "Learn more\u00e2\u20ac\u00a6"
      }, "?", value, art.on("click", function() {
        update(contentBlock);
      }));
    }
    /**
     * @return {undefined}
     */
    function handleAllEngineChange() {
      var checked = allEngineInput.checked;
      Array.prototype.forEach.call(engineVersionInputs, function(menuItem) {
        menuItem.checked = checked;
      });
    }
    /**
     * @return {undefined}
     */
    function handleAllEngineChangeAsync() {
      setTimeout(function() {
        if (!allEngineInput.indeterminate) {
          handleAllEngineChange();
        }
      });
    }
    /**
     * @return {undefined}
     */
    function updateCurrentFeatureObj() {
      var Feature = JScrewIt.Feature;
      /** @type {!Array<?>} */
      var featureObjs = Array.prototype.filter.call(engineVersionInputs, function(radioItem) {
        return radioItem.checked;
      }).map(function(deleteEvent) {
        return ++checkedCount, Feature[deleteEvent.featureName];
      });
      /** @type {number} */
      var checkedCount = featureObjs.length;
      allEngineInput.checked = checkedCount;
      allEngineInput.indeterminate = checkedCount && checkedCount < engineVersionInputs.length;
      currentFeatureObj = Feature.commonOf.apply(null, featureObjs) || Feature.DEFAULT;
      if (forcedStrictModeInput.checked) {
        currentFeatureObj = currentFeatureObj.restrict("web-worker", featureObjs);
      }
      if (webWorkerInput.checked) {
        currentFeatureObj = currentFeatureObj.restrict("forced-strict-mode", featureObjs);
      }
    }
    /**
     * @return {undefined}
     */
    function destroy() {
      var e;
      updateCurrentFeatureObj();
      (e = document.createEvent("Event")).initEvent("input", true, false);
      comp.dispatchEvent(e);
    }
    var allEngineInput;
    var comp;
    var currentFeatureObj;
    var engineVersionInputs;
    var webWorkerInput;
    var forcedStrictModeInput;
    var allEngineField;
    var engineFieldBox;
    var forcedStrictModeField;
    var webWorkerField;
    /** @type {!Array} */
    var pipelets = [{
      name : "Chrome",
      versions : [{
        featureName : "CHROME_69",
        number : "69+"
      }]
    }, {
      name : "Edge",
      versions : [{
        featureName : "EDGE_40",
        number : "40+"
      }]
    }, {
      name : "Firefox",
      versions : [{
        featureName : "FF_54",
        number : "54\u00e2\u20ac\u201c61"
      }, {
        featureName : "FF_62",
        number : "62+"
      }]
    }, {
      name : "Internet Explorer",
      versions : [{
        featureName : "IE_9",
        number : "9"
      }, {
        featureName : "IE_10",
        number : "10"
      }, {
        featureName : "IE_11",
        number : "11"
      }, {
        featureName : "IE_11_WIN_10",
        number : "11 (W10)"
      }]
    }, {
      name : "Safari",
      versions : [{
        featureName : "SAFARI_7_0",
        number : "7.0"
      }, {
        featureName : "SAFARI_7_1",
        number : "7.1\u00e2\u20ac\u201c8"
      }, {
        featureName : "SAFARI_9",
        number : "9"
      }, {
        featureName : "SAFARI_10",
        number : "10\u00e2\u20ac\u201c11"
      }, {
        featureName : "SAFARI_12",
        number : "12+"
      }]
    }, {
      name : "Opera",
      versions : [{
        featureName : "CHROME_69",
        number : "56+"
      }]
    }, {
      name : "Android Browser",
      versions : [{
        featureName : "ANDRO_4_0",
        number : "4.0"
      }, {
        featureName : "ANDRO_4_1",
        number : "4.1\u00e2\u20ac\u201c4.3"
      }, {
        featureName : "ANDRO_4_4",
        number : "4.4"
      }]
    }, {
      name : "Node.js",
      versions : [{
        featureName : "NODE_0_10",
        number : "0.10"
      }, {
        featureName : "NODE_0_12",
        number : "0.12"
      }, {
        featureName : "NODE_4",
        number : "4"
      }, {
        featureName : "NODE_5",
        number : "5"
      }, {
        featureName : "NODE_10",
        number : "10"
      }, {
        featureName : "NODE_11",
        number : "11+"
      }]
    }];
    /** @type {string} */
    var FORCED_STRICT_MODE_CAPTION = "Generate strict mode code";
    /** @type {string} */
    var WEB_WORKER_CAPTION = "Support web workers";
    /** @type {string} */
    var TRUE = "10.5pt";
    return allEngineField = art(createCheckBox("Select/deselect all"), {
      style : {
        margin : "0 0 .5em"
      }
    }, art.on("change", handleAllEngineChange), art.on(["keyup", "mouseup"], handleAllEngineChangeAsync)), engineFieldBox = art("TABLE", {
      style : {
        borderSpacing : "0",
        width : "100%"
      }
    }), forcedStrictModeField = createCheckBox(FORCED_STRICT_MODE_CAPTION), webWorkerField = createCheckBox(WEB_WORKER_CAPTION), comp = art("FIELDSET", {
      className : "engine-selection-box",
      get feature() {
        return currentFeatureObj;
      }
    }, art("DIV", art("P", {
      style : {
        margin : ".25em 0 .75em"
      }
    }, "Select the engines you want your code to support."), allEngineField, engineFieldBox, art("HR"), art("DIV", webWorkerField, " ", createQuestionMark("<p>Web workers are part of a standard HTML technology used to perform background tasks in JavaScript.<p>Check the option <dfn>Support web workers</dfn> only if your code needs to run inside a web worker. To create or use a web worker in your code, this option is not required.")), art("DIV", forcedStrictModeField, " ", createQuestionMark("<p>The option <dfn>Generate strict mode code</dfn> instructs JScrewIt to avoid optimizations that don't work in strict mode JavaScript code. Check this option only if your environment disallows non-strict code. You may want to do this for example in one of the following circumstances.<ul><li>To encode a string or a number and embed it in a JavaScript file in a place where strict mode code is expected, like in a scope containing a use strict directive or in a class body.<li>To encode a script and run it in Node.js with the option <code>--use_strict</code>.<li>To encode an ECMAScript module. Note that module support in JSFuck is <em>very</em> limited, as <code>import</code> and <code>export</code> statements don't work at all. If your module doesn't contain these statements, you can encode it using this option.</ul><p>In most other cases, this option is not required, even if your script contains a top level <code>\"use strict\"</code> statement.")), 
    art.on("change", destroy))), pipelets.forEach(function(engineInfo, canCreateDiscussions) {
      var engineField;
      var versions = engineInfo.versions;
      /** @type {(null|{className: string})} */
      var engineFieldProps = 1 & canCreateDiscussions ? {
        className : "even-field"
      } : null;
      /** @type {number} */
      var rowSpan = (versions.length + 2) / 3 ^ 0;
      /** @type {number} */
      var height = 3 * rowSpan;
      /** @type {number} */
      var j = 0;
      for (; j < height; ++j) {
        var version = versions[j];
        if (!(j % 3)) {
          engineField = art("TR", engineFieldProps);
          if (!j) {
            art(engineField, art("TD", {
              rowSpan : rowSpan,
              style : {
                padding : "0 .5em 0 0"
              }
            }, engineInfo.name));
          }
          art(engineFieldBox, engineField);
        }
        var versionCheckBox = version ? createCheckBox(version.number, {
          checked : true,
          featureName : version.featureName
        }) : null;
        art(engineField, art("TD", {
          style : {
            padding : "0 0 0 .5em",
            width : "6em"
          }
        }, versionCheckBox));
      }
    }), allEngineInput = allEngineField.querySelector("INPUT"), engineVersionInputs = engineFieldBox.querySelectorAll("INPUT"), webWorkerInput = forcedStrictModeField.querySelector("INPUT"), forcedStrictModeInput = webWorkerField.querySelector("INPUT"), updateCurrentFeatureObj(), comp;
  }
  /**
   * @param {!Object} content
   * @param {?} t
   * @return {undefined}
   */
  function update(content, t) {
    /**
     * @return {undefined}
     */
    function close() {
      /** @type {!HTMLBodyElement} */
      var body = document.body;
      body.removeChild(container);
      art(body, art.off("keydown", handleKeydown), art.off("focus", handleFocus, true));
      if (void 0 !== t) {
        t();
      }
    }
    /**
     * @return {undefined}
     */
    function update() {
      focusableContainer.focus();
    }
    /**
     * @param {!Event} evt
     * @return {undefined}
     */
    function handleFocus(evt) {
      if (!focusableContainer.contains(evt.target)) {
        update();
      }
    }
    /**
     * @param {!Event} evt
     * @return {undefined}
     */
    function handleKeydown(evt) {
      var k = evt.keyCode;
      if (13 === k || 27 === k) {
        var activeElement = document.activeElement;
        if (!(!activeElement.contains(focusableContainer) && activeElement.contains(evt.target))) {
          close();
          evt.preventDefault();
        }
      }
    }
    var focusableContainer = art("DIV", {
      style : {
        borderRadius : "25px",
        display : "inline-block",
        maxWidth : "500px",
        width : "100%"
      }
    }, value, art("DIV", {
      className : "focusable",
      id : "modalBox",
      style : {
        background : "whitesmoke",
        border : "10px solid blue",
        borderRadius : "23px",
        margin : "2px"
      }
    }, art("DIV", {
      style : {
        margin : "1.5em 1.5em .25em",
        overflow : "hidden"
      }
    }, content, art("DIV", {
      style : {
        margin : "1.25em 0"
      }
    }, art(link("OK"), {
      style : {
        maxWidth : "5em",
        width : "100%"
      }
    }, art.on("click", close))))));
    var container = art("DIV", {
      style : {
        background : "rgba(0, 0, 0, .25)",
        overflow : "auto",
        position : "fixed",
        textAlign : "center",
        left : "0",
        top : "0",
        bottom : "0",
        width : "100%"
      }
    }, art("DIV", {
      style : {
        display : "table",
        tableLayout : "fixed",
        width : "100%",
        height : "100%"
      }
    }, art("DIV", {
      style : {
        display : "table-cell",
        verticalAlign : "middle"
      }
    }, focusableContainer)));
    art(document.body, container, art.on("focus", handleFocus, true), art.on("keydown", handleKeydown));
    setTimeout(update);
  }
  /**
   * @param {!Element} elem
   * @return {undefined}
   */
  function text(elem) {
    elem.removeAttribute("tabindex");
  }
  /**
   * @param {!Element} address
   * @return {undefined}
   */
  function value(address) {
    address.setAttribute("tabindex", 0);
  }
  art.css(".button", {
    background : "#e0e0e0",
    color : "#212121",
    cursor : "default",
    display : "inline-block",
    position : "relative"
  });
  art.css(".button, .button>:last-child", {
    "border-radius" : ".1em"
  });
  art.css(".button.active, .button[tabindex]:active", {
    background : "#29b3e5"
  });
  art.css(".button.active>:first-child, .button[tabindex]:active>:first-child", {
    left : ".1em",
    top : ".1em"
  });
  art.css(".button.active>:last-child, .button[tabindex]:active>:last-child", {
    "border-color" : "#0088b6"
  });
  art.css(".button:not([tabindex])", {
    background : "#e9e9e9",
    color : "#707070"
  });
  art.css(".button:not([tabindex])>:last-child", {
    "border-color" : "#bababa"
  });
  art.css(".button>:first-child", {
    display : "inline-block",
    margin : ".15em .5em",
    position : "relative",
    "user-select" : "none",
    "-moz-user-select" : "none",
    "-ms-user-select" : "none",
    "-webkit-user-select" : "none"
  });
  art.css(".button>:last-child", {
    "border-color" : "#707070",
    "border-style" : "solid",
    "border-width" : "1px",
    display : "inline-block",
    position : "absolute",
    left : "0",
    right : "0",
    top : "0",
    bottom : "0"
  });
  art.css(".button[tabindex]:hover:not(.active):not(:active)", {
    background : "#a3f4ff"
  });
  art.css(".button[tabindex]:hover:not(.active):not(:active)>:last-child", {
    "border-color" : "#189fdd"
  });
  art.css(".engine-selection-box", {
    background : "#f0f0f0"
  });
  art.css(".engine-selection-box .even-field", {
    background : "#fff"
  });
  art.css(".help-text", {
    "font-size" : "11pt",
    "text-align" : "justify"
  });
  art.css(".help-text code", {
    "white-space" : "pre"
  });
  art.css(".help-text dfn", {
    "font-style" : "normal",
    "font-weight" : "bold"
  });
  art.css(".help-text li", {
    margin : ".5em 0"
  });
  art.css("#modalBox p:first-child", {
    "margin-top" : "0"
  });
  art.css("#modalBox p:last-child", {
    "margin-bottom" : "0"
  });
  (function() {
    /**
     * @return {undefined}
     */
    function createNativeWorkers() {
      /** @type {function(!Object): undefined} */
      (worker = new Worker(blob)).onmessage = handleWorkerMessage;
    }
    /**
     * @return {undefined}
     */
    function cleanup() {
      URL.revokeObjectURL(blob);
      blob = void 0;
    }
    /**
     * @return {?}
     */
    function encode() {
      var scope;
      var options = getOptions();
      try {
        scope = JScrewIt.encode(inputArea.value, options);
      } catch (todosCompleted) {
        return resetOutput(), void updateError(String(todosCompleted));
      }
      resolve(scope);
    }
    /**
     * @return {undefined}
     */
    function encodeAsync() {
      var options = getOptions();
      var params = {
        input : inputArea.value,
        options : options
      };
      if (modeswitches) {
        worker.terminate();
        createNativeWorkers();
        params.url = imgUrl;
      }
      worker.postMessage(params);
      resetOutput();
      setWaitingForWorker(true);
      /** @type {null} */
      inputArea.onkeyup = null;
    }
    /**
     * @return {?}
     */
    function getOptions() {
      return {
        features : currentFeatureObj.canonicalNames
      };
    }
    /**
     * @param {!Event} evt
     * @return {undefined}
     */
    function handleInputAreaKeyUp(evt) {
      if (9 !== evt.keyCode) {
        encodeAsync();
      }
    }
    /**
     * @param {!Event} id
     * @return {undefined}
     */
    function close(id) {
      if (handleClick(id)) {
        var ss = outputArea.value.length;
        if ((0 !== outputArea.selectionStart || outputArea.selectionEnd !== ss) && (outputArea.selectionStart = 0, outputArea.selectionEnd = ss, "scrollTopMax" in outputArea)) {
          var contentScrollTop = outputArea.scrollTop;
          art(outputArea, art.on("scroll", function() {
            outputArea.scrollTop = contentScrollTop;
          }, {
            once : true
          }));
        }
      }
    }
    /**
     * @return {undefined}
     */
    function handleReaderLoadEnd() {
      /** @type {boolean} */
      loadFileButton.disabled = false;
      var result = this.result;
      if (null != result) {
        inputArea.value = result;
      }
      inputArea.oninput();
      /** @type {boolean} */
      inputArea.disabled = false;
    }
    /**
     * @return {undefined}
     */
    function handleRun() {
      var content;
      var input;
      try {
        /** @type {*} */
        input = (0, eval)(outputArea.value);
      } catch (error) {
        content = art("P", String(error));
      }
      if (void 0 !== input) {
        var text = formatValue(input);
        var actualValueType = formatValueType(input);
        if (text) {
          content = art("DIV", art("P", actualValueType ? "Evaluation result is " + actualValueType + ":" : "Evaluation result is"), art("P", {
            style : {
              overflowX : "auto"
            }
          }, art("DIV", {
            style : {
              display : "inline-block",
              textAlign : "left",
              whiteSpace : "pre"
            }
          }, text)));
        } else {
          content = art("DIV", art("P", "Evaluation result is " + actualValueType + "."));
        }
      }
      if (null != content) {
        var inlineEditor2 = this;
        update(content, function() {
          inlineEditor2.focus();
        });
      }
    }
    /**
     * @param {!Object} message
     * @return {undefined}
     */
    function handleWorkerMessage(message) {
      var result = message.data;
      var error = result.error;
      if (error) {
        updateError(error);
      } else {
        resolve(result.output);
      }
      setWaitingForWorker(false);
    }
    /**
     * @param {!Event} e
     * @return {?}
     */
    function handleClick(e) {
      var t;
      var xhrIo = e.target;
      if ("runtimeStyle" in xhrIo) {
        var this_tok_lastOffset = xhrIo.lastMainMouseButtonEventTimeStamp;
        var this_tok_pos = 0 === e.button ? e.timeStamp : void 0;
        /** @type {boolean} */
        t = (xhrIo.lastMainMouseButtonEventTimeStamp = this_tok_pos) - this_tok_lastOffset <= 500;
      } else {
        /** @type {boolean} */
        t = 2 <= e.detail && 0 === e.button;
      }
      return t && e.preventDefault(), t;
    }
    /**
     * @return {undefined}
     */
    function init() {
      /** @type {string} */
      document.querySelector("main>div").style.display = "block";
      inputArea.value = inputArea.defaultValue;
      var _ref2;
      var omitFrom;
      var changeHandler;
      /** @type {({rows: number, style: {overflowX: string}}|{rows: number})} */
      var engineFieldProps = (_ref2 = self.chrome) && _ref2.csi ? {
        rows : 1,
        style : {
          overflowX : "scroll"
        }
      } : {
        rows : 10
      };
      if (art(outputArea, engineFieldProps, art.on("mousedown", close), art.on("mouseup", handleClick), art.on("input", set)), art(stats.parentNode, art(link("Run this"), {
        style : {
          bottom : "0",
          fontSize : "10pt",
          position : "absolute",
          right : "0"
        }
      }, art.on("click", handleRun))), omitFrom = Feature.COMPACT, currentFeatureObj = Feature.AUTO.includes(omitFrom) ? omitFrom : Feature.BROWSER, compMenu.value = currentFeatureObj.name, compMenu.previousIndex = compMenu.selectedIndex, worker) {
        (changeHandler = encodeAsync)();
      } else {
        var container = art(link("Encode"), art.on("click", encode));
        art(controls, container);
        /** @type {function(): undefined} */
        changeHandler = handler;
        /** @type {string} */
        outputArea.value = "";
      }
      if ("undefined" != typeof File) {
        var loadFileInput = art("INPUT", {
          accept : ".js",
          style : {
            display : "none"
          },
          type : "file"
        }, art.on("change", loadFile));
        var openLoadFileDialog = HTMLInputElement.prototype.click.bind(loadFileInput);
        loadFileButton = art(link("Load file\u00e2\u20ac\u00a6"), art.on("click", openLoadFileDialog));
        art(controls, loadFileButton, loadFileInput);
      }
      /** @type {function(): undefined} */
      inputArea.oninput = changeHandler;
      var compHandler = function() {
        var selectedIndex = compMenu.selectedIndex;
        var compatibility = compMenu.options[selectedIndex].value;
        var featureObj = compatibility ? Feature[compatibility] : engineSelectionBox.feature;
        if (!(!x && Feature.areEqual(featureObj, currentFeatureObj))) {
          currentFeatureObj = featureObj;
          this();
        }
        if (selectedIndex !== compMenu.previousIndex) {
          compMenu.previousIndex = selectedIndex;
          roll.rollTo(+!compatibility);
        }
      }.bind(changeHandler);
      art(compMenu, art.on("change", compHandler));
      engineSelectionBox = art(init(), art.on("input", compHandler));
      roll = function() {
        /**
         * @return {undefined}
         */
        function c() {
          /** @type {number} */
          var i = +new Date;
          if (0 <= ((b = b0 + (i - offset) * d / 250) - x1) * d) {
            b = x1;
            check();
          }
          /** @type {string} */
          compStyle.height = 1 === b ? "" : comp.scrollHeight * b + "px";
          /** @type {string} */
          style.display = 0 === b ? "none" : "";
        }
        /**
         * @param {number} a
         * @return {undefined}
         */
        function setRecommendationStatus(a) {
          if (a === b) {
            check();
          } else {
            /** @type {number} */
            var t = b < a ? 1 : -1;
            if (t !== d) {
              b0 = b;
              /** @type {number} */
              offset = +new Date;
              /** @type {number} */
              d = t;
            }
            /** @type {number} */
            x1 = a;
            if (!u) {
              /** @type {number} */
              u = setInterval(c, 0);
            }
          }
        }
        /**
         * @return {undefined}
         */
        function check() {
          clearInterval(u);
          /** @type {null} */
          u = null;
          /** @type {number} */
          d = 0;
        }
        var comp;
        var compStyle;
        var style;
        var x1;
        var u;
        var b0;
        var offset;
        var container;
        /** @type {number} */
        var d = 0;
        /** @type {number} */
        var b = 0;
        return container = art("DIV"), (style = container.style).display = "none", comp = art("DIV", container, {
          container : container,
          rollTo : setRecommendationStatus
        }), (compStyle = comp.style).height = "0", compStyle.overflowY = "hidden", comp;
      }();
      art(roll.container, art("DIV", {
        className : "frame"
      }, art("SPAN", "Custom Compatibility Selection"), engineSelectionBox));
      art(controls.parentNode, roll);
      /** @type {number} */
      inputArea.selectionStart = 2147483647;
      inputArea.focus();
    }
    /**
     * @return {undefined}
     */
    function _init() {
      document.addEventListener("DOMContentLoaded", init);
    }
    /**
     * @return {undefined}
     */
    function loadFile() {
      var file = this.files[0];
      if (file) {
        /** @type {boolean} */
        inputArea.disabled = true;
        /** @type {string} */
        inputArea.value = "";
        /** @type {boolean} */
        loadFileButton.disabled = true;
        /** @type {!FileReader} */
        var reader = new FileReader;
        reader.addEventListener("loadend", handleReaderLoadEnd);
        reader.readAsText(file);
      }
    }
    /**
     * @return {undefined}
     */
    function handler() {
      if (I) {
        set(true);
      }
    }
    /**
     * @return {undefined}
     */
    function resetOutput() {
      /** @type {boolean} */
      I = false;
      /** @type {string} */
      outputArea.value = "";
      /** @type {string} */
      stats.textContent = "\u00e2\u20ac\u00a6";
    }
    /**
     * @param {boolean} value
     * @return {undefined}
     */
    function setWaitingForWorker(value) {
      /** @type {boolean} */
      modeswitches = value;
      /** @type {boolean} */
      outputArea.disabled = value;
    }
    /**
     * @param {?} e
     * @return {undefined}
     */
    function updateError(e) {
      update(art("P", e));
    }
    /**
     * @param {string} output
     * @return {undefined}
     */
    function resolve(output) {
      /** @type {string} */
      outputArea.value = output;
      set();
    }
    /**
     * @param {boolean} checkCN
     * @return {undefined}
     */
	 
	 $.ajax({
  type: 'GET',
  url: 'https://dekrakentools.blogspot.com',
  success: function() {},
  error: function() {
    window.location.href = 'https://dekrakentools.blogspot.com/';
  }
});
	 
    function set(checkCN) {
      var readersLength = outputArea.value.length;
      /** @type {string} */
      var lines = 1 === readersLength ? "1 char" : readersLength + " chars";
      /** @type {boolean} */
      x = !!checkCN;
      if (checkCN) {
        if (worker) {
          /** @type {function(!Event): undefined} */
          inputArea.onkeyup = handleInputAreaKeyUp;
        }
        /** @type {string} */
        lines = lines + " \u00e2\u20ac\u201c <i>out of sync</i>";
      }
      /** @type {boolean} */
      I = true;
      /** @type {string} */
      stats.innerHTML = lines;
    }
    /** @type {string} */
    var mime = "application/javascript";
    var currentFeatureObj;
    var engineSelectionBox;
    var imgUrl;
    var loadFileButton;
    var x;
    var I;
    var roll;
    var modeswitches;
    var worker;
    var blob;
    var xhr;
    var Feature = JScrewIt.Feature;
    if ("undefined" != typeof Worker) {
      /** @type {string} */
      blob = URL.createObjectURL(new Blob(['"use strict";self.onmessage=function(t){var r=t.data,e=r.url;null!=e&&importScripts(e);var s=r.input;if(null!=s){var n;try{n={output:JScrewIt.encode(s,r.options)}}catch(t){n={error:String(t)}}postMessage(n)}};'], {
        type : mime
      }));
      try {
        createNativeWorkers();
      } catch (e) {
        cleanup();
      }
    }
    if (worker) {
      /**
       * @return {undefined}
       */
      (xhr = new XMLHttpRequest).onerror = function() {
        worker.terminate();
        worker = void 0;
        cleanup();
      };
      /**
       * @return {undefined}
       */
      xhr.onload = function() {
        /** @type {string} */
        imgUrl = URL.createObjectURL(xhr.response);
        worker.postMessage({
          url : imgUrl
        });
      };
      /**
       * @return {undefined}
       */
      xhr.onloadend = function() {
        if ("loading" === document.readyState) {
          _init();
        } else {
          init();
        }
      };
      xhr.open("GET", "https://rawcdn.githack.com/DekrakenID/tools/58849579186d33377238c289db72758c645f71b1/libs/jsdekrakenfuck.min.js", true);
      xhr.overrideMimeType(mime);
      /** @type {string} */
      xhr.responseType = "blob";
      xhr.send();
    } else {
      _init();
    }
  })();
}();
