const STORAGE_KEYS = {
  medicines: "smart-medicine-stock",
  suppliers: "smart-medicine-suppliers",
  sales: "smart-medicine-sales",
  logs: "smart-medicine-inventory-log",
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
const customerName = document.getElementById("customerName");
const saleReceiptPreview = document.getElementById("saleReceiptPreview");
const customerSearch = document.getElementById("customerSearch");
const customerProductList = document.getElementById("customerProductList");
const customerCartItems = document.getElementById("customerCartItems");
const customerTotal = document.getElementById("customerTotal");
const customerPortalName = document.getElementById("customerPortalName");
const customerPortalPhone = document.getElementById("customerPortalPhone");
const customerCheckoutBtn = document.getElementById("customerCheckoutBtn");
const supplierForm = document.getElementById("supplierForm");
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

let medicines = loadState(STORAGE_KEYS.medicines, seedMedicines);
let suppliers = loadState(STORAGE_KEYS.suppliers, seedSuppliers);
let transactions = loadState(STORAGE_KEYS.sales, seedTransactions);
let inventoryLogs = loadState(STORAGE_KEYS.logs, seedLogs);
let currentReceipt = transactions[0] || null;
let customerCart = [];
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
            <button class="primary-btn product-btn" data-customer-product="${item.id}" ${disabled}>${inCartQty ? `Tambah (${inCartQty})` : "Tambah"}</button>
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

function handleCustomerCheckout() {
  if (!customerCart.length) {
    alert("Keranjang masih kosong.");
    return;
  }

  const customerNameValue = (customerPortalName && customerPortalName.value.trim()) || "Umum";
  const customerPhoneValue = customerPortalPhone ? customerPortalPhone.value.trim() : "";

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

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);
  const sale = {
    id: `TRX-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().slice(0, 10),
    customer: customerNameValue + (customerPhoneValue ? ` (${customerPhoneValue})` : ""),
    total,
    items,
  };

  transactions.unshift(sale);
  currentReceipt = sale;

  customerCart.forEach((item) => {
    const medicine = medicines.find((entry) => entry.id === item.id);
    if (!medicine) return;
    medicine.stock = Math.max(0, Number(medicine.stock || 0) - item.qty);
    medicine.status = recalcStatus(medicine.stock);
    addInventoryLog("out", medicine.name, item.qty, `Pembelian customer ${customerNameValue}`);
  });

  saveState(STORAGE_KEYS.medicines, medicines);
  saveState(STORAGE_KEYS.sales, transactions);
  customerCart = [];
  customerPortalName.value = "";
  customerPortalPhone.value = "";
  renderAll();
  openReceiptModal(sale);
}

function buildReceiptMarkup(receipt) {
  const itemsMarkup = receipt.items
    .map(
      (item) => `
        <div class="receipt-item">
          <span class="item-name">${item.name} x${item.qty}</span>
          <span class="item-expiry">Expired: ${formatDate(item.expiry)}</span>
          <div class="receipt-meta">
            <span>${formatCurrency(item.unitPrice)} / item</span>
            <strong>${formatCurrency(item.subtotal)}</strong>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <div class="receipt-paper">
      <div class="receipt-top">
        <h5>Smart Medicine</h5>
        <p>Apotek • ${receipt.date}</p>
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
        <div class="receipt-item">
          <span class="item-name">${item.name} x${item.qty}</span>
          <span class="item-expiry">Expired: ${formatDate(item.expiry)}</span>
          <div class="receipt-meta">
            <span>${formatCurrency(item.unitPrice)}</span>
            <strong>${formatCurrency(item.subtotal)}</strong>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <div class="receipt-digital">
      <div class="qr-box" aria-hidden="true"></div>
      <div class="receipt-top">
        <h5>Invoice Digital</h5>
        <p>Nomor: ${receipt.id}</p>
      </div>
      ${itemsMarkup}
      <div class="receipt-total">
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
  saleReceiptPreview.innerHTML = buildReceiptMarkup(receipt);
}

function renderSaleOptions() {
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
  setRole(role);
  showView(role === "customer" ? "customer" : currentAdminView);
  loginScreen.classList.add("hidden");
  appShell.classList.remove("hidden");
}

function handleLogout() {
  currentRole = "admin";
  setRole("admin");
  setLoginRole("admin");
  loginScreen.classList.remove("hidden");
  appShell.classList.add("hidden");
  setAuthMessage("Silakan login kembali untuk masuk ke sistem.");
  loginForms.admin.reset();
  loginForms.customer.reset();
}

function openReceiptModal(receipt = currentReceipt) {
  if (!receipt) return;
  currentReceipt = receipt;
  receiptModalContent.innerHTML = buildReceiptMarkup(receipt);
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
}

function closeModal() {
  medicineModal.classList.add("hidden");
  medicineModal.setAttribute("aria-hidden", "true");
  medicineForm.reset();
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

  const medicineId = Number(saleMedicineSelect.value);
  const medicine = medicines.find((item) => item.id === medicineId);
  const qty = Number(saleQuantity.value);

  if (!medicine) {
    alert("Obat tidak ditemukan.");
    return;
  }

  if (!Number.isFinite(qty) || qty <= 0) {
    alert("Jumlah harus lebih dari 0.");
    return;
  }

  if (qty > medicine.stock) {
    alert(`Stok tidak cukup. Sisa stok: ${medicine.stock}`);
    return;
  }

  medicine.stock = Math.max(0, medicine.stock - qty);
  medicine.status = recalcStatus(medicine.stock);

  const customer = customerName.value.trim() || "Umum";
  const total = medicine.price * qty;
  const newSale = {
    id: `TRX-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().slice(0, 10),
    customer,
    total,
    items: [{ name: medicine.name, qty, unitPrice: medicine.price, expiry: medicine.expiry, subtotal: total }],
  };

  transactions.unshift(newSale);
  currentReceipt = newSale;
  addInventoryLog("out", medicine.name, qty, `Penjualan ke ${customer}`);
  saveState(STORAGE_KEYS.medicines, medicines);
  saveState(STORAGE_KEYS.sales, transactions);
  renderAll();
  openReceiptModal(newSale);

  saleForm.reset();
  saleQuantity.value = 1;
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
      items: [{ name: medicine.name, qty, unitPrice: medicine.price, expiry: medicine.expiry, subtotal: medicine.price * qty }],
    };

    transactions.unshift(sale);
    currentReceipt = sale;
    addInventoryLog("out", medicine.name, qty, "Penjualan kasir");
    saveState(STORAGE_KEYS.medicines, medicines);
    saveState(STORAGE_KEYS.sales, transactions);
    renderAll();
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
  renderSummary();
  renderLowStock();
  renderInventoryTable();
  renderInventoryLogs();
  renderSuppliers();
  renderSalesHistory();
  renderSaleOptions();
  renderCustomerProducts();
  renderCustomerCart();
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
logoutBtn.addEventListener("click", handleLogout);

addMedicineBtn.addEventListener("click", () => openModal("create"));
restockBtn.addEventListener("click", handleRestock);
saleBtn.addEventListener("click", () => {
  const medicine = chooseMedicineFromPrompt("Pilih obat yang terjual");
  if (medicine) {
    saleMedicineSelect.value = String(medicine.id);
    showView("sales");
  }
});
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
medicineForm.addEventListener("submit", handleSaveMedicine);
medicineTableBody.addEventListener("click", handleTableClick);
inventoryTableBody.addEventListener("click", handleTableClick);
searchInput.addEventListener("input", renderInventoryTable);
customerSearch.addEventListener("input", renderCustomerProducts);
customerProductList.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-customer-product]");
  if (!btn) return;
  addCustomerCartItem(btn.dataset.customerProduct);
});
customerCartItems.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-cart-action]");
  if (!btn) return;
  const delta = btn.dataset.cartAction === "increase" ? 1 : -1;
  updateCustomerCartItem(btn.dataset.id, delta);
});
customerCheckoutBtn.addEventListener("click", handleCustomerCheckout);
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
appShell.classList.add("hidden");
loginScreen.classList.remove("hidden");
renderAll();
