export interface CustomerContact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  position?: string;
  isPrimary: boolean;
}

export interface Customer {
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
  contacts: CustomerContact[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
