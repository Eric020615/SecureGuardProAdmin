import React from 'react'
import { Card, CardContent } from '../ui/card'

const Dashboard = () => {
  return (
    <Card className='bg-slate-100 dark:bg-slate-800 p-4 pb-0'>
        <CardContent>
            <h3 className='text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200'>
                Dashboard
            </h3>
        </CardContent>
    </Card>
  )
}

export default Dashboard