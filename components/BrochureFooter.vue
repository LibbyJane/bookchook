<template>
    <footer class="main-footer">
        <div class="main-footer__block">
            <h4>Resources</h4>
            <!-- TODO -->
            <ul>
                <li>
                    <a href="#">
                        API Documentation
                    </a>
                </li>

                <li>
                    <a href="#">
                        Help Centre for Admins
                    </a>
                </li>

                <li>
                    <a href="#">
                        Help Centre for Bookers
                    </a>
                </li>
            </ul>
        </div>
    </footer>
</template>

<style lang="scss">
    .main-footer {
        border-top: thin solid hsla(var(--c-text-hsl), 0.1);
        display: grid;
            gap: var(--space-med);
        margin: var(--space-lg) 0 0;
        padding: var(--content-padding);

        @include breakpoint(med) {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
