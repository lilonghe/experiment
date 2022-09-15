import { useEffect, useState } from "react"

const REGION_MAP: {
    [key: number]: string
} = {
    1:'动画',
    13:'番剧',
    167:'国创',
    3:'音乐',
    129:'舞蹈',
    4:'游戏',
    17:'单机游戏',
    36:'知识',
    188:'数码',
    160:'生活',
    138:'搞笑',
    76:'美食圈',	
    75:'动物圈',
    119:'鬼畜',
    155:'时尚',
    202:'资讯',
    165:'广告',
    5:'娱乐',
    181:'影视',
    177:'纪录片',
    23:'电影',
    11:'电视剧'
}

interface RegionResponse {
    [key: number]: number
}

interface RegionStat {
    id: number
    title: string
    count: number
}

const Stat = () => {
    const [data, setData] = useState<RegionStat[]>([])

    useEffect(() => {
        fetch('/api/stat').then(resp => resp.json()).then(data => {
            const region: RegionResponse = data?.region_count;
            let list: RegionStat[] = []
            Object.keys(region).map(r => {
                let key = Number(r)
                if (REGION_MAP[key]) {
                    list.push({
                        id: key,
                        title: REGION_MAP[key],
                        count: region[key]
                    })
                }
            })
            list.sort((a,b) => b.count - a.count)
            setData(list)
        })
    }, [])

    return (
        <div className="container">
            <div className="flex flex-wrap gap-4">
                {data.map(item => <div key={item.id} className='rounded py-2 px-9 border-gray-100bg bg-gradient-to-r from-amber-500 to-amber-200 text-white w-fit'>
                    {item.title}: {item.count}
                </div>)}
            </div>
        </div>
    )
}

export default Stat