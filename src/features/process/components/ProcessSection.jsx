import ProcessCard from './ProcessCard';
import { useCopy } from '../../../i18n/context';

/**
 * Cards pin and stack as you scroll, the same mechanism the old Studies
 * section used: plain `position: sticky` per item with an increasing
 * z-index. No scroll hijacking and no global side effects.
 */
export default function ProcessSection() {
  const copy = useCopy();
  const total = copy.process.steps.length;

  return (
    <div className="relative">
      {copy.process.steps.map((step, index) => (
        <div
          key={step.title}
          className="sticky top-28"
          style={{ zIndex: index + 1 }}
        >
          <div className="pb-6">
            <ProcessCard step={step} index={index} total={total} />
          </div>
        </div>
      ))}

      {/* Room for the last card to release before the next section. */}
      <div className="h-[18vh]" aria-hidden="true" />
    </div>
  );
}
