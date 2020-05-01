var notOverlay = (function (exports) {
  'use strict';

  var cov_q3mdgjgq9=function(){var path="/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.scss",hash="aa9d1db3e479f9d63509f49ede9b5b0ae579d03a",Function=function(){}.constructor,global=new Function('return this')(),gcv="__coverage__",coverageData={path:"/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.scss",statementMap:{},fnMap:{},branchMap:{},s:{},f:{},b:{},_coverageSchema:"332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();

  function noop() { }
  const identity = x => x;
  function assign(tar, src) {
      // @ts-ignore
      for (const k in src)
          tar[k] = src[k];
      return tar;
  }
  function run(fn) {
      return fn();
  }
  function blank_object() {
      return Object.create(null);
  }
  function run_all(fns) {
      fns.forEach(run);
  }
  function is_function(thing) {
      return typeof thing === 'function';
  }
  function safe_not_equal(a, b) {
      return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
  }
  function create_slot(definition, ctx, $$scope, fn) {
      if (definition) {
          const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
          return definition[0](slot_ctx);
      }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
      return definition[1] && fn
          ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
          : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
      if (definition[2] && fn) {
          const lets = definition[2](fn(dirty));
          if ($$scope.dirty === undefined) {
              return lets;
          }
          if (typeof lets === 'object') {
              const merged = [];
              const len = Math.max($$scope.dirty.length, lets.length);
              for (let i = 0; i < len; i += 1) {
                  merged[i] = $$scope.dirty[i] | lets[i];
              }
              return merged;
          }
          return $$scope.dirty | lets;
      }
      return $$scope.dirty;
  }
  function exclude_internal_props(props) {
      const result = {};
      for (const k in props)
          if (k[0] !== '$')
              result[k] = props[k];
      return result;
  }
  function action_destroyer(action_result) {
      return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
  }

  const is_client = typeof window !== 'undefined';
  let now = is_client
      ? () => window.performance.now()
      : () => Date.now();
  let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

  const tasks = new Set();
  function run_tasks(now) {
      tasks.forEach(task => {
          if (!task.c(now)) {
              tasks.delete(task);
              task.f();
          }
      });
      if (tasks.size !== 0)
          raf(run_tasks);
  }
  /**
   * Creates a new task that runs on each raf frame
   * until it returns a falsy value or is aborted
   */
  function loop(callback) {
      let task;
      if (tasks.size === 0)
          raf(run_tasks);
      return {
          promise: new Promise(fulfill => {
              tasks.add(task = { c: callback, f: fulfill });
          }),
          abort() {
              tasks.delete(task);
          }
      };
  }

  function append(target, node) {
      target.appendChild(node);
  }
  function insert(target, node, anchor) {
      target.insertBefore(node, anchor || null);
  }
  function detach(node) {
      node.parentNode.removeChild(node);
  }
  function element(name) {
      return document.createElement(name);
  }
  function text(data) {
      return document.createTextNode(data);
  }
  function space() {
      return text(' ');
  }
  function empty() {
      return text('');
  }
  function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
      if (value == null)
          node.removeAttribute(attribute);
      else if (node.getAttribute(attribute) !== value)
          node.setAttribute(attribute, value);
  }
  function set_attributes(node, attributes) {
      // @ts-ignore
      const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
      for (const key in attributes) {
          if (attributes[key] == null) {
              node.removeAttribute(key);
          }
          else if (key === 'style') {
              node.style.cssText = attributes[key];
          }
          else if (key === '__value' || descriptors[key] && descriptors[key].set) {
              node[key] = attributes[key];
          }
          else {
              attr(node, key, attributes[key]);
          }
      }
  }
  function children(element) {
      return Array.from(element.childNodes);
  }
  function custom_event(type, detail) {
      const e = document.createEvent('CustomEvent');
      e.initCustomEvent(type, false, false, detail);
      return e;
  }

  const active_docs = new Set();
  let active = 0;
  // https://github.com/darkskyapp/string-hash/blob/master/index.js
  function hash(str) {
      let hash = 5381;
      let i = str.length;
      while (i--)
          hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
      return hash >>> 0;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
      const step = 16.666 / duration;
      let keyframes = '{\n';
      for (let p = 0; p <= 1; p += step) {
          const t = a + (b - a) * ease(p);
          keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
      }
      const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
      const name = `__svelte_${hash(rule)}_${uid}`;
      const doc = node.ownerDocument;
      active_docs.add(doc);
      const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
      const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
      if (!current_rules[name]) {
          current_rules[name] = true;
          stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
      }
      const animation = node.style.animation || '';
      node.style.animation = `${animation ? `${animation}, ` : ``}${name} ${duration}ms linear ${delay}ms 1 both`;
      active += 1;
      return name;
  }
  function delete_rule(node, name) {
      const previous = (node.style.animation || '').split(', ');
      const next = previous.filter(name
          ? anim => anim.indexOf(name) < 0 // remove specific animation
          : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
      );
      const deleted = previous.length - next.length;
      if (deleted) {
          node.style.animation = next.join(', ');
          active -= deleted;
          if (!active)
              clear_rules();
      }
  }
  function clear_rules() {
      raf(() => {
          if (active)
              return;
          active_docs.forEach(doc => {
              const stylesheet = doc.__svelte_stylesheet;
              let i = stylesheet.cssRules.length;
              while (i--)
                  stylesheet.deleteRule(i);
              doc.__svelte_rules = {};
          });
          active_docs.clear();
      });
  }

  let current_component;
  function set_current_component(component) {
      current_component = component;
  }
  function get_current_component() {
      if (!current_component)
          throw new Error(`Function called outside component initialization`);
      return current_component;
  }
  function onMount(fn) {
      get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
      get_current_component().$$.on_destroy.push(fn);
  }
  function createEventDispatcher() {
      const component = get_current_component();
      return (type, detail) => {
          const callbacks = component.$$.callbacks[type];
          if (callbacks) {
              // TODO are there situations where events could be dispatched
              // in a server (non-DOM) environment?
              const event = custom_event(type, detail);
              callbacks.slice().forEach(fn => {
                  fn.call(component, event);
              });
          }
      };
  }
  function setContext(key, context) {
      get_current_component().$$.context.set(key, context);
  }
  function getContext(key) {
      return get_current_component().$$.context.get(key);
  }
  // TODO figure out if we still want to support
  // shorthand events, or if we want to implement
  // a real bubbling mechanism
  function bubble(component, event) {
      const callbacks = component.$$.callbacks[event.type];
      if (callbacks) {
          callbacks.slice().forEach(fn => fn(event));
      }
  }

  const dirty_components = [];
  const binding_callbacks = [];
  const render_callbacks = [];
  const flush_callbacks = [];
  const resolved_promise = Promise.resolve();
  let update_scheduled = false;
  function schedule_update() {
      if (!update_scheduled) {
          update_scheduled = true;
          resolved_promise.then(flush);
      }
  }
  function add_render_callback(fn) {
      render_callbacks.push(fn);
  }
  let flushing = false;
  const seen_callbacks = new Set();
  function flush() {
      if (flushing)
          return;
      flushing = true;
      do {
          // first, call beforeUpdate functions
          // and update components
          for (let i = 0; i < dirty_components.length; i += 1) {
              const component = dirty_components[i];
              set_current_component(component);
              update(component.$$);
          }
          dirty_components.length = 0;
          while (binding_callbacks.length)
              binding_callbacks.pop()();
          // then, once components are updated, call
          // afterUpdate functions. This may cause
          // subsequent updates...
          for (let i = 0; i < render_callbacks.length; i += 1) {
              const callback = render_callbacks[i];
              if (!seen_callbacks.has(callback)) {
                  // ...so guard against infinite loops
                  seen_callbacks.add(callback);
                  callback();
              }
          }
          render_callbacks.length = 0;
      } while (dirty_components.length);
      while (flush_callbacks.length) {
          flush_callbacks.pop()();
      }
      update_scheduled = false;
      flushing = false;
      seen_callbacks.clear();
  }
  function update($$) {
      if ($$.fragment !== null) {
          $$.update();
          run_all($$.before_update);
          const dirty = $$.dirty;
          $$.dirty = [-1];
          $$.fragment && $$.fragment.p($$.ctx, dirty);
          $$.after_update.forEach(add_render_callback);
      }
  }

  let promise;
  function wait() {
      if (!promise) {
          promise = Promise.resolve();
          promise.then(() => {
              promise = null;
          });
      }
      return promise;
  }
  function dispatch(node, direction, kind) {
      node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
  }
  const outroing = new Set();
  let outros;
  function group_outros() {
      outros = {
          r: 0,
          c: [],
          p: outros // parent group
      };
  }
  function check_outros() {
      if (!outros.r) {
          run_all(outros.c);
      }
      outros = outros.p;
  }
  function transition_in(block, local) {
      if (block && block.i) {
          outroing.delete(block);
          block.i(local);
      }
  }
  function transition_out(block, local, detach, callback) {
      if (block && block.o) {
          if (outroing.has(block))
              return;
          outroing.add(block);
          outros.c.push(() => {
              outroing.delete(block);
              if (callback) {
                  if (detach)
                      block.d(1);
                  callback();
              }
          });
          block.o(local);
      }
  }
  const null_transition = { duration: 0 };
  function create_bidirectional_transition(node, fn, params, intro) {
      let config = fn(node, params);
      let t = intro ? 0 : 1;
      let running_program = null;
      let pending_program = null;
      let animation_name = null;
      function clear_animation() {
          if (animation_name)
              delete_rule(node, animation_name);
      }
      function init(program, duration) {
          const d = program.b - t;
          duration *= Math.abs(d);
          return {
              a: t,
              b: program.b,
              d,
              duration,
              start: program.start,
              end: program.start + duration,
              group: program.group
          };
      }
      function go(b) {
          const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
          const program = {
              start: now() + delay,
              b
          };
          if (!b) {
              // @ts-ignore todo: improve typings
              program.group = outros;
              outros.r += 1;
          }
          if (running_program) {
              pending_program = program;
          }
          else {
              // if this is an intro, and there's a delay, we need to do
              // an initial tick and/or apply CSS animation immediately
              if (css) {
                  clear_animation();
                  animation_name = create_rule(node, t, b, duration, delay, easing, css);
              }
              if (b)
                  tick(0, 1);
              running_program = init(program, duration);
              add_render_callback(() => dispatch(node, b, 'start'));
              loop(now => {
                  if (pending_program && now > pending_program.start) {
                      running_program = init(pending_program, duration);
                      pending_program = null;
                      dispatch(node, running_program.b, 'start');
                      if (css) {
                          clear_animation();
                          animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                      }
                  }
                  if (running_program) {
                      if (now >= running_program.end) {
                          tick(t = running_program.b, 1 - t);
                          dispatch(node, running_program.b, 'end');
                          if (!pending_program) {
                              // we're done
                              if (running_program.b) {
                                  // intro — we can tidy up immediately
                                  clear_animation();
                              }
                              else {
                                  // outro — needs to be coordinated
                                  if (!--running_program.group.r)
                                      run_all(running_program.group.c);
                              }
                          }
                          running_program = null;
                      }
                      else if (now >= running_program.start) {
                          const p = now - running_program.start;
                          t = running_program.a + running_program.d * easing(p / running_program.duration);
                          tick(t, 1 - t);
                      }
                  }
                  return !!(running_program || pending_program);
              });
          }
      }
      return {
          run(b) {
              if (is_function(config)) {
                  wait().then(() => {
                      // @ts-ignore
                      config = config();
                      go(b);
                  });
              }
              else {
                  go(b);
              }
          },
          end() {
              clear_animation();
              running_program = pending_program = null;
          }
      };
  }

  function get_spread_update(levels, updates) {
      const update = {};
      const to_null_out = {};
      const accounted_for = { $$scope: 1 };
      let i = levels.length;
      while (i--) {
          const o = levels[i];
          const n = updates[i];
          if (n) {
              for (const key in o) {
                  if (!(key in n))
                      to_null_out[key] = 1;
              }
              for (const key in n) {
                  if (!accounted_for[key]) {
                      update[key] = n[key];
                      accounted_for[key] = 1;
                  }
              }
              levels[i] = n;
          }
          else {
              for (const key in o) {
                  accounted_for[key] = 1;
              }
          }
      }
      for (const key in to_null_out) {
          if (!(key in update))
              update[key] = undefined;
      }
      return update;
  }
  function create_component(block) {
      block && block.c();
  }
  function mount_component(component, target, anchor) {
      const { fragment, on_mount, on_destroy, after_update } = component.$$;
      fragment && fragment.m(target, anchor);
      // onMount happens before the initial afterUpdate
      add_render_callback(() => {
          const new_on_destroy = on_mount.map(run).filter(is_function);
          if (on_destroy) {
              on_destroy.push(...new_on_destroy);
          }
          else {
              // Edge case - component was destroyed immediately,
              // most likely as a result of a binding initialising
              run_all(new_on_destroy);
          }
          component.$$.on_mount = [];
      });
      after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
      const $$ = component.$$;
      if ($$.fragment !== null) {
          run_all($$.on_destroy);
          $$.fragment && $$.fragment.d(detaching);
          // TODO null out other refs, including component.$$ (but need to
          // preserve final state?)
          $$.on_destroy = $$.fragment = null;
          $$.ctx = [];
      }
  }
  function make_dirty(component, i) {
      if (component.$$.dirty[0] === -1) {
          dirty_components.push(component);
          schedule_update();
          component.$$.dirty.fill(0);
      }
      component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
  }
  function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
      const parent_component = current_component;
      set_current_component(component);
      const prop_values = options.props || {};
      const $$ = component.$$ = {
          fragment: null,
          ctx: null,
          // state
          props,
          update: noop,
          not_equal,
          bound: blank_object(),
          // lifecycle
          on_mount: [],
          on_destroy: [],
          before_update: [],
          after_update: [],
          context: new Map(parent_component ? parent_component.$$.context : []),
          // everything else
          callbacks: blank_object(),
          dirty
      };
      let ready = false;
      $$.ctx = instance
          ? instance(component, prop_values, (i, ret, ...rest) => {
              const value = rest.length ? rest[0] : ret;
              if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                  if ($$.bound[i])
                      $$.bound[i](value);
                  if (ready)
                      make_dirty(component, i);
              }
              return ret;
          })
          : [];
      $$.update();
      ready = true;
      run_all($$.before_update);
      // `false` as a special case of no DOM component
      $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
      if (options.target) {
          if (options.hydrate) {
              const nodes = children(options.target);
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.l(nodes);
              nodes.forEach(detach);
          }
          else {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              $$.fragment && $$.fragment.c();
          }
          if (options.intro)
              transition_in(component.$$.fragment);
          mount_component(component, options.target, options.anchor);
          flush();
      }
      set_current_component(parent_component);
  }
  class SvelteComponent {
      $destroy() {
          destroy_component(this, 1);
          this.$destroy = noop;
      }
      $on(type, callback) {
          const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
          callbacks.push(callback);
          return () => {
              const index = callbacks.indexOf(callback);
              if (index !== -1)
                  callbacks.splice(index, 1);
          };
      }
      $set() {
          // overridden by instance, if it has props
      }
  }

  function fade(node, { delay = 0, duration = 400, easing = identity }) {
      const o = +getComputedStyle(node).opacity;
      return {
          delay,
          duration,
          easing,
          css: t => `opacity: ${t * o}`
      };
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __read(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  }

  function __spread() {
      for (var ar = [], i = 0; i < arguments.length; i++)
          ar = ar.concat(__read(arguments[i]));
      return ar;
  }

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var MDCFoundation = /** @class */ (function () {
      function MDCFoundation(adapter) {
          if (adapter === void 0) { adapter = {}; }
          this.adapter_ = adapter;
      }
      Object.defineProperty(MDCFoundation, "cssClasses", {
          get: function () {
              // Classes extending MDCFoundation should implement this method to return an object which exports every
              // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
              return {};
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCFoundation, "strings", {
          get: function () {
              // Classes extending MDCFoundation should implement this method to return an object which exports all
              // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
              return {};
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCFoundation, "numbers", {
          get: function () {
              // Classes extending MDCFoundation should implement this method to return an object which exports all
              // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
              return {};
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCFoundation, "defaultAdapter", {
          get: function () {
              // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
              // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
              // validation.
              return {};
          },
          enumerable: true,
          configurable: true
      });
      MDCFoundation.prototype.init = function () {
          // Subclasses should override this method to perform initialization routines (registering events, etc.)
      };
      MDCFoundation.prototype.destroy = function () {
          // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
      };
      return MDCFoundation;
  }());

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var MDCComponent = /** @class */ (function () {
      function MDCComponent(root, foundation) {
          var args = [];
          for (var _i = 2; _i < arguments.length; _i++) {
              args[_i - 2] = arguments[_i];
          }
          this.root_ = root;
          this.initialize.apply(this, __spread(args));
          // Note that we initialize foundation here and not within the constructor's default param so that
          // this.root_ is defined and can be used within the foundation class.
          this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
          this.foundation_.init();
          this.initialSyncWithDOM();
      }
      MDCComponent.attachTo = function (root) {
          // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
          // returns an instantiated component with its root set to that element. Also note that in the cases of
          // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
          // from getDefaultFoundation().
          return new MDCComponent(root, new MDCFoundation({}));
      };
      /* istanbul ignore next: method param only exists for typing purposes; it does not need to be unit tested */
      MDCComponent.prototype.initialize = function () {
          var _args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              _args[_i] = arguments[_i];
          }
          // Subclasses can override this to do any additional setup work that would be considered part of a
          // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
          // initialized. Any additional arguments besides root and foundation will be passed in here.
      };
      MDCComponent.prototype.getDefaultFoundation = function () {
          // Subclasses must override this method to return a properly configured foundation class for the
          // component.
          throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' +
              'foundation class');
      };
      MDCComponent.prototype.initialSyncWithDOM = function () {
          // Subclasses should override this method if they need to perform work to synchronize with a host DOM
          // object. An example of this would be a form control wrapper that needs to synchronize its internal state
          // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
          // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
      };
      MDCComponent.prototype.destroy = function () {
          // Subclasses may implement this method to release any resources / deregister any listeners they have
          // attached. An example of this might be deregistering a resize event from the window object.
          this.foundation_.destroy();
      };
      MDCComponent.prototype.listen = function (evtType, handler, options) {
          this.root_.addEventListener(evtType, handler, options);
      };
      MDCComponent.prototype.unlisten = function (evtType, handler, options) {
          this.root_.removeEventListener(evtType, handler, options);
      };
      /**
       * Fires a cross-browser-compatible custom event from the component root of the given type, with the given data.
       */
      MDCComponent.prototype.emit = function (evtType, evtData, shouldBubble) {
          if (shouldBubble === void 0) { shouldBubble = false; }
          var evt;
          if (typeof CustomEvent === 'function') {
              evt = new CustomEvent(evtType, {
                  bubbles: shouldBubble,
                  detail: evtData,
              });
          }
          else {
              evt = document.createEvent('CustomEvent');
              evt.initCustomEvent(evtType, shouldBubble, false, evtData);
          }
          this.root_.dispatchEvent(evt);
      };
      return MDCComponent;
  }());

  /**
   * @license
   * Copyright 2019 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  /**
   * Stores result from applyPassive to avoid redundant processing to detect
   * passive event listener support.
   */
  var supportsPassive_;
  /**
   * Determine whether the current browser supports passive event listeners, and
   * if so, use them.
   */
  function applyPassive(globalObj, forceRefresh) {
      if (globalObj === void 0) { globalObj = window; }
      if (forceRefresh === void 0) { forceRefresh = false; }
      if (supportsPassive_ === undefined || forceRefresh) {
          var isSupported_1 = false;
          try {
              globalObj.document.addEventListener('test', function () { return undefined; }, {
                  get passive() {
                      isSupported_1 = true;
                      return isSupported_1;
                  },
              });
          }
          catch (e) {
          } // tslint:disable-line:no-empty cannot throw error due to tests. tslint also disables console.log.
          supportsPassive_ = isSupported_1;
      }
      return supportsPassive_ ? { passive: true } : false;
  }

  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  function matches(element, selector) {
      var nativeMatches = element.matches
          || element.webkitMatchesSelector
          || element.msMatchesSelector;
      return nativeMatches.call(element, selector);
  }

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var cssClasses = {
      // Ripple is a special case where the "root" component is really a "mixin" of sorts,
      // given that it's an 'upgrade' to an existing component. That being said it is the root
      // CSS class that all other CSS classes derive from.
      BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
      FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
      FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation',
      ROOT: 'mdc-ripple-upgraded',
      UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  };
  var strings = {
      VAR_FG_SCALE: '--mdc-ripple-fg-scale',
      VAR_FG_SIZE: '--mdc-ripple-fg-size',
      VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end',
      VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
      VAR_LEFT: '--mdc-ripple-left',
      VAR_TOP: '--mdc-ripple-top',
  };
  var numbers = {
      DEACTIVATION_TIMEOUT_MS: 225,
      FG_DEACTIVATION_MS: 150,
      INITIAL_ORIGIN_SCALE: 0.6,
      PADDING: 10,
      TAP_DELAY_MS: 300,
  };

  /**
   * Stores result from supportsCssVariables to avoid redundant processing to
   * detect CSS custom variable support.
   */
  var supportsCssVariables_;
  function detectEdgePseudoVarBug(windowObj) {
      // Detect versions of Edge with buggy var() support
      // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11495448/
      var document = windowObj.document;
      var node = document.createElement('div');
      node.className = 'mdc-ripple-surface--test-edge-var-bug';
      // Append to head instead of body because this script might be invoked in the
      // head, in which case the body doesn't exist yet. The probe works either way.
      document.head.appendChild(node);
      // The bug exists if ::before style ends up propagating to the parent element.
      // Additionally, getComputedStyle returns null in iframes with display: "none" in Firefox,
      // but Firefox is known to support CSS custom properties correctly.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=548397
      var computedStyle = windowObj.getComputedStyle(node);
      var hasPseudoVarBug = computedStyle !== null && computedStyle.borderTopStyle === 'solid';
      if (node.parentNode) {
          node.parentNode.removeChild(node);
      }
      return hasPseudoVarBug;
  }
  function supportsCssVariables(windowObj, forceRefresh) {
      if (forceRefresh === void 0) { forceRefresh = false; }
      var CSS = windowObj.CSS;
      var supportsCssVars = supportsCssVariables_;
      if (typeof supportsCssVariables_ === 'boolean' && !forceRefresh) {
          return supportsCssVariables_;
      }
      var supportsFunctionPresent = CSS && typeof CSS.supports === 'function';
      if (!supportsFunctionPresent) {
          return false;
      }
      var explicitlySupportsCssVars = CSS.supports('--css-vars', 'yes');
      // See: https://bugs.webkit.org/show_bug.cgi?id=154669
      // See: README section on Safari
      var weAreFeatureDetectingSafari10plus = (CSS.supports('(--css-vars: yes)') &&
          CSS.supports('color', '#00000000'));
      if (explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus) {
          supportsCssVars = !detectEdgePseudoVarBug(windowObj);
      }
      else {
          supportsCssVars = false;
      }
      if (!forceRefresh) {
          supportsCssVariables_ = supportsCssVars;
      }
      return supportsCssVars;
  }
  function getNormalizedEventCoords(evt, pageOffset, clientRect) {
      if (!evt) {
          return { x: 0, y: 0 };
      }
      var x = pageOffset.x, y = pageOffset.y;
      var documentX = x + clientRect.left;
      var documentY = y + clientRect.top;
      var normalizedX;
      var normalizedY;
      // Determine touch point relative to the ripple container.
      if (evt.type === 'touchstart') {
          var touchEvent = evt;
          normalizedX = touchEvent.changedTouches[0].pageX - documentX;
          normalizedY = touchEvent.changedTouches[0].pageY - documentY;
      }
      else {
          var mouseEvent = evt;
          normalizedX = mouseEvent.pageX - documentX;
          normalizedY = mouseEvent.pageY - documentY;
      }
      return { x: normalizedX, y: normalizedY };
  }

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  // Activation events registered on the root element of each instance for activation
  var ACTIVATION_EVENT_TYPES = [
      'touchstart', 'pointerdown', 'mousedown', 'keydown',
  ];
  // Deactivation events registered on documentElement when a pointer-related down event occurs
  var POINTER_DEACTIVATION_EVENT_TYPES = [
      'touchend', 'pointerup', 'mouseup', 'contextmenu',
  ];
  // simultaneous nested activations
  var activatedTargets = [];
  var MDCRippleFoundation = /** @class */ (function (_super) {
      __extends(MDCRippleFoundation, _super);
      function MDCRippleFoundation(adapter) {
          var _this = _super.call(this, __assign({}, MDCRippleFoundation.defaultAdapter, adapter)) || this;
          _this.activationAnimationHasEnded_ = false;
          _this.activationTimer_ = 0;
          _this.fgDeactivationRemovalTimer_ = 0;
          _this.fgScale_ = '0';
          _this.frame_ = { width: 0, height: 0 };
          _this.initialSize_ = 0;
          _this.layoutFrame_ = 0;
          _this.maxRadius_ = 0;
          _this.unboundedCoords_ = { left: 0, top: 0 };
          _this.activationState_ = _this.defaultActivationState_();
          _this.activationTimerCallback_ = function () {
              _this.activationAnimationHasEnded_ = true;
              _this.runDeactivationUXLogicIfReady_();
          };
          _this.activateHandler_ = function (e) { return _this.activate_(e); };
          _this.deactivateHandler_ = function () { return _this.deactivate_(); };
          _this.focusHandler_ = function () { return _this.handleFocus(); };
          _this.blurHandler_ = function () { return _this.handleBlur(); };
          _this.resizeHandler_ = function () { return _this.layout(); };
          return _this;
      }
      Object.defineProperty(MDCRippleFoundation, "cssClasses", {
          get: function () {
              return cssClasses;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCRippleFoundation, "strings", {
          get: function () {
              return strings;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCRippleFoundation, "numbers", {
          get: function () {
              return numbers;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCRippleFoundation, "defaultAdapter", {
          get: function () {
              return {
                  addClass: function () { return undefined; },
                  browserSupportsCssVars: function () { return true; },
                  computeBoundingRect: function () { return ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }); },
                  containsEventTarget: function () { return true; },
                  deregisterDocumentInteractionHandler: function () { return undefined; },
                  deregisterInteractionHandler: function () { return undefined; },
                  deregisterResizeHandler: function () { return undefined; },
                  getWindowPageOffset: function () { return ({ x: 0, y: 0 }); },
                  isSurfaceActive: function () { return true; },
                  isSurfaceDisabled: function () { return true; },
                  isUnbounded: function () { return true; },
                  registerDocumentInteractionHandler: function () { return undefined; },
                  registerInteractionHandler: function () { return undefined; },
                  registerResizeHandler: function () { return undefined; },
                  removeClass: function () { return undefined; },
                  updateCssVariable: function () { return undefined; },
              };
          },
          enumerable: true,
          configurable: true
      });
      MDCRippleFoundation.prototype.init = function () {
          var _this = this;
          var supportsPressRipple = this.supportsPressRipple_();
          this.registerRootHandlers_(supportsPressRipple);
          if (supportsPressRipple) {
              var _a = MDCRippleFoundation.cssClasses, ROOT_1 = _a.ROOT, UNBOUNDED_1 = _a.UNBOUNDED;
              requestAnimationFrame(function () {
                  _this.adapter_.addClass(ROOT_1);
                  if (_this.adapter_.isUnbounded()) {
                      _this.adapter_.addClass(UNBOUNDED_1);
                      // Unbounded ripples need layout logic applied immediately to set coordinates for both shade and ripple
                      _this.layoutInternal_();
                  }
              });
          }
      };
      MDCRippleFoundation.prototype.destroy = function () {
          var _this = this;
          if (this.supportsPressRipple_()) {
              if (this.activationTimer_) {
                  clearTimeout(this.activationTimer_);
                  this.activationTimer_ = 0;
                  this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_ACTIVATION);
              }
              if (this.fgDeactivationRemovalTimer_) {
                  clearTimeout(this.fgDeactivationRemovalTimer_);
                  this.fgDeactivationRemovalTimer_ = 0;
                  this.adapter_.removeClass(MDCRippleFoundation.cssClasses.FG_DEACTIVATION);
              }
              var _a = MDCRippleFoundation.cssClasses, ROOT_2 = _a.ROOT, UNBOUNDED_2 = _a.UNBOUNDED;
              requestAnimationFrame(function () {
                  _this.adapter_.removeClass(ROOT_2);
                  _this.adapter_.removeClass(UNBOUNDED_2);
                  _this.removeCssVars_();
              });
          }
          this.deregisterRootHandlers_();
          this.deregisterDeactivationHandlers_();
      };
      /**
       * @param evt Optional event containing position information.
       */
      MDCRippleFoundation.prototype.activate = function (evt) {
          this.activate_(evt);
      };
      MDCRippleFoundation.prototype.deactivate = function () {
          this.deactivate_();
      };
      MDCRippleFoundation.prototype.layout = function () {
          var _this = this;
          if (this.layoutFrame_) {
              cancelAnimationFrame(this.layoutFrame_);
          }
          this.layoutFrame_ = requestAnimationFrame(function () {
              _this.layoutInternal_();
              _this.layoutFrame_ = 0;
          });
      };
      MDCRippleFoundation.prototype.setUnbounded = function (unbounded) {
          var UNBOUNDED = MDCRippleFoundation.cssClasses.UNBOUNDED;
          if (unbounded) {
              this.adapter_.addClass(UNBOUNDED);
          }
          else {
              this.adapter_.removeClass(UNBOUNDED);
          }
      };
      MDCRippleFoundation.prototype.handleFocus = function () {
          var _this = this;
          requestAnimationFrame(function () {
              return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
          });
      };
      MDCRippleFoundation.prototype.handleBlur = function () {
          var _this = this;
          requestAnimationFrame(function () {
              return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
          });
      };
      /**
       * We compute this property so that we are not querying information about the client
       * until the point in time where the foundation requests it. This prevents scenarios where
       * client-side feature-detection may happen too early, such as when components are rendered on the server
       * and then initialized at mount time on the client.
       */
      MDCRippleFoundation.prototype.supportsPressRipple_ = function () {
          return this.adapter_.browserSupportsCssVars();
      };
      MDCRippleFoundation.prototype.defaultActivationState_ = function () {
          return {
              activationEvent: undefined,
              hasDeactivationUXRun: false,
              isActivated: false,
              isProgrammatic: false,
              wasActivatedByPointer: false,
              wasElementMadeActive: false,
          };
      };
      /**
       * supportsPressRipple Passed from init to save a redundant function call
       */
      MDCRippleFoundation.prototype.registerRootHandlers_ = function (supportsPressRipple) {
          var _this = this;
          if (supportsPressRipple) {
              ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                  _this.adapter_.registerInteractionHandler(evtType, _this.activateHandler_);
              });
              if (this.adapter_.isUnbounded()) {
                  this.adapter_.registerResizeHandler(this.resizeHandler_);
              }
          }
          this.adapter_.registerInteractionHandler('focus', this.focusHandler_);
          this.adapter_.registerInteractionHandler('blur', this.blurHandler_);
      };
      MDCRippleFoundation.prototype.registerDeactivationHandlers_ = function (evt) {
          var _this = this;
          if (evt.type === 'keydown') {
              this.adapter_.registerInteractionHandler('keyup', this.deactivateHandler_);
          }
          else {
              POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
                  _this.adapter_.registerDocumentInteractionHandler(evtType, _this.deactivateHandler_);
              });
          }
      };
      MDCRippleFoundation.prototype.deregisterRootHandlers_ = function () {
          var _this = this;
          ACTIVATION_EVENT_TYPES.forEach(function (evtType) {
              _this.adapter_.deregisterInteractionHandler(evtType, _this.activateHandler_);
          });
          this.adapter_.deregisterInteractionHandler('focus', this.focusHandler_);
          this.adapter_.deregisterInteractionHandler('blur', this.blurHandler_);
          if (this.adapter_.isUnbounded()) {
              this.adapter_.deregisterResizeHandler(this.resizeHandler_);
          }
      };
      MDCRippleFoundation.prototype.deregisterDeactivationHandlers_ = function () {
          var _this = this;
          this.adapter_.deregisterInteractionHandler('keyup', this.deactivateHandler_);
          POINTER_DEACTIVATION_EVENT_TYPES.forEach(function (evtType) {
              _this.adapter_.deregisterDocumentInteractionHandler(evtType, _this.deactivateHandler_);
          });
      };
      MDCRippleFoundation.prototype.removeCssVars_ = function () {
          var _this = this;
          var rippleStrings = MDCRippleFoundation.strings;
          var keys = Object.keys(rippleStrings);
          keys.forEach(function (key) {
              if (key.indexOf('VAR_') === 0) {
                  _this.adapter_.updateCssVariable(rippleStrings[key], null);
              }
          });
      };
      MDCRippleFoundation.prototype.activate_ = function (evt) {
          var _this = this;
          if (this.adapter_.isSurfaceDisabled()) {
              return;
          }
          var activationState = this.activationState_;
          if (activationState.isActivated) {
              return;
          }
          // Avoid reacting to follow-on events fired by touch device after an already-processed user interaction
          var previousActivationEvent = this.previousActivationEvent_;
          var isSameInteraction = previousActivationEvent && evt !== undefined && previousActivationEvent.type !== evt.type;
          if (isSameInteraction) {
              return;
          }
          activationState.isActivated = true;
          activationState.isProgrammatic = evt === undefined;
          activationState.activationEvent = evt;
          activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : evt !== undefined && (evt.type === 'mousedown' || evt.type === 'touchstart' || evt.type === 'pointerdown');
          var hasActivatedChild = evt !== undefined && activatedTargets.length > 0 && activatedTargets.some(function (target) { return _this.adapter_.containsEventTarget(target); });
          if (hasActivatedChild) {
              // Immediately reset activation state, while preserving logic that prevents touch follow-on events
              this.resetActivationState_();
              return;
          }
          if (evt !== undefined) {
              activatedTargets.push(evt.target);
              this.registerDeactivationHandlers_(evt);
          }
          activationState.wasElementMadeActive = this.checkElementMadeActive_(evt);
          if (activationState.wasElementMadeActive) {
              this.animateActivation_();
          }
          requestAnimationFrame(function () {
              // Reset array on next frame after the current event has had a chance to bubble to prevent ancestor ripples
              activatedTargets = [];
              if (!activationState.wasElementMadeActive
                  && evt !== undefined
                  && (evt.key === ' ' || evt.keyCode === 32)) {
                  // If space was pressed, try again within an rAF call to detect :active, because different UAs report
                  // active states inconsistently when they're called within event handling code:
                  // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
                  // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
                  // We try first outside rAF to support Edge, which does not exhibit this problem, but will crash if a CSS
                  // variable is set within a rAF callback for a submit button interaction (#2241).
                  activationState.wasElementMadeActive = _this.checkElementMadeActive_(evt);
                  if (activationState.wasElementMadeActive) {
                      _this.animateActivation_();
                  }
              }
              if (!activationState.wasElementMadeActive) {
                  // Reset activation state immediately if element was not made active.
                  _this.activationState_ = _this.defaultActivationState_();
              }
          });
      };
      MDCRippleFoundation.prototype.checkElementMadeActive_ = function (evt) {
          return (evt !== undefined && evt.type === 'keydown') ? this.adapter_.isSurfaceActive() : true;
      };
      MDCRippleFoundation.prototype.animateActivation_ = function () {
          var _this = this;
          var _a = MDCRippleFoundation.strings, VAR_FG_TRANSLATE_START = _a.VAR_FG_TRANSLATE_START, VAR_FG_TRANSLATE_END = _a.VAR_FG_TRANSLATE_END;
          var _b = MDCRippleFoundation.cssClasses, FG_DEACTIVATION = _b.FG_DEACTIVATION, FG_ACTIVATION = _b.FG_ACTIVATION;
          var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;
          this.layoutInternal_();
          var translateStart = '';
          var translateEnd = '';
          if (!this.adapter_.isUnbounded()) {
              var _c = this.getFgTranslationCoordinates_(), startPoint = _c.startPoint, endPoint = _c.endPoint;
              translateStart = startPoint.x + "px, " + startPoint.y + "px";
              translateEnd = endPoint.x + "px, " + endPoint.y + "px";
          }
          this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
          this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
          // Cancel any ongoing activation/deactivation animations
          clearTimeout(this.activationTimer_);
          clearTimeout(this.fgDeactivationRemovalTimer_);
          this.rmBoundedActivationClasses_();
          this.adapter_.removeClass(FG_DEACTIVATION);
          // Force layout in order to re-trigger the animation.
          this.adapter_.computeBoundingRect();
          this.adapter_.addClass(FG_ACTIVATION);
          this.activationTimer_ = setTimeout(function () { return _this.activationTimerCallback_(); }, DEACTIVATION_TIMEOUT_MS);
      };
      MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function () {
          var _a = this.activationState_, activationEvent = _a.activationEvent, wasActivatedByPointer = _a.wasActivatedByPointer;
          var startPoint;
          if (wasActivatedByPointer) {
              startPoint = getNormalizedEventCoords(activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
          }
          else {
              startPoint = {
                  x: this.frame_.width / 2,
                  y: this.frame_.height / 2,
              };
          }
          // Center the element around the start point.
          startPoint = {
              x: startPoint.x - (this.initialSize_ / 2),
              y: startPoint.y - (this.initialSize_ / 2),
          };
          var endPoint = {
              x: (this.frame_.width / 2) - (this.initialSize_ / 2),
              y: (this.frame_.height / 2) - (this.initialSize_ / 2),
          };
          return { startPoint: startPoint, endPoint: endPoint };
      };
      MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function () {
          var _this = this;
          // This method is called both when a pointing device is released, and when the activation animation ends.
          // The deactivation animation should only run after both of those occur.
          var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
          var _a = this.activationState_, hasDeactivationUXRun = _a.hasDeactivationUXRun, isActivated = _a.isActivated;
          var activationHasEnded = hasDeactivationUXRun || !isActivated;
          if (activationHasEnded && this.activationAnimationHasEnded_) {
              this.rmBoundedActivationClasses_();
              this.adapter_.addClass(FG_DEACTIVATION);
              this.fgDeactivationRemovalTimer_ = setTimeout(function () {
                  _this.adapter_.removeClass(FG_DEACTIVATION);
              }, numbers.FG_DEACTIVATION_MS);
          }
      };
      MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function () {
          var FG_ACTIVATION = MDCRippleFoundation.cssClasses.FG_ACTIVATION;
          this.adapter_.removeClass(FG_ACTIVATION);
          this.activationAnimationHasEnded_ = false;
          this.adapter_.computeBoundingRect();
      };
      MDCRippleFoundation.prototype.resetActivationState_ = function () {
          var _this = this;
          this.previousActivationEvent_ = this.activationState_.activationEvent;
          this.activationState_ = this.defaultActivationState_();
          // Touch devices may fire additional events for the same interaction within a short time.
          // Store the previous event until it's safe to assume that subsequent events are for new interactions.
          setTimeout(function () { return _this.previousActivationEvent_ = undefined; }, MDCRippleFoundation.numbers.TAP_DELAY_MS);
      };
      MDCRippleFoundation.prototype.deactivate_ = function () {
          var _this = this;
          var activationState = this.activationState_;
          // This can happen in scenarios such as when you have a keyup event that blurs the element.
          if (!activationState.isActivated) {
              return;
          }
          var state = __assign({}, activationState);
          if (activationState.isProgrammatic) {
              requestAnimationFrame(function () { return _this.animateDeactivation_(state); });
              this.resetActivationState_();
          }
          else {
              this.deregisterDeactivationHandlers_();
              requestAnimationFrame(function () {
                  _this.activationState_.hasDeactivationUXRun = true;
                  _this.animateDeactivation_(state);
                  _this.resetActivationState_();
              });
          }
      };
      MDCRippleFoundation.prototype.animateDeactivation_ = function (_a) {
          var wasActivatedByPointer = _a.wasActivatedByPointer, wasElementMadeActive = _a.wasElementMadeActive;
          if (wasActivatedByPointer || wasElementMadeActive) {
              this.runDeactivationUXLogicIfReady_();
          }
      };
      MDCRippleFoundation.prototype.layoutInternal_ = function () {
          var _this = this;
          this.frame_ = this.adapter_.computeBoundingRect();
          var maxDim = Math.max(this.frame_.height, this.frame_.width);
          // Surface diameter is treated differently for unbounded vs. bounded ripples.
          // Unbounded ripple diameter is calculated smaller since the surface is expected to already be padded appropriately
          // to extend the hitbox, and the ripple is expected to meet the edges of the padded hitbox (which is typically
          // square). Bounded ripples, on the other hand, are fully expected to expand beyond the surface's longest diameter
          // (calculated based on the diagonal plus a constant padding), and are clipped at the surface's border via
          // `overflow: hidden`.
          var getBoundedRadius = function () {
              var hypotenuse = Math.sqrt(Math.pow(_this.frame_.width, 2) + Math.pow(_this.frame_.height, 2));
              return hypotenuse + MDCRippleFoundation.numbers.PADDING;
          };
          this.maxRadius_ = this.adapter_.isUnbounded() ? maxDim : getBoundedRadius();
          // Ripple is sized as a fraction of the largest dimension of the surface, then scales up using a CSS scale transform
          this.initialSize_ = Math.floor(maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE);
          this.fgScale_ = "" + this.maxRadius_ / this.initialSize_;
          this.updateLayoutCssVars_();
      };
      MDCRippleFoundation.prototype.updateLayoutCssVars_ = function () {
          var _a = MDCRippleFoundation.strings, VAR_FG_SIZE = _a.VAR_FG_SIZE, VAR_LEFT = _a.VAR_LEFT, VAR_TOP = _a.VAR_TOP, VAR_FG_SCALE = _a.VAR_FG_SCALE;
          this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + "px");
          this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);
          if (this.adapter_.isUnbounded()) {
              this.unboundedCoords_ = {
                  left: Math.round((this.frame_.width / 2) - (this.initialSize_ / 2)),
                  top: Math.round((this.frame_.height / 2) - (this.initialSize_ / 2)),
              };
              this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + "px");
              this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + "px");
          }
      };
      return MDCRippleFoundation;
  }(MDCFoundation));

  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var MDCRipple = /** @class */ (function (_super) {
      __extends(MDCRipple, _super);
      function MDCRipple() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.disabled = false;
          return _this;
      }
      MDCRipple.attachTo = function (root, opts) {
          if (opts === void 0) { opts = { isUnbounded: undefined }; }
          var ripple = new MDCRipple(root);
          // Only override unbounded behavior if option is explicitly specified
          if (opts.isUnbounded !== undefined) {
              ripple.unbounded = opts.isUnbounded;
          }
          return ripple;
      };
      MDCRipple.createAdapter = function (instance) {
          return {
              addClass: function (className) { return instance.root_.classList.add(className); },
              browserSupportsCssVars: function () { return supportsCssVariables(window); },
              computeBoundingRect: function () { return instance.root_.getBoundingClientRect(); },
              containsEventTarget: function (target) { return instance.root_.contains(target); },
              deregisterDocumentInteractionHandler: function (evtType, handler) {
                  return document.documentElement.removeEventListener(evtType, handler, applyPassive());
              },
              deregisterInteractionHandler: function (evtType, handler) {
                  return instance.root_.removeEventListener(evtType, handler, applyPassive());
              },
              deregisterResizeHandler: function (handler) { return window.removeEventListener('resize', handler); },
              getWindowPageOffset: function () { return ({ x: window.pageXOffset, y: window.pageYOffset }); },
              isSurfaceActive: function () { return matches(instance.root_, ':active'); },
              isSurfaceDisabled: function () { return Boolean(instance.disabled); },
              isUnbounded: function () { return Boolean(instance.unbounded); },
              registerDocumentInteractionHandler: function (evtType, handler) {
                  return document.documentElement.addEventListener(evtType, handler, applyPassive());
              },
              registerInteractionHandler: function (evtType, handler) {
                  return instance.root_.addEventListener(evtType, handler, applyPassive());
              },
              registerResizeHandler: function (handler) { return window.addEventListener('resize', handler); },
              removeClass: function (className) { return instance.root_.classList.remove(className); },
              updateCssVariable: function (varName, value) { return instance.root_.style.setProperty(varName, value); },
          };
      };
      Object.defineProperty(MDCRipple.prototype, "unbounded", {
          get: function () {
              return Boolean(this.unbounded_);
          },
          set: function (unbounded) {
              this.unbounded_ = Boolean(unbounded);
              this.setUnbounded_();
          },
          enumerable: true,
          configurable: true
      });
      MDCRipple.prototype.activate = function () {
          this.foundation_.activate();
      };
      MDCRipple.prototype.deactivate = function () {
          this.foundation_.deactivate();
      };
      MDCRipple.prototype.layout = function () {
          this.foundation_.layout();
      };
      MDCRipple.prototype.getDefaultFoundation = function () {
          return new MDCRippleFoundation(MDCRipple.createAdapter(this));
      };
      MDCRipple.prototype.initialSyncWithDOM = function () {
          var root = this.root_;
          this.unbounded = 'mdcRippleIsUnbounded' in root.dataset;
      };
      /**
       * Closure Compiler throws an access control error when directly accessing a
       * protected or private property inside a getter/setter, like unbounded above.
       * By accessing the protected property inside a method, we solve that problem.
       * That's why this function exists.
       */
      MDCRipple.prototype.setUnbounded_ = function () {
          this.foundation_.setUnbounded(Boolean(this.unbounded_));
      };
      return MDCRipple;
  }(MDCComponent));

  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var cssClasses$1 = {
      ICON_BUTTON_ON: 'mdc-icon-button--on',
      ROOT: 'mdc-icon-button',
  };
  var strings$1 = {
      ARIA_PRESSED: 'aria-pressed',
      CHANGE_EVENT: 'MDCIconButtonToggle:change',
  };

  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var MDCIconButtonToggleFoundation = /** @class */ (function (_super) {
      __extends(MDCIconButtonToggleFoundation, _super);
      function MDCIconButtonToggleFoundation(adapter) {
          return _super.call(this, __assign({}, MDCIconButtonToggleFoundation.defaultAdapter, adapter)) || this;
      }
      Object.defineProperty(MDCIconButtonToggleFoundation, "cssClasses", {
          get: function () {
              return cssClasses$1;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCIconButtonToggleFoundation, "strings", {
          get: function () {
              return strings$1;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCIconButtonToggleFoundation, "defaultAdapter", {
          get: function () {
              return {
                  addClass: function () { return undefined; },
                  hasClass: function () { return false; },
                  notifyChange: function () { return undefined; },
                  removeClass: function () { return undefined; },
                  setAttr: function () { return undefined; },
              };
          },
          enumerable: true,
          configurable: true
      });
      MDCIconButtonToggleFoundation.prototype.init = function () {
          this.adapter_.setAttr(strings$1.ARIA_PRESSED, "" + this.isOn());
      };
      MDCIconButtonToggleFoundation.prototype.handleClick = function () {
          this.toggle();
          this.adapter_.notifyChange({ isOn: this.isOn() });
      };
      MDCIconButtonToggleFoundation.prototype.isOn = function () {
          return this.adapter_.hasClass(cssClasses$1.ICON_BUTTON_ON);
      };
      MDCIconButtonToggleFoundation.prototype.toggle = function (isOn) {
          if (isOn === void 0) { isOn = !this.isOn(); }
          if (isOn) {
              this.adapter_.addClass(cssClasses$1.ICON_BUTTON_ON);
          }
          else {
              this.adapter_.removeClass(cssClasses$1.ICON_BUTTON_ON);
          }
          this.adapter_.setAttr(strings$1.ARIA_PRESSED, "" + isOn);
      };
      return MDCIconButtonToggleFoundation;
  }(MDCFoundation));

  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var strings$2 = MDCIconButtonToggleFoundation.strings;
  var MDCIconButtonToggle = /** @class */ (function (_super) {
      __extends(MDCIconButtonToggle, _super);
      function MDCIconButtonToggle() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.ripple_ = _this.createRipple_();
          return _this;
      }
      MDCIconButtonToggle.attachTo = function (root) {
          return new MDCIconButtonToggle(root);
      };
      MDCIconButtonToggle.prototype.initialSyncWithDOM = function () {
          var _this = this;
          this.handleClick_ = function () { return _this.foundation_.handleClick(); };
          this.listen('click', this.handleClick_);
      };
      MDCIconButtonToggle.prototype.destroy = function () {
          this.unlisten('click', this.handleClick_);
          this.ripple_.destroy();
          _super.prototype.destroy.call(this);
      };
      MDCIconButtonToggle.prototype.getDefaultFoundation = function () {
          var _this = this;
          // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
          // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
          var adapter = {
              addClass: function (className) { return _this.root_.classList.add(className); },
              hasClass: function (className) { return _this.root_.classList.contains(className); },
              notifyChange: function (evtData) { return _this.emit(strings$2.CHANGE_EVENT, evtData); },
              removeClass: function (className) { return _this.root_.classList.remove(className); },
              setAttr: function (attrName, attrValue) { return _this.root_.setAttribute(attrName, attrValue); },
          };
          return new MDCIconButtonToggleFoundation(adapter);
      };
      Object.defineProperty(MDCIconButtonToggle.prototype, "ripple", {
          get: function () {
              return this.ripple_;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(MDCIconButtonToggle.prototype, "on", {
          get: function () {
              return this.foundation_.isOn();
          },
          set: function (isOn) {
              this.foundation_.toggle(isOn);
          },
          enumerable: true,
          configurable: true
      });
      MDCIconButtonToggle.prototype.createRipple_ = function () {
          var ripple = new MDCRipple(this.root_);
          ripple.unbounded = true;
          return ripple;
      };
      return MDCIconButtonToggle;
  }(MDCComponent));

  function forwardEventsBuilder(component, additionalEvents = []) {
    const events = [
      'focus', 'blur',
      'fullscreenchange', 'fullscreenerror', 'scroll',
      'cut', 'copy', 'paste',
      'keydown', 'keypress', 'keyup',
      'auxclick', 'click', 'contextmenu', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup', 'pointerlockchange', 'pointerlockerror', 'select', 'wheel',
      'drag', 'dragend', 'dragenter', 'dragstart', 'dragleave', 'dragover', 'drop',
      'touchcancel', 'touchend', 'touchmove', 'touchstart',
      'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture', 'lostpointercapture',
      ...additionalEvents
    ];

    function forward(e) {
      bubble(component, e);
    }

    return node => {
      const destructors = [];

      for (let i = 0; i < events.length; i++) {
        destructors.push(listen(node, events[i], forward));
      }

      return {
        destroy: () => {
          for (let i = 0; i < destructors.length; i++) {
            destructors[i]();
          }
        }
      }
    };
  }

  function exclude(obj, keys) {
    let names = Object.getOwnPropertyNames(obj);
    const newObj = {};

    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      const cashIndex = name.indexOf('$');
      if (cashIndex !== -1 && keys.indexOf(name.substring(0, cashIndex + 1)) !== -1) {
        continue;
      }
      if (keys.indexOf(name) !== -1) {
        continue;
      }
      newObj[name] = obj[name];
    }

    return newObj;
  }

  function useActions(node, actions) {
    let objects = [];

    if (actions) {
      for (let i = 0; i < actions.length; i++) {
        const isArray = Array.isArray(actions[i]);
        const action = isArray ? actions[i][0] : actions[i];
        if (isArray && actions[i].length > 1) {
          objects.push(action(node, actions[i][1]));
        } else {
          objects.push(action(node));
        }
      }
    }

    return {
      update(actions) {
        if ((actions && actions.length || 0) != objects.length) {
          throw new Error('You must not change the length of an actions array.');
        }

        if (actions) {
          for (let i = 0; i < actions.length; i++) {
            if (objects[i] && 'update' in objects[i]) {
              const isArray = Array.isArray(actions[i]);
              if (isArray && actions[i].length > 1) {
                objects[i].update(actions[i][1]);
              } else {
                objects[i].update();
              }
            }
          }
        }
      },

      destroy() {
        for (let i = 0; i < objects.length; i++) {
          if (objects[i] && 'destroy' in objects[i]) {
            objects[i].destroy();
          }
        }
      }
    }
  }

  function Ripple(node, props = {ripple: false, unbounded: false, color: null, classForward: () => {}}) {
    let instance = null;
    let addLayoutListener = getContext('SMUI:addLayoutListener');
    let removeLayoutListener;
    let classList = [];

    function addClass(className) {
      const idx = classList.indexOf(className);
      if (idx === -1) {
        node.classList.add(className);
        classList.push(className);
        if (props.classForward) {
          props.classForward(classList);
        }
      }
    }

    function removeClass(className) {
      const idx = classList.indexOf(className);
      if (idx !== -1) {
        node.classList.remove(className);
        classList.splice(idx, 1);
        if (props.classForward) {
          props.classForward(classList);
        }
      }
    }

    function handleProps() {
      if (props.ripple && !instance) {
        // Override the Ripple component's adapter, so that we can forward classes
        // to Svelte components that overwrite Ripple's classes.
        const _createAdapter = MDCRipple.createAdapter;
        MDCRipple.createAdapter = function(...args) {
          const adapter = _createAdapter.apply(this, args);
          adapter.addClass = function(className) {
            return addClass(className);
          };
          adapter.removeClass = function(className) {
            return removeClass(className);
          };
          return adapter;
        };
        instance = new MDCRipple(node);
        MDCRipple.createAdapter = _createAdapter;
      } else if (instance && !props.ripple) {
        instance.destroy();
        instance = null;
      }
      if (props.ripple) {
        instance.unbounded = !!props.unbounded;
        switch (props.color) {
          case 'surface':
            addClass('mdc-ripple-surface');
            removeClass('mdc-ripple-surface--primary');
            removeClass('mdc-ripple-surface--accent');
            return;
          case 'primary':
            addClass('mdc-ripple-surface');
            addClass('mdc-ripple-surface--primary');
            removeClass('mdc-ripple-surface--accent');
            return;
          case 'secondary':
            addClass('mdc-ripple-surface');
            removeClass('mdc-ripple-surface--primary');
            addClass('mdc-ripple-surface--accent');
            return;
        }
      }
      removeClass('mdc-ripple-surface');
      removeClass('mdc-ripple-surface--primary');
      removeClass('mdc-ripple-surface--accent');
    }

    handleProps();

    if (addLayoutListener) {
      removeLayoutListener = addLayoutListener(layout);
    }

    function layout() {
      if (instance) {
        instance.layout();
      }
    }

    return {
      update(newProps = {ripple: false, unbounded: false, color: null, classForward: []}) {
        props = newProps;
        handleProps();
      },

      destroy() {
        if (instance) {
          instance.destroy();
          instance = null;
          removeClass('mdc-ripple-surface');
          removeClass('mdc-ripple-surface--primary');
          removeClass('mdc-ripple-surface--accent');
        }

        if (removeLayoutListener) {
          removeLayoutListener();
        }
      }
    }
  }

  /* node_modules/@smui/icon-button/IconButton.svelte generated by Svelte v3.21.0 */

  function create_else_block(ctx) {
  	let button;
  	let useActions_action;
  	let forwardEvents_action;
  	let Ripple_action;
  	let current;
  	let dispose;
  	const default_slot_template = /*$$slots*/ ctx[16].default;
  	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

  	let button_levels = [
  		{
  			class: "\n      mdc-icon-button\n      " + /*className*/ ctx[2] + "\n      " + (/*pressed*/ ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  			? "mdc-card__action"
  			: "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  			? "mdc-card__action--icon"
  			: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:navigation"
  			? "mdc-top-app-bar__navigation-icon"
  			: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:action"
  			? "mdc-top-app-bar__action-item"
  			: "") + "\n      " + (/*context*/ ctx[10] === "snackbar"
  			? "mdc-snackbar__dismiss"
  			: "") + "\n    "
  		},
  		{ "aria-hidden": "true" },
  		{ "aria-pressed": /*pressed*/ ctx[0] },
  		/*props*/ ctx[8]
  	];

  	let button_data = {};

  	for (let i = 0; i < button_levels.length; i += 1) {
  		button_data = assign(button_data, button_levels[i]);
  	}

  	return {
  		c() {
  			button = element("button");
  			if (default_slot) default_slot.c();
  			set_attributes(button, button_data);
  		},
  		m(target, anchor, remount) {
  			insert(target, button, anchor);

  			if (default_slot) {
  				default_slot.m(button, null);
  			}

  			/*button_binding*/ ctx[18](button);
  			current = true;
  			if (remount) run_all(dispose);

  			dispose = [
  				action_destroyer(useActions_action = useActions.call(null, button, /*use*/ ctx[1])),
  				action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[9].call(null, button)),
  				action_destroyer(Ripple_action = Ripple.call(null, button, {
  					ripple: /*ripple*/ ctx[3] && !/*toggle*/ ctx[5],
  					unbounded: true,
  					color: /*color*/ ctx[4]
  				})),
  				listen(button, "MDCIconButtonToggle:change", /*handleChange*/ ctx[11])
  			];
  		},
  		p(ctx, dirty) {
  			if (default_slot) {
  				if (default_slot.p && dirty & /*$$scope*/ 32768) {
  					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[15], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null));
  				}
  			}

  			set_attributes(button, get_spread_update(button_levels, [
  				dirty & /*className, pressed, context*/ 1029 && {
  					class: "\n      mdc-icon-button\n      " + /*className*/ ctx[2] + "\n      " + (/*pressed*/ ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  					? "mdc-card__action"
  					: "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  					? "mdc-card__action--icon"
  					: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:navigation"
  					? "mdc-top-app-bar__navigation-icon"
  					: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:action"
  					? "mdc-top-app-bar__action-item"
  					: "") + "\n      " + (/*context*/ ctx[10] === "snackbar"
  					? "mdc-snackbar__dismiss"
  					: "") + "\n    "
  				},
  				{ "aria-hidden": "true" },
  				dirty & /*pressed*/ 1 && { "aria-pressed": /*pressed*/ ctx[0] },
  				dirty & /*props*/ 256 && /*props*/ ctx[8]
  			]));

  			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);

  			if (Ripple_action && is_function(Ripple_action.update) && dirty & /*ripple, toggle, color*/ 56) Ripple_action.update.call(null, {
  				ripple: /*ripple*/ ctx[3] && !/*toggle*/ ctx[5],
  				unbounded: true,
  				color: /*color*/ ctx[4]
  			});
  		},
  		i(local) {
  			if (current) return;
  			transition_in(default_slot, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(default_slot, local);
  			current = false;
  		},
  		d(detaching) {
  			if (detaching) detach(button);
  			if (default_slot) default_slot.d(detaching);
  			/*button_binding*/ ctx[18](null);
  			run_all(dispose);
  		}
  	};
  }

  // (1:0) {#if href}
  function create_if_block(ctx) {
  	let a;
  	let useActions_action;
  	let forwardEvents_action;
  	let Ripple_action;
  	let current;
  	let dispose;
  	const default_slot_template = /*$$slots*/ ctx[16].default;
  	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

  	let a_levels = [
  		{
  			class: "\n      mdc-icon-button\n      " + /*className*/ ctx[2] + "\n      " + (/*pressed*/ ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  			? "mdc-card__action"
  			: "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  			? "mdc-card__action--icon"
  			: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:navigation"
  			? "mdc-top-app-bar__navigation-icon"
  			: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:action"
  			? "mdc-top-app-bar__action-item"
  			: "") + "\n      " + (/*context*/ ctx[10] === "snackbar"
  			? "mdc-snackbar__dismiss"
  			: "") + "\n    "
  		},
  		{ "aria-hidden": "true" },
  		{ "aria-pressed": /*pressed*/ ctx[0] },
  		{ href: /*href*/ ctx[6] },
  		/*props*/ ctx[8]
  	];

  	let a_data = {};

  	for (let i = 0; i < a_levels.length; i += 1) {
  		a_data = assign(a_data, a_levels[i]);
  	}

  	return {
  		c() {
  			a = element("a");
  			if (default_slot) default_slot.c();
  			set_attributes(a, a_data);
  		},
  		m(target, anchor, remount) {
  			insert(target, a, anchor);

  			if (default_slot) {
  				default_slot.m(a, null);
  			}

  			/*a_binding*/ ctx[17](a);
  			current = true;
  			if (remount) run_all(dispose);

  			dispose = [
  				action_destroyer(useActions_action = useActions.call(null, a, /*use*/ ctx[1])),
  				action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[9].call(null, a)),
  				action_destroyer(Ripple_action = Ripple.call(null, a, {
  					ripple: /*ripple*/ ctx[3] && !/*toggle*/ ctx[5],
  					unbounded: true,
  					color: /*color*/ ctx[4]
  				})),
  				listen(a, "MDCIconButtonToggle:change", /*handleChange*/ ctx[11])
  			];
  		},
  		p(ctx, dirty) {
  			if (default_slot) {
  				if (default_slot.p && dirty & /*$$scope*/ 32768) {
  					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[15], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null));
  				}
  			}

  			set_attributes(a, get_spread_update(a_levels, [
  				dirty & /*className, pressed, context*/ 1029 && {
  					class: "\n      mdc-icon-button\n      " + /*className*/ ctx[2] + "\n      " + (/*pressed*/ ctx[0] ? "mdc-icon-button--on" : "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  					? "mdc-card__action"
  					: "") + "\n      " + (/*context*/ ctx[10] === "card:action"
  					? "mdc-card__action--icon"
  					: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:navigation"
  					? "mdc-top-app-bar__navigation-icon"
  					: "") + "\n      " + (/*context*/ ctx[10] === "top-app-bar:action"
  					? "mdc-top-app-bar__action-item"
  					: "") + "\n      " + (/*context*/ ctx[10] === "snackbar"
  					? "mdc-snackbar__dismiss"
  					: "") + "\n    "
  				},
  				{ "aria-hidden": "true" },
  				dirty & /*pressed*/ 1 && { "aria-pressed": /*pressed*/ ctx[0] },
  				dirty & /*href*/ 64 && { href: /*href*/ ctx[6] },
  				dirty & /*props*/ 256 && /*props*/ ctx[8]
  			]));

  			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 2) useActions_action.update.call(null, /*use*/ ctx[1]);

  			if (Ripple_action && is_function(Ripple_action.update) && dirty & /*ripple, toggle, color*/ 56) Ripple_action.update.call(null, {
  				ripple: /*ripple*/ ctx[3] && !/*toggle*/ ctx[5],
  				unbounded: true,
  				color: /*color*/ ctx[4]
  			});
  		},
  		i(local) {
  			if (current) return;
  			transition_in(default_slot, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(default_slot, local);
  			current = false;
  		},
  		d(detaching) {
  			if (detaching) detach(a);
  			if (default_slot) default_slot.d(detaching);
  			/*a_binding*/ ctx[17](null);
  			run_all(dispose);
  		}
  	};
  }

  function create_fragment(ctx) {
  	let current_block_type_index;
  	let if_block;
  	let if_block_anchor;
  	let current;
  	const if_block_creators = [create_if_block, create_else_block];
  	const if_blocks = [];

  	function select_block_type(ctx, dirty) {
  		if (/*href*/ ctx[6]) return 0;
  		return 1;
  	}

  	current_block_type_index = select_block_type(ctx);
  	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

  	return {
  		c() {
  			if_block.c();
  			if_block_anchor = empty();
  		},
  		m(target, anchor) {
  			if_blocks[current_block_type_index].m(target, anchor);
  			insert(target, if_block_anchor, anchor);
  			current = true;
  		},
  		p(ctx, [dirty]) {
  			let previous_block_index = current_block_type_index;
  			current_block_type_index = select_block_type(ctx);

  			if (current_block_type_index === previous_block_index) {
  				if_blocks[current_block_type_index].p(ctx, dirty);
  			} else {
  				group_outros();

  				transition_out(if_blocks[previous_block_index], 1, 1, () => {
  					if_blocks[previous_block_index] = null;
  				});

  				check_outros();
  				if_block = if_blocks[current_block_type_index];

  				if (!if_block) {
  					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  					if_block.c();
  				}

  				transition_in(if_block, 1);
  				if_block.m(if_block_anchor.parentNode, if_block_anchor);
  			}
  		},
  		i(local) {
  			if (current) return;
  			transition_in(if_block);
  			current = true;
  		},
  		o(local) {
  			transition_out(if_block);
  			current = false;
  		},
  		d(detaching) {
  			if_blocks[current_block_type_index].d(detaching);
  			if (detaching) detach(if_block_anchor);
  		}
  	};
  }

  function instance($$self, $$props, $$invalidate) {
  	const forwardEvents = forwardEventsBuilder(get_current_component(), ["MDCIconButtonToggle:change"]);
  	let { use = [] } = $$props;
  	let { class: className = "" } = $$props;
  	let { ripple = true } = $$props;
  	let { color = null } = $$props;
  	let { toggle = false } = $$props;
  	let { pressed = false } = $$props;
  	let { href = null } = $$props;
  	let element;
  	let toggleButton;
  	let context = getContext("SMUI:icon-button:context");
  	setContext("SMUI:icon:context", "icon-button");
  	let oldToggle = null;

  	onDestroy(() => {
  		toggleButton && toggleButton.destroy();
  	});

  	function handleChange(e) {
  		$$invalidate(0, pressed = e.detail.isOn);
  	}

  	let { $$slots = {}, $$scope } = $$props;

  	function a_binding($$value) {
  		binding_callbacks[$$value ? "unshift" : "push"](() => {
  			$$invalidate(7, element = $$value);
  		});
  	}

  	function button_binding($$value) {
  		binding_callbacks[$$value ? "unshift" : "push"](() => {
  			$$invalidate(7, element = $$value);
  		});
  	}

  	$$self.$set = $$new_props => {
  		$$invalidate(14, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  		if ("use" in $$new_props) $$invalidate(1, use = $$new_props.use);
  		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
  		if ("ripple" in $$new_props) $$invalidate(3, ripple = $$new_props.ripple);
  		if ("color" in $$new_props) $$invalidate(4, color = $$new_props.color);
  		if ("toggle" in $$new_props) $$invalidate(5, toggle = $$new_props.toggle);
  		if ("pressed" in $$new_props) $$invalidate(0, pressed = $$new_props.pressed);
  		if ("href" in $$new_props) $$invalidate(6, href = $$new_props.href);
  		if ("$$scope" in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
  	};

  	let props;

  	$$self.$$.update = () => {
  		 $$invalidate(8, props = exclude($$props, ["use", "class", "ripple", "color", "toggle", "pressed", "href"]));

  		if ($$self.$$.dirty & /*element, toggle, oldToggle, ripple, toggleButton, pressed*/ 12457) {
  			 if (element && toggle !== oldToggle) {
  				if (toggle) {
  					$$invalidate(12, toggleButton = new MDCIconButtonToggle(element));

  					if (!ripple) {
  						toggleButton.ripple.destroy();
  					}

  					$$invalidate(12, toggleButton.on = pressed, toggleButton);
  				} else if (oldToggle) {
  					toggleButton && toggleButton.destroy();
  					$$invalidate(12, toggleButton = null);
  				}

  				$$invalidate(13, oldToggle = toggle);
  			}
  		}

  		if ($$self.$$.dirty & /*toggleButton, pressed*/ 4097) {
  			 if (toggleButton && toggleButton.on !== pressed) {
  				$$invalidate(12, toggleButton.on = pressed, toggleButton);
  			}
  		}
  	};

  	$$props = exclude_internal_props($$props);

  	return [
  		pressed,
  		use,
  		className,
  		ripple,
  		color,
  		toggle,
  		href,
  		element,
  		props,
  		forwardEvents,
  		context,
  		handleChange,
  		toggleButton,
  		oldToggle,
  		$$props,
  		$$scope,
  		$$slots,
  		a_binding,
  		button_binding
  	];
  }

  class IconButton extends SvelteComponent {
  	constructor(options) {
  		super();

  		init(this, options, instance, create_fragment, safe_not_equal, {
  			use: 1,
  			class: 2,
  			ripple: 3,
  			color: 4,
  			toggle: 5,
  			pressed: 0,
  			href: 6
  		});
  	}
  }

  /* node_modules/@smui/common/Icon.svelte generated by Svelte v3.21.0 */

  function create_fragment$1(ctx) {
  	let i;
  	let useActions_action;
  	let forwardEvents_action;
  	let current;
  	let dispose;
  	const default_slot_template = /*$$slots*/ ctx[10].default;
  	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], null);

  	let i_levels = [
  		{
  			class: "\n    " + /*className*/ ctx[1] + "\n    " + (/*context*/ ctx[7] === "button"
  			? "mdc-button__icon"
  			: "") + "\n    " + (/*context*/ ctx[7] === "fab" ? "mdc-fab__icon" : "") + "\n    " + (/*context*/ ctx[7] === "icon-button"
  			? "mdc-icon-button__icon"
  			: "") + "\n    " + (/*context*/ ctx[7] === "icon-button" && /*on*/ ctx[2]
  			? "mdc-icon-button__icon--on"
  			: "") + "\n    " + (/*context*/ ctx[7] === "chip" ? "mdc-chip__icon" : "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leading*/ ctx[3]
  			? "mdc-chip__icon--leading"
  			: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leadingHidden*/ ctx[4]
  			? "mdc-chip__icon--leading-hidden"
  			: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*trailing*/ ctx[5]
  			? "mdc-chip__icon--trailing"
  			: "") + "\n    " + (/*context*/ ctx[7] === "tab" ? "mdc-tab__icon" : "") + "\n  "
  		},
  		{ "aria-hidden": "true" },
  		exclude(/*$$props*/ ctx[8], ["use", "class", "on", "leading", "leadingHidden", "trailing"])
  	];

  	let i_data = {};

  	for (let i = 0; i < i_levels.length; i += 1) {
  		i_data = assign(i_data, i_levels[i]);
  	}

  	return {
  		c() {
  			i = element("i");
  			if (default_slot) default_slot.c();
  			set_attributes(i, i_data);
  		},
  		m(target, anchor, remount) {
  			insert(target, i, anchor);

  			if (default_slot) {
  				default_slot.m(i, null);
  			}

  			current = true;
  			if (remount) run_all(dispose);

  			dispose = [
  				action_destroyer(useActions_action = useActions.call(null, i, /*use*/ ctx[0])),
  				action_destroyer(forwardEvents_action = /*forwardEvents*/ ctx[6].call(null, i))
  			];
  		},
  		p(ctx, [dirty]) {
  			if (default_slot) {
  				if (default_slot.p && dirty & /*$$scope*/ 512) {
  					default_slot.p(get_slot_context(default_slot_template, ctx, /*$$scope*/ ctx[9], null), get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, null));
  				}
  			}

  			set_attributes(i, get_spread_update(i_levels, [
  				dirty & /*className, context, on, leading, leadingHidden, trailing*/ 190 && {
  					class: "\n    " + /*className*/ ctx[1] + "\n    " + (/*context*/ ctx[7] === "button"
  					? "mdc-button__icon"
  					: "") + "\n    " + (/*context*/ ctx[7] === "fab" ? "mdc-fab__icon" : "") + "\n    " + (/*context*/ ctx[7] === "icon-button"
  					? "mdc-icon-button__icon"
  					: "") + "\n    " + (/*context*/ ctx[7] === "icon-button" && /*on*/ ctx[2]
  					? "mdc-icon-button__icon--on"
  					: "") + "\n    " + (/*context*/ ctx[7] === "chip" ? "mdc-chip__icon" : "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leading*/ ctx[3]
  					? "mdc-chip__icon--leading"
  					: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*leadingHidden*/ ctx[4]
  					? "mdc-chip__icon--leading-hidden"
  					: "") + "\n    " + (/*context*/ ctx[7] === "chip" && /*trailing*/ ctx[5]
  					? "mdc-chip__icon--trailing"
  					: "") + "\n    " + (/*context*/ ctx[7] === "tab" ? "mdc-tab__icon" : "") + "\n  "
  				},
  				{ "aria-hidden": "true" },
  				dirty & /*exclude, $$props*/ 256 && exclude(/*$$props*/ ctx[8], ["use", "class", "on", "leading", "leadingHidden", "trailing"])
  			]));

  			if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/ 1) useActions_action.update.call(null, /*use*/ ctx[0]);
  		},
  		i(local) {
  			if (current) return;
  			transition_in(default_slot, local);
  			current = true;
  		},
  		o(local) {
  			transition_out(default_slot, local);
  			current = false;
  		},
  		d(detaching) {
  			if (detaching) detach(i);
  			if (default_slot) default_slot.d(detaching);
  			run_all(dispose);
  		}
  	};
  }

  function instance$1($$self, $$props, $$invalidate) {
  	const forwardEvents = forwardEventsBuilder(get_current_component());
  	let { use = [] } = $$props;
  	let { class: className = "" } = $$props;
  	let { on = false } = $$props;
  	let { leading = false } = $$props;
  	let { leadingHidden = false } = $$props;
  	let { trailing = false } = $$props;
  	const context = getContext("SMUI:icon:context");
  	let { $$slots = {}, $$scope } = $$props;

  	$$self.$set = $$new_props => {
  		$$invalidate(8, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  		if ("use" in $$new_props) $$invalidate(0, use = $$new_props.use);
  		if ("class" in $$new_props) $$invalidate(1, className = $$new_props.class);
  		if ("on" in $$new_props) $$invalidate(2, on = $$new_props.on);
  		if ("leading" in $$new_props) $$invalidate(3, leading = $$new_props.leading);
  		if ("leadingHidden" in $$new_props) $$invalidate(4, leadingHidden = $$new_props.leadingHidden);
  		if ("trailing" in $$new_props) $$invalidate(5, trailing = $$new_props.trailing);
  		if ("$$scope" in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
  	};

  	$$props = exclude_internal_props($$props);

  	return [
  		use,
  		className,
  		on,
  		leading,
  		leadingHidden,
  		trailing,
  		forwardEvents,
  		context,
  		$$props,
  		$$scope,
  		$$slots
  	];
  }

  class Icon extends SvelteComponent {
  	constructor(options) {
  		super();

  		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
  			use: 0,
  			class: 1,
  			on: 2,
  			leading: 3,
  			leadingHidden: 4,
  			trailing: 5
  		});
  	}
  }

  var cov_2p83hru0kr=function(){var path="/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.css",hash="28f98f6c5e46936ba031ef314c45cc4435e802a8",Function=function(){}.constructor,global=new Function('return this')(),gcv="__coverage__",coverageData={path:"/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.css",statementMap:{},fnMap:{},branchMap:{},s:{},f:{},b:{},_coverageSchema:"332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();

  var cov_1fse77i0ld=function(){var path="/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.svelte",hash="96ee3aea18902992b3c3daaca0001aecbfc2d85d",Function=function(){}.constructor,global=new Function('return this')(),gcv="__coverage__",coverageData={path:"/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.svelte",statementMap:{"0":{start:{line:40,column:32},end:{line:40,column:64}},"1":{start:{line:41,column:43},end:{line:41,column:58}},"2":{start:{line:42,column:22},end:{line:42,column:88}},"3":{start:{line:44,column:1},end:{line:123,column:3}},"4":{start:{line:46,column:3},end:{line:46,column:24}},"5":{start:{line:47,column:3},end:{line:47,column:30}},"6":{start:{line:47,column:17},end:{line:47,column:30}},"7":{start:{line:48,column:3},end:{line:48,column:15}},"8":{start:{line:49,column:3},end:{line:49,column:26}},"9":{start:{line:50,column:3},end:{line:50,column:38}},"10":{start:{line:50,column:21},end:{line:50,column:38}},"11":{start:{line:51,column:3},end:{line:51,column:52}},"12":{start:{line:54,column:3},end:{line:54,column:31}},"13":{start:{line:55,column:3},end:{line:55,column:39}},"14":{start:{line:55,column:17},end:{line:55,column:39}},"15":{start:{line:56,column:3},end:{line:56,column:18}},"16":{start:{line:57,column:3},end:{line:57,column:21}},"17":{start:{line:59,column:3},end:{line:61,column:4}},"18":{start:{line:60,column:4},end:{line:60,column:31}},"19":{start:{line:63,column:3},end:{line:63,column:18}},"20":{start:{line:64,column:3},end:{line:64,column:26}},"21":{start:{line:64,column:16},end:{line:64,column:26}},"22":{start:{line:65,column:3},end:{line:65,column:59}},"23":{start:{line:68,column:3},end:{line:89,column:4}},"24":{start:{line:69,column:4},end:{line:80,column:5}},"25":{start:{line:70,column:5},end:{line:70,column:28}},"26":{start:{line:72,column:5},end:{line:74,column:6}},"27":{start:{line:73,column:6},end:{line:73,column:33}},"28":{start:{line:76,column:5},end:{line:76,column:39}},"29":{start:{line:77,column:5},end:{line:77,column:18}},"30":{start:{line:78,column:5},end:{line:78,column:32}},"31":{start:{line:79,column:5},end:{line:79,column:24}},"32":{start:{line:81,column:10},end:{line:89,column:4}},"33":{start:{line:82,column:4},end:{line:82,column:19}},"34":{start:{line:84,column:4},end:{line:86,column:7}},"35":{start:{line:85,column:5},end:{line:85,column:21}},"36":{start:{line:88,column:4},end:{line:88,column:19}},"37":{start:{line:91,column:3},end:{line:95,column:4}},"38":{start:{line:92,column:4},end:{line:94,column:5}},"39":{start:{line:93,column:5},end:{line:93,column:168}},"40":{start:{line:98,column:3},end:{line:98,column:23}},"41":{start:{line:98,column:16},end:{line:98,column:23}},"42":{start:{line:99,column:3},end:{line:99,column:27}},"43":{start:{line:100,column:3},end:{line:100,column:38}},"44":{start:{line:102,column:3},end:{line:105,column:6}},"45":{start:{line:103,column:4},end:{line:103,column:95}},"46":{start:{line:103,column:25},end:{line:103,column:95}},"47":{start:{line:104,column:4},end:{line:104,column:26}},"48":{start:{line:107,column:3},end:{line:107,column:18}},"49":{start:{line:110,column:3},end:{line:110,column:28}},"50":{start:{line:111,column:3},end:{line:111,column:39}},"51":{start:{line:112,column:3},end:{line:112,column:95}},"52":{start:{line:112,column:24},end:{line:112,column:95}},"53":{start:{line:113,column:3},end:{line:113,column:25}},"54":{start:{line:114,column:3},end:{line:114,column:19}},"55":{start:{line:117,column:3},end:{line:117,column:30}},"56":{start:{line:117,column:18},end:{line:117,column:30}},"57":{start:{line:118,column:3},end:{line:118,column:30}},"58":{start:{line:118,column:17},end:{line:118,column:30}},"59":{start:{line:119,column:3},end:{line:119,column:47}},"60":{start:{line:119,column:21},end:{line:119,column:47}},"61":{start:{line:120,column:3},end:{line:120,column:57}},"62":{start:{line:120,column:36},end:{line:120,column:57}},"63":{start:{line:121,column:3},end:{line:121,column:13}},"64":{start:{line:130,column:20},end:{line:136,column:4}},"65":{start:{line:138,column:1},end:{line:138,column:54}},"66":{start:{line:140,column:1},end:{line:169,column:3}},"67":{start:{line:142,column:3},end:{line:142,column:44}},"68":{start:{line:145,column:3},end:{line:145,column:47}},"69":{start:{line:146,column:3},end:{line:146,column:18}},"70":{start:{line:149,column:30},end:{line:149,column:32}},"71":{start:{line:151,column:3},end:{line:153,column:4}},"72":{start:{line:152,column:4},end:{line:152,column:48}},"73":{start:{line:155,column:3},end:{line:155,column:39}},"74":{start:{line:158,column:3},end:{line:158,column:23}},"75":{start:{line:158,column:16},end:{line:158,column:23}},"76":{start:{line:159,column:3},end:{line:159,column:48}},"77":{start:{line:160,column:3},end:{line:160,column:18}},"78":{start:{line:163,column:3},end:{line:163,column:49}},"79":{start:{line:164,column:3},end:{line:164,column:19}},"80":{start:{line:167,column:3},end:{line:167,column:44}},"81":{start:{line:176,column:1},end:{line:186,column:3}},"82":{start:{line:178,column:3},end:{line:178,column:21}},"83":{start:{line:181,column:3},end:{line:181,column:29}},"84":{start:{line:184,column:3},end:{line:184,column:28}},"85":{start:{line:184,column:18},end:{line:184,column:28}},"86":{start:{line:193,column:14},end:{line:199,column:4}},"87":{start:{line:201,column:1},end:{line:230,column:3}},"88":{start:{line:203,column:3},end:{line:203,column:38}},"89":{start:{line:206,column:3},end:{line:206,column:41}},"90":{start:{line:207,column:3},end:{line:207,column:18}},"91":{start:{line:210,column:24},end:{line:210,column:26}},"92":{start:{line:212,column:3},end:{line:214,column:4}},"93":{start:{line:213,column:4},end:{line:213,column:42}},"94":{start:{line:216,column:3},end:{line:216,column:27}},"95":{start:{line:219,column:3},end:{line:219,column:23}},"96":{start:{line:219,column:16},end:{line:219,column:23}},"97":{start:{line:220,column:3},end:{line:220,column:42}},"98":{start:{line:221,column:3},end:{line:221,column:18}},"99":{start:{line:224,column:3},end:{line:224,column:43}},"100":{start:{line:225,column:3},end:{line:225,column:19}},"101":{start:{line:228,column:3},end:{line:228,column:38}},"102":{start:{line:236,column:25},end:{line:236,column:55}},"103":{start:{line:238,column:1},end:{line:285,column:3}},"104":{start:{line:240,column:3},end:{line:240,column:30}},"105":{start:{line:240,column:17},end:{line:240,column:30}},"106":{start:{line:241,column:3},end:{line:241,column:29}},"107":{start:{line:244,column:3},end:{line:244,column:44}},"108":{start:{line:244,column:17},end:{line:244,column:44}},"109":{start:{line:245,column:3},end:{line:245,column:43}},"110":{start:{line:246,column:3},end:{line:246,column:18}},"111":{start:{line:249,column:3},end:{line:270,column:4}},"112":{start:{line:250,column:4},end:{line:261,column:5}},"113":{start:{line:251,column:5},end:{line:251,column:28}},"114":{start:{line:253,column:5},end:{line:255,column:6}},"115":{start:{line:254,column:6},end:{line:254,column:33}},"116":{start:{line:257,column:5},end:{line:257,column:37}},"117":{start:{line:258,column:5},end:{line:258,column:18}},"118":{start:{line:259,column:5},end:{line:259,column:32}},"119":{start:{line:260,column:5},end:{line:260,column:61}},"120":{start:{line:262,column:10},end:{line:270,column:4}},"121":{start:{line:263,column:4},end:{line:263,column:19}},"122":{start:{line:265,column:4},end:{line:267,column:7}},"123":{start:{line:266,column:5},end:{line:266,column:21}},"124":{start:{line:269,column:4},end:{line:269,column:19}},"125":{start:{line:273,column:3},end:{line:273,column:23}},"126":{start:{line:273,column:16},end:{line:273,column:23}},"127":{start:{line:274,column:3},end:{line:274,column:27}},"128":{start:{line:275,column:3},end:{line:275,column:18}},"129":{start:{line:278,column:3},end:{line:278,column:28}},"130":{start:{line:279,column:3},end:{line:279,column:19}},"131":{start:{line:282,column:3},end:{line:282,column:39}},"132":{start:{line:282,column:17},end:{line:282,column:39}},"133":{start:{line:283,column:3},end:{line:283,column:42}},"134":{start:{line:283,column:18},end:{line:283,column:42}},"135":{start:{line:289,column:20},end:{line:289,column:22}},"136":{start:{line:290,column:18},end:{line:290,column:41}},"137":{start:{line:291,column:31},end:{line:291,column:38}},"138":{start:{line:292,column:23},end:{line:292,column:30}},"139":{start:{line:293,column:31},end:{line:293,column:38}},"140":{start:{line:296,column:2},end:{line:298,column:3}},"141":{start:{line:297,column:3},end:{line:297,column:19}},"142":{start:{line:302,column:2},end:{line:302,column:18}},"143":{start:{line:306,column:2},end:{line:308,column:3}},"144":{start:{line:307,column:3},end:{line:307,column:19}},"145":{start:{line:312,column:2},end:{line:312,column:27}},"146":{start:{line:316,column:2},end:{line:316,column:28}},"147":{start:{line:319,column:1},end:{line:321,column:4}},"148":{start:{line:320,column:2},end:{line:320,column:63}},"149":{start:{line:323,column:1},end:{line:325,column:4}},"150":{start:{line:324,column:2},end:{line:324,column:46}},"151":{start:{line:327,column:33},end:{line:327,column:40}},"152":{start:{line:329,column:1},end:{line:334,column:3}},"153":{start:{line:330,column:2},end:{line:330,column:83}},"154":{start:{line:330,column:32},end:{line:330,column:83}},"155":{start:{line:331,column:2},end:{line:331,column:62}},"156":{start:{line:331,column:25},end:{line:331,column:62}},"157":{start:{line:332,column:2},end:{line:332,column:86}},"158":{start:{line:332,column:33},end:{line:332,column:86}},"159":{start:{line:333,column:2},end:{line:333,column:72}},"160":{start:{line:333,column:28},end:{line:333,column:72}},"161":{start:{line:336,column:1},end:{line:344,column:3}},"162":{start:{line:337,column:2},end:{line:343,column:3}},"163":{start:{line:338,column:3},end:{line:342,column:4}},"164":{start:{line:338,column:6},end:{line:342,column:4}},"165":{start:{line:339,column:4},end:{line:339,column:44}},"166":{start:{line:341,column:4},end:{line:341,column:48}},"167":{start:{line:346,column:1},end:{line:359,column:3}},"168":{start:{line:364,column:2},end:{line:364,column:10}},"169":{start:{line:365,column:2},end:{line:365,column:111}}},fnMap:{"0":{name:"create_if_block",decl:{start:{line:33,column:9},end:{line:33,column:24}},loc:{start:{line:33,column:30},end:{line:124,column:1}},line:33},"1":{name:"(anonymous_1)",decl:{start:{line:84,column:35},end:{line:84,column:36}},loc:{start:{line:84,column:41},end:{line:86,column:5}},line:84},"2":{name:"(anonymous_2)",decl:{start:{line:102,column:23},end:{line:102,column:24}},loc:{start:{line:102,column:29},end:{line:105,column:4}},line:102},"3":{name:"create_if_block_1",decl:{start:{line:127,column:9},end:{line:127,column:26}},loc:{start:{line:127,column:32},end:{line:170,column:1}},line:127},"4":{name:"create_default_slot_1",decl:{start:{line:173,column:9},end:{line:173,column:30}},loc:{start:{line:173,column:36},end:{line:187,column:1}},line:173},"5":{name:"create_default_slot",decl:{start:{line:190,column:9},end:{line:190,column:28}},loc:{start:{line:190,column:34},end:{line:231,column:1}},line:190},"6":{name:"create_fragment",decl:{start:{line:233,column:9},end:{line:233,column:24}},loc:{start:{line:233,column:30},end:{line:286,column:1}},line:233},"7":{name:"(anonymous_7)",decl:{start:{line:265,column:35},end:{line:265,column:36}},loc:{start:{line:265,column:41},end:{line:267,column:5}},line:265},"8":{name:"instance",decl:{start:{line:288,column:9},end:{line:288,column:17}},loc:{start:{line:288,column:49},end:{line:360,column:1}},line:288},"9":{name:"overlayClick",decl:{start:{line:295,column:10},end:{line:295,column:22}},loc:{start:{line:295,column:26},end:{line:299,column:2}},line:295},"10":{name:"closeButtonClick",decl:{start:{line:301,column:10},end:{line:301,column:26}},loc:{start:{line:301,column:29},end:{line:303,column:2}},line:301},"11":{name:"closeOverlay",decl:{start:{line:305,column:10},end:{line:305,column:22}},loc:{start:{line:305,column:26},end:{line:309,column:2}},line:305},"12":{name:"rejectOverlay",decl:{start:{line:311,column:10},end:{line:311,column:23}},loc:{start:{line:311,column:35},end:{line:313,column:2}},line:311},"13":{name:"resolveOverlay",decl:{start:{line:315,column:10},end:{line:315,column:24}},loc:{start:{line:315,column:36},end:{line:317,column:2}},line:315},"14":{name:"(anonymous_14)",decl:{start:{line:319,column:9},end:{line:319,column:10}},loc:{start:{line:319,column:15},end:{line:321,column:2}},line:319},"15":{name:"(anonymous_15)",decl:{start:{line:323,column:11},end:{line:323,column:12}},loc:{start:{line:323,column:17},end:{line:325,column:2}},line:323},"16":{name:"(anonymous_16)",decl:{start:{line:329,column:15},end:{line:329,column:16}},loc:{start:{line:329,column:26},end:{line:334,column:2}},line:329},"17":{name:"(anonymous_17)",decl:{start:{line:336,column:20},end:{line:336,column:21}},loc:{start:{line:336,column:26},end:{line:344,column:2}},line:336},"18":{name:"(anonymous_18)",decl:{start:{line:363,column:1},end:{line:363,column:2}},loc:{start:{line:363,column:22},end:{line:366,column:2}},line:363}},branchMap:{"0":{loc:{start:{line:40,column:32},end:{line:40,column:64}},type:"binary-expr",locations:[{start:{line:40,column:32},end:{line:40,column:38}},{start:{line:40,column:42},end:{line:40,column:64}}],line:40},"1":{loc:{start:{line:47,column:3},end:{line:47,column:30}},type:"if",locations:[{start:{line:47,column:3},end:{line:47,column:30}},{start:{line:47,column:3},end:{line:47,column:30}}],line:47},"2":{loc:{start:{line:50,column:3},end:{line:50,column:38}},type:"if",locations:[{start:{line:50,column:3},end:{line:50,column:38}},{start:{line:50,column:3},end:{line:50,column:38}}],line:50},"3":{loc:{start:{line:55,column:3},end:{line:55,column:39}},type:"if",locations:[{start:{line:55,column:3},end:{line:55,column:39}},{start:{line:55,column:3},end:{line:55,column:39}}],line:55},"4":{loc:{start:{line:59,column:3},end:{line:61,column:4}},type:"if",locations:[{start:{line:59,column:3},end:{line:61,column:4}},{start:{line:59,column:3},end:{line:61,column:4}}],line:59},"5":{loc:{start:{line:64,column:3},end:{line:64,column:26}},type:"if",locations:[{start:{line:64,column:3},end:{line:64,column:26}},{start:{line:64,column:3},end:{line:64,column:26}}],line:64},"6":{loc:{start:{line:68,column:3},end:{line:89,column:4}},type:"if",locations:[{start:{line:68,column:3},end:{line:89,column:4}},{start:{line:68,column:3},end:{line:89,column:4}}],line:68},"7":{loc:{start:{line:69,column:4},end:{line:80,column:5}},type:"if",locations:[{start:{line:69,column:4},end:{line:80,column:5}},{start:{line:69,column:4},end:{line:80,column:5}}],line:69},"8":{loc:{start:{line:72,column:5},end:{line:74,column:6}},type:"if",locations:[{start:{line:72,column:5},end:{line:74,column:6}},{start:{line:72,column:5},end:{line:74,column:6}}],line:72},"9":{loc:{start:{line:81,column:10},end:{line:89,column:4}},type:"if",locations:[{start:{line:81,column:10},end:{line:89,column:4}},{start:{line:81,column:10},end:{line:89,column:4}}],line:81},"10":{loc:{start:{line:91,column:3},end:{line:95,column:4}},type:"if",locations:[{start:{line:91,column:3},end:{line:95,column:4}},{start:{line:91,column:3},end:{line:95,column:4}}],line:91},"11":{loc:{start:{line:92,column:4},end:{line:94,column:5}},type:"if",locations:[{start:{line:92,column:4},end:{line:94,column:5}},{start:{line:92,column:4},end:{line:94,column:5}}],line:92},"12":{loc:{start:{line:92,column:8},end:{line:92,column:50}},type:"binary-expr",locations:[{start:{line:92,column:8},end:{line:92,column:22}},{start:{line:92,column:26},end:{line:92,column:50}}],line:92},"13":{loc:{start:{line:98,column:3},end:{line:98,column:23}},type:"if",locations:[{start:{line:98,column:3},end:{line:98,column:23}},{start:{line:98,column:3},end:{line:98,column:23}}],line:98},"14":{loc:{start:{line:103,column:4},end:{line:103,column:95}},type:"if",locations:[{start:{line:103,column:4},end:{line:103,column:95}},{start:{line:103,column:4},end:{line:103,column:95}}],line:103},"15":{loc:{start:{line:112,column:3},end:{line:112,column:95}},type:"if",locations:[{start:{line:112,column:3},end:{line:112,column:95}},{start:{line:112,column:3},end:{line:112,column:95}}],line:112},"16":{loc:{start:{line:117,column:3},end:{line:117,column:30}},type:"if",locations:[{start:{line:117,column:3},end:{line:117,column:30}},{start:{line:117,column:3},end:{line:117,column:30}}],line:117},"17":{loc:{start:{line:118,column:3},end:{line:118,column:30}},type:"if",locations:[{start:{line:118,column:3},end:{line:118,column:30}},{start:{line:118,column:3},end:{line:118,column:30}}],line:118},"18":{loc:{start:{line:119,column:3},end:{line:119,column:47}},type:"if",locations:[{start:{line:119,column:3},end:{line:119,column:47}},{start:{line:119,column:3},end:{line:119,column:47}}],line:119},"19":{loc:{start:{line:120,column:3},end:{line:120,column:57}},type:"if",locations:[{start:{line:120,column:3},end:{line:120,column:57}},{start:{line:120,column:3},end:{line:120,column:57}}],line:120},"20":{loc:{start:{line:120,column:7},end:{line:120,column:34}},type:"binary-expr",locations:[{start:{line:120,column:7},end:{line:120,column:16}},{start:{line:120,column:20},end:{line:120,column:34}}],line:120},"21":{loc:{start:{line:151,column:3},end:{line:153,column:4}},type:"if",locations:[{start:{line:151,column:3},end:{line:153,column:4}},{start:{line:151,column:3},end:{line:153,column:4}}],line:151},"22":{loc:{start:{line:158,column:3},end:{line:158,column:23}},type:"if",locations:[{start:{line:158,column:3},end:{line:158,column:23}},{start:{line:158,column:3},end:{line:158,column:23}}],line:158},"23":{loc:{start:{line:184,column:3},end:{line:184,column:28}},type:"if",locations:[{start:{line:184,column:3},end:{line:184,column:28}},{start:{line:184,column:3},end:{line:184,column:28}}],line:184},"24":{loc:{start:{line:212,column:3},end:{line:214,column:4}},type:"if",locations:[{start:{line:212,column:3},end:{line:214,column:4}},{start:{line:212,column:3},end:{line:214,column:4}}],line:212},"25":{loc:{start:{line:219,column:3},end:{line:219,column:23}},type:"if",locations:[{start:{line:219,column:3},end:{line:219,column:23}},{start:{line:219,column:3},end:{line:219,column:23}}],line:219},"26":{loc:{start:{line:236,column:25},end:{line:236,column:55}},type:"binary-expr",locations:[{start:{line:236,column:25},end:{line:236,column:31}},{start:{line:236,column:35},end:{line:236,column:55}}],line:236},"27":{loc:{start:{line:240,column:3},end:{line:240,column:30}},type:"if",locations:[{start:{line:240,column:3},end:{line:240,column:30}},{start:{line:240,column:3},end:{line:240,column:30}}],line:240},"28":{loc:{start:{line:244,column:3},end:{line:244,column:44}},type:"if",locations:[{start:{line:244,column:3},end:{line:244,column:44}},{start:{line:244,column:3},end:{line:244,column:44}}],line:244},"29":{loc:{start:{line:249,column:3},end:{line:270,column:4}},type:"if",locations:[{start:{line:249,column:3},end:{line:270,column:4}},{start:{line:249,column:3},end:{line:270,column:4}}],line:249},"30":{loc:{start:{line:250,column:4},end:{line:261,column:5}},type:"if",locations:[{start:{line:250,column:4},end:{line:261,column:5}},{start:{line:250,column:4},end:{line:261,column:5}}],line:250},"31":{loc:{start:{line:253,column:5},end:{line:255,column:6}},type:"if",locations:[{start:{line:253,column:5},end:{line:255,column:6}},{start:{line:253,column:5},end:{line:255,column:6}}],line:253},"32":{loc:{start:{line:262,column:10},end:{line:270,column:4}},type:"if",locations:[{start:{line:262,column:10},end:{line:270,column:4}},{start:{line:262,column:10},end:{line:270,column:4}}],line:262},"33":{loc:{start:{line:273,column:3},end:{line:273,column:23}},type:"if",locations:[{start:{line:273,column:3},end:{line:273,column:23}},{start:{line:273,column:3},end:{line:273,column:23}}],line:273},"34":{loc:{start:{line:282,column:3},end:{line:282,column:39}},type:"if",locations:[{start:{line:282,column:3},end:{line:282,column:39}},{start:{line:282,column:3},end:{line:282,column:39}}],line:282},"35":{loc:{start:{line:283,column:3},end:{line:283,column:42}},type:"if",locations:[{start:{line:283,column:3},end:{line:283,column:42}},{start:{line:283,column:3},end:{line:283,column:42}}],line:283},"36":{loc:{start:{line:291,column:7},end:{line:291,column:26}},type:"default-arg",locations:[{start:{line:291,column:21},end:{line:291,column:26}}],line:291},"37":{loc:{start:{line:292,column:7},end:{line:292,column:18}},type:"default-arg",locations:[{start:{line:292,column:14},end:{line:292,column:18}}],line:292},"38":{loc:{start:{line:293,column:7},end:{line:293,column:26}},type:"default-arg",locations:[{start:{line:293,column:22},end:{line:293,column:26}}],line:293},"39":{loc:{start:{line:296,column:2},end:{line:298,column:3}},type:"if",locations:[{start:{line:296,column:2},end:{line:298,column:3}},{start:{line:296,column:2},end:{line:298,column:3}}],line:296},"40":{loc:{start:{line:306,column:2},end:{line:308,column:3}},type:"if",locations:[{start:{line:306,column:2},end:{line:308,column:3}},{start:{line:306,column:2},end:{line:308,column:3}}],line:306},"41":{loc:{start:{line:306,column:6},end:{line:306,column:76}},type:"binary-expr",locations:[{start:{line:306,column:6},end:{line:306,column:22}},{start:{line:306,column:26},end:{line:306,column:76}}],line:306},"42":{loc:{start:{line:311,column:24},end:{line:311,column:33}},type:"default-arg",locations:[{start:{line:311,column:31},end:{line:311,column:33}}],line:311},"43":{loc:{start:{line:315,column:25},end:{line:315,column:34}},type:"default-arg",locations:[{start:{line:315,column:32},end:{line:315,column:34}}],line:315},"44":{loc:{start:{line:327,column:7},end:{line:327,column:19}},type:"default-arg",locations:[{start:{line:327,column:17},end:{line:327,column:19}}],line:327},"45":{loc:{start:{line:330,column:2},end:{line:330,column:83}},type:"if",locations:[{start:{line:330,column:2},end:{line:330,column:83}},{start:{line:330,column:2},end:{line:330,column:83}}],line:330},"46":{loc:{start:{line:331,column:2},end:{line:331,column:62}},type:"if",locations:[{start:{line:331,column:2},end:{line:331,column:62}},{start:{line:331,column:2},end:{line:331,column:62}}],line:331},"47":{loc:{start:{line:332,column:2},end:{line:332,column:86}},type:"if",locations:[{start:{line:332,column:2},end:{line:332,column:86}},{start:{line:332,column:2},end:{line:332,column:86}}],line:332},"48":{loc:{start:{line:333,column:2},end:{line:333,column:72}},type:"if",locations:[{start:{line:333,column:2},end:{line:333,column:72}},{start:{line:333,column:2},end:{line:333,column:72}}],line:333},"49":{loc:{start:{line:337,column:2},end:{line:343,column:3}},type:"if",locations:[{start:{line:337,column:2},end:{line:343,column:3}},{start:{line:337,column:2},end:{line:343,column:3}}],line:337},"50":{loc:{start:{line:338,column:6},end:{line:342,column:4}},type:"if",locations:[{start:{line:338,column:6},end:{line:342,column:4}},{start:{line:338,column:6},end:{line:342,column:4}}],line:338}},s:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0,"19":0,"20":0,"21":0,"22":0,"23":0,"24":0,"25":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"32":0,"33":0,"34":0,"35":0,"36":0,"37":0,"38":0,"39":0,"40":0,"41":0,"42":0,"43":0,"44":0,"45":0,"46":0,"47":0,"48":0,"49":0,"50":0,"51":0,"52":0,"53":0,"54":0,"55":0,"56":0,"57":0,"58":0,"59":0,"60":0,"61":0,"62":0,"63":0,"64":0,"65":0,"66":0,"67":0,"68":0,"69":0,"70":0,"71":0,"72":0,"73":0,"74":0,"75":0,"76":0,"77":0,"78":0,"79":0,"80":0,"81":0,"82":0,"83":0,"84":0,"85":0,"86":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"95":0,"96":0,"97":0,"98":0,"99":0,"100":0,"101":0,"102":0,"103":0,"104":0,"105":0,"106":0,"107":0,"108":0,"109":0,"110":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"118":0,"119":0,"120":0,"121":0,"122":0,"123":0,"124":0,"125":0,"126":0,"127":0,"128":0,"129":0,"130":0,"131":0,"132":0,"133":0,"134":0,"135":0,"136":0,"137":0,"138":0,"139":0,"140":0,"141":0,"142":0,"143":0,"144":0,"145":0,"146":0,"147":0,"148":0,"149":0,"150":0,"151":0,"152":0,"153":0,"154":0,"155":0,"156":0,"157":0,"158":0,"159":0,"160":0,"161":0,"162":0,"163":0,"164":0,"165":0,"166":0,"167":0,"168":0,"169":0},f:{"0":0,"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0,"13":0,"14":0,"15":0,"16":0,"17":0,"18":0},b:{"0":[0,0],"1":[0,0],"2":[0,0],"3":[0,0],"4":[0,0],"5":[0,0],"6":[0,0],"7":[0,0],"8":[0,0],"9":[0,0],"10":[0,0],"11":[0,0],"12":[0,0],"13":[0,0],"14":[0,0],"15":[0,0],"16":[0,0],"17":[0,0],"18":[0,0],"19":[0,0],"20":[0,0],"21":[0,0],"22":[0,0],"23":[0,0],"24":[0,0],"25":[0,0],"26":[0,0],"27":[0,0],"28":[0,0],"29":[0,0],"30":[0,0],"31":[0,0],"32":[0,0],"33":[0,0],"34":[0,0],"35":[0,0],"36":[0],"37":[0],"38":[0],"39":[0,0],"40":[0,0],"41":[0,0],"42":[0],"43":[0],"44":[0],"45":[0,0],"46":[0,0],"47":[0,0],"48":[0,0],"49":[0,0],"50":[0,0]},_coverageSchema:"332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();function create_if_block$1(ctx){cov_1fse77i0ld.f[0]++;let div;let t;let main;let div_transition;let current;let dispose;let if_block=(cov_1fse77i0ld.s[0]++,(cov_1fse77i0ld.b[0][0]++,ctx[0])&&(cov_1fse77i0ld.b[0][1]++,create_if_block_1(ctx)));const default_slot_template=(cov_1fse77i0ld.s[1]++,ctx[10].default);const default_slot=(cov_1fse77i0ld.s[2]++,create_slot(default_slot_template,ctx,ctx[11],null));cov_1fse77i0ld.s[3]++;return {c(){cov_1fse77i0ld.s[4]++;div=element("div");cov_1fse77i0ld.s[5]++;if(if_block){cov_1fse77i0ld.b[1][0]++;cov_1fse77i0ld.s[6]++;if_block.c();}else {cov_1fse77i0ld.b[1][1]++;}cov_1fse77i0ld.s[7]++;t=space();cov_1fse77i0ld.s[8]++;main=element("main");cov_1fse77i0ld.s[9]++;if(default_slot){cov_1fse77i0ld.b[2][0]++;cov_1fse77i0ld.s[10]++;default_slot.c();}else {cov_1fse77i0ld.b[2][1]++;}cov_1fse77i0ld.s[11]++;attr(div,"class","not-overlay svelte-1y5np01");},m(target,anchor,remount){cov_1fse77i0ld.s[12]++;insert(target,div,anchor);cov_1fse77i0ld.s[13]++;if(if_block){cov_1fse77i0ld.b[3][0]++;cov_1fse77i0ld.s[14]++;if_block.m(div,null);}else {cov_1fse77i0ld.b[3][1]++;}cov_1fse77i0ld.s[15]++;append(div,t);cov_1fse77i0ld.s[16]++;append(div,main);cov_1fse77i0ld.s[17]++;if(default_slot){cov_1fse77i0ld.b[4][0]++;cov_1fse77i0ld.s[18]++;default_slot.m(main,null);}else {cov_1fse77i0ld.b[4][1]++;}cov_1fse77i0ld.s[19]++;current=true;cov_1fse77i0ld.s[20]++;if(remount){cov_1fse77i0ld.b[5][0]++;cov_1fse77i0ld.s[21]++;dispose();}else {cov_1fse77i0ld.b[5][1]++;}cov_1fse77i0ld.s[22]++;dispose=listen(div,"click",ctx[2]);},p(ctx,dirty){cov_1fse77i0ld.s[23]++;if(ctx[0]){cov_1fse77i0ld.b[6][0]++;cov_1fse77i0ld.s[24]++;if(if_block){cov_1fse77i0ld.b[7][0]++;cov_1fse77i0ld.s[25]++;if_block.p(ctx,dirty);cov_1fse77i0ld.s[26]++;if(dirty&1){cov_1fse77i0ld.b[8][0]++;cov_1fse77i0ld.s[27]++;transition_in(if_block,1);}else {cov_1fse77i0ld.b[8][1]++;}}else {cov_1fse77i0ld.b[7][1]++;cov_1fse77i0ld.s[28]++;if_block=create_if_block_1(ctx);cov_1fse77i0ld.s[29]++;if_block.c();cov_1fse77i0ld.s[30]++;transition_in(if_block,1);cov_1fse77i0ld.s[31]++;if_block.m(div,t);}}else {cov_1fse77i0ld.b[6][1]++;cov_1fse77i0ld.s[32]++;if(if_block){cov_1fse77i0ld.b[9][0]++;cov_1fse77i0ld.s[33]++;group_outros();cov_1fse77i0ld.s[34]++;transition_out(if_block,1,1,()=>{cov_1fse77i0ld.f[1]++;cov_1fse77i0ld.s[35]++;if_block=null;});cov_1fse77i0ld.s[36]++;check_outros();}else {cov_1fse77i0ld.b[9][1]++;}}cov_1fse77i0ld.s[37]++;if(default_slot){cov_1fse77i0ld.b[10][0]++;cov_1fse77i0ld.s[38]++;if((cov_1fse77i0ld.b[12][0]++,default_slot.p)&&(cov_1fse77i0ld.b[12][1]++,dirty&2048)){cov_1fse77i0ld.b[11][0]++;cov_1fse77i0ld.s[39]++;default_slot.p(get_slot_context(default_slot_template,ctx,ctx[11],null),get_slot_changes(default_slot_template,ctx[11],dirty,null));}else {cov_1fse77i0ld.b[11][1]++;}}else {cov_1fse77i0ld.b[10][1]++;}},i(local){cov_1fse77i0ld.s[40]++;if(current){cov_1fse77i0ld.b[13][0]++;cov_1fse77i0ld.s[41]++;return;}else {cov_1fse77i0ld.b[13][1]++;}cov_1fse77i0ld.s[42]++;transition_in(if_block);cov_1fse77i0ld.s[43]++;transition_in(default_slot,local);cov_1fse77i0ld.s[44]++;add_render_callback(()=>{cov_1fse77i0ld.f[2]++;cov_1fse77i0ld.s[45]++;if(!div_transition){cov_1fse77i0ld.b[14][0]++;cov_1fse77i0ld.s[46]++;div_transition=create_bidirectional_transition(div,fade,{},true);}else {cov_1fse77i0ld.b[14][1]++;}cov_1fse77i0ld.s[47]++;div_transition.run(1);});cov_1fse77i0ld.s[48]++;current=true;},o(local){cov_1fse77i0ld.s[49]++;transition_out(if_block);cov_1fse77i0ld.s[50]++;transition_out(default_slot,local);cov_1fse77i0ld.s[51]++;if(!div_transition){cov_1fse77i0ld.b[15][0]++;cov_1fse77i0ld.s[52]++;div_transition=create_bidirectional_transition(div,fade,{},false);}else {cov_1fse77i0ld.b[15][1]++;}cov_1fse77i0ld.s[53]++;div_transition.run(0);cov_1fse77i0ld.s[54]++;current=false;},d(detaching){cov_1fse77i0ld.s[55]++;if(detaching){cov_1fse77i0ld.b[16][0]++;cov_1fse77i0ld.s[56]++;detach(div);}else {cov_1fse77i0ld.b[16][1]++;}cov_1fse77i0ld.s[57]++;if(if_block){cov_1fse77i0ld.b[17][0]++;cov_1fse77i0ld.s[58]++;if_block.d();}else {cov_1fse77i0ld.b[17][1]++;}cov_1fse77i0ld.s[59]++;if(default_slot){cov_1fse77i0ld.b[18][0]++;cov_1fse77i0ld.s[60]++;default_slot.d(detaching);}else {cov_1fse77i0ld.b[18][1]++;}cov_1fse77i0ld.s[61]++;if((cov_1fse77i0ld.b[20][0]++,detaching)&&(cov_1fse77i0ld.b[20][1]++,div_transition)){cov_1fse77i0ld.b[19][0]++;cov_1fse77i0ld.s[62]++;div_transition.end();}else {cov_1fse77i0ld.b[19][1]++;}cov_1fse77i0ld.s[63]++;dispose();}};}function create_if_block_1(ctx){cov_1fse77i0ld.f[3]++;let current;const iconbutton=(cov_1fse77i0ld.s[64]++,new IconButton({props:{class:"close-btn",$$slots:{default:[create_default_slot]},$$scope:{ctx}}}));cov_1fse77i0ld.s[65]++;iconbutton.$on("click",ctx[3]);cov_1fse77i0ld.s[66]++;return {c(){cov_1fse77i0ld.s[67]++;create_component(iconbutton.$$.fragment);},m(target,anchor){cov_1fse77i0ld.s[68]++;mount_component(iconbutton,target,anchor);cov_1fse77i0ld.s[69]++;current=true;},p(ctx,dirty){const iconbutton_changes=(cov_1fse77i0ld.s[70]++,{});cov_1fse77i0ld.s[71]++;if(dirty&2048){cov_1fse77i0ld.b[21][0]++;cov_1fse77i0ld.s[72]++;iconbutton_changes.$$scope={dirty,ctx};}else {cov_1fse77i0ld.b[21][1]++;}cov_1fse77i0ld.s[73]++;iconbutton.$set(iconbutton_changes);},i(local){cov_1fse77i0ld.s[74]++;if(current){cov_1fse77i0ld.b[22][0]++;cov_1fse77i0ld.s[75]++;return;}else {cov_1fse77i0ld.b[22][1]++;}cov_1fse77i0ld.s[76]++;transition_in(iconbutton.$$.fragment,local);cov_1fse77i0ld.s[77]++;current=true;},o(local){cov_1fse77i0ld.s[78]++;transition_out(iconbutton.$$.fragment,local);cov_1fse77i0ld.s[79]++;current=false;},d(detaching){cov_1fse77i0ld.s[80]++;destroy_component(iconbutton,detaching);}};}function create_default_slot_1(ctx){cov_1fse77i0ld.f[4]++;let t;cov_1fse77i0ld.s[81]++;return {c(){cov_1fse77i0ld.s[82]++;t=text("close");},m(target,anchor){cov_1fse77i0ld.s[83]++;insert(target,t,anchor);},d(detaching){cov_1fse77i0ld.s[84]++;if(detaching){cov_1fse77i0ld.b[23][0]++;cov_1fse77i0ld.s[85]++;detach(t);}else {cov_1fse77i0ld.b[23][1]++;}}};}function create_default_slot(ctx){cov_1fse77i0ld.f[5]++;let current;const icon=(cov_1fse77i0ld.s[86]++,new Icon({props:{class:"material-icons",$$slots:{default:[create_default_slot_1]},$$scope:{ctx}}}));cov_1fse77i0ld.s[87]++;return {c(){cov_1fse77i0ld.s[88]++;create_component(icon.$$.fragment);},m(target,anchor){cov_1fse77i0ld.s[89]++;mount_component(icon,target,anchor);cov_1fse77i0ld.s[90]++;current=true;},p(ctx,dirty){const icon_changes=(cov_1fse77i0ld.s[91]++,{});cov_1fse77i0ld.s[92]++;if(dirty&2048){cov_1fse77i0ld.b[24][0]++;cov_1fse77i0ld.s[93]++;icon_changes.$$scope={dirty,ctx};}else {cov_1fse77i0ld.b[24][1]++;}cov_1fse77i0ld.s[94]++;icon.$set(icon_changes);},i(local){cov_1fse77i0ld.s[95]++;if(current){cov_1fse77i0ld.b[25][0]++;cov_1fse77i0ld.s[96]++;return;}else {cov_1fse77i0ld.b[25][1]++;}cov_1fse77i0ld.s[97]++;transition_in(icon.$$.fragment,local);cov_1fse77i0ld.s[98]++;current=true;},o(local){cov_1fse77i0ld.s[99]++;transition_out(icon.$$.fragment,local);cov_1fse77i0ld.s[100]++;current=false;},d(detaching){cov_1fse77i0ld.s[101]++;destroy_component(icon,detaching);}};}function create_fragment$2(ctx){cov_1fse77i0ld.f[6]++;let if_block_anchor;let current;let if_block=(cov_1fse77i0ld.s[102]++,(cov_1fse77i0ld.b[26][0]++,ctx[1])&&(cov_1fse77i0ld.b[26][1]++,create_if_block$1(ctx)));cov_1fse77i0ld.s[103]++;return {c(){cov_1fse77i0ld.s[104]++;if(if_block){cov_1fse77i0ld.b[27][0]++;cov_1fse77i0ld.s[105]++;if_block.c();}else {cov_1fse77i0ld.b[27][1]++;}cov_1fse77i0ld.s[106]++;if_block_anchor=empty();},m(target,anchor){cov_1fse77i0ld.s[107]++;if(if_block){cov_1fse77i0ld.b[28][0]++;cov_1fse77i0ld.s[108]++;if_block.m(target,anchor);}else {cov_1fse77i0ld.b[28][1]++;}cov_1fse77i0ld.s[109]++;insert(target,if_block_anchor,anchor);cov_1fse77i0ld.s[110]++;current=true;},p(ctx,[dirty]){cov_1fse77i0ld.s[111]++;if(ctx[1]){cov_1fse77i0ld.b[29][0]++;cov_1fse77i0ld.s[112]++;if(if_block){cov_1fse77i0ld.b[30][0]++;cov_1fse77i0ld.s[113]++;if_block.p(ctx,dirty);cov_1fse77i0ld.s[114]++;if(dirty&2){cov_1fse77i0ld.b[31][0]++;cov_1fse77i0ld.s[115]++;transition_in(if_block,1);}else {cov_1fse77i0ld.b[31][1]++;}}else {cov_1fse77i0ld.b[30][1]++;cov_1fse77i0ld.s[116]++;if_block=create_if_block$1(ctx);cov_1fse77i0ld.s[117]++;if_block.c();cov_1fse77i0ld.s[118]++;transition_in(if_block,1);cov_1fse77i0ld.s[119]++;if_block.m(if_block_anchor.parentNode,if_block_anchor);}}else {cov_1fse77i0ld.b[29][1]++;cov_1fse77i0ld.s[120]++;if(if_block){cov_1fse77i0ld.b[32][0]++;cov_1fse77i0ld.s[121]++;group_outros();cov_1fse77i0ld.s[122]++;transition_out(if_block,1,1,()=>{cov_1fse77i0ld.f[7]++;cov_1fse77i0ld.s[123]++;if_block=null;});cov_1fse77i0ld.s[124]++;check_outros();}else {cov_1fse77i0ld.b[32][1]++;}}},i(local){cov_1fse77i0ld.s[125]++;if(current){cov_1fse77i0ld.b[33][0]++;cov_1fse77i0ld.s[126]++;return;}else {cov_1fse77i0ld.b[33][1]++;}cov_1fse77i0ld.s[127]++;transition_in(if_block);cov_1fse77i0ld.s[128]++;current=true;},o(local){cov_1fse77i0ld.s[129]++;transition_out(if_block);cov_1fse77i0ld.s[130]++;current=false;},d(detaching){cov_1fse77i0ld.s[131]++;if(if_block){cov_1fse77i0ld.b[34][0]++;cov_1fse77i0ld.s[132]++;if_block.d(detaching);}else {cov_1fse77i0ld.b[34][1]++;}cov_1fse77i0ld.s[133]++;if(detaching){cov_1fse77i0ld.b[35][0]++;cov_1fse77i0ld.s[134]++;detach(if_block_anchor);}else {cov_1fse77i0ld.b[35][1]++;}}};}function instance$2($$self,$$props,$$invalidate){cov_1fse77i0ld.f[8]++;let overflowSave=(cov_1fse77i0ld.s[135]++,"");const dispatch=(cov_1fse77i0ld.s[136]++,createEventDispatcher());let{closeButton=(cov_1fse77i0ld.b[36][0]++,false)}=(cov_1fse77i0ld.s[137]++,$$props);let{show=(cov_1fse77i0ld.b[37][0]++,true)}=(cov_1fse77i0ld.s[138]++,$$props);let{closeOnClick=(cov_1fse77i0ld.b[38][0]++,true)}=(cov_1fse77i0ld.s[139]++,$$props);function overlayClick(e){cov_1fse77i0ld.f[9]++;cov_1fse77i0ld.s[140]++;if(closeOnClick){cov_1fse77i0ld.b[39][0]++;cov_1fse77i0ld.s[141]++;closeOverlay(e);}else {cov_1fse77i0ld.b[39][1]++;}}function closeButtonClick(){cov_1fse77i0ld.f[10]++;cov_1fse77i0ld.s[142]++;rejectOverlay();}function closeOverlay(e){cov_1fse77i0ld.f[11]++;cov_1fse77i0ld.s[143]++;if((cov_1fse77i0ld.b[41][0]++,e.originalTarget)&&(cov_1fse77i0ld.b[41][1]++,e.originalTarget.classList.contains("not-overlay"))){cov_1fse77i0ld.b[40][0]++;cov_1fse77i0ld.s[144]++;rejectOverlay();}else {cov_1fse77i0ld.b[40][1]++;}}function rejectOverlay(data=(cov_1fse77i0ld.b[42][0]++,{})){cov_1fse77i0ld.f[12]++;cov_1fse77i0ld.s[145]++;dispatch("reject",data);}function resolveOverlay(data=(cov_1fse77i0ld.b[43][0]++,{})){cov_1fse77i0ld.f[13]++;cov_1fse77i0ld.s[146]++;dispatch("resolve",data);}cov_1fse77i0ld.s[147]++;onMount(()=>{cov_1fse77i0ld.f[14]++;cov_1fse77i0ld.s[148]++;$$invalidate(5,overflowSave=document.body.style.overflow);});cov_1fse77i0ld.s[149]++;onDestroy(()=>{cov_1fse77i0ld.f[15]++;cov_1fse77i0ld.s[150]++;document.body.style.overflow=overflowSave;});let{$$slots=(cov_1fse77i0ld.b[44][0]++,{}),$$scope}=(cov_1fse77i0ld.s[151]++,$$props);cov_1fse77i0ld.s[152]++;$$self.$set=$$props=>{cov_1fse77i0ld.f[16]++;cov_1fse77i0ld.s[153]++;if("closeButton"in $$props){cov_1fse77i0ld.b[45][0]++;cov_1fse77i0ld.s[154]++;$$invalidate(0,closeButton=$$props.closeButton);}else {cov_1fse77i0ld.b[45][1]++;}cov_1fse77i0ld.s[155]++;if("show"in $$props){cov_1fse77i0ld.b[46][0]++;cov_1fse77i0ld.s[156]++;$$invalidate(1,show=$$props.show);}else {cov_1fse77i0ld.b[46][1]++;}cov_1fse77i0ld.s[157]++;if("closeOnClick"in $$props){cov_1fse77i0ld.b[47][0]++;cov_1fse77i0ld.s[158]++;$$invalidate(4,closeOnClick=$$props.closeOnClick);}else {cov_1fse77i0ld.b[47][1]++;}cov_1fse77i0ld.s[159]++;if("$$scope"in $$props){cov_1fse77i0ld.b[48][0]++;cov_1fse77i0ld.s[160]++;$$invalidate(11,$$scope=$$props.$$scope);}else {cov_1fse77i0ld.b[48][1]++;}};cov_1fse77i0ld.s[161]++;$$self.$$.update=()=>{cov_1fse77i0ld.f[17]++;cov_1fse77i0ld.s[162]++;if($$self.$$.dirty&34){cov_1fse77i0ld.b[49][0]++;cov_1fse77i0ld.s[163]++;cov_1fse77i0ld.s[164]++;if(show){cov_1fse77i0ld.b[50][0]++;cov_1fse77i0ld.s[165]++;document.body.style.overflow="hidden";}else {cov_1fse77i0ld.b[50][1]++;cov_1fse77i0ld.s[166]++;document.body.style.overflow=overflowSave;}}else {cov_1fse77i0ld.b[49][1]++;}};cov_1fse77i0ld.s[167]++;return [closeButton,show,overlayClick,closeButtonClick,closeOnClick,overflowSave,dispatch,closeOverlay,rejectOverlay,resolveOverlay,$$slots,$$scope];}class Overlay extends(SvelteComponent){constructor(options){cov_1fse77i0ld.f[18]++;cov_1fse77i0ld.s[168]++;super();cov_1fse77i0ld.s[169]++;init(this,options,instance$2,create_fragment$2,safe_not_equal,{closeButton:0,show:1,closeOnClick:4});}}

  var cov_fx2ee67ur=function(){var path='/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.js',hash='5d3110cec810616331668fe15cd3a541f741c4d1',Function=function(){}.constructor,global=new Function('return this')(),gcv='__coverage__',coverageData={path:'/home/cypher/proj/not-lib/not-overlay/src/standalone/overlay.js',statementMap:{},fnMap:{},branchMap:{},s:{},f:{},b:{},_coverageSchema:'332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'},coverage=global[gcv]||(global[gcv]={});if(coverage[path]&&coverage[path].hash===hash){return coverage[path];}coverageData.hash=hash;return coverage[path]=coverageData;}();

  exports.OverlayComponent = Overlay;

  return exports;

}({}));
