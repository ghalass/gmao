"use client";

import { siteSchema } from "@/app/_schemas/site";
import { CreateSite } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useActionState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const NewSitePage = () => {
  const [lastResult, action] = useActionState(CreateSite, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: siteSchema });
    },
    // Validate field once user leaves the field
    shouldValidate: "onBlur",
    // Then, revalidate field as user types again
    shouldRevalidate: "onInput",
  });

  return (
    <div>
      <h1 className=" text-center d-flex align-items-center justify-content-center">
        <FaMapMarkerAlt className="text-secondary" />
        Ajouter un nouveau site
      </h1>

      <small className="text-danger fst-italic" id={form.errorId}>
        {form.errors}
      </small>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <div className="form-floating mb-3">
          <input
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.initialValue}
            id="name"
            type="text"
            className="form-control"
            placeholder="PG11"
          />
          <label htmlFor="name">Nom du site</label>
          <small className="text-danger fst-italic">{fields.name.errors}</small>
        </div>

        <div className="form-floating mb-3">
          <input
            key={fields.description.key}
            name={fields.description.name}
            defaultValue={fields.description.initialValue}
            type="text"
            className="form-control"
            id="description"
            placeholder="PG11"
          />
          <label htmlFor="description">Description du site</label>
          <small className="text-danger fst-italic">
            {fields.description.errors}
          </small>
        </div>

        <button className="btn btn-sm btn-outline-secondary">Submit</button>
      </form>
    </div>
  );
};

export default NewSitePage;
