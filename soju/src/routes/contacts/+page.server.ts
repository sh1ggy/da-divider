import type { Contact } from '../../types/types.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let contacts: Contact[] | undefined = undefined;

  const groupId = "66a80e0c312e1ebdd11ed13f"
	const url = `http://localhost:3000/groups/${groupId}/contacts`;
	await fetch(url, { method: 'GET' })
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			contacts = data;
		});
    
	if (!contacts) return;
	return { contacts: contacts };
}
