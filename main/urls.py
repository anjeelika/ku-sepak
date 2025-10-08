from django.urls import path
from main.views import (
    # pages
    show_main, show_product, create_product, edit_product, delete_product,
    show_xml, show_json, show_xml_by_id, show_json_by_id,
    register, login_user, logout_user,

    # APIs (AJAX)
    csrf_token_view,
    api_products_list_create,
    api_product_detail_update_delete,
    api_login,
    api_register,
    api_logout,
)

app_name = 'main'

urlpatterns = [
    path('', show_main, name='show_main'),
    path('create-product/', create_product, name='create_product'),
    path('product/<uuid:id>/', show_product, name='show_product'),
    path('product/<uuid:id>/edit', edit_product, name='edit_product'),
    path('product/<uuid:id>/delete', delete_product, name='delete_product'),
    path('xml/', show_xml, name='show_xml'),
    path('json/', show_json, name='show_json'),
    path('xml/<str:product_id>/', show_xml_by_id, name='show_xml_by_id'),
    path('json/<str:product_id>/', show_json_by_id, name='show_json_by_id'),
    path('register/', register, name='register'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),

    # API (dipakai oleh AJAX)
    path('api/csrf/', csrf_token_view, name='api_csrf'),  # seed CSRF cookie

    # Product CRUD
    path('api/products/', api_products_list_create, name='api_products_list_create'),              # GET list, POST create
    path('api/products/<uuid:id>/', api_product_detail_update_delete, name='api_product_detail'),  # GET detail, PUT/PATCH, DELETE

    # Auth via AJAX
    path('api/login/', api_login, name='api_login'),
    path('api/register/', api_register, name='api_register'),
    path('api/logout/', api_logout, name='api_logout'),
]
