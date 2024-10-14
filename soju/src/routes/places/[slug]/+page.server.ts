import { formMissingErrorMsg, groupId } from '$lib';
import { fail } from '@sveltejs/kit';
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
		place: place,
		back: true
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
		const name = formData.get('name');
		const price = formData.get('price');

		// Err handling
		if (!name || !price) {
			return fail(400, { errMsg: formMissingErrorMsg });
		}

		const item: Item = {
			name: formData.get('name'),
			price: parseInt(price.toString())
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
		let errFlag = false;

		// Commence fetch operation
		const response = await fetch(url, options)
			.then(async (res) => {
				if (!res.ok) {
					throw { msg: JSON.parse(await res.text()).message, status: res.status };
				}
				return res.json();
			})
			.then((data) => {
				return data;
			})
			.catch(async (e) => {
				errFlag = true;
				return new Response(e.msg, { status: e.status });
			});

		if (!response) return;
		if (errFlag) return fail(response.status, { errMsg: await response.text() });
		return { response: response };
	},
	deleteItem: async ({ request, params }) => {
		// Initialise form data
		const formData = await request.formData();
		const itemId = formData.get('itemId');

		// Err handling
		if (!itemId) return;

		// fetch params initialisation
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const url = `http://localhost:3000/places/${params.slug}/item/${itemId}`;
		let errFlag = false;

		// Commence fetch operation
		const response = await fetch(url, options)
			.then(async (res) => {
				if (!res.ok) {
					throw { msg: JSON.parse(await res.text()).message, status: res.status };
				}
				return res.json();
			})
			.then((data) => {
				return data;
			})
			.catch(async (e) => {
				errFlag = true;
				return new Response(e.msg, { status: e.status });
			});

		if (!response) return;
		if (errFlag) return fail(response.status, { errMsg: await response.text() });
		return { response: response };
	}
};
