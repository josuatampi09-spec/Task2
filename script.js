// --- KONFIGURASI DATABASE ---
const URL_GAS = "https://script.google.com/macros/s/AKfycbx28YbBQ4ZY-MkjvLa4Wg75pIclH7FgEs9WUuFgWyudp9NG58GeW-T4oLdiY2g9cYlS/exec";

let currentUser = "";

// --- DATA SOAL BERDASARKAN CPL FASE E ---
// Untuk menambah jadi 40 soal, cukup Copy-Paste format blok soal di bawah ini ke dalam array
const soalPG = [
    {
        id: 1,
        pertanyaan: "Dalam konsep Rekayasa Perangkat Lunak, pembangunan sistem dilakukan untuk menghasilkan perangkat lunak yang memiliki karakteristik di bawah ini, kecuali...",
        opsi: { A: "Bernilai ekonomi", B: "Dapat dipercaya", C: "Bekerja tidak efisien", D: "Bermanfaat bagi pengguna" },
        jawabanBenar: "C" // Diambil dari prinsip rekayasa perangkat lunak.
    },
    {
        id: 2,
        pertanyaan: "Representasi visual dari sebuah alur logika pemrograman untuk memecahkan masalah dikenal dengan istilah...",
        opsi: { A: "Source Code", B: "Flow Chart", C: "Basis Data", D: "Operating System" },
        jawabanBenar: "B" // Menguji pemahaman Pemrograman Terstruktur.
    },
    {
        id: 3,
        pertanyaan: "Kumpulan data yang terorganisir, disimpan, dan diakses secara elektronik menggunakan teknik pemodelan formal disebut...",
        opsi: { A: "Flow Chart", B: "Basis Data (Database)", C: "Siklus SDLC", D: "Variabel" },
        jawabanBenar: "B" // Menguji pemahaman Bermakna Basis Data.
    },
    {
        id: 4,
        pertanyaan: "Pada Pemrograman Berorientasi Objek, pembatasan jangkauan akses terhadap suatu atribut atau metode di dalam class diatur menggunakan...",
        opsi: { A: "Access Modifier", B: "Looping", C: "Database Array", D: "CSS Styling" },
        jawabanBenar: "A" // Membedakan macam akses modifier.
    },
    {
        id: 5,
        pertanyaan: "Metode pendekatan pembelajaran yang menugaskan peserta didik untuk mengamati, mengeksplorasi, dan mengkomunikasikan hasil karya disebut...",
        opsi: { A: "Teacher Center", B: "Project Based Learning (PBL)", C: "Remedial", D: "Reading Comprehension" },
        jawabanBenar: "B" // Berdasarkan Model Pembelajaran.
    }
    // TAMBAHKAN SOAL PG 6 SAMPAI 40 DI SINI MENGGUNAKAN FORMAT YANG SAMA
];

const soalEssay = [
    "1. Jelaskan perbedaan mendasar antara Pemrograman Terstruktur dengan Pemrograman Berorientasi Objek berdasarkan pemahaman Anda!",
    "2. Gambarkan (dengan deskripsi teks) bagaimana alur/flowchart sederhana dari fitur 'Form Login' bekerja!",
    "3. Mengapa sebuah aplikasi modern membutuhkan sistem Basis Data (Database)? Jelaskan manfaat utamanya!",
    "4. Sebutkan dan jelaskan 3 fungsi dari Access Modifier dalam Pemrograman Berorientasi Objek!",
    "5. Apa pentingnya penerapan logika pemrograman sebelum menuliskan baris kode (source code) sesungguhnya?"
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
    
    renderSoal(); // Menyiapkan soal ujian di latar belakang
}

// --- LOGIKA NAVIGASI MENU ---
function switchTab(tabName) {
    // Sembunyikan semua konten tab
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
    // Hilangkan efek aktif di semua menu
    document.querySelectorAll('.menu a').forEach(menu => menu.classList.remove('active'));
    
    // Tampilkan tab yang dipilih
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    // Tambahkan class active ke menu yang diklik (menggunakan querySelector yang mencocokkan fungsi onClick)
    event.currentTarget.classList.add('active');
}

// --- LOGIKA RENDER SOAL CBT ---
function renderSoal() {
    const divPG = document.getElementById('soalPilihanGanda');
    const divEssay = document.getElementById('soalEssay');
    
    // Render Pilihan Ganda
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

    // Render Essay
    let htmlEssay = '';
    soalEssay.forEach((pertanyaan, index) => {
        htmlEssay += `
        <div class="soal-card" style="border-left-color: var(--warning);">
            <div class="soal-teks">${pertanyaan}</div>
            <textarea name="essay_${index + 1}" id="essay_${index + 1}" class="essay-input" placeholder="Ketik jawaban Anda di sini..." required></textarea>
        </div>`;
    });
    divEssay.innerHTML = htmlEssay;

    // Menambah event listener untuk Progress Bar
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateProgress);
    });
}

// Logika Progress Bar Berdasarkan Jawaban PG
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

// --- LOGIKA EVALUASI & PENGIRIMAN KE SERVER ---
document.getElementById('ujianForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btnSubmitUjian');
    
    // 1. Menghitung Nilai Pilihan Ganda
    let jawabanBenar = 0;
    soalPG.forEach(soal => {
        const userJawab = document.querySelector(`input[name="pg_${soal.id}"]:checked`).value;
        if(userJawab === soal.jawabanBenar) {
            jawabanBenar++;
        }
    });
    
    // Perhitungan dinamis (berapapun jumlah soalnya, skala maksimum adalah 100)
    const skorPG = Math.round((jawabanBenar / soalPG.length) * 100);

    // 2. Mengambil Teks Jawaban Essay
    const payload = {
        nama: currentUser,
        skorPG: skorPG,
        essay1: document.getElementById('essay_1').value,
        essay2: document.getElementById('essay_2').value,
        essay3: document.getElementById('essay_3').value,
        essay4: document.getElementById('essay_4').value,
        essay5: document.getElementById('essay_5').value
    };

    // 3. Animasi Loading & Kirim ke Google Sheets
    btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses Nilai...';
    btnSubmit.disabled = true;

    fetch(URL_GAS, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        // Tampilkan Hasil Ujian di Layar
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