export interface Contact {
  name: string,
  mobile: string,
  email: string,
}

export interface Place {
  name: string | null,
  items: Item[], 
  contactList?: Contact[],
}

export interface Item {
  name: string | null, 
  price: number | null,
  contact?: Contact,
}