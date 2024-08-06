'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import ActiveUserList from './active'
import InactiveUserList from './inactive'

const UserListPage = () => {
    return (
        <>
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">User</h3>
            </div>
            <div className="mt-5 w-full">
                <Tabs defaultValue="active">
                    <TabsList>
                        <TabsTrigger
                            value="active"
                            onClick={() => {
                                console.log('hello')
                            }}
                        >
                            Active
                        </TabsTrigger>
                        <TabsTrigger
                            value="inactive"
                            onClick={() => {
                                console.log('hllo2')
                            }}
                        >
                            Inactive
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value='active'>
                      <ActiveUserList/>
                    </TabsContent>
                    <TabsContent value='inactive'>
                      <InactiveUserList/>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default UserListPage
