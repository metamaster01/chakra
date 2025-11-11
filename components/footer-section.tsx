// "use client"

// import { motion } from "framer-motion"
// import Image from "next/image"

// export function FooterSection() {
//   const companyLinks = [
//     { name: "Home", href: "#" },
//     { name: "About us", href: "#" },
//     { name: "Services", href: "#" },
//     { name: "Products", href: "#" },
//     { name: "Booking", href: "#" },
//     { name: "Contact", href: "#" },
//   ]

//   return (
//     <footer className="relative bg-amber-100 text-gray-900">
//       <div className="relative z-10 pt-20 pb-8 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//             {/* Logo and Custom Image Area */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="lg:col-span-1"
//             >
//               <Image src="/logo-2.png" alt="chakra logo" width={40} height={40} className="w-30 h-30" />

//               {/* Custom image area for user */}
// {/*              
//                 <Image src="/logo.png" alt="logo" width={40} height={40}  className="absolute bottom-0 left-0"/>
//                */}
//             </motion.div>

//             {/* Company Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="font-serif text-xl mb-6 text-gray-900">Company</h3>
//               <ul className="space-y-3">
//                 {companyLinks.map((link, index) => (
//                   <li key={index}>
//                     <a href={link.href} className="text-gray-700 hover:text-gray-900 transition-colors duration-200">
//                       {link.name}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="font-serif text-xl mb-6 text-gray-900">Contact info</h3>
//               <div className="space-y-3">
//                 <p className="text-gray-700">
//                   Hong Kong Bazaar,
//                   <br />
//                   Sector 57, Gurgaon
//                 </p>
//                 <p className="text-gray-700">+91 98765 43210</p>
//                 <p className="text-gray-700">info@chakra.com</p>
//               </div>
//             </motion.div>

//             {/* Social Media and Connect */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               viewport={{ once: true }}
//               className="lg:col-span-1"
//             >
//               <div className="flex gap-4 mb-8">
//                 {/* TikTok Icon */}
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
//                   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z" />
//                   </svg>
//                 </div>

//                 {/* Instagram Icon */}
//                 <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-colors">
//                   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                   </svg>
//                 </div>

//                 {/* YouTube Icon */}
//                 <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
//                   <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Connect With Us */}
//               <div className="text-right">
//                 <h2 className="font-serif text-4xl md:text-5xl text-balance leading-tight text-amber-800">
//                   Connect
//                   <br />
//                   With Us!
//                 </h2>
//               </div>
//             </motion.div>
//           </div>

//           {/* Girl Image - Hidden on Mobile */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="hidden md:block absolute bottom-0 left-8 lg:left-16"
//           >
//             <div className="relative">
//               {/* Decorative mandala pattern */}
//               <div className="absolute inset-0 w-64 h-64 opacity-20">
//                 <svg viewBox="0 0 200 200" className="w-full h-full text-amber-600">
//                   <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
//                   <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
//                   <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
//                   <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
//                 </svg>
//               </div>

//               {/* Girl in yoga pose */}
//               <img
//                 src="/footer-bg.png"
//                 alt="Woman in yoga pose"
//                 className="relative z-10 w-48 h-72 object-cover rounded-t-full"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </footer>
//   )
// }

"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function FooterSection() {
  const companyLinks = [
    { name: "Home", href: "#" },
    { name: "About us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Products", href: "#" },
    { name: "Booking", href: "#" },
    { name: "Contact", href: "#" },
  ]

  return (
    <footer className="relative bg-[#C9A882] overflow-hidden">
      {/* Wavy top border */}
      {/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-24"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#3D2F7A]"
          ></path>
        </svg>
      </div> */}

      {/* Desktop Layout */}
      <div className="hidden md:block relative z-10 pt-32  px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {/* Left Section - Logo and Centered Image with Chakra */}
            <div className="col-span-4 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Image 
                  src="/logo-2.png" 
                  alt="Chakra Logo" 
                  width={150} 
                  height={150} 
                  className="w-32 h-32 lg:w-40 lg:h-40"
                />
              </motion.div>

              {/* Centered Woman with Rotating Chakra Background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-center justify-center"
              >
                {/* Glowing backdrop */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[400px] h-[400px] lg:w-[480px] lg:h-[480px] bg-gradient-radial from-amber-300/30 via-amber-400/10 to-transparent rounded-full blur-3xl"></div>
                </div>
                
                {/* Rotating Chakra - Centered */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="absolute w-[580px] h-[580px] lg:w-[580px] lg:h-[580px]">
                    <div className="absolute inset-0 bg-gradient-radial from-purple-400/25 via-pink-300/15 to-transparent rounded-full blur-2xl"></div>
                    <Image
                      src="/chakra-3.png"
                      alt="Mandala decoration"
                      width={600}
                      height={600}
                      className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]"
                    />
                  </div>
                </motion.div>

                {/* Woman Image - Perfectly Centered */}
                {/* <div className="relative z-10 flex items-center justify-center">
                  <img
                    src="/footer-bg-2.png"
                    alt="Woman in meditation"
                    className="w-60 h-auto lg:w-80 object-contain drop-shadow-2xl flex right-10 "

                  />
                </div> */}

                <div className="relative z-10 flex items-center justify-center translate-x-6 lg:translate-x-10">
  <img
    src="/footer-bg-2.png"
    alt="Woman in meditation"
    className="w-60 h-auto lg:w-80 object-contain drop-shadow-2xl"
  />
</div>
              </motion.div>
            </div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="col-span-3"
            >
              <h3 className="text-white text-xl lg:text-2xl mb-6 font-normal">
                Company
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-white hover:text-gray-200 transition-colors duration-200 text-base lg:text-lg block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-span-2"
            >
              <h3 className="text-white text-xl lg:text-2xl mb-6 font-normal">
                Contact info
              </h3>
              <div className="space-y-4 text-white">
                <p className="text-base lg:text-lg leading-relaxed">
                  Hong Kong Bazaar,
                  <br />
                  Sector 57, Gurgaon
                </p>
                <p className="text-base lg:text-lg">+91 98765 43210</p>
              </div>
            </motion.div>

            {/* Social Media and Connect With Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-span-3 flex flex-col justify-between"
            >
              {/* Social Icons */}
              <div className="flex gap-4 mb-8">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a 
                  href="#" 
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a 
                  href="#" 
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              {/* Connect With Us Text */}
              <div className="text-right">
                <h2 className="font-serif text-6xl lg:text-7xl xl:text-8xl leading-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Connect
                  <br />
                  With Us!
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Redesigned */}
      <div className="md:hidden relative z-10 pt-28 pb-10 px-6">
        <div className="max-w-md mx-auto">
          {/* Logo - Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mb-10"
          >
            <Image 
              src="/logo-2.png" 
              alt="Chakra Logo" 
              width={100} 
              height={100} 
              className="w-24 h-24"
            />
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-white text-2xl mb-5 font-normal text-center">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href={link.href} 
                    className="text-white hover:text-gray-200 transition-colors duration-200 text-base block text-center py-1"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h3 className="text-white text-2xl mb-5 font-normal">
              Contact info
            </h3>
            <div className="space-y-3 text-white">
              <p className="text-base leading-relaxed">
                Hong Kong Bazaar,
                <br />
                Sector 57, Gurgaon
              </p>
              <p className="text-base">+91 98765 43210</p>
            </div>
          </motion.div>

          {/* Social Icons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-5 mb-10"
          >
            <motion.a 
              href="#" 
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
              aria-label="Facebook"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-7 h-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>

            <motion.a 
              href="#" 
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
              aria-label="Instagram"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-7 h-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>

            <motion.a 
              href="#" 
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
              aria-label="YouTube"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-7 h-7 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Connect With Us - Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-5xl leading-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Connect
              <br />
              With Us!
            </h2>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}