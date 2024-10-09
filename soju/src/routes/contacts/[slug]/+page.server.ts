import { fail, redirect } from '@sveltejs/kit';
import type { Contact } from '../../../types/types';
import { groupId } from '$lib';

/** @type {import('./$types').PageLoad} */
export const load = async ({ params }) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const url = `http://localhost:3000/groups/${groupId}/contact/${params.slug}`;
	let contact: Contact | undefined = undefined;
	await fetch(url, options)
		.then((res) => res.json())
		.then((data) => (contact = data));

	return {
		title: 'Edit Contact',
		contact: contact
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ params, request }) => {
		// Initialise form data
		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const mobile = formData.get('mobile');

		if (!email && !mobile && !email) {
			return fail(400, { missing: true });
		}

		const contact: Contact = {
			name: name,
			email: email,
			mobile: mobile
		} as Contact;

		// fetch params initialisation
		const body = JSON.stringify(contact);
		const options = {
			method: 'PUT',
			body: body,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const url = `http://localhost:3000/groups/${groupId}/contact/${params.slug}`;

		let response = undefined;

		// Commence fetch operation
		await fetch(url, options)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				response = data;
			})
			.catch((e) => {
				console.log(e);
				response = undefined;
			});

		redirect(301, '/contacts');
		// return { response: response };
	}
};
