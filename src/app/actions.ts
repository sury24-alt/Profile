"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});

type ContactFormState = {
  success: boolean;
  message?: string;
};

export async function sendContactMessage(
  values: z.infer<typeof formSchema>,
): Promise<ContactFormState> {
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  // In a real application, you would send an email here.
  // For this demo, we'll just log it and simulate a delay.
  console.log("Received contact form submission:", parsed.data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
  };
}
