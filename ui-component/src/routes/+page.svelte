<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<script>
    let resp
	async function createContainerMetadata() {
        const response = await fetch(`/api/container`, {
            method: "POST"
        })
        const res = await response.json()
        return res
	}

    function handleClick() {
        resp = createContainerMetadata();
    }
</script>

<button on:click={handleClick}>
Call API Pod
</button>

{#if resp != null}
  {#await resp}
    <p>fetching data...</p>
  {:then {pod, node, namespace, ip_addr, svc_account}}
    <p>
    Pod id: {pod}
    <br>
    Node: {node}
    <br>
    Namespace: {namespace}
    <br>
    IP Address: {ip_addr}
    <br>
    Service Account: {svc_account}
    </p>
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
{/if}
