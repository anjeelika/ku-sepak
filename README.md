Nama : Azzahra Anjelika Borselano

NPM : 2406419663

Kelas : PBP B

Link aplikasi : https://azzahra-anjelika-kusepak.pbp.cs.ui.ac.id/

TUGAS 6
1. Apa perbedaan antara synchronous request dan asynchronous request?
- Synchronous request bekerja dengan cara menunggu respons dari server sebelum pengguna dapat melanjutkan interaksi, sehingga seluruh halaman akan direload setiap kali ada permintaan baru. Sebaliknya, asynchronous request memungkinkan browser untuk mengirim dan menerima data dari server di latar belakang tanpa harus memuat ulang halaman secara keseluruhan. Dengan asynchronous request (seperti menggunakan AJAX atau Fetch API), hanya bagian tertentu dari halaman yang diperbarui, sehingga pengalaman pengguna menjadi lebih cepat, interaktif, dan efisien.

2. Bagaimana AJAX bekerja di Django (alur request–response)?
- Dalam Django, AJAX bekerja dengan mengirimkan permintaan HTTP (biasanya melalui JavaScript menggunakan XMLHttpRequest atau fetch()) ke URL tertentu yang ditentukan dalam urls.py. Django kemudian memproses permintaan tersebut melalui view yang menangani data, melakukan validasi, serta berinteraksi dengan database jika diperlukan. Setelah itu, view mengembalikan respons dalam format JSON atau HTML parsial menggunakan JsonResponse atau render(). Respons ini diterima oleh JavaScript di sisi client, yang kemudian memperbarui bagian tertentu dari halaman (DOM) tanpa melakukan reload penuh.

3. Apa keuntungan menggunakan AJAX dibandingkan render biasa di Django?
- AJAX memberikan banyak keuntungan dibandingkan proses render penuh, seperti waktu respon yang lebih cepat, efisiensi penggunaan bandwidth, dan pengalaman pengguna yang lebih dinamis. Dengan AJAX, perubahan data pada halaman dapat dilakukan secara real-time tanpa memuat ulang seluruh halaman, yang membuat interaksi terasa lebih natural dan modern. Selain itu, AJAX juga memungkinkan pemisahan antara logika backend (pengolahan data di Django) dan tampilan frontend (manipulasi DOM dengan JavaScript), sehingga kode menjadi lebih modular dan mudah dikelola.

4. Bagaimana cara memastikan keamanan saat menggunakan AJAX untuk fitur Login dan Register di Django?
- Untuk menjaga keamanan, AJAX yang digunakan dalam fitur Login dan Register harus selalu dikirim melalui koneksi HTTPS agar data sensitif tidak mudah disadap. Django menyediakan perlindungan tambahan dengan token CSRF ({% csrf_token %}), yang harus disertakan pada setiap request AJAX POST. Selain itu, validasi data harus tetap dilakukan di sisi server, bukan hanya di sisi client, untuk mencegah manipulasi input.

5. Bagaimana AJAX mempengaruhi pengalaman pengguna (User Experience) pada website?
- Penggunaan AJAX secara signifikan meningkatkan pengalaman pengguna karena halaman menjadi lebih responsif, cepat, dan interaktif. Pengguna tidak perlu menunggu reload penuh hanya untuk melihat perubahan kecil pada data, seperti menambah komentar, memperbarui profil, atau memuat konten baru. Dengan pembaruan konten yang mulus dan real-time, pengguna merasa aplikasi lebih hidup dan efisien.