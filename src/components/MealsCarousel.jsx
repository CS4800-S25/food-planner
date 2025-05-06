"use client";

import MealCard from "@/components/MealCard";
import MealModal from "@/components/MealModal";
import { useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

export default function MealsCarousel({ meals }) {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (meal) => {
        console.log("Meal clicked:", meal);
        const mealWithDummyIngredients = {
            title: meal.title || "Sample Meal",
            description: meal.description || "Sample description",
            price: meal.price || 25,
            servingSize: meal.servings || 2,
            ingredients: meal.ingredients || [
                { name: "Beef", price: 15 },
                { name: "Lettuce", price: 2 },
                { name: "Kimchi", price: 3 },
                { name: "Rice", price: 5 },
            ],
        };

        setSelectedMeal(mealWithDummyIngredients);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedMeal(null);
        setIsModalOpen(false);
    };

    // If meals is empty, show a message

    if (meals.length === 0) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl text-gray-600">
                    No meals yet. Please generate your meal plan!
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 px-4 pb-10 relative overflow-visible bg-transparent rounded-xl">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {meals.map((meal, index) => (
                        <CarouselItem key={index} className="basis-1/3">
                            <div onClick={() => openModal(meal)}>
                                <MealCard
                                    title={meal.title}
                                    servingSize={meal.servings}
                                    imageUrl={meal.image}
                                    price={meal.pricePerServing}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="mx-3" />
                <CarouselNext className="mx-3" />
            </Carousel>
            <MealModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                meal={selectedMeal}
            />
        </div>
    );
}
