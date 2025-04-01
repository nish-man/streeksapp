"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ActivityCalendarProps {
  activityType: string
}

export function ActivityCalendar({ activityType }: ActivityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Generate mock data for the calendar
  const generateMockData = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const data: { day: number; status: "completed" | "missed" | "none" }[] = []

    for (let i = 1; i <= daysInMonth; i++) {
      // Generate random status with bias towards completion (70% chance)
      const rand = Math.random()
      let status: "completed" | "missed" | "none"

      if (rand < 0.7) {
        status = "completed"
      } else if (rand < 0.9) {
        status = "missed"
      } else {
        status = "none"
      }

      data.push({ day: i, status })
    }

    return data
  }

  const calendarData = generateMockData()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  // Create an array of empty cells for days before the first day of the month
  const emptyCells = Array(firstDayOfMonth).fill(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 dark:bg-green-600"
      case "missed":
        return "bg-red-500 dark:bg-red-600"
      default:
        return "bg-gray-200 dark:bg-gray-700"
    }
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-medium">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-xs font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {emptyCells.map((_, index) => (
              <div key={`empty-${index}`} className="h-10"></div>
            ))}

            {calendarData.map((day) => (
              <div key={day.day} className="relative h-10 flex items-center justify-center">
                <div className="absolute inset-1 flex items-center justify-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      day.status !== "none" ? getStatusColor(day.status) : "bg-transparent"
                    }`}
                  >
                    <span className={`text-sm ${day.status !== "none" ? "text-white" : "text-foreground"}`}>
                      {day.day}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-xs">Completed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-xs">Missed</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700 mr-2"></div>
              <span className="text-xs">Not Scheduled</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          <div className="space-y-2">
            {calendarData
              .filter((day) => day.status !== "none")
              .map((day) => (
                <Card key={day.day} className="p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(day.status)} mr-3`}></div>
                    <span>
                      {monthNames[currentMonth]} {day.day}, {currentYear}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      day.status === "completed"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {day.status === "completed" ? "Completed" : "Missed"}
                  </span>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <h3 className="text-lg font-medium mb-2">Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Completion Rate</div>
            <div className="text-2xl font-bold mt-1">
              {Math.round((calendarData.filter((d) => d.status === "completed").length / calendarData.length) * 100)}%
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Longest Streak</div>
            <div className="text-2xl font-bold mt-1">
              {activityType === "running"
                ? "12"
                : activityType === "gym"
                  ? "8"
                  : activityType === "yoga"
                    ? "15"
                    : activityType === "swimming"
                      ? "6"
                      : "10"}{" "}
              days
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

