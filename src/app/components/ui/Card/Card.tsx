import { ReactNode } from 'react';
import { theme } from '../../../utils/theme';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => (
  <div
    className={`bg-white rounded-2xl top-0  ${theme.shadows.card} ${theme.spacing.card} ${theme.transitions} ${
      hover ? 'hover:shadow-2xl' : ''
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;