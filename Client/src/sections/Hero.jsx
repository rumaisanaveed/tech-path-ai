import { Link } from "react-router-dom";
import FloatingTestimonialCard from "../components/home/FloatingTestimonialCard";
import { floatingTestimonialsData } from "../constants";

export default function Hero() {
  return (
    <section className="flex flex-col gap-5 items-center text-center justify-center w-11/12 lg:max-w-7xl mx-auto relative h-screen">
      {/* linear gradient */}
      <div
        className="absolute z-0 w-[300px] h-[400px] lg:w-[900px] lg:h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse at center, #dbeafe 0%, #f8fafc 60%, transparent 100%)",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          filter: "blur(20px)", // Optional: makes the gradient smoother
        }}
      ></div>

      {/* Floating Testimonial Cards */}

      <div className="hidden xl:flex">
        {floatingTestimonialsData.map((testimonial, index) => (
          <FloatingTestimonialCard
            key={index}
            position={testimonial.position}
            imageSrc={testimonial.imageSrc}
            imageAlt={testimonial.imageAlt}
            text={testimonial.text.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < testimonial.text.split("\n").length - 1 && <br />}
              </span>
            ))}
            avatarBgColor={testimonial.avatarBgColor}
            textSize={testimonial.textSize}
            textColor={testimonial.textColor}
            borderColor={testimonial.borderColor}
            showBackground={testimonial.showBackground}
            maxWidth={testimonial.maxWidth}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="anonymous-font flex flex-col gap-2 text-center relative">
        <h1 className="text-3xl md:text-7xl font-bold mb-4 text-[#252525]">
          From <span className="text-custom-orange">Confusion </span>
          to
          <span className="text-custom-light-blue"> Clarity </span>- Your Smart
          Career Guide in Tech
        </h1>

        <p className="md:text-2xl text-base w-11/12 md:max-w-5xl font-normal text-center mx-auto">
          Personalized guidance, real industry insights, and the roadmap you
          wish you had earlier - all in one platform
        </p>
      </div>

      <Link
        className="bg-custom-orange-light text-base anonymous-font text-white md:text-xl font-medium py-3 px-6 rounded-full relative z-10"
        to="/auth/login"
      >
        Get Started - It's Free
      </Link>
    </section>
  );
}
