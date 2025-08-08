import React, { useId } from "react";

const Select = React.forwardRef(
  ({ label, className = "", options, ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && <label htmlFor={id} className=""></label>}
        <select
          {...props}
          className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
          id={id}
          ref={ref}
        >
          {options?.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;

//we can also write in this format
// export default React.forwardRef(Select);
