<template>
  <!--
    分页组件
    入参格式
    data：{
      url: '/cloudFile/catalogPage.do',  接口地址
      list: [],    返回的数组
      total: 0,    总数
      query: {     查询条件
        parentId: this.$route.query.parentId,
        pageSize: this.conf.PAGES,
        pageNo: 1,
        keyword: ''
      },
      loadingEl: '.table'    加载动画dom元素
    }
  -->
  <div class="main">
    <el-pagination
      v-show="data.total > pages"
      @current-change="handleCurrentChange"
      :current-page="data.query.pageNo"
      :page-size="data.query.pageSize"
      layout="prev, pager, next,total, jumper"
      :total="data.total"
    >
    </el-pagination>
  </div>

</template>
<script>
  export default {
    props: ['data'],
    data () {
      return {
        pages: this.conf.PAGES
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.data.query.pageNo = val
        this.ajax(this.data.url, this.data.query, this.data.loadingEl)
          .then(json => {
            this.data.list = json.list
            this.data.noData = this.data.total = json.total
          })
      }
    },
    // 组件初始化执行
    mounted () {
      this.handleCurrentChange(1)
    }
  }
</script>
<style lang="sass" scoped>
  .el-pagination
    margin-top: 30px
    text-align: center
</style>
