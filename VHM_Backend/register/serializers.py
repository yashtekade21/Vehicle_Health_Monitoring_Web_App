from rest_framework import serializers
from django.contrib.auth.models import User

from bikeData.models import Bike
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model and fields to include in the serialization
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}  # Ensure password is write-only

    def create(self, validated_data):
        # Create a new user with the provided validated data
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    # Embed the UserSerializer within UserProfileSerializer
    user = UserSerializer()

    class Meta:
        # Specify the model and fields to include in the serialization
        model = UserProfile
        fields = ('user', 'age', 'contact_no', 'license_no', 'address')

    def create(self, validated_data):
        # Extract user data and create a new user
        user_data = validated_data.pop('user')
        user = UserSerializer().create(user_data)
        
        # Create a UserProfile instance and associate it with the newly created user
        UserProfile.objects.create(user=user, **validated_data)
        return user

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model and fields to include in the serialization
        model = Bike
        fields = ('model_name', 'number_plate', 'assigned_driver')

class DriverVehicleSerializer(serializers.Serializer):
    # Define custom fields for the serializer
    username = serializers.CharField(source='user.username')
    contact_no = serializers.CharField(source='user.userprofile.contact_no')
    email = serializers.EmailField(source='user.email')
    vehicle_number = serializers.CharField()

    class Meta:
        # Define the fields to be included in the serialized output
        fields = ('username', 'contact_no', 'email', 'vehicle_number')
