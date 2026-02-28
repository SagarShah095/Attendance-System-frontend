const Input = ({ label, className, ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 bg-white dark:bg-gray-800 dark:text-white"
      required
    />
  </div>
);

export default Input;
