<template>
  <!--    TODO: 头像文件测试集，展示逻辑优化，表头动态设计，添加登陆访问认证，加载动画    -->
    <div class="flex justify-between items-center">
        <div class="font-bold text-2xl">
            Student List
        </div>
        <div class="join">
            <input class="input input-bordered join-item" v-model="studentName" placeholder="Search by name..."/>
            <button class="btn join-item rounded-r-full" @click="search(studentName)">Search</button>
        </div>
    </div>
<!--    TODO: very slow. need to find a better way-->
    <div class="absolute left-0 right-0 bg-base-100 opacity-50 w-full h-full z-50 flex items-center justify-center"
         v-show="isLoading">
        <span class="loading loading-spinner loading-md"></span>
    </div>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
            <tr>
                <th>Name</th>
                <th>Major</th>
                <th>Graduate Year</th>
                <th>Score</th>
                <th></th>
            </tr>
            </thead>
            <tbody v-for="row in results.data.records">

            <!-- row 1 -->
            <tr>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12">
                                <img :src="'https://i.pravatar.cc/300?img=' + getRandomInt(70)"
                                     alt="Avatar Tailwind CSS Component"/>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">{{ row.name }}</div>
                            <div class="text-sm opacity-50">{{ row.email }}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {{ row.major }}
                    <br/>
                    <span class="badge badge-ghost badge-sm">{{ row.college }}</span>
                </td>
                <td>{{ row.gradYear }}</td>
                <td>
                    <div :class="'rounded-xl font-bold text-white ' + color(row.score) +' mr-10 flex justify-center'">
                        {{ row.score }}
                    </div>
                </td>
                <th>
                    <button class="btn btn-ghost btn-xs">
                        <NuxtLink :to="'/details/detail-'+ row.stuId" target="_blank">details</NuxtLink>
                    </button>
                </th>
            </tr>
            </tbody>
        </table>
        <br clear="all"/>
        <div class="flex justify-center justify-between mb-5">
            <div class="join">
                <button class="join-item btn" @click="handlePageChange(results.data.current - 1)"
                        :disabled=isStartPage(results.data.current)>«
                </button>
                <button class="join-item btn">Page {{ results.data.current }}</button>
                <button class="join-item btn" @click="handlePageChange(results.data.current + 1)"
                        :disabled=isEndPage(results.data.current)>»
                </button>
            </div>
            <div class="join">
                <input class="input input-bordered join-item rounded-l-full w-1/3 " v-model="page"
                       placeholder="Jump to..."/>
                <button class="btn join-item rounded-r-full" @click="handlePageChange(page)">GO</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import {getStudentDetail, getStudentList, searchByName} from "~/composables/api";
const page = ref('')

const studentName = ref('')

const isLoading = ref(false)

const {data: results} = await reactive(
    getStudentList(),
)

const handlePageChange = async (page) => {
    console.log(page)
    isLoading.value = true
    const res = await getStudentList(page)
    results.value = res.data.value
    isLoading.value = false
    return results
}

const search = async (studentName) => {
    console.log(studentName)
    isLoading.value = true
    const res = await searchByName(studentName)
    results.value = res.data.value
    isLoading.value = false
    return results
}


function isStartPage(page) {
    if (page == 1) {
        return true
    } else {
        return false
    }
}

function isEndPage(page) {
    if (page == results.pages) {
        return true
    } else {
        return false
    }
}

const color = (score) => {
    if (score < 3) {
        return "bg-red-500"
    } else if (score < 4) {
        return "bg-yellow-500"
    } else {
        return "bg-green-500"
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


</script>
