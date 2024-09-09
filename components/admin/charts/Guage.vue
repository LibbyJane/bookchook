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

    echarts.use([GaugeChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);


    let defaultOption = chartsConfig.getDefaultOption({numColors: 1});
    defaultOption.yAxis = [];
    defaultOption.xAxis = [];

    let additionalOption = {

        toolbox: {
            show: false
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
    const option = {...defaultOption, ...additionalOption};

</script>
