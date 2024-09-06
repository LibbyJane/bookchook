<template>
    <div class="chart">
        <ClientOnly>
            <VChart :option="option" />
        </ClientOnly>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    import * as echarts from 'echarts/core';
    import { LineChart } from 'echarts/charts';
    import { TooltipComponent, GridComponent, DatasetComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    // import { getDaysArray } from '@/utils/charts';
    import * as chartsConfig from '@/utils/charts';
import { def } from '@vue/shared';

    echarts.use([ LineChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);

    const labelOption = {
  show: true,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  rotate: 90,
  formatter: '{c}  {name|{a}}',
  fontSize: 16,
  rich: {
    name: {}
  }
};
    let defaultOption = chartsConfig.getDefaultOption({numColors: 10});

    defaultOption.tooltip.formatter = function (params, _ticket, _callback) {
        let returnVal = '';
        console.log('tt', params, _ticket, _callback);
        params.forEach(param => {
            if (param.data == '-') return;

            returnVal += `<div>${param.marker} ${param.seriesName} ${param.value}% full</div>`;
        });

        return returnVal;
    };

    function getItemStyle(percent) {
        let color1 = defaultOption.colors[1];
        let color2 = defaultOption.colors[0];

        if (percent >= 90 ) {
            color1 = defaultOption.colors[5];
            color2 = defaultOption.colors[4];
        }
        else if (percent >= 60 ) {
            color1 = defaultOption.colors[3];
            color2 = defaultOption.colors[2];
        }

        return {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: color1
                },
                {
                    offset: 1,
                    color: color2
                }
            ])
        }
    }


    let additionalOption = {
        legend: {
            data: []
        },
        yAxis: {
            type: 'value',
            name: 'Booked Up',
            nameTextStyle: {
                fontWeight: 'bolder'
            },
            axisLabel: {
                formatter: '{value}%'
            }
        },

        xAxis: {
            type: 'category',
            axisLabel: {
                rotate: 45
            },
            data: ['Tue 3/9', 'Thu 5/9', 'Sat 7/9', 'Sun 8/9', 'Tue 10/9', 'Thu 12/9', 'Sat 14/9', 'Sun 15/9']
        },
        series: [
            {
                //  [Tues Thurs Sat Sun Tues Thurs Sat Sun]
                data: [ 100, '-', '-', '-', '-', '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(100),
                stack: 'a',
                name: 'Open Session',
                capacity: 24
            },
            {
                //  [Tues Thurs Sat Sun Tues Thurs Sat Sun]
                data: [ '-', '-', '-', '-', 88, '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(88),
                stack: 'a',
                name: 'Open Session',
                capacity: 24
            },


            {
                data: [ '-', 85, '-', '-', '-', '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(85),
                stack: 'a',
                name: 'Open Session',
                capacity: 24
            },
            {
                data: [ '-', '-', '-', '-', '-', 70, '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(70),
                stack: 'a',
                name: 'Open Session',
                capacity: 24
            },

            {
                data: [ '-', 60, '-', '-', '-', '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(60),

                stack: 'b',
                name: 'Late Session',
                capacity: 24
            },
            {
                data: [ '-', '-', '-', '-', '-', 55, '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(55),
                stack: 'b',
                name: 'Late Session',
                capacity: 24
            },
            {
                data: [ '-', '-', 82, '-', '-', '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(82),
                stack: 'a',
                name: 'Open Session',
                capacity: 24
            },
            {
                data: [ '-', '-', '-', '-', '-', '-', 77, '-'],
                showBackground: true,
                type: 'bar',
                itemStyle: getItemStyle(77),
                stack: 'a',
                name: 'Open Session',
                capacity: 24
            },
            {
                data: [ '-', '-', 90, '-', '-', '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                stack: 'b',
                itemStyle: getItemStyle(90),
                name: 'Open Session',
                capacity: 24
            },
            {
                data: [ '-', '-', '-', '-', '-', '-', 84, '-'],
                showBackground: true,
                type: 'bar',
                stack: 'b',
                itemStyle: getItemStyle(84),
                name: 'Open Session',
                capacity: 24
            },
            {
                data: [ '-', '-', '-', 33, '-', '-', '-', '-'],
                showBackground: true,
                type: 'bar',
                stack: 'a',
                itemStyle: getItemStyle(33),
                name: 'League Session',
                capacity: 24
            },
            {
                data: [ '-', '-', '-', '-', '-', '-', '-', 20],
                showBackground: true,
                type: 'bar',
                stack: 'a',
                itemStyle: getItemStyle(20),
                name: 'League Session',
                capacity: 24
            }
        ]
    };

    const option = {...defaultOption, ...additionalOption};
</script>
