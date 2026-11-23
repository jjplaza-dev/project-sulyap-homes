import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info } from 'lucide-react';
import { cx } from '@/lib/cx';

interface StateProps {
  title: string;
  body?: string;
  action?: ReactNode;
  className?: string;
}

/** Nothing to show yet (no results, no favorites). */
export function EmptyState({
  icon,
  title,
  body,
  action,
  className,
}: StateProps & { icon?: ReactNode }) {
  return (
    <div
      className={cx(
        'flex flex-col items-center rounded-lg border border-dashed border-moss-deep/60 bg-surface px-6 py-14 text-center',
        className,
      )}
    >
      {icon ? <div className="mb-4 text-highland-moss">{icon}</div> : null}
      <h2 className="text-2xl">{title}</h2>
      {body ? <p className="reading-width mt-3 text-pine-ink">{body}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

/** Something went wrong. Announced to assistive technology. */
export function ErrorState({ title, body, action, className }: StateProps) {
  return (
    <div
      role="alert"
      className={cx('flex gap-4 rounded-lg border border-danger/40 bg-surface p-5', className)}
    >
      <CircleAlert className="mt-0.5 size-6 shrink-0 text-danger" aria-hidden="true" />
      <div>
        <p className="font-semibold text-pine-evergreen">{title}</p>
        {body ? <p className="mt-1 text-pine-ink">{body}</p> : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}

/** Something worked. Announced politely to assistive technology. */
export function SuccessState({ title, body, action, className }: StateProps) {
  return (
    <div
      role="status"
      className={cx('flex gap-4 rounded-lg border border-success/40 bg-surface p-5', className)}
    >
      <CircleCheck className="mt-0.5 size-6 shrink-0 text-success" aria-hidden="true" />
      <div>
        <p className="font-semibold text-pine-evergreen">{title}</p>
        {body ? <p className="mt-1 text-pine-ink">{body}</p> : null}
        {action ? <div className="mt-4">{action}</div> : null}
      </div>
    </div>
  );
}

/** Marks content that is a design preview rather than real behavior. */
export function PreviewNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        'flex gap-2 rounded-md border border-dashed border-petal-berry/60 bg-surface px-3 py-2 text-sm text-berry-deep',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
