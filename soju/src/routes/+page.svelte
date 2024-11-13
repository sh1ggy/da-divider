<script lang="ts">
	import type { Group } from '../types/types';

	interface Props {
		data: { group: Group };
	}

	let { data }: Props = $props();
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<p>Welcome to divi/dr, you are part of the <code class="code">{data.group.name}</code> group</p>
</div>
