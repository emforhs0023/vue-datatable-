<template>
	<div class="home">
        <monitoring/>
        <management/>
        <beaconManagement/>
	</div>
</template>


<script>
  import monitoring from '@/components/monitoring'
  import management from '@/components/management'
  import beaconManagement from '@/components/beaconManagement'
  // import test1 from '../components/test1'

  export default {
  	name: "home",
    components: {
        monitoring, management, beaconManagement
    }
  }
</script>
<style>
    .home{
        margin: 20px;
    }
</style>


