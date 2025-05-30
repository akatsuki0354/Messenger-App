"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getAuth, signOut } from "firebase/auth";
import { fetchUsers } from '@/services/user-data';
import { UserData } from './home-screen-type';

function Home() {
    const [userData, setUserData] = useState<UserData[] | null>(null)
    const auth = getAuth();
    const Logout = () => {
        signOut(auth).then(() => {
            console.log("oks na naka signout kana")
        }).catch((error) => {
            console.log(error)
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            const user = await fetchUsers();
            if (user) {
                setUserData(user);
                console.log(user);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Button onClick={Logout}>
                Logout
            </Button>

            {userData?.map((user) => (
                <div>
                    <li key={user.id}>{user.email || 'No Email'}</li>
                </div>
            ))}
        </div>
    )
}

export default Home