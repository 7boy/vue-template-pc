
<template>
  <div class="bread-nav">
    <span v-for="(item,key) in nav">
      <i v-show="key === 0" :class="['iconfont',item.icon,'mr10']"></i>
      <a :class="[!item.path ? 'shallow': 'active'  ]" @click="jump(item)">{{item.name}}</a>
      <span v-show = 'key < (nav.length - 1)'>&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;</span>
    </span>
  </div>

</template>
<script>
  export default {
    props:{
      nav:{
        default: [],
        type: Array
      }
    },
    data () {
      return {

      }
    },
    methods:{
      // 如果 item = # 或者 item = false 不跳转
      jump(item){
        if(!item.path || item.path === '#'){
          return
        }
        if(item.path === 'go(-1)'){
          this.$router.go(-1)
          return
        }
        this.$router.push({path: item.path,query:item.query})
      }
    }
  }
</script>
<style lang="sass" scoped>
  @import "../assets/css/variables"
  .bread-nav
    color: $gray
    height: 38px
    width: 100vw
    min-width: $min-width
    background: #f2f3f4
    line-height: 38px
    padding-left: 20px
    box-shadow: inset 0 -6px 8px rgba(0, 0, 0, .08)
    i
      vertical-align: middle
  .iconfont
    font-size: 20px
  .shallow
    color: $gray-shallow !important
  .active
    transition: all .2s
    color: $gray
    cursor: pointer
    &:hover
      color: $main-c
</style>
