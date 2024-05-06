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
  
  <span>Конвертировать из: </span>
  <select bind:value={srsCurrency} on:change={calcAmount(parseFloat(srcAmount), srsCurrency, targetCurrency, response.rates)}>
    {#each currencies as currency}
    <option>{currency}</option>
    {/each}
  </select>
  <span> в </span>
  <select bind:value={targetCurrency} on:change={calcAmount(parseFloat(srcAmount), srsCurrency, targetCurrency, response.rates)} >
    {#each currencies as currency}
      <option>{currency}</option>
     {/each}
</select>
  <p> введите количество: </p><input bind:value={srcAmount} on:input={() => calcAmount(parseFloat(srcAmount), srsCurrency, targetCurrency, response.rates)}/>
  {#if targetAmount && !isNaN(targetAmount)}
  <h3>Результат:</h3>
  <p>{`${targetAmount} ${targetCurrency}`}</p>
  {/if}
{:catch err}
  <p>{err.message}</p>
{/await}

