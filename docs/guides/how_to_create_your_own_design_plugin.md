# How to create your own design plugin?

`Design plugins are support from the version 3.x`

It's easy. You just need to create a function that will accept passing arguments from the roulette and return an object with specific params.

## Types

```tsx
(props: IDesignPluginProps) => IDesignPlugin;
```

### Examples

```tsx
import type { IDesignPluginProps, IDesignPlugin } from 'react-roulette-pro';

const yourAwesomeDesignPlugin = (props: IDesignPluginProps): IDesignPlugin => ({
  ...
});

export default yourAwesomeDesignPlugin;
```

```tsx
  <RoulettePro
  ...
  designPlugin={yourAwesomeDesignPlugin}
  ...
  />
```

Examples:
[Built-in regular design](../../src/designs/regular/regular.tsx)
