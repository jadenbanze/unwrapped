import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Slide1({ session }: { session: any }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
        <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold mb-4">
        Hello {session?.user?.name || "there"}!
      </h2>
      <p className="text-lg">Let's unwrap your music in 2024...</p>
    </div>
  )
}

