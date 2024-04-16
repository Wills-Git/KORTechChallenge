import type { FC } from "react"
import { ScrollArea } from "@/components/ui/scroll-area.tsx"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.tsx"
import { UserInfoProps } from "@/types/types.ts"

interface Post {
  id: number
  title: string
  content: string
}

const PostsList: FC = () => {
  const dummyPosts = []
  for (let i = 1; i <= 50; i++) {
    const dummyPost: Post = {
      id: i,
      title: "Dummy Post",
      content: `${Array(Math.floor(Math.random() * 50)).fill("Here are my thoughts ")}`,
    }
    dummyPosts.push(dummyPost)
  }
  return (
    <ScrollArea className="h-full overflow-y-auto rounded-md border">
      {" "}
      {/* Adjust height as needed */}
      {dummyPosts.map((post: Post) => (
        <Card key={post.id} className="m-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{post.content}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  )
}

export default PostsList
