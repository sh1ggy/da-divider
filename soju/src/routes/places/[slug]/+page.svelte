<script lang="ts">
	import { goto } from '$app/navigation';
	import { Accordion, AccordionItem, clipboard } from '@skeletonlabs/skeleton';
	import type { Item, Place, PlaceContact } from '../../../types/types.js';

	export let data: {
		title: string;
		place: Place | undefined;
		items: Item[];
		contacts: PlaceContact[];
	};

	let place: Place;
	let contacts: PlaceContact[];
	let items: Item[];

	if (data.place) {
		place = data.place;
		items = place.items;
	}
	if (data.contacts) contacts = data.contacts;
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
	<button on:click={() => goto('/places')} class="btn variant-soft-primary">Back to Places</button>
	<div class="flex flex-col items-center gap-6 rounded-lg bg-slate-800 p-12">
		{#if place !== undefined}
			<form
				action="?/editPlace"
				method="POST"
				class="flex flex-col items-center gap-6 rounded-lg bg-slate-800"
			>
				<label class="label">
					Name
					<input
						required
						name="name"
						type="text"
						placeholder={place.name}
						class="input text-sm variant-form-material"
					/>
				</label>
				<div class="flex gap-3">
					{#each contacts as contact}
						<span class="chip variant-glass-surface">{contact.name}</span>
					{/each}
				</div>
				<button type="submit" class="btn variant-glass-primary w-full">Submit</button>
			</form>

			<Accordion>
				<AccordionItem open>
					<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
					<svelte:fragment slot="summary"><h4 class="h4">Items</h4></svelte:fragment>
					<svelte:fragment slot="content">
						<div class="grid lg:grid-cols-2 gap-3">
							{#if items !== undefined}
								{#each items as item}
									<div class="card p-4 gap-3 flex flex-col">
										<div class="flex">
											<p class="w-2/3">{item.name}</p>
											<p class="ml-auto badge mb-auto variant-soft-primary">${item.price}</p>
										</div>
										<div class="flex gap-1 mt-auto">
											<button class="btn btn-sm text-xs variant-ghost-warning">edit</button>
											<button class="btn btn-sm text-xs variant-ghost-error">delete</button>
										</div>
									</div>
								{/each}
							{/if}
							<div class="lg:col-span-2 gap-3 grid rounded-lg badge-glass p-3">
								<h5 class="font-bold h5">Add Item</h5>
								<form action="?/addItem" method="POST" class="flex flex-col gap-3">
									<input required name="name" type="text" placeholder="name" class="input" />
									<input required name="price" type="number" placeholder="price" class="input" />
									<button type="submit" class="w-full text-sm btn variant-soft-primary"
										>Add Item</button
									>
								</form>
							</div>
						</div>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		{/if}
		<code
			use:clipboard={place._id}
			class="code hover:scale-110 hover:cursor-pointer transition-transform">{place._id}</code
		>
	</div>
	<button on:click={() => console.log('delete')} class="btn variant-filled-error"
		>Delete Place</button
	>
</div>
