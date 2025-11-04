import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#3b255f] min-h-[600px]">
      {/* Decorative Mandala - Left Side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 top-1/2 bottom-0 -translate-y-1/2 z-10 hidden md:block"
      >
        <div className="absolute w-[580px] h-[440px] top-0 my-auto">
          <Image
            src="/chakra-2.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 py-24 md:py-32 mx-auto max-w-7xl">
        <h1 className="text-purple-200 text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] uppercase leading-tight font-serif font-bold ">
          ABOUT CHAKRA HEALING
          <br />
          CENTER
        </h1>
      </div>

      {/* Wave Container */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        {/* Back Wave Layer (Lighter Purple) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-[180px] md:h-[220px] opacity-50"
        >
          <path
            fill="#b8a8d1"
            fillOpacity="0.6"
            d="M0,64L80,53.3C160,43,320,21,480,48C640,75,800,149,960,186.7C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        {/* Front Wave Layer (Cream/Beige) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-[160px] md:h-[200px]"
        >
          <path
            fill="#f5f5f0"
            fillOpacity="1"
            d="M0,320L80,314.7C160,309,320,299,480,245.3C640,192,800,96,960,64C1120,32,1280,64,1360,80L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
}

// import Image from "next/image";

// export default function AboutHero() {
//   return (
//     <section className="relative overflow-hidden bg-[#3b255f] pb-0">
//       {/* Decorative Mandala - Left Side */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -left-12 top-1/2 bottom-0 -translate-y-1/2 z-10 hidden md:block"
//       >
//         <div className="relative w-[540px] h-[380px]">
//           <Image
//             src="/group 1.png"
//             alt=""
//             fill
//             className="object-contain"
//             priority
//           />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 text-center px-4 pt-24 pb-32 md:pt-32 md:pb-40 mx-auto max-w-7xl">
//         <h1 className="text-purple-200 text-4xl md:text-5xl lg:text-6xl tracking-[0.1em] uppercase leading-tight font-serif font-bold">
//           ABOUT CHAKRA HEALING
//           <br />
//           CENTER
//         </h1>
//       </div>

//       {/* Wave Container - Simple curved layers */}
//       <div className="absolute bottom-0 left-0 w-full h-[280px] md:h-[350px]">
//         {/* Back Layer (Lighter Purple/Lavender) - Simple curve */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 320"
//           preserveAspectRatio="none"
//           className="absolute bottom-0 left-0 w-full h-full"
//         >
//           <path
//             fill="#9b8bb5"
//             fillOpacity="0.9"
//             d="M0,120 Q360,200 720,200 T1440,120 L1440,320 L0,320 Z"
//           />
//         </svg>

//         {/* Front Layer (Cream/Beige) - Simple curve overlapping */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 320"
//           preserveAspectRatio="none"
//           className="absolute bottom-0 left-0 w-full h-full"
//         >
//           <path
//             fill="#f5f5f0"
//             fillOpacity="1"
//             d="M0,200 Q360,280 720,280 T1440,200 L1440,320 L0,320 Z"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }