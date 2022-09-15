export interface PopularItem {
    aid: number;
    tid: number;
    bvid: string;
    tname: string;
    pic: string;
    title: string;
    pubdate: number;
    desc: string;
    duration: number;
    short_link: string;
    owner: {
      mid: number;
      name: string;
      face: string;
    },
    stat: {
      view: number;
      danmaku: number;
      reply: number;
      favorite: number;
      coin: number;
      share: number;
      like: number;
    },
    pub_location: string;
}

export interface PopularResponse {
    data: {
        list: PopularItem[]
    }
}