from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core import serializers
import datetime, json
from django.urls import reverse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from main.forms import ProductsForm
from main.models import Product

@login_required(login_url='/login')
def show_main(request):
    filter_type = request.GET.get("filter", "all")
    products_list = Product.objects.all() if filter_type == "all" else Product.objects.filter(user=request.user)
    context = {
        'npm' : '2406419663',
        'name': request.user.username,
        'class': 'PBP B',
        'products_list': products_list,  # untuk awal bisa dipakai, nanti list diganti render via JS
        'last_login': request.COOKIES.get('last_login', 'Never'),
    }
    return render(request, "main.html", context)

def create_product(request):
    form = ProductsForm(request.POST or None)
    if form.is_valid() and request.method == "POST":
        product_entry = form.save(commit=False)
        product_entry.user = request.user if request.user.is_authenticated else None
        product_entry.save()
        return redirect('main:show_main')
    return render(request, "create_product.html", {'form': form})

@login_required(login_url='/login')
def show_product(request, id):
    product = get_object_or_404(Product, pk=id)
    return render(request, "product_detail.html", {'product': product})

def show_xml(request):
    product_list = Product.objects.all()
    return HttpResponse(serializers.serialize("xml", product_list), content_type="application/xml")

def show_json(request):
    product_list = Product.objects.all()
    return HttpResponse(serializers.serialize("json", product_list), content_type="application/json")

def show_xml_by_id(request, product_id):
    try:
        product_item = Product.objects.filter(pk=product_id)
        return HttpResponse(serializers.serialize("xml", product_item), content_type="application/xml")
    except Product.DoesNotExist:
        return HttpResponse(status=404)

def show_json_by_id(request, product_id):
    try:
        product_item = Product.objects.get(pk=product_id)
        return HttpResponse(serializers.serialize("json", [product_item]), content_type="application/json")
    except Product.DoesNotExist:
        return HttpResponse(status=404)

def register(request):
    form = UserCreationForm()
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been successfully created!')
            return redirect('main:login')
    return render(request, 'register.html', {'form':form})

def login_user(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            response = HttpResponseRedirect(reverse("main:show_main"))
            response.set_cookie('last_login', str(datetime.datetime.now()))
            return response
    else:
        form = AuthenticationForm(request)
    return render(request, 'login.html', {'form': form})

def logout_user(request):
    logout(request)
    response = HttpResponseRedirect(reverse('main:login'))
    response.delete_cookie('last_login')
    return response

def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)
    form = ProductsForm(request.POST or None, instance=product)
    if form.is_valid() and request.method == 'POST':
        form.save()
        return redirect('main:show_main')
    return render(request, "edit_product.html", {'form': form})

def delete_product(request, id):
    product = get_object_or_404(Product, pk=id)
    product.delete()
    return HttpResponseRedirect(reverse('main:show_main'))

# Helpers
def product_to_dict(p: Product):
    return {
        "id": str(p.id),
        "user": p.user.username if p.user else None,
        "name": p.name,
        "price": p.price,
        "stock": p.stock,
        "description": p.description,
        "thumbnail": p.thumbnail,
        "category": p.category,
        "category_label": p.get_category_display(),
        "is_featured": p.is_featured,
        "created": p.pk is not None,
    }

def json_body(request):
    try:
        return json.loads(request.body.decode('utf-8') or '{}')
    except json.JSONDecodeError:
        return {}

# CSRF seed
@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"ok": True})

@login_required
@require_http_methods(["GET", "POST"])
@csrf_protect
def api_products_list_create(request):
    if request.method == "GET":
        mine = request.GET.get("mine")
        qs = Product.objects.filter(user=request.user) if mine else Product.objects.all()
        items = [product_to_dict(p) for p in qs.order_by("-id")]
        return JsonResponse({"ok": True, "items": items})

    data = request.POST or json_body(request)
    form = ProductsForm(data)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.user = request.user
        obj.save()
        return JsonResponse({"ok": True, "item": product_to_dict(obj)}, status=201)
    return JsonResponse({"ok": False, "errors": form.errors}, status=400)

@login_required
@require_http_methods(["GET", "PUT", "PATCH", "DELETE"])
@csrf_protect
def api_product_detail_update_delete(request, id):
    obj = get_object_or_404(Product, pk=id)

    if request.method == "GET":
        return JsonResponse({"ok": True, "item": product_to_dict(obj)})

    if request.method in ("PUT", "PATCH"):
        data = json_body(request)
        form = ProductsForm(data, instance=obj)
        if request.method == "PATCH":
            form = ProductsForm(data, instance=obj)
            form.is_bound = True  
        if form.is_valid():
            form.save()
            return JsonResponse({"ok": True, "item": product_to_dict(obj)})
        return JsonResponse({"ok": False, "errors": form.errors}, status=400)

    # DELETE
    obj.delete()
    return JsonResponse({"ok": True, "deleted": str(id)})

@require_http_methods(["POST"])
@csrf_protect
def api_register(request):
    data = request.POST or json_body(request)
    form = UserCreationForm(data)
    if form.is_valid():
        form.save()
        return JsonResponse({"ok": True, "msg": "Account created"})
    return JsonResponse({"ok": False, "errors": form.errors}, status=400)

@require_http_methods(["POST"])
@csrf_protect
def api_login(request):
    data = request.POST or json_body(request)
    form = AuthenticationForm(request, data=data)
    if form.is_valid():
        user = form.get_user()
        login(request, user)
        resp = JsonResponse({"ok": True, "user": {"username": user.username}})
        resp.set_cookie('last_login', str(datetime.datetime.now()))
        return resp
    return JsonResponse({"ok": False, "errors": form.errors}, status=400)

@login_required
@require_http_methods(["POST"])
@csrf_protect
def api_logout(request):
    logout(request)
    resp = JsonResponse({"ok": True})
    resp.delete_cookie('last_login')
    return resp