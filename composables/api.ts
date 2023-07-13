export const getStudentList = (page: number = 1) => {
    const runtimeConfig = useRuntimeConfig()
    return useFetch(('/stu_info/list?currentPage=' + page), {
        baseURL: runtimeConfig.public.apiBase,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
export const getStudentDetail = (id: string) => {
    const runtimeConfig = useRuntimeConfig()
    return useFetch(('/stu_info/' + id), {
        baseURL: runtimeConfig.public.apiBase,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
