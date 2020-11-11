'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'vue-laravel-sidebar',
  props: {
    navData: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {
      nav: this.navData
    };
  },
  mounted: function mounted() {
    this.setActive();
  },
  methods: {
    /**
     * This method will set the nav-link state to active if it matches
     * the url passed to the method. We are passing window.location.href
     * by default
     */
    setActive: function setActive() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
      // Regex to match URL
      var urlRegExp = new RegExp(url.replace(/\/$/, '') + "$"); // All the navigation links in the sidebar

      var navigationLinks = document.querySelectorAll('.sidebar .nav-link'); // Foreach navigation link, we check and test if the regex
      // matches the url, and if it does we can set the state
      // of the nav-link to active

      for (var _i = 0, _Object$entries = Object.entries(navigationLinks); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            k = _Object$entries$_i[0],
            v = _Object$entries$_i[1];

        if (urlRegExp.test(v.href.replace(/\/$/, ''))) {
          var activeLink = v;
          activeLink.classList.add('active');
        }
      } // When we're already setting a active state to a link,
      // we also check if the link is inside a .dropdown-nav
      // so we can add the .show class to that dropdown-nav


      this.has('.dropdown-nav', '.active').forEach(function (active) {
        active.closest('.dropdown-nav').classList.add('show');
      });
    },

    /**
     * Vanilla JS equivalent of jQuey .has()
     */
    has: function has(selector, sub) {
      var matches = Array.from(document.querySelectorAll(selector));
      return matches.filter(function (match) {
        return match.querySelector(sub) !== null;
      });
    },

    /**
     * Toggle dropdown menus when this is called
     */
    toggleDropdown: function toggleDropdown(event) {
      event.preventDefault();
      event.target.classList.contains('dropdown-toggle') && event.target.nextElementSibling.classList.toggle('show');
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "sidebar",
    attrs: {
      "id": "sidebar"
    }
  }, [_vm._ssrNode("<div class=\"nav-wrapper\" data-v-407cdf9e><ul class=\"nav flex-column\" data-v-407cdf9e>" + _vm._ssrList(_vm.nav, function (item) {
    return "<li class=\"nav-item\" data-v-407cdf9e>" + (item.dropdown ? "<a" + _vm._ssrAttr("href", item.url) + _vm._ssrClass(null, ['nav-link', 'dropdown-toggle']) + " data-v-407cdf9e>" + (item.icon ? "<i" + _vm._ssrClass(null, item.icon) + " data-v-407cdf9e></i>" : "<!---->") + _vm._ssrEscape(_vm._s(item.text) + "\n                    ") + "</a>" : "<a" + _vm._ssrAttr("href", item.url) + _vm._ssrClass(null, ['nav-link']) + " data-v-407cdf9e>" + (item.icon ? "<i" + _vm._ssrClass(null, item.icon) + " data-v-407cdf9e></i>" : "<!---->") + _vm._ssrEscape(_vm._s(item.text) + "\n                    ") + "</a>") + " " + (item.dropdown ? "<ul class=\"dropdown-nav list-unstyled\" data-v-407cdf9e>" + _vm._ssrList(item.dropdown, function (subItem) {
      return "<li class=\"nav-item\" data-v-407cdf9e><a" + _vm._ssrAttr("href", subItem.url) + " class=\"nav-link\" data-v-407cdf9e><i class=\"far fa-fw fa-circle\" data-v-407cdf9e></i>" + _vm._ssrEscape(_vm._s(subItem.text) + "\n                        ") + "</a></li>";
    }) + "</ul>" : "<!---->") + "</li>";
  }) + "</ul></div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-407cdf9e_0", {
    source: ".sidebar[data-v-407cdf9e]{background:#262a2f;width:250px;position:absolute;font-size:1rem;top:0;left:0;height:100%}.sidebar ul .nav-item .nav-link[data-v-407cdf9e]{display:block;color:#bdc3ca;text-decoration:none;padding:10px;text-shadow:0 2px rgba(0,0,0,.25);transition:color .2s ease-in-out}.sidebar ul .nav-item .nav-link.active[data-v-407cdf9e]{background:linear-gradient(160deg,#00c7db 0,#eaa2e5 120%);color:#fff}.sidebar ul .nav-item .nav-link[data-v-407cdf9e]:focus,.sidebar ul .nav-item .nav-link[data-v-407cdf9e]:hover{color:#fff}.sidebar ul .nav-item .nav-link.dropdown-toggle[data-v-407cdf9e]::after{display:none}.sidebar ul .nav-item .nav-link i[data-v-407cdf9e]{font-size:.9rem;margin-right:10px;position:relative;top:-1px}.sidebar ul .nav-item .dropdown-nav[data-v-407cdf9e]{max-height:0;overflow:hidden;background:#1b1d21;transition:max-height .2s ease-in-out}.sidebar ul .nav-item .dropdown-nav.show[data-v-407cdf9e]{max-height:100px}.sidebar ul .nav-item .dropdown-nav .nav-item .nav-link[data-v-407cdf9e]{font-size:.9rem;padding-left:25px}.sidebar ul .nav-item .dropdown-nav .nav-item .nav-link i[data-v-407cdf9e]{font-size:.6rem;top:-1px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-407cdf9e";
/* module identifier */

var __vue_module_identifier__ = "data-v-407cdf9e";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueLaravelSidebar(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueLaravelSidebar', __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;