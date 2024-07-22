<template>
    <header id="header" class="main-header admin-header" :class="{ 'menu-open': userMenuOpen }" ref="headerRef">
        <div class="main-header__brand"><strong>{{ organisationStore.account.account_name }}</strong> admin portal</div>

        <nav id="main-menu" class="main-menu">
            <button type="button" v-on:click="() => menuOpen = false" class="main-header__nav-close" aria-controls="main-menu">
                <CloseIcon cssClass="icon--xs hide-on-desktop" />
            </button>
            <ul class="main-menu__list">
                <li>
                    <nuxt-link to="/bookings/" class="main-menu__item" >
                        <UserIcon />
                        <span>My account</span>
                    </nuxt-link>

                    <ul class="main-menu__dropdown">
                        <li>
                            <nuxt-link to="/user/account" class="main-menu__item">My details</nuxt-link>
                        </li>
                        <li>
                            <button type="button" class="main-menu__item">Log out</button>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
    import { useOrganisationStore } from '@/stores/organisation';
    import UserIcon from '@/components/icons/user.vue';
    import CloseIcon from '@/components/icons/cross.vue';

    const organisationStore = useOrganisationStore();
    const userMenuOpen = ref(false);

</script>

<style lang="scss">
    .main-header__brand {
        font-size: var(--h3);
        font-weight: normal;
        margin-right: var(--space-med);
        text-decoration: none;

        strong {
            display: inline-block;
            font-weight: bold;
            margin-right: var(--space-xs);

        }
    }

    .main-menu__item {
        padding: var(--space-sm) var(--content-padding);
        // text-decoration: solid;
    }

    .main-menu__dropdown {
        width: 100%;
    }
</style>