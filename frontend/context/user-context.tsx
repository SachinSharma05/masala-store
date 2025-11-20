"use client";

import { Address } from "@/types/Address";
import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface UserContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;

  // wishlist
  wishlist: number[]; // product ids
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;

  // addresses
  addresses: Address[];
  addAddress: (a: Omit<Address, "id">) => void;
  updateAddress: (id: string, a: Partial<Address>) => void;
  removeAddress: (id: string) => void;

  // orders
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date">) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));

    const w = localStorage.getItem("wishlist");
    if (w) setWishlist(JSON.parse(w));

    const a = localStorage.getItem("addresses");
    if (a) setAddresses(JSON.parse(a));

    const o = localStorage.getItem("orders");
    if (o) setOrders(JSON.parse(o));
  }, []);

  useEffect(() => localStorage.setItem("wishlist", JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem("addresses", JSON.stringify(addresses)), [addresses]);
  useEffect(() => localStorage.setItem("orders", JSON.stringify(orders)), [orders]);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // wishlist
  const addToWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };
  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((x) => x !== id));
  };

  // addresses
  const addAddress = (a: Omit<Address, "id">) => {
    const newA: Address = { id: String(Date.now()), ...a };
    setAddresses((prev) => [newA, ...prev]);
  };
  const updateAddress = (id: string, a: Partial<Address>) => {
    setAddresses((prev) => prev.map((x) => (x.id === id ? { ...x, ...a } : x)));
  };
  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((x) => x.id !== id));
  };

  // orders
  const addOrder = (order: Omit<Order, "id" | "date">) => {
    const newOrder: Order = {
      id: String(Date.now()),
      date: new Date().toISOString(),
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        orders,
        addOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext)!;
