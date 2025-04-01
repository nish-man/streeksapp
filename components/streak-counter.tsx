import { cn } from "@/lib/utils"
import { Trophy } from "lucide-react"

interface StreakCounterProps {
  streak: number
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="flex items-center mt-1 relative">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn("h-2 w-6 rounded-sm transition-all", i < streak % 5 ? "bg-primary" : "bg-muted")}
          />
        ))}
      </div>
      <div className="flex items-center ml-2 text-sm font-medium">
        <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
        <span>{streak} day streak</span>
      </div>
    </div>
  )
}

