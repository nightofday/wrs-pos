export interface Customer {
    id: string
    name: string
    address: string
    phone: string
    email: string
    notes?: string
    photo?: string
    status: 'active' | 'inactive'
    customerType: 'reseller' | 'walk-in'
  }