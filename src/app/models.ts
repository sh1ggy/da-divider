export interface Contact {
  name: string,
  mobile: string,
  email: string,
}

export interface Item {
  name: string, 
  price: number,
  contact?: Contact,
}