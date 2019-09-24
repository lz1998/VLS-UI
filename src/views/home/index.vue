
<template>
  <div class="home">
    <el-row class="header">
      <el-col :span="6" class="header-item">
        <div class="wrapper-in">
          <logo :img="img"></logo>
        </div>
      </el-col>
      <el-col :span="12" class="header-item">
        <marquee class="roll-info">热烈欢迎xxxx前来参观</marquee>

      </el-col>
      <el-col :span="6" class="header-item">
        <div class="wrapper-in">
          <Time1></Time1>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <el-row class="wrapper-out">
          <div class="wrapper-in">
              <chartline seriesType="bar"></chartline>

          </div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in">
              <chartline seriesType="line"></chartline>

          </div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in">
              <chartline seriesType="scatter"></chartline>
          </div>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row class="wrapper-map-out">
          <div class="wrapper-in">
              <map1></map1>

          </div>
        </el-row>
        <el-row>
          <el-col :span="12" class="wrapper-out">
            <div class="wrapper-in">
                <chartline seriesType="line"></chartline>
            </div>
          </el-col>
          <el-col :span="12" class="wrapper-out">
            <div class="wrapper-in">
                <chartline seriesType="bar"></chartline>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-row class="wrapper-out">
          <div class="wrapper-in">
              <chartline seriesType="line"></chartline>
          </div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in">
              <chartline seriesType="effectScatter"></chartline>
          </div>
        </el-row>
        <el-row class="wrapper-out">
          <div class="wrapper-in">
              <chartline seriesType="line"></chartline>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Time1 from "../../components/Time.vue"
  import logo  from "../../components/logo.vue"
  import img from '../../image/logo.png'
  import chartline from "../../components/chartline.vue"
  import map1 from "../../components/map1.vue"



export default {
  name: 'home',
  components: {
    Time1,
    logo,
    chartline,
    map1
  },
  data(){
    return {
      img:img
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
    background-color: #000080;
  }
  .wrapper-out{
    width: 25vw;
    height:30vh;
    padding: 1vh 1vw;
    background-color: #0000BF;
  }
  .wrapper-in{
    width:100%;
    height:100%;
    background-color: #000080;
    border-radius: 10px;
  }
  .wrapper-map-out{
    width: 50vw;
    height:60vh;
    padding:1vh 1vw;
    background-color: #0000BF;
  }

  .header-item{
    height: 100%;
    padding:0 1vw;
    background-color: #0000BF;
  }
  .roll-info{
    width:100%;
    height:5vh;
    line-height: 5vh;
    margin-top:2.5vh;
    font-size:3vh;
    font-weight: 700;
    border-radius: 2vh;
    background-color: #000080;
    color:#80FFFF
  }
</style>
