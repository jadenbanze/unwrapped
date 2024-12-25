import Image from 'next/image'

export default function Slide6() {
  const topSongs = [
    { name: "Song 1", artist: "Artist 1", coverArt: "/placeholder.svg" },
    { name: "Song 2", artist: "Artist 2", coverArt: "/placeholder.svg" },
    { name: "Song 3", artist: "Artist 3", coverArt: "/placeholder.svg" },
    { name: "Song 4", artist: "Artist 4", coverArt: "/placeholder.svg" },
    { name: "Song 5", artist: "Artist 5", coverArt: "/placeholder.svg" },
  ]

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">But you also loved:</h2>
      <div className="grid grid-cols-2 gap-4">
        {topSongs.map((song, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={song.coverArt}
              alt={`${song.name} cover`}
              width={80}
              height={80}
              className="rounded-lg mb-2"
            />
            <p className="text-sm font-bold">{song.name}</p>
            <p className="text-xs">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

