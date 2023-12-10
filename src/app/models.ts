export interface Contact {
  id: number,
  name: string,
  mobile: string,
  email: string,
}

export interface Place {
  id: number,
  name: string | null,
  items: Item[], 
  contactList?: Contact[],
}

export interface Item {
  id: number,
  name: string | null, 
  quantity?: number | null,
  price: number | null,
  contacts?: Contact[],
}

export interface Night {
  id: number,
  date: Date,
  places: Place[],
  contacts?: Contact[],
}