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
})({14:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create by yangran on 2018/3/7
 * @param {VNode | Component} vnode
 * @returns {VNode}
 */
function renderVDOM(vnode) {
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
},{}],15:[function(require,module,exports) {
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
    for (var i = 0; i < args.length; i++) {
        if (Array.isArray(args[i])) {
            children = children.concat(args[i]);
        } else {
            children = children.concat([args[i]]);
        }
    }
    return {
        props: props || {},
        children: children,
        nodeName: comp
    };
}
exports.createElement = createElement;
},{}],12:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var renderVDOM_1 = require("./renderVDOM");
exports.renderVDOM = renderVDOM_1.renderVDOM;
var createElement_1 = require("./createElement");
exports.createElement = createElement_1.createElement;
},{"./renderVDOM":14,"./createElement":15}],10:[function(require,module,exports) {
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
var React = {};
React.createElement = yreact_1.createElement;
React.Component = /** @class */function () {
    function Component() {}
    return Component;
}();
var Grandson = /** @class */function (_super) {
    __extends(Grandson, _super);
    function Grandson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grandson.prototype.render = function () {
        return React.createElement(
            "div",
            null,
            "i am grandson"
        ); // React.createElement('div', null, "i am grandson")
    };
    return Grandson;
}(React.Component);
var Son = /** @class */function (_super) {
    __extends(Son, _super);
    function Son() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Son.prototype.render = function () {
        return React.createElement(Grandson, null); // React.createElement(Grandson)
    };
    return Son;
}(React.Component);
var Father = /** @class */function (_super) {
    __extends(Father, _super);
    function Father() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Father.prototype.render = function () {
        return React.createElement(Son, null); // React.createElement(Son)
    };
    return Father;
}(React.Component);
var vv = yreact_1.renderVDOM(React.createElement(Father, null));
console.log("vv:", vv);
},{"./src/yreact":12}],5:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63899' + '/');
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
},{}]},{},[5,10])
//# sourceMappingURL=/dist/0ad9f0a64941d3293346eab1c34f675b.map