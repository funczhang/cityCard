<template>
    <div class="weui-cell">
        <div class="weui-cell__hd">
            <label class="weui-label">{{title}}</label>
        </div>
        <div class="weui-cell__bd">
            <input class="weui-input" :type="type" :placeholder="placeholder" :disabled="disabled" :value="text" @change="inputChange(belong)" >
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'type', 'placeholder', 'disabled', 'text', 'color','belong'],
    data() {
        return {}
    },
    methods:{
        inputChange(belong){
            cosnole.log("belong:"+belong);
            if(belong == 'xxdz'){
                this.$store.state.form.xxdz = text; 
            }else if(belong == 'phoneNum'){
                this.$store.state.form.phone = text; 
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .weui-cell
        height 2rem
        .weui-cell__hd
            text-align left
</style>
