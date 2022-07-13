import type { RegularTopType } from '../components/RoulettePro/designs/Regular';
import type {
  GracefulLinesTopType,
  GracefulLinesBottomType,
} from '../components/RoulettePro/designs/GracefulLines';

type DesignOptionsType = {
  withoutAnimation?: boolean;
  // Regular & GracefulLines
  prizeItemWidth?: number;
  prizeItemHeight?: number;
} & RegularTopType &
  GracefulLinesTopType &
  GracefulLinesBottomType;

export default DesignOptionsType;
