"use client"
import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill, GiCampingTent, GiIsland, GiCastle, GiTreehouse, GiCaveEntrance } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IoFastFoodOutline, IoBoat } from "react-icons/io5";
import { FaSwimmingPool, FaSkiing } from "react-icons/fa";
import { PiParkDuotone } from "react-icons/pi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This property has windmill!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is modern!'
    },
    {
        label: 'Camping',
        icon: GiCampingTent,
        description: 'This property is camp!'
    },
    {
        label: 'Breakfast',
        icon: IoFastFoodOutline,
        description: 'This property has breakfast!'
    },
    {
        label: 'Island',
        icon: GiIsland,
        description: 'This property is on island!'
    },
    {
        label: 'Pool',
        icon: FaSwimmingPool,
        description: 'This property has swimming pool!'
    },
    {
        label: 'Castle',
        icon: GiCastle,
        description: 'This property is castle!'
    },
    {
        label: 'National Park',
        icon: PiParkDuotone,
        description: 'This property is near national park!'
    },
    {
        label: 'Treehoses',
        icon: GiTreehouse,
        description: 'This property is treehouse!'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This property is in cave!'
    },
    {
        label: 'Boat',
        icon: IoBoat,
        description: 'This property has boat service!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing!'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';
    
    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Categories;