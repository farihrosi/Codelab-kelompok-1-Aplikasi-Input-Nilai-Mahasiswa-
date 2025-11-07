// logic.js
import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// referensi ke koleksi firestore
const nilaiCollection = collection(db, "nilaiMahasiswa");

// =============================
// CREATE & UPDATE DATA
// =============================
const form = document.getElementById("formMahasiswa");

if (form) {
  let editId = null; // untuk menandai apakah sedang edit data

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const matkul = document.getElementById("matkul").value;
    const nilai = Number(document.getElementById("nilai").value);

    try {
      if (editId) {
        // UPDATE data
        const docRef = doc(db, "nilaiMahasiswa", editId);
        await updateDoc(docRef, { nama, nim, matkul, nilai });
        document.getElementById("status").textContent = "✅ Data berhasil diperbarui!";
        editId = null;
      } else {
        // CREATE data baru
        await addDoc(nilaiCollection, { nama, nim, matkul, nilai });
        document.getElementById("status").textContent = "✅ Data berhasil disimpan!";
      }

      form.reset();
    } catch (err) {
      document.getElementById("status").textContent = "❌ Gagal menyimpan data: " + err.message;
    }
  });

  // ambil data dari URL jika sedang edit
  const params = new URLSearchParams(window.location.search);
  if (params.has("edit")) {
    editId = params.get("edit");
    // isi otomatis form jika sedang edit
    (async () => {
      const snapshot = await getDocs(nilaiCollection);
      snapshot.forEach((d) => {
        if (d.id === editId) {
          const data = d.data();
          document.getElementById("nama").value = data.nama;
          document.getElementById("nim").value = data.nim;
          document.getElementById("matkul").value = data.matkul;
          document.getElementById("nilai").value = data.nilai;
          document.getElementById("status").textContent = "✏️ Sedang mengedit data mahasiswa";
        }
      });
    })();
  }
}

// =============================
// READ + DELETE DATA
// =============================
const tabelData = document.getElementById("tabelData");

if (tabelData) {
  async function loadData() {
    const snapshot = await getDocs(nilaiCollection);
    tabelData.innerHTML = "";
    snapshot.forEach((docu) => {
      const data = docu.data();
      const row = `
        <tr>
          <td>${data.nama}</td>
          <td>${data.nim}</td>
          <td>${data.matkul}</td>
          <td>${data.nilai}</td>
          <td>
            <button class="editBtn" data-id="${docu.id}">Edit</button>
            <button class="hapusBtn" data-id="${docu.id}">Hapus</button>
          </td>
        </tr>
      `;
      tabelData.innerHTML += row;
    });

    // tombol edit
    document.querySelectorAll(".editBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        window.location.href = `input-nilai.html?edit=${id}`;
      });
    });

    // tombol hapus
    document.querySelectorAll(".hapusBtn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (confirm("Yakin ingin menghapus data ini?")) {
          await deleteDoc(doc(db, "nilaiMahasiswa", id));
          alert("🗑️ Data berhasil dihapus!");
          loadData(); // refresh tabel
        }
      });
    });
  }

  loadData();
}
