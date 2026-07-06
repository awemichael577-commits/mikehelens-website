type Testimonial = {
  quote: string;
  name: string;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/[0.08] p-6">
      <blockquote className="text-sm leading-7 text-white/80">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 text-sm font-bold text-gold">
        {testimonial.name}
      </figcaption>
    </figure>
  );
}
