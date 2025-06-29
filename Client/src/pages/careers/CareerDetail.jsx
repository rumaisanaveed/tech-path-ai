import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { ImageHeader } from "./components/ImageHeader";
import CareerBg from "@/assets/images/career-bg.png";
import { CareerDetailSkeleton } from "@/components/skeletons/careers/CareerDetailsSkeleton";

export const CareerDetail = () => {
  usePageTitle("Career Details");
  const isLoading = false;
  return (
    <MainLayout>
      {isLoading ? <CareerDetailSkeleton /> : <CareerDetails />}
    </MainLayout>
  );
};

const CareerDetails = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 px-6 py-10 md:px-12 lg:px-24">
      <ImageHeader bgImage={CareerBg} heading="Frontend Developer" />
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 text-black">
        {/* Overview Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Overview – What the Career is About
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Frontend Developers are responsible for crafting the part of a
            website or web application that users interact with directly. They
            transform designs into code using HTML, CSS, and JavaScript,
            ensuring a seamless, responsive, and interactive user experience.
            Everything from layout, animations, and buttons to form interactions
            and performance optimization falls under the frontend umbrella.
          </p>
        </section>

        {/* Career Opportunities */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Career Opportunities
          </h2>
          <p className="mb-2 md:mb-4">
            There are several specializations within the frontend world:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Frontend Web Developer</strong> – Focuses on web browsers
              and responsive websites.
            </li>
            <li>
              <strong>UI Developer</strong> – Works closely with designers to
              fine-tune visuals and interaction.
            </li>
            <li>
              <strong>Mobile Frontend Developer</strong> – Uses tools like React
              Native or Flutter to build mobile interfaces.
            </li>
            <li>
              <strong>Email Template Developer</strong> – Specializes in
              creating responsive HTML emails.
            </li>
            <li>
              <strong>Accessibility Engineer</strong> – Ensures interfaces meet
              accessibility standards (WCAG).
            </li>
          </ul>
        </section>

        {/* Important Facts */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Important Facts
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Median Global Salary:</strong> $70,000/year (varies by
              region and experience)
            </li>
            <li>
              <strong>Typical Working Hours:</strong> 40 hours/week, flexible
              for remote roles
            </li>
            <li>
              <strong>Required Skills:</strong> HTML, CSS, JavaScript, React.js
              or Vue.js, Git
            </li>
            <li>
              <strong>Popular Tools:</strong> VS Code, Figma, Chrome DevTools,
              Postman
            </li>
            <li>
              <strong>Work Environment:</strong> Tech companies, design
              agencies, freelance, remote-first teams
            </li>
          </ul>
        </section>

        {/* What Does a Frontend Developer Do */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            What Does a Frontend Developer Do?
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            The daily life of a frontend developer is a mix of coding,
            problem-solving, and creative thinking. You’ll spend much of your
            time writing code — building layouts with HTML and CSS, scripting
            interactivity with JavaScript, and working with APIs to fetch and
            display dynamic data. You’ll test your work across different
            browsers and devices, optimize for performance and accessibility,
            and make sure your interfaces follow modern usability standards. You
            might work independently on smaller projects or be part of an agile
            team in a larger organization, participating in sprints, reviews,
            and planning sessions.
          </p>
        </section>

        {/* Pros and Cons */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Pros and Cons of Being a Frontend Developer
          </h2>
          <p className="mb-4">
            There’s a lot to love about being a frontend developer. The role is
            high in demand and allows for creativity, problem-solving, and
            constant learning. With the rise of remote work, many frontend
            developers enjoy flexible working conditions and even freelance or
            contract opportunities.
          </p>
          <p>
            However, it’s not without challenges. The frontend world evolves
            rapidly — what’s popular today (like React) could be replaced
            tomorrow. Browser inconsistencies, CSS quirks, and constantly
            shifting requirements can sometimes lead to frustration. It also
            requires ongoing learning and adaptability to stay relevant.
          </p>
        </section>

        {/* How to Become */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            How to Become a Frontend Developer
          </h2>
          <p className="mb-2 md:mb-4">
            You don’t necessarily need a formal degree to become a frontend
            developer — although a background in Computer Science or Software
            Engineering can be helpful. Many successful frontend developers are
            self-taught or come from bootcamps. What matters most is your
            portfolio and your understanding of the core technologies.
          </p>
          <p className="mb-2 md:mb-4">
            A strong grasp of HTML, CSS, and JavaScript is essential. From
            there, you can learn modern frameworks like React or Vue, master
            version control with Git, and explore tools like Webpack or Tailwind
            CSS. Online courses and certifications can boost your resume, such
            as Meta’s Front-End Developer certification or programs offered by
            platforms like freeCodeCamp, Udemy, and Coursera.
          </p>
          <p>
            Above all, the best way to learn is by doing. Build projects,
            contribute to open source, and keep exploring new trends and tools
            in the ever-evolving world of frontend development.
          </p>
        </section>

        {/* Resources to Get Started */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">
            Resources to Get Started
          </h2>

          <div className="mb-2 md:mb-4">
            <h3 className="text-xl font-semibold mb-2">
              Free Courses & Platforms
            </h3>
            <ul className="list-disc list-inside marker:text-custom-text-orange space-y-1">
              <li>
                <span className="text-custom-text-orange font-medium">
                  freeCodeCamp – Responsive Web Design:&nbsp;
                </span>
                Covers HTML, CSS, Flexbox, and Grid in an interactive format.
              </li>
              <li>
                <span className="text-custom-text-orange font-medium">
                  The Odin Project:&nbsp;
                </span>
                A full curriculum covering HTML, CSS, JS, Git, and React.
              </li>
              <li>
                <span className="text-custom-text-orange font-medium">
                  Frontend Mentor:&nbsp;
                </span>
                Practice real-world projects and improve HTML/CSS skills.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">
              Paid Courses & Certifications
            </h3>
            <ul className="list-disc list-inside marker:text-custom-text-orange space-y-1">
              <li>
                <span className="font-medium text-custom-text-orange">
                  Meta Front-End Developer Professional Certificate
                  (Coursera):&nbsp;
                </span>
                Industry-backed certification with a full beginner-to-advanced
                curriculum.
              </li>
              <li>
                <span className="font-medium text-custom-text-orange">
                  Scrimba Frontend Career Path:&nbsp;
                </span>
                Practical, project-based learning with a built-in community.
              </li>
              <li>
                <span className="font-medium text-custom-text-orange">
                  Frontend Masters:&nbsp;
                </span>
                Advanced, deep-dive content by top professionals in the field.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};
