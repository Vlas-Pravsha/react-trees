export default function HomePage() {
  const object = [
    {
      title: "Cat-1",
      id: crypto.randomUUID(),
      children: [],
    },
    {
      title: "Cat-2",
      id: crypto.randomUUID(),
      children: [],
    },
  ];

  function renderTrees(a, b) {
    return a + b;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div>
        <h1>Next.js + Tailwind</h1>
      </div>
    </main>
  );
}
