Nama : Azzahra Anjelika Borselano

NPM : 2406419663

Kelas : PBP B

Link aplikasi : https://azzahra-anjelika-kusepak.pbp.cs.ui.ac.id/

TUGAS 5
1. Jika terdapat beberapa CSS selector untuk suatu elemen HTML, jelaskan urutan prioritas pengambilan CSS selector tersebut!
- Ketika sebuah elemen HTML dipengaruhi oleh beberapa selector CSS, browser akan menentukan aturan mana yang dipakai berdasarkan specificity (tingkat kekhususan). Urutan prioritasnya dimulai dari inline style (yang langsung ditulis di atribut style elemen) sebagai prioritas tertinggi, kemudian selector ID (#id) yang lebih kuat dibanding class, pseudo-class, dan attribute selector (.class, :hover, [type="text"]), lalu di bawahnya ada selector tag/elemen (div, p, h1). Jika dua selector memiliki tingkat specificity yang sama, aturan yang muncul terakhir dalam urutan CSS (paling bawah/akhir dibaca browser) yang akan dipakai.

2. Mengapa responsive design menjadi konsep yang penting dalam pengembangan aplikasi web? Berikan contoh aplikasi yang sudah dan belum menerapkan responsive design, serta jelaskan mengapa!
- Responsive design menjadi penting karena pengguna saat ini mengakses web dari berbagai perangkat dengan ukuran layar yang berbeda, mulai dari laptop, tablet, hingga smartphone. Tanpa desain yang responsif, tampilan web bisa rusak, teks terlalu kecil, tombol sulit diklik, atau pengguna harus sering melakukan zoom, sehingga pengalaman pengguna jadi buruk. Sebagai contoh, Instagram Web sudah menerapkan responsive design, di mana tata letak feed, sidebar, dan tombol akan otomatis menyesuaikan ukuran layar. Di desktop tampil penuh dengan sidebar, sedangkan di smartphone/hp hanya fokus ke feed dengan ikon sederhana. Saya menemukan website yang memang ditujukan untuk menjadi contoh unresponsive design (https://dequeuniversity.com/library/responsive/1-non-responsive). Web ini mungkin masih readable untuk versi desktop, tapi ketika dibuka di perangkat mobile, banyak elemen yang saling bertabrakan dan harus digeser untuk lihat tampilan lengkapnya. Hal ini tentunya memperburuk experience pengguna.

3. Jelaskan perbedaan antara margin, border, dan padding, serta cara untuk mengimplementasikan ketiga hal tersebut!
- Margin, border, dan padding adalah tiga konsep utama dalam box model CSS yang mengatur ruang di sekitar elemen HTML.
    - Margin adalah jarak di luar elemen yang memisahkannya dari elemen lain, sehingga berfungsi sebagai 'ruang kosong eksternal'.
    - Border adalah garis yang membungkus elemen, terletak di antara margin dan padding, dan bisa diberi ketebalan, warna, atau styling tertentu.
    - Padding adalah jarak di dalam elemen, yaitu ruang antara konten (seperti teks atau gambar) dengan garis border, sehingga berfungsi sebagai 'ruang kosong internal'.
- Implementasinya dapat dilakukan pada file html langsung secara inline melalui atribut style= atau ditulis di <style>. Selain itu juga dapat dilakukan pada file css terpisah lalu di-link ke html-nya.

4. Jelaskan konsep flex box dan grid layout beserta kegunaannya!
- Flexbox (Flexible Box Layout) berfungsi untuk mengatur elemen secara satu dimensi baik baris (row) atau kolom (column). Flexbox cocok dipakai ketika kita ingin membuat layout sederhana seperti navbar horizontal, daftar kartu yang sejajar ke samping, atau kolom form yang otomatis menyesuaikan ukuran.
- Grid Layout bekerja secara dua dimensi, artinya bisa mengatur baris dan kolom sekaligus. Grid lebih cocok untuk layout kompleks, seperti membuat template halaman (header, sidebar, main content, footer) atau galeri gambar dengan banyak kolom yang responsif. 
 
5. Jelaskan bagaimana cara kamu mengimplementasikan checklist di atas secara step-by-step (bukan hanya sekadar mengikuti tutorial)!
- Menambahkan fungsi baru pada views.py untuk mengedit product, yang jika dipanggil akan redirect halaman ke form edit product. Membuat routing agar fungsi ini berjalan.
- Menambahkan fungsi baru pada views.py untuk menghapus product, yang jika dipanggil akan menghapus object product yang bersangkutan. Membuat routing pada urls.py.
- Menambahkan menambahkan script cdn tailwind di bagian head base.html
- Membuat file global.css lalu menambahkan custom styling berupa kode hex warna untuk halaman form.
- Membuat file navbar.html untuk menambahkan navigation bar yang akan menampilkan nama aplikasi, nama user, npm dan kelas, serta  tombol untuk direct ke page main, tombol create product untuk redirect ke form create product, dan tombol logout.
- Membuat inline styling pada file-file html navbar, login, logout, register, edit product, create product agar memiliki aksen warna kuning dan penyesuaian-penyesuaian untuk mobile size.
- Modifikasi main.html agar dapat menampilkan object-object product menggunakan cards. Menambahkan file card_product.html
- Membuat styling pada kedua html files tersebut agar bisa menampilkan detail product secara singkat dengan card yang fixed height, kemudian ada tombol "View Product" di bagian bawah untuk redirect ke laman product detail.
- Menambahkan icon berbentuk bintang di bagian kiri atas card product untuk menunjukkan produk-produk yang Featured
- Menambahkan icon pencil dan trash dengan bentuk lingkaran di bagian kanan atas card untuk menjadi tombol edit product dan delete product.
- Memodifikasi halaman product_detail agar menampilkan nama product, harga product, dan stok product pada bagian atas padding, kemudian membuat image product thumbnail menjadi fixed height agar tampilannya tidak auto-zoom sesuai bordernya. 