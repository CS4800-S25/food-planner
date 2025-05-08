"use client";
import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

function MealCard({
    title = "Recipe",
    price = 0,
    servingSize = 1,
    imageUrl = "https://placehold.co/300",
    onInstructionsClick = () => {},
}) {
    return (
        <Card className="h-[500px] flex flex-col justify-between text-center p-6 rounded-xl bg-[#8fba83] border-[#c5e8c5] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center border border-[#e0e0d0]">
            <div className="min-h-[64px] flex items-center justify-center">
            <h2 className="text-2xl font-bold text-[#4e3825]">{title}</h2>
            </div>
            
            <div className="flex-grow flex items-center justify-center w-full">
            <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="rounded-md object-contain max-h-[250px]"
                unoptimized
            ></Image>
            </div>

            <p className="text-base text-[#2f5d24] font-medium">${(price / 100 ).toFixed(2) }</p>
            <p className="text-sm text-gray-500">Serves: {servingSize}</p>

            <div className="mt-4">
                <Button onClick={onInstructionsClick} variant="outline" size="sm">
                    Instructions to Cook
                </Button>
            </div>
        </Card>
    );
}

export default MealCard;
