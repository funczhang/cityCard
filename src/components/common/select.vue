<template>
    <div class="weui-cell weui-cell_select weui-cell_select-after" style="padding:10px 15px;">
        <div class="weui-cell__hd">
            <label for="" class="weui-label">{{title}}</label>
        </div>
        <div class="weui-cell__bd">
            <select class="weui-select" name="select2" v-model="select" @change="nationChange()">
                <option value="" style="color:#999;" disabled>请选择</option>
                <option v-for="item in items" :value="item.code">{{item.name}}</option>
            </select>
        </div>
    </div>
</template>
<script>
export default {
    name: 'select',
    props: ['selected','title', 'items'],
    data() {
        return {

        }
    },
    methods: {
        nationChange() {
            var e = event.target;
            var val = e.value;
            console.log('nation----------:'+val);
            this.$store.state.form.nation = val;
        }
    },
    computed:{
        select:{
            get(){
                return this.$store.state.form.nation;
            }
        }
    }
}
</script>
<style lang="stylus">
    .weui-cell_select
        padding 10px 15px
        height 2rem
        option
            // font-size 0.65rem
        .weui-cell__hd
            text-align left
</style>
