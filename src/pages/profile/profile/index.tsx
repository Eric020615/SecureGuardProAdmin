'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import MyProfilePage from '../myProfile'
import SecurityPage from '../security'

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('profile')

    return (
        <>
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Account Settings</h3>
            </div>
            <div className="mt-5 w-full">
                <div className="md:flex grid bg-white">
                    {/* Sidebar */}
                    <div className="xl:w-1/5 md:w-1/4 md:border-r border-b p-4">
                        <nav>
                            <ul className="md:grid flex">
                                <li>
                                    <Link
                                        href="#"
                                        className={`py-2 px-4 block rounded ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-700'}`}
                                        onClick={() => setActiveTab('profile')}
                                    >
                                        My Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className={`py-2 px-4 block rounded ${activeTab === 'security' ? 'bg-primary text-white' : 'text-gray-700'}`}
                                        onClick={() => setActiveTab('security')}
                                    >
                                        Security
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="xl:w-4/5 md:w-3/4 p-4 min-h-[550px]">
                        <p className="text-3xl m-1 font-medium text-black">
                            {activeTab === 'profile'
                                ? 'My Profile'
                                : activeTab === 'security'
                                  ? 'Security'
                                  : ''}
                        </p>
                        <div className="mt-3">
                            {activeTab === 'profile' && <MyProfilePage />}
                            {activeTab === 'security' && <SecurityPage />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
