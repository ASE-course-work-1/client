const outlets = [
    { name: "Colombo Central Outlet", district: "Colombo" },
    { name: "Kandy Premium Store", district: "Kandy" },
    { name: "Galle Gas Hub", district: "Galle" },
    { name: "Jaffna Supply Point", district: "Jaffna" },
    { name: "Anuradhapura Main Outlet", district: "Anuradhapura" },
    { name: "Kurunegala Gas Point", district: "Kurunegala" },
    { name: "Gampaha Express Outlet", district: "Gampaha" },
    { name: "Nuwara Eliya Fuel Hub", district: "Nuwara Eliya" },
  ];
  
export default function OutletSection() {
  return (
    <div className="pl-50 pr-50 pt-12 bg-gray-100 rounded-lg shadow-md">
 <div className="flex justify-center p-10">
    <h2 className="text-3xl text-c font-bold text-gray-800">Our Outlets</h2>
  </div>
        

      <div className="overflow-x-auto pb-12">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 text-left">Outlet</th>
              <th className="p-3 text-left">District</th>
            </tr>
          </thead>
          <tbody>
            {outlets.map((outlet, index) => (
              <tr key={index} className="border-b hover:bg-gray-200 transition">
                <td className="p-3">{outlet.name}</td>
                <td className="p-3">{outlet.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
