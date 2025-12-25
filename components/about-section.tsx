"use client"

export default function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">About Us</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            A Community of <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Nallamala House stands as a beacon of prestige and community at IIT Madras, fostering innovation,
            leadership, and lifelong bonds among its residents.
          </p>
        </div>

        {/* About Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-white">Our Mission</h3>
              <p className="text-white/70 leading-relaxed">
                We are committed to creating an environment where students not only pursue academic excellence but also
                develop as leaders, innovators, and responsible global citizens.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-white">Our Values</h3>
              <ul className="space-y-3">
                {[
                  "Unity & Inclusivity",
                  "Excellence in All Endeavors",
                  "Innovation & Creativity",
                  "Leadership & Impact",
                ].map((value) => (
                  <li key={value} className="flex items-center space-x-3 text-white/80">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { number: "4500+", label: "Active Members" },
              { number: "50+", label: "Distinguished Alumni" },
              { number: "5", label: "Active Communities" },
              { number: "120+", label: "Events Hosted" },
              { number: "15+", label: "Team Size" },
              { number: "100+", label: "Meetups Organized" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-dark p-6 rounded-xl border border-primary/20 hover:border-primary/50 transition-all duration-300 text-center group"
              >
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
