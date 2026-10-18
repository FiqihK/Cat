export type ScreenId =
  | 'splash'
  | 'pilih-perusahaan'
  | 'beranda'
  | 'produk'
  | 'detail-produk'
  | 'tambah-pembelian'
  | 'penjualan-pkp'
  | 'penjualan-retail'
  | 'konversi-satuan'
  | 'stok-barang'
  | 'laporan'
  | 'lainnya';

export type CompanyType = 'pkp' | 'retail';

export interface ProductItem {
  id: string;
  name: string;
  code: string;
  category: 'Cat Tembok' | 'Cat Kayu' | 'Thinner' | 'Aksesoris' | 'Cat Pelapis';
  mainUnit: string;
  packageType: 'Drum 20L' | 'Ember 5L' | '1 Liter' | '200 ml';
  stock: number;
  stockUnit: string;
  price: number;
  imageType:
    | 'cat-interior-20l'
    | 'cat-interior-5l'
    | 'cat-kayu-1l'
    | 'thinner-a-20l'
    | 'thinner-a-5l'
    | 'thinner-super-1l'
    | 'cat-anti-bocor-5l'
    | 'cat-putih-20l';
  stockStatus?: 'normal' | 'menipis' | 'habis';
  minStock?: number;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
  unit: string;
  unitPrice: number;
}
