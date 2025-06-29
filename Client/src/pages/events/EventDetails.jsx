import { ImageHeader } from "@/components/ImageHeader";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import EventImage from "@/assets/images/blog.png";
import usePageTitle from "@/hooks/usePageTitle";

export const EventDetails = () => {
  usePageTitle("Event Details");
  // TODO : fix the styles later and also add skeleton
  return (
    <MainLayout>
      <div className="w-full px-4 sm:px-8 md:px-10 lg:px-20 py-10 flex flex-col h-full gap-3 lg:gap-7">
        {/* Header */}
        <ImageHeader imagePath={EventImage} variant="event" />
        {/* Event Details */}
        <div className="flex flex-col gap-10 text-black">
          {/* Event Intro Paragraph */}
          <p className="text-base leading-relaxed">
            Google I/O Extended is a community-led series of tech meetups that
            brings the excitement of Google I/O, an annual conference showcasing
            Google's latest developer solutions. It welcomes Google Developer
            Groups, Google Developer Student Clubs, Women Techmakers, and
            features appearances by Google Developer Experts and professionals.
          </p>

          {/* About this event Section */}
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">About this event</h2>

            <h3 className="text-xl font-semibold">
              Cloud Next Extended Lahore 2025
            </h3>
            <p>
              Cloud Next Extended Lahore 2025 Google I/O Extended serves as the
              community-led counterpart to Google I/O, a yearly conference
              orchestrated by Google, during which the global audience is
              introduced to Google’s most recent developer solutions, products,
              and technology advancements. The essence of Google I/O Cloud
              Lahore is extended through a sequence of community-led tech
              meetups known as Google I/O Extended. These meetups enable
              developers worldwide to experience the knowledge and enthusiasm
              shared at Google I/O on a local level in their respective cities.
            </p>
            <p>
              While Google I/O Extended primarily caters to Google Developer
              Groups events, we extend our warm invitation to Google Developer
              Student Clubs (GDSC) and Women Techmakers (WTM) to actively
              participate. Additionally, we are thrilled to feature appearances
              by Google Developer Experts at various Google I/O Extended Meetups
              throughout the season.
            </p>
          </section>

          {/* Guidelines Section */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">
              Cloud Next Extended Lahore 2025
            </h3>
            <h4 className="font-bold">
              Google Community Guidelines and Anti-Harassment Policy for
              In-Person and Virtual Events
            </h4>
            <p>
              Google is dedicated to providing a harassment-free and inclusive
              event experience for everyone regardless of gender identity and
              expression, sexual orientation, disabilities, neurodiversity,
              physical appearance, body size, ethnicity, nationality, race, age,
              religion, or other protected categories. We do not tolerate
              harassment of event participants in any form. Google takes
              violations of our policy seriously and will respond appropriately.
            </p>
            <p>
              All participants of Google events, including in-person and online
              attendees, event staff, speakers, and Googlers, must abide by the
              following policy:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Be respectful to each other. Treat everyone with respect.
                Participate while acknowledging that everyone deserves to be
                here — and each of us has the right to enjoy our experience
                without fear of harassment, discrimination, or condescension,
                whether blatant or via micro-aggressions. All forms of
                communication should not demean others. Consider what you are
                saying and how it would feel if it were said to you or about
                you.
              </li>
              <li>
                Speak up if you see or hear something. Harassment is not
                tolerated, and you are empowered to engage when you or others
                are disrespected politely. The person making you feel
                uncomfortable may not be aware of what they are doing, and
                politely bringing their behavior to their attention is
                encouraged.
              </li>
            </ul>
            <p>
              This policy extends to talks, forums, workshops, code labs, social
              media, all attendees, partners, sponsors, volunteers, staff, etc.
              You catch our drift. Google reserves the right to refuse
              admittance to or remove any person from, any Google-hosted event
              (including future Google events) at any time in its sole
              discretion. This includes but is not limited to, attendees
              behaving disorderly or failing to comply with this policy and the
              terms and conditions herein. If a participant engages in harassing
              or uncomfortable behavior, the conference organizers may take any
              action they deem appropriate, including warning or expelling the
              offender from the conference with no refund or blocking the
              offender’s account from participating online.
            </p>
          </section>
          {/* When / Where / Agenda Section */}
          <section
            className="p-6 md:p-8 rounded-xl shadow-sm flex flex-col gap-6"
            style={{
              background:
                "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base">
              {/* When */}
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>📅</span> When
                </h3>
                <p className="mt-1">Saturday, July 19, 2025</p>
                <p>9:30 AM – 3:00 PM (GMT+5)</p>
              </div>

              {/* Where */}
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>📍</span> Where
                </h3>
                <p className="mt-1">
                  Arfa Software Technology Park, 346b Lahore –<br />
                  Kasur Road Lahore, 54000
                </p>
              </div>
            </div>

            {/* Agenda */}
            <div className="mt-2">
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <span>📝</span> Agenda
              </h3>
              <ul className="space-y-4 text-sm md:text-base">
                <li>
                  <span className="font-semibold">9:30 AM</span> – Registration
                  + Refreshment + Networking
                </li>
                <li>
                  <span className="font-semibold">11:00 AM</span> – Welcome and
                  Introduction
                  <br />
                  <span className="text-sm text-gray-700">
                    Syed Asad Raza (DevOps Engineer @Ascend | Community Manger
                    @GDG Cloud Lahore)
                  </span>
                </li>
                <li>
                  <span className="font-semibold">11:30 AM</span> – The Art of
                  Giving and Receiving Feedback: Enhancing Communication and
                  Growth
                  <br />
                  <span className="text-sm text-gray-700">Speaker googler</span>
                </li>
                <li>
                  <span className="font-semibold">12:15 PM</span> – Innovation
                  and Impact: GDE Contributions to the AI and Cloud Ecosystem
                  <br />
                  <span className="text-sm text-gray-700">Speaker</span>
                </li>
                <li>
                  <span className="font-semibold">12:50 PM</span> – Behind the
                  Scenes: Q&A with a Google Product Manager
                  <br />
                  <span className="text-sm text-gray-700">Speaker</span>
                </li>
                <li>
                  <span className="font-semibold">3:00 PM</span> – Closing Note
                  + Food + Networking
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};
