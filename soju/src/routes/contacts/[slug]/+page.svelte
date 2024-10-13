<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { addContactMsg, deleteContactMsg, editContactMsg } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from '../$types.js';
	import type { Contact } from '../../../types/types.js';
	import { clipboard, getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let form: ActionData;

	$: if (form?.response.modifiedCount >= 0) {
		goto('/contacts');
	}

	export let data;
	let contact: Contact;
	if (data.contact) contact = data.contact;

	const handleSubmitContact: SubmitFunction = () => {
		return async ({ result, update }) => {
			let t;
			switch (result.type) {
				case 'success':
					t = {
						message: `${editContactMsg} "${contact.name}"`,
						background: 'variant-filled-primary'
					};
					toastStore.trigger(t);
					break;
				case 'failure':
					t = {
						message: `${result.status} - ${result.data?.errMsg}`,
						background: 'variant-filled-error'
					};
					toastStore.trigger(t);
					break;
				default:
					break;
			}
			await update();
		};
	};

	// Handler method for deleting Contact
	const handleDeleteContact: SubmitFunction = async () => {
		return async ({ result, update }) => {
			const t = {
				message: `${deleteContactMsg} "${contact.name}"`,
				background: 'variant-filled-primary'
			};
			switch (result.type) {
				case 'success':
					toastStore.trigger(t);
					break;
				case 'failure':
					break;
				default:
					break;
			}
			await update();
		};
	};
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
	{#if contact !== undefined}
		<form
			action="?/submit"
			method="POST"
			class="flex flex-col items-center gap-6 rounded-lg w-full bg-slate-800 p-12"
			use:enhance={handleSubmitContact}
		>
			<label class="label">
				Name
				<input
					name="name"
					type="text"
					placeholder={contact.name}
					class="input text-sm variant-form-material"
				/>
			</label>
			<label class="label">
				Email
				<input
					name="email"
					type="email"
					placeholder={contact.email}
					class="input text-sm variant-form-material"
				/>
			</label>
			<label class="label">
				Mobile
				<input
					name="mobile"
					type="tel"
					placeholder={contact.mobile}
					class="input text-sm variant-form-material"
				/>
			</label>
			<button type="submit" class="btn variant-glass-primary">Submit</button>
			<code
				use:clipboard={contact._id}
				class="code hover:scale-110 transition-transform hover:cursor-pointer">{contact._id}</code
			>
		</form>
	{/if}
	<form action="?/delete" method="POST" use:enhance={handleDeleteContact}>
		<button class="btn variant-filled-error">Delete Contact</button>
	</form>
</div>
