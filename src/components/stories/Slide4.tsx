export default function Slide4() {
    const songsPlayed = 2468
  
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">You played</h2>
        <p className="text-4xl font-bold text-primary mb-4">{songsPlayed.toLocaleString()} songs</p>
        <p className="text-lg">But one really stuck out...</p>
      </div>
    )
  }
  
  