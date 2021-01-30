<template>
    <div>
        parent
        <children></children>
    </div>
</template>

<script>
    import children from './children'
    export default {
        components:{
            children
        },
        methods:{
            showMeParent(){
                console.log("showMeParent")
            }
        },
        mounted(){
            this.showMeParent()
        }
    }
</script>

<style lang="scss" scoped>

</style>