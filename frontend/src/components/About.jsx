import HomeNavBar from './HomeNavBar'
import { FaRobot, FaBookOpen, FaHistory, FaHeart } from "react-icons/fa";
function About(){
   const features = [
    {
      icon: <FaRobot />,
      title: "AI-Powered Recipes",
      description:
        "Generate complete recipes instantly with the help of artificial intelligence.",
    },
    {
      icon: <FaBookOpen />,
      title: "Step-by-Step Instructions",
      description:
        "Easy-to-follow cooking instructions for beginners and experienced cooks.",
    },
   
    {
      icon: <FaHeart />,
      title: "Save Favorites",
      description:
        "Keep track of your favorite recipes and access them anytime.",
    } ,
    {
  icon: <FaHistory />,
  title: "Cooking History",
  description:
    "Access previously generated recipes anytime and continue your cooking journey."
},
  ];
return(

  
<div className='min-h-screen bg-[#D3EEE1] overflow-hidden py-6 '>
  <div className='p-4'>

  <HomeNavBar/>
  </div>
  <div className='flex flex-col   lg:flex-row  relative '>
  
<div className='space-y-5 max-w-xl mx-auto lg:mx-0 lg:space-y-6 lg:w-1/2 flex flex-col  justify-center px-8 lg:px-16 py-8 text-center lg:text-left lg:py-0 z-10'>
  <h1 className='font-extrabold text-4xl sm:text-5xl  lg:text-7xl  leading-tight'> Why choose, <span className='text-[#297B41]'>AI Recipe Finder</span></h1>
  <p className='max-w-md mt-6 text-base md:text-lg  text-gray-600'> Discover recipes, cooking tips, and meal inspiration powered by AI.
            Make cooking easier, faster, and more enjoyable.</p>
 
</div>
  <div className=' w-full lg:w-1/2  flex   lg:rounded-l-[60px] rounded-t-[50px]  lg:rounded-t-none items-center justify-center pt-12 p-6 flex-1'>
      
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#F8FAF9] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-[#297B41] text-4xl mb-4">
                {feature.icon}
              </div>

              <h3 className="font-bold text-xl mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
  </div>
</div>
</div>


)
}
export default About