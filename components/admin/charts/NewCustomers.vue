<template>
    <div class="chart">
        <ClientOnly>
            <VChart :option="option" />
        </ClientOnly>
    </div>
</template>

<script setup>
    import * as echarts from 'echarts/core';
    import { LineChart } from 'echarts/charts';
    import { TooltipComponent, GridComponent, DatasetComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    // import { getDaysArray } from '@/utils/charts';
    import * as chartsConfig from '@/utils/charts';

    echarts.use([ LineChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);

    const labelOption = {
//   show: true,
//   align: 'left',
//   verticalAlign: 'middle',
//   position: 'insideBottom',
//   distance: 15,
//   rotate: 90,
//   formatter: '{c}  {name|{a}}',
//   fontSize: 16,
//   rich: {
//     name: {}
//   }
};
    let defaultOption = chartsConfig.getDefaultOption({numColors: 6});

    // defaultOption.tooltip.formatter = function (params, _ticket, _callback) {
    //     console.log('tooltip', params);
    //     let returnVal = '';
    //     params.forEach(param => {
    //         if (param.data == '-') return;

    //         returnVal += `<div>${param.marker} ${param.seriesName} ${param.value}% full</div>`;
    //     });

    //     return returnVal;
    // };

    let additionalOption = {
        legend: {
            // type: 'scroll',
            data: ['2024', '2023']
        },
        // tooltip: {
        //     formatter: function (params, ticket, callback) {
        //         console.log('tooltip', params, ticket, callback)
        //     }

        // },
        xAxis: {
            type: 'category',
            // name: 'w/c',
            // nameLocation: 'start',
            data: chartsConfig.getYearsArray()
        },
        yAxis: [
            {
                name: '# Signups',
                type: 'value',
                axisLine: {
                    show: true,
                }
            }
        ],
        series: [
            {
                name: '2024',
                type: 'line',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                // smooth: true,
                data: [8, 2, 4, 4, 5, 9, 4, 8, 5, '-','-', '-'],
                z: 1
            },
            {
                name: '2023',
                type: 'line',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [1, 1, 1, 0, 1, 3, 2, 2, 3, 3, 4, 3],
                z: 0
            },
  ]
        // series: [
        //     {
        //         name: 'Revenue',
        //         type: 'bar',
        //         stack: 'Total',
        //         // data: ['Open Session', 'Thursday Late Night Session', 'Open Session', 'Open Session', 'Sunday Sessions - League Players']
        //         data: [
        //         {
        //         value: 100,
        //             itemStyle: {
        //                 color: defaultOption.colors[1]
        //             }
        //         }, 80, 90, 95, 100],
        //     }
        // ]
    };

    const option = {...defaultOption, ...additionalOption};
</script>
