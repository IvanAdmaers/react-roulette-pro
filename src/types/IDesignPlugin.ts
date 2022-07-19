import React from 'react';

import { PrizeType, ClassesType } from '.';

interface IDesignPlugin {
  topChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  prizeItemWidth: number;
  prizeItemHeight: number;
  prizeItemRenderFunction?: (item: PrizeType) => React.ReactNode;
  classes?: ClassesType;
}

export default IDesignPlugin;
