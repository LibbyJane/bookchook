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
    echarts.use([ LineChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);

    const chart = ref(null);

    let option = {
        legend: {
            data: ['Attendees', 'Revenue']
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: [
            {
                name: 'Revenue',
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Revenue',
                type: 'line',
                stack: 'Total',
                data: [196*5, 180*5, 201*5, 220*5, 190*5, 198*5, 210*5, 184*5, 208*5 ]
                // data: [196*5, 180*5, 201*5, 220*5, 190*5, 198*5, 210*5, 184*5, 208*5, 215*5, 192*5, 200*5   ],
            }
        ]
    };
</script>
