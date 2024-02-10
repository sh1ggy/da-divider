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
  placeId?: number;
  contacts?: Contact[];
}

export interface Night {
  id: number;
  date: Date;
  // TODO, remove the above and restructure model for Night. 
  placeIds?: number[];
  contactIds?: number[];
  contacts?: Contact[];
}

interface BaseRequest {
  userCreatedId: number, // creating/editing user
}

export interface NewPlaceRequest extends BaseRequest {
  name: string;
  nightId: number;
};

export interface NewNightRequest extends BaseRequest {
  date: string,
}

export interface NewContactRequest extends BaseRequest {
  name: string,
  email: string,
  mobile: string
}

export interface EditContactRequest extends BaseRequest {
  contact: Contact,
}

export interface EditPlaceRequest extends BaseRequest {
  place: Place,
}

export interface NewItemRequest extends BaseRequest {
  name: string,
  price: number,
  placeId: number,
}

export interface EditItemRequest extends BaseRequest {
  item: Item,
}

export interface EditNightRequest extends BaseRequest {
  night: Night,
}