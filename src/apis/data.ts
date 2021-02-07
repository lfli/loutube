import { IPopularNowTopMenu, ISideNav } from "@/typing/LocalData";

export const sideNavList: Array<ISideNav> = [
    { title: "首页", link: "/", icon: "icon-shouye" },
    { title: "时下流行", link: "/popular-now/all", icon: "icon-huo" },
    { title: "订阅内容", link: "/subscription", icon: "icon-subscribe" },
    { title: "媒体库", link: "/mediaLibrary", icon: "icon-shipinbofang" },
    { title: "历史记录", link: "/history", icon: "icon-lishijilu" }
]

export const sideDrawerList: Array<Array<ISideNav>> = [
    [
        { title: "首页", link: "/", icon: "icon-shouye" },
        { title: "时下流行", link: "/popular-now/all", icon: "icon-huo" },
        { title: "订阅内容", link: "/subscription", icon: "icon-subscribe" },
    ],
    [
        { title: "媒体库", link: "/mediaLibrary", icon: "icon-shipinbofang" },
        { title: "历史记录", link: "/history", icon: "icon-lishijilu" }
    ]
]

export const popularNowTopMenuList: Array<IPopularNowTopMenu> = [
    { title: "中国", link: "China", icon: "#icon-guoqi", areas: ["内地", "港台"] },
    { title: "日本", link: "Japan", icon: "#icon-ribenguoqi", areas: ["日本"] },
    { title: "韩国", link: "Korea", icon: "#icon-zu", areas: ["韩国"] },
    { title: "欧美", link: "Occident", icon: "#icon-meiguo", areas: ["欧美"] },
]