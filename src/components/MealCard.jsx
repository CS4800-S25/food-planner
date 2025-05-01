"use client";
import Image from "next/image";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";

function MealCard({
    title = "Recipe",
    description = "Instructions for Recipe",
    price = 0,
    servingSize = 1,
    imageUrl = "https://placehold.co/300",
}) {
    const router = useRouter();
    return (
        <Card
            className="h-[500px] text-center p-6 rounded-xl bg-[#8fba83] border-[#c5e8c5] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center border border-[#e0e0d0]"
            //onClick={() => router.push(`/meal/${title}`)}
        >
            <h2 className="text-2xl font-bold text-[#365314]">{title}</h2>
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="rounded-md my-4 object-cover"
                unoptimized
            ></Image>
            <p className="text-sm text-gray-600 mb-1 italic">{description}</p>
            <p className="text-base text-[#2f5d24] font-medium">${price}</p>
            <p className="text-sm text-gray-500">Serves: {servingSize}</p>
            
        </Card>
    );
}

export default MealCard;
