<template>
    <html data-theme="light" class="bg-base-200">
    <div>
        <Header></Header>
        <main class="bg-base-100 rounded-2xl shadow-2xl m-10 p-10 ">
            <slot/>
        </main>
        <GlobalFooter></GlobalFooter>
    </div>
    </html>
</template>
<script setup>
import Header from "~/components/Header.vue";
import GlobalFooter from "~/components/GlobalFooter.vue";
</script>
