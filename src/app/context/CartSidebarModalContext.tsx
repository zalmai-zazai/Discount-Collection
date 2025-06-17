"use client";
import { useUser } from "@clerk/nextjs";
import React, { createContext, useContext, useState } from "react";

interface CartModalContextType {
  isCartModalOpen: boolean;
  openCartModal: () => void;
  closeCartModal: () => void;
  user: ReturnType<typeof useUser>["user"];
}

const CartModalContext = createContext<CartModalContextType | undefined>(
  undefined
);

export const useCartModalContext = () => {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const CartModalProvider = ({ children }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };
  // user object for login
  const { user } = useUser();
  return (
    <CartModalContext.Provider
      value={{ user, isCartModalOpen, openCartModal, closeCartModal }}
    >
      {children}
    </CartModalContext.Provider>
  );
};
