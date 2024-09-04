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
    let defaultOption = chartsConfig.getDefaultOption({numColors: 5});

    let additionalOption = {
        legend: {
            data: []
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        },
        yAxis: [
            {
                name: 'Capacity (%)',
                type: 'value'
            }
        ],
        series: [
    {
      name: 'Open Session',
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [22, 20, 18, 20]
    },
    {
      name: 'Thursday Late Night Session',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [22, 20, 18, 20]
    },
    {
      name: 'Sat Open Session 1',
      type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [22, 20, 18, 20]
    },
    {
        name: 'Sat Open Session 2',
        type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [22, 20, 18, 20]
    },
    {
        name: 'Sunday Session',
        type: 'bar',
      label: labelOption,
      emphasis: {
        focus: 'series'
      },
      data: [8, 10, 8, 12]
    }
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
