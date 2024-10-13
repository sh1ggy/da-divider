<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import type { Place } from '../../types/types';
	import { enhance } from '$app/forms';
	import { addPlaceMsg, deletePlaceMsg } from '$lib';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastStore = getToastStore();
	export let data: { places: Place[] };

	$: places = data.places; // Places for reactive state

	// Handler (progressive enhancement) for adding a contact
	const handleSubmitAddPlace: SubmitFunction = () => {
		return async ({ result, update }) => {
			let t;

			switch (result.type) {
				case 'success':
					t = {
						message: addPlaceMsg,
						background: 'variant-filled-primary'
					};
					toastStore.trigger(t);
					break;
				case 'failure':
					if (!result.data) break;
					t = {
						message: `${result.status} - ${result.data.errMsg}`,
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

<div class="container h-full mx-auto gap-6 flex flex-col justify-center items-center">
	<!-- Places Cards -->
	<div class="grid lg:grid-cols-2 grid-cols-1 w-full gap-3 items-center justify-center">
		{#each places as place}
			<div class="card w-full gap-3 flex flex-col">
				<header class="card-header flex">
					<div class="flex flex-col gap-1">
						<p class="font-bold flex gap-1 items-center">
							<Icon icon="akar-icons:calendar" />
							{new Date(place.date).toDateString()}
						</p>
						<p>{place.name}</p>
					</div>
					<div class="ml-auto flex flex-col gap-1">
						<span
							class={`badge flex gap-1 ${place.contacts ? 'variant-filled' : 'variant-filled-warning'}`}
							><Icon icon="akar-icons:person" />
							<p>{place.contacts ? place.contacts.length : '0'}</p></span
						>
						<span
							class={`badge flex gap-1 ${place.items ? 'variant-filled' : 'variant-filled-warning'}`}
							><Icon icon="akar-icons:shipping-box-01" />
							<p>{place.items ? place.items.length : '0'}</p></span
						>
					</div>
				</header>
				<section class="mt-auto flex card-footer justify-center w-full gap-3">
					<button
						on:click={() => goto(`/places/${place._id}`)}
						class="btn btn-sm variant-filled-warning"
						><span><Icon icon="akar-icons:edit" /></span>
						<span>Edit</span>
					</button>
					<form
						action="?/delete"
						method="POST"
						use:enhance={({ formData }) => {
							formData.set('placeId', place._id);

							return async ({ result, update }) => {
								const t = {
									message: `${deletePlaceMsg} "${place.name}"`,
									background: 'variant-filled-primary'
								};
								switch (result.type) {
									case 'success':
										toastStore.trigger(t);
										// Match local state with deleted place
										places = places.filter((p) => p._id !== place._id);
										break;
									case 'failure':
										// TODO: failure handling for delete
										console.log('todo')
										break;
									default:
										break;
								}
								await update();
							};
						}}
					>
						<button class="btn btn-sm variant-filled-error"
							><span><Icon icon="akar-icons:trash-can" /></span>
							<span>Delete</span>
						</button>
					</form>
				</section>
			</div>
		{/each}
		<!-- Add Place form -->
		<div class="lg:col-span-2 flex flex-col gap-3 rounded-lg badge-glass p-3 w-full">
			<h3 class="h3 font-bold">Add Place</h3>
			<form
				action="?/add"
				method="POST"
				use:enhance={handleSubmitAddPlace}
				class="flex flex-col lg:flex-row gap-3"
			>
				<input name="name" type="text" placeholder="name" class="input" />
				<input name="date" type="date" class="input" />
				<button type="submit" class="w-full btn variant-soft-primary"
					><span>
						<Icon icon="akar-icons:plus" />
					</span>
					<span>Add Place</span></button
				>
			</form>
		</div>
	</div>
</div>
