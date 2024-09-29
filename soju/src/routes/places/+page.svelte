<script lang="ts">
	import { goto } from '$app/navigation';
	import { clipboard } from '@skeletonlabs/skeleton';
	import type { Place } from '../../types/types';

	export let data: { places: Place[] };

	let places = data.places;

	// Handler method for deleting Contact
	const handleDeletePlace = async (place: Place) => {
		if (!place) return;
		// Fetch initialisation
		const url = `http://localhost:3000/places/${place._id}`;
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
		// Match local state with deleted place
		places = places.filter((p: Place) => p._id !== place._id);
	};
</script>

<div class="container h-full mx-auto gap-6 flex flex-col justify-center items-center">
	<!-- Places Cards -->
	<div class="flex flex-col gap-3 items-center justify-center">
		<h2 class="h2 w-full variant-ghost-surface rounded-lg p-3 text-center">Places</h2>
		{#each places as place}
			<div class="card w-full">
				<header class="card-header flex gap-3">
					<div class="flex flex-col">
						<p class="font-bold">{new Date(place.date).toDateString()}</p>
						<p>{place.name}</p>
					</div>
					<div class="ml-auto gap-3">
						<button
							on:click={() => goto(`/places/${place._id}`)}
							class="btn btn-sm text-xs variant-ghost-warning">edit</button
						>
						<button
							on:click={() => handleDeletePlace(place)}
							class="btn btn-sm text-xs variant-ghost-error">delete</button
						>
					</div>
				</header>
				<section>
					<div class="flex flex-col lg:flex-row gap-6 items-center p-4">
						<div class="flex gap-3">
							<span class={`badge ${place.contacts ? 'variant-filled' : 'variant-filled-warning'}`}
								>Contacts: {place.contacts ? place.contacts.length : 'N/A'}</span
							>
							<span class={`badge ${place.items ? 'variant-filled' : 'variant-filled-warning'}`}
								>Items: {place.items ? place.items.length : 'N/A'}</span
							>
						</div>
						<button
							use:clipboard={place._id}
							class="code lg:ml-auto hover:cursor-pointer hover:scale-110 transition-all"
							>{place._id}</button
						>
					</div>
				</section>
			</div>
		{/each}
		<!-- Add Place form -->
		<div class="flex flex-col gap-3 rounded-lg badge-glass p-3 w-full">
			<h3 class="h3 font-bold">Add Place</h3>
			<form method="POST" class="flex flex-col lg:flex-row gap-3">
				<input name="name" type="text" placeholder="name" class="input" />
				<input name="date" type="date" class="input" />
				<button type="submit" class="w-full btn variant-filled-primary">Add Place</button>
			</form>
		</div>
	</div>
</div>
