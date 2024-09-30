<script lang="ts">
	import '../app.postcss';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, Toast } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { Group } from '../types/types';
	import { page } from '$app/stores';


	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerStore = getDrawerStore();
	export const data: { group: Group } | undefined = undefined;
	
</script>

<Toast />

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
		><button on:click={() => drawerStore.open()} type="button" class="btn variant-ghost-primary"
			>menu</button
		></svelte:fragment
	>
	<h2 class="h2">{$page.data.title}</h2>
	<svelte:fragment slot="trail"><p>divi/dr</p></svelte:fragment>
</AppBar>

<div class="lg:p-12">
	<slot />
</div>
