
<template>
    <main>
        <md-whiteframe md-elevation="3">
            <md-toolbar>
                <md-button class="md-icon-button" @click="toggleSidenav">
                    <md-icon>menu</md-icon>
                </md-button>

                <h2 class="md-title" style="flex: 1">Revolter</h2>
            </md-toolbar>
        </md-whiteframe>

        <the-settings-page v-if="!!isActive('settings')"></the-settings-page>
        <the-about-page v-if="!!isActive('about')"></the-about-page>

        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                    <h3 class="md-title">Revolter</h3>
                </div>
            </md-toolbar>

            <md-list>
                <md-list-item @click="switchPage('settings')" :class="isActive('settings')">
                    <md-icon>settings</md-icon><!-- build --> <span>设置</span>
                </md-list-item>

                <md-list-item @click="switchPage('about')" :class="isActive('about')">
                    <md-icon>info</md-icon> <span>关于</span>
                </md-list-item>
            </md-list>
        </md-sidenav>
    </main>
</template>

<script>

import TheSettingsPage from "./TheSettingsPage.vue"
import TheAboutPage from "./TheAboutPage.vue"

export default {
    components: {
        TheSettingsPage,
        TheAboutPage
    },
    data() {
        return ({
            page: "settings",
            classes: {
                active: "md-primary",
            }
        })
    },
    methods: {
        toggleSidenav() {
            this.$refs.leftSidenav.toggle()
        },
        switchPage(pageName) {
            this.page = pageName
            this.toggleSidenav()
        },
        isActive(pageName) {
            return this.page == pageName ? this.classes.active : null
        },
    },
}
</script>

