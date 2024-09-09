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
import { inheritInnerComments } from '@babel/types';

    echarts.use([ LineChart, TooltipComponent, GridComponent, DatasetComponent, LabelLayout, UniversalTransition, ToolboxComponent, LegendComponent ]);

    let defaultOption = chartsConfig.getDefaultOption({numColors: 10});

    defaultOption.tooltip.formatter = function (params, _ticket, _callback) {
        let returnVal = '';
        let currentWeekday = '';
        params.forEach(param => {
            if (param.data == '-') return;
            if (currentWeekday != param.axisValueLabel) {
                returnVal += `<div class="m-bottom-0">${param.axisValueLabel}</div>`;
                currentWeekday = param.axisValueLabel;
            }
            returnVal += `<div>${param.marker} ${param.seriesName} ${param.value}% full</div>`;
        });

        return returnVal;
    };

    function getColors(percent) {
        let color1 = defaultOption.color[1];
        let color2 = defaultOption.color[0];

        if (percent >= 80 ) {
            color1 = defaultOption.color[5];
            color2 = defaultOption.color[4];
        }
        else if (percent >= 50 ) {
            color1 = defaultOption.color[3];
            color2 = defaultOption.color[2];
        }
        return [color1, color2];
    }

    function getItemStyle(percent) {
        let colors = getColors(percent);

        return {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                    offset: 0,
                    color: colors[0]
                },
                {
                    offset: 1,
                    color: colors[1]
                }
            ])
        }
    }

    function getLabelOption(percent) {
        return {
            show: true,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 7,
            rotate: 90,
            formatter: '{name|{a}}',
            color: defaultOption.colorDefaults.accentContrast,
            textBorderColor: getColors(percent)[0],
            textBorderWidth: 2,

            rich: {
                name: {
                    fontSize: 10,
                    textShadowColor: getColors(percent)[1],
                    textShadowBlur: 3,
                },
            }
        }
    }

    const rawData = [
        {
            name: 'Open Session',
            weekday: 'Tue',
            booked: 24,
            capacity: 24
        },
        {
            name: 'Open Session',
            weekday: 'Thu',
            booked: 18,
            capacity: 24
        },
        {
            name: 'Late Session',
            weekday: 'Thu',
            booked: 24,
            capacity: 24
        },
        {
            name: 'Open Session',
            weekday: 'Sat',
            booked: 18,
            capacity: 24
        },
        {
            name: 'Open Session',
            weekday: 'Sat',
            booked: 11,
            capacity: 24
        },
        {
            name: 'League Session',
            weekday: 'Sun',
            booked: 7,
            capacity: 24
        }
    ];

    const getXAxisData = function(rawData) {
        const data = [];

        rawData.forEach(session => {
            data.push(session.weekday);
        });
        // return data;
        return Array.from(new Set(data));
    }

    const xAxisData = getXAxisData(rawData);

    function getSeries() {
        let series = [];
        let currentWeekday = '';
        let stack = 0;

        rawData.forEach(session => {
            currentWeekday == session.weekday ? stack++ : stack = 0;
            currentWeekday = session.weekday;

            const percent = (session.booked / session.capacity * 100).toFixed(0);

            let data = [];

            xAxisData.forEach(item => {
                data.push(item === session.weekday ? percent : '-' );
            })

            let sessionData = {
                data,
                showBackground: true,
                type: 'bar',
                barMinWidth: 0,
                label: getLabelOption(percent),
                stack: `${stack}`,
                // stackStrategy: 'samesign',
                itemStyle: getItemStyle(percent),
                name: session.name
            }

            series.push(sessionData);
        });

        return series;
    }

    // function getInterval(index, value) {
    //     console.log('get interval', index, value);
    //     if (value == 'Thu' || value == 'Sat') {
    //         console.log('return 2');
    //         return 2;
    //     };
    //     console.log('return 1');
    //     return 1;
    // }



    let additionalOption = {

        legend: {
            data: []
        },
        yAxis: {
            type: 'value',
            name: '% Booked',
            nameTextStyle: {
                fontWeight: 'bolder'
            },
            axisLabel: {
                formatter: '{value}%'
            }
        },

        xAxis: {
            type: 'category',
            // data: ['Tue', 'Thu', 'Thu', 'Sat', 'Sat', 'Sun'],
            data: xAxisData,

            // axisLabel: {
            //     // rotate: 45,
            //     interval: getInterval
            // },

        },
        series: getSeries()
    };

    const option = {...defaultOption, ...additionalOption};
</script>
