export interface ILinkItem {
    readonly title: string;
    readonly link: string;
}

export interface ISideNav extends ILinkItem {
    readonly icon: string
}