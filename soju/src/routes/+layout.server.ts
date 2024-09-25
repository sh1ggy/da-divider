import type { Group } from "../types/types";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let groups: Group[] | undefined = undefined;

	const url = 'http://localhost:3000/groups';
	await fetch(url, { method: 'GET' })
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			groups = data;
		});
    
	if (!groups) return;
	return { group: groups[0] };
}
