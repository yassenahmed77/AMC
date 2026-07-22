# Checkout Stock Scenarios & Logic (AMC Medical Store)

El-malaf da fih khotot w scenarios decrement el-stock wa2t el-checkout 3ashan el-free database w security.

---

## 1. Main Scenarios

### Scenario A: Normal Success Checkout
*   **Condition**: User buys `X` units, and database has `quantity >= X`.
*   **Result**: 
    1. Update DB: `quantity = quantity - X`.
    2. Confirm order success.

### Scenario B: Insufficient Stock (Stale Quantity)
*   **Condition**: User has `X` units in local cart. Before checkout, another customer bought some, leaving DB with `quantity < X`.
*   **Result**:
    1. DB check fails.
    2. Show toast message: `"Sorry, only Y units are available for [Product Name]."`
    3. Block checkout.

### Scenario C: Concurrent Checkout (Race Condition)
*   **Condition**: Only `1` unit left in DB. User A and User B click "Checkout" at the exact same millisecond.
*   **Result**:
    *   Using direct `select` then `update` will cause a negative stock (`-1`).
    *   **Solution**: We must use an **Atomic Stored Procedure (RPC)** in Supabase.

---

## 2. Supabase SQL RPC (Stored Procedure) Implementation

We will create this function in Supabase SQL Editor. It decrements stock atomically and returns `true` on success, or throws an error if stock is insufficient.

```sql
create or replace function public.decrement_product_stock(
    p_product_id uuid,
    p_ordered_quantity integer
)
returns boolean
language plpgsql
security definer
as $$
declare
    current_stock integer;
begin
    -- 1. Select and lock the row to prevent concurrent updates
    select quantity into current_stock
    from public.products
    where id = p_product_id
    for update;

    -- 2. Check if stock is sufficient
    if current_stock is null or current_stock < p_ordered_quantity then
        raise exception 'Insufficient stock. Available: %, Ordered: %', current_stock, p_ordered_quantity;
    end if;

    -- 3. Perform atomic decrement
    update public.products
    set quantity = quantity - p_ordered_quantity
    where id = p_product_id;

    return true;
end;
$$;
```

---

## 3. Frontend JS Integration (React)

When the user clicks "Checkout", instead of updating the table directly, we call the RPC function from the client:

```javascript
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

const handleCheckout = async (productId, orderedQuantity) => {
    try {
        const { data, error } = await supabase.rpc('decrement_product_stock', {
            p_product_id: productId,
            p_ordered_quantity: orderedQuantity
        });

        if (error) throw error;

        toast.success("Order placed successfully! Stock updated.");
        // Proceed to create the order invoice...

    } catch (error) {
        // This will catch the 'Insufficient stock' database exception
        toast.error(error.message || "Failed to complete checkout.");
    }
};
```
