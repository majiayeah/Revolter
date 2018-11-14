
<template>
    <div>

        <xm-container>

            <xm-blank></xm-blank>

            <md-input-container :class="classes.remoteHostInput">
                <label>远程域名</label>
                <md-input v-model="remoteHost" type="text" disabled></md-input>
                <span class="md-error">请输入一个需要反向代理的域名</span>
            </md-input-container>

            <md-input-container :class="classes.remotePortInput">
                <label>远程端口</label>
                <md-input type="number" min="1" max="65535" value="443" disabled></md-input>
                <span class="md-error">请输入小于65535的一个正整数</span>
            </md-input-container>

            <md-input-container :class="classes.portInput">
                <label>本地端口</label>
                <md-input v-model="port" type="number" min="1024" max="65535"></md-input>
                <!-- 端口号如果小于1024运行需要sudo权限 -->
                <span class="md-error">请输入1024~65535之间的一个整数</span>
            </md-input-container>

            <xm-switch :value="true" disabled>HTTPS</xm-switch>

            <xm-switch v-model="allowLAN">允许来自局域网的链接</xm-switch>

            <xm-switch v-model="autoOpen">服务器运行后自动在浏览器中打开页面</xm-switch>

            <xm-blank></xm-blank>

            <md-layout md-gutter md-column>
                <!-- 未完工 -->
                <md-layout md-align="center">
                    <md-button class="md-raised md-primary" @click="reset()">恢复默认设置</md-button>
                </md-layout>

                <xm-blank></xm-blank>

                <md-layout md-align="center">
                    <md-button class="md-raised md-primary" :disabled="!running" :href="`https://127.0.0.1:${listeningPort}`" target="_blank" ref="openBtn">在浏览器中打开</md-button>
                </md-layout>
            </md-layout>

        </xm-container>

        <md-button class="md-fab md-fab-bottom-right" @click="toggleServer" :disabled="preparing">
            <md-icon>{{!running ? "play_arrow" : "stop"}}</md-icon> <!-- 未完工 -->
            <md-tooltip md-direction="top">{{!running ? "运行" : "停止"}}服务器</md-tooltip> <!-- 未完工, 在触屏下似乎表现不正常 -->
        </md-button>

    </div>
</template>

<script>

import Option from "../option"

import xmSwitch from "./xmSwitch.vue"
import xmBlank from "./xmBlank.vue"
import xmContainer from "./xmContainer.vue"

import Server from "../server.js"

export default {
    components: {
        xmSwitch,
        xmBlank,
        xmContainer
    },
    data() {
        const options = new Option()

        return ({
            options,
            port: options.get("port"),
            remoteHost: options.get("remoteHost"),
            allowLAN: options.get("allowLAN"),
            autoOpen: options.get("autoOpen"),
            running: false,
            preparing: true,
            listeningPort: "",
            classes: {
                portInput: "",
                remoteHostInput: "",
                remotePortInput: ""
            }
        })
    },
    watch: {
        port(p) {
            p = +p
            if (Number.isSafeInteger(+p) && p >= 1024 && p <= 65535) {
                this.classes.portInput = ""
                this.options.set("port", p)
            } else {
                this.classes.portInput = "md-input-invalid"
            }
        },
        allowLAN(boolean) {
            this.options.set("allowLAN", boolean)
        },
        autoOpen(boolean) {
            this.options.set("autoOpen", boolean)
        }
    },
    methods: {
        reset() {
            this.options.clear()
            Object.assign(this, this.options.getAll())
        },
        async startServer() {
            this.listeningPort = this.port

            if (this.autoOpen) {
                await this.$nextTick()
                this.$refs.openBtn.$el.click()
            }

            console.log("Server started")
        },
        async stopServer() {
            console.log("Server stopped")
        },
        async toggleServer() {
            this.preparing = true

            if (!this.running) {
                await this.startServer()
            } else {
                await this.stopServer()
            }

            this.running = !this.running
            this.preparing = false
        }
    },
    async mounted() {
        await Server.prepare()
        this.preparing = false
    },
}
</script>
