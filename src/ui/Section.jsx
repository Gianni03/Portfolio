export default function Section({ title, id, children, fullWidth = false }) {
  const content = (
    <>
      {title && <h2 className="mb-12">{title}</h2>}
      {children}
    </>
  );

  return (
    <section id={id} className="py-16 md:py-24">
      {fullWidth ? (
        content
      ) : (
        <div className="container mx-auto px-4">{content}</div>
      )}
    </section>
  );
}
