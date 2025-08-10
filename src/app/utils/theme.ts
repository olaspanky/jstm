export const theme = {
  colors: {
    primary: 'indigo',
    secondary: 'gray',
    success: 'green',
    warning: 'yellow',
    danger: 'red',
  },

  gradients: {
    primary: 'from-blue-50 to-indigo-100',
    card: 'from-white to-gray-50',
    stats: {
      total: 'from-blue-500 to-blue-600',
      completed: 'from-green-500 to-green-600',
      pending: 'from-orange-500 to-orange-600',
    },
  },

  shadows: {
    card: 'shadow-xl hover:shadow-2xl',
    button: 'shadow-lg hover:shadow-xl',
    modal: 'shadow-2xl',
  },

  transitions: 'transition-all duration-200',

  spacing: {
    section: 'mb-6',
    card: 'p-6',
    button: 'px-6 py-3',
  },
};