import { ISideNav } from "@/types/LocalData";

export const sideNavList: Array<ISideNav> = [
    { title: "首页", link: "/", icon: "icon-shouye" },
    { title: "时下流行", link: "/popular-now", icon: "icon-huo" },
    { title: "订阅内容", link: "/subscription", icon: "icon-subscribe" },
    { title: "媒体库", link: "/mediaLibrary", icon: "icon-shipinbofang" },
    { title: "历史记录", link: "/history", icon: "icon-lishijilu" }
]

export const sideDrawerList: Array<Array<ISideNav>> = [
    [
        { title: "首页", link: "/", icon: "icon-shouye" },
        { title: "时下流行", link: "/popular-now", icon: "icon-huo" },
        { title: "订阅内容", link: "/subscription", icon: "icon-subscribe" },
    ],
    [
        { title: "媒体库", link: "/mediaLibrary", icon: "icon-shipinbofang" },
        { title: "历史记录", link: "/history", icon: "icon-lishijilu" }
    ]
]