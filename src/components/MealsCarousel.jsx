"use client";

import Slider from "react-slick";
import MealCard from "@/components/MealCard";
import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "@/lib/fetchMeals";
import MealModal from "@/components/MealModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function MealsCarousel({ meals, email }) {
    
    const router = useRouter();
    const queryClient = useQueryClient();

    const isNewUser = meals.length === 0;

    const [selectedMeal, setSelectedMeal] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (meal) => {
        const mealWithDummyIngredients = {
            title: meal.title || "Sample Meal",
            description: meal.description || "Sample description",
            price: meal.price || 25,
            servingSize: meal.servingSize || 2,
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
                <p className="text-xl text-gray-600">No meals yet. Please generate your meal plan!</p>
               
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // How many meal cards to show at once
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="mt-8">
            <Slider {...settings}>
                {meals.map((meal, index) => (
                    <div key={index} className="px-2" onClick={() => openModal(meal)}>
                        <MealCard
                            title={meal.title}
                            description={meal.description}
                            servingSize={meal.servingSize}
                            price={meal.price}
                        />
                    </div>
                ))}
            </Slider>
            <MealModal isOpen={isModalOpen} closeModal={closeModal} meal={selectedMeal} />
        </div>
    );
}