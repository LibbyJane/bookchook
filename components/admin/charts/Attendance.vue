<template>
        <Card
            title="Attendance Chart"
            titleCssClass="h3"
            elemType="div"
        >
        <template #body>
            <div class="chart">
                <ClientOnly>
                    <VChart :option="option" />
                </ClientOnly>
            </div>
        </template>

    </Card>
</template>

<script setup>
    import { ref,  shallowRef, onMounted } from 'vue';
    import Card from '@/components/interface/Card.vue';

    import * as echarts from 'echarts/core';
    import { LineChart } from 'echarts/charts';
    import { TooltipComponent, GridComponent, DatasetComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    echarts.use([ LineChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);

    const chart = ref(null);
    const colors = ['#5470C6', '#EE6666'];
    let option = {
        legend: {
            data: ['Attendees', 'Revenue']
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: [
            {
                name: 'Attendees',
                nameLocation: 'end',
                // nameTextStyle: {
                //     fontStyle: 'oblique',
                // },
                type: 'value',
                axisLine: {
                    onZero: false,
                    // lineStyle: {
                    //     color: colors[0]
                    // }
                },
            },
            {
                name: 'Revenue (£)',
                nameLocation: 'end',
                type: 'value',
                axisLine: {
                    onZero: false,
                    alignTicks: false,
                    // lineStyle: {
                    //     color: colors[1]
                    // }
                },
            },
        ],
        series: [
            {
                name: 'Attendees',
                type: 'line',
                data: [196, 180, 201, 220, 190, 198, 210, 184, 208, 215, 192, 200],

            },
            {
                name: 'Revenue',
                type: 'line',
                data: [980, 900, 1005, 1100, 950, 990, 1050, 920, 1040, 1075, 960, 1000 ],
            }
        ]
    };
</script>

<style lang="scss">
    .chart {
        height: 70vh;
        width: 100%;
    }
</style>