
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

        <md-layout md-gutter>
            <md-layout md-flex="80" md-flex-offset="10">

                <md-layout md-gutter>
                    <span>&nbsp;</span>
                </md-layout>

                <md-input-container :class="classes.remoteHostInput">
                    <label>远程域名</label>
                    <md-input v-model="remoteHost" type="text" disabled></md-input>
                    <span class="md-error">请输入一个需要反向代理的域名</span>
                </md-input-container>

                <md-input-container :class="classes.remotePortInput">
                    <label>远程端口</label>
                    <md-input type="number" min="1" max="65535" value="443" disabled></md-input>
                    <span class="md-error">请输入一个小于65535的正整数</span>
                </md-input-container>

                <md-input-container :class="classes.portInput">
                    <label>本地端口</label>
                    <md-input v-model="port" type="number" min="1024" max="65535"></md-input>
                    <!-- 端口号如果小于1024运行需要sudo权限 -->
                    <span class="md-error">请输入1024~65535之间的一个整数</span>
                </md-input-container>

                <md-layout md-gutter>
                    <md-layout>
                        <label class="switch-label">允许来自局域网的链接</label>
                    </md-layout>
                    <md-layout md-align="end">
                        <md-switch class="md-warn" v-model="allowLAN"></md-switch>
                    </md-layout>
                </md-layout>

            </md-layout>
        </md-layout>

        <md-button class="md-fab md-fab-bottom-right">
            <md-icon>play_arrow</md-icon>
        </md-button>

        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                    <h3 class="md-title">侧边导航内容</h3>
                </div>
            </md-toolbar>

            <md-list>
                <md-list-item @click="toggleSidenav" :class="classes.active">
                    <md-icon>insert_drive_file</md-icon> <span>My files</span>
                </md-list-item>

                <md-list-item @click="toggleSidenav">
                    <md-icon>people</md-icon> <span>Shared with me</span>
                </md-list-item>

                <md-list-item @click="toggleSidenav">
                    <md-icon>access_time</md-icon> <span>Recent</span>
                </md-list-item>

                <md-list-item @click="toggleSidenav">
                    <md-icon>start</md-icon> <span>Starred</span>
                </md-list-item>

                <md-list-item @click="toggleSidenav">
                    <md-icon>delete</md-icon> <span>垃圾箱</span>
                </md-list-item>
            </md-list>
        </md-sidenav>
    </main>
</template>

<script>

import Option from "../option"

export default {
    data() {
        const options = new Option()

        return ({
            options,
            port: options.get("port"),
            remoteHost: options.get("remoteHost"),
            allowLAN: options.get("allowLAN"),
            classes: {
                active: "md-primary",
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
        }
    },
    methods: {
        toggleSidenav() {
            this.$refs.leftSidenav.toggle()
        },
    },
}
</script>

<style>
.switch-label {
  height: 14px;
  line-height: 14px;
  margin: 16px 8px 16px 0;
}
</style>


