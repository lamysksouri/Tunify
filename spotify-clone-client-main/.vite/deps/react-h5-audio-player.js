import {
  _extends
} from "./chunk-PQEZCWQY.js";
import {
  _defineProperty
} from "./chunk-LAWQGGSG.js";
import {
  require_react
} from "./chunk-2PIBWAMS.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// node_modules/react-h5-audio-player/es/index.js
var import_react6 = __toESM(require_react());

// node_modules/@iconify/react/dist/iconify.mjs
var import_react = __toESM(require_react(), 1);
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
var defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
var optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
var dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
var simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
  return {
    attributes,
    body
  };
}
var regex = /\sid="(\S+)"/g;
var randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
var counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
var storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
var configStorage = /* @__PURE__ */ Object.create(null);
var fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
var fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
var detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
var fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
var prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
var send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback("abort", data);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
var fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
var idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback === "function") {
      doneCallbacks.push(callback);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
var redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
var browserCacheVersion = "iconify2";
var browserCachePrefix = "iconify";
var browserCacheCountKey = browserCachePrefix + "-count";
var browserCacheVersionKey = browserCachePrefix + "-version";
var browserStorageHour = 36e5;
var browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
var browserStorageConfig = {
  local: true,
  session: true
};
var browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
var browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
var _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function updateLastModified(storage2, lastModified) {
  const lastValue = storage2.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage2.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage2.provider || iconSet.prefix !== storage2.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage2, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set = browserStorageEmptyItems[key];
    let index;
    if (set.size) {
      set.delete(index = Array.from(set).shift());
    } else {
      index = getBrowserStorageItemsCount(func);
      if (!setBrowserStorageItemsCount(func, index + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage2.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name) => {
              storage2.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage2,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage2.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage2, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage2);
        });
      });
    });
  }
}
var loadIcons = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) {
      setTimeout(() => {
        if (callCallback) {
          callback(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const { provider, prefix } = storage2;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(storage2, newIcons[provider][prefix]);
    }
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
var separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
var policy;
function createPolicy() {
  try {
    policy = window.trustedTypes.createPolicy("iconify", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      createHTML: (s) => s
    });
  } catch (err) {
    policy = null;
  }
}
function cleanUpInnerHTML(html) {
  if (policy === void 0) {
    createPolicy();
  }
  return policy ? policy.createHTML(html) : html;
}
var defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
var svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlnsXlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
var commonProps = {
  display: "inline-block"
};
var monotoneProps = {
  backgroundColor: "currentColor"
};
var coloredProps = {
  backgroundColor: "transparent"
};
var propsToAdd = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
};
var propsToAddTo = {
  WebkitMask: monotoneProps,
  mask: monotoneProps,
  background: coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + prop] = propsToAdd[prop];
  }
}
var inlineDefaults = {
  ...defaultExtendedIconCustomisations,
  inline: true
};
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
var render = (icon, props, inline, ref) => {
  const defaultProps = inline ? inlineDefaults : defaultExtendedIconCustomisations;
  const customisations = mergeCustomisations(defaultProps, props);
  const mode = props.mode || "svg";
  const style = {};
  const customStyle = props.style || {};
  const componentProps = {
    ...mode === "svg" ? svgDefaults : {},
    ref
  };
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "children":
      case "onLoad":
      case "mode":
      case "_ref":
      case "_inline":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style.color = value;
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (defaultProps[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style.verticalAlign = "-0.125em";
  }
  if (mode === "svg") {
    componentProps.style = {
      ...style,
      ...customStyle
    };
    Object.assign(componentProps, renderAttribs);
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    componentProps.dangerouslySetInnerHTML = {
      __html: cleanUpInnerHTML(replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifyReact"))
    };
    return import_react.default.createElement("svg", componentProps);
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  componentProps.style = {
    ...style,
    "--svg": svgToURL(html),
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps,
    ...customStyle
  };
  return import_react.default.createElement("span", componentProps);
};
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
var IconComponent = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Render placeholder before component is mounted
      icon: null
    };
  }
  /**
   * Abort loading icon
   */
  _abortLoading() {
    if (this._loading) {
      this._loading.abort();
      this._loading = null;
    }
  }
  /**
   * Update state
   */
  _setData(icon) {
    if (this.state.icon !== icon) {
      this.setState({
        icon
      });
    }
  }
  /**
   * Check if icon should be loaded
   */
  _checkIcon(changed) {
    const state = this.state;
    const icon = this.props.icon;
    if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
      this._icon = "";
      this._abortLoading();
      if (changed || state.icon === null) {
        this._setData({
          data: icon
        });
      }
      return;
    }
    let iconName;
    if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
      this._abortLoading();
      this._setData(null);
      return;
    }
    const data = getIconData(iconName);
    if (!data) {
      if (!this._loading || this._loading.name !== icon) {
        this._abortLoading();
        this._icon = "";
        this._setData(null);
        if (data !== null) {
          this._loading = {
            name: icon,
            abort: loadIcons([iconName], this._checkIcon.bind(this, false))
          };
        }
      }
      return;
    }
    if (this._icon !== icon || state.icon === null) {
      this._abortLoading();
      this._icon = icon;
      const classes = ["iconify"];
      if (iconName.prefix !== "") {
        classes.push("iconify--" + iconName.prefix);
      }
      if (iconName.provider !== "") {
        classes.push("iconify--" + iconName.provider);
      }
      this._setData({
        data,
        classes
      });
      if (this.props.onLoad) {
        this.props.onLoad(icon);
      }
    }
  }
  /**
   * Component mounted
   */
  componentDidMount() {
    this._checkIcon(false);
  }
  /**
   * Component updated
   */
  componentDidUpdate(oldProps) {
    if (oldProps.icon !== this.props.icon) {
      this._checkIcon(true);
    }
  }
  /**
   * Abort loading
   */
  componentWillUnmount() {
    this._abortLoading();
  }
  /**
   * Render
   */
  render() {
    const props = this.props;
    const icon = this.state.icon;
    if (icon === null) {
      return props.children ? props.children : import_react.default.createElement("span", {});
    }
    let newProps = props;
    if (icon.classes) {
      newProps = {
        ...props,
        className: (typeof props.className === "string" ? props.className + " " : "") + icon.classes.join(" ")
      };
    }
    return render({
      ...defaultIconProps,
      ...icon.data
    }, newProps, props._inline, props._ref);
  }
};
var Icon = import_react.default.forwardRef(function Icon2(props, ref) {
  const newProps = {
    ...props,
    _ref: ref,
    _inline: false
  };
  return import_react.default.createElement(IconComponent, newProps);
});
var InlineIcon = import_react.default.forwardRef(function InlineIcon2(props, ref) {
  const newProps = {
    ...props,
    _ref: ref,
    _inline: true
  };
  return import_react.default.createElement(IconComponent, newProps);
});

// node_modules/react-h5-audio-player/es/ProgressBar.js
var import_react2 = __toESM(require_react());

// node_modules/react-h5-audio-player/es/utils.js
var getMainLayoutClassName = (layout) => {
  switch (layout) {
    case "stacked":
      return "rhap_stacked";
    case "stacked-reverse":
      return "rhap_stacked-reverse";
    case "horizontal":
      return "rhap_horizontal";
    case "horizontal-reverse":
      return "rhap_horizontal-reverse";
    default:
      return "rhap_stacked";
  }
};
var getPosX = (event) => {
  if (event instanceof MouseEvent) {
    return event.clientX;
  } else {
    return event.touches[0].clientX;
  }
};
var addHeadingZero = (num) => {
  return num > 9 ? num.toString() : `0${num}`;
};
var getDisplayTimeBySeconds = (seconds, totalSeconds, timeFormat) => {
  if (!isFinite(seconds)) {
    return null;
  }
  const min = Math.floor(seconds / 60);
  const minStr = addHeadingZero(min);
  const secStr = addHeadingZero(Math.floor(seconds % 60));
  const minStrForHour = addHeadingZero(Math.floor(min % 60));
  const hourStr = Math.floor(min / 60);
  const mmSs = `${minStr}:${secStr}`;
  const hhMmSs = `${hourStr}:${minStrForHour}:${secStr}`;
  if (timeFormat === "auto") {
    if (totalSeconds >= 3600) {
      return hhMmSs;
    } else {
      return mmSs;
    }
  } else if (timeFormat === "mm:ss") {
    return mmSs;
  } else if (timeFormat === "hh:mm:ss") {
    return hhMmSs;
  }
};
function throttle(func, limit) {
  let inThrottle = false;
  return (arg) => {
    if (!inThrottle) {
      func(arg);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// node_modules/react-h5-audio-player/es/ProgressBar.js
var ProgressBar = class extends import_react2.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "audio", void 0);
    _defineProperty(this, "timeOnMouseMove", 0);
    _defineProperty(this, "hasAddedAudioEventListener", false);
    _defineProperty(this, "downloadProgressAnimationTimer", void 0);
    _defineProperty(this, "state", {
      isDraggingProgress: false,
      currentTimePos: "0%",
      hasDownloadProgressAnimation: false,
      downloadProgressArr: [],
      waitingForSeekCallback: false
    });
    _defineProperty(this, "getCurrentProgress", (event) => {
      const {
        audio,
        progressBar
      } = this.props;
      const isSingleFileProgressiveDownload = audio.src.indexOf("blob:") !== 0 && typeof this.props.srcDuration === "undefined";
      if (isSingleFileProgressiveDownload && (!audio.src || !isFinite(audio.currentTime) || !progressBar.current)) {
        return {
          currentTime: 0,
          currentTimePos: "0%"
        };
      }
      const progressBarRect = progressBar.current.getBoundingClientRect();
      const maxRelativePos = progressBarRect.width;
      let relativePos = getPosX(event) - progressBarRect.left;
      if (relativePos < 0) {
        relativePos = 0;
      } else if (relativePos > maxRelativePos) {
        relativePos = maxRelativePos;
      }
      const duration = this.getDuration();
      const currentTime = duration * relativePos / maxRelativePos;
      return {
        currentTime,
        currentTimePos: `${(relativePos / maxRelativePos * 100).toFixed(2)}%`
      };
    });
    _defineProperty(this, "handleContextMenu", (event) => {
      event.preventDefault();
    });
    _defineProperty(this, "handleMouseDownOrTouchStartProgressBar", (event) => {
      event.stopPropagation();
      const {
        currentTime,
        currentTimePos
      } = this.getCurrentProgress(event.nativeEvent);
      if (isFinite(currentTime)) {
        this.timeOnMouseMove = currentTime;
        this.setState({
          isDraggingProgress: true,
          currentTimePos
        });
        if (event.nativeEvent instanceof MouseEvent) {
          window.addEventListener("mousemove", this.handleWindowMouseOrTouchMove);
          window.addEventListener("mouseup", this.handleWindowMouseOrTouchUp);
        } else {
          window.addEventListener("touchmove", this.handleWindowMouseOrTouchMove);
          window.addEventListener("touchend", this.handleWindowMouseOrTouchUp);
        }
      }
    });
    _defineProperty(this, "handleWindowMouseOrTouchMove", (event) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      event.stopPropagation();
      const windowSelection = window.getSelection();
      if (windowSelection && windowSelection.type === "Range") {
        windowSelection.empty();
      }
      const {
        isDraggingProgress
      } = this.state;
      if (isDraggingProgress) {
        const {
          currentTime,
          currentTimePos
        } = this.getCurrentProgress(event);
        this.timeOnMouseMove = currentTime;
        this.setState({
          currentTimePos
        });
      }
    });
    _defineProperty(this, "handleWindowMouseOrTouchUp", (event) => {
      event.stopPropagation();
      const newTime = this.timeOnMouseMove;
      const {
        audio,
        onChangeCurrentTimeError,
        onSeek
      } = this.props;
      if (onSeek) {
        this.setState({
          isDraggingProgress: false,
          waitingForSeekCallback: true
        }, () => {
          onSeek(audio, newTime).then(() => this.setState({
            waitingForSeekCallback: false
          }), (err) => {
            throw new Error(err);
          });
        });
      } else {
        const newProps = {
          isDraggingProgress: false
        };
        if (audio.readyState === audio.HAVE_NOTHING || audio.readyState === audio.HAVE_METADATA || !isFinite(newTime)) {
          newProps.currentTimePos = "0%";
          onChangeCurrentTimeError && onChangeCurrentTimeError();
        } else {
          audio.currentTime = newTime;
        }
        this.setState(newProps);
      }
      if (event instanceof MouseEvent) {
        window.removeEventListener("mousemove", this.handleWindowMouseOrTouchMove);
        window.removeEventListener("mouseup", this.handleWindowMouseOrTouchUp);
      } else {
        window.removeEventListener("touchmove", this.handleWindowMouseOrTouchMove);
        window.removeEventListener("touchend", this.handleWindowMouseOrTouchUp);
      }
    });
    _defineProperty(this, "handleAudioTimeUpdate", throttle((e) => {
      const {
        isDraggingProgress
      } = this.state;
      const audio = e.target;
      if (isDraggingProgress || this.state.waitingForSeekCallback === true) return;
      const {
        currentTime
      } = audio;
      const duration = this.getDuration();
      this.setState({
        currentTimePos: `${(currentTime / duration * 100 || 0).toFixed(2)}%`
      });
    }, this.props.progressUpdateInterval));
    _defineProperty(this, "handleAudioDownloadProgressUpdate", (e) => {
      const audio = e.target;
      const duration = this.getDuration();
      const downloadProgressArr = [];
      for (let i = 0; i < audio.buffered.length; i++) {
        const bufferedStart = audio.buffered.start(i);
        const bufferedEnd = audio.buffered.end(i);
        downloadProgressArr.push({
          left: `${Math.round(100 / duration * bufferedStart) || 0}%`,
          width: `${Math.round(100 / duration * (bufferedEnd - bufferedStart)) || 0}%`
        });
      }
      clearTimeout(this.downloadProgressAnimationTimer);
      this.setState({
        downloadProgressArr,
        hasDownloadProgressAnimation: true
      });
      this.downloadProgressAnimationTimer = setTimeout(() => {
        this.setState({
          hasDownloadProgressAnimation: false
        });
      }, 200);
    });
  }
  getDuration() {
    const {
      audio,
      srcDuration
    } = this.props;
    return typeof srcDuration === "undefined" ? audio.duration : srcDuration;
  }
  componentDidUpdate() {
    const {
      audio
    } = this.props;
    if (audio && !this.hasAddedAudioEventListener) {
      this.audio = audio;
      this.hasAddedAudioEventListener = true;
      audio.addEventListener("timeupdate", this.handleAudioTimeUpdate);
      audio.addEventListener("progress", this.handleAudioDownloadProgressUpdate);
    }
  }
  componentWillUnmount() {
    if (this.audio && this.hasAddedAudioEventListener) {
      this.audio.removeEventListener("timeupdate", this.handleAudioTimeUpdate);
      this.audio.removeEventListener("progress", this.handleAudioDownloadProgressUpdate);
    }
    clearTimeout(this.downloadProgressAnimationTimer);
  }
  render() {
    const {
      showDownloadProgress,
      showFilledProgress,
      progressBar,
      i18nProgressBar
    } = this.props;
    const {
      currentTimePos,
      downloadProgressArr,
      hasDownloadProgressAnimation
    } = this.state;
    return import_react2.default.createElement("div", {
      className: "rhap_progress-container",
      ref: progressBar,
      "aria-label": i18nProgressBar,
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Number(currentTimePos.split("%")[0]),
      tabIndex: 0,
      onMouseDown: this.handleMouseDownOrTouchStartProgressBar,
      onTouchStart: this.handleMouseDownOrTouchStartProgressBar,
      onContextMenu: this.handleContextMenu
    }, import_react2.default.createElement("div", {
      className: `rhap_progress-bar ${showDownloadProgress ? "rhap_progress-bar-show-download" : ""}`
    }, import_react2.default.createElement("div", {
      className: "rhap_progress-indicator",
      style: {
        left: currentTimePos
      }
    }), showFilledProgress && import_react2.default.createElement("div", {
      className: "rhap_progress-filled",
      style: {
        width: currentTimePos
      }
    }), showDownloadProgress && downloadProgressArr.map((_ref, i) => {
      let {
        left,
        width
      } = _ref;
      return import_react2.default.createElement("div", {
        key: i,
        className: "rhap_download-progress",
        style: {
          left,
          width,
          transitionDuration: hasDownloadProgressAnimation ? ".2s" : "0s"
        }
      });
    })));
  }
};
var ProgressBarForwardRef = (props, ref) => import_react2.default.createElement(ProgressBar, _extends({}, props, {
  progressBar: ref
}));
var ProgressBar_default = (0, import_react2.forwardRef)(ProgressBarForwardRef);

// node_modules/react-h5-audio-player/es/CurrentTime.js
var import_react3 = __toESM(require_react());
var CurrentTime = class extends import_react3.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "audio", void 0);
    _defineProperty(this, "hasAddedAudioEventListener", false);
    _defineProperty(this, "state", {
      currentTime: this.props.defaultCurrentTime
    });
    _defineProperty(this, "handleAudioCurrentTimeChange", (e) => {
      const audio = e.target;
      const {
        isLeftTime,
        timeFormat,
        defaultCurrentTime
      } = this.props;
      this.setState({
        currentTime: getDisplayTimeBySeconds(isLeftTime ? audio.duration - audio.currentTime : audio.currentTime, audio.duration, timeFormat) || defaultCurrentTime
      });
    });
    _defineProperty(this, "addAudioEventListeners", () => {
      const {
        audio
      } = this.props;
      if (audio && !this.hasAddedAudioEventListener) {
        this.audio = audio;
        this.hasAddedAudioEventListener = true;
        audio.addEventListener("timeupdate", this.handleAudioCurrentTimeChange);
        audio.addEventListener("loadedmetadata", this.handleAudioCurrentTimeChange);
      }
    });
    const {
      audio: _audio,
      defaultCurrentTime: _defaultCurrentTime,
      isLeftTime: _isLeftTime,
      timeFormat: _timeFormat
    } = props;
    let currentTime = _defaultCurrentTime;
    if (_audio) {
      currentTime = getDisplayTimeBySeconds(_isLeftTime ? _audio.duration - _audio.currentTime : _audio.currentTime, _audio.duration, _timeFormat);
    }
    this.state = {
      currentTime
    };
  }
  componentDidMount() {
    this.addAudioEventListeners();
  }
  componentDidUpdate() {
    this.addAudioEventListeners();
  }
  componentWillUnmount() {
    if (this.audio && this.hasAddedAudioEventListener) {
      this.audio.removeEventListener("timeupdate", this.handleAudioCurrentTimeChange);
      this.audio.removeEventListener("loadedmetadata", this.handleAudioCurrentTimeChange);
    }
  }
  render() {
    return this.state.currentTime;
  }
};
var CurrentTime_default = CurrentTime;

// node_modules/react-h5-audio-player/es/Duration.js
var import_react4 = __toESM(require_react());
var Duration = class extends import_react4.PureComponent {
  constructor(props) {
    super(props);
    _defineProperty(this, "audio", void 0);
    _defineProperty(this, "hasAddedAudioEventListener", false);
    _defineProperty(this, "state", {
      duration: this.props.audio ? getDisplayTimeBySeconds(this.props.audio.duration, this.props.audio.duration, this.props.timeFormat) : this.props.defaultDuration
    });
    _defineProperty(this, "handleAudioDurationChange", (e) => {
      const audio = e.target;
      const {
        timeFormat,
        defaultDuration
      } = this.props;
      this.setState({
        duration: getDisplayTimeBySeconds(audio.duration, audio.duration, timeFormat) || defaultDuration
      });
    });
    _defineProperty(this, "addAudioEventListeners", () => {
      const {
        audio
      } = this.props;
      if (audio && !this.hasAddedAudioEventListener) {
        this.audio = audio;
        this.hasAddedAudioEventListener = true;
        audio.addEventListener("durationchange", this.handleAudioDurationChange);
        audio.addEventListener("abort", this.handleAudioDurationChange);
      }
    });
    const {
      audio: _audio,
      timeFormat: _timeFormat,
      defaultDuration: _defaultDuration
    } = props;
    this.state = {
      duration: _audio ? getDisplayTimeBySeconds(_audio.duration, _audio.duration, _timeFormat) : _defaultDuration
    };
  }
  componentDidMount() {
    this.addAudioEventListeners();
  }
  componentDidUpdate() {
    this.addAudioEventListeners();
  }
  componentWillUnmount() {
    if (this.audio && this.hasAddedAudioEventListener) {
      this.audio.removeEventListener("durationchange", this.handleAudioDurationChange);
      this.audio.removeEventListener("abort", this.handleAudioDurationChange);
    }
  }
  render() {
    return this.state.duration;
  }
};
var Duration_default = Duration;

// node_modules/react-h5-audio-player/es/VolumeBar.js
var import_react5 = __toESM(require_react());
var VolumeControls = class extends import_react5.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "audio", void 0);
    _defineProperty(this, "hasAddedAudioEventListener", false);
    _defineProperty(this, "volumeBar", (0, import_react5.createRef)());
    _defineProperty(this, "volumeAnimationTimer", 0);
    _defineProperty(this, "lastVolume", this.props.volume);
    _defineProperty(this, "state", {
      currentVolumePos: `${(this.lastVolume / 1 * 100 || 0).toFixed(2)}%`,
      hasVolumeAnimation: false,
      isDraggingVolume: false
    });
    _defineProperty(this, "getCurrentVolume", (event) => {
      const {
        audio
      } = this.props;
      if (!this.volumeBar.current) {
        return {
          currentVolume: audio.volume,
          currentVolumePos: this.state.currentVolumePos
        };
      }
      const volumeBarRect = this.volumeBar.current.getBoundingClientRect();
      const maxRelativePos = volumeBarRect.width;
      const relativePos = getPosX(event) - volumeBarRect.left;
      let currentVolume;
      let currentVolumePos;
      if (relativePos < 0) {
        currentVolume = 0;
        currentVolumePos = "0%";
      } else if (relativePos > volumeBarRect.width) {
        currentVolume = 1;
        currentVolumePos = "100%";
      } else {
        currentVolume = relativePos / maxRelativePos;
        currentVolumePos = `${relativePos / maxRelativePos * 100}%`;
      }
      return {
        currentVolume,
        currentVolumePos
      };
    });
    _defineProperty(this, "handleContextMenu", (event) => {
      event.preventDefault();
    });
    _defineProperty(this, "handleClickVolumeButton", () => {
      const {
        audio
      } = this.props;
      if (audio.volume > 0) {
        this.lastVolume = audio.volume;
        audio.volume = 0;
      } else {
        audio.volume = this.lastVolume;
      }
    });
    _defineProperty(this, "handleVolumnControlMouseOrTouchDown", (event) => {
      event.stopPropagation();
      const {
        audio
      } = this.props;
      const {
        currentVolume,
        currentVolumePos
      } = this.getCurrentVolume(event.nativeEvent);
      audio.volume = currentVolume;
      this.setState({
        isDraggingVolume: true,
        currentVolumePos
      });
      if (event.nativeEvent instanceof MouseEvent) {
        window.addEventListener("mousemove", this.handleWindowMouseOrTouchMove);
        window.addEventListener("mouseup", this.handleWindowMouseOrTouchUp);
      } else {
        window.addEventListener("touchmove", this.handleWindowMouseOrTouchMove);
        window.addEventListener("touchend", this.handleWindowMouseOrTouchUp);
      }
    });
    _defineProperty(this, "handleWindowMouseOrTouchMove", (event) => {
      if (event instanceof MouseEvent) {
        event.preventDefault();
      }
      event.stopPropagation();
      const {
        audio
      } = this.props;
      const windowSelection = window.getSelection();
      if (windowSelection && windowSelection.type === "Range") {
        windowSelection.empty();
      }
      const {
        isDraggingVolume
      } = this.state;
      if (isDraggingVolume) {
        const {
          currentVolume,
          currentVolumePos
        } = this.getCurrentVolume(event);
        audio.volume = currentVolume;
        this.setState({
          currentVolumePos
        });
      }
    });
    _defineProperty(this, "handleWindowMouseOrTouchUp", (event) => {
      event.stopPropagation();
      this.setState({
        isDraggingVolume: false
      });
      if (event instanceof MouseEvent) {
        window.removeEventListener("mousemove", this.handleWindowMouseOrTouchMove);
        window.removeEventListener("mouseup", this.handleWindowMouseOrTouchUp);
      } else {
        window.removeEventListener("touchmove", this.handleWindowMouseOrTouchMove);
        window.removeEventListener("touchend", this.handleWindowMouseOrTouchUp);
      }
    });
    _defineProperty(this, "handleAudioVolumeChange", (e) => {
      const {
        isDraggingVolume
      } = this.state;
      const {
        volume
      } = e.target;
      if (this.lastVolume > 0 && volume === 0 || this.lastVolume === 0 && volume > 0) {
        this.props.onMuteChange();
      }
      this.lastVolume = volume;
      if (isDraggingVolume) return;
      this.setState({
        hasVolumeAnimation: true,
        currentVolumePos: `${(volume / 1 * 100 || 0).toFixed(2)}%`
      });
      clearTimeout(this.volumeAnimationTimer);
      this.volumeAnimationTimer = setTimeout(() => {
        this.setState({
          hasVolumeAnimation: false
        });
      }, 100);
    });
  }
  componentDidUpdate() {
    const {
      audio
    } = this.props;
    if (audio && !this.hasAddedAudioEventListener) {
      this.audio = audio;
      this.hasAddedAudioEventListener = true;
      audio.addEventListener("volumechange", this.handleAudioVolumeChange);
    }
  }
  componentWillUnmount() {
    if (this.audio && this.hasAddedAudioEventListener) {
      this.audio.removeEventListener("volumechange", this.handleAudioVolumeChange);
    }
    clearTimeout(this.volumeAnimationTimer);
  }
  render() {
    const {
      audio,
      showFilledVolume,
      i18nVolumeControl
    } = this.props;
    const {
      currentVolumePos,
      hasVolumeAnimation
    } = this.state;
    const {
      volume
    } = audio || {};
    return import_react5.default.createElement("div", {
      ref: this.volumeBar,
      onMouseDown: this.handleVolumnControlMouseOrTouchDown,
      onTouchStart: this.handleVolumnControlMouseOrTouchDown,
      onContextMenu: this.handleContextMenu,
      role: "progressbar",
      "aria-label": i18nVolumeControl,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-valuenow": Number((volume * 100).toFixed(0)),
      tabIndex: 0,
      className: "rhap_volume-bar-area"
    }, import_react5.default.createElement("div", {
      className: "rhap_volume-bar"
    }, import_react5.default.createElement("div", {
      className: "rhap_volume-indicator",
      style: {
        left: currentVolumePos,
        transitionDuration: hasVolumeAnimation ? ".1s" : "0s"
      }
    }), showFilledVolume && import_react5.default.createElement("div", {
      className: "rhap_volume-filled",
      style: {
        width: currentVolumePos
      }
    })));
  }
};
var VolumeBar_default = VolumeControls;

// node_modules/react-h5-audio-player/es/constants.js
var RHAP_UI = function(RHAP_UI2) {
  RHAP_UI2["CURRENT_TIME"] = "CURRENT_TIME";
  RHAP_UI2["CURRENT_LEFT_TIME"] = "CURRENT_LEFT_TIME";
  RHAP_UI2["PROGRESS_BAR"] = "PROGRESS_BAR";
  RHAP_UI2["DURATION"] = "DURATION";
  RHAP_UI2["ADDITIONAL_CONTROLS"] = "ADDITIONAL_CONTROLS";
  RHAP_UI2["MAIN_CONTROLS"] = "MAIN_CONTROLS";
  RHAP_UI2["VOLUME_CONTROLS"] = "VOLUME_CONTROLS";
  RHAP_UI2["LOOP"] = "LOOP";
  RHAP_UI2["VOLUME"] = "VOLUME";
  return RHAP_UI2;
}({});

// node_modules/react-h5-audio-player/es/index.js
var H5AudioPlayer = class extends import_react6.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "audio", (0, import_react6.createRef)());
    _defineProperty(this, "progressBar", (0, import_react6.createRef)());
    _defineProperty(this, "container", (0, import_react6.createRef)());
    _defineProperty(this, "lastVolume", this.props.volume);
    _defineProperty(this, "listenTracker", void 0);
    _defineProperty(this, "volumeAnimationTimer", void 0);
    _defineProperty(this, "downloadProgressAnimationTimer", void 0);
    _defineProperty(this, "togglePlay", (e) => {
      e.stopPropagation();
      const audio = this.audio.current;
      if ((audio.paused || audio.ended) && audio.src) {
        this.playAudioPromise();
      } else if (!audio.paused) {
        audio.pause();
      }
    });
    _defineProperty(this, "playAudioPromise", () => {
      const playPromise = this.audio.current.play();
      if (playPromise) {
        playPromise.then(null).catch((err) => {
          const {
            onPlayError
          } = this.props;
          onPlayError && onPlayError(new Error(err));
        });
      } else {
        this.forceUpdate();
      }
    });
    _defineProperty(this, "isPlaying", () => {
      const audio = this.audio.current;
      if (!audio) return false;
      return !audio.paused && !audio.ended;
    });
    _defineProperty(this, "handlePlay", (e) => {
      this.forceUpdate();
      this.props.onPlay && this.props.onPlay(e);
    });
    _defineProperty(this, "handlePause", (e) => {
      if (!this.audio) return;
      this.forceUpdate();
      this.props.onPause && this.props.onPause(e);
    });
    _defineProperty(this, "handleEnded", (e) => {
      if (!this.audio) return;
      this.forceUpdate();
      this.props.onEnded && this.props.onEnded(e);
    });
    _defineProperty(this, "handleAbort", (e) => {
      this.props.onAbort && this.props.onAbort(e);
    });
    _defineProperty(this, "handleClickVolumeButton", () => {
      const audio = this.audio.current;
      if (audio.volume > 0) {
        this.lastVolume = audio.volume;
        audio.volume = 0;
      } else {
        audio.volume = this.lastVolume;
      }
    });
    _defineProperty(this, "handleMuteChange", () => {
      this.forceUpdate();
    });
    _defineProperty(this, "handleClickLoopButton", () => {
      this.audio.current.loop = !this.audio.current.loop;
      this.forceUpdate();
    });
    _defineProperty(this, "handleClickRewind", () => {
      const {
        progressJumpSteps,
        progressJumpStep
      } = this.props;
      const jumpStep = progressJumpSteps.backward || progressJumpStep;
      this.setJumpTime(-jumpStep);
    });
    _defineProperty(this, "handleClickForward", () => {
      const {
        progressJumpSteps,
        progressJumpStep
      } = this.props;
      const jumpStep = progressJumpSteps.forward || progressJumpStep;
      this.setJumpTime(jumpStep);
    });
    _defineProperty(this, "setJumpTime", (time) => {
      const audio = this.audio.current;
      const {
        duration,
        currentTime: prevTime
      } = audio;
      if (audio.readyState === audio.HAVE_NOTHING || audio.readyState === audio.HAVE_METADATA || !isFinite(duration) || !isFinite(prevTime)) {
        return this.props.onChangeCurrentTimeError && this.props.onChangeCurrentTimeError();
      }
      let currentTime = prevTime + time / 1e3;
      if (currentTime < 0) {
        audio.currentTime = 0;
        currentTime = 0;
      } else if (currentTime > duration) {
        audio.currentTime = duration;
        currentTime = duration;
      } else {
        audio.currentTime = currentTime;
      }
    });
    _defineProperty(this, "setJumpVolume", (volume) => {
      let newVolume = this.audio.current.volume + volume;
      if (newVolume < 0) newVolume = 0;
      else if (newVolume > 1) newVolume = 1;
      this.audio.current.volume = newVolume;
    });
    _defineProperty(this, "handleKeyDown", (e) => {
      if (this.props.hasDefaultKeyBindings) {
        switch (e.key) {
          case " ":
            if (e.target === this.container.current || e.target === this.progressBar.current) {
              e.preventDefault();
              this.togglePlay(e);
            }
            break;
          case "ArrowLeft":
            this.handleClickRewind();
            break;
          case "ArrowRight":
            this.handleClickForward();
            break;
          case "ArrowUp":
            e.preventDefault();
            this.setJumpVolume(this.props.volumeJumpStep);
            break;
          case "ArrowDown":
            e.preventDefault();
            this.setJumpVolume(-this.props.volumeJumpStep);
            break;
          case "l":
            this.handleClickLoopButton();
            break;
          case "m":
            this.handleClickVolumeButton();
            break;
        }
      }
    });
    _defineProperty(this, "renderUIModules", (modules) => {
      return modules.map((comp, i) => this.renderUIModule(comp, i));
    });
    _defineProperty(this, "renderUIModule", (comp, key) => {
      const {
        defaultCurrentTime,
        progressUpdateInterval,
        showDownloadProgress,
        showFilledProgress,
        showFilledVolume,
        defaultDuration,
        customIcons,
        showSkipControls,
        onClickPrevious,
        onClickNext,
        onChangeCurrentTimeError,
        showJumpControls,
        customAdditionalControls,
        customVolumeControls,
        muted,
        timeFormat,
        volume: volumeProp,
        loop: loopProp,
        mse,
        i18nAriaLabels
      } = this.props;
      switch (comp) {
        case RHAP_UI.CURRENT_TIME:
          return import_react6.default.createElement("div", {
            key,
            id: "rhap_current-time",
            className: "rhap_time rhap_current-time"
          }, import_react6.default.createElement(CurrentTime_default, {
            audio: this.audio.current,
            isLeftTime: false,
            defaultCurrentTime,
            timeFormat
          }));
        case RHAP_UI.CURRENT_LEFT_TIME:
          return import_react6.default.createElement("div", {
            key,
            id: "rhap_current-left-time",
            className: "rhap_time rhap_current-left-time"
          }, import_react6.default.createElement(CurrentTime_default, {
            audio: this.audio.current,
            isLeftTime: true,
            defaultCurrentTime,
            timeFormat
          }));
        case RHAP_UI.PROGRESS_BAR:
          return import_react6.default.createElement(ProgressBar_default, {
            key,
            ref: this.progressBar,
            audio: this.audio.current,
            progressUpdateInterval,
            showDownloadProgress,
            showFilledProgress,
            onSeek: mse && mse.onSeek,
            onChangeCurrentTimeError,
            srcDuration: mse && mse.srcDuration,
            i18nProgressBar: i18nAriaLabels.progressControl
          });
        case RHAP_UI.DURATION:
          return import_react6.default.createElement("div", {
            key,
            className: "rhap_time rhap_total-time"
          }, mse && mse.srcDuration ? getDisplayTimeBySeconds(mse.srcDuration, mse.srcDuration, this.props.timeFormat) : import_react6.default.createElement(Duration_default, {
            audio: this.audio.current,
            defaultDuration,
            timeFormat
          }));
        case RHAP_UI.ADDITIONAL_CONTROLS:
          return import_react6.default.createElement("div", {
            key,
            className: "rhap_additional-controls"
          }, this.renderUIModules(customAdditionalControls));
        case RHAP_UI.MAIN_CONTROLS: {
          const isPlaying = this.isPlaying();
          let actionIcon;
          if (isPlaying) {
            actionIcon = customIcons.pause ? customIcons.pause : import_react6.default.createElement(Icon, {
              icon: "mdi:pause-circle"
            });
          } else {
            actionIcon = customIcons.play ? customIcons.play : import_react6.default.createElement(Icon, {
              icon: "mdi:play-circle"
            });
          }
          return import_react6.default.createElement("div", {
            key,
            className: "rhap_main-controls"
          }, showSkipControls && import_react6.default.createElement("button", {
            "aria-label": i18nAriaLabels.previous,
            className: "rhap_button-clear rhap_main-controls-button rhap_skip-button",
            type: "button",
            onClick: onClickPrevious
          }, customIcons.previous ? customIcons.previous : import_react6.default.createElement(Icon, {
            icon: "mdi:skip-previous"
          })), showJumpControls && import_react6.default.createElement("button", {
            "aria-label": i18nAriaLabels.rewind,
            className: "rhap_button-clear rhap_main-controls-button rhap_rewind-button",
            type: "button",
            onClick: this.handleClickRewind
          }, customIcons.rewind ? customIcons.rewind : import_react6.default.createElement(Icon, {
            icon: "mdi:rewind"
          })), import_react6.default.createElement("button", {
            "aria-label": isPlaying ? i18nAriaLabels.pause : i18nAriaLabels.play,
            className: "rhap_button-clear rhap_main-controls-button rhap_play-pause-button",
            type: "button",
            onClick: this.togglePlay
          }, actionIcon), showJumpControls && import_react6.default.createElement("button", {
            "aria-label": i18nAriaLabels.forward,
            className: "rhap_button-clear rhap_main-controls-button rhap_forward-button",
            type: "button",
            onClick: this.handleClickForward
          }, customIcons.forward ? customIcons.forward : import_react6.default.createElement(Icon, {
            icon: "mdi:fast-forward"
          })), showSkipControls && import_react6.default.createElement("button", {
            "aria-label": i18nAriaLabels.next,
            className: "rhap_button-clear rhap_main-controls-button rhap_skip-button",
            type: "button",
            onClick: onClickNext
          }, customIcons.next ? customIcons.next : import_react6.default.createElement(Icon, {
            icon: "mdi:skip-next"
          })));
        }
        case RHAP_UI.VOLUME_CONTROLS:
          return import_react6.default.createElement("div", {
            key,
            className: "rhap_volume-controls"
          }, this.renderUIModules(customVolumeControls));
        case RHAP_UI.LOOP: {
          const loop = this.audio.current ? this.audio.current.loop : loopProp;
          let loopIcon;
          if (loop) {
            loopIcon = customIcons.loop ? customIcons.loop : import_react6.default.createElement(Icon, {
              icon: "mdi:repeat"
            });
          } else {
            loopIcon = customIcons.loopOff ? customIcons.loopOff : import_react6.default.createElement(Icon, {
              icon: "mdi:repeat-off"
            });
          }
          return import_react6.default.createElement("button", {
            key,
            "aria-label": loop ? i18nAriaLabels.loop : i18nAriaLabels.loopOff,
            className: "rhap_button-clear rhap_repeat-button",
            type: "button",
            onClick: this.handleClickLoopButton
          }, loopIcon);
        }
        case RHAP_UI.VOLUME: {
          const {
            volume = muted ? 0 : volumeProp
          } = this.audio.current || {};
          let volumeIcon;
          if (volume) {
            volumeIcon = customIcons.volume ? customIcons.volume : import_react6.default.createElement(Icon, {
              icon: "mdi:volume-high"
            });
          } else {
            volumeIcon = customIcons.volume ? customIcons.volumeMute : import_react6.default.createElement(Icon, {
              icon: "mdi:volume-mute"
            });
          }
          return import_react6.default.createElement("div", {
            key,
            className: "rhap_volume-container"
          }, import_react6.default.createElement("button", {
            "aria-label": volume ? i18nAriaLabels.volume : i18nAriaLabels.volumeMute,
            onClick: this.handleClickVolumeButton,
            type: "button",
            className: "rhap_button-clear rhap_volume-button"
          }, volumeIcon), import_react6.default.createElement(VolumeBar_default, {
            audio: this.audio.current,
            volume,
            onMuteChange: this.handleMuteChange,
            showFilledVolume,
            i18nVolumeControl: i18nAriaLabels.volumeControl
          }));
        }
        default:
          if (!(0, import_react6.isValidElement)(comp)) {
            return null;
          }
          return comp.key ? comp : (0, import_react6.cloneElement)(comp, {
            key
          });
      }
    });
  }
  componentDidMount() {
    this.forceUpdate();
    const audio = this.audio.current;
    if (this.props.muted) {
      audio.volume = 0;
    } else {
      audio.volume = this.lastVolume;
    }
    audio.addEventListener("error", (e) => {
      this.props.onError && this.props.onError(e);
    });
    audio.addEventListener("canplay", (e) => {
      this.props.onCanPlay && this.props.onCanPlay(e);
    });
    audio.addEventListener("canplaythrough", (e) => {
      this.props.onCanPlayThrough && this.props.onCanPlayThrough(e);
    });
    audio.addEventListener("play", this.handlePlay);
    audio.addEventListener("abort", this.handleAbort);
    audio.addEventListener("ended", this.handleEnded);
    audio.addEventListener("playing", (e) => {
      this.props.onPlaying && this.props.onPlaying(e);
    });
    audio.addEventListener("seeking", (e) => {
      this.props.onSeeking && this.props.onSeeking(e);
    });
    audio.addEventListener("seeked", (e) => {
      this.props.onSeeked && this.props.onSeeked(e);
    });
    audio.addEventListener("waiting", (e) => {
      this.props.onWaiting && this.props.onWaiting(e);
    });
    audio.addEventListener("emptied", (e) => {
      this.props.onEmptied && this.props.onEmptied(e);
    });
    audio.addEventListener("stalled", (e) => {
      this.props.onStalled && this.props.onStalled(e);
    });
    audio.addEventListener("suspend", (e) => {
      this.props.onSuspend && this.props.onSuspend(e);
    });
    audio.addEventListener("loadstart", (e) => {
      this.props.onLoadStart && this.props.onLoadStart(e);
    });
    audio.addEventListener("loadedmetadata", (e) => {
      this.props.onLoadedMetaData && this.props.onLoadedMetaData(e);
    });
    audio.addEventListener("loadeddata", (e) => {
      this.props.onLoadedData && this.props.onLoadedData(e);
    });
    audio.addEventListener("pause", this.handlePause);
    audio.addEventListener("timeupdate", throttle((e) => {
      this.props.onListen && this.props.onListen(e);
    }, this.props.listenInterval));
    audio.addEventListener("volumechange", (e) => {
      this.props.onVolumeChange && this.props.onVolumeChange(e);
    });
    audio.addEventListener("encrypted", (e) => {
      const {
        mse
      } = this.props;
      mse && mse.onEcrypted && mse.onEcrypted(e);
    });
  }
  componentDidUpdate(prevProps) {
    const {
      src,
      autoPlayAfterSrcChange
    } = this.props;
    if (prevProps.src !== src) {
      if (autoPlayAfterSrcChange) {
        this.playAudioPromise();
      } else {
        this.forceUpdate();
      }
    }
  }
  render() {
    const {
      className,
      src,
      loop: loopProp,
      preload,
      autoPlay,
      crossOrigin,
      mediaGroup,
      header,
      footer,
      layout,
      customProgressBarSection,
      customControlsSection,
      children,
      style,
      i18nAriaLabels
    } = this.props;
    const loop = this.audio.current ? this.audio.current.loop : loopProp;
    const loopClass = loop ? "rhap_loop--on" : "rhap_loop--off";
    const isPlayingClass = this.isPlaying() ? "rhap_play-status--playing" : "rhap_play-status--paused";
    return import_react6.default.createElement("div", {
      role: "group",
      tabIndex: 0,
      "aria-label": i18nAriaLabels.player,
      className: `rhap_container ${loopClass} ${isPlayingClass} ${className}`,
      onKeyDown: this.handleKeyDown,
      ref: this.container,
      style
    }, import_react6.default.createElement("audio", {
      src,
      controls: false,
      loop,
      autoPlay,
      preload,
      crossOrigin,
      mediaGroup,
      ref: this.audio
    }, children), header && import_react6.default.createElement("div", {
      className: "rhap_header"
    }, header), import_react6.default.createElement("div", {
      className: `rhap_main ${getMainLayoutClassName(layout)}`
    }, import_react6.default.createElement("div", {
      className: "rhap_progress-section"
    }, this.renderUIModules(customProgressBarSection)), import_react6.default.createElement("div", {
      className: "rhap_controls-section"
    }, this.renderUIModules(customControlsSection))), footer && import_react6.default.createElement("div", {
      className: "rhap_footer"
    }, footer));
  }
};
_defineProperty(H5AudioPlayer, "defaultProps", {
  autoPlay: false,
  autoPlayAfterSrcChange: true,
  listenInterval: 1e3,
  progressJumpStep: 5e3,
  progressJumpSteps: {},
  volumeJumpStep: 0.1,
  loop: false,
  muted: false,
  preload: "auto",
  progressUpdateInterval: 20,
  defaultCurrentTime: "--:--",
  defaultDuration: "--:--",
  timeFormat: "auto",
  volume: 1,
  className: "",
  showJumpControls: true,
  showSkipControls: false,
  showDownloadProgress: true,
  showFilledProgress: true,
  showFilledVolume: false,
  customIcons: {},
  customProgressBarSection: [RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION],
  customControlsSection: [RHAP_UI.ADDITIONAL_CONTROLS, RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS],
  customAdditionalControls: [RHAP_UI.LOOP],
  customVolumeControls: [RHAP_UI.VOLUME],
  layout: "stacked",
  hasDefaultKeyBindings: true,
  i18nAriaLabels: {
    player: "Audio player",
    progressControl: "Audio progress control",
    volumeControl: "Volume control",
    play: "Play",
    pause: "Pause",
    rewind: "Rewind",
    forward: "Forward",
    previous: "Previous",
    next: "Skip",
    loop: "Disable loop",
    loopOff: "Enable loop",
    volume: "Mute",
    volumeMute: "Unmute"
  }
});
var es_default = H5AudioPlayer;
export {
  RHAP_UI,
  es_default as default
};
//# sourceMappingURL=react-h5-audio-player.js.map
