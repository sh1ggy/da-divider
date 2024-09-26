<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Contact } from '../../../types/types.js';

	export let data;

	let contact: Contact;
	if (data.contact) contact = data.contact;
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
  <button
    on:click={() => goto('/contacts')}
    class="btn variant-soft-primary">Back to Contacts</button
  >
	{#if contact !== undefined}
		<form method="POST" class="flex flex-col items-center gap-6 rounded-lg bg-slate-800 p-12">
			<h1 class="mr-auto ml-auto">Edit Contact</h1>
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
			<button type="submit" class="btn variant-glass-primary w-full">Submit</button>
			<code class="code">{contact._id}</code>
		</form>
	{/if}
</div>
