/**
 * Joins truthy class names. Deliberately has NO Tailwind conflict-merging:
 * Sulyap components never pass conflicting utilities, so behavior is
 * deterministic and independent of the shadcn `cn` helper.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
