"use client"

import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "medistore_recently_viewed_categories"
const MAX_ITEMS = 6

/**
 * Persists recently viewed category slugs in localStorage.
 *
 * - `viewed`: ordered list of slugs (newest first), max 6
 * - `addViewed(slug)`: pushes a slug to the front, deduplicates
 */
export function useRecentlyViewed() {
  const [viewed, setViewed] = useState<string[]>([])

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        if (Array.isArray(parsed)) {
          setViewed(parsed.slice(0, MAX_ITEMS))
        }
      }
    } catch {
      // localStorage unavailable or corrupted — start fresh
    }
  }, [])

  const addViewed = useCallback((slug: string) => {
    setViewed((prev) => {
      // Move to front, deduplicate, cap at MAX_ITEMS
      const next = [slug, ...prev.filter((s) => s !== slug)].slice(
        0,
        MAX_ITEMS
      )
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // quota exceeded or private browsing — silently skip
      }
      return next
    })
  }, [])

  return { viewed, addViewed }
}
