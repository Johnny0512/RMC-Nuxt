<template>
    <html data-theme="light">
    <div class="flex h-screen">
        <main class="m-auto border-2 border-emerald-700 rounded-3xl p-10 hover:shadow-2xl hover:shadow-emerald-700 transition ease-out">
            <slot />
            <button class="btn btn-accent"><NuxtLink to="/list">Go to main page</NuxtLink></button>
        </main>
    </div>
    </html>
</template>
<script setup>
</script>
