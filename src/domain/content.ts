export type ContentStatus = "seeded" | "curating" | "published";

export type ContentSlotKind =
  | "artifact"
  | "document"
  | "link"
  | "media"
  | "tool"
  | "writing";

export interface ResourceReference {
  id: string;
  label: string;
  kind: Extract<ContentSlotKind, "document" | "link" | "tool" | "writing">;
  href: string;
  description?: string;
  external?: boolean;
}

export interface ContentSlot {
  id: string;
  kind: ContentSlotKind;
  status: "available" | "curation-needed" | "planned";
  label: string;
}

export interface WorldContentDefinition {
  nodeId: string;
  status: ContentStatus;
  resources: readonly ResourceReference[];
  slots: readonly ContentSlot[];
}
