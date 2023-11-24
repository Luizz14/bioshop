// "use client";
// import Image from "next/image";

// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   deleteUser,
// } from "firebase/auth";

// import {
//   addDoc,
//   collection,
//   getFirestore,
//   getDoc,
//   doc,
//   getDocs,
// } from "firebase/firestore";

// import { useEffect, useState } from "react";

// import { UserDTO } from "../dto/UserDTO";
// import { ProductDTO } from "../dto/ProductDTO";
// import { firebaseConfig } from "@services/firebase.config";
// import {
//   getProducsInRealTime,
//   getProductById,
//   removeProductById,
// } from "../storage/productStorage";

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore();
// const auth = getAuth();
// const provider = new GoogleAuthProvider();

// export default function Home() {
//   const [user, setUser] = useState<UserDTO>({} as UserDTO);
//   const [products, setProducts] = useState<ProductDTO[]>([
//     {
//       name: "Camiseta de Algodão Orgânico",
//       description:
//         "Uma camiseta confortável feita de algodão orgânico, macio para a pele e amigável ao meio ambiente. Disponível em várias cores e tamanhos.",
//       photoURL:
//         "https://images.pexels.com/photos/7561075/pexels-photo-7561075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 19.99,
//       rating: 4.5,
//       sold: 30,
//       stock: 100,
//     },
//     {
//       name: "Calça Jeans Sustentável",
//       description:
//         "Uma calça jeans moderna e sustentável, feita de algodão reciclado. Design confortável e elegante para diversas ocasiões.",
//       photoURL:
//         "https://images.pexels.com/photos/4819267/pexels-photo-4819267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 39.99,
//       rating: 4.8,
//       sold: 25,
//       stock: 80,
//     },
//     {
//       name: "Vestido de Linho Orgânico",
//       description:
//         "Um vestido leve e elegante feito de linho orgânico. Perfeito para dias ensolarados e eventos casuais.",
//       photoURL:
//         "https://images.pexels.com/photos/7549581/pexels-photo-7549581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 29.99,
//       rating: 4.6,
//       sold: 20,
//       stock: 70,
//     },
//     {
//       name: "Moletom Reciclado",
//       description:
//         "Um moletom quente e confortável feito de material reciclado. Ideal para dias frios e noites aconchegantes.",
//       photoURL:
//         "https://images.pexels.com/photos/4015855/pexels-photo-4015855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 34.99,
//       rating: 4.7,
//       sold: 15,
//       stock: 60,
//     },
//     {
//       name: "Blusa de Tricô Sustentável",
//       description:
//         "Uma blusa de tricô elegante e sustentável, feita de materiais reciclados. Perfeita para adicionar um toque de estilo ao seu guarda-roupa.",
//       photoURL:
//         "https://images.pexels.com/photos/7561066/pexels-photo-7561066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 27.99,
//       rating: 4.9,
//       sold: 25,
//       stock: 50,
//     },
//     {
//       name: "Shorts de Algodão Orgânico",
//       description:
//         "Shorts confortáveis feitos de algodão orgânico, ideais para atividades ao ar livre e dias quentes.",
//       photoURL:
//         "https://images.pexels.com/photos/7561035/pexels-photo-7561035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 24.99,
//       rating: 4.5,
//       sold: 35,
//       stock: 90,
//     },
//     {
//       name: "Jaqueta Corta-Vento Reciclada",
//       description:
//         "Uma jaqueta moderna corta-vento feita de materiais reciclados. Proteja-se do vento com estilo e consciência ambiental.",
//       photoURL:
//         "https://images.pexels.com/photos/7119730/pexels-photo-7119730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 49.99,
//       rating: 4.8,
//       sold: 18,
//       stock: 75,
//     },
//     {
//       name: "Saia Midi de Bambu",
//       description:
//         "Uma saia midi elegante feita de fibra de bambu sustentável. Adicione um toque de sofisticação ao seu visual.",
//       photoURL:
//         "https://images.pexels.com/photos/7561064/pexels-photo-7561064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 32.99,
//       rating: 4.7,
//       sold: 22,
//       stock: 65,
//     },
//     {
//       name: "Camisa de Algodão Orgânico",
//       description:
//         "Uma camisa clássica feita de algodão orgânico, perfeita para ocasiões formais e casuais. Conforto e estilo em uma única peça.",
//       photoURL:
//         "https://images.pexels.com/photos/7561055/pexels-photo-7561055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 29.99,
//       rating: 4.6,
//       sold: 28,
//       stock: 85,
//     },
//   ]);

//   const prod = [
//     {
//       name: "Cachecol de Alpaca",
//       description:
//         "Um cachecol macio e quente feito de fibra de alpaca. Perfeito para manter-se aquecido durante os dias frios de inverno.",
//       photoURL:
//         "https://images.pexels.com/photos/7561049/pexels-photo-7561049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 17.99,
//       rating: 4.4,
//       sold: 10,
//       stock: 40,
//     },
//     {
//       name: "Leggings Esportivas Recicladas",
//       description:
//         "Leggings confortáveis e sustentáveis feitas de material reciclado. Ideal para atividades esportivas e estilo casual.",
//       photoURL:
//         "https://images.pexels.com/photos/7561037/pexels-photo-7561037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 22.99,
//       rating: 4.6,
//       sold: 15,
//       stock: 55,
//     },
//     {
//       name: "Tênis de Corrida Sustentável",
//       description:
//         "Tênis de corrida leves e sustentáveis, feitos de materiais reciclados. Proporciona conforto e desempenho para seus treinos.",
//       photoURL:
//         "https://images.pexels.com/photos/7561032/pexels-photo-7561032.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 59.99,
//       rating: 4.9,
//       sold: 20,
//       stock: 70,
//     },
//     {
//       name: "Óculos de Sol de Bambu",
//       description:
//         "Óculos de sol elegantes com armação de bambu, oferecendo um toque de estilo e durabilidade. Proteja seus olhos com moda consciente.",
//       photoURL:
//         "https://images.pexels.com/photos/7561071/pexels-photo-7561071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 45.99,
//       rating: 4.7,
//       sold: 12,
//       stock: 35,
//     },
//     {
//       name: "Bolsa de Couro Vegano",
//       description:
//         "Uma bolsa elegante feita de couro vegano durável. Espaçosa e perfeita para todas as suas necessidades diárias.",
//       photoURL:
//         "https://images.pexels.com/photos/7561069/pexels-photo-7561069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 69.99,
//       rating: 4.8,
//       sold: 18,
//       stock: 60,
//     },
//     {
//       name: "Pulseira de Madeira Reciclada",
//       description:
//         "Uma pulseira elegante feita de madeira reciclada, adicionando um toque natural e sustentável ao seu estilo.",
//       photoURL:
//         "https://images.pexels.com/photos/7561061/pexels-photo-7561061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 14.99,
//       rating: 4.5,
//       sold: 25,
//       stock: 80,
//     },
//     {
//       name: "Chapéu de Palha Sustentável",
//       description:
//         "Um chapéu de palha leve e sustentável, perfeito para dias ensolarados. Adicione um toque de charme ao seu visual de verão.",
//       photoURL:
//         "https://images.pexels.com/photos/7561062/pexels-photo-7561062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       price: 19.99,
//       rating: 4.6,
//       sold: 22,
//       stock: 65,
//     },
//   ];

//   function handleSignIn() {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential?.accessToken;

//         if (
//           result.user.displayName &&
//           result.user.email &&
//           result.user.photoURL
//         ) {
//           const responseUser: UserDTO = {
//             displayName: result.user.displayName,
//             email: result.user.email,
//             photoURL: result.user.photoURL,
//           };
//           setUser(responseUser);
//         }
//       })
//       .catch((error) => {
//         const errorCorde = error.code;
//         const errorMessage = error.message;
//         const email = error.customData.email;

//         const credential = GoogleAuthProvider.credentialFromError(error);
//       });
//   }

//   function handleSignOut() {
//     if (auth.currentUser)
//       deleteUser(auth.currentUser)
//         .then(() => {})
//         .catch((error) => {
//           console.log(error);
//         });
//   }

//   // async function handleAddProduct() {
//   //   try {
//   //     products.forEach(async (item) => {
//   //       await addDoc(collection(db, "Products"), item).then(() =>
//   //         console.log(item)
//   //       );
//   //     });
//   //     // const docRef = await addDoc(collection(db, "products"), product);

//   //     // console.log("Document written with ID: ", docRef.id);
//   //     console.log("Itens add com sucesso!");
//   //   } catch (e) {
//   //     console.error("Error adding document: ", e);
//   //   }
//   // }

//   function handleGetProduct() {
//     const response = getProductById("IWghsxrIEAx0MXBniPy7");
//     console.log(response);
//   }

//   async function handleDeleteProduct() {
//     try {
//       await removeProductById("IWghsxrIEAx0MXBniPy7");
//       console.log("Produto removido!");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async function getAllProducts() {
//     try {
//       const subscribe = await getProducsInRealTime();
//       setProducts(subscribe);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-around p-24">
//       <h1 className="text-xl font-bold tracking-wider">
//         Hello, <span className="w-2 bg-blue-400">bun!</span>
//       </h1>
//       <div>
//         <p>{auth.currentUser?.displayName}</p>
//         <p>{auth.currentUser?.email}</p>
//         <p>{auth.currentUser?.photoURL}</p>
//       </div>

//       <div className="flex flex-row space-x-4">
//         <span className="rounded-2xl overflow-hidden outline-none outline-blue-500">
//           {/* <Image
//             src={auth.currentUser?.photoURL as string}
//             width={62}
//             height={62}
//             quality={100}
//             alt="image profile"
//           /> */}
//         </span>
//         <div>
//           <h1>{auth.currentUser?.displayName}</h1>
//           <span className="w-9 h-2 bg-gray-200" />
//           <div className="w-full h-1 rounded-xl bg-gray-800" />
//           <h1>{auth.currentUser?.email}</h1>
//         </div>
//       </div>

//       {products.map((item) => {
//         return <div>{item.name}</div>;
//       })}

//       <button
//         className="bg-blue-500 p-5 py-3 rounded-xl"
//         onClick={handleGetProduct}
//       >
//         Get product
//       </button>
//       <button
//         className="bg-blue-500 p-5 py-3 rounded-xl"
//         onClick={getAllProducts}
//       >
//         Get all product
//       </button>

//       {/* <button
//         className="bg-blue-500 p-5 py-3 rounded-xl"
//         onClick={handleAddProduct}
//       >
//         Add produtos
//       </button> */}

//       <button
//         className="bg-blue-500 p-5 py-3 rounded-xl"
//         onClick={handleDeleteProduct}
//       >
//         Remove produto
//       </button>

//       <button
//         className="bg-blue-500 p-5 py-3 rounded-xl"
//         onClick={handleSignIn}
//       >
//         Entre com o google aqui!
//       </button>

//       <button
//         className="bg-blue-500 p-5 py-3 rounded-xl"
//         onClick={handleSignOut}
//       >
//         Sair da conta
//       </button>
//     </main>
//   );
// }
