import type { Contact } from '../../types/types.js';

const groupId = '66a80e0c312e1ebdd11ed13f';

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
	return { contacts: contacts };
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
    // Initialise form data
		const formData = await request.formData();
		const contact = {
			name: formData.get('name'),
			email: formData.get('email'),
			mobile: formData.get('mobile')
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
