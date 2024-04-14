import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card.tsx"
import { Label } from "@/components/ui/label.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your username to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Username</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-1">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <Button className="w-full" type="submit">
              Signup
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
