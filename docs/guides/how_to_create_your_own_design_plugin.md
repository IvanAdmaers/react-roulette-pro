# How to create your own design plugin?

`Design plugins are supported from the version 3.x`

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

#### Prize item render function
If you have your own `prizeItemRenderFunction` you can use a specific
built-in type. 

```jsx
import type { PrizeType } from 'react-roulette-pro';

const myPrizeItemRenderFunction = (item: PrizeType) => React.ReactNode;
```

Examples:
[Built-in regular design](../../src/designs/Regular/Regular.tsx)
