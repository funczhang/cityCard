<template lang="jade">
   div(style="padding:0.1px;")
        div.address
          span {{province}}&nbsp;
          span {{city}}&nbsp;
          span {{area}}
        ul    
             template(v-show="addr")
               li(v-for="item in addr",@click="getAddr(item.DM,item.FJ)"){{item.MC}}
</template>
<script>
export default {
  name: 'selectAddress',
  data() {
    return {
      addr: [],
      province: '省',
      city: '市',
      area: '区',
    }
  },
  computed: {
  },
  methods: {
    getAddr(code, type) {
      var self = this;
      var txt = event.target.innerText;
      var data1 = { valueType: 'openLoadWait' };
      var data2 = { valueType: 'closeLoadWait' };
      this.$store.dispatch('showRobot', data1).then(response => {
      });
      if (type === '省') {
        self.$data.province = txt;
        self.$store.state.form.province = txt;
        var data = { method: 'M0650', areacode: code };
        self.$store.dispatch('getAreaList', data).then(response => {
          self.$data.addr = JSON.parse(response.result.data);
          self.$store.dispatch('showRobot', data2).then(response => {
            console.log("close robot");
          });
        });
      }
      if (type === '市') {
        self.$data.city = txt;
        self.$store.state.form.city = txt;
        var data = { method: 'M0650', areacode: code };
        self.$store.dispatch('getAreaList', data).then(response => {
          self.$data.addr = JSON.parse(response.result.data);
          self.$store.dispatch('showRobot', data2).then(response => {
            console.log("close robot");
          });
        });
      }
      if (type === '区') {
        self.$data.area = txt;
        self.$store.state.form.area = txt;
        self.$store.state.form.addressCode = code;
        self.$store.dispatch('showRobot', data2).then(response => {
          console.log("close robot");
        });
        self.$router.back()
      }
    }
  },
  mounted() {
    var self = this;
    var data = { method: 'M0650', areacode: '0' };
    var data1 = { valueType: 'openLoadWait' };
    var data2 = { valueType: 'closeLoadWait' };
    this.$store.dispatch('showRobot', data1).then(response => {
    });
    self.$store.dispatch('getAreaList', data).then(response => {
      self.$data.addr = JSON.parse(response.result.data);
      this.$store.dispatch('showRobot', data2).then(response => {
      });
    });
  }
}
</script>
<style lang="stylus" scoped>
    .address
        position fixed
        width 100%
        height 2.5rem
        text-align center
        font normal 0.8rem/2.5rem '微软雅黑'
        color #999
        background #fff
    ul
        margin-top 2.5rem
        li 
          padding 0.5rem 1rem
          height 1rem
          border-bottom 1px solid #e5e5e5
          list-style-type none
          font-size 0.65rem
          font-family '微软雅黑'
          line-height 1rem
           
</style>
