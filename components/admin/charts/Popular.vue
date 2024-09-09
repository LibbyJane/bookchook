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
    import { LineChart, GaugeChart } from 'echarts/charts';
    import { TooltipComponent, GridComponent, DatasetComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    // import { getDaysArray } from '@/utils/charts';
    import * as chartsConfig from '@/utils/charts';

    echarts.use([ LineChart, GaugeChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);



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
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      type: 'gauge',

      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        color: defaultOption.color[0],
        // fontSize: 24
      },
      data: [
        {
          value: 83,
          name: '',
        }
      ]
    }
  ]
};

    let additionalOption2 = {
        legend: {
            data: []
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            // name: 'w/c',
            // nameLocation: 'start',
            formatter: 'w/c {value}',
            data: ['Aug 5', 'Aug 12', '19/8/24', '26/8/24']
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
