import type { RegularTopType } from '../components/Roulette/designs/Regular';
import type {
  GracefulLinesTopType,
  GracefulLinesBottomType,
} from '../components/Roulette/designs/GracefulLines';

type DesignOptionsType = {
  withoutAnimation?: boolean;
  // Regular & GracefulLines
  prizeItemWidth?: number;
  prizeItemHeight?: number;
} & RegularTopType &
  GracefulLinesTopType &
  GracefulLinesBottomType;

export default DesignOptionsType;
