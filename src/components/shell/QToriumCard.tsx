import React, { useState } from 'react';
import { QToriumCardProminence } from '../../types/qtorium';

interface QToriumCardProps {
  children: React.ReactNode;
  prominence?: QToriumCardProminence;
  onTap?: () => void;
  className?: string;
  padding?: string;
  darkMode?: boolean;
  id?: string;
}

export const QToriumCard: React.FC<QToriumCardProps> = ({
  children,
  prominence = 'standard',
  onTap,
  className = '',
  padding = 'p-6',
  darkMode = true,
  id,
}) => {
  const [hovering, setHovering] = useState(false);

  const isHero = prominence === 'hero';
  const isPreview = prominence === 'preview';
  const isUtility = prominence === 'utility';

  // Clean Minimalism surface background styling:
  const bgClass = darkMode
    ? isHero
      ? 'bg-[#1e293b]'
      : isUtility
        ? 'bg-[#1e293b]/70'
        : 'bg-[#1e293b]'
    : isHero
      ? 'bg-white'
      : isUtility
        ? 'bg-slate-50'
        : 'bg-white';

  const roundedClass = 'rounded-2xl';

  // Clean Minimalism borders:
  let borderStyle = '';
  if (!isUtility) {
    if (darkMode) {
      borderStyle = hovering
        ? 'border border-blue-500/70'
        : 'border border-slate-800';
    } else {
      borderStyle = hovering
        ? 'border border-blue-300'
        : 'border border-slate-200';
    }
  } else {
    borderStyle = darkMode
      ? 'border border-slate-800/80'
      : 'border border-slate-200/80';
  }

  const shadowClass = hovering
    ? darkMode
      ? 'shadow-md'
      : 'shadow-md'
    : darkMode
      ? 'shadow-xs'
      : 'shadow-xs';

  const cursorClass = onTap ? 'cursor-pointer' : '';

  return (
    <div
      id={id}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={onTap}
      style={{
        transform: hovering ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'transform 140ms ease, box-shadow 140ms ease, border-color 140ms ease',
      }}
      className={`relative ${bgClass} ${roundedClass} ${borderStyle} ${shadowClass} ${cursorClass} ${padding} ${className}`}
    >
      {children}
    </div>
  );
};
