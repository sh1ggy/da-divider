<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { Contact, Item, Place, PlaceContact } from '../../../types/types.ts';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { deleteItemMsg, editPlaceMsg } from '$lib';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	interface Props {
		data: {
			title: string;
			place: Place | undefined;
			items: Item[];
			groupContacts: Contact[];
		};
	}

	let { data }: Props = $props(); 

	let place: Place | undefined = $state(data.place);
	let groupContacts: Contact[] = $state(data.groupContacts);
	let items: Item[] = $state(data.place?.items ?? []);
	let contactAssignments: Record<string, boolean> = $state({});

	// Effect to run every time component is mounted.
	$effect(() => {
		// Map through each Contact & assign to false by default
		groupContacts.map((c: Contact) => {
			if (!place || !place.contacts) return;
			// If the contact is in the assigned contacts list of the current place, mark as true
			if (place.contacts.find((pc: PlaceContact) => pc.id === c._id)) {
				{
					contactAssignments[c._id] = true;
				}
				return;
			}

			{ // Otherwise return false
				contactAssignments[c._id] = false;
			}
		});
	});

	// Flip contact assignment boolean
	function toggle(contact: string): void {
		contactAssignments[contact] = !contactAssignments[contact];
	}
</script>

<div class="container h-full mx-auto flex flex-col gap-6 justify-center items-center">
	<div class="flex flex-col items-center gap-6 rounded-lg bg-slate-800 p-12 w-full">
		{#if place !== undefined}
			<form
				action="?/editPlace"
				method="POST"
				use:enhance={({ formData }) => {
					const contactAssignmentsFormObject: PlaceContact[] = []; // PlaceContact[]

					Object.entries(contactAssignments).forEach(([key, value]) => {
						if (!value) return;

						const fullContact = groupContacts.find((c) => c._id === key);

						if (!fullContact) return;

						const contactToAdd = { id: key, name: fullContact.name };
						contactAssignmentsFormObject.push(contactToAdd);
					});

					formData.set('contactAssignments', JSON.stringify(contactAssignmentsFormObject));

					return async ({ result, update }) => {
						let t;
						switch (result.type) {
							case 'success':
								t = {
									message: `${editPlaceMsg} "${place?.name}"`,
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
				}}
				class="flex flex-col items-center gap-6 rounded-lg bg-slate-800"
			>
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
					{#each groupContacts as contact}
						<button
							onclick={() => toggle(contact._id)}
							type="button"
							class={`${contactAssignments[contact._id] ? 'variant-glass-secondary' : 'variant-glass-surface'} chip`}
						>
							{#if contactAssignments[contact._id]}<Icon icon="akar-icons:check" />{/if}
							<span class="capitalize">{contact.name}</span>
						</button>
					{/each}
				</div>
				<button type="submit" class="btn variant-glass-primary">Save</button>
			</form>

			<Accordion>
				<AccordionItem open>
					{#snippet lead()}
						<Icon icon="akar-icons:shipping-box-01" />
					{/snippet}
					{#snippet summary()}
						<h4 class="h4">Items</h4>
					{/snippet}
					{#snippet content()}
						<div class="grid lg:grid-cols-2 gap-3">
							{#if items !== undefined}
								{#each items as item}
									<div class="card p-4 gap-3 flex flex-col">
										<div class="flex">
											<p class="w-2/3">{item.name}</p>
											<p class="ml-auto badge mb-auto variant-soft-primary">${item.price}</p>
										</div>
										<div class="flex gap-1 mt-auto">
											<button class="btn-sm btn-icon text-md variant-filled-warning"
												><Icon icon="akar-icons:pencil" /></button
											>
											<form
												action="?/deleteItem"
												method="POST"
												use:enhance={({ formData }) => {
													formData.set('itemId', item._id);

													return async ({ result, update }) => {
														const t = {
															message: `${deleteItemMsg} "${item.name}"`,
															background: 'variant-filled-primary'
														};
														switch (result.type) {
															case 'success':
																toastStore.trigger(t);
																// Match local state with deleted place
																items = items.filter((i) => i._id !== item._id);
																break;
															case 'failure':
																// TODO: failure handling for delete item
																console.log('todo');
																break;
															default:
																break;
														}
														await update();
													};
												}}
											>
												<button class="btn-sm btn-icon text-md variant-filled-error"
													><Icon icon="akar-icons:trash-bin" /></button
												>
											</form>
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
					{/snippet}
				</AccordionItem>
			</Accordion>
		{/if}
		<!-- <code
			use:clipboard={place._id}
			class="code hover:scale-110 hover:cursor-pointer transition-transform">{place?._id}</code
		> -->
	</div>
	<button onclick={() => console.log('delete')} class="btn variant-filled-error"
		>Delete Place</button
	>
</div>
