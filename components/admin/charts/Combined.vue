<template>
        <Card
            title="Combined Chart"
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
    import { useOrganisationStore } from '@/stores/organisation';

    import { ref,  shallowRef, onMounted } from 'vue';
    import Card from '@/components/interface/Card.vue';

    import * as echarts from 'echarts/core';
    import { LineChart, BarChart } from 'echarts/charts';
    import { TooltipComponent, GridComponent, DatasetComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    echarts.use([ LineChart, BarChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);
    const organisationStore = useOrganisationStore();

    const colors = [`${organisationStore.account.theme_config.colors.accent.hex}`,  `hsl(${ organisationStore.account.theme_config.colors.accent.hsl.h > 180 ? organisationStore.account.theme_config.colors.accent.hsl.h - 180 : organisationStore.account.theme_config.colors.accent.hsl.h + 180}, ${ organisationStore.account.theme_config.colors.accent.hsl.s < 70 ? organisationStore.account.theme_config.colors.accent.hsl.s : 70}%, ${ organisationStore.account.theme_config.theme_type == 'light' ? 33 : 75}%)`];
    const option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
            // ,formatter: `<span style="color: ${colors[0]}">◼</span> {a0}: <b>{c0}</b><br><span style="color: ${colors[0]}; opacity: 0.4">◼</span> {a1}: <b>{c1}</b><br><span style="color: ${colors[1]}">◼</span> {a2}: <b>£{c2}</b>`
             ,formatter: `<span style="color: ${colors[0]}">◼</span> {a0}: <b>{c0}</b><br><span style="color: ${colors[1]}">◼</span> {a1}: <b>£{c1}</b>`
        },

        // grid: {
        //     right: '0%'
        // },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: [{name: 'Attendees', icon: 'square'},{name: 'Revenue'}]
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Attendees',
                position: 'left',
                alignTicks: true,
                axisLine: {
                    show: true,
                        // lineStyle: {
                        //     color: colors[0]
                        // }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },

            {
                type: 'value',
                name: 'Revenue',
                position: 'right',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '£{value}'
                }
            }
        ],
        series: [
            {
                name: 'Attendees',
                type: 'bar',
                data: [196, 180, 201, 220, 190, 198, 210, 184, 208, 215, 192, 200],
                itemStyle: {
                    opacity: 0.6
                }
            },
            // {
            //     name: 'Attendees 2023',
            //     type: 'bar',
            //     data: [21, 22, 30, 40, 50, 60, 96, 80, 108, 150, 192, 200],
            //     itemStyle: {
            //         color: colors[0],
            //         opacity: 0.4
            //     }
            // },
            {
                name: 'Revenue',
                type: 'line',
                // areaStyle: {},
                yAxisIndex: 1,
                data: [980, 900, 1005, 1100, 950, 990, 1050, 920, 1040, 1075, 960, 1000 ],
                itemStyle: {
                    color: colors[1]
                }
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