import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {SearchIcon} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useEffect, useState} from "react";
import {getAll} from "@/api/users/get-all";
import {IUser} from "@/interfaces/users";


function Item({name, message, time}: { name: string, message: string, time: Date }) {
    return (
        <>
            <div className="flex items-start gap-4 m-2 cursor-pointer hover:animate-pulse hover:scale-105">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg"/>
                    <AvatarFallback>{name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="font-medium">{name}</div>
                        <div className="text-xs text-muted-foreground">{time.toLocaleTimeString()}</div>
                    </div>
                    <div>
                        <p className='line-clamp-2'>{message}
                        </p>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    )
}

export function UsersNav() {

    const [items, setItems] = useState<IUser[]>()
    useEffect(() => {
        getAll().then(data => {
            console.log(data)
            setItems(data)
        })
    }, []);
    return (
        <div
            className="hidden lg:block fixed z-20 inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19rem] pb-10 pl-8 overflow-y-auto">
            <nav id="nav" className="lg:text-sm lg:leading-6 relative bg:primary p-3 ">
                <div className="sticky top-0 -ml-0.5 dark:bg-background bg-white p-2 z-50 ">
                    <div className="sticky top-0 p-4 z-50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Users</h2>
                            <Button variant="ghost" size="icon">
                                <PlusIcon className="w-5 h-5"/>
                                <span className="sr-only">Add user</span>
                            </Button>
                        </div>
                    </div>
                    <hr/>
                    <div className="flex justify-center relative pointer-events-auto m-3">
                        <Button size="sm"
                                className='bg-background text-primary hover:bg-background hover:text-primary-foreground'><SearchIcon/>Quick
                            search...<span
                                className="ml-auto pl-3 flex-none text-xs font-semibold">Ctrl K</span></Button>
                    </div>
                </div>
                <ul>
                    {items?.map(value => <Item key={value._id} name={value.name} message={''} time={new Date()}/>)}
                </ul>
            </nav>
        </div>)

}