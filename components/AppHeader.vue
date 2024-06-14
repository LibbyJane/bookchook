<template>
    <header class="main-header" :class="{ 'menu-open': menuOpen }">
        <button type="button" v-on:click="() => menuOpen = !menuOpen" class="main-header__nav-toggle" aria-controls="main-menu" :aria-expanded="menuOpen">
            <MenuIcon />
        </button>

        <h1 class="main-header__brand">Book<em>Chook</em></h1>

        <!-- <div class="content">
            <RouterLink class="site-logo" to="/">
                <img :src="Logo" alt="logo" />
            </RouterLink>

            <h1 class="page-title">
                {{ siteStore.pageTitle }}
            </h1>
        </div>-->


        <nav id="main-menu" class="main-menu">
            <ul class="main-menu__list">
                <li>
                    <div class="main-menu__item">
                        <span>Booking System</span>
                        <CaretIcon class="icon--xs" alt="View" />
                    </div>

                    <ul class="main-menu__dropdown">
                        <li><a href="/class-booking-system">Class booking</a></li>
                        <li><a href="/course-booking-system">Course booking</a></li>
                        <li><a href="/virtual-class-booking-system">Virtual classes</a></li>
                        <li><a href="/event-booking-system">Event booking</a></li>
                    </ul>
                </li>
                <li>
                    <a class="main-menu__item" href="/pricing">Pricing</a>
                </li>
                <li>
                    <a class="main-menu__item" href="/features">Features</a>
                </li>
            </ul>
        </nav>

        <Button text="Get Started" />
        <a v-if="!authenticated" class="main-header__cta btn btn--primary" href="/signup">
            Get started
        </a>
    </header>
</template>

<script setup>
    import { ref } from 'vue';
    // import { storeToRefs } from 'pinia';
    import MenuIcon from '@/components/icons/menu.vue';
    import CaretIcon from '@/components/icons/caret-down.vue';
    import Button from '@/components/Button.vue'

    const menuOpen = ref(false);
    // todo, placeholder for now
    const authenticated = false;

    // import CreateIcon from '@/assets/icons/note.svg';
    // import LogoutIcon from '@/assets/icons/log-out.svg';

    // import { useUserStore } from '@/stores/user';
    // import { useSiteStore } from '@/stores/site';

    // const userStore = useUserStore();
    // const storeRef = storeToRefs(userStore);
    // const authenticated = storeRef.getAuth;
    // const siteStore = useSiteStore();
</script>

