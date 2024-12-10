import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="bg-gray-900">
      <div className="relative isolate overflow-hidden pt-14 ">
        <Image
          width={0}
          height={0}
          sizes="100vh"
          alt=""
          src="/images/hero-bg2.jpeg"
          className="absolute inset-0 -z-10 size-full object-cover"
        />

        <div className="mx-auto md:ml-12 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto md:ml-12 2xl:ml-24 max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-left">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                Effortless Solar Planning for a Brighter Future
              </h1>
              <p className="mt-8 max-w-md text-pretty text-lg font-medium text-gray-100 sm:text-xl/8">
                Schedule your solar panel evaluation with ease, and let us
                handle the rest. Join Los Angeles' mission to embrace
                sustainable energy today!
              </p>
              <div className="mt-10 flex items-center justify-start gap-x-6">
                <a
                  href="/request/new"
                  className="rounded-md bg-secondary-light px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Book an Appointment
                </a>
                <a href="#" className="text-sm/6 font-semibold text-white">
                  How it works <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
