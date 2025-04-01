"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Users, Heart, MessageCircle, Trophy, Calendar, Filter, Medal, Award } from "lucide-react"

export function Community() {
  const [activeFilter, setActiveFilter] = useState("all")

  const leaderboardUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      username: "@sarahfit",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 42,
      challengesCompleted: 87,
      rank: 1,
      badge: "Elite Athlete",
      badgeIcon: <Award className="h-4 w-4 text-yellow-500" />,
    },
    {
      id: 2,
      name: "Mike Thompson",
      username: "@mike_fitness",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 38,
      challengesCompleted: 72,
      rank: 2,
      badge: "Fitness Master",
      badgeIcon: <Medal className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 3,
      name: "Emily Wong",
      username: "@emily_w",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 35,
      challengesCompleted: 68,
      rank: 3,
      badge: "Consistent Runner",
      badgeIcon: <Trophy className="h-4 w-4 text-green-500" />,
    },
    {
      id: 4,
      name: "Alex Smith",
      username: "@alexsmith",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 32,
      challengesCompleted: 64,
      rank: 4,
      badge: "Gym Enthusiast",
      badgeIcon: <Medal className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 5,
      name: "Jessica Lee",
      username: "@jess_lee",
      avatar: "/placeholder.svg?height=100&width=100",
      streakDays: 29,
      challengesCompleted: 55,
      rank: 5,
      badge: "Yoga Pro",
      badgeIcon: <Award className="h-4 w-4 text-teal-500" />,
    },
  ]

  const posts = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarahfit",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Just completed my 42-day running streak! 🏃‍♀️ Feeling stronger every day! #RunningStreak #Fitness",
      activity: "Running Streak",
      streakDays: 42,
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: 2,
      user: {
        name: "Mike Thompson",
        username: "@mike_fitness",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Hit a new PR on the bench press today! 💪 Consistency is key! #GymLife #FitnessJourney",
      activity: "Gym Workout",
      streakDays: 38,
      timestamp: "5 hours ago",
      likes: 18,
      comments: 3,
      image: null,
    },
    {
      id: 3,
      user: {
        name: "Emily Wong",
        username: "@emily_w",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      content: "Morning yoga session completed! Starting the day with mindfulness and movement. #Yoga #MorningRoutine",
      activity: "Yoga Session",
      streakDays: 35,
      timestamp: "8 hours ago",
      likes: 15,
      comments: 2,
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-dark">Community</h1>

        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Input placeholder="Search community posts and users..." className="pl-9" />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <Tabs defaultValue="feed">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-4 space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{post.user.name}</CardTitle>
                      <CardDescription>
                        {post.user.username} · {post.timestamp}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    <Trophy className="h-3 w-3 mr-1" />
                    {post.streakDays} day streak
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="mb-3">{post.content}</p>
                {post.image && (
                  <div className="rounded-lg overflow-hidden mb-2">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post image"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.activity}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Heart className="h-4 w-4 mr-1" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trending Activities</CardTitle>
              <CardDescription>See what's popular in the community this week</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">10K Challenge</p>
                      <p className="text-sm text-muted-foreground">342 people joined this week</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">30-Day Yoga</p>
                      <p className="text-sm text-muted-foreground">287 people joined this week</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Gym Consistency</p>
                      <p className="text-sm text-muted-foreground">253 people joined this week</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Trending Hashtags</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">#FitnessJourney</Badge>
                <Badge variant="secondary">#MorningWorkout</Badge>
                <Badge variant="secondary">#RunningCommunity</Badge>
                <Badge variant="secondary">#YogaEveryday</Badge>
                <Badge variant="secondary">#StreakGoals</Badge>
                <Badge variant="secondary">#FitFam</Badge>
                <Badge variant="secondary">#ConsistencyWins</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Top Streakers</h2>
            <Select defaultValue="week">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {leaderboardUsers.map((user, index) => (
            <Card key={user.id} className={index === 0 ? "border-yellow-300 bg-yellow-50/50" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-bold text-lg w-6 text-center text-muted-foreground">{user.rank}</div>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.username}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2 text-xs">
                          {user.badgeIcon}
                          <span className="ml-1">{user.badge}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-primary">{user.streakDays}</span>
                      <span className="text-xs text-muted-foreground">day streak</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {user.challengesCompleted} challenges completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" className="w-full">
            <Users className="h-4 w-4 mr-2" />
            View Full Leaderboard
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Import missing components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

