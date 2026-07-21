// "use client"

// import storeMenu from "@/app/_Store/Store"
// import { IoIosAddCircleOutline } from "react-icons/io";

// function HokAddCart({ item }) {
//   // استدعِ addCart وليس setCart لأن هذا هو اسمها في الـ Store عندك
//   const addCart = storeMenu((state) => state.addCart)

//   const handleAdd = (e) => {
//     e.preventDefault();
//     e.stopPropagation(); // مهم جداً لمنع أي تداخل مع الـ Link
    
//     if (addCart) {
//       addCart(item);
//       console.log("تمت الإضافة:", item.name);
//     }
//   }

//   return (
//     <button 
//       onClick={handleAdd}
//       className="absolute -top-2 -right-3 z-30"
//       type="button"
//     >
//       <IoIosAddCircleOutline className="text-white text-3xl font-bold hover:text-yellow-500 transition-transform active:scale-110 drop-shadow-xl" />
//     </button>
//   )
// }

// export default HokAddCart