import Section from '../../ui/Section';
import CurvedSectionTitle from '../../ui/section-titles/CurvedLoopSectionTitle';
import GradientText from '@/components/GradientText';

export default function Contact() {
  return (
    <Section title="Contact Me" id="contact">
      <div>
        <CurvedSectionTitle
          text="Get in Touch"
          curve={60}
          className="fill-[#fbfffe] transition-colors duration-1000 hover:fill-[#7A43C1]"
          direction="right"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl mx-auto text-left">
        <GradientText
          colors={['#7a43c1', '#FF9FFC', '#fbfffe']}
          animationSpeed={10}
          yoyo={false}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-10"
        >
          Contact
        </GradientText>

        <p className="mt-6 text-sm leading-relaxed text-[#fbfffe]">
          Open to frontend roles, freelance work and collaborations. Feel free
          to reach out.
        </p>

        {/* Direct links */}
        <div className="mt-8 space-y-2 text-sm text-left max-w-md">
          <a
            href="mailto:giannipasquinelli@gmail.com"
            className="block text-neutral-200 hover:text-white transition"
          >
            → giannipasquinelli@gmail.com
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-neutral-200 hover:text-white transition"
          >
            → LinkedIn
          </a>
        </div>

        <div className="my-14 h-px bg-white/10" />

        {/* Netlify Form */}
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="flex flex-col gap-8 text-left pb-10"
        >
          {/* Required hidden fields */}
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-5 text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/20"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-5 text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/20"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            required
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-5 text-base text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/20 resize-none"
          />

          <div className="flex items-center gap-4 pt-6">
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black hover:bg-neutral-200 transition"
            >
              Send
            </button>

            <button
              type="reset"
              className="text-sm text-neutral-400 hover:text-neutral-200 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}
