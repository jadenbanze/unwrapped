import Image from 'next/image'

export default function Slide8() {
  const topArtists = [
    { name: "Artist 1", image: "/placeholder.svg" },
    { name: "Artist 2", image: "/placeholder.svg" },
    { name: "Artist 3", image: "/placeholder.svg" },
    { name: "Artist 4", image: "/placeholder.svg" },
    { name: "Artist 5", image: "/placeholder.svg" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">You had room for a few more though:</h2>
      <div className="grid grid-cols-2 gap-4">
        {topArtists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={artist.image}
              alt={artist.name}
              width={80}
              height={80}
              className="rounded-full mb-2"
            />
            <p className="text-sm font-bold">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

