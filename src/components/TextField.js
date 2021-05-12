import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const classCol = () => {
    if (
      field.name === "firstName" ||
      field.name === "middleName" ||
      field.name === "lastName"
    ) {
      const className = "col mb-3";
      return className;
    } else {
      const className = "mb-3";
      return className;
    }
  };
  return (
    <div className={classCol()}>
      {console.log("shdgsydghagdhagd", field, meta)}
      <label htmlFor={field.name}>{label}</label>
      <input
        className={`form-control shadow-none ${
          meta.touched && meta.error && "is-invalid"
        } || ${meta.touched && !meta.error && "is-valid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} />
    </div>
  );
};
