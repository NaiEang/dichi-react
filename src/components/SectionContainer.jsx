function Section({ title, children }) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}