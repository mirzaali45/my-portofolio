"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  rootId?: string;
}

/**
 * A Portal component that renders children into a DOM node that exists outside
 * the DOM hierarchy of the parent component.
 * This is useful for modals, dropdowns, and other components that need to break out
 * of their container's stacking context.
 */
const Portal = ({ children, rootId = "portal-root" }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Make sure we're in the browser environment
    setMounted(true);

    // Create portal root if it doesn't exist
    let portalRoot = document.getElementById(rootId);
    if (!portalRoot) {
      portalRoot = document.createElement("div");
      portalRoot.id = rootId;
      document.body.appendChild(portalRoot);
    }

    return () => {
      // Clean up the portal root if it's empty
      portalRoot = document.getElementById(rootId);
      if (portalRoot && portalRoot.childNodes.length === 0) {
        document.body.removeChild(portalRoot);
      }
    };
  }, [rootId]);

  return mounted && typeof document !== "undefined"
    ? createPortal(children, document.getElementById(rootId) || document.body)
    : null;
};

export default Portal;