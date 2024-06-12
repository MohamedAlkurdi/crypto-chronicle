import Coins from '../components/coins'
import ImageSlider from '../components/carouselTest'
import img1 from "../assets/_52b6b019-af38-4bd4-b148-405628d2815b.jpg"
import img2 from "../assets/_d7457e79-4a4f-49eb-831c-99a1ff31f82f.jpg"
import img4 from "../assets/pexels-davidmcbee-730564.jpg"
import img5 from "../assets/pierre-borthiry-peiobty-vBCVcWUyvyM-unsplash.jpg"
import img6 from "../assets/bannerImage.png"
import Nfts from '../components/nfts'

const slides = [
    { url: img6, title: "italy" },
    { url: img1, title: "beach" },
    { url: img2, title: "boat" },
    { url: img4, title: "city" },
    { url: img5, title: "italy" },
];

export default function Home() {
    return (
        < >
            <ImageSlider images={slides} />
            <Coins />
            <Nfts/>
        </>
    )
}