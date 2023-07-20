<template>
    <div>
        <div class="flex flex-col w-full h-full">
            <div class="flex flex-row justify-between card bg-base-200 rounded-box p-5">
                <div class="flex flex-row items-center">
                    <div class="flex flex-col">
                        <b class="text-2xl">{{ results.data.name }}</b>
                        <p>{{ results.data.email }}</p>
                        <div class="flex flex-row mt-2 font-bold">
                            <div class="badge badge-outline mr-2">{{ results.data.major }}</div>
                            <div class="badge badge-info mr-2">{{ results.data.college }}</div>
                            <div class="badge badge-accent mr-2">{{ results.data.gradYear }}</div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row items-center">
                    <div class="flex flex-row bg-white rounded-2xl p-3 mr-5 hover:shadow-xl ease-out duration-300 border-2 border-slate-500">

                        <div class="flex flex-col mr-5 ">
                            <template v-for="(attr, name, index) in results.data">
                                <div v-if="name.startsWith('rat') & index <= 11">
                                    <div class="flex flex-rol justify-between">
                                        <div class="mr-3 font-bold">{{ name.replace('rat', '') }}:</div>
                                        <div :class="textColor(attr)">{{ attr }}</div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="flex flex-col mr-5 ">
                            <template v-for="(attr, name, index) in results.data">
                                <div v-if="name.startsWith('rat') & index > 11">
                                    <div class="flex flex-rol justify-between">
                                        <div class="mr-3 font-bold">{{
                                            name.replace('rat', '').replace('Eff', ' Efficiency')
                                            }}:
                                        </div>
                                        <div :class="textColor(attr)">{{ attr }}</div>
                                    </div>
                                </div>
                            </template>
                        </div>

                    </div>
                    <div class="py-2 flex flex-col items-center mr-5">
                        <div class="text-xs font-bold">Overall Score</div>
                        <div :class="'rounded-xl font-bold text-white ' + color(results.data.score) +' flex justify-center shadow-lg'">
                            <p class="text-3xl p-2">
                                {{ results.data.score }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="avatar mx-auto">
                            <div class="w-16 rounded-full border-slate-500 border-2 hover:shadow-xl ease-out duration-300">
                                <img src="/assets/images/icon.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-2xl font-bold ml-5 mt-5">
                Comments
            </div>
            <div v-for="record in comments.data">
                <div class="divider mx-10"></div>
                <div class="flex flex-row card bg-base-300 rounded-box p-5 mx-10">
                    <div class="flex w-2/5 flex-row">
                            <div class="font-bold w-3/5">
                                <div v-if="record.name == null">
                                    Anonymous Student
                                </div>
                                <div v-else>
                                    {{ record.name }}
                                </div>
                            </div>
                            <div class="flex w-2/5">
                                <div class="w-full">
                                    <div class="font-bold">
                                        Ratings:
                                    </div>
                                    <template v-for="(attr, name, index) in record">
                                        <div v-if="name.startsWith('rat')">
                                            <div class="flex flex-row justify-between">
                                                <div class="text-xs">{{
                                                        name.replace('rat', '').replace('Eff', ' Efficiency')
                                                    }}:
                                                </div>
                                                <div :class="textColor(attr)+' text-xs font-bold'">{{ attr }}</div>
                                            </div>
                                        </div>
                                    </template>
                                </div>

                            </div>

                    </div>

                    <div class="divider divider-horizontal">+</div>
                    <div class="w-3/5 rounded-2xl bg-white p-5 border-zinc-400 border-2 flex flex-col justify-between">
                        <div v-if="record.comment != null">
                            {{ record.comment }}
                        </div>
                        <div v-else>
                            No comment.
                        </div>
                        <div class="text-xs flex justify-end">
                            Posted on:{{ record.createTime }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>


import {getDetailedComments, getStudentDetail} from "~/composables/api";

const route = useRoute()

const {data: results} = await reactive(
    getStudentDetail(route.params.id),
)

const {data: comments} = await reactive(
    getDetailedComments(route.params.id),
)

console.log(comments)
const color = (score) => {
    if (score < 3) {
        return "bg-red-500"
    } else if (score < 4) {
        return "bg-yellow-500"
    } else {
        return "bg-green-500"
    }
}
const textColor = (score) => {
    if (score < 3) {
        return "text-red-500"
    } else if (score < 4) {
        return "text-yellow-500"
    } else {
        return "text-green-500"
    }
}
</script>
