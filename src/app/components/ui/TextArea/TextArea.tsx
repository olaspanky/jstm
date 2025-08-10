import { theme } from '../../../utils/theme';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, className = '', ...props }) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    <textarea
      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.colors.primary}-500 focus:border-transparent ${theme.transitions} resize-none ${className}`}
      {...props}
    />
  </div>
);

export default TextArea;