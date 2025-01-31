

const ProductCard = ({ image, price, type, desc }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <div
        className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {!image && <span className="text-gray-500">No Image</span>}
      </div>
      <p className="text-lg font-semibold text-gray-800">{price}</p>
      <p className="text-gray-600">{type}</p>
      <p className="text-gray-500 text-sm">{desc}</p>
      <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-600">
        Buy Now
      </button>
    </div>
  );

  const products = [
    { image: "", price: "$49", type: "Premium", desc: "Best quality gas for home use." },
    { image: "", price: "$39", type: "Standard", desc: "Reliable and affordable option." },
    { image: "", price: "$29", type: "Budget", desc: "Economical gas for everyday use." },
    { image: "", price: "$59", type: "Ultra Premium", desc: "High-performance fuel solution." },
    { image: "", price: "$45", type: "Eco-Friendly", desc: "Sustainable and efficient gas." },
    { image: "", price: "$35", type: "Basic", desc: "Great for small-scale usage." },
  ];
export default function ProductSection() {

    
  return (
    <div className="p-20 m-10 bg-gray-100">
    <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Our Pricing</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  </div>
  )
}
