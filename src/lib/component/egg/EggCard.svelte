<script>
	import { readable } from 'svelte/store';
	import { getImg, iconElement } from '$lib/storage/dragonImg';
	import { afterUpdate } from 'svelte';
	import { TokenType } from '$lib/contracts/Marketplace';
	import Message from '../Message.svelte';
	import CircleMenu from '../marketplace/CircleMenu.svelte';
	import '$lib/css/marketplace/egg.css';

	export let egg;
	export let contract;

	let eggImg;
	let element;
	let hovering;

	$: incTime = Number(egg.incubationTime);
	$: incubating = incTime > 0 ? true : false;

	afterUpdate(async () => {
		element = iconElement(egg.subSpecies);
		eggImg = await getImg(egg.subSpecies).egg;
	});

	export const time = readable(incTime, function start(set) {
		const interval = setInterval(() => {
			if (incTime > 0) {
				incTime--;
				set(incTime);
			} else {
				incubating = false;
				stop();
			}
		}, 1000);

		return function stop() {
			clearInterval(interval);
		};
	});

	const hatch = () => contract['egg'].hatch(egg.tokenId);

	const startIncubation = () => contract['egg'].startIncubation(egg.tokenId);

	const enter = () => (hovering = true);

	const leave = () => (hovering = false);
</script>

<div on:mouseenter={enter} on:mouseleave={leave} class="card" style="width: 18rem;">
	<div class="card-header">
		<CircleMenu
			_tokenType={TokenType.Egg}
			tokenProps={egg}
			contract={contract['market']}
			{hovering}
		/>
		<div class="egg-top-container">
			{#if eggImg}
				<img class="eggImg egg-top" alt="egg" src={eggImg} />
				<div class="egg-top-shadow" />
			{/if}

			<div class="pabsolute top10 left10">{@html element}</div>
		</div>
	</div>
	<div class="card-body">
		<div class="row w-100 mb-2">
			<div class="col m-0 ta-l">
				<h5 class="card-title">Egg : #{egg.tokenId}</h5>
			</div>
			{#if egg?.offer?.sellOffer}
				<!-- FOR SALE -->
				<div class="col-3">
					<span class="badge bg-danger">For Sell</span>
				</div>
			{/if}
			{#if egg?.offer?.rentOffer}
				<!-- FOR RENT -->
				<div class="col-3">
					<span class="badge bg-dark">For Rent</span>
				</div>
			{/if}
		</div>
		{#if egg.incubationTime == undefined}
			<button class="btn btn-dark" on:click={() => startIncubation()}>Start Incubation</button>
		{:else if $time == 0}
			<button class="btn btn-yellow" on:click={() => hatch()}>Ready to Hatch!</button>
		{:else}
			{#if incubating}
				<Message>
					<span>
						{$time}
					</span>
					<small>time let for hatching...</small>
				</Message>
			{/if}
			<button
				class="btn btn-yellow"
				disabled={incubating}
				on:click={() => {
					if (!incubating) hatch();
				}}>Ready to Hatch!</button
			>
		{/if}

		<a href="/egg/{egg.tokenId}"
			><button class="btn btn-light">Checkout <i class="fas fa-arrow-circle-right" /></button></a
		>
	</div>
</div>
