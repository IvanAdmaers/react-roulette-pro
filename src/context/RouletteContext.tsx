import { createContext } from 'react';

import type { DesignOptionsType } from '../types';

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
}

const RouletteContext = createContext({} as IRouletteContextProps);

export default RouletteContext;
