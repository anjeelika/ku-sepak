function rupiah(n){ return "Rp" + Number(n||0).toLocaleString("id-ID"); }

function renderProductCard(p) {
  // p.user dari API = username pemilik (lihat product_to_dict di views)
  const isOwner = (window.IS_AUTH && p.user === window.CURRENT_USER);
  const thumb = (p.thumbnail && p.thumbnail.trim())
    ? p.thumbnail
    : "https://placehold.co/600x400?text=No+Image";

  const wrap = document.createElement("div");
  wrap.className = "h-full flex flex-col";

  wrap.innerHTML = `
  <div class="h-full flex flex-col">
  <article
    class="relative bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden
           h-[320px] flex flex-col">

    <!-- Overlay link: seluruh badan card klik ke detail -->
    <a href="{% url 'main:show_product' product.id %}"
       class="absolute inset-0 z-10 pointer-events-none"
       aria-label="Open details"></a>

    <!-- Thumbnail -->
    <div class="relative h-44 sm:h-48 bg-gray-200 overflow-hidden">
      {% if product.thumbnail %}
        <img src="{{ product.thumbnail }}" alt="{{ product.name }}" class="w-full h-full object-cover">
      {% endif %}

      <!-- Featured star (PNG, kiri atas) -->
      {% if product.is_featured %}
        <div class="absolute top-3 left-3 z-30">
          <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#e7be38]">
            <img src="{% static 'icons/star.png' %}" alt="Featured" class="w-5 h-5">
          </span>
        </div>
      {% endif %}

      <!-- Edit & Delete (PNG, kanan atas) -->
      {% if user.is_authenticated and product.user == user %}
        <div class="absolute top-3 right-3 z-30 flex items-center gap-2">
          <a href="{% url 'main:edit_product' product.id %}"
             class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/95 hover:bg-[#fdfbed]
                    shadow ring-1 ring-gray-200 transition pointer-events-auto"
             aria-label="Edit">
            <img src="{% static 'icons/edit.png' %}" alt="Edit" class="w-5 h-5">
          </a>
          <a href="{% url 'main:delete_product' product.id %}"
             class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 hover:bg-red-100
                    shadow ring-1 ring-gray-200 transition pointer-events-auto"
             aria-label="Delete">
            <img src="{% static 'icons/trash.png' %}" alt="Delete" class="w-5 h-5">
          </a>
        </div>
      {% endif %}
    </div>

    <!-- Body -->
    <div class="p-5 sm:p-6 relative z-20 flex-1 flex flex-col">

      <!-- Category chip (atas, kiri) -->
      <div class="mb-2">
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#f9f2cc] text-[#6e3c19]">
          {{ product.get_category_display }}
        </span>
      </div>

      <!-- Name + Price -->
      <h3 class="flex flex-wrap items-center text-xl font-semibold leading-tight mb-2">
        <span class="text-[#3f1e09]">{{ product.name }}</span>
        <span class="mx-2 text-gray-300">•</span>
        <span class="text-gray-600 font-medium">Rp{{ product.price }}</span>
      </h3>

      <!-- Stock (kiri) -->
      <div class="text-sm">
        {% if product.stock > 0 %}
          <span class="text-[#a45b19] font-medium">Stok: {{ product.stock }}</span>
        {% else %}
          <span class="text-red-600 font-medium">Stok habis</span>
        {% endif %}
      </div>
    </div>
  </article>

  <!-- Detached pill button -->
  <div class="w-full flex justify-center mt-3">
    <a href="{% url 'main:show_product' product.id %}"
       class="inline-flex px-6 py-2 rounded-full bg-white border border-[#f2e395]
              text-[#a45b19] hover:bg-[#fdfbed] font-medium transition">
      View Details
    </a>
  </div>
</div>`;

  return wrap;
}