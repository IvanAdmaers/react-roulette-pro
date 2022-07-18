import React from 'react';

interface IPrizesWrapperProps {
  type: 'horizontal' | 'vertical' | 'circle';
  children: React.ReactNode;
  className?: string;
  tagName?: React.ElementType;
  style?: React.CSSProperties;
}

export default IPrizesWrapperProps;
