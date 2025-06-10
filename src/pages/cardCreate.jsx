import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCard } from "../services/cardsService";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/common/pageHeader";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth.context";

const schema = yup.object().shape({
  title: yup.string().required().min(2),
  subtitle: yup.string().required().min(2),
  description: yup.string().required().min(10),
  phone: yup.string().required().matches(/^0[2-9]\d{7,8}$/),
  email: yup.string().email().required(),
  web: yup.string().url().nullable(),
  image: yup.string().url().required(),
  alt: yup.string().required(),
  country: yup.string().required(),
  city: yup.string().required(),
  street: yup.string().required(),
  houseNumber: yup.number().required().positive(),
  zip: yup.string().nullable(),
  state: yup.string().nullable(),
});

function CardCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const cardData = {
      ...data,
      userEmail: user.email,
    };

    try {
      await createCard(cardData);
      toast.success("Card created successfully");
      navigate("/my-cards");
    } catch (error) {
      toast.error("Failed to create card");
    }
  };

  return (
    <div className="container py-4">
      <PageHeader title="Create Card" description="Create your new business card" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <input {...register("title")} placeholder="Title *" className="form-control" />
            {errors.title && <div className="text-danger">{errors.title.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("subtitle")} placeholder="Subtitle *" className="form-control" />
            {errors.subtitle && <div className="text-danger">{errors.subtitle.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("description")} placeholder="Description *" className="form-control" />
            {errors.description && <div className="text-danger">{errors.description.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("phone")} placeholder="Phone *" className="form-control" />
            {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("email")} placeholder="Email *" className="form-control" />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("web")} placeholder="Web" className="form-control" />
            {errors.web && <div className="text-danger">{errors.web.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("image")} placeholder="Image url *" className="form-control" />
            {errors.image && <div className="text-danger">{errors.image.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("alt")} placeholder="Image alt *" className="form-control" />
            {errors.alt && <div className="text-danger">{errors.alt.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("state")} placeholder="State" className="form-control" />
          </div>
          <div className="col-md-6">
            <input {...register("country")} placeholder="Country *" className="form-control" />
            {errors.country && <div className="text-danger">{errors.country.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("city")} placeholder="City *" className="form-control" />
            {errors.city && <div className="text-danger">{errors.city.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("street")} placeholder="Street *" className="form-control" />
            {errors.street && <div className="text-danger">{errors.street.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("houseNumber")} placeholder="House Number *" className="form-control" />
            {errors.houseNumber && <div className="text-danger">{errors.houseNumber.message}</div>}
          </div>
          <div className="col-md-6">
            <input {...register("zip")} placeholder="Zip" className="form-control" />
          </div>

          <div className="col-4">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-outline-danger w-100">
              Cancel
            </button>
          </div>
          <div className="col-4">
            <button type="button" onClick={() => reset()} className="btn btn-outline-secondary w-100">
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
  );
}

export default CardCreate;
