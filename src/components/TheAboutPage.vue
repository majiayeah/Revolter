
<template>
    <md-layout md-gutter>
        <md-layout md-flex="80" md-flex-offset="10" md-column>

            <xm-blank></xm-blank>

            <md-card md-with-hover>
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-title">Revolter</div>
                        <div class="md-subhead">{{appVersion}}</div>
                    </md-card-header-text>

                    <md-card-media md-medium>
                        <img :src="'./icon.png'">
                    </md-card-media>
                </md-card-header>

                <md-card-actions>
                    <md-button v-if="checkingUpdate" disabled>检查更新中…</md-button>
                    <md-button v-else @click="doCheckUpdate">检查更新</md-button> <!-- 未完工, 禁用 -->
                </md-card-actions>
            </md-card>

            <xm-blank></xm-blank>

            <md-card md-with-hover>
                <md-card-header>
                    <md-layout md-align="center">
                        <div class="md-subhead">
                            <br />
                            Revolter 是一个正在不断开发中的 Android App ,
                            <!-- 未完工 -->
                        </div>
                    </md-layout>
                </md-card-header>

                <md-card-actions>
                    <md-button class="md-warn" href="https://github.com/Xmader/Revolter/issues" target="_blank">BUG 反馈</md-button>
                    <md-button href="https://github.com/Xmader/Revolter/" target="_blank">查看源代码</md-button>
                </md-card-actions>
            </md-card>

            <xm-blank></xm-blank>

            <md-card md-with-hover v-if="false">
                <!-- 这是一个未完工的列表, 隐藏 -->
                <md-card-header>
                    <div class="md-subhead">Revolter 主要用到了以下开源项目：</div>
                </md-card-header>

                <md-layout md-align="center">
                    <div class="md-subhead">
                        Vue.js <br />
                        Vue Material <br />
                        Cordova <br />
                    </div>
                </md-layout>

                <xm-blank></xm-blank>
            </md-card>

        </md-layout>
    </md-layout>
</template>

<script>

import getAppVersion from "../util/get-app-version.js"
import checkUpdate from "../util/check-update.js"

import xmBlank from "./xmBlank.vue"

export default {
    components: {
        xmBlank
    },
    data() {
        return ({
            appVersion: "",
            checkingUpdate: false,
        })
    },
    methods: {
        async doCheckUpdate() {
            this.checkingUpdate = true
            await checkUpdate()
            this.checkingUpdate = false
        }
    },
    async mounted() {
        this.appVersion = await getAppVersion()
    },
}
</script>
