"use client";
import Image from "next/image";
import EmailVerificationModal from "../request/EmailVerificationModal";
const HeroSection = () => {
  return (
    <section id="hero-section" className="max-w-8xl mx-auto mb-12 ">
      <div className="relative isolate overflow-hidden -inset-y-20 ">
        <Image
          width={0}
          height={0}
          sizes="100vh"
          alt=""
          quality={90}
          priority={true}
          src="/images/hero-bg.jpeg"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="mx-auto md:ml-12 max-w-7xl px-6 lg:px-8">
          <div className="absolute bg-gradient-to-r from-black from-0% via-black via-70% to-transparent w-2/3 h-full left-0 opacity-60 -z-10" />
          <div className="mx-auto md:ml-12 2xl:ml-24 max-w-2xl py-56 ">
            <div className="text-left">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white md:text-7xl">
                Simplify Your Solar Journey with <br />
                <span className="rounded-lg text-orange-00 font-extrabold  italic">
                  Effortless Scheduling
                </span>{" "}
              </h1>
              <p className="mt-8 max-w-md text-pretty text-lg font-medium text-gray-100 sm:text-xl/8">
                Schedule your solar panel evaluation with ease, and let us
                handle the rest. Join Los Angeles&apos; mission to embrace
                sustainable energy today!
                <a
                  href="#how-it-works-section"
                  className=" text-white hidden sm:block"
                >
                  {" "}
                  How it works <span aria-hidden="true">→</span>
                </a>
              </p>
              <div className="mt-4 flex items-center justify-start gap-x-6">
                <a
                  href="/request/new"
                  className="rounded-md bg-secondary-light px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                >
                  Book an Appointment
                </a>

                <EmailVerificationModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
