import { fail, redirect } from '@sveltejs/kit';
import type { Contact } from '../../../types/types';
import { formMissingErrorMsg, formUnchangedErrorMsg, groupId } from '$lib';

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

/** @type {import('./$types').Actions} */
export const actions = {
	submit: async ({ params, request }) => {
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
