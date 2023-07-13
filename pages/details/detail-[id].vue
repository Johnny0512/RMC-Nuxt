<template>
    <div>
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between card bg-base-300 rounded-box p-5">
                <div class="flex flex-col">
                    <b>{{ results.data.name }}</b>
                    <p>{{ results.data.email }}</p>

                    <div>
                        <div class="badge badge-outline">{{ results.data.major }}</div>
                    </div>

                </div>
                <div class="avatar">
                    <div class="w-16 rounded-full">
                        <img src="/assets/images/koala.jpg"/>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="grid h-20 card bg-base-300 rounded-box place-items-center">content</div>
        </div>
    </div>
</template>
<script setup>

const route = useRoute()
console.log(route.params)
const {data: results} = await reactive(
    getStudentDetail(route.params.id),
)
console.log(results)
</script>
