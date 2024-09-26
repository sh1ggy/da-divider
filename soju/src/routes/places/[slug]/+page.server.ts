import type { Place, PlaceContact } from '../../../types/types.js';

const groupId = '66a80e0c312e1ebdd11ed13f';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};

	let place: Place | undefined = undefined;
	let contacts: PlaceContact[] | undefined = undefined;
  
	let url = `http://localhost:3000/places/${params.slug}`;

	await fetch(url, options)
		.then((res) => res.json())
		.then((data) => (place = data));

	url = `http://localhost:3000/groups/${groupId}/contacts`;
	await fetch(url, options)
		.then((res) => res.json())
		.then((data) => (contacts = data));

    console.log(contacts);

	return {
    contacts: contacts,
		place: place
	};
};
