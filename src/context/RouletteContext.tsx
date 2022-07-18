import { createContext } from 'react';

import type { DesignOptionsType, IPrizesWrapperProps } from '../types';

type WrapperType = {
  wrapperClassName?: string;
  designWrapperClassName?: string;
};

type PrizesWrapperType = {
  designPrizeListClassName?: string;
  prizeListClassName?: string;
};

export interface IRouletteContextProps extends WrapperType, PrizesWrapperType {
  designOptions: DesignOptionsType;
  start: boolean;
  type: IPrizesWrapperProps['type'];
}

const RouletteContext = createContext({} as IRouletteContextProps);

export default RouletteContext;
