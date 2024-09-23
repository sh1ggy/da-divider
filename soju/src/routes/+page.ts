/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let test: any = undefined;

	const url = 'http://localhost:3000/groups';
	await fetch(url, { method: 'GET' })
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((data) => {
			console.log(data);
			test = data;
		});
	return {test: test};
}
