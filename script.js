// --- KONFIGURASI DATABASE ---
// PENTING: Ganti tulisan di bawah ini dengan URL Apps Script Anda!
const URL_GAS = "https://script.google.com/macros/s/AKfycbx28YbBQ4ZY-MkjvLa4Wg75pIclH7FgEs9WUuFgWyudp9NG58GeW-T4oLdiY2g9cYlS/exec";

let currentUser = "";

// --- DATA 40 SOAL PILIHAN GANDA ---
const soalPG = [
    { id: 1, pertanyaan: "Dalam konsep Rekayasa Perangkat Lunak, pembangunan sistem dilakukan untuk menghasilkan perangkat lunak yang memiliki karakteristik di bawah ini, kecuali...", opsi: { A: "Bernilai ekonomi", B: "Dapat dipercaya", C: "Bekerja tidak efisien", D: "Bermanfaat bagi pengguna" }, jawabanBenar: "C" },
    { id: 2, pertanyaan: "Representasi visual dari sebuah alur logika pemrograman untuk memecahkan masalah dikenal dengan istilah...", opsi: { A: "Source Code", B: "Flow Chart", C: "Basis Data", D: "Operating System" }, jawabanBenar: "B" },
    { id: 3, pertanyaan: "Kumpulan data yang terorganisir, disimpan, dan diakses secara elektronik disebut...", opsi: { A: "Flow Chart", B: "Basis Data (Database)", C: "Siklus SDLC", D: "Variabel" }, jawabanBenar: "B" },
    { id: 4, pertanyaan: "Pembatasan jangkauan akses terhadap suatu atribut atau metode di dalam class pada pemrograman berorientasi objek diatur menggunakan...", opsi: { A: "Access Modifier", B: "Looping", C: "Database Array", D: "CSS Styling" }, jawabanBenar: "A" },
    { id: 5, pertanyaan: "Metode pendekatan pembelajaran yang menugaskan peserta didik untuk mengamati, mengeksplorasi, dan mengkomunikasikan hasil karya disebut...", opsi: { A: "Teacher Center", B: "Project Based Learning (PBL)", C: "Remedial", D: "Reading Comprehension" }, jawabanBenar: "B" },
    { id: 6, pertanyaan: "Langkah pertama dalam pembuatan program setelah memahami masalah adalah...", opsi: { A: "Menulis kode", B: "Menyusun algoritma/flowchart", C: "Mendesain interface", D: "Melakukan instalasi OS" }, jawabanBenar: "B" },
    { id: 7, pertanyaan: "Simbol belah ketupat (diamond) pada flowchart berfungsi untuk...", opsi: { A: "Memulai program", B: "Proses perhitungan", C: "Pengambilan keputusan (Decision)", D: "Input/Output" }, jawabanBenar: "C" },
    { id: 8, pertanyaan: "Simbol oval atau terminator pada flowchart digunakan pada saat...", opsi: { A: "Awal dan akhir program", B: "Deklarasi variabel", C: "Mencetak dokumen", D: "Menyambung halaman" }, jawabanBenar: "A" },
    { id: 9, pertanyaan: "Tipe data yang digunakan untuk menyimpan nilai teks atau kumpulan karakter adalah...", opsi: { A: "Integer", B: "Float", C: "String", D: "Boolean" }, jawabanBenar: "C" },
    { id: 10, pertanyaan: "Tipe data yang hanya memiliki dua kemungkinan nilai (Benar/Salah atau True/False) adalah...", opsi: { A: "Integer", B: "String", C: "Boolean", D: "Double" }, jawabanBenar: "C" },
    { id: 11, pertanyaan: "Struktur kontrol yang digunakan untuk menjalankan instruksi secara berulang-ulang disebut...", opsi: { A: "Sequence", B: "Selection / Percabangan", C: "Looping / Perulangan", D: "Function" }, jawabanBenar: "C" },
    { id: 12, pertanyaan: "Dalam struktur kontrol percabangan, kata kunci logika yang sering digunakan adalah...", opsi: { A: "IF - ELSE", B: "FOR - WHILE", C: "START - STOP", D: "INPUT - OUTPUT" }, jawabanBenar: "A" },
    { id: 13, pertanyaan: "Perangkat lunak yang bertugas mengatur sumber daya keras (hardware) dan menyediakan layanan umum untuk aplikasi adalah...", opsi: { A: "Sistem Operasi", B: "Microsoft Word", C: "Browser Web", D: "Database Server" }, jawabanBenar: "A" },
    { id: 14, pertanyaan: "Sistem Operasi yang bersifat Open Source dan sering digunakan untuk server pemrograman adalah...", opsi: { A: "Windows", B: "MacOS", C: "Linux", D: "iOS" }, jawabanBenar: "C" },
    { id: 15, pertanyaan: "Tools yang sering digunakan oleh programmer sebagai Text Editor atau IDE adalah...", opsi: { A: "Adobe Photoshop", B: "Visual Studio Code", C: "Corel Draw", D: "Microsoft Excel" }, jawabanBenar: "B" },
    { id: 16, pertanyaan: "Kepanjangan dari HTML adalah...", opsi: { A: "Hypertext Markup Language", B: "Hyper Text Module Logic", C: "Hyperlink Transfer Markup Language", D: "High Tech Markup Language" }, jawabanBenar: "A" },
    { id: 17, pertanyaan: "Tag HTML yang digunakan untuk membuat sebuah form adalah...", opsi: { A: "<table>", B: "<form>", C: "<button>", D: "<input>" }, jawabanBenar: "B" },
    { id: 18, pertanyaan: "Bahasa yang digunakan untuk memperindah tampilan (styling) elemen HTML adalah...", opsi: { A: "PHP", B: "JavaScript", C: "CSS", D: "Python" }, jawabanBenar: "C" },
    { id: 19, pertanyaan: "Untuk membuat tombol yang bisa di-klik pada halaman web, kita menggunakan tag...", opsi: { A: "<click>", B: "<a>", C: "<button>", D: "<form>" }, jawabanBenar: "C" },
    { id: 20, pertanyaan: "Proses mengunggah kode website dari komputer lokal agar bisa diakses secara online disebut...", opsi: { A: "Downloading", B: "Hosting / Deployment", C: "Debugging", D: "Compiling" }, jawabanBenar: "B" },
    { id: 21, pertanyaan: "GitHub menggunakan teknologi dasar untuk version control system yang disebut...", opsi: { A: "SVN", B: "Git", C: "FTP", D: "CPanel" }, jawabanBenar: "B" },
    { id: 22, pertanyaan: "Perintah pada Git yang digunakan untuk mengirim perubahan kode lokal ke repositori online (GitHub) adalah...", opsi: { A: "git pull", B: "git push", C: "git commit", D: "git add" }, jawabanBenar: "B" },
    { id: 23, pertanyaan: "Pada konsep Pemrograman Berorientasi Objek (OOP), cetak biru (blueprint) yang mendefinisikan karakteristik suatu objek disebut...", opsi: { A: "Class", B: "Method", C: "Property", D: "Function" }, jawabanBenar: "A" },
    { id: 24, pertanyaan: "Sedangkan wujud nyata yang dibuat berdasarkan cetak biru (Class) tersebut disebut...", opsi: { A: "Variabel", B: "Data Type", C: "Object", D: "Syntax" }, jawabanBenar: "C" },
    { id: 25, pertanyaan: "Access modifier yang mengizinkan atribut/metode untuk diakses dari mana saja (luar class) adalah...", opsi: { A: "Private", B: "Protected", C: "Public", D: "Static" }, jawabanBenar: "C" },
    { id: 26, pertanyaan: "Access modifier yang HANYA mengizinkan atribut/metode diakses dari dalam class itu sendiri adalah...", opsi: { A: "Private", B: "Protected", C: "Public", D: "Global" }, jawabanBenar: "A" },
    { id: 27, pertanyaan: "Tindakan mencari, menemukan, dan memperbaiki kesalahan (bug) di dalam kode program disebut...", opsi: { A: "Hacking", B: "Testing", C: "Debugging", D: "Compiling" }, jawabanBenar: "C" },
    { id: 28, pertanyaan: "Database Relasional biasanya menggunakan bahasa query standar yang disebut...", opsi: { A: "NoSQL", B: "XML", C: "SQL (Structured Query Language)", D: "JSON" }, jawabanBenar: "C" },
    { id: 29, pertanyaan: "Kolom unik dalam tabel database yang digunakan untuk membedakan satu baris data dengan data lainnya disebut...", opsi: { A: "Foreign Key", B: "Primary Key", C: "Index", D: "Row Key" }, jawabanBenar: "B" },
    { id: 30, pertanyaan: "Atribut HTML yang digunakan untuk memberikan identitas unik pada sebuah elemen agar mudah dimanipulasi dengan JavaScript adalah...", opsi: { A: "class", B: "name", C: "id", D: "style" }, jawabanBenar: "C" },
    { id: 31, pertanyaan: "Istilah UI dalam pengembangan perangkat lunak adalah singkatan dari...", opsi: { A: "User Interface", B: "Universal Internet", C: "Unit Integration", D: "User Interaction" }, jawabanBenar: "A" },
    { id: 32, pertanyaan: "Istilah UX (User Experience) lebih berfokus pada...", opsi: { A: "Warna dan font desain", B: "Pengalaman dan kenyamanan pengguna", C: "Kecepatan server", D: "Kapasitas database" }, jawabanBenar: "B" },
    { id: 33, pertanyaan: "Untuk menampilkan pesan peringatan (pop-up) di browser melalui JavaScript, kita menggunakan fungsi...", opsi: { A: "console.log()", B: "print()", C: "alert()", D: "echo()" }, jawabanBenar: "C" },
    { id: 34, pertanyaan: "Karakter yang umumnya digunakan untuk mengakhiri sebuah pernyataan (statement) dalam banyak bahasa pemrograman terstruktur (seperti C++, Java, JS) adalah...", opsi: { A: "Titik dua (:)", B: "Koma (,)", C: "Titik koma (;)", D: "Titik (.)" }, jawabanBenar: "C" },
    { id: 35, pertanyaan: "Program aplikasi peramban (browser) yang digunakan untuk melihat hasil kode HTML, kecuali...", opsi: { A: "Google Chrome", B: "Mozilla Firefox", C: "Safari", D: "Notepad++" }, jawabanBenar: "D" },
    { id: 36, pertanyaan: "Dalam pengembangan gim (game), kerangka kerja perangkat lunak (software framework) yang dirancang untuk membangun game disebut...", opsi: { A: "Game Engine", B: "Word Processor", C: "Database Engine", D: "Web Server" }, jawabanBenar: "A" },
    { id: 37, pertanyaan: "Kemampuan untuk mengimplementasikan berbagai macam metode dengan nama yang sama tetapi fungsi berbeda dalam OOP berkaitan dengan konsep...", opsi: { A: "Inheritance", B: "Polymorphism", C: "Encapsulation", D: "Abstraction" }, jawabanBenar: "B" },
    { id: 38, pertanyaan: "Dalam Project Based Learning, tahap dimana siswa mengomunikasikan hasil karyanya ke audiens disebut...", opsi: { A: "Mengeksplorasi", B: "Mencoba", C: "Presentasi / Mengkomunikasikan", D: "Menalar" }, jawabanBenar: "C" },
    { id: 39, pertanyaan: "Nilai minimum yang harus dicapai oleh siswa dalam suatu mata pelajaran agar dianggap tuntas disebut...", opsi: { A: "Kriteria Ketuntasan Minimal (KKM)", B: "Rapor", C: "Skor PG", D: "Capaian Pembelajaran" }, jawabanBenar: "A" },
    { id: 40, pertanyaan: "Mata pelajaran Dasar-Dasar PPLG di Fase E bertujuan menyiapkan siswa untuk...", opsi: { A: "Dunia kerja & Kewirausahaan di bidang teknologi", B: "Menjadi ahli akuntansi", C: "Memperbaiki perangkat keras secara fisik", D: "Mendesain gedung" }, jawabanBenar: "A" }
];

// --- DATA 5 SOAL ESSAY ---
const soalEssay = [
    "1. Berdasarkan apa yang sudah kita praktikkan di GitHub, jelaskan langkah-langkah alur kerja (workflow) mulai dari menulis kode HTML hingga menjadikannya 'link hidup' yang bisa diakses secara online!",
    "2. Gambarkan (dengan deskripsi teks berurutan) bagaimana alur / flowchart dari fitur 'Form Login' bekerja dari awal diinput hingga berhasil masuk!",
    "3. Mengapa sebuah aplikasi pendataan siswa membutuhkan sistem Basis Data (Database)? Jelaskan manfaat utamanya!",
    "4. Sebutkan dan jelaskan perbedaan dari hak akses 'Public' dan 'Private' (Access Modifier) dalam Pemrograman Berorientasi Objek!",
    "5. Menurut pendapat Anda, apa pentingnya merancang logika dan flow chart sebelum mulai menulis baris kode program secara langsung?"
];

// --- LOGIKA LOGIN ---
function loginSiswa() {
    const nama = document.getElementById('loginNama').value.trim();
    if (nama.length < 3) {
        alert("Mohon masukkan nama lengkap Anda dengan benar!");
        return;
    }
    currentUser = nama;
    
    // Update UI
    document.getElementById('displayNama').textContent = currentUser;
    document.getElementById('dashNama').textContent = currentUser;
    document.getElementById('profilNama').textContent = currentUser;
    
    // Sembunyikan login, tampilkan LMS
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('lmsApp').classList.remove('hidden');
    
    renderSoal(); 
}

// --- LOGIKA NAVIGASI MENU ---
function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    document.querySelectorAll('.menu a').forEach(menu => menu.classList.remove('active'));
    
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    event.currentTarget.classList.add('active');
}

// --- LOGIKA RENDER SOAL CBT ---
function renderSoal() {
    const divPG = document.getElementById('soalPilihanGanda');
    const divEssay = document.getElementById('soalEssay');
    
    // Render 40 Pilihan Ganda
    let htmlPG = '';
    soalPG.forEach((soal, index) => {
        htmlPG += `
        <div class="soal-card">
            <div class="soal-teks">${index + 1}. ${soal.pertanyaan}</div>
            <label class="opsi-label"><input type="radio" name="pg_${soal.id}" value="A" required> A. ${soal.opsi.A}</label>
            <label class="opsi-label"><input type="radio" name="pg_${soal.id}" value="B"> B. ${soal.opsi.B}</label>
            <label class="opsi-label"><input type="radio" name="pg_${soal.id}" value="C"> C. ${soal.opsi.C}</label>
            <label class="opsi-label"><input type="radio" name="pg_${soal.id}" value="D"> D. ${soal.opsi.D}</label>
        </div>`;
    });
    divPG.innerHTML = htmlPG;

    // Render 5 Essay
    let htmlEssay = '';
    soalEssay.forEach((pertanyaan, index) => {
        htmlEssay += `
        <div class="soal-card" style="border-left-color: var(--warning);">
            <div class="soal-teks">${pertanyaan}</div>
            <textarea name="essay_${index + 1}" id="essay_${index + 1}" class="essay-input" placeholder="Ketik jawaban Anda di sini..." required></textarea>
        </div>`;
    });
    divEssay.innerHTML = htmlEssay;

    // Progress Bar Listener
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateProgress);
    });
}

function updateProgress() {
    const totalSoal = soalPG.length;
    let terjawab = 0;
    
    soalPG.forEach(soal => {
        const opsiDipilih = document.querySelector(`input[name="pg_${soal.id}"]:checked`);
        if(opsiDipilih) terjawab++;
    });

    const persentase = (terjawab / totalSoal) * 100;
    document.getElementById('examProgress').style.width = persentase + '%';
}

// --- LOGIKA EVALUASI & KIRIM KE SERVER ---
document.getElementById('ujianForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btnSubmitUjian');
    
    // Hitung Skor (40 Soal = 100)
    let jawabanBenar = 0;
    soalPG.forEach(soal => {
        const userJawab = document.querySelector(`input[name="pg_${soal.id}"]:checked`).value;
        if(userJawab === soal.jawabanBenar) {
            jawabanBenar++;
        }
    });
    
    const skorPG = Math.round((jawabanBenar / soalPG.length) * 100);

    // Siapkan Payload ke Server
    const payload = {
        nama: currentUser,
        skorPG: skorPG,
        essay1: document.getElementById('essay_1').value,
        essay2: document.getElementById('essay_2').value,
        essay3: document.getElementById('essay_3').value,
        essay4: document.getElementById('essay_4').value,
        essay5: document.getElementById('essay_5').value
    };

    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses 45 Jawaban...';
    btnSubmit.disabled = true;

    fetch(URL_GAS, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('examFormContainer').classList.add('hidden');
        document.getElementById('examResultContainer').classList.remove('hidden');
        document.getElementById('skorDisplay').textContent = skorPG;
    })
    .catch(error => {
        alert("Terjadi kesalahan jaringan saat mengirim lembar jawaban. Pastikan internet Anda stabil.");
        btnSubmit.innerHTML = '<i class="fas fa-paper-plane"></i> Coba Kirim Ulang';
        btnSubmit.disabled = false;
    });
});
