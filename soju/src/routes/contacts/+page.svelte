<script lang="ts">
	import type { Contact } from '../../types/types';

  // Variable initialisation
	const groupId = '66a80e0c312e1ebdd11ed13f';
	export let data: { contacts: Contact[] };
	let contacts = data.contacts; // Contact for state

  // Handler method for deleting Contact
	const handleDeleteContact = async (contact: Contact) => {
		// Fetch initialisation
		const url = `http://localhost:3000/groups/${groupId}/contact/${contact._id}`;
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
		// Match local state with deleted contact
		contacts = contacts.filter((c) => c._id !== contact._id);
	};
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h1 class="h1">Contacts</h1>

	<!-- Contact Table -->
	<div class="table-container">
		<table class="table table-hover table-fixed">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Mobile</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each contacts as contact}
					<tr>
						<td>
							<button
								on:click={() => navigator.clipboard.writeText(contact._id)}
								class="code hover:cursor-pointer hover:scale-110 transition-all"
								>{contact._id.substring(0, 7)}...</button
							>
						</td>
						<td><p>{contact.name}</p></td>
						<td>{contact.email}</td>
						<td>{contact.mobile}</td>
						<td>
							<div class="flex gap-3">
								<button class="btn btn-sm variant-ghost-warning">edit</button>
								<button
									on:click={() => handleDeleteContact(contact)}
									class="btn btn-sm variant-ghost-error">delete</button
								>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td class="font-bold">Add Contact</td>
					<td colspan="4"
						><form method="POST" class="grid columns-4 grid-flow-col gap-3">
							<input name="name" type="text" placeholder="name" class="input" />
							<input name="email" type="email" placeholder="email" class="input" />
							<input name="mobile" type="tel" placeholder="mobile" class="input" />
							<button type="submit" class="w-full btn variant-filled-primary">Add Contact</button>
						</form></td
					>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
