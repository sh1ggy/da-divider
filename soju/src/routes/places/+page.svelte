<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Place } from '../../types/types';

	export let data: { places: Place[] };

	let places = data.places;
</script>

<div class="container h-full mx-auto gap-6 flex flex-col justify-center items-center">
	<h2 class="h2 w-full variant-ghost-surface rounded-lg p-3 text-center">Places</h2>

	<!-- Places Table -->
	<div class="table-container">
		<table class="table table-hover table-fixed">
			<thead>
				<tr>
					<th>ID</th>
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
						<td class="align-middle">{place.date}</td>
						<td class="align-middle"
							><span class="badge variant-filled">{place.contacts.length}</span>
						</td>
						<td class="align-middle"
							><span class="badge variant-filled">{place.items.length}</span></td
						>
						<td>
							<div class="flex gap-3 items-center">
								<button
									class="btn btn-sm text-xs variant-ghost-warning">edit</button
								>
								<button
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
					<td colspan="4"
						><form method="POST" class="grid columns-4 grid-flow-col gap-3">
							<input name="name" type="text" placeholder="name" class="input" />
							<input name="date" type="date" placeholder="name" class="input" />
							<button type="submit" class="w-full btn variant-filled-primary">Add Place</button>
						</form></td
					>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
