import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import Joi from "joi";

import cardsService from "../services/cardsService";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import useCard from "../hooks/useCard";

function CardUpdate() {
  const { id } = useParams();
  const card = useCard(id);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },

    validate(values) {
      const schema = Joi.object({
        title: Joi.string().min(2).max(255).required().label("Title"),
        subtitle: Joi.string().min(2).max(255).required().label("Subtitle"),
        description: Joi.string().min(2).max(1024).required().label("Description"),
        phone: Joi.string()
          .min(9)
          .max(10)
          .required()
          .regex(/^0[2-9]\d{7,8}$/)
          .label("Phone"),
        email: Joi.string().email({ tlds: false }).required().label("Email"),
        web: Joi.string().uri().allow("").label("Website"),
        image: Joi.string().uri().allow("").label("Image URL"),
        alt: Joi.string().allow("").label("Image alt"),
        state: Joi.string().allow("").label("State"),
        country: Joi.string().required().label("Country"),
        city: Joi.string().required().label("City"),
        street: Joi.string().required().label("Street"),
        houseNumber: Joi.number().positive().required().label("House Number"),
        zip: Joi.string().allow("").label("Zip"),
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
        await cardsService.updateCard(id, values);
        navigate("/my-cards");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!card) return;
    form.setValues({ ...card.data });
  }, [card]);

  const handleReset = () => {
    if (card) {
      form.setValues({ ...card.data });
    }
  };

  return (
    <div className="container">
      <PageHeader title="Edit Card" description="Update your business card information" />
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off" className="form-signup">
        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <div className="row">
          <div className="col-md-6">
            <Input {...form.getFieldProps("title")} label="Title *" required error={form.touched.title && form.errors.title} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("subtitle")} label="Subtitle *" required error={form.touched.subtitle && form.errors.subtitle} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("description")} label="Description *" required error={form.touched.description && form.errors.description} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("phone")} label="Phone *" required error={form.touched.phone && form.errors.phone} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("email")} label="Email *" required error={form.touched.email && form.errors.email} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("web")} label="Web" error={form.touched.web && form.errors.web} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("image")} label="Image url" error={form.touched.image && form.errors.image} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("alt")} label="Image alt" error={form.touched.alt && form.errors.alt} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("state")} label="State" error={form.touched.state && form.errors.state} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("country")} label="Country *" required error={form.touched.country && form.errors.country} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("city")} label="City *" required error={form.touched.city && form.errors.city} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("street")} label="Street *" required error={form.touched.street && form.errors.street} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("houseNumber")} label="Housenumber *" required error={form.touched.houseNumber && form.errors.houseNumber} />
          </div>
          <div className="col-md-6">
            <Input {...form.getFieldProps("zip")} label="Zip" error={form.touched.zip && form.errors.zip} />
          </div>
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
            <button type="submit" disabled={!form.isValid} className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CardUpdate;
