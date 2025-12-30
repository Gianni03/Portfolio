export default function Section({ id, children, fullWidth = false }) {
  if (fullWidth) {
    return (
      <section id={id} className="py-16 md:py-24">
        {children}
      </section>
    );
  }

  return (
    <section id={id} className="py-16 md:py-24 ">
      <div className="container mx-auto px-4">{children}</div>
    </section>
  );
}
