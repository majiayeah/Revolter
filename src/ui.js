/**
 * The UI of Revolter
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 */

import Vue from "vue/dist/vue.runtime.esm.js"
import VueMaterial from "vue-material/dist/vue-material.debug.js"
import App from "./components/App.vue"

Vue.use(VueMaterial)

export const vm = new Vue({
    el: "#app",
    components: {
        App
    },
    render: function (createElement) {
        return createElement("App", { ref: "App" })
    },
    mounted: function () {

    },
})



