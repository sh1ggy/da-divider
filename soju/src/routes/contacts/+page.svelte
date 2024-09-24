<script lang="ts">
	import type { Contact } from '../../types/types';

	export let data: { contacts: Contact[] };
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h1 class="h1">Contacts</h1>

	<!-- Contact Table -->
	<div class="table-container">
		<table class="table table-hover table-fixed">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Mobile</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.contacts as contact}
					<tr>
						<td>
							<button
								on:click={() => navigator.clipboard.writeText(contact._id)}
								class="code hover:cursor-pointer">{contact._id.substring(0, 7)}...</button
							>
						</td>
						<td><p>{contact.name}</p></td>
						<td>{contact.email}</td>
						<td>{contact.mobile}</td>
						<td>
							<div class="flex gap-3">
								<button class="btn btn-sm variant-ghost-warning">edit</button>
								<button class="btn btn-sm variant-ghost-error">delete</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td class="font-bold">Add Contact</td>
					<td colspan="4"
						><form method="POST" class="grid columns-4 grid-flow-col gap-3">
							<input name="name" type="text" placeholder="name" class="input" />
							<input name="email" type="email" placeholder="email" class="input" />
							<input name="mobile" type="tel" placeholder="mobile" class="input" />
							<button class="w-full btn variant-filled-primary">Add Contact</button>
						</form></td
					>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
