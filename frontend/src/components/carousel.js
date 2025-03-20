import { useState, useEffect, useRef } from "react";
import "./carousel.css";
import ProductCard from "../components/ProductCard";

const AUTO_SCROLL_SPEED = 1; // Increased speed for testing
const INTERVAL_DELAY = 20; // ~50fps

const GroceryCarousel = ({ products }) => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [snackItems, setSnacksItems] = useState([]);
  const [groceryPaused, setGroceryPaused] = useState(false);
  const [snackPaused, setSnackPaused] = useState(false);

  const groceryRef = useRef(null);
  const snackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const initialScrollLeft = useRef(0);

  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      const groceryCategories = [
        "Dairy",
        "Breads",
        "Eggs",
        "Atta, Rice, Oil & Dals",
        "Masala",
        "Dry Fruits",
        "Packaged Food",
      ];
      const snackCategories = ["Snacks", "Drinks"];

      const groceryFiltered = products.filter((item) =>
        groceryCategories.includes(item.category?.trim())
      );
      const snackFiltered = products.filter((item) =>
        snackCategories.includes(item.category?.trim())
      );

      setGroceryItems([
        ...groceryFiltered.slice(0, 30),
        ...groceryFiltered.slice(0, 30),
      ]);
      setSnacksItems([
        ...snackFiltered.slice(0, 30),
        ...snackFiltered.slice(0, 30),
      ]);
    }
  }, [products]);

  // ✅ Auto-scroll for Grocery (Left to Right)
  useEffect(() => {
    const interval = setInterval(() => {
      if (groceryRef.current && !groceryPaused && !isDragging.current) {
        groceryRef.current.scrollLeft -= AUTO_SCROLL_SPEED;
        if (groceryRef.current.scrollLeft <= 0) {
          groceryRef.current.scrollLeft = groceryRef.current.scrollWidth / 2;
        }
      }
    }, INTERVAL_DELAY);
    return () => clearInterval(interval);
  }, [groceryPaused]);

  // ✅ Auto-scroll for Snacks (Right to Left)
  useEffect(() => {
    const interval = setInterval(() => {
      if (snackRef.current && !snackPaused && !isDragging.current) {
        snackRef.current.scrollLeft += AUTO_SCROLL_SPEED;
        if (snackRef.current.scrollLeft >= snackRef.current.scrollWidth / 2) {
          snackRef.current.scrollLeft = 0;
        }
      }
    }, INTERVAL_DELAY);
    return () => clearInterval(interval);
  }, [snackPaused]);

  // ✅ Dragging Support
  const handleMouseDown = (e, ref, setPaused) => {
    isDragging.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    initialScrollLeft.current = ref.current.scrollLeft;
    setPaused(true);
    ref.current.classList.add("grabbing");
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    ref.current.scrollLeft = initialScrollLeft.current - walk;
  };

  const handleMouseUp = (ref, setPaused) => {
    isDragging.current = false;
    ref.current.classList.remove("grabbing");
    setPaused(false);
  };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Grocery & Kitchen</h2>
      <div
        className="carousel-container"
        ref={groceryRef}
        onMouseDown={(e) => handleMouseDown(e, groceryRef, setGroceryPaused)}
        onMouseMove={(e) => handleMouseMove(e, groceryRef)}
        onMouseUp={() => handleMouseUp(groceryRef, setGroceryPaused)}
        onMouseEnter={() => setGroceryPaused(true)}
        onMouseLeave={() => setGroceryPaused(false)}
      >
        <div className="carousel">
          {groceryItems.map((item, index) => (
            <ProductCard
              key={index}
              product={item}
              setPaused={setGroceryPaused}
            />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Snacks & Drinks</h2>
      <div
        className="carousel-container"
        ref={snackRef}
        onMouseDown={(e) => handleMouseDown(e, snackRef, setSnackPaused)}
        onMouseMove={(e) => handleMouseMove(e, snackRef)}
        onMouseUp={() => handleMouseUp(snackRef, setSnackPaused)}
        onMouseEnter={() => setSnackPaused(true)}
        onMouseLeave={() => setSnackPaused(false)}
      >
        <div className="carousel">
          {snackItems.map((item, index) => (
            <ProductCard
              key={index}
              product={item}
              setPaused={setSnackPaused}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroceryCarousel;
