// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
function render(vnode, parent, comp, olddom) {
    var dom;
    if (typeof vnode === 'string') {
        dom = document.createTextNode(vnode);
        comp && (comp.__rendered = dom);
        parent.appendChild(dom);
        if (olddom) parent.replaceChild(dom, olddom);else parent.appendChild(dom);
    } else if (typeof vnode.nodeName === 'string') {
        dom = document.createElement(vnode.nodeName);
        comp && (comp.__rendered = dom);
        setAttrs(dom, vnode.props);
        if (olddom) parent.replaceChild(dom, olddom);else parent.appendChild(dom);
        // 虚拟dom 渲染后递归
        for (var i = 0; i < vnode.children.length; i++) {
            render(vnode.children[i], dom);
        }
    } else if (typeof vnode.nodeName === 'function') {
        var func = vnode.nodeName;
        var inst = new func(vnode.props); // 组件实例
        comp && (comp.__rendered = inst);
        var innerVNode = inst.render(); // 组件render 出来递归
        render(innerVNode, parent, inst, olddom);
    }
}
exports.render = render;
function setAttrs(dom, props) {
    var keys = Object.keys(props);
    keys.forEach(function (k) {
        var v = props[k];
        if (k === 'className') {
            dom.setAttribute('class', v);
            return;
        }
        if (k === 'style') {
            if (typeof v === 'string') {
                dom.style.cssText = v;
            }
            if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === 'object') {
                for (var i in v) {
                    dom.style[i] = v[i];
                }
            }
            return;
        }
        if (k[0] === 'o' && k[1] === 'n') {
            // onClickCapture
            var capture = k.indexOf('Capture') !== -1;
            dom.addEventListener(k.replace('Capture', '').substring(2).toLowerCase(), v, capture);
            return;
        }
        dom.setAttribute(k, v);
    });
}
},{}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create by yangran on 2018/3/7
 * @param {VNode | Component} vnode
 * @returns {VNode}
 */
function renderVDOM(vnode) {
    if (!vnode) return; // 可能是函数执行
    // text 节点
    if (typeof vnode === 'string') return vnode;else if (typeof vnode.nodeName === 'string') {
        var result = {
            nodeName: vnode.nodeName,
            props: vnode.props,
            children: []
        };
        for (var i = 0; i < vnode.children.length; i++) {
            result.children.push(renderVDOM(vnode.children[i]));
        }
        return result;
        // class 组件
    } else if (typeof vnode.nodeName === 'function') {
        var func = vnode.nodeName;
        var inst = new func(vnode.props);
        var innerVnode = inst.render();
        return renderVDOM(innerVnode);
    }
}
exports.renderVDOM = renderVDOM;
},{}],8:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create by yangran on 2018/3/7
 * @param {String} compName
 * @param {Object} props
 * @param {ArrayLike} args
 * @returns {{props: Object; children: Array; nodeName: String}}
 */
function createElement(comp, props) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var children = [];
    props = props || {};
    for (var i = 0; i < args.length; i++) {
        if (Array.isArray(args[i])) {
            children = children.concat(args[i]);
        } else {
            children = children.concat([args[i]]);
        }
    }
    return {
        nodeName: comp,
        props: props || {},
        children: children
    };
}
exports.createElement = createElement;
},{}],4:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("./render");
exports.render = render_1.render;
var renderVDOM_1 = require("./renderVDOM");
exports.renderVDOM = renderVDOM_1.renderVDOM;
var createElement_1 = require("./createElement");
exports.createElement = createElement_1.createElement;
},{"./render":6,"./renderVDOM":7,"./createElement":8}],5:[function(require,module,exports) {
"use strict";
/**
 * create by yangran on 2018/3/8
 */

Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
/**
 * todo 获取 olddom
 * @param 由谁渲染
 * @returns {HTMLElement}
 */
function getDOM(comp) {
  var rendered = comp.__rendered;
  while (rendered instanceof component_1.default) {
    rendered = rendered.__rendered;
  }
  return rendered;
}
exports.getDOM = getDOM;
},{"./component":3}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var render_1 = require("./render");
var Component = /** @class */function () {
    function Component(props) {
        this.props = props;
    }
    Component.prototype.setState = function (state) {
        var _this = this;
        setTimeout(function () {
            _this.state = state;
            var vnode = _this.render();
            var olddom = util_1.getDOM(_this);
            render_1.render(vnode, olddom.parentNode, _this, olddom);
        }, 0);
    };
    return Component;
}();
exports.default = Component;
},{"./util":5,"./render":6}],2:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
exports.__esModule = true;
var yreact_1 = require("./src/yreact");
var component_1 = require("./src/component");
var React = {};
React.createElement = yreact_1.createElement;
React.Component = component_1["default"];
var Child = /** @class */function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.render = function () {
        var _this = this;
        return React.createElement(
            "div",
            { style: { color: this.props.color } },
            "color is: ",
            this.props.color,
            React.createElement(
                "button",
                { onClick: function onClick() {
                        return console.log(_this);
                    } },
                "child - this"
            )
        );
    };
    return Child;
}(component_1["default"]);
var colors = ['red', 'blue', 'yellow', 'black', 'green'];
var App = /** @class */function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            color: 'grey'
        };
        return _this;
    }
    App.prototype.handleClick = function () {
        console.log("handleClick");
        this.setState({
            color: colors[parseInt(Math.random() * 5)]
        });
    };
    App.prototype.render = function () {
        var _this = this;
        return React.createElement(
            "div",
            { onClick: this.handleClick.bind(this) },
            React.createElement(Child, { color: this.state.color }),
            React.createElement(
                "button",
                { onClick: function onClick() {
                        return console.log(_this);
                    } },
                "app - this"
            )
        );
    };
    return App;
}(component_1["default"]);
// console.log(renderVDOM(<PS />))
yreact_1.render(React.createElement(App, null), document.getElementById("app"));
// window.fn = () => render(<App />, document.getElementById("app"))
// setTimeout(fn, 1000)
},{"./src/yreact":4,"./src/component":3}],9:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '55435' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[9,2])
//# sourceMappingURL=/dist/0ad9f0a64941d3293346eab1c34f675b.map