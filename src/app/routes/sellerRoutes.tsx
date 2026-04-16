import type { RouteGroup } from "@/app/types"

const sellerRoutes: RouteGroup[] = [
    {
        title: "Seller Dashboard",
        url: "/seller-dashboard",
        items: [
            {
                title: "Seller Dashboard ",
                url: "/seller-dashboard",
            },
            {
                title: "Manage Medicine",
                url: "/medicine",
                items: [
                    {
                        title: "Medicine Category",
                        url: "/categories",
                    },
                    {
                        title: "All Medicine",
                        url: "/all-medicine",
                    },
                    {
                        title: "Add Medicine",
                        url: "/add-medicine",
                    },
                    {
                        title: "Edit Medicine",
                        url: "/edit-medicine",
                    },
                ],
            },
            {
                title: "Manage Orders",
                url: "/orders",
            },
            {
                title: "My Profile",
                url: "/seller-profile",
            },
            {
                title: "Logout",
                url: "/logout",
            },
        ],
    },
]

export default sellerRoutes
