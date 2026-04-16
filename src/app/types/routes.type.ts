/**
 * Shared types for dashboard route configuration.
 *
 * The route files (`adminRoutes`, `sellerRoutes`, `customerRoutes`) and the
 * `AppSidebar` component both rely on this shape. A single `RouteItem` can
 * represent any level of the tree — top-level group, child item, or
 * nested grandchild — because each level carries the same `{ title, url, items? }`
 * shape in the existing route data.
 */

/** Roles recognized by the dashboard sidebar. */
export type RoleName = "Admin" | "Seller" | "Customer"

/**
 * A single navigation node. `items` is optional — leaf nodes omit it,
 * branch nodes provide their children.
 *
 * Examples from the existing routes:
 *   { title: "Logout", url: "/logout" }                                // leaf
 *   { title: "Manage Medicine", url: "/medicine", items: [ ... ] }     // branch
 */
export type RouteItem = {
  title: string
  url: string
  items?: RouteItem[]
}

/**
 * Alias for the top-level entries in a routes file. Semantically these are
 * "dashboard groups" (rendered as `<SidebarGroup>` in `AppSidebar`), but
 * they reuse the same shape as any other `RouteItem`.
 */
export type RouteGroup = RouteItem
