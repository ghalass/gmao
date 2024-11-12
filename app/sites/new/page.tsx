"use client";

import { formHandlerAction } from "@/app/_actions/formHandler";
import { StringMap } from "@/app/types";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { FaMapMarkerAlt } from "react-icons/fa";

const NewSitePage = () => {
  const [errors, setErrors] = useState<StringMap>({});
  const formRef = useRef<HTMLFormElement>(null);

  const { pending } = useFormStatus();

  const handleFormSubmit = async (formData: FormData) => {
    const { errors, successMsg } = await formHandlerAction(formData);

    setErrors(errors || {});
    if (successMsg) {
      toast.success(successMsg);
      formRef.current?.reset();
    }
  };
  return (
    <div>
      <h1 className=" text-center d-flex align-items-center justify-content-center">
        <FaMapMarkerAlt className="text-secondary" />
        Ajouter un nouveau site
      </h1>
      <form action={handleFormSubmit} ref={formRef}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="PG11"
          />
          <label htmlFor="name">Nom du site</label>
          {errors?.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="PG11"
          />
          <label htmlFor="description">Description du site</label>
          {errors?.description && (
            <small className="text-danger">{errors.description}</small>
          )}
        </div>
        <button type="submit" className="btn btn-sm btn-outline-secondary">
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default NewSitePage;
