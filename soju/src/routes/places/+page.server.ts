import { fail } from '@sveltejs/kit';
import type { Place } from '../../types/types.js';

const groupName = 'coomers';

/** @type {import('./$types').PageLoad} */
export async function load() {
	let places: Place[] | undefined = undefined;

	const options = { method: 'GET' };
	const url = `http://localhost:3000/places?groupName=${'coomers'}`;

	// Fetching GET all Contacts for Group
	await fetch(url, options)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			places = data;
		});

	if (!places) return;
	return { title: 'Places', places: places };
}

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		// Initialise form data
		const formData = await request.formData();
		const name = formData.get('name');
		const date =  formData.get('date') as unknown as Date; // todo: fix this

		if (!name || !date) {
			return fail(400, { missing: true });
		}

		const place = {
			name: name,
			date: date,
			groupName: groupName
		} as Place;

		// fetch params initialisation
		const body = JSON.stringify(place);
		const options = {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const url = `http://localhost:3000/places`;

		let response = undefined;

		// Commence fetch operation
		await fetch(url, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				response = data;
			});

		if (!response) return;
		return { response: response };
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const placeId = formData.get('placeId');

		// Fetch initialisation
		const url = `http://localhost:3000/places/${placeId}`;
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		// Commence fetch operation
		await fetch(url, options)
			.then((res) => res.json())
			.then((data) => console.log(data));
	}
};
