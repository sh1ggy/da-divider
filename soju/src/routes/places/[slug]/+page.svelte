<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Place, PlaceContact } from '../../../types/types.js';

	const groupId = '66a80e0c312e1ebdd11ed13f';

	export let data;

	let place: Place;
	let contacts: PlaceContact[];

	if (data.place) place = data.place;
	if (data.contacts) contacts = data.contacts;
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
	<button on:click={() => goto('/places')} class="btn variant-soft-primary">Back to Places</button>
	{#if place !== undefined}
		<form method="POST" class="flex flex-col items-center gap-6 rounded-lg bg-slate-800 p-12">
			<h1 class="mr-auto ml-auto">Edit Place</h1>
			<label class="label">
				Name
				<input
					name="name"
					type="text"
					placeholder={place.name}
					class="input text-sm variant-form-material"
				/>
			</label>
      <div class="flex gap-3">

        {#each contacts as contact}
          <span class="badge badge-glass">{contact.name}</span>
        {/each}
      </div>
			<button type="submit" class="btn variant-glass-primary w-full">Submit</button>
			<code class="code">{place._id}</code>
		</form>
	{/if}
	<button on:click={() => console.log('delete')} class="btn variant-filled-error"
		>Delete Place</button
	>
</div>
