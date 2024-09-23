<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { Group } from '../types/Group';

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerStore = getDrawerStore();
	export let data: { group: Group };
</script>

<Drawer>
	<div class="flex flex-col">
		<a on:click={() => drawerStore.close()} class="block card card-hover p-4" href="/">Home</a>
		<a on:click={() => drawerStore.close()} class="block card card-hover p-4" href="/contacts"
			>Contacts</a
		>
		<a on:click={() => drawerStore.close()} class="block card card-hover p-4" href="/places"
			>Places</a
		>
	</div>
</Drawer>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"
		><button on:click={() => drawerStore.open()} type="button" class="btn variant-filled-primary"
			>menu</button
		></svelte:fragment
	>
	<code class="code">{data.group.name}</code>
	<svelte:fragment slot="trail"><p>divi/dr</p></svelte:fragment>
</AppBar>
<div class="p-12">
	<slot />
</div>
