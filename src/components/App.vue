
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
                <md-switch class="md-warn">主要颜色</md-switch>

                <md-input-container :class="classes.portInput">
                    <label>端口号</label>
                    <md-input v-model="port" type="number" min="1024" max="65535" title="请输入1024~65535之间的一个整数"></md-input>
                    <!-- 端口号如果小于1024运行需要sudo权限 -->
                    <span class="md-error">请输入1024~65535之间的一个整数</span>
                </md-input-container>
            </md-layout>
        </md-layout>

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
            classes: {
                active: "md-primary",
                portInput: ""
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
        }
    },
    methods: {
        toggleSidenav() {
            this.$refs.leftSidenav.toggle()
        },
    },
}
</script>

