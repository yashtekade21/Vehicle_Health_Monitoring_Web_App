from rest_framework import serializers
from .models import Car

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model that this serializer will handle
        model = Car
        
        # Include all fields from the Car model in the serialized representation
        fields = '__all__'
