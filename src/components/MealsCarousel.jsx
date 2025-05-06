"use client";

import Slider from "react-slick";
import MealCard from "@/components/MealCard";
import MealModal from "@/components/MealModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function MealsCarousel({ meals, email }) {
    console.log("MealsCarousel meals:", meals); // Debugging line
    const router = useRouter();
    const queryClient = useQueryClient();

    const isNewUser = meals.length === 0;

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

    const CustomNextArrow = ({ onClick }) => (
        <div
            className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 text-3xl text-green-800 z-10 cursor-pointer"
            onClick={onClick}
        >
            ▶
        </div>
    );

    const CustomPrevArrow = ({ onClick }) => (
        <div
            className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 text-3xl text-green-800 z-10 cursor-pointer"
            onClick={onClick}
        >
            ◀
        </div>
    );

    const settings = {
        dots: true,
        infinite: true,
        swipe: true,
        swipeToSlide: true,
        draggable: true,
        speed: 500,
        slidesToShow: 4, // How many meal cards to show at once
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
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
    const newSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="mt-8 px-4 pb-10 w-full relative overflow-visible bg-transparent rounded-xl">
            <Slider {...settings}>
                {meals.map((meal, index) => (
                    <div
                        key={index}
                        className="px-2 h-[550px] w-full"
                        onClick={() => openModal(meal)}
                    >
                        <MealCard
                            title={meal.title}
                            servingSize={meal.servings}
                            imageUrl={meal.image}
                            price={meal.pricePerServing}
                        />
                    </div>
                ))}
            </Slider>
            <div className="h-4" />
            <MealModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                meal={selectedMeal}
            />
            <Slider {...newSettings}>
                <MealCard />
                <MealCard />
                <MealCard />
            </Slider>
        </div>
    );
}
