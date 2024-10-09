import { groupId } from '$lib';
import type { Item, Place, PlaceContact } from '../../../types/types.js';

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

	return {
		title: 'Edit Place',
		contacts: contacts,
		place: place
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	editPlace: async ({}) => {
		return { success: true };
	},
	addItem: async ({ params, request }) => {
		// Initialise form data
		const formData = await request.formData();
		const item: Item = {
			name: formData.get('name'),
			price: parseInt(formData.get('price')!.toString())
		} as Item;

		// fetch params initialisation
		const body = JSON.stringify(item);
		const options = {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const url = `http://localhost:3000/places/${params.slug}/item`;

		let response = undefined;
		// Commence fetch operation
		await fetch(url, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				response = data;
			})
			.catch((e) => {
				console.log(e);
				response = undefined;
			});

		// TODO: proper response
		return { success: true };
	}
};
