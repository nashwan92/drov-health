export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-3">Vitamin D</td>
            <td className="p-3">$12</td>
            <td className="p-3 text-green-600">Active</td>
          </tr>

          <tr>
            <td className="p-3">Omega 3</td>
            <td className="p-3">$20</td>
            <td className="p-3 text-green-600">Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
