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

export interface Place {
	_id: string;
	name: string;
	date: Date;
	items: Item[];
	contacts: PlaceContact[];
	groupName: string;
	itemAssignments: ItemAssignment[]; // for tracking Contact & Item links
}

// Contact type for Place
export interface PlaceContact {
	id: string;
	name: string;
}

export interface Item {
	_id: string;
	name: string;
	price: number;
	// optional param to use for calcs (not for storage)
	assignedContactsCount?: number;
}

export interface ItemAssignment {
	contactId: string;
	itemId: string;
}
