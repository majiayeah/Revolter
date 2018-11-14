
<template>
    <xm-container>

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
                <md-button v-if="update.checking" disabled>检查更新中…</md-button>
                <md-button v-else @click="doCheckUpdate">检查更新</md-button> <!-- 未完工 -->
            </md-card-actions>
        </md-card>

        <xm-blank></xm-blank>

        <md-card md-with-hover v-if="update.available !== null">
            <md-card-header>
                <template v-if="update.available">
                    <div class="md-title">发现新版本!</div>
                    <div class="md-subhead">
                        当前版本: {{appVersion}}
                        <br />
                        最新版本: {{update.newVersion}}
                    </div>
                </template>

                <template v-else>
                    <div class="md-title">没有更新的版本</div>
                    <div class="md-subhead">当前版本 <em>{{appVersion}}</em> 是最新版本</div>
                </template>
            </md-card-header>

            <md-card-actions>
                <md-button class="md-warn" v-if="update.available" href="https://github.com/Xmader/Revolter/releases/latest" target="_blank">下载最新版本</md-button>
                <md-button @click="update.available = null">{{update.available ? "取消" : "确定"}}</md-button>
            </md-card-actions>
        </md-card>

        <xm-blank></xm-blank>

        <md-card md-with-hover>
            <md-card-header>
                <md-layout>
                    <div class="md-subhead" style="text-align:center;">
                        Revolter <br />
                        Copyright (c) 2018 Xmader. <br />
                        <!-- License: MIT <br /> -->
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

    </xm-container>
</template>

<script>

import getAppVersion from "../util/get-app-version.js"
import { getLatestVersionNumber, compareVersionNumbers } from "../util/check-update.js"

import xmBlank from "./xmBlank.vue"
import xmContainer from "./xmContainer.vue"

export default {
    components: {
        xmBlank,
        xmContainer
    },
    data() {
        return ({
            appVersion: "",
            update: {
                available: null,
                checking: false,
                newVersion: ""
            },
        })
    },
    methods: {
        async doCheckUpdate() {
            this.update.checking = true

            const newVersion = await getLatestVersionNumber()
            const available = compareVersionNumbers(this.appVersion, newVersion)

            this.update.available = available
            this.update.newVersion = available ? newVersion : ""

            this.update.checking = false
        }
    },
    async mounted() {
        this.appVersion = await getAppVersion()
    },
}
</script>
