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
	return { places: places };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		// Initialise form data
		const formData = await request.formData();
		const place = {
			name: formData.get('name'),
			date: formData.get('date') as unknown as Date,
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
	}
};
