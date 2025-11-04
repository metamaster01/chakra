"use client";

import { useState } from "react";
import ProductOptions from "@/components/ui/ProductOptions";
import { Truck, RotateCcw } from "lucide-react";
import { createDraftOrder } from "@/app/products/[slug]/actions";

type Variant = {
  id: number;
  sku: string | null;
  color_label: string | null;
  color_value: string | null;
  size_label: string | null;
  price_paise: number;
  mrp_paise: number | null;
  stock: number | null;
  image_url: string | null;
};

export default function ClientActions({
  productId,
  productName,
  slug,
  variants,
}: {
  productId: number;
  productName: string;
  slug: string;
  variants: Variant[];
}) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [qty, setQty] = useState(1);

  const canAdd = (variants?.length ?? 0) === 0 || !!selectedVariant;
  const max = selectedVariant?.stock ?? 99;

  return (
    <>
      <ProductOptions variants={variants || []} onChange={setSelectedVariant} />

      <div className="mt-6 flex items-center gap-3">
        <div className="inline-flex items-center rounded-full bg-purple-900/5 px-3 py-2">
          <button
            className="px-2 text-purple-900/70"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="px-3 text-purple-900">{qty}</span>
          <button
            className="px-2 text-purple-900/70"
            // onClick={() => setQty((q) => q + 1)}
            onClick={() => setQty((q) => Math.min(max, q + 1))}
          >
            +
          </button>
        </div>

        <button
          className="rounded-full px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-900 to-purple-700 hover:opacity-95 disabled:opacity-50"
          disabled={!canAdd}
          onClick={async () => {
            if (!canAdd) return;
            const res = await createDraftOrder({
              productId,
              variantId: selectedVariant?.id ?? null,
              quantity: qty,
            });

            if (res?.redirect) {
              window.location.href = res.redirect;
            } else if (res?.error) {
              alert(res.error); // <-- show server error (e.g. enum mismatch)
            }
          }}
        >
          Buy Now
        </button>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            productName +
              " " +
              (typeof window === "undefined"
                ? `/products/${slug}`
                : location.origin + `/products/${slug}`)
          )}`}
          target="_blank"
          className="rounded-full px-5 py-3 text-sm font-medium bg-amber-200 text-purple-900 hover:bg-amber-300"
        >
          Share
        </a>
      </div>

      <div className="mt-6 rounded-2xl border border-purple-900/10 bg-white divide-y">
        <div className="p-4 flex items-start gap-3">
          <div className="mt-0.5 text-purple-900/80">
            <Truck size={18} />
          </div>
          <div>
            <div className="font-medium text-purple-900">Free Delivery</div>
            <div className="text-xs text-purple-900/60">
              Enter your Postal code for Delivery Availability
            </div>
          </div>
        </div>
        <div className="p-4 flex items-start gap-3">
          <div className="mt-0.5 text-purple-900/80">
            <RotateCcw size={18} />
          </div>
          <div>
            <div className="font-medium text-purple-900">Return Delivery</div>
            <div className="text-xs text-purple-900/60">
              Free 30 days Delivery Return.{" "}
              <span className="underline">Details</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
