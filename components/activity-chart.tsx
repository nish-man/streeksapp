"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityChartProps {
  filter: "weekly" | "monthly" | "yearly"
  activityType?: string
}

export function ActivityChart({ filter, activityType = "all" }: ActivityChartProps) {
  // Sample data with activity types
  const weeklyData = [
    { name: "Mon", running: 2, gym: 0, yoga: 0, cycling: 0, total: 2 },
    { name: "Tue", running: 0, gym: 1, yoga: 0, cycling: 0, total: 1 },
    { name: "Wed", running: 1, gym: 1, yoga: 1, cycling: 0, total: 3 },
    { name: "Thu", running: 0, gym: 0, yoga: 0, cycling: 0, total: 0 },
    { name: "Fri", running: 1, gym: 1, yoga: 0, cycling: 0, total: 2 },
    { name: "Sat", running: 0, gym: 0, yoga: 1, cycling: 0, total: 1 },
    { name: "Sun", running: 0, gym: 0, yoga: 0, cycling: 0, total: 0 },
  ]

  const monthlyData = [
    { name: "Week 1", running: 3, gym: 2, yoga: 3, cycling: 0, total: 8 },
    { name: "Week 2", running: 4, gym: 3, yoga: 2, cycling: 1, total: 10 },
    { name: "Week 3", running: 2, gym: 3, yoga: 1, cycling: 1, total: 7 },
    { name: "Week 4", running: 4, gym: 5, yoga: 2, cycling: 1, total: 12 },
  ]

  const yearlyData = [
    { name: "Jan", running: 12, gym: 10, yoga: 8, cycling: 0, total: 30 },
    { name: "Feb", running: 10, gym: 12, yoga: 6, cycling: 0, total: 28 },
    { name: "Mar", running: 15, gym: 13, yoga: 7, cycling: 0, total: 35 },
    { name: "Apr", running: 14, gym: 11, yoga: 6, cycling: 1, total: 32 },
    { name: "May", running: 18, gym: 15, yoga: 5, cycling: 2, total: 40 },
    { name: "Jun", running: 16, gym: 14, yoga: 6, cycling: 2, total: 38 },
    { name: "Jul", running: 18, gym: 15, yoga: 7, cycling: 2, total: 42 },
    { name: "Aug", running: 14, gym: 13, yoga: 6, cycling: 2, total: 35 },
    { name: "Sep", running: 12, gym: 11, yoga: 5, cycling: 2, total: 30 },
    { name: "Oct", running: 10, gym: 9, yoga: 4, cycling: 2, total: 25 },
    { name: "Nov", running: 13, gym: 12, yoga: 5, cycling: 2, total: 32 },
    { name: "Dec", running: 11, gym: 10, yoga: 5, cycling: 2, total: 28 },
  ]

  const data = filter === "weekly" ? weeklyData : filter === "monthly" ? monthlyData : yearlyData

  // Determine which activities to show based on the filter
  const getVisibleActivities = () => {
    if (activityType === "all") {
      return ["running", "gym", "yoga", "cycling"]
    }
    return [activityType]
  }

  const activityColors = {
    running: "#3b82f6", // blue-500
    gym: "#22c55e", // green-500
    yoga: "#a855f7", // purple-500
    cycling: "#f59e0b", // amber-500
    total: "hsl(var(--primary))",
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Activity Streaks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              {activityType === "all" ? (
                <>
                  <Bar
                    dataKey="running"
                    name="Running"
                    fill={activityColors.running}
                    radius={[4, 4, 0, 0]}
                    stackId="a"
                  />
                  <Bar dataKey="gym" name="Gym" fill={activityColors.gym} radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="yoga" name="Yoga" fill={activityColors.yoga} radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar
                    dataKey="cycling"
                    name="Cycling"
                    fill={activityColors.cycling}
                    radius={[4, 4, 0, 0]}
                    stackId="a"
                  />
                </>
              ) : (
                <Bar
                  dataKey={activityType}
                  name={activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                  fill={activityColors[activityType as keyof typeof activityColors]}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

