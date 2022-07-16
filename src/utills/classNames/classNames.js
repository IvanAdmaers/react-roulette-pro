const isArray = (item) => Array.isArray(item);

const isObject = (item) =>
  item !== null && isArray(item) === false && typeof item === 'object';

const isFunction = (item) => typeof item === 'function';

const isBoolean = (item) => typeof item === 'boolean';

const hasOwnPrototypeOfToString = (object) =>
  object.toString !== Object.prototype.toString;

const classNames = (...classes) => {
  let resultClassName = '';

  const handlePrimitive = (item, asKey) => {
    const isItemBoolean = isBoolean(item);

    if (!item || isItemBoolean === true) {
      return;
    }

    resultClassName += `${asKey !== undefined ? asKey : item} `;
  };

  const handleObject = (object) => {
    const entries = Object.entries(object);

    /* maybe throw it out */
    const hasObjectOwnPrototypeOfToString = hasOwnPrototypeOfToString(object);
    /**/

    entries.forEach(([key, value]) => {
      if (!value) {
        return;
      }

      const isValueFunction = isFunction(value);
      const isToString = key === 'toString';

      if (isValueFunction === true && isToString === false) {
        const functionResult = value();

        handlePrimitive(functionResult, key);

        return;
      }

      if (isToString === false) {
        resultClassName += `${key} `;
      }
    });

    /* maybe throw it out */
    if (hasObjectOwnPrototypeOfToString === true) {
      const toStringValue = object.toString();

      handlePrimitive(toStringValue);
    }
    /**/
  };

  const handleArray = (array) => {
    array.forEach((item) => {
      if (!item || typeof item === 'boolean') {
        return;
      }

      const isItemArray = isArray(item);
      const isItemObject = isObject(item);

      if (isItemArray === true) {
        return handleArray(item);
      }

      if (isItemObject === true) {
        return handleObject(item);
      }

      resultClassName += `${item} `;
    });
  };

  for (let i = 0; i < classes.length; i += 1) {
    const classNameItem = classes[i];

    const isItemObject = isObject(classNameItem);

    const isItemArray = isArray(classNameItem);

    if (isItemObject === true) {
      handleObject(classNameItem);

      continue;
    }

    if (isItemArray === true) {
      handleArray(classNameItem);

      continue;
    }

    handlePrimitive(classNameItem);
  }

  return resultClassName.trim();
};

export default classNames;
