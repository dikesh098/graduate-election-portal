import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(3, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  graduationYear: z
    .number()
    .int()
    .min(1980)
    .max(new Date().getFullYear(), "Graduation year cannot be in the future"),
  university: z.string().min(3, "Enter your university/college name"),
  district: z.string().min(2, "Select your district"),
  address: z.string().min(10, "Enter your full residential address"),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const eligibilitySchema = z.object({
  graduationYear: z.number().int(),
  residesInMaharashtra: z.boolean(),
  district: z.string().min(2),
});

export type EligibilityInput = z.infer<typeof eligibilitySchema>;

export const volunteerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  district: z.string().min(2),
  availability: z.string().min(2),
  message: z.string().optional(),
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
