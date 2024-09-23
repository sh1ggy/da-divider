<script lang="ts">
	export let data: any;
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="flex flex-col gap-3 space-y-5">
		<h1 class="h1">Home</h1>
		<p>Welcome to divi/dr, you are part of the <code class="code">{'coomers'}</code> group</p>
		<code>{JSON.stringify(data.test)}</code>
	</div>
</div>
