
<template>
    <md-layout md-gutter class="xm-container">
        <md-layout md-flex="80" md-flex-offset="10" md-column>
            <slot></slot>
        </md-layout>
    </md-layout>
</template>

<style>
.xm-container {
    max-height: calc(100vh - 64px);
    overflow: auto;
}
</style>
