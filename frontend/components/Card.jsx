import Image from "next/image";

export default function DestinationCard({ destination }) {
  return (
    <div className="bg-black/90 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden transition-all duration-300 h-full flex flex-col card-hover">
      <div className="relative aspect-video w-full">
        {destination.image && destination.image.trim() !== "" ? (
          <Image
            src={destination.image}
            alt={destination.name}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-blue-400 text-blue-900 px-2 py-1 rounded-full text-sm font-bold flex items-center">
          {destination.currentPeople}/{destination.maxPeople} people
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 text-white line-clamp-2">
          {destination.name}
        </h2>
        <p className="text-white mb-2">
          Location: {destination.location || "Unknown"}
        </p>
        <p className="text-white mb-4 flex-grow line-clamp-3">
          {destination.description || "No description available"}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {destination.transport}
            </span>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {destination.budget}
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
              {destination.ageGroup}
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            ₹{destination.price}
          </div>
        </div>
      </div>
    </div>
  );
}
