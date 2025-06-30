import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "Using Brigadely has been a game-changer for our business. The real-time rates and ability to make payments in multiple currencies and several countries have saved us both time and money. Highly recommended!",
      name: "Folakemi kolawole",
      email: "foloskikolawole@gmail.com",
    },
    {
      id: 2,
      text: "The setup of the API for our dev team was effortless. The security for our users through the SMS OTP code was a game-changer. And I've never had downtime in a year. We've saved a tremendous amount of time.",
      name: "Ololade Aderonke",
      email: "ololaderonke@gmail.com",
    },
    {
      id: 3,
      text: "Using Brigadely has been a game-changer for our business. The real-time rates and ability to make payments in multiple currencies and several countries have saved us both time and money. Highly recommended!",
      name: "Shade Omidiora",
      email: "folashade@gmail.com",
    },
    {
      id: 4,
      text: "Using Brigadely has been a game-changer for our business. The real-time rates and ability to make payments in multiple currencies and several countries have saved us both time and money. Highly recommended!",
      name: "Folu Adetola",
      email: "Adetolafoluwa@gmail.com",
    },
    {
      id: 5,
      text: "Using Brigadely has been a game-changer for our business. The real-time rates and ability to make payments in multiple currencies and several countries have saved us both time and money. Highly recommended!",
      name: "Mariam Agbogunloko",
      email: "mariamagbogunloko29@gmail.com",
    },
  ];

  // Generate initials for each testimonial
  const testimonialsWithInitials = testimonials.map((testimonial) => ({
    ...testimonial,
    initials: testimonial.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase(),
  }));

  return (
    <div
      id="Testimonials"
      className="bg-blue-600 text-white py-14 px-4 md:px-28"
    >
      <div className="container mx-auto">
        <h2 className="text-left text-3xl md:text-4xl font-semibold mb-10 max-w-md">
          Here&apos;s what our users have to say About Us
        </h2>
        <Carousel>
          <CarouselContent className="">
            {testimonialsWithInitials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3 p-4 pr-0 md:pr-4"
              >
                <div className="bg-blue-500 text-white rounded-xl h-[480px] w-full p-6 shadow-lg flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold mb-2">
                      TESTIMONIAL {testimonial.id}
                    </p>
                    <p className="text-lg leading-relaxed mb-4">
                      “{testimonial.text}”
                    </p>
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="flex-shrink-0 bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold text-lg">
                      {testimonial.initials}
                    </div>

                    <div className="ml-3">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-200">
                        {testimonial.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <CarouselPrevious className="text-white hidden md:flex" />
          <CarouselNext className="text-white hidden md:flex" /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonials;
