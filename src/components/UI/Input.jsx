import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";

export const Input = ({ label, placeholder, name, type, as }) => {
  return (
    <div className="mb-2">
      {label && (
        <div className="block mb-1 pl-2 text-sm font-medium text-zinc-700">
          {label}
        </div>
      )}
      <div className="bg-gray-50 border border-zinc-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 py-2">
        <Field
          name={name}
          id={name}
          type={type ? type : "text"}
          className=" bg-transparent focus:outline-none w-full"
          placeholder={placeholder}
          as={as && as}
        />
      </div>
      <ErrorMessage
        name={name}
        id={name}
        className="text-red-600 text-[11px]"
        component="div"
      />
    </div>
  );
};

export const PasswordInput = ({ label, placeholder, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-2">
      {label && (
        <div className="block mb-1 pl-2 text-sm font-medium text-zinc-700">
          {label}
        </div>
      )}
      <div className="bg-gray-50 border border-zinc-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex gap-2 w-full p-3 py-2">
        <Field
          name={name}
          id={name}
          type={showPassword ? "text" : "password"}
          className=" bg-transparent focus:outline-none w-full"
          placeholder={placeholder}
        />
        <div
          className="text-[25px] text-zinc-300 hover:text-zinc-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <InlineIcon icon="humbleicons:eye-off" />
          ) : (
            <InlineIcon icon="uiw:eye-o" />
          )}
        </div>
      </div>
      <ErrorMessage
        name={name}
        className="text-red-600 text-[11px]"
        component="div"
      />
    </div>
  );
};

export const OptionInput = ({ label, options, name }) => {
  return (
    <div className="mb-2">
      {label && (
        <div className="block mb-1 pl-2 text-sm font-medium text-zinc-700">
          {label}
        </div>
      )}
      <div className="bg-gray-50 border border-zinc-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 py-2">
        <Field
          as="select"
          name={name}
          id={name}
          className=" bg-transparent focus:outline-none w-full"
        >
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.title}
            </option>
          ))}
        </Field>
      </div>
      <ErrorMessage
        name={name}
        className="text-red-600 text-[11px]"
        component="div"
      />
    </div>
  );
};


export const RadioInput = ({ label, name, value }) => {
  return (
    <div className="mb-2">
      <div className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between gap-2 w-full p-3 py-2">
        {label && (
          <div
            htmlFor={value}
            className="block mb-1 pl-2 text-sm font-medium text-zinc-700"
          >
            {label}
          </div>
        )}
        <Field
          type="radio"
          name={name}
          id={value}
          value={value}
          className=" w-6 h-6  appearance-none rounded-full border-2 border-solid border-zinc-400 cursor-pointer checked:border-blue-500 checked:bg-blue-500 "
        />
      </div>
      <ErrorMessage
        name={name}
        className="text-red-600 text-[11px]"
        component="div"
      />
    </div>
  );
};
