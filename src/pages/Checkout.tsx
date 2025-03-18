
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { PageTransition } from "../components/PageTransition";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "United States",
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Redirect to products if cart is empty
  if (cart.length === 0 && !orderComplete) {
    navigate("/products");
    return null;
  }
  
  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitBillingInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };
  
  const handleSubmitPaymentInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingOrder(true);
    
    // Simulate order processing
    setTimeout(() => {
      setProcessingOrder(false);
      setOrderComplete(true);
      clearCart();
    }, 2000);
  };
  
  const placeOrder = () => {
    toast.success("Your order has been placed successfully!");
    navigate("/");
  };
  
  return (
    <PageTransition>
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {!orderComplete ? (
            <>
              <motion.h1
                className="text-3xl md:text-4xl font-display font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Checkout
              </motion.h1>
              
              {/* Checkout Steps */}
              <div className="flex justify-center mb-12">
                <div className="flex items-center">
                  <div className={`flex flex-col items-center ${step >= 1 ? "text-black" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      step >= 1 ? "bg-black text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      1
                    </div>
                    <div className="text-sm">Billing</div>
                  </div>
                  
                  <div className={`w-16 h-0.5 mx-2 ${step >= 2 ? "bg-black" : "bg-muted"}`} />
                  
                  <div className={`flex flex-col items-center ${step >= 2 ? "text-black" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      step >= 2 ? "bg-black text-white" : "bg-muted text-muted-foreground"
                    }`}>
                      2
                    </div>
                    <div className="text-sm">Payment</div>
                  </div>
                  
                  <div className={`w-16 h-0.5 mx-2 bg-muted`} />
                  
                  <div className="flex flex-col items-center text-muted-foreground">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 bg-muted text-muted-foreground">
                      3
                    </div>
                    <div className="text-sm">Confirmation</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="text-xl font-medium mb-6">Billing Information</h2>
                      
                      <form onSubmit={handleSubmitBillingInfo}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                              First Name*
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              value={billingInfo.firstName}
                              onChange={handleBillingChange}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                              Last Name*
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              value={billingInfo.lastName}
                              onChange={handleBillingChange}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email Address*
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={billingInfo.email}
                            onChange={handleBillingChange}
                            required
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="address" className="block text-sm font-medium mb-1">
                            Street Address*
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={billingInfo.address}
                            onChange={handleBillingChange}
                            required
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label htmlFor="city" className="block text-sm font-medium mb-1">
                              City*
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={billingInfo.city}
                              onChange={handleBillingChange}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                              Zip Code*
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={billingInfo.zipCode}
                              onChange={handleBillingChange}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium mb-1">
                              Country*
                            </label>
                            <select
                              id="country"
                              name="country"
                              value={billingInfo.country}
                              onChange={handleBillingChange}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            >
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Australia">Australia</option>
                              <option value="Germany">Germany</option>
                              <option value="France">France</option>
                              <option value="Japan">Japan</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <button
                            type="submit"
                            className="btn-primary w-full md:w-auto"
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                  
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h2 className="text-xl font-medium mb-6">Payment Method</h2>
                      
                      <div className="mb-6 flex items-center">
                        <Lock size={16} className="text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                      
                      <form onSubmit={handleSubmitPaymentInfo}>
                        <div className="mb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                            Card Number*
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                            Name on Card*
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentChange}
                            required
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                              Expiry Date*
                            </label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                              Security Code (CVV)*
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              maxLength={4}
                              required
                              className="w-full p-2 border rounded focus:ring-2 focus:ring-black focus:outline-none transition-shadow"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-start mb-4">
                          <input
                            type="checkbox"
                            id="saveCard"
                            className="mt-1"
                            required
                          />
                          <label htmlFor="saveCard" className="ml-2 text-sm">
                            I agree to the <a href="#" className="underline">terms and conditions</a> and <a href="#" className="underline">privacy policy</a>
                          </label>
                        </div>
                        
                        <div className="mt-8 flex flex-wrap gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                          >
                            Back
                          </button>
                          
                          <button
                            type="submit"
                            className="btn-primary"
                            disabled={processingOrder}
                          >
                            {processingOrder ? (
                              <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing
                              </span>
                            ) : "Place Order"}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
                
                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded-lg h-fit">
                  <h3 className="font-medium mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <span className="font-medium">{item.product.name}</span>
                          <span className="text-muted-foreground ml-1">x{item.quantity}</span>
                        </div>
                        <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <div>Subtotal</div>
                      <div>${subtotal.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Shipping</div>
                      <div>Free</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Tax</div>
                      <div>${(subtotal * 0.08).toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t">
                      <div>Total</div>
                      <div>${(subtotal + subtotal * 0.08).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <CheckCircle size={64} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-4">Thank you for your order!</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your order has been placed successfully. We'll send you a confirmation email shortly with your order details.
              </p>
              <button onClick={placeOrder} className="btn-primary">
                Return to Home
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
