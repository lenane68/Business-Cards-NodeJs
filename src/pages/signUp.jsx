import { useState } from "react";
import { useFormik } from "formik";
import { Navigate, useNavigate } from "react-router";
import Joi from "joi";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import { useAuth } from "../context/auth.context";
import { toast } from "react-toastify";


function SignUp() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const { user, createUser } = useAuth();

  const handleReset = () => {
    Object.entries(values).forEach(([key]) => {
      setFieldValue(key, key === "biz" ? false : "");
    });
    setServerError("");
  };
  

  const {
    getFieldProps,
    handleSubmit,
    touched,
    errors,
    values,
    setFieldValue,
    isValid,
  } = useFormik({
    validateOnMount: true,
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      image: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
      biz: false,
    },
    validate(values) {
      const schema = Joi.object({
        first: Joi.string().min(2).required().label("First name"),
        middle: Joi.string().allow("").label("Middle name"),
        last: Joi.string().min(2).required().label("Last name"),
        phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().label("Phone"),
        email: Joi.string().email({ tlds: false }).required().label("Email"),
        password: Joi.string()
          .min(9)
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@#$%^&*\-_\(\)]).{9,}$/)
          .required()
          .label("Password"),
        image: Joi.string().uri().allow("").label("Image url"),
        alt: Joi.string().allow("").label("Image alt"),
        state: Joi.string().allow("").label("State"),
        country: Joi.string().required().label("Country"),
        city: Joi.string().required().label("City"),
        street: Joi.string().required().label("Street"),
        houseNumber: Joi.number().positive().required().label("House number"),
        zip: Joi.string().allow("").label("Zip"),
        biz: Joi.boolean(),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) return null;

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    onSubmit: async (values) => {

      try {
        const userToSave = {
          ...values,
          role: values.biz ? "biz" : "regular",
        };
        await createUser(userToSave);
        toast.success("Registration successful 👌"); 
        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  if (user) return <Navigate to="/" />;

  return (
    <div className="container">
      <PageHeader title="REGISTER" description="Open a new account" />
      <div className="row justify-content-center mt-4">
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="form-signup" noValidate autoComplete="off">
            {serverError && <div className="alert alert-danger">{serverError}</div>}
            <div className="row">
              <div className="col-md-4">
                <Input {...getFieldProps("first")} error={touched.first && errors.first} label="First name *" required />
              </div>
              <div className="col-md-4">
                <Input {...getFieldProps("middle")} error={touched.middle && errors.middle} label="Middle name" />
              </div>
              <div className="col-md-4">
                <Input {...getFieldProps("last")} error={touched.last && errors.last} label="Last name *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("phone")} error={touched.phone && errors.phone} label="Phone *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("email")} error={touched.email && errors.email} label="Email *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("password")} error={touched.password && errors.password} type="password" label="Password *" required />
              </div>
              <div className="col-md-6" />
              <div className="col-md-6">
                <Input {...getFieldProps("image")} error={touched.image && errors.image} label="Image url" />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("alt")} error={touched.alt && errors.alt} label="Image alt" />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("state")} error={touched.state && errors.state} label="State" />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("country")} error={touched.country && errors.country} label="Country *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("city")} error={touched.city && errors.city} label="City *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("street")} error={touched.street && errors.street} label="Street *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("houseNumber")} error={touched.houseNumber && errors.houseNumber} label="House number *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("zip")} error={touched.zip && errors.zip} label="Zip" />
              </div>
            </div>
            <div className="form-check my-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="biz"
                checked={values.biz}
                onChange={(e) => setFieldValue("biz", e.target.checked)}
              />
              <label className="form-check-label" htmlFor="biz">
                Signup as business
              </label>
            </div>
            <div className="row mt-3">
  <div className="col-4">
    <button type="button" className="btn btn-outline-danger w-100" onClick={() => navigate(-1)}>
      Cancel
    </button>
  </div>
  <div className="col-4">
    <button type="button" className="btn btn-outline-secondary w-100" onClick={handleReset}>
      ↻ Reset
    </button>
  </div>
  <div className="col-4">
    <button type="submit" disabled={!isValid} className="btn btn-primary w-100">
      Submit
    </button>
  </div>
</div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
