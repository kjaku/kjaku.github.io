
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
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
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
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
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
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
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
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
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
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
            set_current_component(null);
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
    const outroing = new Set();
    let outros;
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
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
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
    /**
     * Base class for Svelte components. Used when dev=false.
     */
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
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.2' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/LabeledInput.svelte generated by Svelte v3.32.2 */

    const file = "src/LabeledInput.svelte";

    function create_fragment(ctx) {
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let input;
    	let div1_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(/*label*/ ctx[3]);
    			t1 = space();
    			div1 = element("div");
    			input = element("input");
    			attr_dev(div0, "class", "label svelte-ebu5mt");
    			add_location(div0, file, 8, 0, 125);
    			attr_dev(input, "min", /*min*/ ctx[4]);
    			input.readOnly = true;
    			attr_dev(input, "class", "svelte-ebu5mt");
    			add_location(input, file, 10, 2, 227);

    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(/*thisStep*/ ctx[1] === /*step*/ ctx[2]
    			? "currentStep"
    			: "unselectedStep") + " svelte-ebu5mt"));

    			add_location(div1, file, 9, 0, 158);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input);
    			set_input_value(input, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[5]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*label*/ 8) set_data_dev(t0, /*label*/ ctx[3]);

    			if (dirty & /*min*/ 16) {
    				attr_dev(input, "min", /*min*/ ctx[4]);
    			}

    			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}

    			if (dirty & /*thisStep, step*/ 6 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*thisStep*/ ctx[1] === /*step*/ ctx[2]
    			? "currentStep"
    			: "unselectedStep") + " svelte-ebu5mt"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("LabeledInput", slots, []);
    	let { thisStep } = $$props;
    	let { step } = $$props;
    	let { label } = $$props;
    	let { value } = $$props;
    	let { min = "0" } = $$props;
    	const writable_props = ["thisStep", "step", "label", "value", "min"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<LabeledInput> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ("thisStep" in $$props) $$invalidate(1, thisStep = $$props.thisStep);
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    		if ("label" in $$props) $$invalidate(3, label = $$props.label);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("min" in $$props) $$invalidate(4, min = $$props.min);
    	};

    	$$self.$capture_state = () => ({ thisStep, step, label, value, min });

    	$$self.$inject_state = $$props => {
    		if ("thisStep" in $$props) $$invalidate(1, thisStep = $$props.thisStep);
    		if ("step" in $$props) $$invalidate(2, step = $$props.step);
    		if ("label" in $$props) $$invalidate(3, label = $$props.label);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("min" in $$props) $$invalidate(4, min = $$props.min);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, thisStep, step, label, min, input_input_handler];
    }

    class LabeledInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance, create_fragment, safe_not_equal, {
    			thisStep: 1,
    			step: 2,
    			label: 3,
    			value: 0,
    			min: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "LabeledInput",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*thisStep*/ ctx[1] === undefined && !("thisStep" in props)) {
    			console.warn("<LabeledInput> was created without expected prop 'thisStep'");
    		}

    		if (/*step*/ ctx[2] === undefined && !("step" in props)) {
    			console.warn("<LabeledInput> was created without expected prop 'step'");
    		}

    		if (/*label*/ ctx[3] === undefined && !("label" in props)) {
    			console.warn("<LabeledInput> was created without expected prop 'label'");
    		}

    		if (/*value*/ ctx[0] === undefined && !("value" in props)) {
    			console.warn("<LabeledInput> was created without expected prop 'value'");
    		}
    	}

    	get thisStep() {
    		throw new Error("<LabeledInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set thisStep(value) {
    		throw new Error("<LabeledInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get step() {
    		throw new Error("<LabeledInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set step(value) {
    		throw new Error("<LabeledInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<LabeledInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<LabeledInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<LabeledInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<LabeledInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get min() {
    		throw new Error("<LabeledInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set min(value) {
    		throw new Error("<LabeledInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Numpad.svelte generated by Svelte v3.32.2 */

    const file$1 = "src/Numpad.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	child_ctx[4] = i;
    	return child_ctx;
    }

    // (7:2) {#each keys as key, i}
    function create_each_block(ctx) {
    	let button;
    	let t_value = /*key*/ ctx[2] + "";
    	let t;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			button = element("button");
    			t = text(t_value);
    			attr_dev(button, "class", "key svelte-1181qcn");
    			attr_dev(button, "i", /*i*/ ctx[4]);
    			add_location(button, file$1, 7, 4, 139);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, t);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*handleClick*/ ctx[0](/*key*/ ctx[2]))) /*handleClick*/ ctx[0](/*key*/ ctx[2]).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(7:2) {#each keys as key, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let main;
    	let each_value = /*keys*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(main, "class", "svelte-1181qcn");
    			add_location(main, file$1, 5, 0, 103);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*handleClick, keys*/ 3) {
    				each_value = /*keys*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(main, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Numpad", slots, []);
    	let { handleClick } = $$props;
    	const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, "<", 0, ">"];
    	const writable_props = ["handleClick"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Numpad> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("handleClick" in $$props) $$invalidate(0, handleClick = $$props.handleClick);
    	};

    	$$self.$capture_state = () => ({ handleClick, keys });

    	$$self.$inject_state = $$props => {
    		if ("handleClick" in $$props) $$invalidate(0, handleClick = $$props.handleClick);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [handleClick, keys];
    }

    class Numpad extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { handleClick: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Numpad",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*handleClick*/ ctx[0] === undefined && !("handleClick" in props)) {
    			console.warn("<Numpad> was created without expected prop 'handleClick'");
    		}
    	}

    	get handleClick() {
    		throw new Error("<Numpad>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set handleClick(value) {
    		throw new Error("<Numpad>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/Centered.svelte generated by Svelte v3.32.2 */

    const file$2 = "src/Centered.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_style(div, "--width", /*width*/ ctx[0]);
    			attr_dev(div, "class", "wrapper svelte-18lpsag");
    			add_location(div, file$2, 4, 0, 49);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
    				}
    			}

    			if (!current || dirty & /*width*/ 1) {
    				set_style(div, "--width", /*width*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Centered", slots, ['default']);
    	let { width = "100%" } = $$props;
    	const writable_props = ["width"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Centered> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ width });

    	$$self.$inject_state = $$props => {
    		if ("width" in $$props) $$invalidate(0, width = $$props.width);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [width, $$scope, slots];
    }

    class Centered extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { width: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Centered",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get width() {
    		throw new Error("<Centered>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Centered>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.32.2 */
    const file$3 = "src/App.svelte";

    // (48:0) <Centered width={600}>
    function create_default_slot(ctx) {
    	let h1;
    	let t1;
    	let div2;
    	let labeledinput0;
    	let t2;
    	let labeledinput1;
    	let t3;
    	let labeledinput2;
    	let t4;
    	let div0;
    	let t6;
    	let div1;
    	let t7;
    	let t8;
    	let numpad;
    	let current;

    	labeledinput0 = new LabeledInput({
    			props: {
    				thisStep: 0,
    				step: /*step*/ ctx[3],
    				label: "flat nr",
    				value: /*num*/ ctx[0]
    			},
    			$$inline: true
    		});

    	labeledinput1 = new LabeledInput({
    			props: {
    				thisStep: 1,
    				step: /*step*/ ctx[3],
    				label: "first flat nr",
    				value: /*firstFlat*/ ctx[1]
    			},
    			$$inline: true
    		});

    	labeledinput2 = new LabeledInput({
    			props: {
    				thisStep: 2,
    				step: /*step*/ ctx[3],
    				label: "flats on floor",
    				value: /*flats*/ ctx[2],
    				min: 2
    			},
    			$$inline: true
    		});

    	numpad = new Numpad({
    			props: { handleClick: /*handleClick*/ ctx[5] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "\"Which floor?\"";
    			t1 = space();
    			div2 = element("div");
    			create_component(labeledinput0.$$.fragment);
    			t2 = space();
    			create_component(labeledinput1.$$.fragment);
    			t3 = space();
    			create_component(labeledinput2.$$.fragment);
    			t4 = space();
    			div0 = element("div");
    			div0.textContent = "FLOOR";
    			t6 = space();
    			div1 = element("div");
    			t7 = text(/*floor*/ ctx[4]);
    			t8 = space();
    			create_component(numpad.$$.fragment);
    			set_style(h1, "text-align", "center");
    			add_location(h1, file$3, 48, 2, 1122);
    			set_style(div0, "margin-left", "auto");
    			attr_dev(div0, "class", "result svelte-1z0e59u");
    			add_location(div0, file$3, 59, 4, 1468);
    			attr_dev(div1, "class", "result svelte-1z0e59u");
    			add_location(div1, file$3, 60, 4, 1530);
    			attr_dev(div2, "class", "info svelte-1z0e59u");
    			add_location(div2, file$3, 49, 2, 1175);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(labeledinput0, div2, null);
    			append_dev(div2, t2);
    			mount_component(labeledinput1, div2, null);
    			append_dev(div2, t3);
    			mount_component(labeledinput2, div2, null);
    			append_dev(div2, t4);
    			append_dev(div2, div0);
    			append_dev(div2, t6);
    			append_dev(div2, div1);
    			append_dev(div1, t7);
    			insert_dev(target, t8, anchor);
    			mount_component(numpad, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const labeledinput0_changes = {};
    			if (dirty & /*step*/ 8) labeledinput0_changes.step = /*step*/ ctx[3];
    			if (dirty & /*num*/ 1) labeledinput0_changes.value = /*num*/ ctx[0];
    			labeledinput0.$set(labeledinput0_changes);
    			const labeledinput1_changes = {};
    			if (dirty & /*step*/ 8) labeledinput1_changes.step = /*step*/ ctx[3];
    			if (dirty & /*firstFlat*/ 2) labeledinput1_changes.value = /*firstFlat*/ ctx[1];
    			labeledinput1.$set(labeledinput1_changes);
    			const labeledinput2_changes = {};
    			if (dirty & /*step*/ 8) labeledinput2_changes.step = /*step*/ ctx[3];
    			if (dirty & /*flats*/ 4) labeledinput2_changes.value = /*flats*/ ctx[2];
    			labeledinput2.$set(labeledinput2_changes);
    			if (!current || dirty & /*floor*/ 16) set_data_dev(t7, /*floor*/ ctx[4]);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(labeledinput0.$$.fragment, local);
    			transition_in(labeledinput1.$$.fragment, local);
    			transition_in(labeledinput2.$$.fragment, local);
    			transition_in(numpad.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(labeledinput0.$$.fragment, local);
    			transition_out(labeledinput1.$$.fragment, local);
    			transition_out(labeledinput2.$$.fragment, local);
    			transition_out(numpad.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div2);
    			destroy_component(labeledinput0);
    			destroy_component(labeledinput1);
    			destroy_component(labeledinput2);
    			if (detaching) detach_dev(t8);
    			destroy_component(numpad, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(48:0) <Centered width={600}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let small;
    	let span0;
    	let span1;
    	let t1;
    	let a;
    	let t3;
    	let centered;
    	let current;

    	centered = new Centered({
    			props: {
    				width: 600,
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			small = element("small");
    			span0 = element("span");
    			span0.textContent = "Delivery guy helper";
    			span1 = element("span");
    			t1 = text("by ");
    			a = element("a");
    			a.textContent = "kjaku";
    			t3 = space();
    			create_component(centered.$$.fragment);
    			add_location(span0, file$3, 41, 3, 940);
    			attr_dev(a, "href", "http://kjaku.github.io/");
    			attr_dev(a, "noopener", "");
    			attr_dev(a, "noreferrer", "");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "class", "svelte-1z0e59u");
    			add_location(a, file$3, 42, 8, 986);
    			add_location(span1, file$3, 41, 35, 972);
    			attr_dev(small, "class", "header svelte-1z0e59u");
    			add_location(small, file$3, 40, 0, 915);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, small, anchor);
    			append_dev(small, span0);
    			append_dev(small, span1);
    			append_dev(span1, t1);
    			append_dev(span1, a);
    			insert_dev(target, t3, anchor);
    			mount_component(centered, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const centered_changes = {};

    			if (dirty & /*$$scope, floor, step, flats, firstFlat, num*/ 95) {
    				centered_changes.$$scope = { dirty, ctx };
    			}

    			centered.$set(centered_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(centered.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(centered.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(small);
    			if (detaching) detach_dev(t3);
    			destroy_component(centered, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let floor;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let step = 0;
    	let num = 1;
    	let firstFlat = 1;
    	let flats = 4;

    	const handleClick = key => () => {
    		switch (key) {
    			case "<":
    				{
    					if (step > 0) $$invalidate(3, step -= 1);
    					break;
    				}
    			case ">":
    				{
    					if (step < 2) $$invalidate(3, step += 1);
    					break;
    				}
    			default:
    				{
    					switch (step) {
    						case 0:
    							$$invalidate(0, num = +(num.toString() + key.toString()));
    							break;
    						case 1:
    							$$invalidate(1, firstFlat = +(firstFlat.toString() + key.toString()));
    							break;
    						case 2:
    							$$invalidate(2, flats = +(flats.toString() + key.toString()));
    							break;
    					}
    				}
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		LabeledInput,
    		Numpad,
    		Centered,
    		step,
    		num,
    		firstFlat,
    		flats,
    		handleClick,
    		floor
    	});

    	$$self.$inject_state = $$props => {
    		if ("step" in $$props) $$invalidate(3, step = $$props.step);
    		if ("num" in $$props) $$invalidate(0, num = $$props.num);
    		if ("firstFlat" in $$props) $$invalidate(1, firstFlat = $$props.firstFlat);
    		if ("flats" in $$props) $$invalidate(2, flats = $$props.flats);
    		if ("floor" in $$props) $$invalidate(4, floor = $$props.floor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*num, firstFlat, flats*/ 7) {
    			$$invalidate(4, floor = Math.ceil((num - firstFlat + 1) / flats) - 1);
    		}
    	};

    	return [num, firstFlat, flats, step, floor, handleClick];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
