<script lang="ts">
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
	<h2 class="h2 w-full variant-ghost-surface rounded-lg p-3 text-center">Places</h2>

	<!-- Places Table -->
	<div class="table-container">
		<table class="table table-hover table-fixed">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Date</th>
					<th>Contacts</th>
					<th>Items</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each places as place}
					<tr>
						<td class="align-middle">
							<button
								on:click={() => navigator.clipboard.writeText(place._id)}
								class="code hover:cursor-pointer hover:scale-110 transition-all"
								>{place._id.substring(0, 7)}...</button
							>
						</td>
						<td class="align-middle">{place.name}</td>
						<td class="align-middle">{new Date(place.date).toDateString()}</td>
						<td class="align-middle"
							><span class={`badge ${place.contacts ? 'variant-filled' : 'variant-filled-warning'}`}
								>{place.contacts ? place.contacts.length : 'N/A'}</span
							>
						</td>
						<td class="align-middle"
							><span class={`badge ${place.items ? 'variant-filled' : 'variant-filled-warning'}`}
								>{place.items ? place.items.length : 'N/A'}</span
							></td
						>
						<td>
							<div class="flex gap-3 items-center">
								<button class="btn btn-sm text-xs variant-ghost-warning">edit</button>
								<button
									on:click={() => handleDeletePlace(place)}
									class="btn btn-sm text-xs variant-ghost-error">delete</button
								>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td class="font-bold">Add Place</td>
					<td colspan="5"
						><form method="POST" class="grid columns-4 grid-flow-col gap-3">
							<input name="name" type="text" placeholder="name" class="input" />
							<input name="date" type="date" class="input" />
							<button type="submit" class="w-full btn variant-filled-primary">Add Place</button>
						</form></td
					>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
