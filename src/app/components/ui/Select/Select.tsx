import React, { ReactNode, useState, useRef, useEffect, Children, isValidElement } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { theme } from '../../../utils/theme';

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  children: ReactNode;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface OptionData {
  value: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({ 
  label, 
  children, 
  className = '', 
  value,
  onChange,
  disabled = false,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Extract options from children (option elements)
  const options: OptionData[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === 'option') {
      options.push({
        value: child.props.value || '',
        label: child.props.children || child.props.value || ''
      });
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (onChange) {
      // Create a synthetic event that matches HTMLSelectElement change event
      const syntheticEvent = {
        target: { value: optionValue },
        currentTarget: { value: optionValue }
      } as React.ChangeEvent<HTMLSelectElement>;
      
      onChange(syntheticEvent);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption?.label  || 'Select an option...';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className={`relative ${className}`} ref={dropdownRef}>
        {/* Hidden native select for form compatibility */}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          tabIndex={-1}
          {...props}
        >
          {children}
        </select>

        {/* Custom dropdown button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`w-full p-3 text-left bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-${theme.colors.primary}-500 focus:border-transparent ${theme.transitions} ${
            disabled
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'hover:border-gray-400 cursor-pointer'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? undefined : 'select-button'}
        >
          <div className="flex items-center justify-between">
            <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
              {displayText}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              } ${disabled ? 'opacity-50' : ''}`}
            />
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && !disabled && (
          <div 
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            role="listbox"
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-gray-500 text-sm">
                No options available
              </div>
            ) : (
              options.map((option, index) => (
                <div
                  key={option.value || index}
                  onClick={() => handleSelect(option.value)}
                  className={`px-3 py-2 cursor-pointer transition-colors hover:bg-gray-50 flex items-center justify-between ${
                    value === option.value 
                      ? `bg-${theme.colors.primary}-50 text-${theme.colors.primary}-700` 
                      : 'text-gray-900'
                  }`}
                  role="option"
                  aria-selected={value === option.value}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className={`w-4 h-4 text-${theme.colors.primary}-600`} />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;