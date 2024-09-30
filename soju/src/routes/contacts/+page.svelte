<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Contact } from '../../types/types';
	import { enhance } from '$app/forms';
	import { addContactMsg, deleteContactMsg, formMissingErrorMsg } from '$lib';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Icon from '@iconify/svelte';
	import type { ActionData } from './$types';

	// Variable initialisation
	const toastStore = getToastStore();
	
	export let data: { contacts: Contact[]; title: string };
	// Trigger toast if there's something missing from the form. 
	export let form: ActionData;
	$: if (form?.missing)
		toastStore.trigger({ message: formMissingErrorMsg, background: 'variant-filled-error' });

	$: contacts = data.contacts; // Contacts for reactive state

	// Handler (progressive enhancement) for adding a contact
	const handleSubmitAddContact: SubmitFunction = () => {
		return async ({ result, update }) => {
			const t = {
				message: addContactMsg,
				background: 'variant-filled-primary'
			};

			switch (result.type) {
				case 'success':
					toastStore.trigger(t);
					break;
				default:
					break;
			}
			await update();
		};
	};
</script>

<div class="container h-full mx-auto gap-6 flex flex-col justify-center items-center">
	<!-- Contact Cards -->
	<div class="grid lg:grid-cols-2 grid-cols-1 w-full gap-3 items-center justify-center">
		{#each contacts as contact}
			<div class="card w-full gap-3 flex flex-col">
				<header class="card-header flex gap-3">
					<div class="flex flex-col">
						<h4 class="h4">{contact.name}</h4>
						<p class="flex items-center gap-1"><Icon icon="akar-icons:inbox" />{contact.email}</p>
						<p class="flex items-center gap-1"><Icon icon="akar-icons:phone" />{contact.mobile}</p>
					</div>
				</header>
				<section class="flex justify-center items-center card-footer gap-1">
					<button
						on:click={() => goto(`/contacts/${contact._id}`)}
						class="btn btn-sm variant-filled-warning"
						><span><Icon icon="akar-icons:edit" /></span>
						<span>Edit</span>
					</button>
					<form
						action="?/delete"
						method="POST"
						use:enhance={({ formData }) => {
							formData.set('contactId', contact._id);

							return async ({ result, update }) => {
								const t = {
									message: `${deleteContactMsg} "${contact.name}"`,
									background: 'variant-filled-primary'
								};
								switch (result.type) {
									case 'success':
										toastStore.trigger(t);
										// Match local state with deleted contact
										contacts = contacts.filter((c) => c._id !== contact._id);
										break;
									default:
										break;
								}
								await update();
							};
						}}
					>
						<button class="btn btn-sm variant-filled-error"
							><span><Icon icon="akar-icons:trash-bin" /></span>
							<span>Delete</span></button
						>
					</form>
				</section>
			</div>
		{/each}

		<!-- Add Contact form -->
		<div class="lg:col-span-2 flex flex-col gap-3 rounded-lg badge-glass p-3 w-full">
			<h3 class="font-bold h3">Add Contact</h3>
			<form
				method="POST"
				action="?/add"
				use:enhance={handleSubmitAddContact}
				class="flex flex-col lg:flex-row gap-3"
			>
				<input name="name" type="text" placeholder="name" class="input" />
				<input name="email" type="email" placeholder="email" class="input" />
				<input name="mobile" type="tel" placeholder="mobile" class="input" />
				<button type="submit" class="w-full btn variant-soft-primary"
					><span><Icon icon="akar-icons:person-add" /></span>
					<span>Add Contact</span></button
				>
			</form>
		</div>
	</div>
</div>
