<template>
    <footer class="main-footer">
        <div class="main-footer__block">
            <h6>{{ organisationStore.data.organisation.name }}</h6>
            <address v-if="organisationStore.data.organisation.address" v-html="organisationStore.data.organisation.address"></address>
            <p v-if="organisationStore.data.organisation.phone">
                <a :href="`tel:${organisationStore.data.organisation.phone}`">
                    {{ organisationStore.data.organisation.phone }}
                </a>
            </p>
            <p v-if="organisationStore.data.organisation.email">
                <a :href="organisationStore.data.organisation.email">
                    {{ organisationStore.data.organisation.email }}
                </a>
            </p>

            <p v-if="organisationStore.data.organisation.URL">
                <a :href="organisationStore.data.organisation.URL">
                    {{ organisationStore.data.organisation.URL }}
                </a>
            </p>
        </div>

        <div class="main-footer__copyright">
            <p>&copy; {{ siteStore.siteName }} {{ thisYear }}. All rights reserved.</p>
        </div>
    </footer>
</template>


<script setup>
    import { useOrganisationStore } from '@/stores/organisation';
    import { useSiteStore } from '@/stores/site';
    const siteStore = useSiteStore();
    const organisationStore = useOrganisationStore();
    const thisYear = new Date().getFullYear();
</script>


<style lang="scss">
    .main-footer {
        background-color: transparent;
        display: grid;
            gap: var(--space-med);
        margin: var(--space-lg) 0 0;
        padding: var(--content-padding);
        position: relative;
            &::before {
                background-color: var(--c-text);
                content: '';
                opacity: 0.1;
                pointer-events: none;
                position: absolute;
                inset: 0;
            }

        @include breakpoint(med) {
            grid-template-columns: repeat(3, 1fr);
        }

        p,
        li {
            font-size: var(--p-sm);
        }
    }

    .main-footer__copyright {
        grid-column: 1/-1;
        display: flex;
            align-items: center;
        opacity: 0.8;
        text-align: center;

        p {
            margin: auto;
        }
    }
</style>
