<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Place, Item, PlaceContact } from '../../../../types/types';

	export let data: {
		title: string;
		place: Place | undefined;
		items: Item[];
		contacts: PlaceContact[];
	};

	let place: Place;
	let contacts: PlaceContact[];
	let items: Item[];
	let itemAssignments: Record<string, boolean> = {};

	if (data.place) {
		place = data.place;
		items = place.items;
		// Map through each Contact & assign to false by default
		items.map((i: Item) => {
			{
				itemAssignments[i._id] = false;
			}
		});
	}

	if (data.contacts) {
		contacts = data.contacts;
	}

	// Flip item assignment boolean
	function toggle(itemId: string): void {
		itemAssignments[itemId] = !itemAssignments[itemId];
	}
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
	<div class="flex flex-col items-center gap-6 rounded-lg bg-slate-800 p-12 w-full">
		<label class="label w-full">
			<span>Select yourself from the list of contacts</span>
			<select class="select">
				{#each contacts as contact}
					<option value={contact.id}>{contact.name}</option>
				{/each}
			</select>
		</label>

		{#if items !== undefined}
			<div class="flex flex-col w-1/2 gap-3">
				{#each items as item}
					<label class="card p-4 gap-3 flex items-center">
						<input class="checkbox" type="checkbox" on:click={() => toggle(item._id)} checked={itemAssignments[item._id]} />
						<p class="w-2/3">{item.name}</p>
						<p class="ml-auto badge mb-auto variant-soft-primary">${item.price}</p>
					</label>
				{/each}
			</div>
		{/if}
	</div>
	<button type="submit" class="w-full text-sm btn variant-filled-primary">Submit</button>
</div>
