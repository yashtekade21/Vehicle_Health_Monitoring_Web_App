from django.shortcuts import render
from django.urls import path
from .views import RegisterUserView, LoginUserView, UserProfileView, driver_list, get_user_profile
from . import views
from .views import register

urlpatterns = [
    # Path for user login view
    # Maps to LoginUserView, which handles user login
    path('login/', LoginUserView.as_view(), name='login'),
    
    # Path for the admin dashboard view
    # Uses a lambda to render the admin_dashboard.html template
    path('admin_dashboard/', lambda request: render(request, 'admin_dashboard.html'), name='admin_dashboard'),
    
    # Path for the driver dashboard view
    # Uses a lambda to render the driver_dashboard.html template
    path('driver_dashboard/', lambda request: render(request, 'driver_dashboard.html'), name='driver_dashboard'),
    
    # Path for user registration view
    # Maps to the register function in views
    path('register/', register, name='register'),
    
    # Path for listing drivers
    # Maps to the driver_list function in views
    path('driver-list/', driver_list, name='driver-list'),
    
    # API endpoint for listing drivers
    # Maps to the driver_list function in views
    path('api/driver-list/', driver_list, name='driver_list'),
    
    # API endpoint for getting user profile
    # Maps to the get_user_profile function in views
    path('api/user_profile/', get_user_profile, name='user_profile'),
    
    # Path for user profile view
    # Maps to UserProfileView, which handles displaying user profiles
    path('profile/', UserProfileView.as_view(), name='get_user_profile'),
]
