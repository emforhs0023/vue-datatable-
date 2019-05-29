<template>
  <div>
    <table>
      <tr>
        <th>tag_id</th>
        <th>name</th>
        <th>type</th>
        <th>emergencyCode</th>
      </tr>
      <tr v-for="p in paginatedData" :key="p.tag_id">
        <td>{{ p.tag_id }}</td>
        <td>{{ p.name }}</td>
        <td>{{ p.type }}</td>
        <td>{{ p.emergencyCode }}</td>
      </tr>
    </table>
    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paginated-list',
  data () {
    return {
      pageNum: 0
    }
  },
  props: {
    listArray: {
      type: Array,
      required: true
    },
    pageSize: {
      type: Number,
      required: false,
      default: 10
    }
  },
  methods: {
    nextPage () {
      this.pageNum += 1;
    },
    prevPage () {
      this.pageNum -= 1;
    }
  },
  // 변수감시하기 (watch)
  // computed 자동으로 계산해서 변수를 줄이는 방법입니다.
  computed: {
    pageCount () {
      let listLeng = this.listArray.length, // 총게시물
          listSize = this.pageSize, // 한페이지에 출력 될 게시물 수 
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1; // 나머지가 0보다 클시 page를 1 
      
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData () { //한 페이지에 보여질 데이터들을 전달해주는 함수입니다
      const start = this.pageNum * this.pageSize, //0
            end = start + this.pageSize; // 10
      return this.listArray.slice(start, end);
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
table th {
  font-size: 1.2rem;
}
table tr {
  height: 2rem;
  text-align: center;
  border-bottom: 1px solid #505050;
}
table tr:first-of-type {
  border-top: 2px solid #404040;
}
table tr td {
  padding: 1rem 0;
  font-size: 1.1rem;
}
.btn-cover {
  margin-top: 1.5rem;
  text-align: center;
}
.btn-cover .page-btn {
  width: 5rem;
  height: 2rem;
  letter-spacing: 0.5px;
}
.btn-cover .page-count {
  padding: 0 1rem;
}
</style>