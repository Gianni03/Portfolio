export default function Section({ title, id, children }) {
  return (
    <section id={id} className="mb-20 px-6 max-w-6xl mx-auto">
      {title && (
        <h2 className="mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
