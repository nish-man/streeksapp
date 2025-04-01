"use client"

import { useState } from "react"
import { Info, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ActivityCalendar } from "@/components/activity-calendar"

interface ActivityType {
  id: string
  name: string
  type: string
  streak: number
  completionRate: number
  color: string
}

export function Analytics() {
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const activityTypes: ActivityType[] = [
    {
      id: "1",
      name: "Running",
      type: "running",
      streak: 12,
      completionRate: 85,
      color: "bg-blue-500",
    },
    {
      id: "2",
      name: "Gym",
      type: "gym",
      streak: 8,
      completionRate: 72,
      color: "bg-purple-500",
    },
    {
      id: "3",
      name: "Yoga",
      type: "yoga",
      streak: 15,
      completionRate: 90,
      color: "bg-indigo-500",
    },
    {
      id: "4",
      name: "Swimming",
      type: "swimming",
      streak: 6,
      completionRate: 65,
      color: "bg-cyan-500",
    },
  ]

  const handleActivityClick = (activity: ActivityType) => {
    setSelectedActivity(activity)
    setCalendarOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-dark">Analytics</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click on an activity to view detailed history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {activityTypes.map((activity) => (
          <Card
            key={activity.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleActivityClick(activity)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${activity.color}`} />
                  <h3 className="font-medium">{activity.name}</h3>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{activity.streak}</div>
                <div className="text-xs text-muted-foreground">day streak</div>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{activity.completionRate}% completion rate</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedActivity?.name} Activity History</DialogTitle>
            <DialogDescription>
              View your completion history for {selectedActivity?.name.toLowerCase()} activities
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <ActivityCalendar activityType={selectedActivity?.type || ""} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

