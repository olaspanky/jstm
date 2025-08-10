import { ReactNode } from 'react';
import { theme } from '../../../utils/theme';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants: Record<string, string> = {
    primary: `bg-${theme.colors.primary}-50 text-${theme.colors.primary}-600`,
    success: `bg-${theme.colors.success}-50 text-${theme.colors.success}-600`,
    warning: `bg-${theme.colors.warning}-50 text-${theme.colors.warning}-600`,
    danger: `bg-${theme.colors.danger}-50 text-${theme.colors.danger}-600`,
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;