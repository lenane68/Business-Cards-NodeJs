import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { useAuth } from "../context/auth.context";

function UpdateProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    getFieldProps,
    handleSubmit,
    touched,
    errors,
    resetForm,
    isValid
  } = useFormik({
    validateOnMount: true,
    enableReinitialize: true,
    initialValues: {
      first: user?.first || "",
      last: user?.last || "",
      phone: user?.phone || "",
      email: user?.email || "",
      image: user?.image || "",
      alt: user?.alt || "",
      city: user?.city || "",
      street: user?.street || "",
      houseNumber: user?.houseNumber || "",
      zip: user?.zip || ""
    },
    validate(values) {
      const schema = Joi.object({
        first: Joi.string().min(2).required().label("First name"),
        last: Joi.string().min(2).required().label("Last name"),
        phone: Joi.string().pattern(/^0[2-9]\d{7,8}$/).required().label("Phone"),
        email: Joi.string().email({ tlds: false }).required().label("Email"),
        image: Joi.string().uri().allow("").label("Image URL"),
        alt: Joi.string().allow("").label("Image Alt"),
        city: Joi.string().required().label("City"),
        street: Joi.string().required().label("Street"),
        houseNumber: Joi.number().positive().required().label("House Number"),
        zip: Joi.string().allow("").label("Zip")
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) return null;

      const errors = {};
      error.details.forEach(detail => {
        errors[detail.path[0]] = detail.message;
      });
      return errors;
    },
    onSubmit: async (values) => {
      setServerError("");
      setSuccessMessage("");
      try {
        if (!user || !user.id) throw new Error("No user in context");
        await updateUser(user.id, values);
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
      } catch (err) {
        console.error(err);
        setServerError("Failed to update profile.");
      }
    },
  });

  return (
    <div className="container">
      <PageHeader title="Update Profile" description="Edit your personal information" />
      <div className="row justify-content-center mt-4">
        <div className="col-md-10">
          <form onSubmit={handleSubmit} className="form-signup" noValidate autoComplete="off">
            {serverError && <div className="alert alert-danger">{serverError}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="row">
              <div className="col-md-6">
                <Input {...getFieldProps("first")} error={touched.first && errors.first} label="First name *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("last")} error={touched.last && errors.last} label="Last name *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("phone")} error={touched.phone && errors.phone} label="Phone *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("email")} error={touched.email && errors.email} label="Email *" required />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("image")} error={touched.image && errors.image} label="Image url" />
              </div>
              <div className="col-md-6">
                <Input {...getFieldProps("alt")} error={touched.alt && errors.alt} label="Image alt" />
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

            <div className="row mt-3">
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100"
                  onClick={() => {
                    resetForm();
                    setServerError("");
                    setSuccessMessage("");
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="col-4">
                <button
                  type="button"
                  className="btn btn-outline-danger w-100"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-4">
                <button type="submit" disabled={!isValid} className="btn btn-primary w-100">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
