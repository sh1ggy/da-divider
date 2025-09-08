// This file is a server-side module for handling the loading and actions of the contact edit page
import { fail, type ServerLoad, type Actions } from '@sveltejs/kit';
import type { Contact } from '../../../types/types';
import { formUnchangedErrorMsg, groupId } from '$lib';

// This function loads the contact data based on the slug parameter from the URL, 
// returning it to the page on page load
export const load: ServerLoad = async ({ params }) => {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const url = `http://localhost:3000/groups/${groupId}/contact/${params.slug}`;
	let contact: Contact | undefined = undefined;
	await fetch(url, options)
		.then((res) => {
			const contentType = res.headers.get('content-type');
			if (contentType && !contentType.includes('application/json')) {
				throw new Error('Response is not JSON');
			}
			return res.json();
		})
		.then((data) => (contact = data))
		.catch((e) => {
			console.log(e);
		});

	return {
		title: 'Edit Contact',
		contact: contact,
		back: true
	};
};

// This function handles the form submission for editing a contact
// It retrieves the form data, constructs a contact object, and sends a PUT request to update the contact
export const actions: Actions = {
	// -- SUBMIT ACTION (form submission)
	submit: async ({ request, params }) => {
		// Initialise form data
		const formData = await request.formData();
		const name = formData.get('name');
		const email = formData.get('email');
		const mobile = formData.get('mobile');

		if (!email && !mobile && !email) {
			return fail(400, { errMsg: formUnchangedErrorMsg });
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

		return { response: response };
	},
	// -- DELETE ACTION (delete contact)
	delete: async ({ params }) => {
		// Fetch initialisation
		const options = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const url = `http://localhost:3000/groups/${groupId}/contact/${params.slug}`;
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
