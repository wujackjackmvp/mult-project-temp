
<template>
    <div>
        children
    </div>
</template>

<script>
    export default {
        methods:{
            showMeChildren(){
                console.log("showMe:children")
            }
        },
        mounted(){
            this.showMeChildren()
        }
    }
</script>

<style lang="scss" scoped>

</style>