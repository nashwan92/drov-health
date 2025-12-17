export default function NewsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">News</h1>

      <div className="bg-white p-4 rounded shadow mb-3">
        <h2 className="font-semibold">New product launched</h2>
        <p className="text-gray-600 text-sm">2025-01-12</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold">Discount campaign</h2>
        <p className="text-gray-600 text-sm">2025-01-10</p>
      </div>
    </div>
  );
}

