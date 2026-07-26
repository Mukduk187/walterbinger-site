import { ArrowUpRight, BookOpen, FileText, Wrench } from "lucide-react";
import { getWorldContent } from "../data/worldContent";
import type { ResourceReference } from "../domain/content";
import type { CelestialNode } from "../domain/cosmology";

const iconByKind: Record<ResourceReference["kind"], typeof FileText> = {
  writing: BookOpen,
  tool: Wrench,
  document: FileText,
  link: ArrowUpRight,
};

export function WorldResources({ node }: { node: CelestialNode }) {
  const content = getWorldContent(node.id);

  if (!content?.resources.length) {
    return null;
  }

  return (
    <nav className="world-resources" aria-label={`${node.publicLabel} resources`}>
      {content.resources.map((resource) => {
        const Icon = iconByKind[resource.kind];
        return (
          <a
            key={resource.id}
            href={resource.href}
            target={resource.external ? "_blank" : undefined}
            rel={resource.external ? "noreferrer" : undefined}
            title={resource.description ?? resource.label}
          >
            <Icon aria-hidden="true" />
            <span>{resource.label}</span>
            {resource.external && <ArrowUpRight aria-hidden="true" />}
          </a>
        );
      })}
    </nav>
  );
}
