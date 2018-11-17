
<template>
    <md-layout md-gutter class="xm-container">
        <md-layout md-column>
            <slot></slot>
        </md-layout>
    </md-layout>
</template>

<style>
.xm-container {
    max-height: calc(100vh - 64px);
    overflow: auto;
}
.xm-container > .md-layout  {
    margin-left: 10%;
    margin-right: 10%;
    flex-wrap: nowrap;
    display: block;
}
</style>
