<script setup lang="ts">
import Icon_Arrows from './icons/Icon_Arrows.vue'
import Icon_Home from './icons/Icon_Home.vue'
import Icon_Input from './icons/Icon_Input.vue'
import Icon_Stats from './icons/Icon_Stats.vue'
import Icon_Rating from './icons/Icon_Rating.vue'
import Icon_Calculator from './icons/Icon_Calculator.vue'

defineProps<{
  pageName: string
}>()

</script>

<template>
    <nav>
    <ul class="nav-list">
        <li class="nav-logo">
            <a href="index.html" class="nav-link">
            <span class="link-text nav-logo-text">Strive</span>
            <Icon_Arrows/>
            </a>
        </li>
        <li class="nav-item" :class="{active: pageName == 'Home'}">
            <a href="index.html" class="nav-link">
                <Icon_Home/>
                <span class="link-text">Home</span>
            </a>
        </li>
        <li class="nav-item" :class="{active: pageName == 'Input'}">
            <a href="input.html" class="nav-link">
                <Icon_Input/>
                <span class="link-text">Input</span>
            </a>
        </li>
        <li class="nav-item" :class="{active: pageName == 'Stats'}">
            <a href="stats.html" class="nav-link">
                <Icon_Stats/>
                <span class="link-text">Stats</span>
            </a>
        </li>
        <li class="nav-item" :class="{active: pageName == 'Rating'}">
            <a href="rating.html" class="nav-link">
                <Icon_Rating/>
                <span class="link-text">Rating</span>
            </a>
        </li>
        <li class="nav-item" :class="{active: pageName == 'Calculator'}">
            <a href="calculator.html" class="nav-link">
                <Icon_Calculator/>
                <span class="link-text">Calculator</span>
            </a>
        </li>
    </ul>
  </nav>
</template>

<style>
nav {
    position: fixed;
    background-color: var(--nav-bg);
    color: var(--nav-text-color);
    transition: width var(--nav-transition-speed) ease;
    overflow: auto;
    top: 0;
    width: var(--nav-width);
    height: var(--nav-height);
}

.nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
}

.nav-link {
    display: flex;
    align-items: center;
    height: var(--nav-width-small);
    color: var(--nav-text-color);
    text-decoration: none;
    transition: var(--nav-transition-speed);
    justify-content: center;
}

.link-text {
    filter: grayscale(100%) opacity(0.7);
    display: none;
    margin-left: 1rem;
}

.nav-link:hover .link-text {
    filter: grayscale(0%) opacity(1);
}

.nav-link svg {
    width: var(--nav-icon-width);
    min-width: var(--nav-icon-width);
    margin: 0 var(--nav-icon-margin-lr);
    fill: var(--nav-text-color);
    transition: var(--nav-transition-speed);
}
.nav-link:hover svg{
    fill: var(--nav-icon-hover-color)
}

.nav-logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--nav-text-color);
    background: var(--nav-logo-bg);
    font-size: 1.5rem;
    letter-spacing: 0.3ch;
    width: 100%;
    display: none;
}

.nav-logo svg {
    transform: rotate(0deg);
    transition: var(--nav-transition-speed);
}

.nav-logo-text {
    display: inline;
    position: absolute;
    left: -999px;
    transition: var(--nav-transition-speed);
    margin-left: var(--nav-icon-margin-lr);
}

nav:hover .nav-logo svg {
    transform: rotate(-180deg);
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

main {
    margin-left: 0;
    margin-top: var(--nav-width-small);
}

/* Large screens */
@media only screen and (min-width: 700px) {
    .nav-logo { display: list-item; }
    .nav-list { flex-direction: column; }
    .nav-link { justify-content: left; }

    nav:hover {
        width: 16rem;
    }

    nav:hover .link-text {
        display: inline;
    }

    nav:hover .nav-logo svg
    {
        margin-left: var(--nav-logo-margin-left);
    }

    nav:hover .nav-logo-text
    {
        left: 0px;
    }
    main {
        margin-top: 0;
        margin-left: var(--nav-width-small);
    }
}
</style>