Nama : Azzahra Anjelika Borselano

NPM : 2406419663

Kelas : PBP B

Link aplikasi : https://azzahra-anjelika-kusepak.pbp.cs.ui.ac.id/

1.  Apa itu Django AuthenticationForm? Jelaskan juga kelebihan dan kekurangannya.
- AuthenticationForm di Django adalah form bawaan yang berfungsi menangani proses login user dengan mengecek username dan password terhadap data yang tersimpan di sistem Django. Kelebihannya, form ini sudah terintegrasi dengan sistem Django sehingga lebih aman, praktis, dan langsung bisa digunakan tanpa perlu membuat logic login sendiri, termasuk validasi error seperti username atau password salah. Namun, AuthenticationForm membatasi customization dari developer, misalnya jika ingin menambahkan field tambahan atau logika khusus, maka developer harus membuat form turunan atau menimpa logika bawaan agar sesuai dengan kebutuhan aplikasi.

2. Apa perbedaan antara autentikasi dan otorisasi? Bagaiamana Django mengimplementasikan kedua konsep tersebut?
- Autentikasi: proses memverifikasi identitas pengguna, misalnya ketika pengguna login dengan username dan password untuk memastikan bahwa ia memang pemilik akun tersebut. 
- Otorisasi: proses menentukan apa saja yang boleh dilakukan oleh pengguna setelah identitasnya terverifikasi, seperti halaman-halaman mana saja yang dapat diakses dan tidak dapat diakses oleh user tersebut.
- Django mengimplementasikan autentikasi melalui sistem bawaan django.contrib.auth, yang menangani login, logout, dan pengelolaan user serta password hashing. Untuk otorisasi, Django menyediakan mekanisme permission dan group yang dapat diatur di model maupun admin, sehingga developer bisa menentukan hak akses tertentu. Dengan kombinasi ini, Django memastikan bahwa hanya pengguna yang sah yang bisa masuk (autentikasi), dan hanya pengguna dengan hak yang tepat yang bisa melakukan hal tertentu (otorisasi).

3. Apa saja kelebihan dan kekurangan session dan cookies dalam konteks menyimpan state di aplikasi web?
- Agar pengguna tidak perlu login ulang setiap berpindah halaman, dibutuhkan mekanisme penyimpanan state, salah satunya dengan cookies dan session. Cookies menyimpan data langsung di sisi klien berupa file kecil di browser, biasanya memuat informasi ringan seperti preferensi atau session ID, tetapi kapasitasnya terbatas (maksimal sekitar 4 KB). Session hanya menyimpan session ID di cookies klien, sementara data lengkapnya berada di server, sehingga lebih aman untuk menyimpan informasi penting seperti status login atau profil pengguna.
- Kesimpulannya: Cookies lebih praktis untuk data-data yang sederhana, sedangkan session lebih cocok untuk data yang lebih banyak dan sensitif.

4. Apakah penggunaan cookies aman secara default dalam pengembangan web, atau apakah ada risiko potensial yang harus diwaspadai? Bagaimana Django menangani hal tersebut?
- Penggunaan cookies tidak sepenuhnya aman secara default karena berisiko dicuri atau dimanipulasi, misalnya melalui serangan XSS. Django mengatasinya dengan fitur bawaan seperti menandai cookie sebagai HttpOnly, Secure, dan SameSite, serta menggunakan session berbasis server sehingga data sensitif tidak langsung tersimpan di cookie klien.

5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial).
- Membuat function-function baru di views.py yaitu login, logout, dan registrasi.
- Melakukan routing pada urls.py
- Membuat halaman html "login" yang akan menjadi page pertama sebelum User dapat mengakses halaman main. Pada halaman ini juga terdapat tombol Register untuk menambahkan akun baru.
- Memodifikasi agar function "show_main" hanya berjalan ketika status User sudah logged in dengan menambahkan line @login_required(login_url='/login') di atas function show_main dan show_product di views.py
- Menghubungkan produk dan user dengan menambahkan atribut user di class Product.
- Melakukan migrate karena telah memodifikasi models.
- Menambahkan text pada detail produk berupa Username user yang menambahkan produk tersebut.
- Menambahkan informasi last login di page main yang didapat dari cookies.