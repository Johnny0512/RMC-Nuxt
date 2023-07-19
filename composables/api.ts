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
    // const runtimeConfig = useRuntimeConfig()
    return useFetch(('/stu_info/' + id), {
        baseURL: 'http://localhost:8080',
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export const getComments = (id: string) => {
    const runtimeConfig = useRuntimeConfig()
    return useFetch(('/cmt_detail_list/list?stuId='+id), {
        baseURL: runtimeConfig.public.apiBase,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}

export const getDetailedComments = (id: string) => {
    const runtimeConfig = useRuntimeConfig()
    return useFetch(('/stu_info/detailedCmtList?stuId='+id), {
        baseURL: runtimeConfig.public.apiBase,
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
}
