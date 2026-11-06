-- ============================================================
-- Perancangan Database Pemantauan Stok dan Masa Kedaluwarsa Obat di Apotek
-- Sintaks: SQL standar (kompatibel MySQL / MariaDB)
-- Data uji bersifat dummy. Tanggal acuan: 2026-11-02
-- ============================================================

-- ===== DDL =====
CREATE TABLE kategori_obat (
    id_kategori   CHAR(4)      NOT NULL,
    nama_kategori VARCHAR(50)  NOT NULL,
    keterangan    VARCHAR(100),
    PRIMARY KEY (id_kategori)
);

CREATE TABLE obat (
    id_obat         CHAR(5)       NOT NULL,
    nomor_izin_edar VARCHAR(20)   NOT NULL UNIQUE,
    nama_generik    VARCHAR(60)   NOT NULL,
    merek           VARCHAR(60)   NOT NULL,
    id_kategori     CHAR(4)       NOT NULL,
    bentuk_sediaan  VARCHAR(30)   NOT NULL,
    kekuatan        VARCHAR(30),
    produsen        VARCHAR(60),
    satuan          VARCHAR(20)   NOT NULL,
    harga_jual      DECIMAL(10,2) NOT NULL CHECK (harga_jual >= 0),
    stok_minimum    INT           NOT NULL CHECK (stok_minimum >= 0),
    PRIMARY KEY (id_obat),
    FOREIGN KEY (id_kategori) REFERENCES kategori_obat(id_kategori)
);

CREATE TABLE pemasok (
    id_pemasok   CHAR(4)      NOT NULL,
    nama_pemasok VARCHAR(80)  NOT NULL,
    alamat       VARCHAR(120),
    no_telepon   VARCHAR(20),
    PRIMARY KEY (id_pemasok)
);

CREATE TABLE karyawan (
    id_karyawan   CHAR(4)      NOT NULL,
    nama_karyawan VARCHAR(60)  NOT NULL,
    jabatan       VARCHAR(40)  NOT NULL,
    no_telepon    VARCHAR(20),
    PRIMARY KEY (id_karyawan)
);

CREATE TABLE pelanggan (
    id_pelanggan   CHAR(4)      NOT NULL,
    nama_pelanggan VARCHAR(60)  NOT NULL,
    no_telepon     VARCHAR(20),
    alamat         VARCHAR(120),
    PRIMARY KEY (id_pelanggan)
);

CREATE TABLE pembelian (
    id_pembelian      CHAR(4)       NOT NULL,
    id_pemasok        CHAR(4)       NOT NULL,
    id_karyawan       CHAR(4)       NOT NULL,
    no_faktur         VARCHAR(20)   NOT NULL UNIQUE,
    tanggal_pembelian DATE          NOT NULL,
    total_pembelian   DECIMAL(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id_pembelian),
    FOREIGN KEY (id_pemasok)  REFERENCES pemasok(id_pemasok),
    FOREIGN KEY (id_karyawan) REFERENCES karyawan(id_karyawan)
);

CREATE TABLE detail_pembelian (
    id_detail_pembelian CHAR(5)       NOT NULL,
    id_pembelian        CHAR(4)       NOT NULL,
    id_obat             CHAR(5)       NOT NULL,
    jumlah              INT           NOT NULL CHECK (jumlah > 0),
    harga_beli          DECIMAL(10,2) NOT NULL CHECK (harga_beli >= 0),
    PRIMARY KEY (id_detail_pembelian),
    FOREIGN KEY (id_pembelian) REFERENCES pembelian(id_pembelian),
    FOREIGN KEY (id_obat)      REFERENCES obat(id_obat)
);

CREATE TABLE batch_obat (
    id_batch            CHAR(4)     NOT NULL,
    id_detail_pembelian CHAR(5)     NOT NULL,
    no_batch            VARCHAR(20) NOT NULL,
    tanggal_kedaluwarsa DATE        NOT NULL,
    stok_awal           INT         NOT NULL CHECK (stok_awal > 0),
    stok_saat_ini       INT         NOT NULL CHECK (stok_saat_ini >= 0),
    PRIMARY KEY (id_batch),
    FOREIGN KEY (id_detail_pembelian) REFERENCES detail_pembelian(id_detail_pembelian)
);

CREATE TABLE penjualan (
    id_penjualan      CHAR(4)       NOT NULL,
    id_pelanggan      CHAR(4),
    id_karyawan       CHAR(4)       NOT NULL,
    tanggal_penjualan DATE          NOT NULL,
    total_penjualan   DECIMAL(12,2) NOT NULL DEFAULT 0,
    PRIMARY KEY (id_penjualan),
    FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id_pelanggan),
    FOREIGN KEY (id_karyawan)  REFERENCES karyawan(id_karyawan)
);


CREATE TABLE penyesuaian_stok (
    id_penyesuaian CHAR(4)      NOT NULL,
    id_batch       CHAR(4)      NOT NULL,
    id_karyawan    CHAR(4)      NOT NULL,
    tanggal        DATE         NOT NULL,
    jumlah         INT          NOT NULL CHECK (jumlah > 0),
    alasan         VARCHAR(10)  NOT NULL CHECK (alasan IN ('rusak','hilang','koreksi')),
    keterangan     VARCHAR(100),
    PRIMARY KEY (id_penyesuaian),
    FOREIGN KEY (id_batch)    REFERENCES batch_obat(id_batch),
    FOREIGN KEY (id_karyawan) REFERENCES karyawan(id_karyawan)
);

CREATE TABLE pemusnahan_obat (
    id_pemusnahan      CHAR(4)      NOT NULL,
    id_batch           CHAR(4)      NOT NULL,
    id_karyawan        CHAR(4)      NOT NULL,
    tanggal_pemusnahan DATE         NOT NULL,
    jumlah             INT          NOT NULL CHECK (jumlah > 0),
    keterangan         VARCHAR(100),
    PRIMARY KEY (id_pemusnahan),
    FOREIGN KEY (id_batch)    REFERENCES batch_obat(id_batch),
    FOREIGN KEY (id_karyawan) REFERENCES karyawan(id_karyawan)
);

-- ===== VIEW =====
CREATE VIEW v_stok_batch AS
SELECT b.id_batch, o.id_obat, o.nama_generik, o.merek, b.no_batch,
       b.tanggal_kedaluwarsa, b.stok_awal, b.stok_saat_ini,
       dp.harga_beli, o.stok_minimum
FROM batch_obat b
JOIN detail_pembelian dp ON dp.id_detail_pembelian = b.id_detail_pembelian
JOIN obat o ON o.id_obat = dp.id_obat;

-- ===== DATA UJI =====
-- kategori_obat
INSERT INTO kategori_obat (id_kategori, nama_kategori, keterangan) VALUES ('K001', 'Analgesik dan Antipiretik', 'Pereda nyeri dan penurun demam');
INSERT INTO kategori_obat (id_kategori, nama_kategori, keterangan) VALUES ('K002', 'Antibiotik', 'Obat infeksi bakteri (resep dokter)');
INSERT INTO kategori_obat (id_kategori, nama_kategori, keterangan) VALUES ('K003', 'Saluran Cerna', 'Maag, diare, dan rehidrasi');
INSERT INTO kategori_obat (id_kategori, nama_kategori, keterangan) VALUES ('K004', 'Vitamin dan Suplemen', 'Penunjang daya tahan tubuh');
INSERT INTO kategori_obat (id_kategori, nama_kategori, keterangan) VALUES ('K005', 'Batuk dan Flu', 'Obat batuk dan pilek');
INSERT INTO kategori_obat (id_kategori, nama_kategori, keterangan) VALUES ('K006', 'Antialergi', 'Obat alergi dan gatal');

-- obat
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB001', 'DUMMY-NIE-001', 'Paracetamol', 'Sanmol', 'K001', 'Tablet', '500 mg', 'Sanbe Farma', 'Strip', 5000, 50);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB002', 'DUMMY-NIE-002', 'Amoxicillin', 'Amoxicillin Generik', 'K002', 'Kapsul', '500 mg', 'Kimia Farma', 'Strip', 12000, 30);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB003', 'DUMMY-NIE-003', 'Ibuprofen', 'Ibuprofen Generik', 'K001', 'Tablet', '400 mg', 'Kimia Farma', 'Strip', 8000, 30);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB004', 'DUMMY-NIE-004', 'Antasida', 'Antasida DOEN', 'K003', 'Tablet Kunyah', '400 mg', 'Kimia Farma', 'Strip', 4000, 40);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB005', 'DUMMY-NIE-005', 'Vitamin C', 'Vitamin C Generik', 'K004', 'Tablet', '500 mg', 'Kimia Farma', 'Strip', 6000, 40);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB006', 'DUMMY-NIE-006', 'Glyceryl Guaiacolate', 'OBH Sirup', 'K005', 'Sirup', '100 ml', 'Indofarma', 'Botol', 15000, 20);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB007', 'DUMMY-NIE-007', 'Cetirizine', 'Cetirizine Generik', 'K006', 'Tablet', '10 mg', 'Kimia Farma', 'Strip', 7000, 20);
INSERT INTO obat (id_obat, nomor_izin_edar, nama_generik, merek, id_kategori, bentuk_sediaan, kekuatan, produsen, satuan, harga_jual, stok_minimum) VALUES ('OB008', 'DUMMY-NIE-008', 'Oralit', 'Oralit', 'K003', 'Serbuk', '4,1 g', 'Indofarma', 'Sachet', 2500, 30);

-- pemasok
INSERT INTO pemasok (id_pemasok, nama_pemasok, alamat, no_telepon) VALUES ('S001', 'PBF Mitra Sehat Malang', 'Jl. Contoh No. 10, Malang', '0341-000101');
INSERT INTO pemasok (id_pemasok, nama_pemasok, alamat, no_telepon) VALUES ('S002', 'PT Sumber Farma Jatim', 'Jl. Contoh No. 25, Surabaya', '031-000202');
INSERT INTO pemasok (id_pemasok, nama_pemasok, alamat, no_telepon) VALUES ('S003', 'CV Medika Prima', 'Jl. Contoh No. 7, Malang', '0341-000303');

-- karyawan
INSERT INTO karyawan (id_karyawan, nama_karyawan, jabatan, no_telepon) VALUES ('E001', 'Dewi Lestari', 'Apoteker Penanggung Jawab', '081200000001');
INSERT INTO karyawan (id_karyawan, nama_karyawan, jabatan, no_telepon) VALUES ('E002', 'Budi Santoso', 'Asisten Apoteker', '081200000002');
INSERT INTO karyawan (id_karyawan, nama_karyawan, jabatan, no_telepon) VALUES ('E003', 'Rina Wulandari', 'Kasir', '081200000003');

-- pelanggan
INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, no_telepon, alamat) VALUES ('C001', 'Siti Aminah', '081300000001', 'Malang');
INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, no_telepon, alamat) VALUES ('C002', 'Agus Prasetyo', '081300000002', 'Malang');
INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, no_telepon, alamat) VALUES ('C003', 'Nur Hidayah', '081300000003', 'Batu');
INSERT INTO pelanggan (id_pelanggan, nama_pelanggan, no_telepon, alamat) VALUES ('C004', 'Hendra Wijaya', '081300000004', 'Malang');

-- pembelian
INSERT INTO pembelian (id_pembelian, id_pemasok, id_karyawan, no_faktur, tanggal_pembelian, total_pembelian) VALUES ('P001', 'S001', 'E001', 'F-2606-001', '2026-06-10', 820000);
INSERT INTO pembelian (id_pembelian, id_pemasok, id_karyawan, no_faktur, tanggal_pembelian, total_pembelian) VALUES ('P002', 'S002', 'E001', 'F-2607-014', '2026-07-15', 1420000);
INSERT INTO pembelian (id_pembelian, id_pemasok, id_karyawan, no_faktur, tanggal_pembelian, total_pembelian) VALUES ('P003', 'S001', 'E002', 'F-2609-003', '2026-09-01', 991000);
INSERT INTO pembelian (id_pembelian, id_pemasok, id_karyawan, no_faktur, tanggal_pembelian, total_pembelian) VALUES ('P004', 'S003', 'E002', 'F-2610-007', '2026-10-05', 288000);

-- detail_pembelian
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0001', 'P001', 'OB001', 200, 3200);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0002', 'P001', 'OB001', 60, 3000);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0003', 'P002', 'OB002', 50, 8000);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0004', 'P002', 'OB002', 80, 8200);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0005', 'P002', 'OB003', 40, 5000);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0006', 'P002', 'OB005', 30, 3800);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0007', 'P002', 'OB004', 20, 2500);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0008', 'P003', 'OB004', 100, 2500);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0009', 'P003', 'OB005', 120, 3800);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0010', 'P003', 'OB006', 30, 9500);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0011', 'P004', 'OB007', 40, 4200);
INSERT INTO detail_pembelian (id_detail_pembelian, id_pembelian, id_obat, jumlah, harga_beli) VALUES ('D0012', 'P004', 'OB008', 100, 1200);

-- batch_obat
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B001', 'D0001', 'A2601', '2028-03-31', 200, 153);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B002', 'D0002', 'A2509', '2026-12-15', 60, 7);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B003', 'D0003', 'AM2510', '2027-01-20', 50, 22);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B004', 'D0004', 'AM2601', '2028-06-30', 80, 70);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B005', 'D0005', 'IB2512', '2026-10-15', 40, 18);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B006', 'D0006', 'VC2505', '2026-09-30', 30, 0);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B007', 'D0007', 'AN2505', '2026-08-31', 20, 0);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B008', 'D0008', 'AN2603', '2028-02-28', 100, 65);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B009', 'D0009', 'VC2604', '2027-09-30', 120, 98);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B010', 'D0010', 'BT2602', '2027-04-30', 30, 18);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B011', 'D0011', 'CT2511', '2027-12-31', 40, 34);
INSERT INTO batch_obat (id_batch, id_detail_pembelian, no_batch, tanggal_kedaluwarsa, stok_awal, stok_saat_ini) VALUES ('B012', 'D0012', 'OR2603', '2028-01-31', 100, 72);

-- penjualan
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J001', 'C001', 'E003', '2026-08-10', 142000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J002', 'C002', 'E003', '2026-08-22', 139000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J003', NULL, 'E002', '2026-09-05', 280000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J004', 'C003', 'E003', '2026-09-18', 216000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J005', NULL, 'E003', '2026-10-03', 161000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J006', 'C004', 'E002', '2026-10-12', 288000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J007', 'C001', 'E003', '2026-10-20', 144500);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J008', 'C002', 'E003', '2026-10-28', 260000);
INSERT INTO penjualan (id_penjualan, id_pelanggan, id_karyawan, tanggal_penjualan, total_penjualan) VALUES ('J009', NULL, 'E003', '2026-11-01', 172000);

-- detail_penjualan
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ001', 'J001', 'B002', 10, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ002', 'J001', 'B003', 6, 12000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ003', 'J001', 'B007', 5, 4000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ004', 'J002', 'B002', 15, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ005', 'J002', 'B005', 8, 8000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ006', 'J003', 'B002', 20, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ007', 'J003', 'B003', 10, 12000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ008', 'J003', 'B006', 10, 6000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ009', 'J004', 'B005', 12, 8000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ010', 'J004', 'B006', 10, 6000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ011', 'J004', 'B008', 15, 4000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ012', 'J005', 'B002', 5, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ013', 'J005', 'B003', 8, 12000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ014', 'J005', 'B008', 10, 4000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ015', 'J006', 'B003', 4, 12000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ016', 'J006', 'B010', 12, 15000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ017', 'J006', 'B009', 10, 6000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ018', 'J007', 'B002', 3, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ019', 'J007', 'B001', 10, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ020', 'J007', 'B011', 6, 7000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ021', 'J007', 'B012', 15, 2500);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ022', 'J008', 'B004', 10, 12000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ023', 'J008', 'B001', 20, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ024', 'J008', 'B008', 10, 4000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ025', 'J009', 'B001', 15, 5000);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ026', 'J009', 'B012', 10, 2500);
INSERT INTO detail_penjualan (id_detail_penjualan, id_penjualan, id_batch, jumlah, harga_satuan) VALUES ('DJ027', 'J009', 'B009', 12, 6000);

-- penyesuaian_stok
INSERT INTO penyesuaian_stok (id_penyesuaian, id_batch, id_karyawan, tanggal, jumlah, alasan, keterangan) VALUES ('Y001', 'B001', 'E001', '2026-10-25', 2, 'rusak', 'Kemasan penyok saat penataan rak');
INSERT INTO penyesuaian_stok (id_penyesuaian, id_batch, id_karyawan, tanggal, jumlah, alasan, keterangan) VALUES ('Y002', 'B012', 'E002', '2026-10-30', 3, 'hilang', 'Selisih saat stok opname');
INSERT INTO penyesuaian_stok (id_penyesuaian, id_batch, id_karyawan, tanggal, jumlah, alasan, keterangan) VALUES ('Y003', 'B005', 'E001', '2026-09-25', 2, 'rusak', 'Strip terkena air');

-- pemusnahan_obat
INSERT INTO pemusnahan_obat (id_pemusnahan, id_batch, id_karyawan, tanggal_pemusnahan, jumlah, keterangan) VALUES ('M001', 'B007', 'E001', '2026-09-03', 15, 'Melewati tanggal kedaluwarsa');
INSERT INTO pemusnahan_obat (id_pemusnahan, id_batch, id_karyawan, tanggal_pemusnahan, jumlah, keterangan) VALUES ('M002', 'B006', 'E001', '2026-10-02', 10, 'Melewati tanggal kedaluwarsa');

-- ===== QUERY LAPORAN =====
-- 1. Batch yang akan kedaluwarsa dalam 90 hari
SELECT id_batch, merek, no_batch, tanggal_kedaluwarsa, stok_saat_ini
FROM v_stok_batch
WHERE stok_saat_ini > 0
  AND tanggal_kedaluwarsa >= '2026-11-02'
  AND tanggal_kedaluwarsa <= DATE_ADD('2026-11-02', INTERVAL 90 DAY)
ORDER BY tanggal_kedaluwarsa;

-- 2. Batch yang sudah kedaluwarsa tetapi masih tercatat memiliki stok
SELECT id_batch, merek, no_batch, tanggal_kedaluwarsa, stok_saat_ini,
       stok_saat_ini * harga_beli AS nilai_kerugian
FROM v_stok_batch
WHERE stok_saat_ini > 0
  AND tanggal_kedaluwarsa < '2026-11-02';

-- 3. Obat dengan stok di bawah batas minimum
SELECT o.id_obat, o.merek, o.stok_minimum,
       COALESCE(SUM(v.stok_saat_ini), 0) AS stok_layak_jual
FROM obat o
LEFT JOIN v_stok_batch v
       ON v.id_obat = o.id_obat
      AND v.tanggal_kedaluwarsa >= '2026-11-02'
GROUP BY o.id_obat, o.merek, o.stok_minimum
HAVING COALESCE(SUM(v.stok_saat_ini), 0) < o.stok_minimum;

-- 4. Urutan batch yang harus dijual lebih dulu (FEFO)
SELECT merek, id_batch, no_batch, tanggal_kedaluwarsa, stok_saat_ini
FROM v_stok_batch
WHERE stok_saat_ini > 0
  AND tanggal_kedaluwarsa >= '2026-11-02'
  AND id_obat IN ('OB001', 'OB002')
ORDER BY id_obat, tanggal_kedaluwarsa;

-- 5. Obat terlaris berdasarkan jumlah terjual
SELECT o.merek, SUM(dj.jumlah) AS total_terjual,
       SUM(dj.jumlah * dj.harga_satuan) AS total_pendapatan
FROM detail_penjualan dj
JOIN batch_obat b ON b.id_batch = dj.id_batch
JOIN detail_pembelian dp ON dp.id_detail_pembelian = b.id_detail_pembelian
JOIN obat o ON o.id_obat = dp.id_obat
GROUP BY o.id_obat, o.merek
ORDER BY total_terjual DESC;

-- 6. Rekap pembelian per pemasok
SELECT s.nama_pemasok, COUNT(p.id_pembelian) AS jumlah_faktur,
       SUM(p.total_pembelian) AS total_pembelian
FROM pemasok s
LEFT JOIN pembelian p ON p.id_pemasok = s.id_pemasok
GROUP BY s.id_pemasok, s.nama_pemasok
ORDER BY total_pembelian DESC;

-- 7. Laporan kerugian akibat obat kedaluwarsa dan dimusnahkan
SELECT m.id_pemusnahan, v.merek, v.no_batch, m.tanggal_pemusnahan, m.jumlah,
       m.jumlah * v.harga_beli AS nilai_kerugian
FROgit M pemusnahan_obat m
JOIN v_stok_batch v ON v.id_batch = m.id_batch
ORDER BY m.tanggal_pemusnahan;

-- 8. Pemeriksaan konsistensi stok per batch
SELECT b.id_batch, b.stok_awal,
       COALESCE(j.qty, 0) AS terjual,
       COALESCE(a.qty, 0) AS disesuaikan,
       COALESCE(m.qty, 0) AS dimusnahkan,
       b.stok_saat_ini,
       b.stok_awal - COALESCE(j.qty, 0) - COALESCE(a.qty, 0)
                   - COALESCE(m.qty, 0) - b.stok_saat_ini AS selisih
FROM batch_obat b
LEFT JOIN (SELECT id_batch, SUM(jumlah) AS qty
           FROM detail_penjualan GROUP BY id_batch) j ON j.id_batch = b.id_batch
LEFT JOIN (SELECT id_batch, SUM(jumlah) AS qty
           FROM penyesuaian_stok GROUP BY id_batch) a ON a.id_batch = b.id_batch
LEFT JOIN (SELECT id_batch, SUM(jumlah) AS qty
           FROM pemusnahan_obat GROUP BY id_batch) m ON m.id_batch = b.id_batch
ORDER BY b.id_batch;