<script>
	import DragonBox from './DragonBox.svelte';
	import { afterUpdate } from 'svelte';

	export let SubSpecies;
	export let hideDragons;
	export let displayDragons;
	export let dragons;
	export let mum_dragon;
	export let dad_dragon;
	export let gender;
	export let getEnergy;

	afterUpdate(() => {
		console.log(dragons)
		gender = gender;
		displayDragons = displayDragons;
	});
</script>

<div class="row container" id="dragonGrid">
	{#if displayDragons}
		<h1 class="mt-5">Choose {gender}</h1>
		{#if dragons != undefined}
			{#each dragons as dragon}			
				{#if dragon.subSpecies == SubSpecies}
					<!-- ONLY ADULT DRAGONS -->
					{#if dragon.ageGroup == 2}
						{#if mum_dragon.tokenId != dragon.tokenId && dad_dragon.tokenId != dragon.tokenId}
							<DragonBox dragonProps={dragon} {gender} hide={hideDragons} {getEnergy} />
						{/if}
					{/if}
				{/if}
			{/each}
		{/if}
	{/if}
</div>

<style>
	#dragonGrid {
		min-height: 50vh;
	}
</style>
