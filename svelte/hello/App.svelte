<script>
	let data = [], loading = false;
	
	function fetchData() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve([{
					name: Math.random().toFixed(5)
				}]);
			}, 1000);
		});
	}
	
	async function loadData() {
		loading = true;
		data = await fetchData();
		loading = false;
	}
</script>
<button on:click={loadData}>
	load data
</button>
<ul>
	{#if loading}
		<div>
			loading
		</div>
	{/if}
	{#each data as item}
		<li>{item.name}</li>
	{/each}
</ul>