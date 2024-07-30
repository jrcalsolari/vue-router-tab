import { resolveComponent, openBlock, createElementBlock, createVNode, normalizeClass, withCtx, createBlock, KeepAlive, resolveDynamicComponent, createCommentVNode, createElementVNode, withModifiers, toDisplayString, renderSlot, withDirectives, normalizeStyle, vShow, createTextVNode, Fragment, renderList, TransitionGroup, mergeProps, Transition } from "vue";
const emptyObj = /* @__PURE__ */ Object.create(null);
function scrollTo({ wrap, left = 0, top = 0, smooth = true }) {
  if (!wrap)
    return;
  if (wrap.scrollTo) {
    wrap.scrollTo({
      left,
      top,
      behavior: smooth ? "smooth" : "auto"
    });
  } else {
    wrap.scrollLeft = left;
    wrap.scrollTop = top;
  }
}
function scrollIntoView({
  el,
  wrap,
  block = "start",
  inline = "nearest"
}) {
  if (!el || !wrap)
    return;
  if (el.scrollIntoView) {
    el.scrollIntoView({ behavior: "smooth", block, inline });
  } else {
    let { offsetLeft, offsetTop } = el;
    let left, top;
    if (block === "center") {
      top = offsetTop + (el.clientHeight - wrap.clientHeight) / 2;
    } else {
      top = offsetTop;
    }
    if (inline === "center") {
      left = offsetLeft + (el.clientWidth - wrap.clientWidth) / 2;
    } else {
      left = offsetLeft;
    }
    scrollTo({ wrap, left, top });
  }
}
const getScrollbarWidth = function() {
  let width = null;
  return function() {
    if (width !== null)
      return width;
    const div = document.createElement("div");
    div.style.cssText = "width: 100px; height: 100px;overflow-y: scroll";
    document.body.appendChild(div);
    width = div.offsetWidth - div.clientWidth;
    div.parentElement.removeChild(div);
    return width;
  };
}();
function mapGetters(origin, props, context2) {
  const map = {};
  const each = (prop, option) => {
    if (option === null || typeof option !== "object") {
      option = { default: option };
    }
    const { default: def, alias } = option;
    map[alias || prop] = function() {
      const val = this[origin][prop];
      if (context2 && typeof val === "function") {
        return val(this[context2]);
      } else if (def !== void 0 && val === void 0) {
        if (typeof def === "function") {
          return def.bind(this)();
        }
        return def;
      }
      return val;
    };
  };
  if (Array.isArray(props)) {
    props.forEach((prop) => each(prop));
  } else {
    Object.entries(props).forEach(([prop, def]) => each(prop, def));
  }
  return map;
}
const prunePath = (path) => path.split("#")[0];
function getTransOpt(trans) {
  return typeof trans === "string" ? { name: trans } : trans;
}
function getCtorId(vm) {
  return vm.$.vnode.type.__hmrId;
}
const contextmenu = {
  data() {
    return {
      // 右键菜单
      contextData: {
        id: null,
        index: -1,
        left: 0,
        top: 0
      }
    };
  },
  computed: {
    // 菜单配置
    contextMenu() {
      return Array.isArray(this.contextmenu) ? this.contextmenu : void 0;
    }
  },
  watch: {
    // 路由切换隐藏右键菜单
    $route() {
      this.hideContextmenu();
    },
    // 拖拽排序隐藏右键菜单
    onDragSort() {
      this.hideContextmenu();
    }
  },
  mounted() {
    document.addEventListener("click", this.contextmenuClickOutSide);
  },
  unmounted() {
    document.removeEventListener("click", this.contextmenuClickOutSide);
  },
  methods: {
    // 显示页签右键菜单
    async showContextmenu(id, index, e) {
      if (id !== null && this.contextData.id !== null) {
        this.hideContextmenu();
        await this.$nextTick();
      }
      let { clientY: top, clientX: left } = e || emptyObj;
      Object.assign(this.contextData, { id, index, top, left });
    },
    // 关闭页签右键菜单
    hideContextmenu() {
      this.showContextmenu(null, -1);
    },
    // 菜单外部点击关闭
    contextmenuClickOutSide(e) {
      if (e.target !== this.$el.querySelector(".router-tab-contextmenu")) {
        this.hideContextmenu();
      }
    }
  }
};
const en = {
  tab: {
    untitled: "Untitled"
  },
  contextmenu: {
    refresh: "Refresh",
    refreshAll: "Refresh All",
    close: "Close",
    closeLefts: "Close to the Left",
    closeRights: "Close to the Right",
    closeOthers: "Close Others"
  },
  msg: {
    keepLastTab: "Keep at least 1 tab",
    i18nProp: 'Method "i18n" is not defined on the instance'
  }
};
const __require_context_for_vite_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: en
}, Symbol.toStringTag, { value: "Module" }));
const zh = {
  tab: {
    untitled: "无标题"
  },
  contextmenu: {
    refresh: "刷新",
    refreshAll: "刷新全部",
    close: "关闭",
    closeLefts: "关闭左侧",
    closeRights: "关闭右侧",
    closeOthers: "关闭其他"
  },
  msg: {
    keepLastTab: "至少应保留1个页签",
    i18nProp: "请提供“i18n”方法以处理国际化内容"
  }
};
const __require_context_for_vite_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: zh
}, Symbol.toStringTag, { value: "Module" }));
var __require_context_for_vite_map_0 = {
  "./en.js": __require_context_for_vite_0_0,
  "./zh.js": __require_context_for_vite_0_1
};
function __require_context_for_vite_function_0(req) {
  __require_context_for_vite_function_0_resolve(req);
  return __require_context_for_vite_map_0[req];
}
function __require_context_for_vite_function_0_resolve(req) {
  if (req in __require_context_for_vite_map_0) {
    return __require_context_for_vite_map_0[req];
  }
  var e = new Error("Cannot find module '" + req + "'");
  e.code = "MODULE_NOT_FOUND";
  throw e;
}
__require_context_for_vite_function_0.keys = function __require_context_for_vite_function_0_keys() {
  return Object.keys(__require_context_for_vite_map_0);
};
__require_context_for_vite_function_0.resolve = __require_context_for_vite_function_0_resolve;
__require_context_for_vite_function_0.id = "__require_context_for_vite_function_0";
const context = __require_context_for_vite_function_0;
const langs = context.keys().reduce((map, path) => {
  let [, key] = /\.\/(.*).js/g.exec(path);
  map[key] = context(path).default;
  return map;
}, {});
const prefix = "[Vue Router Tab]";
function warn(condition, message) {
  if (!condition) {
    typeof console !== "undefined" && console.warn(`${prefix} ${message}`);
  }
}
const i18n = {
  computed: {
    // 语言内容
    langs() {
      let { lang } = this;
      if (lang === "auto") {
        lang = (navigator.language || navigator.userLanguage).substr(0, 2);
      }
      if (typeof lang === "string") {
        lang = langs[lang];
      }
      if (!lang)
        lang = langs["en"];
      return lang;
    }
  },
  methods: {
    // 获取国际化内容
    i18nText(text) {
      let { key, params } = this.i18nParse(text);
      if (key) {
        const hasI18nProp = typeof this.i18n === "function";
        if (!this._hasI18nPropWarn) {
          warn(hasI18nProp, this.langs.msg.i18nProp);
          this._hasI18nPropWarn = true;
        }
        if (hasI18nProp) {
          return this.i18n(key, params);
        }
      }
      return text;
    },
    // 解析国际化
    i18nParse(text) {
      let key;
      let params;
      if (typeof text === "string") {
        const res = /^i18n:([^\s]+)$/.exec(text);
        if (res) {
          key = res[1];
          params = [];
        }
      } else if (Array.isArray(text)) {
        [key, ...params] = text;
      }
      return { key, params };
    }
  }
};
const iframe = {
  data() {
    return {
      iframes: [],
      currentIframe: null,
      iframeNamePrefix: "RouterTabIframe-"
    };
  },
  methods: {
    // 获取 Iframe 页签路由路径
    getIframePath(src, title = null, icon = null) {
      let path = `${this.basePath}/iframe/`.replace(/\/+/g, "/") + encodeURIComponent(src);
      if (title) {
        path += "/" + title;
        if (icon)
          path += "/" + icon;
      }
      return path;
    },
    // 打开 Iframe 页签
    openIframe(src, title, icon) {
      let path = this.getIframePath(src, title, icon);
      this.$router.push(path);
    },
    // 关闭 Iframe 页签
    closeIframe(src) {
      let path = this.getIframePath(src);
      this.close({
        path,
        match: false
      });
    },
    // 刷新 Iframe 页签
    refreshIframe(src) {
      let path = this.getIframePath(src);
      this.refresh(path, false);
    },
    // 根据 url 获取 iframe 节点
    getIframeEl(url) {
      const name = this.iframeNamePrefix + url;
      return document.getElementsByName(name)[0];
    },
    // iframe 节点 mounted
    iframeMounted(url) {
      const iframe2 = this.getIframeEl(url);
      this.$emit("iframe-mounted", url, iframe2);
    },
    // iframe 加载成功
    iframeLoaded(url) {
      const iframe2 = this.getIframeEl(url);
      this.$emit("iframe-loaded", url, iframe2);
    }
  }
};
function getCloseArgs(args) {
  args = Array.from(args);
  let argsLen = args.length;
  let arg = args[0];
  if (!argsLen) {
    return {};
  } else if (arg && typeof arg === "object" && !arg.name && !arg.fullPath && !arg.params && !arg.query && !arg.hash) {
    return arg;
  } else {
    let [path, to] = args;
    return { path, to };
  }
}
function equalPath(path1, path2) {
  const reg = /\/$/;
  return path1.replace(reg, "") === path2.replace(reg, "");
}
const operate = {
  methods: {
    /**
     * 打开页签（默认全新打开）
     * @param {location} path 页签路径
     * @param {Boolean} [isReplace = false] 是否 replace 方式替换当前路由
     * @param {Boolean | String} [refresh = true] 是否全新打开，如果为 `sameTab` 则仅同一个页签才全新打开
     */
    async open(path, isReplace = false, refresh = true) {
      const curId = this.activeTabId;
      const tarId = this.getRouteKey(path);
      const isSameTab = equalPath(curId, tarId);
      refresh === "sameTab" && (refresh = isSameTab);
      refresh && this.refresh(path, false);
      try {
        await this.$router[isReplace ? "replace" : "push"](path);
      } catch (e) {
      } finally {
        isSameTab && this.reload();
      }
    },
    // 移除 tab 项
    async removeTab(id, force = false) {
      let { items } = this;
      const idx = items.findIndex((item) => item.id === id);
      if (!force && this.keepLastTab && items.length === 1) {
        throw new Error(this.langs.msg.keepLastTab);
      }
      if (!force)
        await this.leavePage(id, "close");
      this.$alive.remove(id);
      idx > -1 && items.splice(idx, 1);
    },
    /**
     * 关闭页签
     * 支持以下方式调用：
     *   1. this.$tabs.close({id, path, match, force, to, refresh})
     *   2. this.$tabs.close(path, to)
     * @param {String} id 通过页签 id 关闭
     * @param {location} path 通过路由路径关闭页签，如果未配置 id 和 path 则关闭当前页签
     * @param {Boolean} [match = true] path 方式关闭时，是否匹配 path 完整路径
     * @param {Boolean} [force = true] 是否强制关闭
     * @param {location} to 关闭后跳转的地址，为 null 则不跳转
     * @param {Boolean} [refresh = false] 是否全新打开跳转地址
     */
    async close() {
      let {
        id,
        path,
        match = true,
        force = true,
        to,
        refresh = false
      } = getCloseArgs(arguments);
      let { activeTabId, items } = this;
      if (!id && path) {
        id = this.getIdByPath(path, match);
        if (!id)
          return;
      }
      if (!id)
        id = activeTabId;
      try {
        const idx = items.findIndex((item) => item.id === id);
        await this.removeTab(id, force);
        if (to === null)
          return;
        if (!to && activeTabId === id) {
          let nextTab = items[idx] || items[idx - 1];
          to = nextTab ? nextTab.to : this.defaultPath;
        }
        if (to) {
          this.open(to, true, refresh === false ? "sameTab" : true);
        }
      } catch (e) {
        warn(false, e);
      }
    },
    // 通过页签 id 关闭页签
    async closeTab(id = this.activeTabId, to, force = false) {
      this.close({ id, to, force });
    },
    /**
     * 通过路由地址刷新页签
     * @param {location} path 需要刷新的地址
     * @param {Boolean} [match = true] 是否匹配 target 完整路径
     * @param {Boolean} [force = true] 是否强制刷新
     */
    refresh(path, match = true, force = true) {
      let id = path && this.getIdByPath(path, match) || void 0;
      this.refreshTab(id, force);
    },
    // 刷新指定页签
    async refreshTab(id = this.activeTabId, force = false) {
      try {
        if (!force)
          await this.leavePage(id, "refresh");
        this.$alive.refresh(id);
      } catch (e) {
        warn(false, e);
      }
    },
    /**
     * 刷新所有页签
     * @param {Boolean} [force = false] 是否强制刷新，如果强制则忽略页面 beforePageLeave
     */
    async refreshAll(force = false) {
      const { cache } = this.$alive;
      for (const id in cache) {
        try {
          if (!force)
            await this.leavePage(id, "refresh");
          this.$alive.refresh(id);
        } catch (e) {
        }
      }
    },
    /**
     * 重置 RouterTab 到默认状态，关闭所有页签并清理缓存页签数据
     * @param {location} [to = this.defaultPath] 重置后跳转页面
     */
    reset(to = this.defaultPath) {
      this.items.forEach(({ id }) => this.$alive.remove(id));
      this.clearTabsStore();
      this.initTabs();
      this.open(to, true, true);
    }
  }
};
const leaveGuard = (app) => async (to, from) => {
  const $tabs = app.$tabs;
  if (!$tabs) {
    return true;
  }
  const fromId = $tabs.getRouteKey(from);
  const toId = $tabs.getRouteKey(to);
  const { $alive } = $tabs;
  const fromCache = $alive && $alive.cache[fromId];
  const { alivePath } = $alive && $alive.cache[toId] || emptyObj;
  const matched = $tabs.matchRoute(to);
  let id, type;
  if (alivePath && alivePath !== matched.alivePath) {
    type = "replace";
    id = toId;
  } else if ($alive.basePath !== matched.basePath) {
    type = "leave";
    id = $tabs.activeTabId;
  } else if (!fromCache && fromId !== toId) {
    type = "leave";
    id = $tabs.activeTabId;
  }
  if (type) {
    try {
      return await $tabs.leavePage(id, type);
    } catch (e) {
      console.error("leaveGuard error", e);
      return false;
    }
  }
};
const pageLeave = {
  created() {
    const { $router } = this;
    if ($router._RouterTabInit)
      return;
    $router.beforeEach(leaveGuard(this));
    $router._RouterTabInit = true;
  },
  methods: {
    // 페이지 떠나기 Promise
    async leavePage(id, type) {
      var _a, _b;
      try {
        const tab = this.items.find((item) => item.id === id);
        const pageLeave2 = (_b = (_a = this.$refs.routerAlive.$refs.alive) == null ? void 0 : _a.$options) == null ? void 0 : _b.beforePageLeave;
        if (tab && pageLeave2 && typeof pageLeave2 === "function") {
          const result = pageLeave2.bind(this.$refs.routerAlive.$refs.alive)(tab, type);
          return result;
        }
      } catch (e) {
        console.error("leavePage error", e);
      }
    }
  }
};
let timeout = null;
const scroll = {
  watch: {
    activeTabId: {
      async handler() {
        if (!this.$el)
          return;
        await this.$nextTick();
        this.adjust();
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener("resize", this.adjust);
  },
  unmounted() {
    window.removeEventListener("resize", this.adjust);
  },
  methods: {
    // 调整页签滚动，保证当前页签在可视区域
    adjust() {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        timeout = null;
        if (!this.$el)
          return;
        const { scroll: scroll2 } = this.$refs;
        const cur = this.$el.querySelector(".router-tab__item.is-active");
        if (scroll2 && cur && !scroll2.isInView(cur))
          scroll2.scrollIntoView(cur);
        this.hideContextmenu();
      }, 200);
    },
    // 页签过渡
    onTabTrans() {
      this.adjust();
    }
  }
};
const restore = {
  computed: {
    // 刷新还原存储 key
    restoreKey() {
      const { restore: restore2, basePath } = this;
      if (!restore2 || typeof sessionStorage === "undefined")
        return "";
      let key = `RouterTab:restore:${basePath}`;
      typeof restore2 === "string" && (key += `:${restore2}`);
      return key;
    }
  },
  mounted() {
    window.addEventListener("beforeunload", this.saveTabs);
  },
  unmounted() {
    window.removeEventListener("beforeunload", this.saveTabs);
  },
  watch: {
    // 监听 restoreKey 变化自动还原页签
    restoreKey() {
      if (this.restoreWatch) {
        const { activeTab } = this;
        this.initTabs();
        if (!this.activeTab) {
          this.items.push(activeTab);
        }
      }
    }
  },
  methods: {
    // 保存页签数据
    saveTabs() {
      this.restoreKey && sessionStorage.setItem(this.restoreKey, JSON.stringify(this.items));
    },
    // 清除页签缓存数据
    clearTabsStore() {
      this.restoreKey && sessionStorage.removeItem(this.restoreKey);
    },
    // 从缓存读取页签
    restoreTabs() {
      if (!this.restoreKey)
        return false;
      let tabs = sessionStorage.getItem(this.restoreKey);
      let hasStore = false;
      try {
        tabs = JSON.parse(tabs);
        if (Array.isArray(tabs) && tabs.length) {
          hasStore = true;
          this.presetTabs(tabs);
        }
      } catch (e) {
      }
      return hasStore;
    }
  }
};
const rules = {
  // 地址，params 不一致则独立缓存
  path: (route) => route.path,
  // 完整地址 (忽略 hash)，params 或 query 不一致则独立缓存
  fullpath: (route) => prunePath(route.fullPath)
};
function parseRouteKey($route, route, key) {
  const defaultKey = route.path;
  if (!key)
    return defaultKey;
  if (typeof key === "string") {
    const rule = rules[key.toLowerCase()];
    return rule ? rule($route) : key;
  }
  if (typeof key === "function") {
    return parseRouteKey($route, route, key($route));
  }
  return defaultKey;
}
function parsePath(path, params) {
  return Object.entries(params).reduce((p, [key, val]) => {
    return p.replace(":" + key, val);
  }, path);
}
class RouteMatch {
  constructor(vm, $route) {
    this.vm = vm;
    this.$route = $route;
  }
  // 设置路由
  set $route($route) {
    if ($route && !$route.matched) {
      const { $router } = this.vm;
      $route = $router.resolve($route);
    }
    this._$route = $route;
  }
  // 获取路由
  get $route() {
    return this._$route || this.vm.$route;
  }
  // 页面路由索引
  get routeIndex() {
    return this.$route.matched.length - 1;
  }
  // 下级路由
  get route() {
    return this.$route.matched[this.routeIndex];
  }
  // 根路径
  get basePath() {
    if (this.routeIndex < 1)
      return "/";
    const baseRoute = this.$route.matched[this.routeIndex - 1] || {};
    const { path } = baseRoute;
    return path && parsePath(path, this.$route.params) || "/";
  }
  // 缓存路径，用于判断是否复用
  get alivePath() {
    const { $route } = this;
    if (this.nest) {
      return parsePath(this.route.path, $route.params);
    }
    return prunePath($route.fullPath);
  }
  // 路由元
  get meta() {
    const {
      route,
      vm: { $nuxt }
    } = this;
    if ($nuxt) {
      try {
        const { meta: metas = [] } = $nuxt.context.route;
        const meta = metas[this.routeIndex];
        if (meta && Object.keys(meta).length) {
          return meta;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return route && route.meta || {};
  }
  // 是否嵌套路由
  get nest() {
    return this.$route.matched.length > this.routeIndex + 1;
  }
  // 路由 key
  get key() {
    if (!this.route)
      return "";
    return parseRouteKey(this.$route, this.route, this.meta.key);
  }
  // 是否缓存
  get alive() {
    const { keepAlive } = this.meta;
    return typeof keepAlive === "boolean" ? keepAlive : this.vm.keepAlive;
  }
  // 是否复用组件
  get reusable() {
    const { reuse } = this.meta;
    return typeof reuse === "boolean" ? reuse : this.vm.reuse;
  }
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$5 = {
  name: "RouterAlive",
  provide() {
    return {
      RouterAlive: this
    };
  },
  props: {
    // 默认是否开启缓存
    keepAlive: {
      type: Boolean,
      default: false
    },
    // 是否复用路由组件
    reuse: {
      type: Boolean,
      default: false
    },
    // 최대 캐시 수, 0은 무제한입니다.
    max: {
      type: Number,
      default: 0
    },
    // 页面 class
    pageClass: {
      type: [Array, Object, String],
      default: "router-alive-page"
    },
    // 页面滚动元素选择器
    pageScroller: {
      type: String,
      default: ""
    },
    // 过渡效果
    transition: {
      type: [String, Object]
    }
  },
  emits: ["ready", "change"],
  data() {
    this.cache = {};
    return {
      // 路由匹配信息
      routeMatch: new RouteMatch(this),
      // 是否正在更新
      onRefresh: false,
      keepAliveExclude: null,
      keepAliveExcludeIndex: 1
    };
  },
  computed: {
    // 从 this.routeMatch 提取计算属性
    ...mapGetters("routeMatch", [
      "key",
      "meta",
      "nest",
      "alive",
      "reusable",
      "basePath",
      "alivePath"
    ]),
    // 页面过渡
    pageTrans() {
      return getTransOpt(this.transition);
    }
  },
  watch: {
    // 监听路由
    $route: {
      handler($route, old) {
        if (!old)
          this.$emit("ready", this);
        if (!$route.matched.length)
          return;
        const { key, alive, reusable, alivePath, nest } = this;
        const cacheItem = this.cache[key] || {};
        let {
          alivePath: cacheAlivePath,
          fullPath: cacheFullPath,
          vm: cacheVM
        } = cacheItem;
        if (cacheAlivePath && !reusable && cacheAlivePath !== alivePath) {
          cacheAlivePath = "";
          this.refresh(key);
        }
        if (nest && cacheVM && $route.fullPath !== cacheFullPath) {
          const oldKey = this.matchRoute(old).key;
          if (oldKey !== key) {
            this.nestForceUpdate = true;
          }
        }
        const type = cacheAlivePath ? "update" : "create";
        this.$emit("change", type, this.routeMatch);
        if (alive) {
          cacheItem.fullPath = $route.fullPath;
        }
      },
      immediate: true
    }
  },
  // 销毁后清理
  unmounted() {
    this.cache = null;
    this.routeMatch = null;
    this._match = null;
  },
  methods: {
    // 移除缓存
    async remove(key = this.key) {
      const $alive = this.$refs.alive;
      if (!$alive)
        return;
      const cacheItem = this.cache[key];
      if (cacheItem) {
        let excludeName = cacheItem.vm.type.__name || cacheItem.vm.type.name;
        if (!excludeName) {
          console.warn("missing name of component");
        }
        this.keepAliveExclude = excludeName;
        cacheItem.vm = null;
        this.cache[key] = null;
        setTimeout(() => {
          this.keepAliveExclude = null;
        }, 1e3);
      }
    },
    // 刷新
    refresh(key = this.key) {
      this.remove(key);
      if (key === this.key) {
        this.reload();
      }
    },
    // 重新加载
    reload() {
      if (this.onRefresh)
        return;
      this.onRefresh = true;
    },
    // 缓存页面组件钩子
    pageHook(hook) {
      const handler = this[`pageHook:${hook}`];
      if (typeof handler === "function")
        handler();
    },
    // 页面创建
    pageHookCreated() {
      this.cache[this.key] = {
        alivePath: this.alivePath,
        fullPath: this.$route.fullPath
      };
    },
    // 页面挂载
    pageHookMounted(target) {
      if (this.cache[this.key]) {
        this.cache[this.key].vm = target;
        this.resetScrollPosition();
      } else {
        this.cache[this.key] = {
          alivePath: this.alivePath,
          fullPath: this.$route.fullPath,
          vm: target
        };
      }
    },
    // 页面激活
    pageHookActivated(target) {
      const pageVm = this.$refs.page;
      if (this.checkHotReloading(target, "activated"))
        return;
      if (this.nestForceUpdate) {
        delete this.nestForceUpdate;
        pageVm.$forceUpdate();
      }
      this.restoreScrollPosition(target);
    },
    // 页面失活
    pageHookDeactivated(target) {
      if (this.checkHotReloading(target, "deactivated"))
        return;
      this.saveScrollPosition(target);
    },
    // 页面销毁后清理 cache
    async pageHookUnmounted() {
      await this.$nextTick();
      if (!this.cache)
        return;
      Object.entries(this.cache).forEach(([key, item]) => {
        const { vm } = item || {};
        if (vm && vm._isDestroyed) {
          this.remove(key);
        }
      });
      if (this.onRefresh) {
        this.onRefresh = false;
        this.$emit("change", "create", this.routeMatch);
      }
    },
    // 匹配路由信息
    matchRoute($route) {
      const matched = this._match;
      if ($route === this.$route || $route.fullPath === this.$route.fullPath || $route === this.$route.fullPath) {
        return this.routeMatch;
      }
      if (matched) {
        matched.$route = $route;
        return matched;
      }
      return this._match = new RouteMatch(this, $route);
    },
    // 핫 리로드 감지
    checkHotReloading(target, from) {
      const lastCid = target._lastCtorId;
      const cid = target._lastCtorId = getCtorId(target);
      if (lastCid && lastCid !== cid) {
        this.refresh();
        return true;
      }
      return false;
    },
    // 获取滚动元素
    getScroller(selector) {
      return selector.startsWith("$") ? document.querySelector(selector.replace(/^\$/, "")) : this.$el.querySelector(selector);
    },
    // 스크롤 위치 저장
    saveScrollPosition(target) {
      let pageScroller = target.$options.pageScroller;
      if (typeof pageScroller === "string" && pageScroller.length) {
        pageScroller = pageScroller.split(/\s?,\s?/);
      }
      if (!Array.isArray(pageScroller)) {
        pageScroller = [];
      }
      pageScroller.push("." + this.pageClass);
      if (this.pageScroller) {
        pageScroller.push("$" + this.pageScroller);
      }
      const position = pageScroller.reduce((pos, selector) => {
        const el = this.getScroller(selector);
        if (el) {
          pos[selector] = {
            left: el.scrollLeft,
            top: el.scrollTop
          };
        }
        return pos;
      }, {});
      target._pageScrollPosition = position;
    },
    // 스크롤 위치 복원
    restoreScrollPosition(target) {
      const position = target == null ? void 0 : target._pageScrollPosition;
      if (!position)
        return;
      Object.entries(position).forEach(([selector, pos]) => {
        const el = this.getScroller(selector);
        if (el) {
          this.$nextTick(() => {
            el.scrollLeft = pos.left;
            el.scrollTop = pos.top;
          });
        }
      });
    },
    // 전역 스크롤 위치 재설정
    resetScrollPosition() {
      if (!this.pageScroller)
        return;
      const el = this.getScroller("$" + this.pageScroller);
      if (!el)
        return;
      el.scrollLeft = 0;
      el.scrollTop = 0;
    },
    // 페이지 데이터가 성공적으로 로드되었습니다.
    async onPageLoaded() {
      await this.$nextTick();
      this.restoreScrollPosition();
    }
  }
};
const _hoisted_1$4 = { class: "router-alive" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createVNode(_component_router_view, {
      ref: "page",
      class: normalizeClass($props.pageClass)
    }, {
      default: withCtx(({ Component }) => [
        _ctx.alive ? (openBlock(), createBlock(KeepAlive, {
          key: 0,
          ref: "keepAlive",
          max: $props.max,
          exclude: $data.keepAliveExclude
        }, [
          !$data.onRefresh ? (openBlock(), createBlock(resolveDynamicComponent(Component), {
            key: _ctx.key,
            ref: "alive",
            onVnodeCreated: $options.pageHookCreated,
            onVnodeMounted: $options.pageHookMounted,
            onVnodeActivated: $options.pageHookActivated,
            onVnodeDeactivated: $options.pageHookDeactivated,
            onVnodeUnmounted: $options.pageHookUnmounted,
            onPageLoaded: $options.onPageLoaded
          }, null, 40, ["onVnodeCreated", "onVnodeMounted", "onVnodeActivated", "onVnodeDeactivated", "onVnodeUnmounted", "onPageLoaded"])) : createCommentVNode("", true)
        ], 1032, ["max", "exclude"])) : (openBlock(), createBlock(resolveDynamicComponent(Component), {
          key: 1,
          ref: "alive"
        }, null, 512))
      ]),
      _: 1
    }, 8, ["class"])
  ]);
}
const RouterAlive = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$6]]);
const TRANSFER_PREFIX = "RouterTabDragSortIndex:";
let dragSortData = null;
const _sfc_main$4 = {
  name: "TabItem",
  inject: ["$tabs"],
  props: {
    // 页签原始数据，方便 slot 插槽自定义数据
    data: {
      type: Object,
      required: true
    },
    // 页签项索引
    index: Number
  },
  data() {
    return {
      onDragSort: false,
      // 是否正在拖拽
      isDragOver: false
      // 是否拖拽经过
    };
  },
  emits: ["contextmenu"],
  computed: {
    // 从 this.data 提取计算属性
    ...mapGetters("data", ["id", "to", "icon", "tabClass", "target", "href"]),
    // class
    classList() {
      return [
        "router-tab__item",
        this.tabClass,
        {
          "is-active": this.$tabs.activeTabId === this.id,
          "is-closable": this.closable,
          "is-contextmenu": this.$tabs.contextData.id === this.id,
          "is-drag-over": this.isDragOver && !this.onDragSort
        }
      ];
    },
    // 国际化
    i18nText() {
      return this.$tabs.i18nText;
    },
    // 未命名页签
    untitled() {
      return this.$tabs.langs.tab.untitled;
    },
    // 页签标题
    title() {
      return this.i18nText(this.data.title) || this.untitled;
    },
    // 页签提示
    tips() {
      return this.i18nText(this.data.tips || this.data.title) || this.untitled;
    },
    // 是否可关闭
    closable() {
      const { keepLastTab, items } = this.$tabs;
      return this.data.closable !== false && !(keepLastTab && items.length < 2);
    }
  },
  methods: {
    // 关闭当前页签
    close() {
      this.$tabs.closeTab(this.id);
    },
    // 拖拽
    onDragStart(e) {
      this.onDragSort = this.$tabs.onDragSort = true;
      dragSortData = TRANSFER_PREFIX + this.index;
      e.dataTransfer.setData("text", dragSortData);
      e.dataTransfer.effectAllowed = "move";
    },
    // 拖拽悬浮
    onDragOver(e) {
      this.isDragOver = true;
      e.dataTransfer.dropEffect = "move";
    },
    // 拖拽结束
    onDragEnd() {
      this.onDragSort = this.$tabs.onDragSort = false;
      dragSortData = null;
    },
    // 释放后排序
    onDrop(e) {
      const { items } = this.$tabs;
      const raw = e.dataTransfer.getData("text") || dragSortData;
      this.isDragOver = false;
      if (typeof raw !== "string" || !raw.startsWith(TRANSFER_PREFIX))
        return;
      const fromIndex = raw.replace(TRANSFER_PREFIX, "");
      const tab = items[fromIndex];
      items.splice(fromIndex, 1);
      items.splice(this.index, 0, tab);
    }
  }
};
const _hoisted_1$3 = ["draggable", "onClick"];
const _hoisted_2$1 = ["title"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_RouterLink = resolveComponent("RouterLink");
  return openBlock(), createBlock(_component_RouterLink, {
    to: _ctx.to,
    custom: ""
  }, {
    default: withCtx(({ navigate }) => [
      createElementVNode("li", {
        class: normalizeClass($options.classList),
        draggable: $options.$tabs.dragsort,
        onClick: navigate,
        onDragstart: _cache[1] || (_cache[1] = (...args) => $options.onDragStart && $options.onDragStart(...args)),
        onDragend: _cache[2] || (_cache[2] = (...args) => $options.onDragEnd && $options.onDragEnd(...args)),
        onDragover: _cache[3] || (_cache[3] = withModifiers((...args) => $options.onDragOver && $options.onDragOver(...args), ["prevent"])),
        onDragleave: _cache[4] || (_cache[4] = withModifiers(() => $data.isDragOver = false, ["prevent"])),
        onDrop: _cache[5] || (_cache[5] = withModifiers((...args) => $options.onDrop && $options.onDrop(...args), ["stop", "prevent"])),
        onMouseup: _cache[6] || (_cache[6] = withModifiers(() => $options.closable && $options.close(), ["middle"])),
        onContextmenu: _cache[7] || (_cache[7] = withModifiers((e) => _ctx.$emit("contextmenu", e), ["prevent"]))
      }, [
        _ctx.icon ? (openBlock(), createElementBlock("i", {
          key: 0,
          class: normalizeClass(["router-tab__item-icon", _ctx.icon])
        }, null, 2)) : createCommentVNode("", true),
        createElementVNode("span", {
          class: "router-tab__item-title",
          title: $options.tips
        }, toDisplayString($options.title), 9, _hoisted_2$1),
        $options.closable ? (openBlock(), createElementBlock("i", {
          key: 1,
          class: "router-tab__item-close",
          onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.close && $options.close(...args), ["prevent", "stop"]))
        })) : createCommentVNode("", true)
      ], 42, _hoisted_1$3)
    ]),
    _: 1
  }, 8, ["to"]);
}
const TabItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$5]]);
const _sfc_main$3 = {
  name: "TabScroll",
  props: {
    // 每次滚动距离
    space: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isMobile: false,
      // 是否移动端
      scrollData: {
        clientWidth: 0,
        scrollWidth: 0,
        scrollLeft: 0
      },
      dragData: null
    };
  },
  computed: {
    // 是否拥有滚动条
    hasScroller() {
      return !this.isMobile && !this.$tabs.onDragSort && this.scrollData.scrollWidth > this.scrollData.clientWidth;
    },
    // 滑块宽度
    thumbWidth() {
      if (!this.hasScroller)
        return;
      const { clientWidth, scrollWidth } = this.scrollData;
      return clientWidth / scrollWidth * clientWidth;
    },
    // 滑块 left
    thumbLeft() {
      if (!this.hasScroller)
        return;
      if (this.dragData) {
        return this.dragData.thumbLeft;
      }
      const { clientWidth, scrollWidth, scrollLeft } = this.scrollData;
      return (clientWidth - this.thumbWidth) * (scrollLeft / (scrollWidth - clientWidth));
    }
  },
  mounted() {
    this.update();
  },
  methods: {
    // 更新滚动数据
    update() {
      const { container } = this.$refs;
      if (!container)
        return;
      const { clientWidth, scrollWidth, scrollLeft } = container;
      this.isMobile = /mobile/i.test(navigator.userAgent) || !getScrollbarWidth();
      Object.assign(this.scrollData, { clientWidth, scrollWidth, scrollLeft });
    },
    // 滚动到指定位置
    scrollTo(left, smooth = true) {
      scrollTo({ wrap: this.$refs.container, left, smooth });
    },
    // 滚动到元素
    scrollIntoView(el) {
      scrollIntoView({ el, wrap: this.$refs.container, inline: "center" });
    },
    // 判断子节点是否完全在可视区域
    isInView(el) {
      const { container } = this.$refs;
      const offsetLeft = el.offsetLeft;
      const scrollLeft = container.scrollLeft;
      if (offsetLeft < scrollLeft || offsetLeft + el.clientWidth > scrollLeft + container.clientWidth) {
        return false;
      }
      return true;
    },
    // 页签鼠标滚动
    onWheel(e) {
      const now = +/* @__PURE__ */ new Date();
      const enable = now - (this.lastWheel || 0) > 100;
      if (!enable)
        return;
      this.lastWheel = now;
      const { space } = this;
      const isWheelUp = e.deltaY < 0;
      this.scrollTo(
        this.$refs.container.scrollLeft + (isWheelUp ? -space : space)
      );
    },
    // 拖拽
    onDragStart(e) {
      const { thumbLeft } = this;
      this.dragData = {
        startPageX: e.pageX,
        startScrollLeft: this.$refs.container.scrollLeft,
        startThumbLeft: thumbLeft,
        thumbLeft
      };
      document.addEventListener("mousemove", this.onDragMove);
      document.addEventListener("mouseup", this.onDragEnd);
    },
    // 拖拽移动
    onDragMove(e) {
      const { dragData, thumbWidth } = this;
      const { clientWidth, scrollWidth } = this.scrollData;
      let thumbLeft = dragData.startThumbLeft + e.pageX - dragData.startPageX;
      const maxThumbLeft = clientWidth - thumbWidth;
      if (thumbLeft < 0) {
        thumbLeft = 0;
      } else if (thumbLeft > maxThumbLeft) {
        thumbLeft = maxThumbLeft;
      }
      dragData.thumbLeft = thumbLeft;
      this.scrollTo(
        thumbLeft * (scrollWidth - clientWidth) / (clientWidth - thumbWidth),
        false
      );
      e.preventDefault();
    },
    // 拖拽结束
    onDragEnd(e) {
      this.dragData = null;
      document.removeEventListener("mousemove", this.onDragMove);
      document.removeEventListener("mouseup", this.onDragEnd);
      e.preventDefault();
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "router-tab__scroll",
    onWheel: _cache[2] || (_cache[2] = withModifiers((...args) => $options.onWheel && $options.onWheel(...args), ["prevent"])),
    onMouseenter: _cache[3] || (_cache[3] = (...args) => $options.update && $options.update(...args))
  }, [
    createElementVNode("div", {
      ref: "container",
      class: normalizeClass(["router-tab__scroll-container", { "is-mobile": $data.isMobile }]),
      onScroll: _cache[0] || (_cache[0] = (...args) => $options.update && $options.update(...args))
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 34),
    withDirectives(createElementVNode("div", {
      ref: "bar",
      class: normalizeClass(["router-tab__scrollbar", { "is-dragging": $data.dragData }])
    }, [
      createElementVNode("div", {
        ref: "thumb",
        class: "router-tab__scrollbar-thumb",
        style: normalizeStyle({
          width: `${$options.thumbWidth}px`,
          transform: `translateX(${$options.thumbLeft}px`
        }),
        onMousedown: _cache[1] || (_cache[1] = withModifiers((...args) => $options.onDragStart && $options.onDragStart(...args), ["prevent"]))
      }, null, 36)
    ], 2), [
      [vShow, $options.hasScroller]
    ])
  ], 32);
}
const TabScroll = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$4]]);
const _sfc_main$2 = {
  name: "ContextmenuItem",
  inject: ["$tabs"],
  props: {
    // 菜单数据
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    // 参数
    context() {
      const { $tabs, $parent: $menu } = this;
      const { target, data } = $menu;
      return { $tabs, $menu, target, data };
    },
    // 从 this.data 提取计算属性
    ...mapGetters(
      "data",
      {
        id: "",
        // 菜单标题
        title() {
          return this.$tabs.langs.contextmenu[this.id];
        },
        icon: "",
        tips: "",
        class: {
          default: "",
          alias: "menuClass"
        },
        visible: true,
        // 是否显示
        enable: true
        // 是否启用
      },
      "context"
    )
  }
};
const _hoisted_1$2 = ["data-action", "disabled", "title"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return _ctx.visible ? (openBlock(), createElementBlock("a", {
    key: 0,
    class: normalizeClass(["router-tab__contextmenu-item", _ctx.menuClass]),
    "data-action": _ctx.id,
    disabled: !_ctx.enable || void 0,
    title: _ctx.tips,
    onClick: _cache[0] || (_cache[0] = ($event) => _ctx.enable && $props.data.handler($options.context))
  }, [
    _ctx.icon ? (openBlock(), createElementBlock("i", {
      key: 0,
      class: normalizeClass(["router-tab__contextmenu-icon", _ctx.icon])
    }, null, 2)) : createCommentVNode("", true),
    createTextVNode(" " + toDisplayString(_ctx.title), 1)
  ], 10, _hoisted_1$2)) : createCommentVNode("", true);
}
const TabContextmenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$3]]);
const menuMap = {
  // 刷新
  refresh: {
    handler({ data, $tabs }) {
      $tabs.refreshTab(data.id);
    }
  },
  // 刷新全部
  refreshAll: {
    handler({ $tabs }) {
      $tabs.refreshAll();
    }
  },
  // 关闭
  close: {
    enable({ target }) {
      return target.closable;
    },
    handler({ data, $tabs }) {
      $tabs.closeTab(data.id);
    }
  },
  // 关闭左侧
  closeLefts: {
    enable({ $menu }) {
      return $menu.lefts.length;
    },
    handler({ $menu }) {
      $menu.closeMulti($menu.lefts);
    }
  },
  // 关闭右侧
  closeRights: {
    enable({ $menu }) {
      return $menu.rights.length;
    },
    handler({ $menu }) {
      $menu.closeMulti($menu.rights);
    }
  },
  // 关闭其他
  closeOthers: {
    enable({ $menu }) {
      return $menu.others.length;
    },
    handler({ $menu }) {
      $menu.closeMulti($menu.others);
    }
  }
};
Object.entries(menuMap).forEach(([id, item]) => item.id = id);
const defaultMenu = [
  "refresh",
  "refreshAll",
  "close",
  "closeLefts",
  "closeRights",
  "closeOthers"
];
const _sfc_main$1 = {
  name: "TabContextmenu",
  components: { TabContextmenuItem },
  inject: ["$tabs"],
  props: {
    // 右键数据
    data: {
      type: [Boolean, Object]
    },
    // 菜单配置
    menu: {
      type: Array,
      default: () => defaultMenu
    }
  },
  computed: {
    // 激活菜单的页签
    target() {
      return this.tabMap[this.data.id];
    },
    // 菜单选项
    menuList() {
      return this.menu.map((item) => {
        if (typeof item === "string") {
          return menuMap[item];
        } else if (item && item.id) {
          let origin = menuMap[item.id];
          return origin ? { ...origin, ...item } : item;
        }
      }).filter((item) => item);
    },
    // 是否显示图标
    hasIcon() {
      return this.menuList.some((item) => item.icon);
    },
    // 页签 map
    tabMap() {
      return this.$tabs.$refs.tab.reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {});
    },
    // 页签组件列表
    tabs() {
      return this.$tabs.items.map((item) => this.tabMap[item.id]);
    },
    // 左侧可关闭的页签
    lefts() {
      return this.tabs.slice(0, this.data.index).filter((item) => item.closable);
    },
    // 左侧可关闭的页签
    rights() {
      return this.tabs.slice(this.data.index + 1).filter((item) => item.closable);
    },
    // 其他可关闭的页签
    others() {
      return this.tabs.filter((item) => item.closable && this.data.id !== item.id);
    }
  },
  mounted() {
    this.adjust();
  },
  methods: {
    // 关闭多个页签
    async closeMulti(tabs) {
      for (let { id } of tabs) {
        try {
          await this.$tabs.removeTab(id);
        } catch (e) {
        }
      }
      if (!this.$tabs.activeTab) {
        this.$router.replace(this.target.to);
      }
    },
    // 适应边界位置
    adjust() {
      const { clientWidth } = this.$el;
      const winWidth = window.innerWidth;
      if (this.data.left + clientWidth > winWidth) {
        this.data.left = winWidth - clientWidth - 5;
      }
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tab_contextmenu_item = resolveComponent("tab-contextmenu-item");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["router-tab__contextmenu", { "has-icon": $options.hasIcon }]),
    style: normalizeStyle({
      left: `${$props.data.left}px`,
      top: `${$props.data.top}px`
    })
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($options.menuList, (item) => {
      return openBlock(), createBlock(_component_tab_contextmenu_item, {
        key: item.id,
        data: item
      }, null, 8, ["data"]);
    }), 128))
  ], 6);
}
const TabContextmenu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$2]]);
const RouterTab$1 = {
  name: "RouterTab",
  components: { RouterAlive, TabItem, TabScroll, TabContextmenu },
  mixins: [contextmenu, i18n, iframe, operate, pageLeave, scroll, restore],
  // 자식 구성 요소 삽입
  provide() {
    return { $tabs: this };
  },
  props: {
    // 초기 탭 데이터
    tabs: {
      type: Array,
      default: () => []
    },
    // 페이지를 새로 고친 후 탭을 복원할지 여부
    restore: {
      type: [Boolean, String],
      default: false
    },
    // restoreKey 변경 사항을 모니터링하고 탭을 자동으로 복원할지 여부
    restoreWatch: {
      type: Boolean,
      default: false
    },
    // 페이지 스크롤 요소 선택기
    pageScroller: {
      type: String,
      default: ".router-tab__container"
    },
    // 기본 페이지
    defaultPage: [String, Object],
    // 탭 전환 효과
    tabTransition: {
      type: [String, Object],
      default: "router-tab-zoom"
    },
    // 页面过渡效果
    pageTransition: {
      type: [String, Object],
      default: () => ({
        name: "router-tab-swap",
        mode: "out-in"
      })
    },
    /**
     * 自定义右键菜单
     * 1. 为 false 时禁用
     * 2. 为数组时可自定义右键菜单
     */
    contextmenu: {
      type: [Boolean, Array],
      default: true
    },
    // 是否支持页签拖拽排序
    dragsort: {
      type: Boolean,
      default: true
    },
    // 新页签插入位置，last 末尾，next 下一个
    append: {
      type: String,
      default: "last"
    },
    // 是否保留最后一个页签不被关闭
    keepLastTab: {
      type: Boolean,
      default: true
    },
    // 默认是否缓存，可通过路由 meta.keepAlive 重置
    keepAlive: {
      type: Boolean,
      default: true
    },
    // 最大缓存数，0 则不限制
    maxAlive: {
      type: Number,
      default: 0
    },
    // 是否复用路由组件，可通过路由 meta.reuse 重置
    reuse: {
      type: Boolean,
      default: false
    },
    // 页签国际化配置 i18n (key, [args])
    i18n: Function,
    /**
     * 组件语言
     * - 为字符串时，可选值： 'zh'-中文，'en'-英文
     * - 为对象时，可设置自定义的语言
     * - 默认值：'auto'。根据浏览器语言自动识别组件语言。
     */
    lang: {
      type: [String, Object],
      default: "auto"
    }
  },
  data() {
    return {
      items: [],
      // 页签项
      onDragSort: false,
      // 拖拽排序中
      aliveReady: false,
      // RouterAlive 初始化,
      routerAlive: null
    };
  },
  computed: {
    // routerAlive
    $alive() {
      return this.aliveReady ? this.routerAlive : null;
    },
    // 当前激活的页签 id
    activeTabId() {
      return this.$alive ? this.$alive.key : null;
    },
    // 当前激活的页签索引
    activeTabIndex() {
      return this.items.findIndex((item) => item.id === this.activeTabId);
    },
    // 当前激活的页签
    activeTab() {
      return this.items[this.activeTabIndex];
    },
    // 根路径
    basePath() {
      return this.$alive ? this.$alive.basePath : "/";
    },
    // 默认路径
    defaultPath() {
      return this.defaultPage || this.basePath || "/";
    },
    // 页签过渡
    tabTrans() {
      return getTransOpt(this.tabTransition);
    },
    // 页面过渡
    pageTrans() {
      return getTransOpt(this.pageTransition);
    }
  },
  created() {
    this.$.appContext.config.globalProperties.$tabs = this;
  },
  unmounted() {
    const proto = this.$.appContext.config.globalProperties;
    if (proto.$tabs === this) {
      proto.$tabs = null;
    }
  },
  methods: {
    // RouterAlive 구성 요소 준비
    onAliveReady($alive) {
      this.routerAlive = $alive;
      this.aliveReady = true;
      this.initTabs();
    },
    // 초기 탭 데이터
    initTabs() {
      if (this.restoreTabs())
        return;
      this.presetTabs();
    },
    // 기본 탭
    presetTabs(tabs = this.tabs) {
      let ids = {};
      this.items = tabs.map((item) => {
        item = typeof item === "string" ? { to: item } : item || emptyObj;
        const matched = item.to && this.matchRoute(item.to);
        if (matched) {
          const tab = this.getRouteTab(matched);
          const id = tab.id;
          if (!ids[id]) {
            delete item.id;
            return ids[id] = Object.assign(tab, item);
          }
        }
      }).filter((item) => !!item);
    },
    // RouterAlive 캐시가 업데이트되면 탭을 동기식으로 변경
    onAliveChange(type, matched) {
      const { items, lastMatchedKey } = this;
      const { key } = matched;
      const matchIdx = items.findIndex(({ id }) => id === key);
      const item = this.getRouteTab(matched);
      if (matchIdx > -1) {
        if (type === "create" || // 创建缓存
        type === "update" && items[matchIdx].to !== matched.$route.fullPath) {
          items[matchIdx] = item;
        }
      } else {
        if (this.append === "next" && lastMatchedKey !== void 0) {
          const lastIndex = this.items.findIndex(
            (item2) => item2.id === lastMatchedKey
          );
          items.splice(lastIndex + 1, 0, item);
        } else {
          items.push(item);
        }
      }
      this.lastMatchedKey = key;
    },
    // 从 route 中获取 tab 配置
    getRouteTab({ key, $route, meta }) {
      const tab = { ...meta };
      const props = ["title", "tips", "icon", "closable"];
      for (let i in tab) {
        if (props.includes(i)) {
          const val = tab[i];
          if (typeof val === "function") {
            tab[i] = val($route);
          }
        }
      }
      return Object.assign(tab, {
        id: key,
        to: $route.fullPath
      });
    },
    // 重载路由视图
    async reload() {
      this.$alive.reload();
    },
    // 匹配路由信息
    matchRoute($route) {
      return this.$alive.matchRoute($route);
    },
    // 获取路由缓存 key
    getRouteKey(route = this.$route) {
      return this.matchRoute(route).key;
    },
    // 从路由地址匹配页签 id
    getIdByPath(path, match = true) {
      if (!path)
        return;
      const matched = this.matchRoute(path);
      const { key } = matched;
      if (match) {
        const matchTab = this.items.find(
          ({ to }) => prunePath(to) === prunePath(matched.$route.fullPath)
        );
        if (matchTab) {
          return key;
        }
      }
      return key;
    }
  }
};
const _hoisted_1$1 = { class: "router-tab" };
const _hoisted_2 = {
  ref: "header",
  class: "router-tab__header"
};
const _hoisted_3 = { class: "router-tab__slot-start" };
const _hoisted_4 = {
  class: "router-tab__nav",
  key: "0"
};
const _hoisted_5 = { class: "router-tab__slot-end" };
const _hoisted_6 = { class: "router-tab__container" };
const _hoisted_7 = ["src", "name", "onLoad"];
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tab_item = resolveComponent("tab-item");
  const _component_tab_scroll = resolveComponent("tab-scroll");
  const _component_router_alive = resolveComponent("router-alive");
  const _component_tab_contextmenu = resolveComponent("tab-contextmenu");
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("header", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        renderSlot(_ctx.$slots, "start")
      ]),
      createVNode(_component_tab_scroll, { ref: "scroll" }, {
        default: withCtx(() => [
          createVNode(TransitionGroup, mergeProps(_ctx.tabTrans, {
            onAfterEnter: _ctx.onTabTrans,
            onAfterLeave: _ctx.onTabTrans
          }), {
            default: withCtx(() => [
              createElementVNode("ul", _hoisted_4, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
                  return openBlock(), createBlock(_component_tab_item, {
                    key: item.id || item.to,
                    ref_for: true,
                    ref: "tab",
                    data: item,
                    index,
                    onContextmenu: (e) => _ctx.showContextmenu(item.id, index, e)
                  }, null, 8, ["data", "index", "onContextmenu"]);
                }), 128))
              ])
            ]),
            _: 1
          }, 16, ["onAfterEnter", "onAfterLeave"])
        ]),
        _: 1
      }, 512),
      createElementVNode("div", _hoisted_5, [
        renderSlot(_ctx.$slots, "end")
      ])
    ], 512),
    createElementVNode("div", _hoisted_6, [
      renderSlot(_ctx.$slots, "containerHeader"),
      createVNode(_component_router_alive, {
        ref: "routerAlive",
        "page-class": "router-tab-page",
        "keep-alive": _ctx.keepAlive,
        reuse: _ctx.reuse,
        max: _ctx.maxAlive,
        transition: _ctx.pageTrans,
        "page-scroller": _ctx.pageScroller,
        onReady: _ctx.onAliveReady,
        onChange: _ctx.onAliveChange
      }, null, 8, ["keep-alive", "reuse", "max", "transition", "page-scroller", "onReady", "onChange"]),
      createVNode(TransitionGroup, mergeProps(_ctx.pageTrans, {
        tag: "div",
        class: "router-tab__iframes"
      }), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.iframes, (url) => {
            return withDirectives((openBlock(), createElementBlock("iframe", {
              key: url,
              src: url,
              name: _ctx.iframeNamePrefix + url,
              frameborder: "0",
              class: "router-tab__iframe",
              onLoad: ($event) => _ctx.iframeLoaded(url)
            }, null, 40, _hoisted_7)), [
              [vShow, url === _ctx.currentIframe]
            ]);
          }), 128))
        ]),
        _: 1
      }, 16),
      renderSlot(_ctx.$slots, "containerFooter")
    ]),
    createVNode(Transition, { name: "router-tab-zoom" }, {
      default: withCtx(() => [
        _ctx.contextmenu !== false && _ctx.contextData.index > -1 ? (openBlock(), createBlock(_component_tab_contextmenu, {
          key: 0,
          data: _ctx.contextData,
          menu: _ctx.contextMenu
        }, null, 8, ["data", "menu"])) : createCommentVNode("", true)
      ]),
      _: 1
    })
  ]);
}
const RouterTab = /* @__PURE__ */ _export_sfc(RouterTab$1, [["render", _sfc_render$1]]);
const iframeMeta = {
  key: (route) => `iframe-${route.params.src}`,
  title: (route) => route.params.title,
  icon: (route) => route.params.icon
};
const _sfc_main = {
  name: "Iframe",
  inject: ["$tabs"],
  meta: iframeMeta,
  // Nuxt 页面路由元
  props: {
    src: String,
    title: String,
    icon: String
  },
  computed: {
    /**
     * 链接安全过滤，屏蔽以下方式 XSS 攻击，并返回空白页：
     * 1. `javascript:` 执行代码：`javascript:alert(1)`
     * 2. `data:` Base64 链接: `'data:text/html;base64,' + window.btoa('<script>alert(1)<\/script>')`
     */
    url() {
      let src = decodeURIComponent(this.src);
      if (/^(javascript|data):/i.test(src)) {
        return "about:blank";
      }
      return src;
    }
  },
  async mounted() {
    let { url, $tabs } = this;
    let { iframes } = $tabs;
    if (!iframes.includes(url)) {
      iframes.push(url);
    }
    $tabs.currentIframe = url;
    await this.$nextTick();
    this.$tabs.iframeMounted(url);
  },
  activated() {
    this.$tabs.currentIframe = this.url;
  },
  deactivated() {
    this.$tabs.currentIframe = null;
  },
  // 组件销毁后移除 iframe
  unmounted() {
    let { url } = this;
    let { iframes } = this.$tabs;
    let index = iframes.indexOf(url);
    if (index > -1) {
      iframes.splice(index, 1);
    }
  }
};
const _hoisted_1 = { class: "router-tab-iframe-fake" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1);
}
const Iframe = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const routes = [
  {
    // iframe 路由
    path: "iframe/:src/:title?/:icon?",
    component: Iframe,
    props: true,
    meta: iframeMeta
  }
];
const beforeunload = ($tabs, tabId, beforePageLeave) => (e) => {
  if (!$tabs && $tabs._isDestroyed)
    return;
  const tab = $tabs.items.find((item) => item.id === tabId);
  const msg = beforePageLeave(tab, "unload");
  if (msg && typeof msg === "string") {
    e.preventDefault();
    e.returnValue = msg;
    if ($tabs.activeTabId !== tabId) {
      $tabs.open(tab.to, false, false);
    }
    return msg;
  }
};
function updateTab(info) {
  const tab = typeof info === "string" ? { title: info } : info;
  const { activeTab } = this.$tabs || emptyObj;
  if (tab && activeTab) {
    for (const key in tab) {
      if (!["id", "to"].includes(key)) {
        activeTab[key] = tab[key];
      }
    }
  }
}
const routerPage = {
  emits: ["vnodeCreated", "vnodeActivated", "vnodeDeactivated", "vnodeUnmounted"],
  watch: {
    // 监听 routerTab 字段，更新页签信息
    routeTab: {
      handler(val) {
        if (!val || this._inactive)
          return;
        updateTab.call(this, val);
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.$emit("vnodeCreated");
  },
  // 创建前记录缓存
  mounted() {
    const { $tabs } = this;
    const beforePageLeave = this.$options.beforePageLeave;
    if ($tabs && beforePageLeave) {
      window.addEventListener(
        "beforeunload",
        this._beforeunload = beforeunload(
          $tabs,
          $tabs.activeTabId,
          beforePageLeave.bind(this)
        )
      );
    }
  },
  // 页签激活时更新页签
  activated() {
    this.routeTab && updateTab.call(this, this.routeTab);
    this.$emit("vnodeActivated", this);
  },
  deactivated() {
    this.$emit("vnodeDeactivated", this);
  },
  unmounted() {
    if (this._beforeunload) {
      window.removeEventListener("beforeunload", this._beforeunload);
    }
  }
};
const routerTab = "";
const transition = "";
RouterTab.install = function install(Vue) {
  if (install.installed)
    return;
  RouterTab.Vue = Vue;
  install.installed = true;
  Vue.component(RouterTab.name, RouterTab);
  Vue.mixin(routerPage);
};
if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(RouterTab);
}
export {
  Iframe,
  RouterAlive,
  routes as RouterTabRoutes,
  RouterTab as default
};
