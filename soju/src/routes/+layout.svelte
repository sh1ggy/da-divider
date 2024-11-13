<script lang="ts">
	import '../app.postcss';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, AppBar } from '@skeletonlabs/skeleton';
	import { initializeStores, Drawer, Toast } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { Group } from '../types/types';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const drawerStore = getDrawerStore();
	export const data: { group: Group } | undefined = undefined;
</script>

<Toast />

<Drawer>
	<div class="flex flex-col">
		<a
			onclick={() => drawerStore.close()}
			class="flex items-center gap-3 card card-hover p-4"
			href="/"><Icon icon="akar-icons:home" />Home</a
		>
		<a
			onclick={() => drawerStore.close()}
			class="flex items-center gap-3 card card-hover p-4"
			href="/contacts"><Icon icon="akar-icons:person" />Contacts</a
		>
		<a
			onclick={() => drawerStore.close()}
			class="flex items-center gap-3 card card-hover p-4"
			href="/places"><Icon icon="akar-icons:map" />Places</a
		>
	</div>
</Drawer>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	{#snippet lead()}
	
			{#if $page.data.back}
				<button onclick={() => window.history.back()} type="button" class="btn btn-icon variant-ghost-primary"
					><Icon icon="akar-icons:arrow-left" /></button
				>
			{:else}
				<button onclick={() => drawerStore.open()} type="button" class="btn variant-ghost-primary"
					>menu</button
				>
			{/if}
		
	{/snippet}
	<h2 class="h2">{$page.data.title}</h2>
	{#snippet trail()}
		<p>divi/dr</p>
	{/snippet}
</AppBar>

<div class="p-12">
	{@render children?.()}
</div>
