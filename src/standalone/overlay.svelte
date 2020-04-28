{#if show}
<div class="not-overlay" transition:fade>
	{#if closeButton}
	<IconButton on:click={closeButtonClick} class="close-btn">
		<Icon class="material-icons">close</Icon>
	</IconButton>
	{/if}
	<main>
		<slot></slot>
	</main>
</div>
{/if}

<script>
	let overflowSave = '';

	import {
		fade
	} from 'svelte/transition';

	import {
		createEventDispatcher,
		onMount,
		onDestroy
	} from 'svelte';

	import IconButton, {
		Icon
	} from '@smui/icon-button';

	const dispatch = createEventDispatcher();

	export let closeButton = false;
	export let show = true;
	export let closeOnClick = true;

	function closeButtonClick(){
		rejectOverlay();
	}

	function closeOverlay(e) {
		if(e.originalTarget && e.originalTarget.classList.contains('not-overlay')){
			rejectOverlay();
		}
	}

	function rejectOverlay(data = {}) {
		dispatch('reject', data);
	}

	function resolveOverlay(data = {}) {
		dispatch('resolve', data);
	}

	onMount(() => {
		overflowSave = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		let el = document.body.querySelector('.not-overlay');
		if(closeOnClick){
			el.addEventListener('click', closeOverlay);
		}
		if (show) {
			el.classList.add('not-overlay-show');
		}

	});

	onDestroy(() => {
		document.body.style.overflow = overflowSave;
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
		display: block;
		opacity: 1;
		overflow: hidden;
	}
</style>
