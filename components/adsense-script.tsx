
'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const ADSENSE_KEY_STORAGE = 'latestnews9-adsense-key';

export function AdSenseScript() {
  const [adsenseKey, setAdsenseKey] = useState<string | null>(null);

  useEffect(() => {
    try {
      const key = localStorage.getItem(ADSENSE_KEY_STORAGE);
      setAdsenseKey(key);
    } catch (error) {
      console.warn('Could not read AdSense key from localStorage.');
    }
  }, []);

  if (!adsenseKey) {
    return null;
  }

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseKey}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
