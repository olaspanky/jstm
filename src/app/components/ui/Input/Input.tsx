import { theme } from '../../../utils/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <input
      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.colors.primary}-500 focus:border-transparent ${theme.transitions} ${
        error ? 'border-red-500' : ''
      } ${className}`}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

export default Input;