// // components/Carousel.tsx
// import React from 'react'
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css'
// import 'slick-carousel/slick/slick-theme.css'

// interface CarouselItem {
//   image: string
//   title: string
//   // Adicione outras propriedades conforme necessário
// }

// interface CarouselProps {
//   items: CarouselItem[]
// }

// export function Carousel({ items }: any) {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//   }

//   return (
//     <Slider {...settings}>
//       {/* {items.map((item, index) => (
//         <div key={index} className='p-2'>

//           <img
//             src={item.image}
//             alt={item.title}
//             className='w-full h-auto rounded'
//           />
//         </div>
//       ))} */}
//     </Slider>
//   )
// }
