"use client";
import React, { useEffect, useState } from "react";
import { IOnlineUser, User } from "@/interfaces/online-users.interface";
import { getAll } from "@/api/users/get-all";
import BackButton from "@/components/buttons/back-button";

interface UserItemProps {
  user: IOnlineUser;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="flex items-center text-center p-4 border rounded-lg shadow-md">
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">@{user.username}</p>
      </div>
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAll().then((data) => {
      if (data) setUsers(data);
    });
  }, []);
  return (
    <div className='mt-16'>
      <BackButton to={'/home'}/>
      <div className="flex flex-col gap-4 ">
        <h1 className="text-2xl font-bold text-center">Usuarios</h1>
        <div className="flex flex-col gap-4">
          {users.map((user: any, index) => (
            <UserItem key={index} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
