export default function Section({ title, id, children }) {
  return (
    <section className="mb-20" id={id}>
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      {children}
    </section>
  );
}
