<template>
  <div class="c-content-inner">
    <div class="main">
      <div>
           欢迎进入后台管理！
      </div>
          <img src="./../../assets/images/index_bg.png">
    </div>
   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name:""
      }
    },methods:{

    },mounted(){
      // this.ajax.commonApi("get","X",this.api.index.user)
      // .then(res=>{
      //   this.name = res.data.extra.account
      //   // console.log(res.data.extra.account)
      // })
    }
  }
</script>

<style scoped>
   .main{text-align: center;padding:50px 0}
   .main img{width: 70%;}
</style>
