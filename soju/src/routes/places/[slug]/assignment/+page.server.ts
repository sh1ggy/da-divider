import { groupId } from '$lib';
import { fail, type Actions, type ServerLoad } from '@sveltejs/kit';
import type { ItemAssignment, Place, PlaceContact } from '../../../../types/types';

export const load: ServerLoad = async ({ params }) => {
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
		title: `${place!.name}`,
		contacts: contacts,
		place: place,
		back: true
	};
};

export const actions: Actions = {
	submit: async ({ request, params }) => {
		// Initialise form data
		const formData = await request.formData();
		const itemAssignments = JSON.parse(formData.get('itemAssignments') as string) as ItemAssignment;

		// Err handling
		if (!itemAssignments) return;

		const body = { itemAssignments: itemAssignments };

		// fetch params initialisation
		const options = {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const url = `http://localhost:3000/places/${params.slug}/items/assign`;
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
