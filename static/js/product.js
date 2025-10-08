function rupiah(n){ return "Rp" + Number(n||0).toLocaleString("id-ID"); }

// Get CSRF token from cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Refresh products list
async function refreshProducts(mine = false) {
    console.log('Refreshing products, mine:', mine);
    const container = document.getElementById('product-container');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const errorState = document.getElementById('error-state');

    // Show loading state
    container.innerHTML = '';
    loadingState.classList.remove('hidden');
    loadingState.classList.add('flex');
    emptyState.classList.add('hidden');
    errorState.classList.add('hidden');

    try {
        const response = await fetch(`/api/products/?${mine ? 'mine=1' : ''}`);
        console.log('API Response:', response);
        const data = await response.json();
        console.log('API Data:', data);
        
        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');

        if (data.ok && Array.isArray(data.items)) {
            if (data.items.length === 0) {
                emptyState.classList.remove('hidden');
                return;
            }

            const fragment = document.createDocumentFragment();
            data.items.forEach(product => {
                const div = document.createElement('div');
                div.innerHTML = renderProductCard(product);
                fragment.appendChild(div);
            });
            container.appendChild(fragment);
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        loadingState.classList.add('hidden');
        loadingState.classList.remove('flex');
        errorState.classList.remove('hidden');
    }
}

// Initialize and attach event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    // Initial load
    refreshProducts();

    // Filter buttons
    const filterAll = document.getElementById('filter-all');
    const filterMy = document.getElementById('filter-my');
    const btnRefresh = document.getElementById('btn-refresh');

    if (filterAll) {
        filterAll.addEventListener('click', () => {
            filterAll.classList.add('bg-[#be7919]', 'text-white');
            filterAll.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            
            filterMy.classList.remove('bg-[#be7919]', 'text-white');
            filterMy.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            
            refreshProducts(false);
        });
    }

    if (filterMy) {
        filterMy.addEventListener('click', () => {
            filterMy.classList.add('bg-[#be7919]', 'text-white');
            filterMy.classList.remove('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            
            filterAll.classList.remove('bg-[#be7919]', 'text-white');
            filterAll.classList.add('bg-white', 'text-gray-700', 'border', 'border-gray-300');
            
            refreshProducts(true);
        });
    }

    if (btnRefresh) {
        btnRefresh.addEventListener('click', () => {
            const isMyProducts = filterMy.classList.contains('bg-[#be7919]');
            refreshProducts(isMyProducts);
        });
    }

    // Add Product button
    const btnCreate = document.getElementById('btn-create');
    if (btnCreate) {
        btnCreate.addEventListener('click', () => {
            openModal(false);
        });
    }
});

function renderProductCard(product) {
  return `
    <div class="h-full flex flex-col">
      <article class="relative bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden h-[320px] flex flex-col">
        
        <!-- Overlay link untuk seluruh card -->
        <a href="/product/${product.id}/" class="absolute inset-0 z-10 pointer-events-none" aria-label="Open details"></a>

        <!-- Thumbnail -->
        <div class="relative h-44 sm:h-48 bg-gray-200 overflow-hidden">
          ${product.thumbnail ? `<img src="${product.thumbnail}" alt="${product.name}" class="w-full h-full object-cover">` : ''}

          <!-- Featured star (PNG, kiri atas) -->
          ${product.is_featured ? `
            <div class="absolute top-3 left-3 z-30">
              <span class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#e7be38]">
                <img src="/static/icons/star.png" alt="Featured" class="w-5 h-5">
              </span>
            </div>
          ` : ''}

          <!-- Edit & Delete buttons (only show for product owner) -->
          ${product.user === window.CURRENT_USER ? `
          <div class="absolute top-3 right-3 z-30 flex items-center gap-2">
            <button onclick="event.stopPropagation(); openModal(true, '${product.id}')"
                    class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/95 hover:bg-[#fdfbed] shadow ring-1 ring-gray-200 transition pointer-events-auto">
              <img src="/static/icons/edit.png" alt="Edit" class="w-5 h-5">
            </button>
            <button onclick="event.stopPropagation(); openDeleteModal('${product.id}')"
                    class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 shadow ring-1 ring-gray-200 transition pointer-events-auto">
              <img src="/static/icons/trash.png" alt="Delete" class="w-5 h-5">
            </button>
          </div>
          ` : ''}
        </div>

        <!-- Body -->
        <div class="p-5 sm:p-6 relative z-20 flex-1 flex flex-col">
          <div class="mb-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#f9f2cc] text-[#6e3c19]">
              ${product.category_label}
            </span>
          </div>

          <h3 class="flex flex-wrap items-center text-xl font-semibold leading-tight mb-2">
            <span class="text-[#3f1e09]">${product.name}</span>
            <span class="mx-2 text-gray-300">•</span>
            <span class="text-gray-600 font-medium">Rp${product.price.toLocaleString()}</span>
          </h3>

          <div class="text-sm">
            ${product.stock > 0 
              ? `<span class="text-[#a45b19] font-medium">Stok: ${product.stock}</span>`
              : `<span class="text-red-600 font-medium">Stok habis</span>`
            }
          </div>
        </div>
      </article>

      <!-- Detached pill button -->
      <div class="w-full flex justify-center mt-3">
        <a href="/product/${product.id}/"
           class="inline-flex px-6 py-2 rounded-full bg-white border border-[#f2e395] text-[#a45b19] hover:bg-[#fdfbed] font-medium transition">
          View Details
        </a>
      </div>
    </div>
  `;
}

// Handle modal form submission
async function handleSubmit(event) {
    event.preventDefault();
    const productId = document.getElementById('product-id').value;
    const isEdit = !!productId;
    
    const formData = {
        name: document.getElementById('product-name').value,
        price: document.getElementById('product-price').value,
        stock: document.getElementById('product-stock').value,
        description: document.getElementById('product-description').value,
        thumbnail: document.getElementById('product-thumbnail').value,
        category: document.getElementById('product-category').value,
        is_featured: document.getElementById('product-featured').checked,
    };

    const csrfToken = getCookie('csrftoken');
    const url = isEdit ? `/api/products/${productId}/` : '/api/products/';
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();
        
        if (data.ok) {
            closeModal();
            refreshProducts();
            showToast(
                isEdit ? 'Product Updated' : 'Product Created',
                isEdit ? 'Product was successfully updated' : 'New product was successfully created',
                'success'
            );
        } else {
            showToast('Error', Object.values(data.errors).flat().join(', '), 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error', 'Failed to save product. Please try again.', 'error');
    }
}

// Open create/edit modal
function openModal(isEdit = false, productId = null) {
    const modal = document.getElementById('modal-product');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const submitText = document.getElementById('submit-text');
    const idInput = document.getElementById('product-id');

    // Reset form
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-description').value = '';
    document.getElementById('product-thumbnail').value = '';
    document.getElementById('product-category').value = 'ball';
    document.getElementById('product-featured').checked = false;

    if (isEdit && productId) {
        modalTitle.textContent = 'Edit Product';
        modalSubtitle.textContent = 'Update product details';
        submitText.textContent = 'Save Changes';
        idInput.value = productId;

        // Fetch product data
        fetch(`/api/products/${productId}/`)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    const product = data.item;
                    document.getElementById('product-name').value = product.name;
                    document.getElementById('product-price').value = product.price; 
                    document.getElementById('product-stock').value = product.stock;
                    document.getElementById('product-description').value = product.description;
                    document.getElementById('product-thumbnail').value = product.thumbnail || '';
                    document.getElementById('product-category').value = product.category;
                    document.getElementById('product-featured').checked = product.is_featured;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showToast('Error', 'Failed to load product data', 'error');
                closeModal();
            });
    } else {
        modalTitle.textContent = 'Create Product';
        modalSubtitle.textContent = 'Add a new product to your store';
        submitText.textContent = 'Create Product';
        idInput.value = '';
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal-product');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Open delete confirmation modal
function openDeleteModal(productId) {
    const modal = document.getElementById('modal-delete');
    const btnConfirm = document.getElementById('btn-delete-confirm');
    const btnCancel = document.getElementById('btn-delete-cancel');
    
    // Update confirm button to include product ID
    btnConfirm.onclick = () => deleteProduct(productId);
    btnCancel.onclick = closeDeleteModal;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('modal-delete');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// Delete product
async function deleteProduct(productId) {
    const csrfToken = getCookie('csrftoken');
    
    try {
        const response = await fetch(`/api/products/${productId}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': csrfToken,
            },
        });

        if (response.ok) {
            closeDeleteModal();
            refreshProducts();
            showToast('Product Deleted', 'Product was successfully deleted', 'success');
        } else {
            throw new Error('Failed to delete product');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error', 'Failed to delete product', 'error');
    }
}