const Button = ({
  children,
  variant = "primary",
  type = "button",
  className = "",
  ...props
}) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-secondary text-white hover:bg-secondary-dark",
    danger: "bg-danger text-white hover:bg-red-700",
    outline:
      "border border-border text-textPrimary hover:bg-background",
  };

  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
