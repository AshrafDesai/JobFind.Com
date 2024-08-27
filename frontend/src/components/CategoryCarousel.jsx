import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Software Engineer",
    "Software Tester",
    "UI/UX Developer",
    "FullStack Developer",
    "Python Developer"
];

function CategoryCarousel() {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Button>{cat}</Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
}

export default CategoryCarousel;
