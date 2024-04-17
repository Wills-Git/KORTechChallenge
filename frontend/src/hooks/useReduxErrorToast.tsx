// External imports
import { useEffect } from "react"

// Hooks
import { useToast } from "@/components/ui/use-toast.ts"

// Type imports
import type { ReduxError } from "@/types/types.ts"

// Custom hook for handling errors with a toast notification
function useReduxErrorToast(error: ReduxError, isError: Boolean) {
  const { toast } = useToast()

  useEffect(() => {
    if (isError && error) {
      let errorMessage = "An error occurred"

      if ("status" in error) {
        // FetchBaseQueryError typically includes a status field
        errorMessage = `Fetch error: ${error.status} ${error.data || ""}`
      } else if ("message" in error) {
        // SerializedError usually includes a message field
        errorMessage = error.message ? error.message : errorMessage
      } else {
        // Handle case where error may be undefined or not have expected properties
        errorMessage = "Unknown error"
      }

      toast({
        variant: "destructive",
        title: "something went wrong",
        description: errorMessage,
      })
    }
  }, [isError, error, toast])
}

export default useReduxErrorToast
