<template>
    <div class="main-outer">
        <BrochureHeader />

        <div class="main-content layout-brochure">
            <slot />

            <!-- <aside class="container main-content__sidebar">

            </aside> -->
        </div>
        <BrochureFooter />
    </div>
</template>
