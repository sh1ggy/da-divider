export interface Contact {
  name: string;
  email: string;
  mobile: string;
}

export interface ContactUpdateRequest {
  email: string;
  newContact: Contact;
}
