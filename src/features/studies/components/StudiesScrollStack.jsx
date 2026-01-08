import StudiesCard from './StudiesCard';

export default function StudiesScrollStack({ items }) {
  return (
    <section className="relative min-h-screen py-32">
      <div className="sticky top-[10%] h-[80vh]">
        <div className="relative h-full">
          {items.map((item, i) => (
            <div
              key={item.id || i}
              className="
                absolute inset-0
                flex items-center justify-center
                transition-transform
              "
              style={{
                transform: `
                  translateY(${i * 12}px)
                  rotate(${i * 0.5}deg)
                `,
                zIndex: items.length - i,
              }}
            >
              <StudiesCard study={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
