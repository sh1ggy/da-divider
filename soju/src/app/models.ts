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