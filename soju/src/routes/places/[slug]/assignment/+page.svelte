<script lang="ts">
	import { enhance } from '$app/forms';
	import { submitItemAssignmentsMsg } from '$lib';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { Contact, Item, ItemAssignment, Place, PlaceContact } from '../../../../types/types';

	const toastStore = getToastStore();

	interface Props {
		data: {
			title: string;
			place: Place | undefined;
			items: Item[];
			contacts: Contact[];
		};
	}

	let { data }: Props = $props();

	let place: Place | undefined = $state(data.place);
	let contacts: PlaceContact[] | undefined = $state(data.place?.contacts ?? []);
	let items: Item[] = $state(data.place?.items ?? []);
	let itemAssignments: Record<string, boolean> = $state({});

	let selectedContactId: string = $state('');

	$effect(() => {
		items.map((i: Item) => {
			{
				itemAssignments[i._id] = false;
			}
		});
		$inspect(itemAssignments);
	});

	// Flip item assignment boolean
	function toggle(itemId: string): void {
		itemAssignments[itemId] = !itemAssignments[itemId];
		// console.log(itemAssignments);
	}

	// Handle assignment of items on change of selected option
	const handleItemAssignmentInit = () => {
		if (!place) return; // Early return

		items.map((i) => {
			{
				itemAssignments[i._id] = place.itemAssignments.some(
					(ia) => ia.itemId === i._id && ia.contactId === selectedContactId
				);
			}
		});
	};
	``;

	// Submit handler for item assignments
	const handleSubmitItemAssignments: SubmitFunction = ({ formData }) => {
		if (!selectedContactId) return; // Early return

		const contactItemAssignments: ItemAssignment[] = [];
		Object.keys(itemAssignments).forEach((ia) => {
			if (itemAssignments[ia] === true)
				contactItemAssignments.push({ contactId: selectedContactId, itemId: ia });
		});
		console.log(contactItemAssignments);

		formData.set('itemAssignments', JSON.stringify(contactItemAssignments));

		return async ({ result, update }) => {
			let t;
			switch (result.type) {
				case 'success':
					t = {
						message: submitItemAssignmentsMsg,
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
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
	<div class="flex flex-col items-center gap-6 rounded-lg bg-slate-800 p-12 w-full">
		<label class="label w-full">
			<h1 class="text-xl text-left">Who are you?</h1>
			<select
				bind:value={selectedContactId}
				onchange={() => handleItemAssignmentInit()}
				placeholder="Select yourself from the list of contacts"
				class="select"
			>
				<option disabled value="" selected>Select yourself from the list of contacts</option>
				{#each contacts as contact}
					<option value={contact.id}>{contact.name}</option>
				{/each}
			</select>
		</label>
		{#if items !== undefined}
			<form
				action="?/submit"
				method="POST"
				use:enhance={handleSubmitItemAssignments}
				class="flex flex-col w-full gap-3"
			>
				<h1 class="text-xl">What did you buy?</h1>
				{#each items as item}
					<label class="card p-4 gap-3 flex items-center" for={item._id}>
						<input
							id={item._id}
							type="checkbox"
							onclick={() => toggle(item._id)}
							checked={itemAssignments[item._id]}
							disabled={!selectedContactId}
							class="checkbox disabled:variant-ghost-warning"
						/>
						<p class="w-2/3">{item.name}</p>
						<p class="ml-auto badge mb-auto variant-soft-primary">${item.price}</p>
					</label>
				{/each}
				<button type="submit" class="w-full text-sm btn variant-filled-primary">Submit</button>
			</form>
		{/if}
	</div>
</div>
