<template>
    <Header title="Welcome!"></Header>

    <section class="dashboard-graphs">
        <Card
                title="Monthly Attendance and Revenue"
                titleCssClass="h4"
                elemType="div"
            >
            <template #body>
                <Combined />
            </template>
        </Card>
        <Card
                title="Upcoming Session Availability"
                titleCssClass="h4"
                elemType="div"
            >
            <template #body>
                <Attendance />
            </template>
        </Card>
        <Card
                title="Popular Sessions"
                titleCssClass="h4"
                elemType="div"
            >
            <template #body>
                <Popular />
            </template>
        </Card>



    </section>
</template>

<script setup>
    import Card from '@/components/interface/Card.vue';

    import Combined from '@/components/admin/charts/Combined.vue';

    import Header from '@/components/admin/PageHeader.vue';
    import Attendance from '@/components/admin/charts/Attendance.vue';
    import Revenue from '@/components/admin/charts/Revenue.vue';
    import Popular from '@/components/admin/charts/Popular.vue';


</script>

<style lang="scss">
    .dashboard-graphs {
        display: grid;
            gap: var(--space);
        grid-template-areas: "a a a b b" "a a a c c";

        .card {
            margin: 0;
            overflow: visible;

            .chart {
                width: 100%;
                height: 33vh;
                position: relative;
            }
            &:nth-child(1) {
                grid-area: a;

                .chart {
                    height: 70vh;
                }
            }

            &:nth-child(2) {
                grid-area: b;
            }

            &:nth-child(3) {
                grid-area: c;
            }
        }
    }


</style>