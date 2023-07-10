<template>
<!--    TODO: 头像文件测试集，展示逻辑优化，表头动态设计，添加登陆访问认证，加载动画    -->
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
                                <img src="/assets/images/koala.jpg"
                                     alt="Avatar Tailwind CSS Component"/>
                            </div>
                        </div>
                        <div>
                            <div class="font-bold">{{row.name}}</div>
                            <div class="text-sm opacity-50">{{row.email}}</div>
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
                    <button class="btn btn-ghost btn-xs">details</button>
                </th>
            </tr>
            </tbody>
        </table>
        <br clear="all"/>
        <div class="flex justify-center">
            <div class="join">
                <div v-for="i in results.data.pages">
                    <div v-if="i == results.data.current">
                        <input class="join-item btn btn-square" type="radio" name="options" :aria-label=i @click="handlePageChange(i)" checked/>
                    </div>
                    <div v-else>
                        <input class="join-item btn btn-square" type="radio" name="options" :aria-label=i @click="handlePageChange(i)"/>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script setup>
import {getStudentList} from "~/composables/api";

const loading = ref(false)
const {data: results} = await reactive(
    getStudentList(),
)
console.log(results)
const handlePageChange = async (page) => {
    console.log(page)
    loading.value = true
    const res = await getStudentList(page)
    results.value = res.data.value
    loading.value = false
    return results
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


</script>
