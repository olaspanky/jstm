export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
  };
  gradients: {
    primary: string;
    card: string;
    stats: {
      total: string;
      completed: string;
      pending: string;
    };
  };
  shadows: {
    card: string;
    button: string;
    modal: string;
  };
  transitions: string;
  spacing: {
    section: string;
    card: string;
    button: string;
  };
}