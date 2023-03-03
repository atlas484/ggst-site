<script setup lang="ts">
import Icon_Arrows from './icons/Icon_Arrows.vue'
import NavItem from './NavItem.vue'

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
					<Icon_Arrows />
				</a>
			</li>
			<NavItem navPageName="Home" :currentPage="pageName" />
			<NavItem navPageName="Input" :currentPage="pageName" />
			<NavItem navPageName="Stats" :currentPage="pageName" />
			<NavItem navPageName="Rating" :currentPage="pageName" />
			<NavItem navPageName="Calculator" :currentPage="pageName" />
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

.nav-link:hover svg {
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

main {
	margin-left: 0;
	margin-top: var(--nav-width-small);
}

/* Large screens */
@media only screen and (min-width: 700px) {
	.nav-logo {
		display: list-item;
	}

	.nav-list {
		flex-direction: column;
	}

	.nav-link {
		justify-content: left;
	}

	nav:hover {
		width: 16rem;
	}

	nav:hover .link-text {
		display: inline;
	}

	nav:hover .nav-logo svg {
		margin-left: var(--nav-logo-margin-left);
	}

	nav:hover .nav-logo-text {
		left: 0px;
	}

	main {
		margin-top: 0;
		margin-left: var(--nav-width-small);
	}
}
</style>