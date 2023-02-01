<script setup lang="ts">
import Icon_Arrows from './icons/Icon_Arrows.vue'
import Icon_Home from './icons/Icon_Home.vue'
import Icon_Input from './icons/Icon_Input.vue'
import Icon_Stats from './icons/Icon_Stats.vue'
import Icon_Rating from './icons/Icon_Rating.vue'
import Icon_Calculator from './icons/Icon_Calculator.vue'

defineProps<{
  navPageName: string,
  currentPage: string
}>()

function pageNameToHTML(pageName: string) {
    const s = pageName=="Home" ? "index" : pageName.toLowerCase()
    return s + ".html"
}

</script>

<template>
    <li class="nav-item" :class="{active: navPageName == currentPage}">
        <a :href="pageNameToHTML(navPageName)" class="nav-link" :class="{disabled: navPageName == currentPage}">
            <Icon_Home v-if="navPageName == 'Home'"/>
            <Icon_Input v-if="navPageName == 'Input'"/>
            <Icon_Stats v-if="navPageName == 'Stats'"/>
            <Icon_Rating v-if="navPageName == 'Rating'"/>
            <Icon_Calculator v-if="navPageName == 'Calculator'"/>
            <span class="link-text">{{ navPageName }}</span>
        </a>
    </li>
</template>

<style>
.nav-item svg {
    width: var(--nav-icon-width);
    min-width: var(--nav-icon-width);
    margin: 0 var(--nav-icon-margin-lr);
    fill: var(--nav-text-color);
    transition: var(--nav-transition-speed);
}

.nav-item {
    width: 100%;
}

.nav-item.active {
    background: var(--nav-active-bg);
}
.nav-item.active svg{
    fill: var(--nav-icon-active-color)
}

/* .nav-item:last-child {
    margin-top: auto;
} */

.nav-item:hover {
    background: var(--nav-active-bg);
}

a.disabled {
    pointer-events: none;
}
</style>