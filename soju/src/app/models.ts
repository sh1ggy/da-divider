export interface Contact {
  id: number;
  name: string;
  mobile: string;
  email: string;
}

export interface Place {
  id?: number;
  name: string | null;
  items: Item[];
  contacts?: Contact[];
}

export interface Item {
  id: number;
  name: string | null;
  quantity?: number | null;
  price: number | null;
  contacts?: Contact[];
}

export interface Night {
  id: number;
  date: Date;
  places: Place[];
  // TODO, remove the above and restructure model for Night. 
  placeIds?: number[];
  contacts?: Contact[];
}

export type NewPlaceRequest = {
  userCreatedId: number;
  name: string;
  nightId: number;
};