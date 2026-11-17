import ScrollExpand from '../../../components/ScrollExpand';
import ContactContent from '../../contact/components/ContactContent';
import { useCopy } from '../../../i18n/context';

/**
 * Artwork for the closing band. One is picked at random per visit. Add or
 * remove files here and keep them dark and calm in the centre, because the
 * contact form sits on top with a heavy scrim.
 */
const SHOWREEL_MEDIA = [
  '/img/01.webp',
  '/img/02.webp',
  '/img/03.webp',
  '/img/04.webp',
  '/img/05.webp',
  '/img/06.webp',
];

// Picked once when the module loads, so it stays stable for the whole visit
// and never changes mid-scroll.
const PICKED_MEDIA =
  SHOWREEL_MEDIA[Math.floor(Math.random() * SHOWREEL_MEDIA.length)];

/**
 * Closing showreel. The frame grows from a small rounded card to the full
 * viewport, and only then does the contact section fade in over it.
 */
export default function ShowreelSection() {
  const copy = useCopy();

  return (
    <div id="showreel" className="relative left-1/2 w-screen -translate-x-1/2">
      <ScrollExpand
        src={PICKED_MEDIA}
        mediaType="image"
        alt=""
        title={copy.showreel.title}
        scrollHint={copy.showreel.hint}
        startWidth={40}
        startHeight={34}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.05}
        scrollDistance={0.55}
        holdDistance={0.5}
        smoothing={0.06}
        overlayScrim={0.72}
        useWindowScroll
      >
        <ContactContent />
      </ScrollExpand>
    </div>
  );
}
