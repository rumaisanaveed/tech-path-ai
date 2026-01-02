import React, { useMemo } from "react";
import { createEditor, htmlFromJSON } from "prosekit/core";
import { defineExtension } from "./extension";
import "prosekit/basic/style.css";
import "prosekit/basic/typography.css";
import { sanitizeHTML } from "@/utils/helpers";

export default function ProseKitRenderer({ contentString, className = "" }) {
  const editor = useMemo(
    () => createEditor({ extension: defineExtension() }),
    []
  );

  // Check if contentString is HTML or JSON
  const isHTML = contentString.trim().startsWith("<");

  let cleanHtml;

  if (isHTML) {
    // Content is already HTML from API
    cleanHtml = sanitizeHTML(contentString);
  } else {
    // Content is JSON format (legacy or other sources)
    try {
      const parsed = JSON.parse(contentString);
      const rawHtml = htmlFromJSON(parsed, editor);
      cleanHtml = sanitizeHTML(rawHtml);
    } catch (error) {
      console.error("Error parsing content:", error);
      cleanHtml = "<p>Error loading content</p>";
    }
  }

  return (
    <div
      className={`prose prose-neutral max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}