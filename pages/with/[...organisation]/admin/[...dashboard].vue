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
            title="Customer Signup"
            titleCssClass="h4"
            elemType="div"
        >
            <template #body>
                <NewCustomers />
            </template>
        </Card>
        <!-- <Card
                title="Average Session Capacity Reached"
                titleCssClass="h4"
                elemType="div"
            >
            <template #body>
                <Guage />
            </template>
        </Card> -->



    </section>
</template>

<script setup>
    import Card from '@/components/interface/Card.vue';

    import Combined from '@/components/admin/charts/Combined.vue';

    import Header from '@/components/admin/PageHeader.vue';
    import Attendance from '@/components/admin/charts/Attendance.vue';
    import Revenue from '@/components/admin/charts/Revenue.vue';
    import Guage from '@/components/admin/charts/Guage.vue';
    import NewCustomers from '@/components/admin/charts/NewCustomers.vue';


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
                height: 30vh;
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