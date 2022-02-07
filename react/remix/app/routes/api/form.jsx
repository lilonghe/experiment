
export async function loader({ params, request }) {
    const url = new URL(request.url);
    console.log(url.searchParams, params);
    return fetch('http://rap2api.taobao.org/app/mock/262830/home').
        then(response => response.json()).then(res => res?.data?.nodes || []);
}