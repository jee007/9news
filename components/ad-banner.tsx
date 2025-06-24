
'use client';

import { useEffect, useState } from 'react';

const ADSENSE_KEY_STORAGE = 'latestnews9-adsense-key';
const ADSLOT_ID_STORAGE = 'latestnews9-adslot-id';

export function AdBanner() {
  const [publisherId, setPublisherId] = useState<string | null>(null);
  const [slotId, setSlotId] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    try {
        setPublisherId(localStorage.getItem(ADSENSE_KEY_STORAGE));
        setSlotId(localStorage.getItem(ADSLOT_ID_STORAGE));
    } catch (error) {
        console.warn('Could not read ad settings from localStorage.');
    }
  }, []);

  useEffect(() => {
    if (publisherId && slotId) {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense push error:', err);
        }
    }
  }, [publisherId, slotId]);


  if (!publisherId || !slotId) {
    return (
      <div className="flex items-center justify-center h-24 my-6 bg-muted/50 rounded-lg border border-dashed">
        <span className="text-muted-foreground text-sm">Advertisement Banner (Configure in Admin Panel)</span>
      </div>
    );
  }

  return (
    <div className="my-6 text-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
