import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const variantStyles: { [key in NonNullable<ButtonProps["variant"]>]: string } =
  {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    ghost: "bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-200",
  };

const sizeStyles: { [key in NonNullable<ButtonProps["size"]>]: string } = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-5 py-3 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  className,
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        {
          "w-full": fullWidth,
          "opacity-50 cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
