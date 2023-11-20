export interface Contact {
  name: string,
  mobile: string,
  email: string,
}

export interface Item {
  name: string | null, 
  price: number | null,
  contact?: Contact,
}