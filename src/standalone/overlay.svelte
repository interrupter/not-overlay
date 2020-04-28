<div class="not-overlay">
	{#if closeButton}
	<IconButton on:click={closeOverlay} class="close-btn">
		<Icon class="material-icons">close</Icon>
	</IconButton>
	{/if}
	<main>
			<slot></slot>
	</main>	
</div>

<script>
	import {
		createEventDispatcher,
		onMount,
		onDestroy
	} from 'svelte';

	import IconButton, {
		Icon
	} from '@smui/icon-button';

	const dispatch = createEventDispatcher();

	export let closeButton = true;
	export let show = true;

	function closeOverlay() {
		rejectOverlay();
	}

	function rejectOverlay(data = {}){
		dispatch('reject', data);
	}

	function resolveOverlay(data = {}){
		dispatch('resolve', data);
	}

	onMount(() => {
		console.log('mounted');
		document.body.classList.add('overlayed');
		let el = document.body.querySelector('.not-overlay');
		el.addEventListener('click', closeOverlay);
		if(show){
			el.classList.add('not-overlay-show');
		}
	});

	onDestroy(() => {
		console.log('unmounted');
		document.body.classList.remove('overlayed');
	});
</script>


<style>
	.not-overlay {
		position: absolute;
		top: 0px;
		left: 0px;
		width: 100vw;
		height: 100vh;
		margin: 0px;
		background-color: #CCC;
		z-index: 1000;
		display: none;
		opacity: 0;
		overflow: hidden;
	}

	@keyframes animateOpacity {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0.7;
		}
		100% {
			opacity: 1;
		}
	}

	body.overlayed {
		overflow: hidden;
	}
</style>
