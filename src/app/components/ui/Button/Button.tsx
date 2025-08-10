import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  className?: string;
  icon?: LucideIcon;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-md',
    secondary: 'bg-gray-300 hover:bg-gray-400 text-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost: 'text-gray-400 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const sizes: Record<string, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 16 : 20} className={children ? 'mr-2' : ''} />}
      {children}
    </button>
  );
};

export default Button;