import type { Place } from '../../types/types.js';

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
