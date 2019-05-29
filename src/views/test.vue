<template>
  <div>
    <h1>TABLE PAGINATION</h1>
    <paginated-list :list-array="pageArray" />
  </div>
</template>

<script>
import axios from 'axios'
import PaginatedList from './PaginatedList'
export default {
  name: 'simple-pagination',
  components: {
    PaginatedList
  },
  data () {
    return {
      pageArray: []
    }
  },
  created () {
    axios.get("http://127.0.0.1:9007/monitoring/getMtagInfo?beacon_id=" + "00000002")
    // axios.get('http://sample.bmaster.kro.kr/contacts')
    .then(response => {
        console.log(response)
      // console.log(response["data"]);
      this.pageArray = response.data;
    })
    .catch(err => {
      console.log(err);
    });
  }
}
</script>

<style>
h1 {
  color: #454545;
  text-align: center;
}
</style>