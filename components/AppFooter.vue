<template>
    <footer class="main-footer">
        <div class="main-footer__block">
            <h6>{{ organisationStore.account.account_name }}</h6>
            <address>
                <template v-if="organisationStore.account.address1">
                    {{ organisationStore.account.address1 }}<br>
                </template>
                <template v-if="organisationStore.account.address2">
                    {{ organisationStore.account.address2 }}<br>
                </template>
                <template v-if="organisationStore.account.country">
                    {{ organisationStore.account.country }}<br>
                </template>
                <template v-if="organisationStore.account.suburb">
                    {{ organisationStore.account.suburb }},
                </template>
                <template v-if="organisationStore.account.state">
                    {{ organisationStore.account.state }}<br>
                </template>
                <template v-if="organisationStore.account.postcode">
                    {{ organisationStore.account.postcode }}
                </template>
            </address>
            <p v-if="organisationStore.account.phone">
                <a :href="`tel:${organisationStore.account.phone}`">
                    {{ organisationStore.account.phone }}
                </a>
            </p>
            <p v-if="organisationStore.account.email">
                <a :href="organisationStore.account.email">
                    {{ organisationStore.account.email }}
                </a>
            </p>

            <p v-if="organisationStore.account.website">
                <a :href="organisationStore.account.website">
                    {{ organisationStore.account.website }}
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
