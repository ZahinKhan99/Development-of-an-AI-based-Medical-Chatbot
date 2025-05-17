from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from ehr import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/', include('core.urls')),
    path('api/v1/ai/', include('ai.urls')),
    path('api-auth/', include('rest_framework.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
