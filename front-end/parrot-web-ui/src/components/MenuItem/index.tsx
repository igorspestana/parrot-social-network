import { ReactNode } from "react"
import { Link } from 'react-router-dom'
import { Slot } from "@radix-ui/react-slot"
import Text from "../Text"

interface MenuItemProps {
    menuTitle: string;
    children?: ReactNode;
    route: string
}

function MenuItem(props: MenuItemProps) {
    return (
        <li className="mt-5">
            <Link to={props.route}>
                <div className="flex items-center px-4 py-3 rounded-full hover:bg-slate-800 ml-2">
                    <Slot className="text-sky-400">{props.children}</Slot>
                    <Text className="font-extrabold">{props.menuTitle}</Text>
                </div>
            </Link>
        </li >
    );
}

export default MenuItem