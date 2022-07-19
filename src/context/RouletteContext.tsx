import { createContext } from 'react';

import type { OptionsType, RouletteType } from '../types';

type WrapperType = {
  wrapperClassName?: string;
};

type PrizesWrapperType = {
  prizeListClassName?: string;
};

export interface IRouletteContextProps extends WrapperType, PrizesWrapperType {
  options: OptionsType;
  start: boolean;
  type: RouletteType;
}

const RouletteContext = createContext({} as IRouletteContextProps);

export default RouletteContext;
