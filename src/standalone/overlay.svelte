



<div class="shopping-cart small">
	<IconButton on:click={rejectOrder} class="close-btn">
		<Icon class="material-icons">close</Icon>
	</IconButton>
	<div class="order-form">
		<div class="mdc-typography--headline5">{title}</div>
		{#if tel.enabled}
		<div class="order-form-tel">
			<Textfield variant="outlined" placeholder="{tel.placeholder}" type="tel" required={tel.required} pattern="[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}" bind:value={tel.value} label="{tel.label}" input$aria-controls="helper-text-outlined-a"
			  input$aria-describedby="helper-text-outlined-a" />
			<HelperText id="helper-text-outlined-a">{tel.placeholder}</HelperText>
		</div>
		{/if}
		{#if email.enabled}
		<div class="order-form-email">
			<Textfield variant="outlined" type="email" bind:value={email.value} required={email.required} placeholder="{email.placeholder}" label="" input$autocomplete="email">
				<span slot="label">
					<CommonIcon class="material-icons" style="font-size: 1em; line-height: normal; vertical-align: middle;">email</CommonIcon> {email.label}
				</span>
			</Textfield>
			<HelperText id="helper-text-outlined-a">{email.placeholder}</HelperText>
		</div>
		{/if}
		{#if name.enabled}
		<div class="order-form-name">
			<Textfield variant="outlined" type="text" bind:value={name.value} required={name.required} placeholder="{name.placeholder}" label="{name.label}" input$autocomplete="email" />
			<HelperText id="helper-text-outlined-a">{name.placeholder}</HelperText>
		</div>
		{/if}
		{#if comment.enabled}
		<div class="order-form-comment">
			<Textfield fullwidth textarea bind:value={comment.value} label="{comment.label}" input$aria-controls="super-helper" input$aria-describedby="super-helper" />
			<HelperText id="super-helper">{comment.placeholder}</HelperText>
		</div>
		{/if}
		<div class="buttons-row">
			<Button on:click={rejectOrder} variant="outlined" color="secondary" class="order-form-cancel">
				<Label>{cancel.caption}</Label>
			</Button>
			<Button on:click={resolveOrder} variant="raised" color="primary" class="order-form-submit pull-right">
				<Label>{submit.caption}</Label>
			</Button>
		</div>
	</div>
</div>

<script>
	import {Icon as CommonIcon} from '@smui/common';
	import IconButton, {
		Icon
	} from '@smui/icon-button';
	import Button, {
		Label
	} from '@smui/button';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';

	export let title = 'Оформление заказа';

	export let tel = {
		label: 'Ваш номер телефона',
		placeholder: '',
		enabled: true,
		value: '',
		required: true
	};

	export let email = {
		label: 'Email',
		placeholder: 'Ваш email адрес',
		enabled: true,
		value: '',
		required: true
	};

	export let name = {
		label: 'Имя',
		placeholder: 'Как нам к вам обращаться?',
		value: '',
		enabled: true,
		required: true
	};

	export let comment = {
		label: 'Дополнительно',
		placeholder: 'Дополнительные сведения',
		value: '',
		enabled: true,
		required: true
	};

	export let submit = {
		caption: 'Отправить'
	};

	export let cancel = {
		caption: 'Назад'
	};

	export let resolveOrder = () => {
			console.log('resolve');
		},
		rejectOrder = () => {
			console.log('reject');
		};

</script>


<style>
	.not-overlay {

	}
</style>
