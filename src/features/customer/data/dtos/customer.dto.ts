export interface CustomerResponseDto {
  id: string;
  companyName: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  contacts: Array<{
    id: string;
    name: string;
    email?: string;
    phone?: string;
    position?: string;
    isPrimary: boolean;
  }>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerRequestDto {
  companyName: string;
  taxId?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
}
