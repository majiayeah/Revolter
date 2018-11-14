/**
 * The UI of Revolter
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import Vue from "vue/dist/vue.runtime.esm.js"
import VueMaterial from "vue-material/dist/vue-material.debug.js"
import App from "./components/App.vue"

import Server from "./server.js"

Vue.use(VueMaterial)

export const vm = new Vue({
    el: "#app",
    components: {
        App
    },
    data: {
        server: new Server(),
        serverInited: false
    },
    render: function (createElement) {
        return createElement("App", { ref: "App" })
    },
    async mounted() {
        await this.server.init()

        const { settingsPage } = this.$refs.App.$refs
        settingsPage.preparing = false
        this.serverInited = true
    },
})

