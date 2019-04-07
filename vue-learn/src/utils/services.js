const datas = [{title: 'WHY', id: 1}, {title: 'WHAT', id: 2}, {title: 'HOW', id: 3}]

export async function getPostList() {
    return {data: datas};
}

export async function getPostDetail(id) {
    return {data: datas.find(item => item.id == id)};
}

export async function getSessionUser() {
    return {data: { nickname:'llh' }}
}