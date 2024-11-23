import { testimonialsContent } from "./testimonialsContent";

const Testimonials = () => {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-secondary-light">
            Testimonials
          </h2>
          <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            We have served hundreds of happy customers!
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          {testimonialsContent.map((testimonial) => (
            <div
              key={testimonial.name}
              className="space-y-8 xl:contents xl:space-y-0"
            >
              <figure
                key={testimonial.name}
                className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
              >
                <blockquote className="text-gray-900">
                  <p>{`“${testimonial.message}”`}</p>
                </blockquote>
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
    </section>
  );
};

export default Testimonials;
