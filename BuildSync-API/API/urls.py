from django.urls import path
from API.Views.OwnerView import OwnerView

urlpatterns = [
    path('owner/', OwnerView.as_view(), name='owners'),
    path('owner/<str:owner_id>/', OwnerView.as_view(), name='owner-detail'),
]
