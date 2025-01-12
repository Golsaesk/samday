import { HTMLAttributes, } from 'react';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: any;
  className?: string;
  fullMobileWidth?: boolean;
  color?: 'paper1' | 'paper2' | 'paper3';
}

export default function Card({
  children,
  className,
  fullMobileWidth,
  color = 'paper1',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`${styles.root} ${className ?? ''} color_${color} ${fullMobileWidth ? styles.root__fullMobileWidth : ''}`}
    >
      {children}
    </div>
  );
}