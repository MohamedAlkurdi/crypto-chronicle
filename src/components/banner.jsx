// import banner from '../assets/banner.jpg'

// export default function Banner(){
//     return(
//         <div className="banner w-[100vw] h-[calc(100vh-160px)] ">
//             <div className={`bg-[url('${banner}')] bg-cover bg-center`}></div>
//             {/* <img className='max-w-full max-h-[100vh - 160px] object-cover object-center' src={banner} alt="banner"/> */}
//         </div>
//     )
// }

// import banner from '../assets/banner2.jpg'

// export default function Banner(){
//     return(
//         <div className="banner w-[100vw] h-[calc(100vh-160px)] overflow-x-hidden overflow-y-hidden">
//             <img className='max-w-full max-h-[100vh - 160px] object-cover object-center' src={banner} alt="banner"/>
//         </div>
//     )
// }

import banner from '../assets/banner.jpg'
import '../index.css'

export default function Banner(){
    return(
        <div className="banner w-[100vw] h-screen overflow-y-hidden">
            <div className='bannerImage w-[100vw] h-screen relative overflow-y-hidden'>
            <img className='max-w-full object-cover object-center overflow-y-hidden' src={banner} alt="banner"/>
            <div className="overlay absolute uppercase text-6xl w-full h-full flex items-center justify-center top-0 left-0 bg-gradient-to-b from-main/20 to-main text-secondary custom_text_shadow">Take a look at the crypto world!</div>
            </div>
        </div>
    )
}