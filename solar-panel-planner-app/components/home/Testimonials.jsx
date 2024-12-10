import { testimonialsContent } from "./testimonialsContent";
import Image from "next/image";
const Testimonials = () => {
  return (
    <section>
      <div className="relative isolate overflow-hidden 2xl:rounded-t-xl">
        <Image
          width={0}
          height={0}
          sizes="100vh"
          alt=""
          quality={90}
          src="/images/testimonials-bg.jpg"
          className="absolute inset-0 -z-10 size-full object-cover object-center "
        />
        <div className="absolute bg-black w-full h-full left-0 opacity-40 -z-10" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base/7 font-semibold text-secondary-light">
              Testimonials
            </h2>
            <p className="mt-2 text-white text-balance text-4xl font-semibold tracking-tight sm:text-7xl">
              We have served hundreds of happy customers!
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2">
            {testimonialsContent.map((testimonial) => (
              <div
                key={testimonial.name}
                className="space-y-8 xl:contents xl:space-y-0"
              >
                <figure
                  key={testimonial.name}
                  className="rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                >
                  <p className="text-gray-900">{`“${testimonial.message}”`}</p>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-600">{`🗓️ ${testimonial.dateOfVisit}`}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
