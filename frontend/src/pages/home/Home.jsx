import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  BriefcaseBusiness,
  CalendarCheck2,
  BadgeCheck,
  HeartHandshake,
  Clock3,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";

// ADD THIS
import { motion } from "motion/react";

import hero1 from "../../assets/hero/hero-1.webp";
import hero2 from "../../assets/hero/hero-2.webp";
import hero3 from "../../assets/hero/hero-3.webp";
import hero4 from "../../assets/hero/hero-4.webp";


const heroImages = [
  hero1,
  hero2,
  hero3,
  hero4,
];


const Home = () => {

  const [currentImage, setCurrentImage] = useState(0);


  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage(
        (previousImage) =>
          (previousImage + 1) %
          heroImages.length
      );

    }, 6000);


    return () => {
      clearInterval(interval);
    };

  }, []);


  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f6] text-gray-900">


      {/* ================= HERO SECTION ================= */}

      <section className="relative">

        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-lime-100/50 blur-3xl" />


        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">


            {/* HERO TEXT */}

            <motion.div
              initial={{
                opacity: 0,
                x: -60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
            >

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 shadow-sm"
              >

                <Sparkles
                  size={16}
                  className="text-emerald-600"
                />

                <span className="text-sm font-semibold text-emerald-700">
                  Trusted professionals. Better services.
                </span>

              </motion.div>


              <motion.h1
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-gray-950 sm:text-6xl lg:text-7xl"
              >

                Find the right

                <span className="relative mx-2 inline-block text-emerald-600">
                  professional
                </span>

                for every job.

              </motion.h1>


              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                }}
                className="mt-7 max-w-xl text-lg leading-8 text-gray-600"
              >

                ServiceHub makes it simple to discover trusted local
                professionals, compare services, and book the help
                you need — all in one place.

              </motion.p>


              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.7,
                }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >

                <Link
                  to="/services"
                  className="group flex items-center gap-3 rounded-full bg-gray-950 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
                >

                  Explore Services

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>


                <Link
                  to="/register"
                  className="rounded-full border border-gray-300 bg-white px-7 py-4 text-sm font-semibold text-gray-800 transition duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg"
                >
                  Get Started
                </Link>

              </motion.div>


              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.9,
                }}
                className="mt-9 flex flex-wrap gap-x-6 gap-y-3"
              >

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-600"
                  />
                  Verified providers
                </div>


                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-600"
                  />
                  Easy booking
                </div>


                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-600"
                  />
                  Trusted services
                </div>

              </motion.div>

            </motion.div>


            {/* HERO IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                x: 60,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: "easeOut",
              }}
              className="relative"
            >

              <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-gray-200 shadow-2xl shadow-gray-900/10">

                <div className="absolute inset-0">

                  {heroImages.map(
                    (image, index) => (

                      <img
                        key={image}
                        src={image}
                        alt="ServiceHub professional service"
                        className={`
                          absolute
                          inset-0
                          h-full
                          w-full
                          object-cover
                          transition-opacity
                          duration-[2000ms]
                          ease-in-out
                          ${currentImage === index
                            ? "opacity-100 animate-hero-zoom"
                            : "opacity-0"
                          }
                        `}
                      />

                    )
                  )}

                  <div className="absolute inset-0 bg-black/20" />

                </div>


                <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/30 bg-black/20 px-3 py-2 backdrop-blur-md">

                  {heroImages.map(
                    (_, index) => (

                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          setCurrentImage(index)
                        }
                        aria-label={`Show hero image ${index + 1}`}
                        className={`
                          h-2
                          rounded-full
                          transition-all
                          duration-500
                          ${currentImage === index
                            ? "w-7 bg-white"
                            : "w-2 bg-white/60 hover:bg-white"
                          }
                        `}
                      />

                    )
                  )}

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      <motion.section
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.7,
        }}
        className="border-y border-gray-200 bg-white"
      >

        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">

          {[
            ["100+", "Professional Services"],
            ["50+", "Trusted Providers"],
            ["500+", "Successful Bookings"],
            ["4.9/5", "Customer Satisfaction"],
          ].map(
            ([value, label], index) => (

              <motion.div
                key={label}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="border-b border-gray-200 px-6 py-9 text-center md:border-b-0 md:border-r last:border-r-0"
              >

                <p className="text-3xl font-bold tracking-tight text-gray-950">
                  {value}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {label}
                </p>

              </motion.div>

            )
          )}

        </div>

      </motion.section>

      <section className="bg-[#f7f8f6] py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">


          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >

            <div className="max-w-2xl">

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                Explore services
              </span>

              <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
                Whatever you need,
                <span className="text-emerald-600">
                  {" "}we help you find it.
                </span>
              </h2>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Discover professionals across popular service categories
                and find the right person for your next project.
              </p>

            </div>


            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-bold text-gray-900 transition hover:text-emerald-700"
            >
              View all services

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </motion.div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: BriefcaseBusiness,
                title: "Home Services",
                text: "Find trusted professionals for your home and everyday needs.",
              },
              {
                icon: Users,
                title: "Personal Services",
                text: "Connect with skilled professionals for personal services.",
              },
              {
                icon: Sparkles,
                title: "Creative Services",
                text: "Work with creative professionals who bring your ideas to life.",
              },
              {
                icon: ShieldCheck,
                title: "Professional Services",
                text: "Find experienced professionals ready to help with your goals.",
              },
            ].map(
              (
                {
                  icon: Icon,
                  title,
                  text,
                },
                index
              ) => (

                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 70,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                >

                  <Link
                    to="/services"
                    className="group relative block overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
                  >

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 transition duration-300 group-hover:bg-emerald-600">

                      <Icon
                        size={25}
                        className="text-emerald-700 transition group-hover:text-white"
                      />

                    </div>

                    <h3 className="mt-7 text-xl font-bold text-gray-950">
                      {title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {text}
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-700">

                      Explore

                      <ChevronRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />

                    </div>

                  </Link>

                </motion.div>

              )
            )}

          </div>

        </div>

      </section>

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">


          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mx-auto max-w-3xl text-center"
          >

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Simple process
            </span>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Get things done
              <span className="text-emerald-600">
                {" "}without the hassle.
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              ServiceHub keeps the entire experience simple,
              from discovering a service to getting the job done.
            </p>

          </motion.div>


          <div className="relative mt-16 grid gap-6 md:grid-cols-3">

            <div className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200 md:block" />


            {[
              {
                icon: Search,
                step: "Step 01",
                title: "Discover",
                text: "Search and explore services from professionals based on your needs and location.",
              },
              {
                icon: BadgeCheck,
                step: "Step 02",
                title: "Choose",
                text: "Compare available options and select the professional that fits your requirements.",
              },
              {
                icon: CalendarCheck2,
                step: "Step 03",
                title: "Book",
                text: "Confirm your booking and manage your service experience easily through ServiceHub.",
              },
            ].map(
              (
                {
                  icon: Icon,
                  step,
                  title,
                  text,
                },
                index
              ) => (

                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    y: 80,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                  }}
                  className="group relative rounded-3xl border border-gray-200 bg-[#f7f8f6] p-8 transition duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
                >

                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">

                    <Icon
                      size={27}
                      className="text-emerald-600"
                    />

                  </div>

                  <span className="mt-8 block text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                    {step}
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-gray-950">
                    {title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {text}
                  </p>

                </motion.div>

              )
            )}

          </div>

        </div>

      </section>

      <motion.section
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.8,
        }}
        className="bg-[#f7f8f6] py-24"
      >

        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              x: -70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Why ServiceHub
            </span>

            <h2 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              A smarter way to
              <span className="text-emerald-600">
                {" "}get things done.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              We connect customers with professionals through
              a simple, transparent, and reliable marketplace.
            </p>


            <div className="mt-10 space-y-6">

              {[
                {
                  icon: ShieldCheck,
                  title: "Trusted Professionals",
                  text: "Discover professionals with clear service information and transparent profiles.",
                },
                {
                  icon: HeartHandshake,
                  title: "Simple Experience",
                  text: "Everything you need to discover, choose, and manage services in one place.",
                },
                {
                  icon: Clock3,
                  title: "Save Time",
                  text: "Quickly find the right service without wasting time searching everywhere.",
                },
              ].map(
                (
                  {
                    icon: Icon,
                    title,
                    text,
                  },
                  index
                ) => (

                  <motion.div
                    key={title}
                    initial={{
                      opacity: 0,
                      x: -30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                    }}
                    className="flex gap-4"
                  >

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100">

                      <Icon
                        size={22}
                        className="text-emerald-700"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold text-gray-950">
                        {title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {text}
                      </p>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          </motion.div>


          <motion.div
            initial={{
              opacity: 0,
              x: 70,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
            }}
            className="relative"
          >

            <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-8 text-white shadow-2xl md:p-10">

              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-600/20 blur-2xl" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm font-medium text-gray-400">
                      ServiceHub Marketplace
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      Everything connected.
                    </h3>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">

                    <Sparkles size={22} />

                  </div>

                </div>


                <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs text-gray-500">
                        Current activity
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        Service journey
                      </p>

                    </div>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                      Active
                    </span>

                  </div>


                  <div className="mt-7 space-y-4">

                    {[
                      {
                        icon: Search,
                        title: "Service discovered",
                        text: "Find the right professional",
                      },
                      {
                        icon: Users,
                        title: "Provider selected",
                        text: "Choose with confidence",
                      },
                      {
                        icon: CalendarCheck2,
                        title: "Booking managed",
                        text: "Everything in one place",
                      },
                    ].map(
                      (
                        {
                          icon: Icon,
                          title,
                          text,
                        },
                        index
                      ) => (

                        <motion.div
                          key={title}
                          initial={{
                            opacity: 0,
                            x: 30,
                          }}
                          whileInView={{
                            opacity: 1,
                            x: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.15,
                          }}
                          className="flex items-center gap-4 rounded-2xl bg-white/5 p-4"
                        >

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600">

                            <Icon size={18} />

                          </div>

                          <div className="flex-1">

                            <p className="text-sm font-semibold">
                              {title}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {text}
                            </p>

                          </div>

                          <CheckCircle2
                            size={18}
                            className="text-emerald-400"
                          />

                        </motion.div>

                      )
                    )}

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </motion.section>

      <section className="bg-white py-24">

        <div className="mx-auto max-w-7xl px-5 lg:px-8">

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="mx-auto max-w-3xl text-center"
          >

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
              Built for everyone
            </span>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              One platform.
              <span className="text-emerald-600">
                {" "}Two sides.
              </span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Whether you need a professional or offer a service,
              ServiceHub helps you connect with the right people.
            </p>

          </motion.div>


          <div className="mt-14 grid gap-6 lg:grid-cols-2">


            <motion.div
              initial={{
                opacity: 0,
                x: -70,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
              }}
              className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f7f8f6] p-8 md:p-10 transition duration-500 hover:border-emerald-200 hover:shadow-xl"
            >

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-100 blur-3xl transition group-hover:bg-emerald-200" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">

                  <Users size={25} />

                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                  For Customers
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                  Find the right help.
                </h3>

                <p className="mt-4 max-w-lg leading-7 text-gray-600">
                  Discover services, compare professionals,
                  and manage your bookings through one simple platform.
                </p>

                <ul className="mt-7 space-y-3">

                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={17} className="text-emerald-600" />
                    Explore available services
                  </li>

                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={17} className="text-emerald-600" />
                    Compare professional options
                  </li>

                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={17} className="text-emerald-600" />
                    Manage your bookings
                  </li>

                </ul>

                <Link
                  to="/services"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
                >

                  Browse Services

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />

                </Link>

              </div>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 70,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="group relative overflow-hidden rounded-[2rem] bg-gray-950 p-8 text-white shadow-xl md:p-10"
            >

              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-600/20 blur-3xl" />

              <div className="relative">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600">

                  <BriefcaseBusiness size={25} />

                </div>

                <p className="mt-7 text-sm font-bold uppercase tracking-[0.18em] text-emerald-400">
                  For Providers
                </p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight">
                  Grow your service.
                </h3>

                <p className="mt-4 max-w-lg leading-7 text-gray-400">
                  Showcase your skills, reach new customers,
                  and manage your services through ServiceHub.
                </p>

                <ul className="mt-7 space-y-3">

                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle2 size={17} className="text-emerald-400" />
                    Create your professional profile
                  </li>

                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle2 size={17} className="text-emerald-400" />
                    List and manage your services
                  </li>

                  <li className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle2 size={17} className="text-emerald-400" />
                    Connect with new customers
                  </li>

                </ul>

                <Link
                  to="/register"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition hover:bg-emerald-500 hover:text-white"
                >

                  Become a Provider

                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />

                </Link>

              </div>

            </motion.div>

          </div>

        </div>

      </section>

      <section className="bg-[#f7f8f6] px-5 py-24">

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.96,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-emerald-600 px-6 py-16 text-center shadow-2xl shadow-emerald-900/10 md:px-12 md:py-20"
        >

          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-emerald-900/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur"
            >

              <Sparkles size={25} />

            </motion.div>


            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-emerald-50">
              Your next service is closer than you think
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Ready to find the right professional?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
              Explore available services, discover trusted professionals,
              and make your next booking with confidence.
            </p>


            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">

              <Link
                to="/services"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-gray-950 transition duration-300 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl"
              >

                Browse Services

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </Link>


              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >

                Get Started

                <ArrowUpRight size={18} />

              </Link>

            </div>

          </div>

        </motion.div>

      </section>

      <footer className="border-t border-gray-200 bg-gray-950 text-white">

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mx-auto max-w-7xl px-5 py-16 lg:px-8"
        >

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">


            <div className="lg:col-span-2">

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >

                <img
                  src="/servicehub_icon.svg"
                  alt="ServiceHub logo"
                  className="h-11 w-11 object-contain"
                />

                <span className="text-2xl font-bold tracking-tight">
                  ServiceHub
                </span>

              </Link>


              <p className="mt-5 max-w-md leading-7 text-gray-400">
                A modern service marketplace connecting customers
                with trusted professionals for everyday needs.
              </p>


              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">

                <CheckCircle2
                  size={16}
                  className="text-emerald-500"
                />

                Trusted services. Better connections.

              </div>

            </div>


            <div>

              <h3 className="font-bold text-white">
                Platform
              </h3>

              <ul className="mt-5 space-y-3">

                <li>
                  <Link
                    to="/services"
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    Browse Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    Get Started
                  </Link>
                </li>

                <li>
                  <Link
                    to="/login"
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    Sign In
                  </Link>
                </li>

              </ul>

            </div>


            <div>

              <h3 className="font-bold text-white">
                ServiceHub
              </h3>

              <ul className="mt-5 space-y-3">

                <li>
                  <Link
                    to="/"
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    to="/services"
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="text-sm text-gray-400 transition hover:text-emerald-400"
                  >
                    Become a Provider
                  </Link>
                </li>

              </ul>

            </div>

          </div>


          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

            <p>
              © {new Date().getFullYear()} ServiceHub. All rights reserved.
            </p>

            <div className="flex items-center gap-5">

              <span className="transition hover:text-gray-300">
                Privacy
              </span>

              <span className="transition hover:text-gray-300">
                Terms
              </span>

            </div>

          </div>

        </motion.div>

      </footer>

    </div>
  );
};

export default Home;