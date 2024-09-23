export interface Group {
	_id: string;
	name: string;
	contacts: Contact[];
}

export interface Contact {
	_id: string;
	name: string;
	email: string;
	mobile: string;
}
