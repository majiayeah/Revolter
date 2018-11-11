
<template>
    <main>
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>

            <h2 class="md-title" style="flex: 1">Revolter</h2>
        </md-toolbar>

        <md-sidenav class="md-left" ref="leftSidenav">
            <md-toolbar class="md-large">
                <div class="md-toolbar-container">
                    <h3 class="md-title">侧边导航内容</h3>
                </div>
            </md-toolbar>

            <p>人心就像一个容器，装的快乐多了，烦恼自然就少；装的简单多了，纠结自然就少；装的满足多了，痛苦自然就少；装的理解多了，矛盾自然就少；装的宽容多了，仇恨自然就少。胸襟决定器量，境界决定高下。活着就是一种修行，修行就是修心。修得一颗平常心，无时不是快乐；修得一颗满足心，无处不是幸福。</p>
        </md-sidenav>
    </main>
</template>

<script>
export default {
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle()
        },
    },
}
</script>

