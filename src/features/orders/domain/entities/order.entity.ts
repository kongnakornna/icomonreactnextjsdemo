import { z } from 'zod';

export const OrderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().positive(),
  unitPrice: z.number().positive(),
});

export const OrderSchema = z.object({
  id: z.string(),
  orderNo: z.string(),
  customerId: z.string(),
  items: z.array(OrderItemSchema),
  totalAmount: z.number().positive(),
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  createdAt: z.string().datetime(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
