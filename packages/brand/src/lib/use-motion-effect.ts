"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Reveals hide their target before the first paint, which has to happen in a
 * layout effect. There is no paint on the server, so fall back to `useEffect`
 * there and keep React from warning.
 *
 * Kept out of `motion.ts` so that module stays importable from Server
 * Components — it also exports plain values like `EASE`.
 */
export const useMotionEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
