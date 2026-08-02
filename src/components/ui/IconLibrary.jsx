import React from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Search,
  User,
  ShoppingCart,
  ShoppingBag,
  Heart,
  Star,
  X,
  Check,
  Filter,
  Plus,
  Minus,
  Trash2,
  Eye,
  Sparkles,
  Lock,
  Truck,
  RotateCw,
  Grid,
  Info,
  Package,
  Ticket,
  LogOut,
  ShieldCheck,
  Gift,
  Feather,
  Layers,
  Sprout,
  Leaf,
  Droplets,
  Quote
} from 'lucide-react';

/**
 * IconLibrary - Centralized Lucide Icon Repository for Newlilla
 * 
 * Standardized Stroke Width Rules:
 * - Small (< 24px -> 16px): 1.0px / 1.2px
 * - Base  (= 24px -> 24px): 1.2px
 * - Big   (> 24px -> 32px): 1.4px
 */

export const iconMap = {
  'arrow-right': (props) => <ArrowRight {...props} />,
  'arrow-left': (props) => <ArrowLeft {...props} />,
  'chevron-down': (props) => <ChevronDown {...props} />,
  'chevron-up': (props) => <ChevronUp {...props} />,
  'chevron-right': (props) => <ChevronRight {...props} />,
  'search': (props) => <Search {...props} />,
  'user': (props) => <User {...props} />,
  'cart': (props) => <ShoppingCart {...props} />,
  'shopping-cart': (props) => <ShoppingCart {...props} />,
  'shopping-bag': (props) => <ShoppingBag {...props} />,
  'heart': (props) => <Heart {...props} fill={props.filled ? 'currentColor' : 'none'} />,
  'star': (props) => <Star {...props} fill={props.filled ? 'currentColor' : 'none'} />,
  'close': (props) => <X {...props} />,
  'check': (props) => <Check {...props} />,
  'filter': (props) => <Filter {...props} />,
  'plus': (props) => <Plus {...props} />,
  'minus': (props) => <Minus {...props} />,
  'trash': (props) => <Trash2 {...props} />,
  'eye': (props) => <Eye {...props} />,
  'sparkles': (props) => <Sparkles {...props} />,
  'lock': (props) => <Lock {...props} />,
  'truck': (props) => <Truck {...props} />,
  'rotate': (props) => <RotateCw {...props} />,
  'grid': (props) => <Grid {...props} />,
  'info': (props) => <Info {...props} />,
  'package': (props) => <Package {...props} />,
  'ticket': (props) => <Ticket {...props} />,
  'logout': (props) => <LogOut {...props} />,
  'shield': (props) => <ShieldCheck {...props} />,
  'gift': (props) => <Gift {...props} />,
  'feather': (props) => <SensoryModalIcon {...props} />,
  'modal': (props) => <SensoryModalIcon {...props} />,
  'sensory-modal': (props) => <SensoryModalIcon {...props} />,
  'layers': (props) => <SensorySeamlessIcon {...props} />,
  'seamless': (props) => <SensorySeamlessIcon {...props} />,
  'sensory-seamless': (props) => <SensorySeamlessIcon {...props} />,
  'sprout': (props) => <SensoryOrganicIcon {...props} />,
  'plant': (props) => <SensoryOrganicIcon {...props} />,
  'sensory-organic': (props) => <SensoryOrganicIcon {...props} />,
  'leaf': (props) => <Leaf {...props} />,
  'droplet': (props) => <Droplets {...props} />,
  'quote': (props) => <Quote {...props} />
};

// Bespoke Luxury Sensory Icons for NewLilla Atelier
function SensoryModalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.5C7.5 7 5 10.5 5 14.5A7 7 0 0 0 19 14.5C19 10.5 16.5 7 12 2.5Z" strokeWidth={props.strokeWidth || 1.1} />
      <path d="M8 12.5C9.5 10.5 11 10.5 12.5 12.5C14 14.5 15.5 14.5 17 12.5" strokeWidth={props.strokeWidth || 1} />
      <path d="M7.5 15.5C9 13.5 10.5 13.5 12 15.5C13.5 17.5 15 17.5 16.5 15.5" strokeWidth={props.strokeWidth || 0.9} opacity="0.8" />
    </svg>
  );
}

function SensorySeamlessIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 21 12 12 22 3 12" strokeWidth={props.strokeWidth || 1} />
      <path d="M7 12C7 9.2 9.2 7 12 7C14.8 7 17 9.2 17 12" strokeWidth={props.strokeWidth || 1.1} />
      <path d="M7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12" strokeWidth={props.strokeWidth || 1.1} />
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    </svg>
  );
}

function SensoryOrganicIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 8.5C7.6 8.5 6.5 9.6 6.5 11C6.5 11.5 6.7 12 7 12.4C6.1 12.8 5.5 13.7 5.5 14.7C5.5 16.1 6.6 17.2 8 17.2C8.4 17.2 8.8 17.1 9.2 16.9C9.7 17.8 10.6 18.4 11.7 18.4C12.8 18.4 13.7 17.8 14.2 16.9C14.6 17.1 15 17.2 15.4 17.2C16.8 17.2 17.9 16.1 17.9 14.7C17.9 13.7 17.3 12.8 16.4 12.4C16.7 12 16.9 11.5 16.9 11C16.9 9.6 15.8 8.5 14.4 8.5C13.8 8.5 13.7 8.7 12.9 9.1C12.4 8.2 11.5 7.6 10.4 7.6C9.9 7.6 9.4 7.8 9 8.5Z" strokeWidth={props.strokeWidth || 1.1} />
      <path d="M12 18.4V22" strokeWidth={props.strokeWidth || 1.1} />
      <path d="M12 18.4C10.5 19.5 8.5 19.5 7 18.5" strokeWidth={props.strokeWidth || 1} />
      <path d="M12 18.4C13.5 19.5 15.5 19.5 17 18.5" strokeWidth={props.strokeWidth || 1} />
    </svg>
  );
}

export default function Icon({
  name,
  size = 'base', // 'small' (16px) | 'base' (24px) | 'big' (32px)
  color = 'currentColor',
  strokeWidth,
  className = '',
  style = {},
  filled = false,
  ...restProps
}) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`[IconLibrary] Icon name "${name}" not found in library.`);
    return null;
  }

  // Standardized icon sizes across application:
  // small -> 16px
  // base  -> 24px
  // big   -> 32px
  let numericSize = 24;
  if (size === 'small' || size === 'sm') {
    numericSize = 16;
  } else if (size === 'big' || size === 'lg' || size === 'large') {
    numericSize = 32;
  } else if (size === 'base' || size === 'md') {
    numericSize = 24;
  } else if (typeof size === 'number') {
    numericSize = size;
  } else if (typeof size === 'string') {
    const parsed = parseInt(size, 10);
    if (!isNaN(parsed)) {
      numericSize = parsed;
    }
  }

  // Standardized stroke width based on size:
  // small (< 24px -> 16px): 1.2px
  // base  (= 24px -> 24px): 1.3px
  // big   (> 24px -> 32px): 1.4px
  let computedStrokeWidth = strokeWidth;
  if (computedStrokeWidth === undefined || computedStrokeWidth === null) {
    if (numericSize < 24) {
      computedStrokeWidth = 1.3;
    } else if (numericSize === 24) {
      computedStrokeWidth = 1.2;
    } else {
      computedStrokeWidth = 0.8;
    }
  }

  const computedStyle = {
    color,
    flexShrink: 0,
    display: 'inline-block',
    verticalAlign: 'middle',
    ...style
  };

  const svgProps = {
    size: numericSize,
    strokeWidth: computedStrokeWidth,
    style: computedStyle,
    className: `icon icon-${name} ${className}`.trim(),
    filled,
    ...restProps
  };

  return IconComponent(svgProps);
}

// Named Icon shortcuts for convenient import e.g. import { ArrowRightIcon } from './IconLibrary'
export const ArrowRightIcon = (props) => <Icon name="arrow-right" {...props} />;
export const ArrowLeftIcon = (props) => <Icon name="arrow-left" {...props} />;
export const ChevronDownIcon = (props) => <Icon name="chevron-down" {...props} />;
export const ChevronUpIcon = (props) => <Icon name="chevron-up" {...props} />;
export const SearchIcon = (props) => <Icon name="search" {...props} />;
export const UserIcon = (props) => <Icon name="user" {...props} />;
export const CartIcon = (props) => <Icon name="cart" {...props} />;
export const HeartIcon = (props) => <Icon name="heart" {...props} />;
export const StarIcon = (props) => <Icon name="star" {...props} />;
export const CloseIcon = (props) => <Icon name="close" {...props} />;
export const CheckIcon = (props) => <Icon name="check" {...props} />;
export const FilterIcon = (props) => <Icon name="filter" {...props} />;
export const PlusIcon = (props) => <Icon name="plus" {...props} />;
export const MinusIcon = (props) => <Icon name="minus" {...props} />;
export const TrashIcon = (props) => <Icon name="trash" {...props} />;
export const EyeIcon = (props) => <Icon name="eye" {...props} />;
export const SparklesIcon = (props) => <Icon name="sparkles" {...props} />;
export const LockIcon = (props) => <Icon name="lock" {...props} />;
export const TruckIcon = (props) => <Icon name="truck" {...props} />;
export const RotateIcon = (props) => <Icon name="rotate" {...props} />;
export const GridIcon = (props) => <Icon name="grid" {...props} />;
export const InfoIcon = (props) => <Icon name="info" {...props} />;
export const PackageIcon = (props) => <Icon name="package" {...props} />;
export const TicketIcon = (props) => <Icon name="ticket" {...props} />;
export const LogoutIcon = (props) => <Icon name="logout" {...props} />;
export const ShieldIcon = (props) => <Icon name="shield" {...props} />;
export const GiftIcon = (props) => <Icon name="gift" {...props} />;
export const FeatherIcon = (props) => <Icon name="feather" {...props} />;
export const LayersIcon = (props) => <Icon name="layers" {...props} />;
export const SproutIcon = (props) => <Icon name="sprout" {...props} />;
export const LeafIcon = (props) => <Icon name="leaf" {...props} />;
export const QuoteIcon = (props) => <Icon name="quote" {...props} />;
