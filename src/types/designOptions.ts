import type { RegularTopType } from '../designs/Regular';
import type {
  GracefulLinesTopType,
  GracefulLinesBottomType,
} from '../designs/GracefulLines';

type DesignOptionsType = {
  withoutAnimation?: boolean;
  // Regular & GracefulLines
  prizeItemWidth?: number;
  prizeItemHeight?: number;
} & RegularTopType &
  GracefulLinesTopType &
  GracefulLinesBottomType;

export default DesignOptionsType;
