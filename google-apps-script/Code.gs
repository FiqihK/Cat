/**
 * ============================================================================
 * BACKEND GOOGLE APPS SCRIPT - PUSAT CAT INDONESIA
 * Database: Google Spreadsheet
 * ============================================================================
 * 
 * CARA SETUP:
 * 1. Buat Google Spreadsheet baru di Google Drive (misal: "Database Pusat Cat Indonesia")
 * 2. Klik menu "Ekstensi" (Extensions) > "Apps Script"
 * 3. Hapus kode lama, lalu PASTE seluruh kode di file ini ke editor Apps Script
 * 4. Klik "Simpan" (Ctrl+S atau icon disket)
 * 5. Jalankan fungsi "initDatabase" sekali untuk membuat sheet & data awal otomatis
 * 6. Klik "Deploy" (Terapkan) di kanan atas > "Deployment baru" (New deployment)
 * 7. Pilih tipe: "Aplikasi Web" (Web app)
 *    - Deskripsi: Backend Pusat Cat v1
 *    - Jalankan sebagai: "Saya" (Me)
 *    - Yang memiliki akses: "Siapa saja" (Anyone) -> PENTING agar web app bisa request tanpa CORS error!
 * 8. Klik "Deploy" & Berikan Izin Akun Google Anda
 * 9. Salin URL Aplikasi Web (berakhiran /exec) dan tempelkan ke aplikasi web Anda di menu "Sinkronisasi Data".
 */

// Konfigurasi Nama-nama Sheet
var SHEET_PRODUK = "Produk";
var SHEET_PENJUALAN = "Penjualan";
var SHEET_PEMBELIAN = "Pembelian";
var SHEET_STOK = "Riwayat_Stok";

/**
 * Handle HTTP GET Requests
 */
function doGet(e) {
  var params = e ? e.parameter : {};
  var action = params.action || "ping";
  var callback = params.callback;

  var responseData = {};

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (action === "ping") {
      responseData = {
        status: "success",
        message: "Koneksi backend Apps Script & Spreadsheet aktif!",
        timestamp: new Date().toISOString(),
        spreadsheetName: ss ? ss.getName() : "Unknown",
        spreadsheetId: ss ? ss.getId() : ""
      };
    } else if (action === "getInitialData") {
      responseData = {
        status: "success",
        products: getSheetDataAsJson(SHEET_PRODUK),
        sales: getSheetDataAsJson(SHEET_PENJUALAN),
        purchases: getSheetDataAsJson(SHEET_PEMBELIAN)
      };
    } else if (action === "getProducts") {
      responseData = {
        status: "success",
        data: getSheetDataAsJson(SHEET_PRODUK)
      };
    } else if (action === "getSales") {
      responseData = {
        status: "success",
        data: getSheetDataAsJson(SHEET_PENJUALAN)
      };
    } else if (action === "getPurchases") {
      responseData = {
        status: "success",
        data: getSheetDataAsJson(SHEET_PEMBELIAN)
      };
    } else if (action === "initDatabase") {
      initDatabase();
      responseData = {
        status: "success",
        message: "Database berhasil diinisialisasi dan di-seed!"
      };
    } else {
      responseData = {
        status: "error",
        message: "Aksi '" + action + "' tidak dikenali."
      };
    }
  } catch (err) {
    responseData = {
      status: "error",
      message: err.toString()
    };
  }

  return sendJsonResponse(responseData, callback);
}

/**
 * Handle HTTP POST Requests
 */
function doPost(e) {
  var responseData = {};

  try {
    var postData = {};
    if (e && e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      postData = e.parameter;
    }

    var action = postData.action || "";

    if (action === "addSale") {
      responseData = handleAddSale(postData.data);
    } else if (action === "addPurchase") {
      responseData = handleAddPurchase(postData.data);
    } else if (action === "updateProductStock") {
      responseData = handleUpdateStock(postData.data);
    } else if (action === "initDatabase") {
      initDatabase();
      responseData = {
        status: "success",
        message: "Database berhasil diinisialisasi!"
      };
    } else {
      responseData = {
        status: "error",
        message: "Aksi POST '" + action + "' tidak didukung."
      };
    }
  } catch (err) {
    responseData = {
      status: "error",
      message: err.toString()
    };
  }

  return sendJsonResponse(responseData);
}

/**
 * Simpan Transaksi Penjualan ke Sheet & Kurangi Stok Produk
 */
function handleAddSale(saleData) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateSheet(SHEET_PENJUALAN, [
    "ID Transaksi",
    "Tanggal",
    "Perusahaan",
    "Pelanggan",
    "Item",
    "Subtotal",
    "PPN 11%",
    "Total",
    "Waktu Simpan"
  ]);

  var id = "TRX-" + new Date().getTime();
  var itemsStr = JSON.stringify(saleData.items || []);

  sheet.appendRow([
    id,
    saleData.date || new Date().toLocaleDateString("id-ID"),
    saleData.company || "Pusat Cat Indonesia (PKP)",
    saleData.customer || "Umum (Cash)",
    itemsStr,
    saleData.subtotal || 0,
    saleData.ppnAmount || 0,
    saleData.total || 0,
    new Date().toISOString()
  ]);

  // Kurangi stok produk jika item disertakan
  if (saleData.items && saleData.items.length > 0) {
    var prodSheet = ss.getSheetByName(SHEET_PRODUK);
    if (prodSheet) {
      var prodValues = prodSheet.getDataRange().getValues();
      // header di baris 0: [ID, Kode, Nama, Kategori, SatuanUtama, Kemasan, Stok, SatuanStok, Harga, ImageType]
      for (var i = 0; i < saleData.items.length; i++) {
        var item = saleData.items[i];
        var itemCode = item.code;
        var qtySold = Number(item.quantity) || 1;

        for (var r = 1; r < prodValues.length; r++) {
          if (prodValues[r][1] == itemCode || prodValues[r][2] == item.name) {
            var currentStock = Number(prodValues[r][6]) || 0;
            var newStock = Math.max(0, currentStock - qtySold);
            prodSheet.getRange(r + 1, 7).setValue(newStock);
            break;
          }
        }
      }
    }
  }

  return {
    status: "success",
    message: "Penjualan berhasil dicatat ke Google Spreadsheet!",
    transactionId: id
  };
}

/**
 * Simpan Transaksi Pembelian ke Sheet & Tambah Stok Produk
 */
function handleAddPurchase(purchaseData) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateSheet(SHEET_PEMBELIAN, [
    "ID Pembelian",
    "Tanggal",
    "Supplier",
    "Nama Produk",
    "Kemasan",
    "Jumlah",
    "Harga Beli",
    "Total",
    "Waktu Simpan"
  ]);

  var id = "PO-" + new Date().getTime();

  sheet.appendRow([
    id,
    purchaseData.date || new Date().toLocaleDateString("id-ID"),
    purchaseData.supplier || "Supplier",
    purchaseData.productName || "",
    purchaseData.packageType || "",
    purchaseData.quantity || 1,
    purchaseData.unitPrice || 0,
    purchaseData.total || 0,
    new Date().toISOString()
  ]);

  // Tambahkan stok pada sheet Produk
  var prodSheet = ss.getSheetByName(SHEET_PRODUK);
  if (prodSheet && purchaseData.productName) {
    var prodValues = prodSheet.getDataRange().getValues();
    for (var r = 1; r < prodValues.length; r++) {
      if (prodValues[r][2] == purchaseData.productName) {
        var currentStock = Number(prodValues[r][6]) || 0;
        var newStock = currentStock + Number(purchaseData.quantity || 1);
        prodSheet.getRange(r + 1, 7).setValue(newStock);
        break;
      }
    }
  }

  return {
    status: "success",
    message: "Pembelian berhasil dicatat ke Google Spreadsheet!",
    purchaseId: id
  };
}

/**
 * Inisialisasi Database Spreadsheet dengan Header & Data Mockup
 */
function initDatabase() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Sheet Produk
  var prodSheet = getOrCreateSheet(SHEET_PRODUK, [
    "ID",
    "Kode",
    "Nama",
    "Kategori",
    "Satuan Utama",
    "Kemasan",
    "Stok",
    "Satuan Stok",
    "Harga",
    "Image Type"
  ]);

  // Jika masih kosong (hanya header), isi data awal sesuai mockup
  if (prodSheet.getLastRow() <= 1) {
    var defaultProducts = [
      ["p1", "CT-INT-20L", "Cat Tembok Interior", "Cat Tembok", "Drum (20L)", "Drum 20L", 5, "Drum", 850000, "cat-interior-20l"],
      ["p2", "CT-INT-5L", "Cat Tembok Interior", "Cat Tembok", "Ember (5L)", "Ember 5L", 12, "Ember", 230000, "cat-interior-5l"],
      ["p3", "CK-1L", "Cat Kayu", "Cat Kayu", "Liter (1L)", "1 Liter", 24, "Liter", 65000, "cat-kayu-1l"],
      ["p4", "TH-A-20L", "Thinner A Special", "Thinner", "Drum (20L)", "Drum 20L", 3, "Drum", 750000, "thinner-a-20l"],
      ["p5", "TH-A-5L", "Thinner A Special", "Thinner", "Ember (5L)", "Ember 5L", 11, "Ember", 210000, "thinner-a-5l"],
      ["p6", "TH-S-1L", "Thinner Super", "Thinner", "Liter (1L)", "1 Liter", 30, "Liter", 55000, "thinner-super-1l"],
      ["p7", "CT-PUT-20L", "Cat Tembok Putih 20L", "Cat Tembok", "Drum (20L)", "Drum 20L", 2, "Drum", 820000, "cat-putih-20l"],
      ["p8", "CAB-5L", "Cat Anti Bocor 5L", "Cat Pelapis", "Ember (5L)", "Ember 5L", 6, "Ember", 245000, "cat-anti-bocor-5l"]
    ];

    prodSheet.getRange(2, 1, defaultProducts.length, defaultProducts[0].length).setValues(defaultProducts);
  }

  // 2. Sheet Penjualan
  getOrCreateSheet(SHEET_PENJUALAN, [
    "ID Transaksi",
    "Tanggal",
    "Perusahaan",
    "Pelanggan",
    "Item",
    "Subtotal",
    "PPN 11%",
    "Total",
    "Waktu Simpan"
  ]);

  // 3. Sheet Pembelian
  getOrCreateSheet(SHEET_PEMBELIAN, [
    "ID Pembelian",
    "Tanggal",
    "Supplier",
    "Nama Produk",
    "Kemasan",
    "Jumlah",
    "Harga Beli",
    "Total",
    "Waktu Simpan"
  ]);

  // Format header di semua sheet (Background Biru, Font Putih Tebal)
  var allSheets = [prodSheet, ss.getSheetByName(SHEET_PENJUALAN), ss.getSheetByName(SHEET_PEMBELIAN)];
  for (var s = 0; s < allSheets.length; s++) {
    var cur = allSheets[s];
    if (cur) {
      var headerRange = cur.getRange(1, 1, 1, cur.getLastColumn() || 10);
      headerRange.setBackground("#2563EB");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      cur.setFrozenRows(1);
    }
  }

  Logger.log("Inisialisasi database Pusat Cat Indonesia selesai!");
}

/**
 * Utility: Mengambil data sheet sebagai array of JSON objects
 */
function getSheetDataAsJson(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var headers = data[0];
  var rows = [];

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var obj = {};
    for (var c = 0; c < headers.length; c++) {
      var key = headers[c].toString().toLowerCase().replace(/[^a-z0-9]/g, "_");
      obj[key] = row[c];
    }
    rows.push(obj);
  }

  return rows;
}

/**
 * Utility: Ambil atau Buat Sheet baru dengan Headers
 */
function getOrCreateSheet(sheetName, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  }

  return sheet;
}

/**
 * Response Formatter dengan CORS & JSONP support
 */
function sendJsonResponse(data, callback) {
  var jsonString = JSON.stringify(data);
  var output;

  if (callback) {
    output = ContentService.createTextOutput(callback + "(" + jsonString + ");")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    output = ContentService.createTextOutput(jsonString)
      .setMimeType(ContentService.MimeType.JSON);
  }

  return output;
}
