import { useState } from "react";
import { addToCart } from "../../../api/user";
import { toast } from "sonner";

export const MenuCard = ({ item }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    item.has_variants && item.variants?.length ? item.variants[0].id : null
  );
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      const payload = {
        menu_item_id: item.id,
        menu_item_variant_id: selectedVariant || null,
        quantity: 1,
        price: item.has_variants && selectedVariant
          ? item.variants.find(v => v.id === selectedVariant).price
          : item.price
      };
      await addToCart(payload);
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="flex flex-col bg-foreground rounded-xl border border-secondary/20 overflow-hidden shadow-md hover:shadow-lg transition">
      <img
        src={item.image || "/placeholder.png"}
        alt={item.name}
        className="h-36 w-full object-cover"
      />
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-lg font-bold text-secondary">{item.name}</h3>
        {item.type && (
          <span className="inline-block px-3 py-1.5 text-sm font-semibold bg-order text-foreground rounded-full">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
        )}
        {item.description && (
          <p className="text-sm text-secondary/80 mt-2">{item.description}</p>
        )}
        {item.has_variants && item.variants?.length && (
          <div className="mt-4 grid grid-cols-1 gap-3">
            {item.variants.map(variant => {
              const selected = selectedVariant === variant.id;
              return (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`flex justify-between items-center px-4 py-3 rounded-xl border font-semibold transition ${
                    selected
                      ? "bg-secondary text-foreground border-secondary"
                      : "bg-foreground text-secondary border-mute"
                  }`}
                >
                  <span>{variant.name}</span>
                  <span className="bg-order text-foreground px-3 py-1 rounded-lg font-semibold">
                    JD {variant.price}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          {!item.has_variants && (
            <span className="bg-order text-foreground px-3 py-1 rounded-lg font-semibold">
              JD {item.price}
            </span>
          )}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="ml-auto px-5 py-2 bg-primary text-foreground rounded-xl hover:bg-order transition font-semibold"
          >
            {adding ? "Adding..." : "+ Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
