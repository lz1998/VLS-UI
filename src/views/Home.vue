<template>
  <div class="home">
    <el-row class="header">
      <el-col :span="6" class="header-item">
        <div class="wrapper-in"></div>
      </el-col>
      <el-col :span="12" class="header-item">
        <div class="wrapper-in"></div>
      </el-col>
      <el-col :span="6" class="header-item">
        <div class="wrapper-in"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-row class="wrapper-out">
          <div class="wrapper-in"></div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in"></div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in"></div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="wrapper-map-out">
          <div class="wrapper-in"></div>
        </el-row>
        <el-row>
          <el-col :span="12" class="wrapper-out">
            <div class="wrapper-in"></div>
          </el-col>
          <el-col :span="12" class="wrapper-out">
            <div class="wrapper-in"></div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="wrapper-out">
          <div class="wrapper-in"></div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in"></div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in"></div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data(){
    return {

    }
  },
  methods:{
  }
}
</script>
<style lang="scss">
  .header{
    width:100%;
    height:10vh;
    background: turquoise;
  }
  .wrapper-out{
    width: 25vw;
    height:30vh;
    padding: 1vh 1vw;
    background-color: orange;
  }
  .wrapper-in{
    width:100%;
    height:100%;
    background-color: aqua;
  }
  .wrapper-map-out{
    width: 50vw;
    height:60vh;
    padding:1vh 1vw;
    background-color: orange;
  }

  .header-item{
    height: 100%;
    padding:0 1vw;
    background-color: red;
  }
</style>
