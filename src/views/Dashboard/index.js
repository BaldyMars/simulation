import React, { Component, createRef } from 'react'
import { Card } from 'antd';
import echarts from 'echarts';
export default class Dashboard extends Component {
  data = [
    [[28604,77,17096869,'澳大利亚',1990],[31163,77.4,27662440,'加拿大',1990],[1516,68,1154605773,'中国',1990],[13670,74.7,10582082,'古巴',1990],[28599,75,4986705,'芬兰',1990],[29476,77.1,56943299,'法国',1990],[31476,75.4,78958237,'德国',1990],[28666,78.1,254830,'冰岛',1990],[1777,57.7,870601776,'印度',1990],[29550,79.1,122249285,'日本',1990],[2076,67.9,20194354,'北朝鲜',1990],[12087,72,42972254,'南朝鲜',1990],[24021,75.4,3397534,'新西兰',1990],[43296,76.8,4240375,'挪威',1990],[10088,70.8,38195258,'波兰',1990],[19349,69.6,147568552,'俄罗斯',1990],[10670,67.3,53994605,'土耳其',1990],[26424,75.7,57110117,'英国',1990],[37062,75.4,252847810,'美国',1990]],
    [[44056,81.8,23968973,'澳大利亚',2015],[43294,81.7,35939927,'加拿大',2015],[13334,76.9,1376048943,'中国',2015],[21291,78.5,11389562,'古巴',2015],[38923,80.8,5503457,'芬兰',2015],[37599,81.9,64395345,'法国',2015],[44053,81.1,80688545,'德国',2015],[42182,82.8,329425,'冰岛',2015],[5903,66.8,1311050527,'印度',2015],[36162,83.5,126573481,'日本',2015],[1390,71.4,25155317,'北朝鲜',2015],[34644,80.7,50293439,'南朝鲜',2015],[34186,80.6,4528526,'新西兰',2015],[64304,81.6,5210967,'挪威',2015],[24787,77.3,38611794,'波兰',2015],[23038,73.13,143456918,'俄罗斯',2015],[19360,76.5,78665830,'土耳其',2015],[38225,81.4,64715810,'英国',2015],[53354,79.1,321773631,'美国',2015]]
  ]
  option = {
    backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
        offset: 0,
        color: '#f7f8fa'
    }, {
        offset: 1,
        color: '#cdd0d5'
    }]),
    title: {
        text: '1990 与 2015 年各国家人均寿命与 GDP'
    },
    legend: {
        right: 10,
        data: ['1990', '2015']
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: '1990',
        data: this.data[0],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                }])
            }
        }
    }, {
        name: '2015',
        data: this.data[1],
        type: 'scatter',
        symbolSize: function (data) {
            return Math.sqrt(data[2]) / 5e2;
        },
        label: {
            emphasis: {
                show: true,
                formatter: function (param) {
                    return param.data[3];
                },
                position: 'top'
            }
        },
        itemStyle: {
            normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                }, {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                }])
            }
        }
    }]
};

  constructor(){
    super()
    this.articleAmount = createRef()
  }
  componentDidMount(){
    this.initEcharts()
  }
  initEcharts = () => {
    this.articleChat = echarts.init(this.articleAmount.current)
    this.articleChat.setOption(this.option)
  }
  render() {
    return (
        <Card
          title  = {"气泡图"}
        >
          <div ref = {this.articleAmount} style = {{width: 600, height:400}}></div>
        </Card>
    )
  }
}
