"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

export function HomeMinisSlider({ slides }: { slides: { title: string; image: string }[] }) {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={12}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="relative w-full h-32">
                <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} />
              </div>
              <p className="p-2 text-sm font-medium text-center">{s.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
