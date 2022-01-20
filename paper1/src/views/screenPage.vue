<template>
  <div class="view_all">
    <div class="title">
      水解乳清蛋白的抗氧化作用及其对乳酸菌热稳定性的影响研究
    </div>
    <div class="method_img" v-if="isshow" @click="hideImg">
      <img :src="ImgPath" alt="" >
    </div>
    <div class="content">
      <div class="left">
        <div class="left_top" :class="[fullscreenState.DPPH ? 'fullscreen' :'']" >
          <DPPH ref="DPPH"></DPPH>
          <div class="btn_wrap">
            <button type="button" class="btn btn-primary " @click="toggleImg('dpph')" :class="[fullscreenState.DPPH ? 'btn-lg':'btn-sm']">流程图</button>
          </div>
          <div class="resize">
            <span  @click="toggleFullScreen('DPPH')" :class="['iconfont',fullscreenState.DPPH ? 'icon-compress-alt':'icon-expand-alt1']"></span>
          </div>
        </div>
        <div class="left_bottom " :class="[fullscreenState.INT ? 'fullscreen' :'']">
          <div class="resize">
            <span @click="toggleFullScreen('INT')" :class="['iconfont',fullscreenState.INT ? 'icon-compress-alt':'icon-expand-alt1']"></span>
          </div>
          <div class="btn_wrap">
            <button type="button" class="btn btn-primary " @click="toggleImg('int')" :class="[fullscreenState.INT ? 'btn-lg':'btn-sm']">流程图</button>
            <button type="button" class="btn btn-success " @click="toggleImg('int_3_25')" :class="[fullscreenState.INT ? 'btn-lg':'btn-sm']">照片</button>
          </div>
          <INT ref="INT"></INT>
        </div>
      </div>
      <div class="right">
        <div class="right_top" :class="[fullscreenState.VCC ? 'fullscreen' :'']">
          <div class="resize">
            <span @click="toggleFullScreen('VCC')" :class="['iconfont',fullscreenState.VCC ? 'icon-compress-alt':'icon-expand-alt1']"></span>
          </div>
          <div class="btn_wrap">
            <button type="button" class="btn btn-info " @click="toggleImg('all_data')" :class="[fullscreenState.VCC ? 'btn-lg':'btn-sm']">AllData</button>
          </div>
          <VCC ref="VCC"></VCC>
        </div>
        <div class="right_bottom" :class="[fullscreenState.VCCmap ? 'fullscreen' :'']">
          <div class="resize">
            <span @click="toggleFullScreen('VCCmap')" :class="['iconfont',fullscreenState.VCCmap ? 'icon-compress-alt':'icon-expand-alt1']"></span>
          </div>
          <div class="btn_wrap">
            <button type="button" class="btn btn-primary " @click="toggleImg('vcc')" :class="[fullscreenState.VCC ? 'btn-lg':'btn-sm']">流程图</button>
          </div>
          <VCCmap ref="VCCmap"></VCCmap>
        </div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
  import DPPH from '../components/DPPH.vue'
  import INT from '../components/INT.vue'
  import VCC from '../components/VCC.vue'
  import VCCmap from '../components/VCCmap.vue'
  import "bootstrap/dist/css/bootstrap.min.css";
  export default {
    
    data(){
      return {
        fullscreenState:{
          DPPH:false,
          INT:false,
          VCC:false,
          VCCmap:false
        },
        isshow:false,
        currImgName:''
      }
    },
    components:{
      DPPH,
      INT,
      VCC,
      VCCmap
    },
    methods:{
      toggleImg(imgName){
        this.isshow=!this.isshow;
        this.currImgName = imgName;
        console.log(this.currImgName+'按钮');
      },
      toggleFullScreen(key){
        this.fullscreenState[key]=!this.fullscreenState[key];
        this.$nextTick(()=>{
          this.$refs[key].screenAdaptor();
        });
      },
      hideImg(){
        this.isshow=!this.isshow;
      }
    },
    computed:{
      ImgPath(){
        const path= 'img/'+this.currImgName+'.png';
        console.log(path+"jisuan");
        return path;
      }
    }
   }
</script>

<style lang='less' scoped>
  //全屏样式的定义
  .fullscreen {
    position: fixed!important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    z-index: 100;
  }
  .view_all{
    width: 100%;
    height: 100%;
    position: relative;
    .title{
      width: 100%;
      height: 50px;
      font-size: 30px;
      font-weight: 500;
      text-align: center;
      line-height:40px;
      padding:5px
    }
    .method_img{
      position: absolute;
      width:90%;
      z-index: 300;
      left: 50%;
      top: 40px;
      transform: translate(-50%);
      border: 5px solid #4472C4;
      border-radius: 10px;
      img{
        width: 100%;
      }
    }

    .content{
      width: 100%;
      height: 100%;
      display:flex;
      .resize{
        position:absolute;
        right:5%;
        top: 5%;
        z-index:8;
        .iconfont{
          color:black;
          cursor:pointer;
        }
      }
      .btn_wrap{
        position: absolute;
        left: 0;
        top:5%;
        z-index:8;
        display: flex;
        flex-direction: column;
      }
      
      .left{
        width: 50%;
        height: 100%;
        .left_top{
          width: 100%;
          height: 53%;
          position: relative;
          border-top: 2px solid #4472C4;
          border-bottom: 2px solid #4472C4;
          border-right:  2px solid #4472C4;
        }
        .left_bottom{
          width: 100%;
          height: 40%;
          position: relative;
          border-bottom: 2px solid #4472C4;
          border-right:  2px solid #4472C4;
        }
      }
      .right{
        width: 50%;
        height:100%;
       
        .right_top{
          width: 100%;
          height: 34%;
          position: relative;
          border-top: 2px solid #4472C4;
          border-bottom: 2px solid #4472C4;
        }
        .right_bottom{
          width: 100%;
          height: 59%;
          position: relative;
          border-bottom: 2px solid #4472C4;
        }
      }
    }
    .bottom{
      width:100%;
      height: 60px;
    }
  }
</style>