"use client";

import Slider from "react-slick";
import MealCard from "@/components/MealCard";
import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "@/lib/fetchMeals";

export default function MealsCarousel({ email }) {
    const { data: meals, isLoading, error } = useQuery({
        queryKey: ["meals", email],
        queryFn: () => fetchMeals(email),
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading meals...</div>;
    }

    if (error) {
        return <div>Error loading meals.</div>;
    
    }

    if (meals.length === 0) {
        return (
            <div className="text-center mt-10">
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
                    <div key={index} className="px-2">
                        <MealCard
                            title={meal.title}
                            description={meal.description}
                            servingSize={meal.servingSize}
                            price={meal.price}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}