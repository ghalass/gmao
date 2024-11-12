"use server";

import { siteSchema } from "../_schemas/site";
import { SiteFormState } from "../types";
import { convertZodErrors } from "@/utils/forms";

export const formHandlerAction = async (
  formData: FormData
): Promise<SiteFormState> => {
  const unvalidateSite = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const validated = siteSchema.safeParse(unvalidateSite);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return { errors };
  } else {
    return { successMsg: "Site ajputé avec succès", errors: {} };
  }
};
