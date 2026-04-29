export const ROUTES = {
    products: "/",
    orders: "/orders",
    user: "/user",
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

export type NavLinkItem = {
    name: string;
    path: AppRoute;
};