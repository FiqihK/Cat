/**
 * Client service to communicate with Google Apps Script Web App connected to Google Sheets
 */

const STORAGE_KEY = 'PUSAT_CAT_APPS_SCRIPT_URL';
export const DEFAULT_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzw3JJqD0E2v_1uFkRpAxPOl6TFeAMC6SDjgoK3jQqMaV_VbrjXNCavTxK8vVyatkkXBQ/exec';

export interface AppsScriptStatus {
  connected: boolean;
  message: string;
  spreadsheetName?: string;
  spreadsheetId?: string;
  timestamp?: string;
}

export function getAppsScriptUrl(): string {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return stored.trim();
  const envUrl = (import.meta as any).env?.VITE_APPS_SCRIPT_URL;
  if (envUrl) return envUrl.trim();
  return DEFAULT_APPS_SCRIPT_URL;
}

export function saveAppsScriptUrl(url: string): void {
  localStorage.setItem(STORAGE_KEY, url.trim());
}

/**
 * Test connectivity with the deployed Google Apps Script Web App
 */
export async function testAppsScriptConnection(
  targetUrl?: string
): Promise<AppsScriptStatus> {
  const url = targetUrl || getAppsScriptUrl();
  if (!url) {
    return {
      connected: false,
      message: 'URL Google Apps Script belum dimasukkan.',
    };
  }

  try {
    const separator = url.includes('?') ? '&' : '?';
    const pingUrl = `${url}${separator}action=ping&t=${Date.now()}`;
    const response = await fetch(pingUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return {
        connected: false,
        message: `HTTP Error: ${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    if (data.status === 'success') {
      return {
        connected: true,
        message: data.message || 'Koneksi ke Google Spreadsheet berhasil!',
        spreadsheetName: data.spreadsheetName,
        spreadsheetId: data.spreadsheetId,
        timestamp: data.timestamp,
      };
    } else {
      return {
        connected: false,
        message: data.message || 'Gagal tersambung ke spreadsheet.',
      };
    }
  } catch (err: any) {
    return {
      connected: false,
      message: `Koneksi gagal: ${err.message || 'Periksa izin deploy Web App (pastikan "Anyone" dipilih).'}`
    };
  }
}

/**
 * Fetch all initial data from Google Sheets
 */
export async function fetchSpreadsheetData(): Promise<{
  success: boolean;
  products?: any[];
  sales?: any[];
  purchases?: any[];
  error?: string;
}> {
  const url = getAppsScriptUrl();
  if (!url) {
    return { success: false, error: 'URL Apps Script belum dikonfigurasi.' };
  }

  try {
    const separator = url.includes('?') ? '&' : '?';
    const fetchUrl = `${url}${separator}action=getInitialData&t=${Date.now()}`;
    const response = await fetch(fetchUrl);
    const data = await response.json();

    if (data.status === 'success') {
      return {
        success: true,
        products: data.products || [],
        sales: data.sales || [],
        purchases: data.purchases || [],
      };
    } else {
      return { success: false, error: data.message };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Record a sale transaction to Google Spreadsheet
 */
export async function sendSaleToSpreadsheet(saleData: {
  date: string;
  company: string;
  customer: string;
  items: Array<{ code: string; name: string; quantity: number; price: number }>;
  subtotal: number;
  ppnAmount: number;
  total: number;
}): Promise<{ success: boolean; message: string }> {
  const url = getAppsScriptUrl();
  if (!url) {
    return {
      success: false,
      message: 'Mode offline: Tersimpan di aplikasi lokal (URL Spreadsheet belum diisi).',
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'addSale',
        data: saleData,
      }),
      // Using text/plain avoids CORS preflight OPTIONS in Apps Script
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    const data = await response.json();
    if (data.status === 'success') {
      return {
        success: true,
        message: `Tersimpan ke Google Spreadsheet! ID: ${data.transactionId || 'OK'}`,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Gagal menyimpan ke spreadsheet.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Tersimpan secara lokal (Sinkronisasi online gagal: ${err.message})`,
    };
  }
}

/**
 * Record a purchase to Google Spreadsheet
 */
export async function sendPurchaseToSpreadsheet(purchaseData: {
  date: string;
  supplier: string;
  productName: string;
  packageType: string;
  quantity: number;
  unitPrice: number;
  total: number;
}): Promise<{ success: boolean; message: string }> {
  const url = getAppsScriptUrl();
  if (!url) {
    return {
      success: false,
      message: 'Mode offline: Tersimpan di aplikasi lokal (URL Spreadsheet belum diisi).',
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        action: 'addPurchase',
        data: purchaseData,
      }),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    const data = await response.json();
    if (data.status === 'success') {
      return {
        success: true,
        message: `Tersimpan ke Google Spreadsheet! ID: ${data.purchaseId || 'OK'}`,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Gagal menyimpan ke spreadsheet.',
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Tersimpan secara lokal (Sinkronisasi online gagal: ${err.message})`,
    };
  }
}
