import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FLAVORS } from "@/lib/flavors";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

type OrderFormState = {
  flavorName: string;
  quantity: number;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
  notes: string;
};

const Order = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFlavor = searchParams.get("flavor") ?? FLAVORS[0]?.name ?? "";

  const [form, setForm] = useState<OrderFormState>({
    flavorName: FLAVORS.some((f) => f.name === initialFlavor) ? initialFlavor : (FLAVORS[0]?.name ?? ""),
    quantity: 1,
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const selectedFlavor = useMemo(() => FLAVORS.find((f) => f.name === form.flavorName), [form.flavorName]);

  const update = <K extends keyof OrderFormState>(key: K, value: OrderFormState[K]) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (key === "flavorName") {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("flavor", String(value));
        return next;
      });
    }
  };

  const validate = () => {
    if (!form.flavorName) return "Please choose a flavor.";
    if (!form.fullName.trim()) return "Please enter your name.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.addressLine1.trim()) return "Please enter your address.";
    if (!form.city.trim()) return "Please enter your city.";
    if (!form.pincode.trim()) return "Please enter your pincode.";
    if (form.quantity < 1) return "Quantity must be at least 1.";
    return null;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Order received!", {
      description: `${form.quantity} × ${form.flavorName} • We’ll contact you at ${form.phone}.`,
    });

    setForm((p) => ({
      ...p,
      quantity: 1,
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      pincode: "",
      notes: "",
    }));
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground">
                Place Your <span className="text-gradient">Order</span>
              </h1>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-2">
                Choose a flavour, enter your address, and we’ll confirm your order on phone.
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link to="/#flavors">Back to flavours</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="glass-card-hover overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {selectedFlavor ? (
                    <>
                      <img
                        src={selectedFlavor.image}
                        alt={selectedFlavor.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${selectedFlavor.color} to-transparent opacity-40`} />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                        <span className="inline-block bg-primary text-primary-foreground font-display font-bold text-sm px-3 py-1 rounded-full">
                          {selectedFlavor.price}
                        </span>
                        <span className="inline-block bg-background/70 text-foreground font-body text-xs px-3 py-1 rounded-full backdrop-blur">
                          {form.quantity} item{form.quantity === 1 ? "" : "s"}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">Select a flavour</div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-display font-bold text-lg text-foreground">{selectedFlavor?.name ?? "Choose a flavour"}</h2>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1">{selectedFlavor?.desc}</p>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="lg:col-span-3"
            >
              <form onSubmit={onSubmit} className="glass-card-hover p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="font-body text-sm text-foreground/80">Flavour</label>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <select
                        value={form.flavorName}
                        onChange={(e) => update("flavorName", e.target.value)}
                        className="md:col-span-2 h-10 rounded-md border border-border bg-background px-3 text-sm"
                      >
                        {FLAVORS.map((f) => (
                          <option key={f.name} value={f.name}>
                            {f.name} ({f.price})
                          </option>
                        ))}
                      </select>

                      <Input
                        type="number"
                        min={1}
                        value={form.quantity}
                        onChange={(e) => update("quantity", Math.max(1, Number(e.target.value || 1)))}
                        placeholder="Qty"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-sm text-foreground/80">Full name</label>
                    <Input
                      value={form.fullName}
                      onChange={(e) => update("fullName", e.target.value)}
                      placeholder="Your name"
                      className="mt-2"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground/80">Phone</label>
                    <Input
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="10-digit mobile"
                      className="mt-2"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-body text-sm text-foreground/80">Address line 1</label>
                    <Input
                      value={form.addressLine1}
                      onChange={(e) => update("addressLine1", e.target.value)}
                      placeholder="House/Flat, Street, Area"
                      className="mt-2"
                      autoComplete="address-line1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-body text-sm text-foreground/80">Address line 2 (optional)</label>
                    <Input
                      value={form.addressLine2}
                      onChange={(e) => update("addressLine2", e.target.value)}
                      placeholder="Landmark, Apartment, etc."
                      className="mt-2"
                      autoComplete="address-line2"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm text-foreground/80">City</label>
                    <Input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="City"
                      className="mt-2"
                      autoComplete="address-level2"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground/80">Pincode</label>
                    <Input
                      value={form.pincode}
                      onChange={(e) => update("pincode", e.target.value)}
                      placeholder="Pincode"
                      className="mt-2"
                      inputMode="numeric"
                      autoComplete="postal-code"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-body text-sm text-foreground/80">Notes (optional)</label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      placeholder="Any delivery instructions?"
                      className="mt-2 min-h-24"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                  <p className="font-body text-xs text-muted-foreground">
                    By placing the order, you agree to be contacted for confirmation.
                  </p>
                  <Button type="submit" className="glow-button">
                    Submit order
                  </Button>
                </div>
              </form>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Order;

