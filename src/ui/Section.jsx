export default function Section({ id, children, fullWidth = false }) {
  return (
    <section id={id} className="py-16 md:py-24">
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-6xl mx-auto px-6">
          {children}
        </div>
      )}
    </section>
  );
}
