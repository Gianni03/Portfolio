import CurvedLoop from '@/components/CurvedLoop';

export default function CurvedSectionTitle({
  text,
  repeat = 4,
  curve = 400,
  speed = 1.5,
  className = '',
  direction = 'left',
}) {
  const marqueeText = Array(repeat).fill(text).join(' · ');

  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
      <div className="relative w-full overflow-hidden py-12">
        <CurvedLoop
          marqueeText={marqueeText}
          curveAmount={curve}
          speed={speed}
          interactive={false}
          direction={direction}
          className={className}
        />
      </div>
    </div>
  );
}
