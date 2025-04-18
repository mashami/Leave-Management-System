"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { deleteUser } from "@/services/user"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { DeleteSmallSvg } from "../Svg"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

interface DeleteUserDialogProps {
  id: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteUserDialog = ({ id, isOpen, setIsOpen }: DeleteUserDialogProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const deleteUserHandler = async () => {
    if (!id) {
      return toast({
        variant: "destructive",
        description: "ID are required"
      })
    }
    setIsLoading(true)
    try {
      const result = await deleteUser(id)

      if (result.error) {
        toast({
          variant: "destructive",
          description: result.message
        })
        setIsLoading(false)
        return
      }

      router.refresh()

      setIsLoading(false)

      return toast({
        description: "Staff has deleted sucessfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Server error, Please Try again buddy!"
      })

      setIsLoading(false)

      return
    }
  }

  return (
    <>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="w-[448px] p-8">
          <DialogHeader className="space-y-8">
            <DialogTitle className="flex items-center justify-center">
              <div className="w-[84px] h-[84px] flex items-center justify-center rounded-full bg-[#FFF4F4]">
                <DeleteSmallSvg width={42} height={42} />
              </div>
            </DialogTitle>
            <DialogDescription className="p-6 space-y-8">
              <p className="text-[#FF4A6B] font-ibm_plex_mono font-medium leading-6 text-center">
                Are you sure you want to delete this User
              </p>
              <div className="flex items-center w-full space-x-4">
                <Button
                  variant={"secondary"}
                  className="text-black w-full"
                  text="Cancel"
                  onClick={() => {
                    setIsOpen(false)
                  }}
                  disabled={isLoading}
                />
                <Button
                  className="text-white bg-[#FF4A6B] hover:bg-[#FF4A6B]/70 w-full"
                  text="Delete"
                  style={{
                    boxShadow:
                      " 0px 4px 4px 0px rgba(217, 217, 217, 0.25) inset"
                  }}
                  onClick={deleteUserHandler}
                  loading={isLoading}
                  disabled={isLoading}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DeleteUserDialog
