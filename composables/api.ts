export const getStudentList = (page: number = 1) => {

    return useFetch(
        '/stu_info/list?currentPage=' + page,
        {
            baseURL: 'http://localhost:8080',
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
    )

}
