<!--
 * 文字在左侧并自动对齐的开关组件
 * 在md-switch上所有可用的属性在xm-switch上都可用
 * @author Xmader
 * @copyright Copyright (c) 2018 Xmader. All Rights Reserved.
 * @license MIT
 -->

<template>
    <md-layout md-gutter>
        <md-layout>
            <label class="switch-label">
                <slot></slot>
            </label>
        </md-layout>
        <md-layout md-align="end">
            <md-switch class="md-warn" v-bind="$attrs" :value="value" @input="changeState"></md-switch>
        </md-layout>
    </md-layout>
</template>

<script>
export default {
    props: {
        value: Boolean,
    },
    inheritAttrs: false,
    methods:{
        changeState(value) {
            this.$emit("input", value)
        }
    }
}
</script>


<style>
.switch-label {
  height: 14px;
  line-height: 14px;
  margin: 16px 8px 16px 0;
}
</style>

