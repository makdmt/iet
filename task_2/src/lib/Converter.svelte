<script lang="ts">
  let currencies = new Set();
  const promise = fetch ('https://open.er-api.com/v6/latest/USD').then(res => res.json())

  let srsCurrency;
  let targetCurrency;
  let srcAmount;
  let targetAmount;

  function calcAmount(srcAmount, srcCurrency, targetCurrency, rates) {
    const rate = parseFloat(rates[targetCurrency]) / parseFloat(rates[srcCurrency]);
    targetAmount =  (srcAmount * rate).toFixed(2);
  }

  function getCurrecies (rates) {
    for (let key in rates) {
      currencies.add(key);
    }
  }

  $: {
    promise.then(response => 
    getCurrecies(response.rates)
    )
  }
</script>



{#await promise}
  <p>Loading...</p>
{:then response}
  <select bind:value={currencies} >
    {#each currencies as currency}
    <option>{currency}</option>
    {/each}
  </select>
  <input bind:value={srcAmount} on:input={() => calcAmount(parseFloat(srcAmount), 'AED', 'ARS', response.rates)}/>
  <p>{targetAmount}</p>
  <p>{response.rates.AED / response.rates.ARS}</p>
{:catch err}
  <p>{err.message}</p>
{/await}

