import image1 from '../../images/gas12.5k.png';
import image2 from '../../images/cy-2.5.png';
import image3 from '../../images/gas5k-3.png';

const ProductCard = ({ image, price, type, desc }) => (
  <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
    <div
      className="h-100  bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      {!image && <span className="text-gray-500">No Image</span>}
    </div>
    <p className="text-xl font-semibold text-gray-800">{price}</p>
    <p className="text-gray-600 text-2xl">{type}</p>
    <p className="text-gray-500 text-2xl">{desc}</p>
    <button className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full transition duration-300 hover:bg-blue-600">
      Buy Now
    </button>
  </div>
);

const products = [
  { image: image1, price: "Rs.3690", type: "12.5kg", desc: "LITEROGAS" },
  { image: image3, price: "rs.1482", type: "5kg", desc: "LITEROGAS" },
  { image: image2, price: "rs.694", type: "2.3kg", desc: "LITEROGAS" },

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
  );
}
