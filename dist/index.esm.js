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
	name: 'SvgMap',
	props: {
		map: {
			type: Object,
			required: true,
			validator: function validator(map) {
				return typeof map.viewBox === 'string' &&
          Array.isArray(map.locations) &&
          map.locations.every(function (location) { return typeof location.path === 'string' && typeof location.id === 'string'; })
			},
		},
		locationClass: {
			type: [String, Function],
			default: null,
		},
		locationTabindex: {
			type: [String, Function],
			default: null,
		},
		locationRole: {
			type: String,
			default: null,
		},
		isLocationSelected: {
			type: Function,
			default: null,
		},
	},
	computed: {
		isLocationClassFunction: function isLocationClassFunction() {
			return typeof this.locationClass === 'function'
		},
		isLocationTabindexFunction: function isLocationTabindexFunction() {
			return typeof this.locationTabindex === 'function'
		},
	},
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "svg",
    {
      staticClass: "svg-map",
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: _vm.map.viewBox,
        "aria-label": _vm.map.label
      }
    },
    _vm._l(_vm.map.locations, function(location, index) {
      return _c(
        "path",
        _vm._g(
          {
            key: location.id,
            staticClass: "svg-map__location",
            class: _vm.isLocationClassFunction
              ? _vm.locationClass(location, index)
              : _vm.locationClass,
            attrs: {
              id: location.id,
              name: location.name,
              d: location.path,
              tabindex: _vm.isLocationTabindexFunction
                ? _vm.locationTabindex(location, index)
                : _vm.locationTabindex,
              role: _vm.locationRole,
              "aria-label": location.name,
              "aria-checked":
                _vm.isLocationSelected &&
                _vm.isLocationSelected(location, index)
            }
          },
          _vm.$listeners
        )
      )
    }),
    0
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SvgMap = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//

var script$1 = {
	name: 'CheckboxSvgMap',
	components: {
		SvgMap: SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		// Used for v-model
		value: {
			type: Array,
			default: function () { return []; },
		},
	},
	data: function data() {
		return {
			selectedLocations: this.value,
		}
	},
	watch: {
		value: function value() {
			this.selectedLocations = this.value;
		},
	},
	methods: {
		/**
	 	 * Indicate whether a location is selected
	 	 *
	 	 * @param {Object} location - Location DOM object
	 	 * @returns {boolean} True if the location is selected
		 */
		isLocationSelected: function isLocationSelected(location) {
			return this.selectedLocations.findIndex(function (selectedLocation) { return selectedLocation.id === location.id; }) > -1
		},

		/**
		 * Select/deselect a location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation: function toggleLocation(event) {
			var location = event.target;

			if (location.attributes['aria-checked'] && location.attributes['aria-checked'].value === 'true') {
				// Delete location
				this.selectedLocations.splice(this.selectedLocations.indexOf(location), 1);
			} else {
				// Add location
				// FIXME: Push only value/label/id?
				this.selectedLocations.push(location);
			}

			this.$emit('change', this.selectedLocations);
		},
	},
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "svg-map",
    _vm._g(
      _vm._b(
        {
          attrs: {
            role: "group",
            "location-role": "checkbox",
            "location-tabindex": "0",
            "is-location-selected": _vm.isLocationSelected
          },
          on: {
            click: _vm.toggleLocation,
            keydown: function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "space", 32, $event.key, [
                  " ",
                  "Spacebar"
                ])
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.toggleLocation($event)
            }
          }
        },
        "svg-map",
        _vm.$attrs,
        false
      ),
      _vm.$listeners
    )
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var CheckboxSvgMap = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

//

var script$2 = {
	name: 'RadioSvgMap',
	components: {
		SvgMap: SvgMap,
	},
	model: {
		event: 'change',
	},
	props: {
		value: {
			type: Object,
			default: null,
		},
	},
	data: function data() {
		return {
			selectedLocation: this.value,
		}
	},
	watch: {
		value: function value() {
			this.selectedLocation = this.value;
		},
	},
	mounted: function mounted() {
		this.locations = this.$refs.svg.$el.querySelectorAll('path');
	},
	methods: {
		/**
		 * Get tabindex value of a location
	   *
	   * @param {Object} location - Location object
	   * @param {number} index - Index of location
	   * @returns {string} Value of tabindex HTML attribute
	 	 */
		getLocationTabindex: function getLocationTabindex(location, index) {
			var tabindex = null;

			if (this.selectedLocation) {
				// Only selected location is focusable
				tabindex = this.isLocationSelected(location) ? '0' : '-1';
			} else {
				// Only first location is focusable
				tabindex = index === 0 ? '0' : '-1';
			}

			return tabindex
		},

		/**
	 	 * Indicate whether a location is selected
	 	 *
	 	 * @param {Object} location - Location object
	 	 * @returns {boolean} True if the location is selected
	 	 */
		isLocationSelected: function isLocationSelected(location) {
			return this.selectedLocation && this.selectedLocation.id === location.id
		},

		/**
	 	 * Select a location
	 	 *
	 	 * @param {Node} location - Location DOM node
	 	 */
		selectLocation: function selectLocation(location) {
			// Focus new selected location
			location.focus();

			// Change selected location
			this.selectedLocation = location;

			// Emit selected location
			this.$emit('change', this.selectedLocation);
		},

		/**
	 	 * Select focused location if not already selected
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		toggleLocation: function toggleLocation(event) {
			var focusedLocation = event.target;

			if (this.selectedLocation !== focusedLocation) {
				this.selectLocation(focusedLocation);
			}
		},

		/**
	 	 * Select next or first location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		selectNextLocation: function selectNextLocation(event) {
			var focusedLocation = event.target;

			this.selectLocation(focusedLocation.nextSibling || this.locations[0]);
		},

		/**
	 	 * Select previous or last location
	 	 *
	 	 * @param {Event} event - Triggered event
	 	 */
		selectPreviousLocation: function selectPreviousLocation(event) {
			var focusedLocation = event.target;

			this.selectLocation(focusedLocation.previousSibling || this.locations[this.locations.length - 1]);
		},
	},
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "svg-map",
    _vm._g(
      _vm._b(
        {
          ref: "svg",
          attrs: {
            role: "radiogroup",
            "location-role": "radio",
            "location-tabindex": _vm.getLocationTabindex,
            "is-location-selected": _vm.isLocationSelected
          },
          on: {
            click: function($event) {
              return _vm.selectLocation($event.target)
            },
            keydown: [
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "space", 32, $event.key, [
                    " ",
                    "Spacebar"
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                return _vm.toggleLocation($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "down", 40, $event.key, [
                    "Down",
                    "ArrowDown"
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                return _vm.selectNextLocation($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "right", 39, $event.key, [
                    "Right",
                    "ArrowRight"
                  ])
                ) {
                  return null
                }
                if ("button" in $event && $event.button !== 2) {
                  return null
                }
                $event.preventDefault();
                return _vm.selectNextLocation($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "up", 38, $event.key, [
                    "Up",
                    "ArrowUp"
                  ])
                ) {
                  return null
                }
                $event.preventDefault();
                return _vm.selectPreviousLocation($event)
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "left", 37, $event.key, [
                    "Left",
                    "ArrowLeft"
                  ])
                ) {
                  return null
                }
                if ("button" in $event && $event.button !== 0) {
                  return null
                }
                $event.preventDefault();
                return _vm.selectPreviousLocation($event)
              }
            ]
          }
        },
        "svg-map",
        _vm.$attrs,
        false
      ),
      _vm.$listeners
    )
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var RadioSvgMap = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

// Based on: https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#What-does-my-packaged-component-look-like

// Declare install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return }
	install.installed = true;
	Vue.component('SvgMap', SvgMap);
	Vue.component('CheckboxSvgMap', CheckboxSvgMap);
	Vue.component('RadioSvgMap', RadioSvgMap);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export components
var wrapper = {
	SvgMap: SvgMap,
	CheckboxSvgMap: CheckboxSvgMap,
	RadioSvgMap: RadioSvgMap,
};

export default wrapper;
export { install };