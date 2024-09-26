<script lang="ts">
	import type { Group } from '../types/types';

	export let data: { group: Group };
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h1 class="h1">Home</h1>
	<p>Welcome to divi/dr, you are part of the <code class="code">{data.group.name}</code> group</p>
</div>
