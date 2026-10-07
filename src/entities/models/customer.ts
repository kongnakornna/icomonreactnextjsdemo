import { z } from 'zod';

export const customerContactSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

export type CustomerContact = z.infer<typeof customerContactSchema>;

export const customerSchema = z.object({
  id: z.string(),
  companyName: z.string().min(1),
  taxId: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  contacts: z.array(customerContactSchema).default([]),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Customer = z.infer<typeof customerSchema>;

export const createCustomerSchema = customerSchema
  .omit({ id: true, createdAt: true, updatedAt: true })
  .partial({ contacts: true });

export type CreateCustomer = z.infer<typeof createCustomerSchema>;
