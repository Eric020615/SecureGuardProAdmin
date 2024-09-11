import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@components/ui/card'
import { Label } from '@components/ui/label'
import React from 'react'

const ProfilePage = () => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Account Settings</h3>
            </div>
            <div className="mt-5 w-full">
                <Card>
                    <CardHeader>
                        <CardTitle className="mb-1">My Profile</CardTitle>
                        <CardDescription>
                            Deploy your new project in one-click.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between"></CardFooter>
                </Card>
            </div>
        </>
    )
}

export default ProfilePage
