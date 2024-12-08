import Image from "next/image";
export default function CeramicsSection() {
  const items = [
    {
      title: "The Dandy Chair",
      price: "£250",
      image: "/images/dandychair.png",
    },
    {
      title: "Rustic Vase Set",
      price: "£155",
      image: "/images/rusticvaseset.png",
    },
    {
      title: "The Silky Vase",
      price: "£125",
      image: "/images/thesilkyvase.png",
    },
    {
      title: "The Lucy Lamp",
      price: "£399",
      image: "/images/thelucylamp.png",
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2A254B] mb-8">
        New ceramics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-4"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={305}
              height={375}
              className="object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold text-[#2A254B]">
              {item.title}
            </h3>
            <p className="text-[#2A254B]">{item.price}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button className="mt-4 mb-4 ml-8 mr-8 gap-3 text-[#2A254B] bg-[#F9F9F9] hover:bg-[#F9F9F9]">
          View collection
        </button>
      </div>
    </section>
  );
}
