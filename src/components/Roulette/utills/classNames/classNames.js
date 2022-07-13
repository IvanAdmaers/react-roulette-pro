const classNames = (...classes) => {
  let className = '';

  for (let i = 0; i < classes.length; i += 1) {
    const classNameItem = classes[i];

    if (classNameItem !== null && typeof classNameItem === 'object') {
      const [key] = Object.keys(classNameItem);
      const [value] = Object.values(classNameItem);

      if (value) {
        className += `${key} `;

        continue;
      }

      continue;
    }

    if (classNameItem) {
      className += `${classNameItem} `;
    }
  }

  return className;
};

export default classNames;
