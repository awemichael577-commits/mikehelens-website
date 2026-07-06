import { TestimonialCard } from "@/components/TestimonialCard";

type TestimonialListItem = {
  id?: string;
  quote: string;
  name: string;
  role?: string;
};

export function TestimonialList({ testimonials }: { testimonials: TestimonialListItem[] }) {
  if (!testimonials.length) {
    return null;
  }

  return (
    <div className="-mx-5 mt-10 flex snap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
      {testimonials.map((testimonial, index) => (
        <div key={testimonial.id ?? `${testimonial.name}-${index}`} className="min-w-[280px] snap-start md:min-w-0">
          <TestimonialCard
            testimonial={{
              quote: testimonial.quote,
              name: testimonial.role ? `${testimonial.name}, ${testimonial.role}` : testimonial.name,
            }}
          />
        </div>
      ))}
    </div>
  );
}
