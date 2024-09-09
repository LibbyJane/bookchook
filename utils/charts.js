import { useOrganisationStore } from '@/stores/organisation';

export function getColors(n = 2, $pinia) {
    const organisationStore = useOrganisationStore($pinia);

    const fraction = 360 / n;
    let colors = [ `${organisationStore.account.theme_config.colors.accent.hex}`];

    for (let i = 1; i < n; i++) {
        colors.push(`hsl(${ organisationStore.account.theme_config.colors.accent.hsl.h > fraction ? organisationStore.account.theme_config.colors.accent.hsl.h - fraction*i : organisationStore.account.theme_config.colors.accent.hsl.h + fraction*i}, ${ organisationStore.account.theme_config.colors.accent.hsl.s - 10}%, ${ organisationStore.account.theme_config.theme_type == 'light' ? 43 : 75}%)`)
    }

    colors.push(`hsl(0, ${ organisationStore.account.theme_config.colors.accent.hsl.s - 30}%,  ${ organisationStore.account.theme_config.theme_type == 'light' ? 43 : 75}%)`);
    return colors;
}

export function getYearsArray() {
    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
}

// export function getDaysArray() {
//     return ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
// }

export function getDefaultYAxisItem() {

    return [
        {
            nameTextStyle: {
                color: "var(--c-text)"
            },
            position: 'left',
            alignTicks: true,
            axisLine: {
                show: true,
            }
        }
    ];
}

export function getDefaultOption({numColors}, $pinia) {
    const organisationStore = useOrganisationStore($pinia);
    console.log('c', organisationStore.account.theme_config.colors);

    const option = {
        color: getColors(numColors),
        colorDefaults: {
            text: organisationStore.account.theme_config.colors.text.hex,
            accentContrast: organisationStore.account.theme_config.colors.accent_contrast.hex,
        },
        textStyle: {
            fontFamily: "lexend",
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            backgroundColor: "var(--c-background-alt)",
            borderColor: "hsla(var(--c-text-hsl), 0.2)",
            textStyle: {
                color: "var(--c-text)"
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                saveAsImage: { show: true }
            },
            bottom: 0
        },
        legend: {
            itemGap: 30,
            textStyle: {
                color: "var(--c-text)"
            },
        },
        xAxis: [
            {
                axisLabel: {
                    textStyle: {
                        color: "var(--c-text)"
                    }
                },
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [getDefaultYAxisItem()]
    };
    return option;
}