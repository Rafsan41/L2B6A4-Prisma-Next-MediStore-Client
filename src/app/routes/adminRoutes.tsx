import type { RouteGroup } from "@/app/types"

const adminRoutes: RouteGroup[] = [
    {
        title: "Admin Dashboard",
        url: "/dashboard",
        items: [
            {
                title: "Admin Dashboard ",
                url: "/admin-dashboard",
            },
            {
                title: "Manage Medicine",
                url: "/medicine",
                items: [
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
                title: "Manage Seller",
                url: "/seller",
                items: [
                    {
                        title: "Add Seller",
                        url: "/add-seller",
                    },
                    {
                        title: "Edit Seller",
                        url: "/edit-seller",
                    },
                ],
            },
            {
                title: "My Profile",
                url: "/admin-profile",
            },
            {
                title: "Logout",
                url: "/logout",
            },
        ],
    },
]

export default adminRoutes
