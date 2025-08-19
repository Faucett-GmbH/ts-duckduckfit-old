<script lang="ts" module>
	export interface FieldErrorProps {
		forId: string;
		message: string;
	}
</script>

<script lang="ts">
	let { forId = '', message = '' }: FieldErrorProps = $props();
</script>

{#if message}
	<p id={forId + '-error'} class="mt-1 text-sm text-red-600">{message}</p>
{/if}
