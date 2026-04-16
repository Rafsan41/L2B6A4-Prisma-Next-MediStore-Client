import type { RouteGroup } from "@/app/types"

const customerRoutes: RouteGroup[] = [
    {
        title: "Customer Dashboard",
        url: "/dashboard",
        items: [
            {
                title: "Overview ",
                url: "/dashboard",
            },
            {
                title: "My Orders",
                url: "/my-orders",
            },
            {
                title: "My Prescriptions",
                url: "/my-prescriptions",
            },
            {
                title: "My Profile",
                url: "/my-profile",
            },
            {
                title: "Logout",
                url: "/logout",
            },
        ],
    },
]

export default customerRoutes
