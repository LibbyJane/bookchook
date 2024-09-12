<template>
    <div class="chart">
        <ClientOnly>
            <VChart :option="option" />
        </ClientOnly>
    </div>
</template>

<script setup>
    import { useOrganisationStore } from '@/stores/organisation';
    import * as echarts from 'echarts/core';
    import { LineChart, BarChart } from 'echarts/charts';
    import { TooltipComponent, GridComponent, DatasetComponent, ToolboxComponent, LegendComponent } from 'echarts/components';
    import { LabelLayout, UniversalTransition } from 'echarts/features';
    import * as chartsConfig from '@/utils/charts';

    echarts.use([ LineChart, BarChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);
    const organisationStore = useOrganisationStore();

    // const colors = [`${organisationStore.account.theme_config.colors.accent.hex}`,  `hsl(${ organisationStore.account.theme_config.colors.accent.hsl.h > 180 ? organisationStore.account.theme_config.colors.accent.hsl.h - 60 : organisationStore.account.theme_config.colors.accent.hsl.h + 60}, ${ organisationStore.account.theme_config.colors.accent.hsl.s < 70 ? organisationStore.account.theme_config.colors.accent.hsl.s : 70}%, ${ organisatioStore.account.theme_config.theme_type == 'light' ? 33 : 75}%)`];

    let defaultOption = chartsConfig.getDefaultOption({numColors: 6});

    defaultOption.tooltip.formatter =  function (params, _ticket, _callback) {
        let returnVal = '';
        params.forEach(param => {
            returnVal += `<div>${param.marker} ${param.seriesName}: ${param.seriesName == 'Revenue' ? '£' : ''}${param.value}</div>`;
        });

        return returnVal;
    }


    let additionalOption =  {
        legend: {
            data: [{name: 'Attendees', icon: "square"},{name: 'Revenue'}],
            itemStyle: {
                color: 'inherit'
            }
        },
        xAxis: [
            {
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Attendees',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: defaultOption.color[0]
                    }
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
                        color: defaultOption.color[3]
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
                    opacity: 0.5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0.5,
                        color: defaultOption.color[0]
                    },
                    {
                        offset: 1,
                        color: defaultOption.color[1]
                    }
                    ])
                },
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
                    color: defaultOption.color[3]
                }
            }
        ]
    };
    const option = {...defaultOption, ...additionalOption};

</script>
