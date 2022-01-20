<template>
  <div class="com_container">
	  <div class="select" :style="selectedStyle">
	  <span class="curr">{{currentDate}}</span>
	  <span class="iconfont icon-angle_down" @click="isshow=!isshow" :style="selectedStyle"></span>
	  <div v-show="isshow" class="alternatives">
		<div v-for="item,index in selectedType" :key=index @click="changeCurr(item)">{{item}}</div>
	  </div>
	</div>
	<div class="com_chart" ref="dpph_ref"></div>
  </div>
</template>

<script>
	import shine from '../assets/theme/shine.json'
	export default {
	data(){
	  return {
			chartInstance:null,
			allData:null,
			currentDate:"3.8",
			isshow:false,
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
			screenAdaptor(){
				let fontSize = this.$refs.dpph_ref.offsetWidth/100*3.6;
				const adaptorOption ={
					title:{
						textStyle:{
							fontSize
						}
					},
					legend:{
						itemGap: fontSize/2,
						icon: 'circle',
						itemHeight: fontSize/1.5,
						textStyle: {
							fontSize: fontSize/2.5
						},
					},
					xAxis:{
						nameGap: fontSize,
						nameTextStyle: {
							fontSize: fontSize/2
						},
					},yAxis:{
						nameGap: fontSize/1.2,
						nameTextStyle: {
							fontSize: fontSize/2
						},
					},
					series:[{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					},{
						lineStyle: {
							width: fontSize/9
						}
					}]
				}
				setTimeout(()=>{
					this.chartInstance.setOption(adaptorOption);
					this.chartInstance.resize();
				},50);// setTimeout解决报错 Error setOption should not be called during main process
				
			},
	    getChartInstance(){
				this.echarts.registerTheme('shine',shine);
				this.chartInstance = this.echarts.init(this.$refs.dpph_ref,'shine');
				const initOPtion={
				title: {
					text: 'DPPH法测WPI和NaC的抗氧化能力',
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
						return arg.seriesName + '系列，处理' + arg.name + 'h后'+'<br/>'+'的自由基清除能力为' + arg.data
					}
				},
				grid: {
					left: '8%',
					right: '30%',
					top: '25%',
					bottom: '8%',
					containLabel: true
				},
				legend:{
					orient: 'vertical',
					align: 'left',
					right: '4%',
					bottom: '16%',
					itemGap: 20,
					icon: 'circle',
					itemHeight: 40,
					textStyle: {
						fontSize: 16
					},
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
				xAxis: {
					nameLocation: 'center',
					nameGap: 30,
					type: 'category',
					axisLine: {
						show: true,
						symbol: ['none', 'arrow'],
					},
					axisTick: {
						inside: true
					},
				},
				yAxis: {
					name: '自由基清除能力',
					nameLocation: 'center',
					nameGap: 30,
					type: 'value',
					axisLine: {
						show: true,
						symbol: ['none', 'arrow'],
					},
					axisTick: {
						inside: true
					},
				},
				series: [{
					type: "bar",
				}, {
					type: 'bar',
				}, {
					type: "bar",
				}, {
					type: "bar",
				}, {
					type: "bar",
				}, {
					type: 'bar',
				}, {
					type: "bar",
				}, {
					type: "bar",
				}],
		}
		this.chartInstance.setOption(initOPtion);
	  	},
	  	updateChart(){
		let seriesData =[];
		let legendData=[];
		this.allData[this.currentDate].seriesData.forEach((item)=>{
		  seriesData.push({
			name:item.name,
			data:item.data,
			smooth: true,
			label: {
				show: true,
				position:'top'
			},
			lineStyle: {
				width: 4
			}
		  });
		  legendData.push(item.name);
		})
		const updateOption = {
			xAxis:{data:this.allData[this.currentDate].xdata,
			name:this.allData[this.currentDate].xname},
			legend: {
				data: legendData
			},
		  series:seriesData
		}
		this.chartInstance.setOption(updateOption);
	  	},
	  	async getData(){
				let {data} =await this.axios.get('DPPH');
				this.allData =data;
				this.updateChart();
		},
		changeCurr(item){
			this.currentDate=item;
			this.updateChart();
			this.isshow=false;
		}
	},
	computed:{
      selectedType(){
        if(!this.allData){
          return []
        }else{
          return Object.keys(this.allData).filter(item=>item!==this.currentDate);
        }
      },
      selectedStyle(){
        return {
          fontSize:this.afontSize/1.5+'px',
          padding:this.afontSize/8+'px'
        }
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