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
//
var script = {
  name: 'vue-laravel-sidebar',
  props: {
    navData: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      nav: this.navData
    };
  },

  mounted() {
    this.setActive();
  },

  methods: {
    /**
     * This method will set the nav-link state to active if it matches
     * the url passed to the method. We are passing window.location.href
     * by default
     */
    setActive(url = window.location.href) {
      // Regex to match URL
      var urlRegExp = new RegExp(url.replace(/\/$/, '') + "$"); // All the navigation links in the sidebar

      var navigationLinks = document.querySelectorAll('.sidebar .nav-link'); // Foreach navigation link, we check and test if the regex
      // matches the url, and if it does we can set the state
      // of the nav-link to active

      for (const [k, v] of Object.entries(navigationLinks)) {
        if (urlRegExp.test(v.href.replace(/\/$/, ''))) {
          var activeLink = v;
          activeLink.classList.add('active');
        }
      } // When we're already setting a active state to a link,
      // we also check if the link is inside a .dropdown-nav
      // so we can add the .show class to that dropdown-nav


      this.has('.dropdown-nav', '.active').forEach(active => {
        active.closest('.dropdown-nav').classList.add('show');
      });
    },

    /**
     * Vanilla JS equivalent of jQuey .has()
     */
    has(selector, sub) {
      const matches = Array.from(document.querySelectorAll(selector));
      return matches.filter(match => match.querySelector(sub) !== null);
    },

    /**
     * Toggle dropdown menus when this is called
     */
    toggleDropdown(event) {
      event.preventDefault();
      event.target.classList.contains('dropdown-toggle') && event.target.nextElementSibling.classList.toggle('show');
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "sidebar",
    attrs: {
      "id": "sidebar"
    }
  }, [_c('div', {
    staticClass: "nav-wrapper"
  }, [_c('ul', {
    staticClass: "nav flex-column"
  }, _vm._l(_vm.nav, function (item) {
    return _c('li', {
      staticClass: "nav-item"
    }, [item.dropdown ? [_c('a', {
      class: ['nav-link', 'dropdown-toggle'],
      attrs: {
        "href": item.url
      },
      on: {
        "click": function ($event) {
          return _vm.toggleDropdown($event);
        }
      }
    }, [item.icon ? _c('i', {
      class: item.icon
    }) : _vm._e(), _vm._v(_vm._s(item.text) + "\n                    ")])] : [_c('a', {
      class: ['nav-link'],
      attrs: {
        "href": item.url
      }
    }, [item.icon ? _c('i', {
      class: item.icon
    }) : _vm._e(), _vm._v(_vm._s(item.text) + "\n                    ")])], _vm._v(" "), item.dropdown ? _c('ul', {
      staticClass: "dropdown-nav list-unstyled"
    }, _vm._l(item.dropdown, function (subItem) {
      return _c('li', {
        staticClass: "nav-item"
      }, [_c('a', {
        staticClass: "nav-link",
        attrs: {
          "href": subItem.url
        }
      }, [_c('i', {
        staticClass: "far fa-fw fa-circle"
      }), _vm._v(_vm._s(subItem.text) + "\n                        ")])]);
    }), 0) : _vm._e()], 2);
  }), 0)])]);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-407cdf9e_0", {
    source: ".sidebar[data-v-407cdf9e]{background:#262a2f;width:250px;position:absolute;font-size:1rem;top:0;left:0;height:100%}.sidebar ul .nav-item .nav-link[data-v-407cdf9e]{display:block;color:#bdc3ca;text-decoration:none;padding:10px;text-shadow:0 2px rgba(0,0,0,.25);transition:color .2s ease-in-out}.sidebar ul .nav-item .nav-link.active[data-v-407cdf9e]{background:linear-gradient(160deg,#00c7db 0,#eaa2e5 120%);color:#fff}.sidebar ul .nav-item .nav-link[data-v-407cdf9e]:focus,.sidebar ul .nav-item .nav-link[data-v-407cdf9e]:hover{color:#fff}.sidebar ul .nav-item .nav-link.dropdown-toggle[data-v-407cdf9e]::after{display:none}.sidebar ul .nav-item .nav-link i[data-v-407cdf9e]{font-size:.9rem;margin-right:10px;position:relative;top:-1px}.sidebar ul .nav-item .dropdown-nav[data-v-407cdf9e]{max-height:0;overflow:hidden;background:#1b1d21;transition:max-height .2s ease-in-out}.sidebar ul .nav-item .dropdown-nav.show[data-v-407cdf9e]{max-height:100px}.sidebar ul .nav-item .dropdown-nav .nav-item .nav-link[data-v-407cdf9e]{font-size:.9rem;padding-left:25px}.sidebar ul .nav-item .dropdown-nav .nav-item .nav-link i[data-v-407cdf9e]{font-size:.6rem;top:-1px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-407cdf9e";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

// Import vue component

const install = function installVueLaravelSidebar(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueLaravelSidebar', __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
