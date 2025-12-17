export default function AddProductPage() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
  
        <div className="bg-white p-6 rounded shadow max-w-lg">
          <input
            placeholder="Product Name"
            className="w-full p-2 border rounded mb-3"
          />
  
          <input
            placeholder="Price"
            className="w-full p-2 border rounded mb-3"
          />
  
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Product
          </button>
        </div>
      </div>
    );
  }
  