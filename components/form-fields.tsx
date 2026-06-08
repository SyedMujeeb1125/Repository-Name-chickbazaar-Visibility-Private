type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
};

type InputProps = BaseProps & {
  type?: string;
  placeholder?: string;
  pattern?: string;
  min?: string;
  accept?: string;
  helperText?: string;
};

export function TextInput({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  pattern,
  min,
  accept,
  helperText,
  className = ""
}: InputProps) {
  return (
    <label className={`grid gap-2 text-sm font-semibold text-navy ${className}`}>
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        min={min}
        accept={accept}
        className="focus-ring min-h-12 rounded-md border border-slate-200 bg-white px-4 text-slate-800"
      />
      {helperText ? <span className="text-xs font-medium leading-5 text-slate-500">{helperText}</span> : null}
    </label>
  );
}

type TextAreaProps = BaseProps & {
  placeholder?: string;
};

export function TextArea({
  label,
  name,
  placeholder,
  required = false,
  className = ""
}: TextAreaProps) {
  return (
    <label className={`grid gap-2 text-sm font-semibold text-navy ${className}`}>
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={4}
        className="focus-ring rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-800"
      />
    </label>
  );
}

type SelectProps = BaseProps & {
  options: string[];
};

export function SelectInput({ label, name, options, required = true, className = "" }: SelectProps) {
  return (
    <label className={`grid gap-2 text-sm font-semibold text-navy ${className}`}>
      {label}
      <select
        name={name}
        required={required}
        className="focus-ring min-h-12 rounded-md border border-slate-200 bg-white px-4 text-slate-800"
        defaultValue=""
      >
        <option value="" disabled>
          Select option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
