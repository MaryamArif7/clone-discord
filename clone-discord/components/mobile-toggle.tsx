//21.3.....
/* so the mode toggle is  the menu button which was appearing on the 
chat header right beside channel name but after this mode tggle when we the minimize the screen we just see the header  and menu botton with the channel nme and menu button is clickable too 
when user join the server we immediately return to the general channel on the mobile view we  will see the  menu button    */
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { NavigationSidebar } from "./navigation/navigation-sidebar"
import { Button } from "./ui/button"
import { ServerSidebar } from "./server/server-sidebar"

export const MobileToggle = ({ serverId }: { serverId: string }) => {
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar />
                    <ServerSidebar serverId={serverId} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
