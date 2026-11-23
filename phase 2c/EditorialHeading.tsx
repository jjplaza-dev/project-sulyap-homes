import type { EditorialBlock } from '@/domain';
import { cx } from '@/lib/cx';
import { ButtonLink } from './ButtonLink';

interface EditorialHeadingProps {
  block: EditorialBlock;
  /** Heading level. Exactly one level 1 per page. */
  level?: 1 | 2 | 3;
  /** `onPine` for Pine Evergreen surfaces. */
  tone?: 'default' | 'onPine';
  /** Id for `aria-labelledby` on the surrounding section. */
  headingId?: string;
  /** Overrides the size implied by the level (the homepage hero uses `xl`). */
  size?: 'xl' | 'lg' | 'md';
  className?: string;
}

const sizes = {
  1: 'text-display-lg',
  2: 'text-display-md',
  3: 'text-2xl',
} as const;

const displaySizes = {
  xl: 'text-display-xl',
  lg: 'text-display-lg',
  md: 'text-display-md',
} as const;

/** Eyebrow, heading and body paragraphs for one `EditorialBlock`. */
export function EditorialHeading({
  block,
  level = 2,
  tone = 'default',
  headingId,
  size,
  className,
}: EditorialHeadingProps) {
  const Heading = `h${level}` as 'h1' | 'h2' | 'h3';
  const onPine = tone === 'onPine';

  return (
    <div className={className}>
      {block.eyebrow ? (
        <p className={cx('text-eyebrow mb-4', onPine ? 'text-panagbenga-sunflower' : 'text-berry-deep')}>
          {block.eyebrow}
        </p>
      ) : null}
      <Heading id={headingId} className={size ? displaySizes[size] : sizes[level]}>
        {block.heading}
      </Heading>
      {block.body.map((paragraph) => (
        <p
          key={paragraph}
          className={cx('reading-width mt-5 text-lg', onPine ? 'text-cloud-mist/85' : 'text-pine-ink')}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** Primary and secondary calls to action for a block, if it has any. */
export function EditorialActions({
  block,
  tone = 'default',
  className,
}: {
  block: EditorialBlock;
  tone?: 'default' | 'onPine';
  className?: string;
}) {
  const { primaryAction, secondaryAction } = block;
  if (!primaryAction && !secondaryAction) return null;

  return (
    <div className={cx('flex flex-wrap items-center gap-3', className)}>
      {primaryAction ? (
        <ButtonLink href={primaryAction.href} size="lg" tone={tone}>
          {primaryAction.label}
        </ButtonLink>
      ) : null}
      {secondaryAction ? (
        <ButtonLink href={secondaryAction.href} size="lg" variant="outline" tone={tone}>
          {secondaryAction.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
