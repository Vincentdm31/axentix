Axentix.extend = (...args) => {
  return args.reduce((acc, obj) => {
    for (let key in obj) {
      typeof obj[key] === 'object' && obj[key] !== null
        ? (acc[key] = Axentix.extend(acc[key], obj[key]))
        : (acc[key] = obj[key]);
    }

    return acc;
  }, {});
};

Axentix.getComponentOptions = (component, options, el, isLoadedWithData) => {
  return Axentix.extend(
    Axentix[component].getDefaultOptions(),
    isLoadedWithData ? {} : Axentix.DataDetection.formatOptions(component, el),
    options
  );
};

/**
 * Wrap content inside an element (<div> by default)
 * @param {Array<Element>} target
 * @param {Element} wrapper
 * @return {Element}
 */
Axentix.wrap = (target, wrapper = document.createElement('div')) => {
  const parent = target[0].parentElement;
  parent.insertBefore(wrapper, target[0]);
  target.forEach((elem) => wrapper.appendChild(elem));
  return wrapper;
};

/**
 * Create custom event
 * @param {Element} element
 * @param {string} eventName
 * @param {Object} extraData
 */
Axentix.createEvent = (element, eventName, extraData) => {
  const event = new CustomEvent('ax.' + eventName, {
    detail: extraData || {},
    bubbles: true,
  });
  element.dispatchEvent(event);
};

Axentix.isTouchEnabled = () => {
  return 'ontouchstart' in window;
};

Axentix.getInstanceByType = (type) => {
  return Axentix.instances.filter((ins) => ins.type === type).map((ins) => ins.instance);
};

Axentix.getInstance = (element) => {
  const el = Axentix.instances.find((ins) => ins.type !== 'Toast' && '#' + ins.instance.el.id === element);

  if (el) {
    return el.instance;
  }
  return false;
};

Axentix.getAllInstances = () => {
  return Axentix.instances;
};

Axentix.sync = (element) => {
  Axentix.getInstance(element).sync();
};

Axentix.syncAll = () => {
  Axentix.instances.map((ins) => ins.instance.sync());
};

Axentix.reset = (element) => {
  Axentix.getInstance(element).reset();
};

Axentix.resetAll = () => {
  Axentix.instances.map((ins) => ins.instance.reset());
};

Axentix.destroy = (element) => {
  Axentix.getInstance(element).destroy();
};

Axentix.destroyAll = () => {
  Axentix.instances.map((ins) => ins.instance.destroy());
};
