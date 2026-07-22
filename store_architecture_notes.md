# Store Architecture Notes (React + Supabase Free Tier)

El chat da fiha el khotot el 3reeda le website el montagat el tebya elly hn3mlo inshaallah.

## 1. Tech Stack
*   **Frontend**: React (SPA) using Vite.
*   **Database & Auth**: Supabase (Free Tier).
*   **Hosting**: Vercel (Free Tier).
*   **Styling**: Tailwind CSS / shadcn/ui (Recommended for premium design).

## 2. Architecture & Performance Optimization (Keeping it FREE & Fast)
*   **React Query (SWR)**:
    *   Hanst5dem `staleTime` kbeer (10-15 mins) 3ashan n-cache el products data 3al browser client side.
    *   Dah hay2lal el requests le Supabase DB gedan.
*   **Local Caching**:
    *   El shipping rates constants hatkon fe local file (`governorates.json`) mesh database query, le2n el rates sabta w mesh btt8yar kteer.
    *   El shopping cart data hatkon f `localStorage` mesh f database, w bttb3t bas wa2t el checkout.

## 3. Order Notifications (Store Owner)
*   **Telegram Bot Integration**:
    *   A7san free alternative le WhatsApp.
    *   Supabase Webhook -> Triggered on new Order -> Supabase Edge Function -> Call Telegram Bot API -> Message sent to Owner's Telegram.
*   **WhatsApp Redirect (Optional for Customer UX)**:
    *   After checkout, show a button "Confirm Order via WhatsApp" linking to `https://wa.me/YOUR_NUMBER?text=...`.

## 4. Admin Dashboard
*   Located at `/admin` route under the same React app to avoid creating another project.
*   Protected by Supabase Auth (Admin Role / Row Level Security RLS).
*   Allows adding/editing products and viewing incoming orders.

## 5. Image Compression & Storage (Optimizing Bandwidth & Size)
*   **Problem**: High-resolution product images consume storage space and exceed free-tier bandwidth quickly.
*   **Solution**: Compress images client-side *before* uploading to Supabase Storage.
*   **Implementation Steps**:
    1.  Install `browser-image-compression` library.
    2.  Compress input images to `.webp` format, maximum width/height of `1024px`, and quality of `80%`.
    3.  Upload the compressed `.webp` blob to a public Supabase Storage Bucket.
    4.  Save the generated public URL in the `products` table's `image_url` column.
    
### Client-Side Compression Code Example:
```javascript
import imageCompression from 'browser-image-compression';

const compressAndUpload = async (file) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: 'image/webp'
  };
  const compressedFile = await imageCompression(file, options);
  // Upload compressedFile to Supabase Storage bucket
};
```

---
*Note: Al-file da saved 3ashan ykon m3ak hata lo 8yart el account.*

