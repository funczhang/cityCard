<template lang="jade">
    div 
        label {{title}}
</template>
<script>
export default {
  name:'moduleHead',
  props:['title'],
  data(){
      return {

      }
  },

}
</script>
<style lang="stylus" scoped>
    div
        padding 0.7rem 0
        text-align left
        label
            padding-left 0.75rem
            border-left 5px solid #ff0055
            font normal 0.8rem/0.75rem '微软雅黑'
            color #999
</style>
