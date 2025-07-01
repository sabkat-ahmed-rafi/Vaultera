import localFont from "next/font/local";

const blackHanSans = localFont({
  src: "../../fonts/BlackHanSans.ttf",
  variable: "--font-black-han-sans",
  weight: "400",
});

const Logo = () => {
  return (
    <section className='flex justify-center'>
        <div className='text-center p-5 select-none inline-block'>
          <h1 
           style={{ fontFamily: 'var(--font-black-han-sans)' }} 
           className={`${blackHanSans.variable} md:text-5xl text-3xl`}
           >
            Vaultera
          </h1>
          <p
           className={`md:text-[13px] text-[10px] italic font-thin`}
           >
            Every Secret, Sealed Tight ⚡︎
          </p>
        </div>
    </section>
  )
}

export default Logo