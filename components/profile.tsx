"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Edit, Medal, Trophy, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"

export function Profile() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const [user, setUser] = useState({
    name: "Alex Johnson",
    username: "alexfitness",
    bio: "Fitness enthusiast. Working on becoming the best version of myself.",
    avatar: "/placeholder.svg?height=100&width=100",
    goal: "Train 5 days a week",
    totalStreaks: 42,
    longestStreak: 14,
    totalWorkouts: 87,
  })

  const [settings, setSettings] = useState({
    pushNotifications: true,
    offlineMode: true,
    reminderTime: "08:00",
    soundEffects: true,
    weeklyReports: true,
  })

  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  // Ensure theme-related code only runs on client
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSaveProfile = () => {
    setUser(editedUser)
    setEditProfileOpen(false)

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      duration: 3000,
    })
  }

  const handleToggleDarkMode = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")

    toast({
      title: `${checked ? "Dark" : "Light"} Mode Activated`,
      description: `The app theme has been changed to ${checked ? "dark" : "light"} mode.`,
      duration: 3000,
    })
  }

  const handleTogglePushNotifications = () => {
    setSettings((prev) => ({
      ...prev,
      pushNotifications: !prev.pushNotifications,
    }))

    toast({
      title: settings.pushNotifications ? "Notifications Disabled" : "Notifications Enabled",
      description: settings.pushNotifications
        ? "You will no longer receive push notifications."
        : "You will now receive push notifications for your activities.",
      duration: 3000,
    })
  }

  const handleToggleOfflineMode = () => {
    setSettings((prev) => ({
      ...prev,
      offlineMode: !prev.offlineMode,
    }))

    toast({
      title: settings.offlineMode ? "Offline Mode Disabled" : "Offline Mode Enabled",
      description: settings.offlineMode
        ? "Your activities will only be saved when you're online."
        : "Your activities will be saved offline and synced when you're online.",
      duration: 3000,
    })
  }

  const handleToggleSoundEffects = () => {
    setSettings((prev) => ({
      ...prev,
      soundEffects: !prev.soundEffects,
    }))

    toast({
      title: settings.soundEffects ? "Sound Effects Disabled" : "Sound Effects Enabled",
      description: settings.soundEffects ? "Sound effects have been turned off." : "Sound effects have been turned on.",
      duration: 3000,
    })
  }

  const handleToggleWeeklyReports = () => {
    setSettings((prev) => ({
      ...prev,
      weeklyReports: !prev.weeklyReports,
    }))

    toast({
      title: settings.weeklyReports ? "Weekly Reports Disabled" : "Weekly Reports Enabled",
      description: settings.weeklyReports
        ? "You will no longer receive weekly activity reports."
        : "You will now receive weekly activity reports.",
      duration: 3000,
    })
  }

  const handleReminderTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      reminderTime: e.target.value,
    }))

    toast({
      title: "Reminder Time Updated",
      description: `Your daily reminder time has been set to ${e.target.value}.`,
      duration: 3000,
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-dark">Profile</h1>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </div>
            <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>Update your profile information.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="mx-auto">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={editedUser.avatar} />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <div className="mt-2 text-center">
                      <Label htmlFor="avatar-upload" className="text-sm text-primary cursor-pointer">
                        Change Photo
                      </Label>
                      <Input id="avatar-upload" type="file" className="hidden" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editedUser.username}
                      onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editedUser.bio}
                      onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="goal">Fitness Goal</Label>
                    <Input
                      id="goal"
                      value={editedUser.goal}
                      onChange={(e) => setEditedUser({ ...editedUser, goal: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditProfileOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">{user.bio}</p>
              <p className="text-sm font-medium mt-2">Goal: {user.goal}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="p-4 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">{user.totalStreaks}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <p className="text-xs text-muted-foreground">Total Streaks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">{user.longestStreak}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <p className="text-xs text-muted-foreground">Longest Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-4 pb-2 text-center">
            <CardTitle className="text-2xl font-bold">{user.totalWorkouts}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-center">
            <p className="text-xs text-muted-foreground">Total Workouts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="achievements">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="achievements" className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold">Your Achievements</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                <p className="font-medium text-center">7-Day Streak</p>
                <p className="text-xs text-muted-foreground text-center">Completed a 7-day streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Medal className="h-8 w-8 text-blue-500 mb-2" />
                <p className="font-medium text-center">Early Bird</p>
                <p className="text-xs text-muted-foreground text-center">Completed 5 morning workouts</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Award className="h-8 w-8 text-green-500 mb-2" />
                <p className="font-medium text-center">Consistency King</p>
                <p className="text-xs text-muted-foreground text-center">Completed 30 workouts total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center">
                <Trophy className="h-8 w-8 text-purple-500 mb-2" />
                <p className="font-medium text-center">Fitness Fanatic</p>
                <p className="text-xs text-muted-foreground text-center">Logged 10 different activities</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-4 space-y-4">
          <h2 className="text-lg font-semibold">App Settings</h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Get reminders for your activities</p>
                </div>
                <Switch checked={settings.pushNotifications} onCheckedChange={handleTogglePushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={handleToggleDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Offline Mode</p>
                  <p className="text-sm text-muted-foreground">Log activities without internet</p>
                </div>
                <Switch checked={settings.offlineMode} onCheckedChange={handleToggleOfflineMode} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Effects</p>
                  <p className="text-sm text-muted-foreground">Play sounds for achievements and completions</p>
                </div>
                <Switch checked={settings.soundEffects} onCheckedChange={handleToggleSoundEffects} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">Receive weekly activity summaries</p>
                </div>
                <Switch checked={settings.weeklyReports} onCheckedChange={handleToggleWeeklyReports} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reminder Time</p>
                  <p className="text-sm text-muted-foreground">Set your daily activity reminder time</p>
                </div>
                <Input type="time" value={settings.reminderTime} onChange={handleReminderTimeChange} className="w-24" />
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              localStorage.removeItem("streek-logged-in")
              window.location.reload()
            }}
          >
            Sign Out
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

