"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/cart/store";
import { addToCart } from "@/app/cart/features/cartSlice"; // Import the addToCart action
import { removeFromWishlist } from "@/app/cart/features/wishlistSlice"; // Import the removeFromWishlist action
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import Image from "next/image";

// Define the type for the item
interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // Handle adding item to cart
  const handleAddToCart = (item: WishlistItem) => {
    dispatch(
      addToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: 1, // Default quantity
        image: item.image,
        description: item.description,
        dimensions: { height: "", width: "", depth: "" }, // Provide default dimensions
        price_id: "",
        originalPrice: item.price
      })
    );

    // Show toast notification
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000, // Notification will close after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = (itemId: string) => {
    dispatch(removeFromWishlist(itemId));

    // Show toast notification
    toast.info(`Item removed from wishlist!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-sm">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
              <p className="text-gray-500">{item.description}</p>
              <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add to Cart
              </button>

              {/* Remove from Wishlist Button */}
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;