import ScrollExpand from '../../../components/ScrollExpand';
import ContactContent from '../../contact/components/ContactContent';
import { useCopy } from '../../../i18n/context';

const SHOWREEL_MEDIA = '/img/obsidian.webp';

/**
 * Closing showreel. The frame grows from a rounded card to the full viewport
 * and the contact section fades in over it.
 */
export default function ShowreelSection() {
  const copy = useCopy();

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      <ScrollExpand
        src={SHOWREEL_MEDIA}
        mediaType="image"
        alt=""
        title={copy.showreel.title}
        scrollHint={copy.showreel.hint}
        startWidth={60}
        startHeight={84}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.16}
        scrollDistance={0.55}
        holdDistance={0.15}
        smoothing={0.12}
        overlayScrim={0.72}
        useWindowScroll
      >
        <ContactContent />
      </ScrollExpand>
    </div>
  );
}
