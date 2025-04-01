"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"
import { Plus, Camera, CheckCircle, AlertCircle, Clock, Undo2, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface Challenge {
  id: string
  name: string
  type: string
  frequency: string
  customFrequency?: {
    times: number
    period: string
  }
  streak: number
  targetStreak: number
  lastCompleted: Date | null
  points: number
}

export function Challenges() {
  const { toast } = useToast()
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      name: "Morning Run",
      type: "running",
      frequency: "daily",
      streak: 5,
      targetStreak: 30,
      lastCompleted: new Date(Date.now() - 86400000),
      points: 25,
    },
    {
      id: "2",
      name: "Gym Workout",
      type: "gym",
      frequency: "custom",
      customFrequency: {
        times: 3,
        period: "week",
      },
      streak: 3,
      targetStreak: 20,
      lastCompleted: new Date(),
      points: 15,
    },
    {
      id: "3",
      name: "Yoga Session",
      type: "yoga",
      frequency: "weekly",
      streak: 8,
      targetStreak: 12,
      lastCompleted: new Date(Date.now() - 86400000 * 2),
      points: 20,
    },
    {
      id: "4",
      name: "Swimming",
      type: "swimming",
      frequency: "custom",
      customFrequency: {
        times: 2,
        period: "week",
      },
      streak: 4,
      targetStreak: 15,
      lastCompleted: null,
      points: 30,
    },
  ])

  const [addActivityOpen, setAddActivityOpen] = useState(false)
  const [markDoneOpen, setMarkDoneOpen] = useState(false)
  const [undoDialogOpen, setUndoDialogOpen] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [today] = useState(new Date())
  const [currentDate, setCurrentDate] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const [newActivity, setNewActivity] = useState({
    type: "running",
    name: "",
    frequency: "daily",
    customFrequency: {
      times: 3,
      period: "week",
    },
    targetStreak: 30,
    proofRequired: true,
  })

  // Format date as "Monday, March 25, 2024"
  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    setCurrentDate(today.toLocaleDateString("en-US", options))
  }, [today])

  // Filter challenges to only show today's activities
  const todaysChallenges = challenges.filter((challenge) => {
    // For daily challenges, always show
    if (challenge.frequency === "daily") return true

    // For weekly challenges, show if today is the start of the week (Monday)
    if (challenge.frequency === "weekly" && today.getDay() === 1) return true

    // For custom frequency, we need more complex logic
    if (challenge.frequency === "custom" && challenge.customFrequency) {
      // This is simplified logic - in a real app, you'd need more sophisticated scheduling
      const { times, period } = challenge.customFrequency

      // For weekly custom frequency, distribute activities throughout the week
      if (period === "week") {
        // Simple distribution: if 3 times per week, show on Mon, Wed, Fri
        const dayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, etc.
        if (times === 1 && dayOfWeek === 1) return true // Once a week on Monday
        if (times === 2 && (dayOfWeek === 1 || dayOfWeek === 4)) return true // Twice a week on Monday and Thursday
        if (times === 3 && (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5)) return true // Three times a week on Monday, Wednesday, Friday
        if (times === 4 && (dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6)) return true // Four times a week
        if (times === 5 && dayOfWeek !== 0 && dayOfWeek !== 6) return true // Five times a week (weekdays)
        if (times === 6 && dayOfWeek !== 0) return true // Six times a week (all except Sunday)
        if (times === 7) return true // Every day
      }

      // For monthly custom frequency
      if (period === "month") {
        const dayOfMonth = today.getDate()
        // Distribute evenly throughout the month
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
        const interval = Math.floor(daysInMonth / times)

        // Check if today is one of the days to show the activity
        for (let i = 1; i <= times; i++) {
          const targetDay = Math.min(i * interval, daysInMonth)
          if (dayOfMonth === targetDay) return true
        }
      }
    }

    return false
  })

  const handleAddActivity = () => {
    // For "other" type, use the name provided, otherwise use the type as the name
    const activityName = newActivity.type === "other" ? newActivity.name : capitalizeFirstLetter(newActivity.type)

    const newChallenge: Challenge = {
      id: Date.now().toString(),
      name: activityName,
      type: newActivity.type,
      frequency: newActivity.frequency,
      customFrequency: newActivity.frequency === "custom" ? newActivity.customFrequency : undefined,
      streak: 0,
      targetStreak: newActivity.targetStreak,
      lastCompleted: null,
      points: Math.floor(Math.random() * 10) + 10, // Random points between 10-20
    }

    setChallenges([...challenges, newChallenge])
    setAddActivityOpen(false)
    setNewActivity({
      type: "running",
      name: "",
      frequency: "daily",
      customFrequency: {
        times: 3,
        period: "week",
      },
      targetStreak: 30,
      proofRequired: true,
    })

    toast({
      title: "Activity Added!",
      description: `${activityName} has been added to your challenges.`,
      variant: "default",
      duration: 3000,
    })
  }

  const handleMarkDone = (satisfied: boolean) => {
    if (!selectedChallenge) return

    // Check if already completed today
    if (selectedChallenge.lastCompleted) {
      const lastCompletedDate = new Date(selectedChallenge.lastCompleted)
      const isToday = lastCompletedDate.toDateString() === today.toDateString()

      if (isToday) {
        toast({
          title: "Already Completed",
          description: "You've already completed this challenge today!",
          variant: "destructive",
          duration: 3000,
        })
        setMarkDoneOpen(false)
        setSelectedChallenge(null)
        return
      }
    }

    if (satisfied) {
      setChallenges(
        challenges.map((challenge) =>
          challenge.id === selectedChallenge.id
            ? {
                ...challenge,
                streak: challenge.streak + 1,
                lastCompleted: new Date(),
              }
            : challenge,
        ),
      )
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      // Show completion notification with points
      toast({
        title: "Challenge Completed! 🎉",
        description: `You earned ${selectedChallenge.points} points for completing ${selectedChallenge.name}!`,
        variant: "default",
        duration: 5000,
      })

      // If reaching a milestone, show special notification
      if ((selectedChallenge.streak + 1) % 7 === 0) {
        setTimeout(() => {
          toast({
            title: "Milestone Reached! 🏆",
            description: `Incredible! You've maintained a ${selectedChallenge.streak + 1}-day streak for ${selectedChallenge.name}!`,
            variant: "default",
            duration: 5000,
          })
        }, 1000)
      }
    }

    setMarkDoneOpen(false)
    setSelectedChallenge(null)
  }

  const handleUndoCompletion = () => {
    if (!selectedChallenge) return

    setChallenges(
      challenges.map((challenge) =>
        challenge.id === selectedChallenge.id
          ? {
              ...challenge,
              streak: Math.max(0, challenge.streak - 1),
              lastCompleted: null,
            }
          : challenge,
      ),
    )

    toast({
      title: "Completion Undone",
      description: `The completion for ${selectedChallenge.name} has been reverted.`,
      variant: "default",
      duration: 3000,
    })

    setUndoDialogOpen(false)
    setSelectedChallenge(null)
  }

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-500"
      case "gym":
        return "bg-purple-500"
      case "yoga":
        return "bg-indigo-500"
      case "cycling":
        return "bg-amber-500"
      case "swimming":
        return "bg-cyan-500"
      case "hiking":
        return "bg-emerald-500"
      case "basketball":
        return "bg-orange-500"
      case "tennis":
        return "bg-yellow-500"
      case "football":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const isCompletedToday = (challenge: Challenge) => {
    if (!challenge.lastCompleted) return false
    const lastCompleted = new Date(challenge.lastCompleted)
    return lastCompleted.toDateString() === today.toDateString()
  }

  const getFrequencyText = (challenge: Challenge) => {
    if (challenge.frequency === "daily") return "Daily"
    if (challenge.frequency === "weekly") return "Weekly"
    if (challenge.frequency === "custom" && challenge.customFrequency) {
      return `${challenge.customFrequency.times}x per ${challenge.customFrequency.period}`
    }
    return challenge.frequency
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const activityTypes = [
    {
      value: "running",
      label: "Running",
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "gym",
      label: "Gym",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "yoga",
      label: "Yoga",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "cycling",
      label: "Cycling",
      image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "swimming",
      label: "Swimming",
      image: "https://images.unsplash.com/photo-1600965962102-9d64a4ed7b1d?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "hiking",
      label: "Hiking",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "basketball",
      label: "Basketball",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "tennis",
      label: "Tennis",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=1470&auto=format&fit=crop",
    },
    {
      value: "football",
      label: "Football",
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=1471&auto=format&fit=crop",
    },
    {
      value: "other",
      label: "Other",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
    },
  ]

  const getActivityImage = (type: string) => {
    const activity = activityTypes.find((a) => a.value === type)
    return activity ? activity.image : activityTypes[9].image // Default to "Other" image
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg shadow-sm">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-primary-dark">Your Challenges</h1>
          <p className="text-muted-foreground">{currentDate}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Select value={activeFilter} onValueChange={setActiveFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              {activityTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Dialog open={addActivityOpen} onOpenChange={setAddActivityOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-primary hover:bg-primary-dark">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>Create a new activity to track and build your streak.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Activity Type</Label>
                <Select
                  value={newActivity.type}
                  onValueChange={(value) => setNewActivity({ ...newActivity, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newActivity.type === "other" && (
                <div className="grid gap-2">
                  <Label htmlFor="name">Activity Name</Label>
                  <Input
                    id="name"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    placeholder="e.g., Pilates"
                  />
                </div>
              )}

              <div className="grid gap-2">
                <Label>Frequency</Label>
                <Select
                  value={newActivity.frequency}
                  onValueChange={(value) => setNewActivity({ ...newActivity, frequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newActivity.frequency === "custom" && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Times per period</Label>
                    <div className="flex items-center gap-2">
                      <Select
                        value={newActivity.customFrequency.times.toString()}
                        onValueChange={(value) =>
                          setNewActivity({
                            ...newActivity,
                            customFrequency: {
                              ...newActivity.customFrequency,
                              times: Number.parseInt(value),
                            },
                          })
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Times" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <span>times per</span>

                      <Select
                        value={newActivity.customFrequency.period}
                        onValueChange={(value) =>
                          setNewActivity({
                            ...newActivity,
                            customFrequency: {
                              ...newActivity.customFrequency,
                              period: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">Week</SelectItem>
                          <SelectItem value="month">Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="targetStreak">Target Streak (days)</Label>
                <Input
                  id="targetStreak"
                  type="number"
                  min={1}
                  max={365}
                  value={newActivity.targetStreak}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, targetStreak: Number.parseInt(e.target.value) || 30 })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddActivityOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddActivity}
                disabled={newActivity.type === "other" && !newActivity.name}
                className="bg-primary hover:bg-primary-dark"
              >
                Add Activity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {showSuccess && (
        <Alert className="bg-gradient-to-r from-green-50 to-teal-50 border-green-200 shadow-sm">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">Great job! Your streak has been updated.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {challenges
          .filter((challenge) => activeFilter === "all" || challenge.type === activeFilter)
          .map((challenge) => (
            <Card
              key={challenge.id}
              className={`border-l-4 ${
                isCompletedToday(challenge)
                  ? "border-l-green-500 bg-green-50/50 dark:bg-green-900/10"
                  : "border-l-primary"
              } transition-all hover:shadow-md overflow-hidden relative`}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                <img
                  src={getActivityImage(challenge.type) || "/placeholder.svg"}
                  alt={challenge.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-lg flex justify-between">
                  <span className="flex items-center">
                    {challenge.name}
                    {isCompletedToday(challenge) && (
                      <Badge variant="default" className="ml-2 bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Done
                      </Badge>
                    )}
                  </span>
                  <span className="text-sm text-muted-foreground">{getFrequencyText(challenge)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2 relative z-10">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${getActivityTypeColor(challenge.type)}`} />
                      <span className="capitalize">{challenge.type}</span>
                      <span className="ml-4 text-xs flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {challenge.lastCompleted
                          ? isCompletedToday(challenge)
                            ? "Today"
                            : new Date(challenge.lastCompleted).toLocaleDateString()
                          : "Not started"}
                      </span>
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={(challenge.streak / challenge.targetStreak) * 100} className="h-2" />
                      <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap">
                        <Target className="h-3 w-3 mr-1" />
                        {challenge.streak}/{challenge.targetStreak}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    {isCompletedToday(challenge) && (
                      <Dialog
                        open={undoDialogOpen && selectedChallenge?.id === challenge.id}
                        onOpenChange={(open) => {
                          setUndoDialogOpen(open)
                          if (!open) setSelectedChallenge(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedChallenge(challenge)}
                            className="h-8 w-8"
                          >
                            <Undo2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Undo Completion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to undo the completion of this activity? This will decrease your
                              streak by 1.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setUndoDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleUndoCompletion}>
                              Undo Completion
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}

                    <Dialog
                      open={markDoneOpen && selectedChallenge?.id === challenge.id}
                      onOpenChange={(open) => {
                        setMarkDoneOpen(open)
                        if (!open) setSelectedChallenge(null)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant={isCompletedToday(challenge) ? "outline" : "default"}
                          onClick={() => setSelectedChallenge(challenge)}
                          disabled={isCompletedToday(challenge)}
                          className={
                            isCompletedToday(challenge)
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                              : "bg-primary hover:bg-primary-dark"
                          }
                        >
                          {isCompletedToday(challenge) ? (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Done
                            </>
                          ) : (
                            "Mark as Done"
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Complete {challenge.name}</DialogTitle>
                          <DialogDescription>Upload proof of your activity to mark it as complete.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label>Upload Proof</Label>
                            <div className="border-2 border-dashed rounded-lg p-8 text-center">
                              <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                              <p className="mt-2 text-sm text-muted-foreground">Click to upload a photo or video</p>
                              <Input type="file" className="hidden" accept="image/*,video/*" id="proof-upload" />
                              <Label htmlFor="proof-upload">
                                <Button variant="outline" className="mt-4" type="button">
                                  Upload
                                </Button>
                              </Label>
                            </div>
                            <div className="text-xs text-muted-foreground text-center">
                              Earn {challenge.points} points for completing this activity!
                            </div>
                          </div>
                          <div className="text-center pt-4">
                            <p className="font-medium">Are you satisfied with today's session?</p>
                          </div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2">
                          <Button variant="outline" onClick={() => handleMarkDone(false)}>
                            <AlertCircle className="mr-2 h-4 w-4" />
                            No, Skip
                          </Button>
                          <Button onClick={() => handleMarkDone(true)} className="bg-primary hover:bg-primary-dark">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Yes, Complete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 relative z-10">
                {challenge.streak >= 7 && (
                  <p className="text-sm text-primary font-medium flex items-center">
                    <span className="mr-2">🔥</span>
                    Amazing! You've maintained this streak for {challenge.streak} days!
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}

        {challenges.filter((challenge) => activeFilter === "all" || challenge.type === activeFilter).length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No activities for today</h3>
            <p className="text-muted-foreground mt-1">
              {activeFilter !== "all"
                ? `No ${activeFilter} activities scheduled for today.`
                : "You don't have any activities scheduled for today."}
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setAddActivityOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Activity
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

