<template>
	<div style="margin: 20px;">
		<moHeader/>
		<moCenter/>
		<moTable/>
	</div>
</template>

<script>
	import moHeader from '@/components/monitoring/moHeader.vue'
	import moCenter from '@/components/monitoring/moCenter.vue'
	import moTable from '@/components/monitoring/moTable.vue'

export default {
  	name: "monitoring",
    components: {
        moHeader, moCenter, moTable
    }
  }
</script>

