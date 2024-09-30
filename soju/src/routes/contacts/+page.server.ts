import { groupId } from '$lib';
import { error, fail } from '@sveltejs/kit';
import type { Contact } from '../../types/types.js';

/** @type {import('./$types').PageLoad} */
export async function load() {
	let contacts: Contact[] | undefined = undefined;

	const options = { method: 'GET' };
	const url = `http://localhost:3000/groups/${groupId}/contacts`;

	// Fetching GET all Contacts for Group
	await fetch(url, options)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			contacts = data;
		});

	if (!contacts) return;

	return { contacts: contacts, title: 'Contacts' };
}

/** @type {import('./$types').Actions} */
export const actions = {
	add: async ({ request }) => {
		// Initialise form data
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const mobile = formData.get('mobile');

		if (!email || !mobile || !email) {
			return fail(400, { missing: true });
		}

		const contact = {
			name: name,
			email: email,
			mobile: mobile
		} as Contact;

		// fetch params initialisation
		const body = JSON.stringify(contact);
		const options = {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const url = `http://localhost:3000/groups/${groupId}/contact`;
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
	delete: async ({ request }) => {
		const formData = await request.formData();
		const contactId = formData.get('contactId');
		// Fetch initialisation
		const url = `http://localhost:3000/groups/${groupId}/contact/${contactId}`;
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
