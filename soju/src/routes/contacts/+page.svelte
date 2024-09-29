<script lang="ts">
	import { goto } from '$app/navigation';
	import { clipboard } from '@skeletonlabs/skeleton';
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
		contacts = contacts.filter((c: Contact) => c._id !== contact._id);
	};
</script>

<div class="container h-full mx-auto gap-6 flex flex-col justify-center items-center">
	<!-- Contact Cards -->
	<div class="flex flex-col gap-3 items-center justify-center">
		<h2 class="h2 w-full variant-ghost-surface rounded-lg p-3 text-center">Contacts</h2>
		{#each contacts as contact}
			<div class="card w-full">
				<header class="card-header flex gap-3">
					<div class="flex flex-col">
						<h4 class="h4">{contact.name}</h4>
						<p>{contact.email}</p>
						<p>{contact.mobile}</p>
					</div>
					<div class="ml-auto gap-3">
						<button
							on:click={() => goto(`/contacts/${contact._id}`)}
							class="btn btn-sm text-xs variant-ghost-warning">edit</button
						>
						<button
							on:click={() => handleDeleteContact(contact)}
							class="btn btn-sm text-xs variant-ghost-error">delete</button
						>
					</div>
				</header>
				<section>
					<div class="flex flex-col lg:flex-row gap-6 items-center p-4">
						<button
						  use:clipboard={contact._id}
							class="code hover:cursor-pointer hover:scale-110 transition-all"
							>{contact._id}</button
						>
					</div>
				</section>
			</div>
		{/each}

		<!-- Add Contact form -->
		<div class="flex flex-col gap-3 rounded-lg badge-glass p-3 w-full">
			<h3 class="font-bold h3">Add Contact</h3>
			<form method="POST" class="flex flex-col lg:flex-row gap-3">
				<input name="name" type="text" placeholder="name" class="input" />
				<input name="email" type="email" placeholder="email" class="input" />
				<input name="mobile" type="tel" placeholder="mobile" class="input" />
				<button type="submit" class="w-full btn variant-filled-primary">Add Contact</button>
			</form>
		</div>
	</div>
</div>
