from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('stapp.urls')),   # ← myapp ke urls ko include karna
]
