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
            className="text-center p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center justify-center"
            onClick={() => router.push(`/meal/${title}`)}
        >
            <h2 className="text-2xl font-bold">{title}</h2>
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="rounded-lg my-4"
                unoptimized
            ></Image>
            <p className="text-gray-600">{description}</p>
            <p className="text-gray-600">${price}</p>
            <p className="text-gray-600">Serves: {servingSize}</p>
            
        </Card>
    );
}

export default MealCard;
