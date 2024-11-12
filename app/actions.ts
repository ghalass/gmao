"use server";

import { parseWithZod } from "@conform-to/zod";
// import { redirect } from "next/navigation";
import { siteSchema } from "./_schemas/site";

export async function CreateSite(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: siteSchema,
  });

  if (submission.status !== "success") return submission.reply();

  //

  return submission.reply({
    // formErrors: [
    //   "Failed to send the message. Please try again later.",
    //   "lmkjlsdk",
    // ],

    fieldErrors: {
      name: ["name not found"],
      description: ["description not found"],
    },
  });
  // return redirect("/about");
}
