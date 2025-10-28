import { useEffect, useState } from "react";
import { getDashboard, updateOrderStatus, getMenu, addMenuItem, deleteMenuItem } from "../../api/restaurant";
import { toast } from "sonner";

export const MyRestaurant = () => {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    type: "",
    description: "",
    image: null
  });

  useEffect(() => {
    fetchOrders();
    fetchMenuItems();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await getDashboard();
      setOrders(res.orders.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    }
    setLoadingOrders(false);
  };

  const fetchMenuItems = async () => {
    setLoadingMenu(true);
    try {
      const res = await getMenu({ per_page: 20 });
      setMenuItems(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load menu items");
    }
    setLoadingMenu(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItem(id);
      toast.success("Menu item deleted");
      fetchMenuItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    }
  };

  const handleAddItem = async () => {
    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("price", newItem.price);
    formData.append("type", newItem.type);
    formData.append("description", newItem.description);
    if (newItem.image) formData.append("image", newItem.image);

    try {
      await addMenuItem(formData);
      toast.success("Menu item added");
      setNewItem({ name: "", price: "", type: "", description: "", image: null });
      fetchMenuItems();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add item");
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-16 py-8 bg-foreground flex flex-col gap-8">
      <h2 className="text-3xl font-semibold text-secondary">My Restaurant Dashboard</h2>

      <section>
        <h3 className="text-xl font-semibold text-secondary mb-4">Orders</h3>
        {loadingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 bg-mute rounded-xl flex flex-col gap-2">
                <p><strong>Order #{order.id}</strong> - {order.user.name}</p>
                <p>Status: <span className="font-semibold">{order.status}</span></p>
                <div className="flex gap-2 flex-wrap">
                  {["pending","approved","ready","waiting","picked_up"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(order.id, status)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        order.status === status ? "bg-primary text-foreground" : "bg-secondary/20 text-secondary"
                      }`}
                    >
                      {status.replace("_"," ")}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-secondary mb-4">Menu Items</h3>

        <div className="grid gap-4">
          {loadingMenu ? (
            <p>Loading menu items...</p>
          ) : menuItems.length === 0 ? (
            <p>No menu items yet.</p>
          ) : (
            menuItems.map((item) => (
              <div key={item.id} className="p-4 bg-mute rounded-xl flex justify-between items-center">
                <div>
                  <p className="font-semibold text-secondary">{item.name}</p>
                  <p className="text-primary">{item.type}</p>
                  <p className="text-order">${item.price}</p>
                </div>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="px-3 py-1 bg-red-500 text-foreground rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 p-4 bg-secondary/10 rounded-xl flex flex-col gap-4">
          <h4 className="font-semibold text-secondary">Add New Menu Item</h4>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="p-2 rounded-md border border-secondary/30"
          />
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="p-2 rounded-md border border-secondary/30"
          />
          <input
            type="text"
            placeholder="Type"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            className="p-2 rounded-md border border-secondary/30"
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="p-2 rounded-md border border-secondary/30"
          />
          <input
            type="file"
            onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
            className="p-2"
          />
          <button
            onClick={handleAddItem}
            className="px-4 py-2 bg-primary text-foreground rounded-md font-semibold"
          >
            Add Item
          </button>
        </div>
      </section>
    </div>
  );
};
