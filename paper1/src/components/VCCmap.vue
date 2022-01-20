<template>
  <div class="com_container">
		<div class="com_chart" ref="vcc_ref"></div>
  </div>
</template>

<script>
	import shine from '../assets/theme/shine.json'
	export default {
	data(){
	  return {
			chartInstance:null,
			allData:null,
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
			let fontSize = this.$refs.vcc_ref.offsetWidth/100*3.6;
			const adaptorOption ={
				title:{
					textStyle:{
						fontSize
					}
				},
				legend:{
					itemGap: fontSize/2,
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
				series:[
					{
					symbolSize:fontSize/3,
					lineStyle: {
						width: fontSize/10
					}
				},
				{
					symbolSize:fontSize/3,
					lineStyle: {
						width: fontSize/10
					}
				},{
					symbolSize:fontSize/3,
					lineStyle: {
						width: fontSize/10
					}
				},{
					symbolSize:fontSize/3,
					lineStyle: {
						width: fontSize/10
					}
				},{
					symbolSize:fontSize/3,
					lineStyle: {
						width: fontSize/10
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
			this.chartInstance = this.echarts.init(this.$refs.vcc_ref,'shine');
			const initOPtion={
				title: {
					text: '在60℃下热处理过程中不同LGG样品中LGG的存活',
					textStyle: {
						fontSize: 30
					},
					left: "8%",
					top: "5%",
				},
			//  tooltip: {
			// 	trigger: 'item',
			// 	formatter: function(arg) {
			// 		// console.log(arg);
			// 		return arg.seriesName + '系列，处理' + arg.name + 'h后'+'<br/>'+'的自由基清除能力为' + arg.data
			// 	}
			// },
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
				bottom: '28%',
				itemGap: 20,
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
				name:'times(s)',
				nameLocation: 'center',
				nameGap: 30,
				type: 'category',
				boundaryGap: false,
				axisLine: {
					show: true,
					symbol: ['none', 'arrow'],
				},
				axisTick: {
					inside: false
				},
			},
			yAxis: {
				name: 'Log(N/N0)',
				nameLocation: 'center',
				nameGap: 30,
				type: 'value',
				axisLine: {
					show: true,
					symbol: [ 'arrow','none'],
				},
				axisTick: {
					inside: true
				},
			},
			series: [{
				type: "line",
			}, {
				type: 'line',
			}, {
				type: "line",
			}, {
				type: "line",
			}, {
				type: "line",
			}],
			}
			this.chartInstance.setOption(initOPtion);
		},
	  updateChart(){
		let seriesData =[];
		let legendData=[];
		const symbol =['rect','roundRect','triangle','emptyCircle','circle']
		this.allData.seriesData.forEach((item,index)=>{
		  seriesData.push({
				name:item.name,
				data:item.data,
				symbol:symbol[index],
				label: {
					show: true,
					position:'bottom'
				},
				 symbolSize:9,
				lineStyle: {
					width: 1
				}
		  });
		  legendData.push(item.name);
		})
			const updateOption = {
				xAxis:{
					data:this.allData.xdata,
				},
				legend: {
					data: legendData
				},
				series:seriesData
			}
			this.chartInstance.setOption(updateOption);
	  },
	  	async getData(){
			let {data} =await this.axios.get('vccmap');
			this.allData =data;
		  this.updateChart();
		},
		
	},

	}
</script>

<style lang='less' scoped>


</style>