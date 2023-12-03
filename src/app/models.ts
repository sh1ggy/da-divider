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
  quantity?: number | null,
  price: number | null,
  contacts?: Contact[],
}

export interface Night {
  date: Date,
  places: Place[],
  contacts?: Contact[],
}