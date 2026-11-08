const STORAGE_KEYS = {
  medicines: "smart-medicine-stock",
  suppliers: "smart-medicine-suppliers",
  sales: "smart-medicine-sales",
  logs: "smart-medicine-inventory-log",
  customerPurchases: "smart-medicine-customer-purchases",
  auth: "smart-medicine-auth-session",
};

const seedMedicines = [
  { id: 1, name: "Paracetamol 500mg", category: "Analgesik", entryDate: "2026-10-01", stock: 120, price: 8500, expiry: "2027-08-31", status: "Tersedia" },
  { id: 2, name: "Amoxicillin 500mg", category: "Antibiotik", entryDate: "2026-11-02", stock: 18, price: 23000, expiry: "2026-12-15", status: "Stok Rendah" },
  { id: 3, name: "Vitamin C 1000mg", category: "Vitamin", entryDate: "2026-09-26", stock: 68, price: 16000, expiry: "2027-06-22", status: "Tersedia" },
  { id: 4, name: "Betadine", category: "Antiseptik", entryDate: "2026-10-12", stock: 7, price: 12500, expiry: "2026-10-18", status: "Stok Rendah" },
  { id: 5, name: "OBH Combi", category: "Obat Batuk", entryDate: "2026-08-15", stock: 0, price: 18000, expiry: "2026-09-30", status: "Habis" },
  { id: 6, name: "Aspirin 80mg", category: "Analgesik", entryDate: "2026-10-09", stock: 42, price: 11000, expiry: "2027-03-12", status: "Tersedia" },
];

const seedSuppliers = [
  { id: 1, name: "PT Medika Jaya", contact: "0812-1111-2222", address: "Jakarta Selatan", status: "Aktif" },
  { id: 2, name: "CV Pharma Nusantara", contact: "0812-3333-4444", address: "Bandung", status: "Aktif" },
  { id: 3, name: "Toko Sehat Global", contact: "0812-5555-6666", address: "Surabaya", status: "Pending" },
];

const seedTransactions = [
  {
    id: "TRX-1001",
    date: "2026-11-05",
    customer: "Andi",
    total: 68000,
    items: [
      { name: "Paracetamol 500mg", qty: 2, unitPrice: 8500, expiry: "2027-08-31", subtotal: 17000 },
      { name: "Vitamin C 1000mg", qty: 3, unitPrice: 16000, expiry: "2027-06-22", subtotal: 51000 },
    ],
  },
  {
    id: "TRX-1002",
    date: "2026-11-04",
    customer: "Rina",
    total: 23000,
    items: [
      { name: "Amoxicillin 500mg", qty: 1, unitPrice: 23000, expiry: "2026-12-15", subtotal: 23000 },
    ],
  },
];

const seedLogs = [
  { id: 1, type: "in", medicineName: "Paracetamol 500mg", qty: 120, date: "2026-10-01", note: "Pembelian awal" },
  { id: 2, type: "out", medicineName: "Vitamin C 1000mg", qty: 12, date: "2026-11-05", note: "Penjualan kasir" },
  { id: 3, type: "in", medicineName: "Amoxicillin 500mg", qty: 30, date: "2026-11-02", note: "Restok supplier" },
];

const medicineTableBody = document.getElementById("medicineTableBody");
const inventoryTableBody = document.getElementById("inventoryTableBody");
const inventoryLogTableBody = document.getElementById("inventoryLogTableBody");
const lowStockList = document.getElementById("lowStockList");
const supplierTableBody = document.getElementById("supplierTableBody");
const salesHistoryBody = document.getElementById("salesHistoryBody");
const reportSummaryList = document.getElementById("reportSummaryList");
const addMedicineBtn = document.getElementById("addMedicineBtn");
const restockBtn = document.getElementById("restockBtn");
const saleBtn = document.getElementById("saleBtn");
const medicineModal = document.getElementById("medicineModal");
const medicineForm = document.getElementById("medicineForm");
const modalTitle = document.getElementById("modalTitle");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const searchInput = document.getElementById("searchInput");
const receiptConventional = document.getElementById("receiptConventional");
const receiptDigital = document.getElementById("receiptDigital");
const saleForm = document.getElementById("saleForm");
const saleMedicineSelect = document.getElementById("saleMedicineSelect");
const saleQuantity = document.getElementById("saleQuantity");
const salePaymentMethod = document.getElementById("salePaymentMethod");
const customerName = document.getElementById("customerName");
const customerPhone = document.getElementById("customerPhone");
const adminCartList = document.getElementById("adminCartList");
const saleCartTotal = document.getElementById("saleCartTotal");
const clearSaleCartBtn = document.getElementById("clearSaleCartBtn");
const saleReceiptPreview = document.getElementById("saleReceiptPreview");
const customerSearch = document.getElementById("customerSearch");
const customerProductList = document.getElementById("customerProductList");
const customerCartItems = document.getElementById("customerCartItems");
const customerTotal = document.getElementById("customerTotal");
const customerPortalName = document.getElementById("customerPortalName");
const customerPortalPhone = document.getElementById("customerPortalPhone");
const customerHistoryFilter = document.getElementById("customerHistoryFilter");
const customerPurchaseHistoryList = document.getElementById("customerPurchaseHistoryList");
const customerCheckoutBtn = document.getElementById("customerCheckoutBtn");
const supplierForm = document.getElementById("supplierForm");
const checkoutModal = document.getElementById("checkoutModal");
const checkoutAddress = document.getElementById("checkoutAddress");
const checkoutOrderPreview = document.getElementById("checkoutOrderPreview");
const checkoutItemCount = document.getElementById("checkoutItemCount");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShippingCost = document.getElementById("checkoutShippingCost");
const checkoutTotalPayment = document.getElementById("checkoutTotalPayment");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const cancelCheckoutBtn = document.getElementById("cancelCheckoutBtn");
const confirmCheckoutBtn = document.getElementById("confirmCheckoutBtn");
const navButtons = document.querySelectorAll(".nav-item");
const roleButtons = document.querySelectorAll(".role-btn");
const loginRoleButtons = document.querySelectorAll(".login-role-btn");
const loginForms = {
  admin: document.getElementById("adminLoginForm"),
  customer: document.getElementById("customerLoginForm"),
};
const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("appShell");
const authMessage = document.getElementById("authMessage");
const logoutBtn = document.getElementById("logoutBtn");
const settingsToggleBtn = document.getElementById("settingsToggleBtn");
const settingsMenu = document.getElementById("settingsMenu");
const receiptModal = document.getElementById("receiptModal");
const receiptModalContent = document.getElementById("receiptModalContent");
const closeReceiptBtn = document.getElementById("closeReceiptBtn");
const closeReceiptActionBtn = document.getElementById("closeReceiptActionBtn");
const printReceiptBtn = document.getElementById("printReceiptBtn");
const pageSections = document.querySelectorAll(".page-section");

const formFields = {
  id: document.getElementById("medicineId"),
  name: document.getElementById("medicineName"),
  category: document.getElementById("medicineCategory"),
  entryDate: document.getElementById("medicineEntryDate"),
  stock: document.getElementById("medicineStock"),
  price: document.getElementById("medicinePrice"),
  expiry: document.getElementById("medicineExpiry"),
  status: document.getElementById("medicineStatus"),
};
const expiryWarning = document.getElementById("medicineExpiryWarning");

let medicines = loadState(STORAGE_KEYS.medicines, seedMedicines);
let suppliers = loadState(STORAGE_KEYS.suppliers, seedSuppliers);
let transactions = loadState(STORAGE_KEYS.sales, seedTransactions);
let customerPurchaseHistory = loadState(STORAGE_KEYS.customerPurchases, []);
let inventoryLogs = loadState(STORAGE_KEYS.logs, seedLogs);
let currentReceipt = transactions[0] || null;
let customerCart = [];
let adminCart = [];
let currentAdminView = "dashboard";
let currentRole = "admin";

function loadState(key, fallback) {
  const saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return structuredClone(fallback);
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(fallback);
  } catch (error) {
    console.error("Gagal memuat data", error);
    return structuredClone(fallback);
  }
}

function saveState(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString + "T00:00:00");
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getFilteredMedicines() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return medicines;

  return medicines.filter((item) => [item.name, item.category].some((value) => value.toLowerCase().includes(query)));
}

function recalcStatus(stock) {
  if (stock <= 0) return "Habis";
  if (stock <= 20) return "Stok Rendah";
  return "Tersedia";
}

function getStatusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized.includes("habis")) return "status-empty";
  if (normalized.includes("rendah")) return "status-low";
  return "status-available";
}

function addInventoryLog(type, medicineName, qty, note = "") {
  inventoryLogs.unshift({
    id: Date.now() + Math.random(),
    type,
    medicineName,
    qty,
    date: new Date().toISOString().slice(0, 10),
    note,
  });
  saveState(STORAGE_KEYS.logs, inventoryLogs);
}

function renderSummary() {
  const totalMedicine = medicines.length;
  const totalStock = medicines.reduce((sum, item) => sum + Number(item.stock || 0), 0);
  const lowStock = medicines.filter((item) => Number(item.stock || 0) <= 20).length;
  const inventoryValue = medicines.reduce((sum, item) => sum + Number(item.stock || 0) * Number(item.price || 0), 0);
  const revenue = transactions.reduce((sum, item) => sum + Number(item.total || 0), 0);
  const todaySales = transactions.filter((item) => item.date === new Date().toISOString().slice(0, 10)).reduce((sum, item) => sum + Number(item.total || 0), 0);

  document.getElementById("totalMedicine").textContent = totalMedicine;
  document.getElementById("medicineValue").textContent = `Nilai stok: ${formatCurrency(inventoryValue)}`;
  document.getElementById("dailySales").textContent = formatCurrency(todaySales || totalStock * 1500);
  document.getElementById("lowStockCount").textContent = lowStock;
  document.getElementById("revenueValue").textContent = formatCurrency(revenue);
  document.getElementById("transactionCount").textContent = String(transactions.length);
  document.getElementById("prescriptionCount").textContent = String(Math.max(12, lowStock + 12));
}

function renderLowStock() {
  const lowStockItems = medicines.filter((item) => Number(item.stock || 0) <= 20);

  if (!lowStockItems.length) {
    lowStockList.innerHTML = '<div class="empty-state">Tidak ada stok yang perlu diingatkan.</div>';
    return;
  }

  lowStockList.innerHTML = lowStockItems
    .slice(0, 5)
    .map(
      (item) => `
        <div class="alert-item">
          <h4>${item.name}</h4>
          <p>Sisa stok: <strong>${item.stock}</strong> pcs • ${item.category}</p>
        </div>
      `
    )
    .join("");
}

function renderInventoryTable() {
  const filtered = getFilteredMedicines();

  const rows = filtered
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td>${formatDate(item.entryDate)}</td>
          <td>${formatDate(item.expiry)}</td>
          <td>${item.stock}</td>
          <td>${formatCurrency(item.price)}</td>
          <td><span class="status-pill ${getStatusClass(item.status)}">${item.status}</span></td>
          <td>
            <div class="row-actions">
              <button class="action-btn edit-btn" data-action="edit" data-id="${item.id}">Edit</button>
              <button class="action-btn sell-btn" data-action="sell" data-id="${item.id}">Jual</button>
              <button class="action-btn delete-btn" data-action="delete" data-id="${item.id}">Hapus</button>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  medicineTableBody.innerHTML = rows || `<tr><td colspan="8" class="empty-state">Tidak ada obat yang cocok dengan pencarian.</td></tr>`;
  inventoryTableBody.innerHTML = rows || `<tr><td colspan="8" class="empty-state">Tidak ada obat yang cocok dengan pencarian.</td></tr>`;
}

function renderInventoryLogs() {
  if (!inventoryLogTableBody) return;

  inventoryLogTableBody.innerHTML = inventoryLogs
    .slice(0, 8)
    .map(
      (log) => `
        <tr>
          <td>${formatDate(log.date)}</td>
          <td>${log.type === "in" ? "Masuk" : "Keluar"}</td>
          <td>${log.medicineName}</td>
          <td>${log.qty}</td>
          <td>${log.note || "-"}</td>
        </tr>
      `
    )
    .join("");
}

function renderSuppliers() {
  supplierTableBody.innerHTML = suppliers
    .map(
      (supplier) => `
        <tr>
          <td>${supplier.name}</td>
          <td>${supplier.contact}</td>
          <td>${supplier.address}</td>
          <td><span class="status-pill ${supplier.status === "Aktif" ? "status-available" : "status-low"}">${supplier.status}</span></td>
        </tr>
      `
    )
    .join("");
}

function renderSalesHistory() {
  salesHistoryBody.innerHTML = transactions
    .slice(0, 6)
    .map(
      (sale) => `
        <tr>
          <td>${formatDate(sale.date)}</td>
          <td>${sale.customer}</td>
          <td>${formatCurrency(sale.total)}</td>
        </tr>
      `
    )
    .join("");

  const summary = [
    { label: "Total pendapatan", value: formatCurrency(transactions.reduce((sum, item) => sum + Number(item.total || 0), 0)) },
    { label: "Item terjual", value: String(transactions.reduce((sum, item) => sum + item.items.reduce((inner, line) => inner + Number(line.qty || 0), 0), 0)) },
    { label: "Supplier aktif", value: String(suppliers.filter((s) => s.status === "Aktif").length) },
    { label: "Stok rendah", value: String(medicines.filter((item) => Number(item.stock || 0) <= 20).length) },
  ];

  reportSummaryList.innerHTML = summary
    .map(
      (item) => `
        <div class="report-item">
          <strong>${item.label}</strong>
          <span>${item.value}</span>
        </div>
      `
    )
    .join("");
}

function getCustomerFilteredProducts() {
  const query = (customerSearch ? customerSearch.value : "").trim().toLowerCase();
  if (!query) return medicines;
  return medicines.filter((item) => [item.name, item.category].some((value) => String(value).toLowerCase().includes(query)));
}

function getExpiryStatus(dateString) {
  if (!dateString) {
    return { level: "normal", label: "Expired: -" };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiryDate = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(expiryDate.getTime())) {
    return { level: "normal", label: "Expired: -" };
  }

  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) {
    return { level: "expired", label: `Expired: ${formatDate(dateString)}` };
  }
  if (daysLeft <= 30) {
    return { level: "warning", label: `Expired: ${formatDate(dateString)}` };
  }

  return { level: "normal", label: `Expired: ${formatDate(dateString)}` };
}

function renderCustomerProducts() {
  if (!customerProductList) return;

  const items = getCustomerFilteredProducts();

  customerProductList.innerHTML = items
    .map((item) => {
      const inCartQty = customerCart.find((entry) => entry.id === item.id)?.qty || 0;
      const disabled = Number(item.stock || 0) <= 0 ? "disabled" : "";
      return `
        <article class="customer-product-card ${disabled ? "sold-out" : ""}">
          <div class="product-info">
            <strong>${item.name}</strong>
            <span>${item.category}</span>
            <small>Expired: ${formatDate(item.expiry)}</small>
            <small>Stok: ${item.stock}</small>
          </div>
          <div class="product-meta">
            <span>${formatCurrency(item.price)}</span>
            <button class="primary-btn product-btn" data-customer-product="${item.id}" ${disabled} type="button">${inCartQty ? `Tambah (${inCartQty})` : "Tambah"}</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderCustomerCart() {
  if (!customerCartItems) return;

  if (!customerCart.length) {
    customerCartItems.innerHTML = '<div class="empty-state">Keranjang masih kosong.</div>';
    customerTotal.textContent = formatCurrency(0);
    return;
  }

  customerCartItems.innerHTML = customerCart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <small>${formatCurrency(item.price)} / pcs</small>
          </div>
          <div class="cart-item-actions">
            <button class="icon-btn minus-btn" data-cart-action="decrease" data-id="${item.id}" type="button">-</button>
            <span>${item.qty}</span>
            <button class="icon-btn plus-btn" data-cart-action="increase" data-id="${item.id}" type="button">+</button>
          </div>
        </div>
      `
    )
    .join("");

  const total = customerCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  customerTotal.textContent = formatCurrency(total);
}

function getPurchaseStatusLabel(purchase) {
  return purchase.status || purchase.paymentStatus || "Sudah Dibayar";
}

function getPurchaseStatusClass(status) {
  const normalized = (status || "Sudah Dibayar").toLowerCase();
  if (normalized.includes("dibayar") || normalized.includes("lunas")) return "status-paid";
  if (normalized.includes("diproses") || normalized.includes("proses")) return "status-processing";
  if (normalized.includes("dikirim")) return "status-shipping";
  if (normalized.includes("selesai")) return "status-complete";
  return "status-paid";
}

function renderCustomerPurchaseHistory() {
  if (!customerPurchaseHistoryList) return;

  const selectedStatus = customerHistoryFilter ? customerHistoryFilter.value : "all";
  const customerNameFilter = (customerPortalName && customerPortalName.value.trim().toLowerCase()) || "";

  let purchases = customerPurchaseHistory.filter((purchase) => {
    const customerText = (purchase.customer || "").toLowerCase();
    if (customerNameFilter && customerNameFilter !== "customer" && !customerText.includes(customerNameFilter)) {
      return false;
    }
    return true;
  });

  if (selectedStatus !== "all") {
    purchases = purchases.filter((purchase) => {
      const status = getPurchaseStatusLabel(purchase);
      const paymentStatus = purchase.paymentStatus || "";
      const deliveryStatus = purchase.deliveryStatus || "";
      return status === selectedStatus || paymentStatus === selectedStatus || deliveryStatus === selectedStatus;
    });
  }

  if (!purchases.length) {
    customerPurchaseHistoryList.innerHTML = '<div class="empty-state">Belum ada riwayat pembelian.</div>';
    return;
  }

  customerPurchaseHistoryList.innerHTML = purchases
    .slice(0, 6)
    .map((purchase) => {
      const status = getPurchaseStatusLabel(purchase);
      return `
        <div class="purchase-history-item">
          <div class="purchase-history-main">
            <div>
              <strong>${purchase.id}</strong>
              <span>${formatDate(purchase.date)} • ${purchase.paymentMethod}</span>
            </div>
            <span class="purchase-status ${getPurchaseStatusClass(status)}">${status}</span>
          </div>
          <div class="purchase-history-meta">
            <small>${purchase.items.length} item • ${purchase.shippingMethod}</small>
            <button class="secondary-btn history-btn" data-history-id="${purchase.id}" type="button">Lihat struk</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function addCustomerCartItem(medicineId) {
  const medicine = medicines.find((item) => item.id === Number(medicineId));
  if (!medicine) return;
  if (Number(medicine.stock || 0) <= 0) {
    alert("Stok obat sudah habis.");
    return;
  }

  const existing = customerCart.find((item) => item.id === medicine.id);
  if (existing) {
    if (existing.qty >= Number(medicine.stock || 0)) {
      alert(`Stok untuk ${medicine.name} hanya tersisa ${medicine.stock}.`);
      return;
    }
    existing.qty += 1;
  } else {
    customerCart.push({ id: medicine.id, name: medicine.name, price: medicine.price, expiry: medicine.expiry, qty: 1 });
  }

  renderCustomerProducts();
  renderCustomerCart();
}

function updateCustomerCartItem(medicineId, delta) {
  const itemIndex = customerCart.findIndex((entry) => entry.id === Number(medicineId));
  if (itemIndex === -1) return;

  const item = customerCart[itemIndex];
  item.qty += delta;

  if (item.qty <= 0) {
    customerCart.splice(itemIndex, 1);
  }

  renderCustomerProducts();
  renderCustomerCart();
}

function getCheckoutShippingCost(method) {
  const fees = {
    GoSend: 15000,
    GrabExpress: 18000,
    JNE: 12000,
  };

  return fees[method] || 15000;
}

function renderCheckoutOrderPreview() {
  if (!checkoutOrderPreview) return;

  if (!customerCart.length) {
    checkoutOrderPreview.innerHTML = `
      <div class="checkout-empty-state">
        <div class="checkout-mini-badge">+</div>
        <div>
          <strong>Keranjang masih kosong</strong>
          <small>Pilih obat terlebih dahulu untuk checkout.</small>
        </div>
      </div>
    `;
    return;
  }

  const previewItems = customerCart.slice(0, 2);
  const totalQty = customerCart.reduce((sum, item) => sum + item.qty, 0);

  checkoutOrderPreview.innerHTML = previewItems
    .map(
      (item) => `
        <div class="checkout-order-item">
          <div class="checkout-mini-badge">+</div>
          <div class="checkout-order-copy">
            <strong>${item.name}</strong>
            <small>${item.qty} item • ${formatCurrency(item.price * item.qty)}</small>
          </div>
          <span class="checkout-order-qty">x${item.qty}</span>
        </div>
      `
    )
    .join("") + `
      <div class="checkout-order-footer">
        <span>${totalQty} item dibeli</span>
        <strong>${formatCurrency(customerCart.reduce((sum, item) => sum + item.price * item.qty, 0))}</strong>
      </div>
    `;
}

function updateCheckoutSummary() {
  const subtotal = customerCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked')?.value || "GoSend";
  const shipping = getCheckoutShippingCost(shippingMethod);
  const total = subtotal + shipping;

  checkoutItemCount.textContent = String(customerCart.reduce((sum, item) => sum + item.qty, 0));
  checkoutSubtotal.textContent = formatCurrency(subtotal);
  checkoutShippingCost.textContent = formatCurrency(shipping);
  checkoutTotalPayment.textContent = formatCurrency(total);
  renderCheckoutOrderPreview();
}

function openCheckoutModal() {
  if (!customerCart.length) {
    alert("Keranjang masih kosong.");
    return;
  }

  closeReceiptModal();

  const defaultAddress = (customerPortalName && customerPortalName.value.trim())
    ? `Jl. ${customerPortalName.value.trim()} No. 12, Kelurahan Sehat, Kecamatan Medika, Jakarta Pusat`
    : "Jl. Mawar No. 12, Kelurahan Sehat, Kecamatan Medika, Jakarta Pusat";

  checkoutAddress.value = defaultAddress;
  renderCheckoutOrderPreview();
  updateCheckoutSummary();
  checkoutModal.classList.remove("hidden");
  checkoutModal.setAttribute("aria-hidden", "false");
}

function closeCheckoutModal() {
  checkoutModal.classList.add("hidden");
  checkoutModal.setAttribute("aria-hidden", "true");
}

function handleCustomerCheckout() {
  if (!customerCart.length) {
    alert("Keranjang masih kosong.");
    return;
  }

  openCheckoutModal();
}

function finalizeCustomerCheckout() {
  const customerNameValue = (customerPortalName && customerPortalName.value.trim()) || "Umum";
  const customerPhoneValue = customerPortalPhone ? customerPortalPhone.value.trim() : "";
  const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked')?.value || "GoSend";
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "Cash";
  const deliveryAddress = checkoutAddress.value.trim() || "Alamat belum diisi";

  const items = customerCart.map((item) => {
    const medicine = medicines.find((entry) => entry.id === item.id);
    if (!medicine) return null;
    return {
      name: medicine.name,
      qty: item.qty,
      unitPrice: medicine.price,
      expiry: medicine.expiry,
      subtotal: item.qty * medicine.price,
    };
  }).filter(Boolean);

  if (!items.length) {
    alert("Keranjang tidak valid.");
    return;
  }

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = getCheckoutShippingCost(shippingMethod);
  const total = subtotal + shippingFee;
  const sale = {
    id: `TRX-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().slice(0, 10),
    customer: customerNameValue + (customerPhoneValue ? ` (${customerPhoneValue})` : ""),
    total,
    shippingMethod,
    paymentMethod,
    deliveryAddress,
    items,
    status: "Sudah Dibayar",
    paymentStatus: "Lunas",
    deliveryStatus: "Diproses",
  };

  transactions.unshift(sale);
  customerPurchaseHistory.unshift(sale);
  currentReceipt = sale;

  customerCart.forEach((item) => {
    const medicine = medicines.find((entry) => entry.id === item.id);
    if (!medicine) return;
    medicine.stock = Math.max(0, Number(medicine.stock || 0) - item.qty);
    medicine.status = recalcStatus(medicine.stock);
    addInventoryLog("out", medicine.name, item.qty, `Pembelian customer ${customerNameValue} via ${shippingMethod}`);
  });

  saveState(STORAGE_KEYS.medicines, medicines);
  saveState(STORAGE_KEYS.sales, transactions);
  saveState(STORAGE_KEYS.customerPurchases, customerPurchaseHistory);
  customerCart = [];
  customerPortalName.value = "";
  customerPortalPhone.value = "";
  closeCheckoutModal();
  renderAll();
  openReceiptModal(sale);
}

function buildReceiptMarkup(receipt) {
  const itemsMarkup = receipt.items
    .map(
      (item) => `
        <div class="receipt-item conventional-item">
          <div class="receipt-item-main">
            <span class="item-name">${item.name} x${item.qty}</span>
            <span class="item-expiry">Expired: ${formatDate(item.expiry)}</span>
          </div>
          <div class="receipt-item-price">
            <span>${formatCurrency(item.unitPrice)} / item</span>
            <strong>${formatCurrency(item.subtotal)}</strong>
          </div>
        </div>
      `
    )
    .join("");

  const statusValue = receipt.status || receipt.paymentStatus || "Sudah Dibayar";

  return `
    <div class="receipt-paper">
      <div class="receipt-top">
        <h5>Smart Medicine</h5>
        <p>Apotek • ${receipt.date}</p>
      </div>

      <div class="receipt-detail">
        <div class="receipt-detail-row"><span>Pelanggan:</span> <strong>${receipt.customer || "Umum"}</strong></div>
        <div class="receipt-detail-row"><span>Alamat:</span> <strong>${receipt.deliveryAddress || "-"}</strong></div>
        <div class="receipt-detail-row"><span>Jasa kirim:</span> <strong>${receipt.shippingMethod || "GoSend"}</strong></div>
        <div class="receipt-detail-row"><span>Metode bayar:</span> <strong>${receipt.paymentMethod || "Cash"}</strong></div>
        <div class="receipt-detail-row"><span>Status:</span> <strong>${statusValue}</strong></div>
      </div>

      ${itemsMarkup}

      <div class="receipt-total">
        <span>Total</span>
        <span>${formatCurrency(receipt.total)}</span>
      </div>
    </div>
  `;
}

function buildDigitalReceiptMarkup(receipt) {
  const itemsMarkup = receipt.items
    .map(
      (item) => `
        <div class="receipt-item digital-item">
          <div class="receipt-item-main">
            <span class="item-name">${item.name} x${item.qty}</span>
            <span class="item-expiry">Expired: ${formatDate(item.expiry)}</span>
          </div>
          <div class="receipt-item-price">
            <span>${formatCurrency(item.unitPrice)}</span>
            <strong>${formatCurrency(item.subtotal)}</strong>
          </div>
        </div>
      `
    )
    .join("");

  const statusValue = receipt.status || receipt.paymentStatus || "Sudah Dibayar";
  const customerText = receipt.customer || "Umum";
  const addressText = receipt.deliveryAddress || "Pembelian langsung di toko";

  return `
    <div class="receipt-digital">
      <div class="qr-box" aria-hidden="true"></div>
      <div class="receipt-top digital-header">
        <h5>Invoice Digital</h5>
        <p>Nomor: ${receipt.id}</p>
      </div>

      <div class="receipt-detail digital-detail">
        <div class="receipt-detail-row"><span>Pelanggan:</span> <strong>${customerText}</strong></div>
        <div class="receipt-detail-row"><span>Alamat:</span> <strong>${addressText}</strong></div>
        <div class="receipt-detail-row"><span>Metode bayar:</span> <strong>${receipt.paymentMethod || "Cash"}</strong></div>
        <div class="receipt-detail-row"><span>Status:</span> <strong>${statusValue}</strong></div>
      </div>

      ${itemsMarkup}

      <div class="receipt-total digital-total">
        <span>Total bayar</span>
        <span>${formatCurrency(receipt.total)}</span>
      </div>
    </div>
  `;
}

function renderReceipts() {
  const receipt = currentReceipt || {
    id: "SM-0000",
    date: new Date().toLocaleDateString("id-ID"),
    total: 0,
    items: [{ name: "Belum ada transaksi", qty: 0, unitPrice: 0, expiry: "", subtotal: 0 }],
  };

  receiptConventional.innerHTML = buildReceiptMarkup(receipt);
  receiptDigital.innerHTML = buildDigitalReceiptMarkup(receipt);
  saleReceiptPreview.innerHTML = buildDigitalReceiptMarkup(receipt);
}

function renderAdminCart() {
  if (!adminCartList || !saleCartTotal) return;

  if (!adminCart.length) {
    adminCartList.innerHTML = '<div class="empty-state">Belum ada barang yang dipilih.</div>';
    saleCartTotal.textContent = formatCurrency(0);
    return;
  }

  adminCartList.innerHTML = adminCart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <small>${formatCurrency(item.price)} / pcs • ${formatDate(item.expiry)}</small>
          </div>
          <div class="cart-item-actions">
            <button class="icon-btn minus-btn" data-admin-cart-action="decrease" data-id="${item.id}" type="button">-</button>
            <span>${item.qty}</span>
            <button class="icon-btn plus-btn" data-admin-cart-action="increase" data-id="${item.id}" type="button">+</button>
          </div>
        </div>
      `
    )
    .join("");

  const total = adminCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  saleCartTotal.textContent = formatCurrency(total);
}

function addAdminCartItem(medicineId, quantity = 1) {
  const medicine = medicines.find((item) => item.id === Number(medicineId));
  if (!medicine) return;

  const requestedQty = Number(quantity) || 1;
  if (!Number.isFinite(requestedQty) || requestedQty <= 0) {
    alert("Jumlah barang harus lebih dari 0.");
    return;
  }

  if (Number(medicine.stock || 0) <= 0) {
    alert("Stok obat sudah habis.");
    return;
  }

  const existingItem = adminCart.find((item) => item.id === medicine.id);
  const nextQty = (existingItem ? existingItem.qty : 0) + requestedQty;

  if (nextQty > Number(medicine.stock || 0)) {
    alert(`Stok untuk ${medicine.name} hanya tersisa ${medicine.stock}.`);
    return;
  }

  if (existingItem) {
    existingItem.qty = nextQty;
  } else {
    adminCart.push({ id: medicine.id, name: medicine.name, price: medicine.price, expiry: medicine.expiry, qty: requestedQty });
  }

  renderAdminCart();
  if (saleMedicineSelect) {
    saleMedicineSelect.value = String(medicine.id);
  }
}

function updateAdminCartItem(medicineId, delta) {
  const itemIndex = adminCart.findIndex((entry) => entry.id === Number(medicineId));
  if (itemIndex === -1) return;

  const item = adminCart[itemIndex];
  const medicine = medicines.find((entry) => entry.id === item.id);
  const nextQty = item.qty + delta;

  if (nextQty <= 0) {
    adminCart.splice(itemIndex, 1);
    renderAdminCart();
    return;
  }

  if (medicine && nextQty > Number(medicine.stock || 0)) {
    alert(`Stok untuk ${medicine.name} hanya tersisa ${medicine.stock}.`);
    return;
  }

  item.qty = nextQty;
  renderAdminCart();
}

function clearAdminCart() {
  adminCart = [];
  renderAdminCart();
}

function renderSalesProducts() {
  const list = document.getElementById("salesProductList");
  if (!list) return;

  list.innerHTML = medicines
    .map((item) => {
      const expiredStatus = getExpiryStatus(item.expiry);
      const disabled = Number(item.stock || 0) <= 0 ? "disabled" : "";
      return `
        <article class="sales-product-card">
          <div class="product-info">
            <strong>${item.name}</strong>
            <span class="product-category">${item.category}</span>
            <small class="product-expiry ${expiredStatus.level}">${expiredStatus.label}</small>
            <small class="product-stock">Stok: ${item.stock}</small>
          </div>
          <div class="product-meta">
            <span class="product-price">${formatCurrency(item.price)}</span>
            <button class="primary-btn product-btn" data-sale-product="${item.id}" ${disabled} type="button">Tambah</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderSaleOptions() {
  if (!saleMedicineSelect) return;

  saleMedicineSelect.innerHTML = medicines
    .map((item) => `<option value="${item.id}">${item.name} • ${item.stock} pcs</option>`)
    .join("");

  if (!medicines.length) {
    saleMedicineSelect.innerHTML = '<option value="">Tidak ada obat</option>';
  }
}

function showView(viewName) {
  currentAdminView = viewName;
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });

  if (currentRole === "customer") {
    pageSections.forEach((section) => {
      section.classList.toggle("active", section.dataset.page === "customer");
    });
    return;
  }

  pageSections.forEach((section) => {
    section.classList.toggle("active", section.dataset.page === viewName);
  });
}

function setRole(role) {
  currentRole = role;
  document.body.dataset.role = role;

  roleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.role === role);
  });

  if (role === "customer") {
    pageSections.forEach((section) => {
      section.classList.toggle("active", section.dataset.page === "customer");
    });
    return;
  }

  showView(currentAdminView);
}

function setLoginRole(role) {
  if (!loginRoleButtons.length) {
    loginForms.admin.classList.add("active");
    loginForms.customer.classList.add("active");
    return;
  }

  loginRoleButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.loginRole === role);
  });

  loginForms.admin.classList.toggle("active", role === "admin");
  loginForms.customer.classList.toggle("active", role === "customer");
}

function setAuthMessage(message, isError = false) {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.classList.toggle("error", isError);
}

function handleLoginSubmit(role, event) {
  event.preventDefault();

  const usernameInput = role === "admin" ? document.getElementById("adminUsername") : document.getElementById("customerUsername");
  const passwordInput = role === "admin" ? document.getElementById("adminPassword") : document.getElementById("customerPassword");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  const validCredentials = {
    admin: { username: "admin", password: "admin123" },
    customer: { username: "customer", password: "customer123" },
  };

  const credentials = validCredentials[role];
  if (!credentials || username !== credentials.username || password !== credentials.password) {
    setAuthMessage(`Login ${role} gagal. Username atau password salah.`, true);
    return;
  }

  setAuthMessage("");
  currentRole = role;
  closeReceiptModal();
  closeCheckoutModal();
  localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify({ role }));
  if (role === "customer") {
    customerPortalName.value = "Customer";
  }
  setRole(role);
  showView(role === "customer" ? "customer" : currentAdminView);
  loginScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
}

function closeSettingsMenu() {
  if (!settingsMenu) return;
  settingsMenu.classList.add("hidden");
  if (settingsToggleBtn) {
    settingsToggleBtn.setAttribute("aria-expanded", "false");
  }
}

function toggleSettingsMenu() {
  if (!settingsMenu || !settingsToggleBtn) return;
  const isHidden = settingsMenu.classList.contains("hidden");
  settingsMenu.classList.toggle("hidden", !isHidden);
  settingsToggleBtn.setAttribute("aria-expanded", String(isHidden));
}

function handleLogout() {
  closeReceiptModal();
  closeCheckoutModal();
  closeSettingsMenu();
  localStorage.removeItem(STORAGE_KEYS.auth);
  currentRole = "admin";
  setRole("admin");
  setLoginRole("admin");
  loginScreen.classList.remove("hidden");
  appShell.classList.add("hidden");
  setAuthMessage("Silakan login kembali untuk masuk ke sistem.");
  loginForms.admin.reset();
  loginForms.customer.reset();
}

function restoreAuthSession() {
  closeReceiptModal();
  closeCheckoutModal();
  const saved = localStorage.getItem(STORAGE_KEYS.auth);
  if (!saved) {
    appShell.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    const role = parsed.role === "customer" ? "customer" : "admin";
    currentRole = role;
    if (role === "customer" && customerPortalName) {
      customerPortalName.value = "Customer";
    }
    setRole(role);
    setLoginRole(role);
    appShell.classList.remove("hidden");
    loginScreen.classList.add("hidden");
    showView(role === "customer" ? "customer" : currentAdminView);
  } catch (error) {
    localStorage.removeItem(STORAGE_KEYS.auth);
    appShell.classList.add("hidden");
    loginScreen.classList.remove("hidden");
  }
}

function openReceiptModal(receipt = currentReceipt) {
  if (!receipt) return;
  currentReceipt = receipt;

  const modalTitle = document.getElementById("receiptModalTitle");
  const isDigitalReceipt = receipt.shippingMethod === "Offline" || receipt.paymentMethod === "QRIS" || receipt.deliveryAddress === "Pembelian langsung di toko";

  receiptModalContent.innerHTML = isDigitalReceipt ? buildDigitalReceiptMarkup(receipt) : buildReceiptMarkup(receipt);
  if (modalTitle) {
    modalTitle.textContent = isDigitalReceipt ? "Struk Digital" : "Struk Pembelian";
  }

  receiptModal.classList.remove("hidden");
  receiptModal.setAttribute("aria-hidden", "false");
}

function closeReceiptModal() {
  receiptModal.classList.add("hidden");
  receiptModal.setAttribute("aria-hidden", "true");
}

function openModal(mode, item = null) {
  medicineModal.classList.remove("hidden");
  medicineModal.setAttribute("aria-hidden", "false");

  if (mode === "create") {
    modalTitle.textContent = "Tambah Obat";
    medicineForm.reset();
    formFields.id.value = "";
    formFields.category.value = "Analgesik";
    formFields.status.value = "Tersedia";
    setExpiryWarningMessage(formFields.expiry.value);
    return;
  }

  modalTitle.textContent = "Edit Obat";
  formFields.id.value = item.id;
  formFields.name.value = item.name;
  formFields.category.value = item.category;
  formFields.entryDate.value = item.entryDate || "";
  formFields.stock.value = item.stock;
  formFields.price.value = item.price;
  formFields.expiry.value = item.expiry;
  formFields.status.value = item.status;
  setExpiryWarningMessage(formFields.expiry.value);
}

function closeModal() {
  medicineModal.classList.add("hidden");
  medicineModal.setAttribute("aria-hidden", "true");
  medicineForm.reset();
  if (expiryWarning) {
    expiryWarning.textContent = "";
    expiryWarning.classList.add("hidden");
  }
}

function setExpiryWarningMessage(dateString) {
  if (!expiryWarning || !dateString) {
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiryDate = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(expiryDate.getTime())) {
    expiryWarning.textContent = "";
    expiryWarning.classList.add("hidden");
    return;
  }

  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    expiryWarning.textContent = "Peringatan: tanggal expired sudah lewat. Obat ini sudah kadaluarsa.";
    expiryWarning.classList.remove("hidden");
    expiryWarning.classList.add("expired");
    return;
  }

  if (daysLeft <= 30) {
    expiryWarning.textContent = `Peringatan: obat akan kadaluarsa dalam ${daysLeft} hari.`;
    expiryWarning.classList.remove("hidden");
    expiryWarning.classList.remove("expired");
    return;
  }

  expiryWarning.textContent = "";
  expiryWarning.classList.add("hidden");
  expiryWarning.classList.remove("expired");
}

function handleSaveMedicine(event) {
  event.preventDefault();

  const payload = {
    id: Number(formFields.id.value) || Date.now(),
    name: formFields.name.value.trim(),
    category: formFields.category.value,
    entryDate: formFields.entryDate.value,
    stock: Number(formFields.stock.value) || 0,
    price: Number(formFields.price.value) || 0,
    expiry: formFields.expiry.value,
    status: formFields.status.value,
  };

  if (!payload.name || !payload.entryDate || !payload.expiry) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiryDate = new Date(`${payload.expiry}T00:00:00`);
  if (!Number.isNaN(expiryDate.getTime()) && expiryDate < today) {
    setExpiryWarningMessage(payload.expiry);
    alert("Tanggal expired sudah lewat. Mohon periksa kembali tanggal kadaluarsa obat.");
    return;
  }

  setExpiryWarningMessage(payload.expiry);
  payload.status = recalcStatus(payload.stock);

  const existingIndex = medicines.findIndex((item) => item.id === payload.id);

  if (existingIndex >= 0) {
    medicines[existingIndex] = payload;
  } else {
    medicines.unshift(payload);
    addInventoryLog("in", payload.name, payload.stock, `Obat baru ditambahkan pada ${formatDate(payload.entryDate)}`);
  }

  saveState(STORAGE_KEYS.medicines, medicines);
  renderAll();
  closeModal();
}

function chooseMedicineFromPrompt(actionText) {
  if (!medicines.length) {
    alert("Belum ada obat yang tersedia.");
    return null;
  }

  const list = medicines
    .map((item, index) => `${index + 1}. ${item.name} (${item.stock} pcs)`)
    .join("\n");

  const answer = window.prompt(`${actionText}\n\n${list}\n\nMasukkan nomor obat:`, "1");
  if (answer === null) return null;

  const index = Number(answer) - 1;
  if (!Number.isInteger(index) || index < 0 || index >= medicines.length) {
    alert("Pilihan obat tidak valid.");
    return null;
  }

  return medicines[index];
}

function handleRestock() {
  const medicine = chooseMedicineFromPrompt("Pilih obat yang akan direstok");
  if (!medicine) return;

  const qtyInput = window.prompt(`Berapa jumlah restok untuk ${medicine.name}?`, "10");
  if (qtyInput === null) return;

  const qty = Number(qtyInput);
  if (!Number.isFinite(qty) || qty <= 0) {
    alert("Jumlah restok harus lebih dari 0.");
    return;
  }

  medicine.stock += qty;
  medicine.status = recalcStatus(medicine.stock);
  addInventoryLog("in", medicine.name, qty, "Restok barang dari supplier");
  saveState(STORAGE_KEYS.medicines, medicines);
  renderAll();
}

function handleSaleSubmit(event) {
  event.preventDefault();

  if (!medicines.length) {
    alert("Belum ada obat di inventory.");
    return;
  }

  const paymentMethod = salePaymentMethod ? salePaymentMethod.value : "Cash";
  const customer = customerName.value.trim() || "Umum";
  const customerPhoneValue = customerPhone ? customerPhone.value.trim() : "";
  const customerLabel = customerPhoneValue ? `${customer} (${customerPhoneValue})` : customer;

  const saleEntries = adminCart.length
    ? adminCart.map((item) => ({
        id: item.id,
        name: item.name,
        qty: Number(item.qty) || 0,
        price: Number(item.price) || 0,
        expiry: item.expiry,
      }))
    : (() => {
        if (!saleMedicineSelect || !saleQuantity) {
          alert("Tambah obat terlebih dahulu dari katalog di sebelah kiri.");
          return [];
        }

        const medicineId = Number(saleMedicineSelect.value);
        const medicine = medicines.find((item) => item.id === medicineId);
        const qty = Number(saleQuantity.value);

        if (!medicine) {
          alert("Obat tidak ditemukan.");
          return [];
        }

        if (!Number.isFinite(qty) || qty <= 0) {
          alert("Jumlah harus lebih dari 0.");
          return [];
        }

        if (qty > medicine.stock) {
          alert(`Stok tidak cukup. Sisa stok: ${medicine.stock}`);
          return [];
        }

        return [{ id: medicine.id, name: medicine.name, qty, price: medicine.price, expiry: medicine.expiry }];
      })();

  const validEntries = saleEntries.filter((entry) => entry && Number(entry.qty) > 0);
  if (!validEntries.length) {
    alert("Keranjang transaksi masih kosong.");
    return;
  }

  const invalidStock = validEntries.find((entry) => {
    const medicine = medicines.find((item) => item.id === entry.id);
    return medicine && Number(entry.qty) > Number(medicine.stock || 0);
  });

  if (invalidStock) {
    alert(`Stok tidak cukup untuk ${invalidStock.name}.`);
    return;
  }

  validEntries.forEach((entry) => {
    const medicine = medicines.find((item) => item.id === entry.id);
    if (!medicine) return;

    medicine.stock = Math.max(0, Number(medicine.stock || 0) - Number(entry.qty));
    medicine.status = recalcStatus(medicine.stock);
    addInventoryLog("out", medicine.name, Number(entry.qty), `Penjualan offline ke ${customerLabel} via ${paymentMethod}`);
  });

  const items = validEntries.map((entry) => {
    const subtotal = Number(entry.qty) * Number(entry.price);
    return {
      name: entry.name,
      qty: Number(entry.qty),
      unitPrice: Number(entry.price),
      expiry: entry.expiry,
      subtotal,
    };
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const newSale = {
    id: `TRX-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().slice(0, 10),
    customer: customerLabel,
    phone: customerPhoneValue,
    total,
    shippingMethod: "Offline",
    paymentMethod,
    deliveryAddress: "Pembelian langsung di toko",
    items,
    status: "Sudah Dibayar",
    paymentStatus: "Lunas",
    deliveryStatus: "Selesai",
  };

  transactions.unshift(newSale);
  currentReceipt = newSale;
  if (adminCart.length) {
    adminCart = [];
  }

  saveState(STORAGE_KEYS.medicines, medicines);
  saveState(STORAGE_KEYS.sales, transactions);
  renderAll();
  saleReceiptPreview.innerHTML = buildDigitalReceiptMarkup(newSale);
  openReceiptModal(newSale);

  saleForm.reset();
  if (customerPhone) {
    customerPhone.value = "";
  }
  if (saleQuantity) {
    saleQuantity.value = 1;
  }
  if (salePaymentMethod) {
    salePaymentMethod.value = "Cash";
  }
}

function handleSupplierSubmit(event) {
  event.preventDefault();

  const supplier = {
    id: Date.now(),
    name: document.getElementById("supplierName").value.trim(),
    contact: document.getElementById("supplierContact").value.trim(),
    address: document.getElementById("supplierAddress").value.trim(),
    status: "Aktif",
  };

  if (!supplier.name || !supplier.contact || !supplier.address) return;

  suppliers.unshift(supplier);
  saveState(STORAGE_KEYS.suppliers, suppliers);
  supplierForm.reset();
  renderSuppliers();
}

function handleTableClick(event) {
  const actionEl = event.target.closest("[data-action]");
  if (!actionEl) return;

  const id = Number(actionEl.dataset.id);
  const medicine = medicines.find((item) => item.id === id);
  if (!medicine) return;

  if (actionEl.dataset.action === "edit") {
    openModal("edit", medicine);
    return;
  }

  if (actionEl.dataset.action === "sell") {
    const qtyInput = window.prompt(`Masukkan jumlah pembelian untuk ${medicine.name}:`, "1");
    if (qtyInput === null) return;

    const qty = Number(qtyInput);
    if (!Number.isFinite(qty) || qty <= 0) {
      alert("Jumlah pembelian harus lebih dari 0.");
      return;
    }

    if (qty > medicine.stock) {
      alert(`Stok tidak cukup. Sisa stok: ${medicine.stock}`);
      return;
    }

    medicine.stock = Math.max(0, medicine.stock - qty);
    medicine.status = recalcStatus(medicine.stock);

    const sale = {
      id: `TRX-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString().slice(0, 10),
      customer: "Umum",
      total: medicine.price * qty,
      shippingMethod: "Offline",
      paymentMethod: "Cash",
      deliveryAddress: "Pembelian langsung di toko",
      items: [{ name: medicine.name, qty, unitPrice: medicine.price, expiry: medicine.expiry, subtotal: medicine.price * qty }],
      status: "Sudah Dibayar",
      paymentStatus: "Lunas",
      deliveryStatus: "Selesai",
    };

    transactions.unshift(sale);
    currentReceipt = sale;
    addInventoryLog("out", medicine.name, qty, "Penjualan kasir offline");
    saveState(STORAGE_KEYS.medicines, medicines);
    saveState(STORAGE_KEYS.sales, transactions);
    renderAll();
    openReceiptModal(sale);
    return;
  }

  if (actionEl.dataset.action === "delete") {
    const confirmed = window.confirm(`Hapus ${medicine.name} dari inventaris?`);
    if (!confirmed) return;

    addInventoryLog("out", medicine.name, medicine.stock, "Data obat dihapus dari inventaris");
    medicines = medicines.filter((item) => item.id !== id);
    saveState(STORAGE_KEYS.medicines, medicines);
    renderAll();
  }
}

function renderAll() {
  closeReceiptModal();
  closeCheckoutModal();
  renderSummary();
  renderLowStock();
  renderInventoryTable();
  renderInventoryLogs();
  renderSuppliers();
  renderSalesHistory();
  renderSalesProducts();
  renderSaleOptions();
  renderAdminCart();
  renderCustomerProducts();
  renderCustomerCart();
  renderCustomerPurchaseHistory();
  renderReceipts();
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

roleButtons.forEach((button) => {
  button.addEventListener("click", () => setRole(button.dataset.role));
});

loginRoleButtons.forEach((button) => {
  button.addEventListener("click", () => setLoginRole(button.dataset.loginRole));
});

loginForms.admin.addEventListener("submit", (event) => handleLoginSubmit("admin", event));
loginForms.customer.addEventListener("submit", (event) => handleLoginSubmit("customer", event));
if (logoutBtn) {
  logoutBtn.addEventListener("click", handleLogout);
}

if (settingsToggleBtn) {
  settingsToggleBtn.addEventListener("click", toggleSettingsMenu);
}

if (settingsMenu) {
  settingsMenu.addEventListener("click", (event) => {
    const actionEl = event.target.closest("[data-setting-action]");
    if (!actionEl) return;

    const action = actionEl.dataset.settingAction;
    closeSettingsMenu();

    if (action === "logout") {
      handleLogout();
      return;
    }

    if (action === "profile") {
      alert("Edit profile akan tersedia di versi berikutnya.");
      return;
    }

    if (action === "help") {
      alert("Bantuan: gunakan menu navigasi untuk mengelola obat, transaksi, dan riwayat pembelian.");
    }
  });
}

document.addEventListener("click", (event) => {
  if (!settingsMenu || !settingsToggleBtn) return;
  if (!settingsMenu.contains(event.target) && !settingsToggleBtn.contains(event.target)) {
    closeSettingsMenu();
  }
});

addMedicineBtn.addEventListener("click", () => openModal("create"));
restockBtn.addEventListener("click", handleRestock);
saleBtn.addEventListener("click", () => {
  const medicine = chooseMedicineFromPrompt("Pilih obat yang terjual");
  if (medicine) {
    if (saleMedicineSelect) {
      saleMedicineSelect.value = String(medicine.id);
    }
    showView("sales");
  }
});
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
medicineForm.addEventListener("submit", handleSaveMedicine);
formFields.expiry.addEventListener("input", (event) => setExpiryWarningMessage(event.target.value));
medicineTableBody.addEventListener("click", handleTableClick);
inventoryTableBody.addEventListener("click", handleTableClick);
searchInput.addEventListener("input", renderInventoryTable);
customerSearch.addEventListener("input", renderCustomerProducts);
customerProductList.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-customer-product]");
  if (!btn) return;
  addCustomerCartItem(btn.dataset.customerProduct);
});

const salesProductList = document.getElementById("salesProductList");
if (salesProductList) {
  salesProductList.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-sale-product]");
    if (!btn) return;
    const selectedId = Number(btn.dataset.saleProduct);
    const medicine = medicines.find((item) => item.id === selectedId);
    if (!medicine) return;

    if (saleQuantity) {
      saleQuantity.value = String(Math.max(1, Number(saleQuantity.value) || 1));
      saleQuantity.focus();
      saleQuantity.select();
    }

    addAdminCartItem(selectedId, Number(saleQuantity?.value) || 1);
    if (saleMedicineSelect) {
      saleMedicineSelect.value = String(selectedId);
    }
  });
}

if (adminCartList) {
  adminCartList.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-admin-cart-action]");
    if (!btn) return;

    const delta = btn.dataset.adminCartAction === "increase" ? 1 : -1;
    updateAdminCartItem(btn.dataset.id, delta);
  });
}

if (clearSaleCartBtn) {
  clearSaleCartBtn.addEventListener("click", clearAdminCart);
}

customerCartItems.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-cart-action]");
  if (!btn) return;
  const delta = btn.dataset.cartAction === "increase" ? 1 : -1;
  updateCustomerCartItem(btn.dataset.id, delta);
});
customerPortalName.addEventListener("input", renderCustomerPurchaseHistory);
customerHistoryFilter.addEventListener("change", renderCustomerPurchaseHistory);
customerPurchaseHistoryList.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-history-id]");
  if (!btn) return;

  const receipt = customerPurchaseHistory.find((entry) => entry.id === btn.dataset.historyId);
  if (!receipt) return;

  openReceiptModal(receipt);
});
customerCheckoutBtn.addEventListener("click", handleCustomerCheckout);
confirmCheckoutBtn.addEventListener("click", finalizeCustomerCheckout);
closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
cancelCheckoutBtn.addEventListener("click", closeCheckoutModal);
checkoutModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeCheckout === "true") {
    closeCheckoutModal();
  }
});
document.querySelectorAll('input[name="shippingMethod"]').forEach((input) => {
  input.addEventListener("change", updateCheckoutSummary);
});
saleForm.addEventListener("submit", handleSaleSubmit);
supplierForm.addEventListener("submit", handleSupplierSubmit);
medicineModal.addEventListener("click", (event) => {
  if (event.target.dataset.close === "true") {
    closeModal();
  }
});
receiptModal.addEventListener("click", (event) => {
  if (event.target.dataset.closeReceipt === "true") {
    closeReceiptModal();
  }
});
closeReceiptBtn.addEventListener("click", closeReceiptModal);
closeReceiptActionBtn.addEventListener("click", closeReceiptModal);
printReceiptBtn.addEventListener("click", () => {
  window.print();
});

document.body.dataset.role = currentRole;
setLoginRole("admin");
renderAll();
restoreAuthSession();
