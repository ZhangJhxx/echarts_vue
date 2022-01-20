<template>
  <div class="com_container">
    <div class="select" :style="selectedStyle">
      <span class="curr">{{currentData}}</span>
      <span class="iconfont icon-angle_down" @click="isshow=!isshow" :style="selectedStyle"></span>
      <div v-show="isshow" class="alternatives">
        <div v-for="item,index in selectedType" :key=index @click="changeCurr(item)">{{item}}</div>
      </div>
    </div>
    <div class="com_chart" ref="int_ref"></div>
  </div>
</template>

<script>
 import shine from '../assets/theme/shine.json'
  export default {
    data(){
      return {
        chartInstance:null,
        currentData:'3.22',
        isshow:false,
        allData:null,
        afontSize:0
      }
    },
    computed:{
      selectedType(){
        if(!this.allData){
          return []
        }else{
          return Object.keys(this.allData).filter(item=>item!==this.currentData);
        }
      },
      selectedStyle(){
        return {
          fontSize:this.afontSize/1.5+'px',
          padding:this.afontSize/8+'px'
        }
      }
    },
    mounted(){
      this.getChartInstance();
      this.getData();
      window.addEventListener('resize',this.screenAdaptor);
      this.screenAdaptor();
    },
    destroyed() {
      window.removeEventListener('resize', this.screenAdaptor);
    },
    methods:{
      getChartInstance(){
        this.echarts.registerTheme('shine',shine);
        this.chartInstance=this.echarts.init(this.$refs.int_ref,'shine');
        let initOption={
          title: {
            text: '新陈代谢能力测定实验',
            textStyle: {
                fontSize: 30
            },
            left: "8%",
            top: "5%",
          },
          tooltip: {
            trigger: 'item',
            formatter: function(arg) {
              // console.log(arg);
              return arg.name + '与int反应30min后'+'<br/>'+'的吸光度值为' + arg.data
            }
          },
          xAxis:{
            type:'category',
            axisLine:{
              show:true,
              symbol:['none','arrow']
            },
            axisLabel:{
              interval:0,
              rotate:-15,
              textStyle:{
                fontSize:16,
              },
              margin:20
            },
            axisTick: {
              inside: true
            }
          },
          yAxis:{
            type:'value',
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
            },
            axisTick: {
              inside: true
            },
          },
          grid: {
              left: '8%',
              right: '15%',
              top: '25%',
              bottom: '4%',
              containLabel: true
          },
          toolbox: {
            right: '25%',
            top: '15%',
            feature: {
              //下载小图标
              saveAsImage: {},
              //数据视图
              dataView: {},
              //区域缩放
              dataZoom: {},
              magicType: {
                type: ['bar', 'line']
              }
            }
          },
          series:[{
            name:'int',
            type:'bar',
            barWidth:'40%',
            label:{
              show:true,
              position:'top'
            },
            
            // itemStyle: {
            //     barBorderRadius: [20, 20,0 , 0],
            //     color: new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //         offset: 1,
            //         color: '#ffa801',
            //     }, {
            //         offset: 0,
            //         color: '#ff3f34'
            //     }])
            // }
          }]
        }
        this.chartInstance.setOption(initOption);
      },
      async getData(){
        let {data:res} = await this.axios.get('int');
        this.allData = res;
        this.updateChart();
      },
      updateChart(){
        const xData = this.allData[this.currentData].map(item=>item.name);
        const seriesData = this.allData[this.currentData].map(item=>item.value);
        const updateOption={
          xAxis:{
            data:xData
          },
          series:{
            data:seriesData
          }
        }
        this.chartInstance.setOption(updateOption);
      },
      screenAdaptor(){
         let fontSize = this.$refs.int_ref.offsetWidth/100*3.6;
         this.afontSize=fontSize;
         const adaptorOption ={
           title:{
               textStyle:{
                  fontSize
               }
           },
           xAxis:{
             axisLabel:{
              textStyle:{
                fontSize:fontSize/2,
              },
              margin:fontSize/2
           },
           
          },
          series:[{
             //不知道为什么不起作用
             barWidth:fontSize*1.1
           }]
         }
         setTimeout(()=>{
           this.chartInstance.setOption(adaptorOption)
           this.chartInstance.resize();
         },50);// setTimeout解决报错 Error setOption should not be called during main process
      },
      changeCurr(item){
        this.currentData=item;
        this.updateChart();
        this.isshow=false;
      }
    }
   }
</script>

<style lang='less' scoped>
.com_container{
  position: relative;
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
}
  
</style>