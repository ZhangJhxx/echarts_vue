<template>
  <div class="com_container">
    <div class="title" :style="titleStyle">热处理数据</div>
    <div class="select" :style="selectedStyle">
      <span class="curr">{{currentOption}}</span>
      <span class="iconfont icon-angle_down" @click="isshow=!isshow" :style="selectedStyle"></span>
      <div v-show="isshow" class="alternatives">
        <div v-for="item,index in selectedType" :key=index @click="changeCurr(item)">{{item}}</div>
      </div>
    </div>
    <div class="wrap_table" ref="ref_table">
      <table class="table table-hover" v-for="item,index in renderData" :key="index">
        
        <tbody>
          <tr v-for="line,lineIdx in item" :key="lineIdx">
            <td v-for="d,idx in line" :key="idx" :style="computStyl">{{d}}</td>
          </tr>
        </tbody>
      </table>
     
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  data() {
    return {
      tableData: null,
      currentOption: "Fresh_WPI",
      afontSize:0,
      isshow:false,
    };
  },
  mounted() {
    this.getTableData();
    window.addEventListener('resize',this.screenAdaptor);
    this.screenAdaptor();
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdaptor);
  },
  methods: {
    async getTableData() {
      const { data: res } = await this.axios.get("VCC");
      this.tableData =res;
    },
    screenAdaptor(){
      this.afontSize= this.$refs.ref_table.offsetWidth/100*3.6;
      
    },
    changeCurr(item){
      this.currentOption=item;
      this.isshow=false;
    }
  },
  computed: {
    renderData() {
      if (!this.tableData) {
        return [
          
        ];
      } else {
        return this.tableData[this.currentOption].data;
      }
    },
    computStyl(){
      return { 
        padding:this.afontSize/3+'px',
        fontSize:this.afontSize/2+'px ' 
      }
    },
    selectedStyle(){
        return {
          fontSize:this.afontSize/1.5+'px',
          padding:this.afontSize/4+'px'
        }
    },
    selectedType(){
      if(!this.tableData){
        return []
      }else{
        return Object.keys(this.tableData).filter(item=>item!==this.currentOption);
      }
    },
    titleStyle(){
      return {
        fontSize:this.afontSize/1.1+'px',
        fontWeight:this.afontSize*300
      }
    }
  },
};
</script>

<style lang='less' >
.com_container{
  background-color: #fff;
  .title{
    height: 10%;
    position: absolute;
    top: 5%;
    left: 10%;
  }
    .select{
    z-index:8;
    position: absolute;
    padding:5px;
    right: 15%;
    top: 5%;
      background-color: #ccc;
    .icon-angle_down:hover{
      cursor: pointer;
    }
    .alternatives>*{
      cursor: pointer;
    }
  }
  .wrap_table{
    width:100%;
    height: 80%;
    display:flex;
    padding-top: 10%;
    justify-content: space-around;
    .table {
      text-align:center;
      vertical-align:center;
      flex: 0 1 30%;
    }
  }
}

</style>