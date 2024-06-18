<template>
    <footer class="main-footer">
        <div class="main-footer__block">
            <h6>Resources</h6>
            <!-- TODO -->
            <ul>
                <li>
                    <a href="/resources/API">
                        API Documentation
                    </a>
                </li>

                <li>
                    <a href="/resources/admin">
                        Help Centre for Admins
                    </a>
                </li>

                <li>
                    <a href="/resources/bookers">
                        Help Centre for Bookers
                    </a>
                </li>
            </ul>
        </div>

        <div class="main-footer__copyright">
            <p>&copy; {{ siteStore.siteName }} {{ thisYear }}. All rights reserved.</p>
        </div>
    </footer>
</template>

<script setup>
    import { useSiteStore } from '@/stores/site';
    const siteStore = useSiteStore();
    const thisYear = new Date().getFullYear();
</script>

<style lang="scss">
    .main-footer {
        background: hsl(var(--c-background-hue), calc(var(--c-background-sat) - 50%), calc(var(--c-background-bri) - 4%));
        // border-top: thin solid hsla(var(--c-text-hsl), 0.1);
        display: grid;
            gap: var(--space-med);
        margin: var(--space-lg) 0 0;
        padding: var(--content-padding);

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
