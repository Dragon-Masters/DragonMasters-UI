<script>
	export let eggId;
	export let dadId;
	export let mumId;
</script>

<div class="col-sm-4 p-1">
	<div class="eggContainer pointer">
		<h1 class="egg"><i class="fas fa-egg" /></h1>
		<h3>NEW EGG</h3>
  
    <p class="mt-3">
      <b>Egg ID : <a href="/egg/{eggId}">#{eggId}</a></b>
      <br>
      <b>MumId : {mumId}</b>
      <br>
      <b>DadId : {dadId}</b>
    </p>
    <a href="/egg/{eggId}" class="btn btn-dark">Check it out!</a>
    

	</div>
</div>

<style>

  a {
    width: 100%;
  }

	.col-sm-4 {
		align-self: center;
		margin: auto;
	}

	.eggContainer {
		border-radius: 10px;
		background: #ffffff;
		padding: 70px;
		vertical-align: middle;
	}

	.eggContainer h1,
	h3,p {
		color: #a1a1a1;
	}


  
	.eggContainer h3 {
		color: #a1a1a1;
	}

	.eggContainer:hover h1 {
		color: #444;
	}

	.eggContainer:hover h3 {
		color: #444;
	}
</style>
