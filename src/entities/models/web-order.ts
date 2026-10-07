import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
  totalPrice: z.number().positive(),
  notes: z.string().optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;

export const webOrderSchema = z.object({
  id: z.string(),
  orderNo: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  items: z.array(orderItemSchema).default([]),
  totalAmount: z.number().positive(),
  notes: z.string().optional(),
  dueDate: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type WebOrder = z.infer<typeof webOrderSchema>;

export const createWebOrderSchema = webOrderSchema
  .omit({ id: true, orderNo: true, createdAt: true, updatedAt: true })
  .partial({ items: true, totalAmount: true });

export type CreateWebOrder = z.infer<typeof createWebOrderSchema>;
