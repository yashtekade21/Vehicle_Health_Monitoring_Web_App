from rest_framework import serializers
from .models import Bike
from register.models import User  

# Serializer for the Bike model
class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = Bike
        
        # Include all fields from the Bike model in the serialized representation
        fields = '__all__'

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = User
        
        # Include only the 'username' field from the User model in the serialized representation
        fields = ['username']
