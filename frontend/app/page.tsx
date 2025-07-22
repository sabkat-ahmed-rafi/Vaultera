import Navbar from "@/components/Navbar/Navbar";
import MasterPasswordGuard from "@/components/others/MasterPasswordGuard";

export default function Home() {
  return (
    <MasterPasswordGuard>
     <div>
       <Navbar />
     </div>
      <section className="relative pt-64 px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
              Welcome to{' '}
              <span className="text-gray-300">
                NextApp
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
              Experience the power of modern web development with our stunning, 
              responsive navbar and beautiful user interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
       <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
              Welcome to{' '}
              <span className="text-gray-300">
                NextApp
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
              Experience the power of modern web development with our stunning, 
              responsive navbar and beautiful user interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
       <section className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
              Welcome to{' '}
              <span className="text-gray-300">
                NextApp
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
              Experience the power of modern web development with our stunning, 
              responsive navbar and beautiful user interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:border-white/40 hover:bg-white/10 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </MasterPasswordGuard>
  );
}
