
<template>
    <div>

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
                    <span class="md-error">请输入小于65535的一个正整数</span>
                </md-input-container>

                <md-input-container :class="classes.portInput">
                    <label>本地端口</label>
                    <md-input v-model="port" type="number" min="1024" max="65535"></md-input>
                    <!-- 端口号如果小于1024运行需要sudo权限 -->
                    <span class="md-error">请输入1024~65535之间的一个整数</span>
                </md-input-container>

                <xm-switch v-model="allowLAN">允许来自局域网的链接</xm-switch>

            </md-layout>
        </md-layout>

        <md-button class="md-fab md-fab-bottom-right">
            <md-icon>play_arrow</md-icon>
        </md-button>

    </div>
</template>

<script>

import Option from "../option"

import xmSwitch from "./xmSwitch.vue"

export default {
    components: {
        xmSwitch
    },
    data() {
        const options = new Option()

        return ({
            options,
            port: options.get("port"),
            remoteHost: options.get("remoteHost"),
            allowLAN: options.get("allowLAN"),
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
        }
    },
}
</script>
